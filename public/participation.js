(()=>{
  const events=window.ZS_EVENTS||[];
  const params=new URLSearchParams(location.search);
  let active=events.find(x=>x.id===params.get('event'))||events[0];
  const all=s=>[...document.querySelectorAll(s)];
  function paint(){
    document.querySelectorAll('[data-context-label]').forEach(e=>e.textContent=active.label);
    document.querySelectorAll('[data-context-id]').forEach(e=>e.textContent=active.id);
    document.querySelectorAll('[name=eventContext]').forEach(e=>e.value=active.id);
    all('[data-event-card]').forEach(e=>e.classList.toggle('selected',e.dataset.eventCard===active.id));
    all('[data-event-select]').forEach(e=>e.checked=e.value===active.id);
  }
  function initializeForm(form){
    form.elements.formStartedAt.value=Date.now();
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const target=form.querySelector('[data-preview-result]');
      const button=form.querySelector('button[type=submit]');
      button.disabled=true;
      target.hidden=false;
      target.textContent='Ihre Angaben werden übermittelt …';
      target.focus();
      const data={};
      new FormData(form).forEach((value,key)=>{
        if(key==='interest'){data[key]??=[];data[key].push(value)}else data[key]=value;
      });
      data.privacy=form.elements.privacy.checked;
      data.formStartedAt=Number(data.formStartedAt);
      try{
        const response=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        const result=await response.json();
        if(!response.ok)throw new Error(result.message||'Übermittlung fehlgeschlagen.');
        target.textContent=result.message;
        form.reset();
        form.elements.formStartedAt.value=Date.now();
        paint();
      }catch(error){
        target.textContent=error.message||'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      }finally{button.disabled=false}
    });
  }
  all('[data-event-select]').forEach(e=>e.addEventListener('change',()=>{active=events.find(x=>x.id===e.value)||events[0];paint()}));
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