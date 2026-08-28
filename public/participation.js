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

  function waitForTurnstile(timeout=10000){
    if(window.turnstile)return Promise.resolve(window.turnstile);
    return new Promise((resolve,reject)=>{
      const started=Date.now();
      const timer=setInterval(()=>{
        if(window.turnstile){
          clearInterval(timer);
          resolve(window.turnstile);
        }else if(Date.now()-started>timeout){
          clearInterval(timer);
          reject(new Error('Sicherheitsprüfung konnte nicht geladen werden.'));
        }
      },100);
    });
  }

  async function initializeTurnstile(){
    const forms=all('form[data-submit-form]');
    if(!forms.length)return;
    try{
      const configResponse=await fetch('/api/turnstile-config',{headers:{'Accept':'application/json'}});
      const config=await configResponse.json();
      if(!configResponse.ok||!config.siteKey)throw new Error(config.message||'Sicherheitsprüfung ist derzeit nicht verfügbar.');

      if(!document.querySelector('script[data-turnstile-script]')){
        const script=document.createElement('script');
        script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async=true;
        script.defer=true;
        script.dataset.turnstileScript='';
        document.head.appendChild(script);
      }

      const turnstile=await waitForTurnstile();
      forms.forEach(form=>{
        const button=form.querySelector('button[type=submit]');
        if(!button||form.dataset.turnstileWidgetId)return;
        const slot=document.createElement('div');
        slot.className='turnstile-slot';
        slot.setAttribute('aria-label','Sicherheitsprüfung gegen automatisierte Anfragen');
        button.parentNode.insertBefore(slot,button);
        const widgetId=turnstile.render(slot,{
          sitekey:config.siteKey,
          theme:'auto',
          callback:token=>{ form.dataset.turnstileToken=token; },
          'expired-callback':()=>{ form.dataset.turnstileToken=''; },
          'error-callback':()=>{ form.dataset.turnstileToken=''; }
        });
        form.dataset.turnstileWidgetId=String(widgetId);
      });
    }catch(error){
      forms.forEach(form=>{
        const button=form.querySelector('button[type=submit]');
        const target=form.querySelector('[data-preview-result]');
        if(button)button.disabled=true;
        if(target){
          target.hidden=false;
          target.textContent=error.message||'Sicherheitsprüfung ist derzeit nicht verfügbar.';
        }
      });
    }
  }

  function initializeForm(form){
    const startedField=form.elements.formStartedAt;
    if(startedField)startedField.value=Date.now();

    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const target=form.querySelector('[data-preview-result]');
      const button=form.querySelector('button[type=submit]');

      if(!form.checkValidity()){
        form.reportValidity();
        form.querySelector(':invalid')?.focus();
        return;
      }
      if(!form.dataset.turnstileToken){
        target.hidden=false;
        target.textContent='Bitte schließen Sie zuerst die Sicherheitsprüfung gegen automatisierte Anfragen ab.';
        target.focus();
        return;
      }

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
      data.turnstileToken=form.dataset.turnstileToken;

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
        form.dataset.turnstileToken='';
        if(startedField)startedField.value=Date.now();
        if(window.turnstile&&form.dataset.turnstileWidgetId)window.turnstile.reset(form.dataset.turnstileWidgetId);
        paint();
      }catch(error){
        form.dataset.turnstileToken='';
        if(window.turnstile&&form.dataset.turnstileWidgetId)window.turnstile.reset(form.dataset.turnstileWidgetId);
        target.textContent=error.message||'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      }finally{
        button.disabled=false;
      }
    });
  }

  renderEventCards();
  bindEventSelection();
  all('form[data-submit-form]').forEach(initializeForm);
  initializeTurnstile();
  paint();

  const section=params.get('section')||location.hash.slice(1);
  if(section)requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());

  if(!document.querySelector('.menu-toggle')){
    const navigationScript=document.createElement('script');
    navigationScript.src='/scripts/mobile-navigation.js';
    document.head.appendChild(navigationScript);
  }
})();