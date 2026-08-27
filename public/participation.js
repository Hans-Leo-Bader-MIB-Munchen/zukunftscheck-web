(()=>{
  const events=window.ZS_EVENTS||[];
  const params=new URLSearchParams(location.search);
  let active=events.find(item=>item.id===params.get('event'))||events[0];
  const all=selector=>[...document.querySelectorAll(selector)];

  function renderEventCards(){
    const grid=document.querySelector('.event-grid');
    if(!grid)return;
    const known=new Set(all('[data-event-card]').map(element=>element.dataset.eventCard));
    const completedCard=grid.querySelector('[data-event-card="ZS-VA-2026-HAMM-001"]');
    events.filter(item=>item.id!=='ALLGEMEIN'&&!known.has(item.id)).forEach(item=>{
      const article=document.createElement('article');
      article.className='event-card';
      article.dataset.eventCard=item.id;
      const label=document.createElement('label');
      label.className='event-choice';
      const input=document.createElement('input');
      input.type='radio';
      input.name='publicEventChoice';
      input.value=item.id;
      input.setAttribute('data-event-select','');
      const span=document.createElement('span');
      span.textContent=item.title;
      label.append(input,' ',span);
      const details=document.createElement('p');
      const date=item.date?new Intl.DateTimeFormat('de-DE').format(new Date(`${item.date}T12:00:00`)):'';
      details.textContent=[date,item.time?`${item.time} Uhr`:'',item.location].filter(Boolean).join(' · ');
      article.append(label,details);
      if(item.url){
        const link=document.createElement('a');
        link.href=item.url;
        link.textContent='Veranstaltungsinformationen';
        article.append(link);
      }
      if(completedCard)grid.insertBefore(article,completedCard);
      else grid.append(article);
    });
  }

  function paint(){
    if(!active)return;
    document.querySelectorAll('[data-context-label]').forEach(element=>element.textContent=active.label);
    document.querySelectorAll('[data-context-id]').forEach(element=>element.textContent=active.id);
    document.querySelectorAll('[name=eventContext]').forEach(element=>element.value=active.id);
    all('[data-event-card]').forEach(element=>element.classList.toggle('selected',element.dataset.eventCard===active.id));
    all('[data-event-select]').forEach(element=>element.checked=element.value===active.id);
  }

  function bindEventSelection(){
    all('[data-event-select]').forEach(element=>element.addEventListener('change',()=>{
      active=events.find(item=>item.id===element.value)||events[0];
      paint();
    }));
  }

  function initializeForm(form){
    const startedField=form.elements.formStartedAt;
    if(startedField)startedField.value=Date.now();

    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        form.querySelector(':invalid')?.focus();
        return;
      }

      const target=form.querySelector('[data-preview-result]');
      const button=form.querySelector('button[type=submit]');
      button.disabled=true;
      target.hidden=false;
      target.textContent='Ihre Angaben werden übermittelt …';
      target.focus();

      const data={};
      new FormData(form).forEach((value,key)=>{
        if(key==='interest'){
          data[key]??=[];
          data[key].push(value);
        }else{
          data[key]=value;
        }
      });
      data.privacy=form.elements.privacy.checked;
      data.formStartedAt=Number(data.formStartedAt);

      try{
        const response=await fetch('/api/submit',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        });
        const result=await response.json();
        if(!response.ok)throw new Error(result.message||'Übermittlung fehlgeschlagen.');
        target.textContent=result.message;
        form.reset();
        if(startedField)startedField.value=Date.now();
        paint();
      }catch(error){
        target.textContent=error.message||'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      }finally{
        button.disabled=false;
      }
    });
  }

  renderEventCards();
  bindEventSelection();
  all('form[data-submit-form]').forEach(initializeForm);
  paint();

  const section=params.get('section')||location.hash.slice(1);
  if(section)requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());

  if(!document.querySelector('.menu-toggle')){
    const navigationScript=document.createElement('script');
    navigationScript.src='/scripts/mobile-navigation.js';
    document.head.appendChild(navigationScript);
  }
})();