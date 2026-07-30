(()=>{
  const events=window.ZS_EVENTS||[];
  const params=new URLSearchParams(location.search);
  let active=events.find(item=>item.id===params.get('event'))||events[0];
  const all=selector=>[...document.querySelectorAll(selector)];

  function correctStageStatus(){
    const stageHeading=document.querySelector('#stufen-title');
    if(stageHeading)stageHeading.textContent='Der ZukunftsCheck umfasst die Stufen 0 bis 2 – ohne automatischen Übergang.';

    const intro=stageHeading?.nextElementSibling;
    if(intro)intro.textContent='Stufe 0 klärt zunächst, ob eine wichtige Frage offen und der ZukunftsCheck dafür geeignet ist. Stufe 1 benötigt einen klar abgegrenzten Prüfgegenstand und eine gesonderte Beauftragung. Die Kern-Modul-Architektur von Stufe 2 ist konzeptionell konsolidiert, derzeit aber noch nicht operativ oder für reale Pilotfälle freigegeben.';

    const stage2=document.querySelector('#stufe-2');
    if(stage2){
      const badge=stage2.querySelector('.badge');
      if(badge)badge.textContent='konzeptionell konsolidiert · noch nicht operativ freigegeben';
      const heading=stage2.querySelector('h2');
      if(heading)heading.textContent='Stufe 2 – Vertiefende Kern- und Prüfmodule';
      const paragraphs=stage2.querySelectorAll('p');
      if(paragraphs[0])paragraphs[0].innerHTML='<strong>Entwicklungsstand:</strong> Die Kern-Modul-Architektur von Stufe 2 ist dokumentarisch konsolidiert. Eine operative Anwendung oder reale Pilotbearbeitung ist derzeit nicht freigegeben.';
      if(paragraphs[1])paragraphs[1].innerHTML='<strong>Voraussetzung:</strong> abgeschlossene Stufe 0, ein klar abgegrenzter komplexerer Prüfgegenstand, gesonderte Eignungs- und Verfahrensprüfung sowie eine ausdrückliche Freigabe und Vereinbarung des tatsächlich verfügbaren Prüfrahmens.';
      if(paragraphs[2])paragraphs[2].textContent='Stufe 2 verbindet einen gemeinsamen Grundmodulkern mit gegenstandsabhängigen Prüfmodulen. Sie ist keine automatisch folgende eigenständige Vollstufe.';
    }

    all('.stage-card').forEach(card=>{
      const heading=card.querySelector('h3');
      if(heading?.textContent.includes('Stufe 2')){
        heading.textContent='Stufe 2 – Vertiefende Kern- und Prüfmodule';
        const badge=card.querySelector('.badge');
        if(badge)badge.textContent='noch nicht operativ freigegeben';
        const text=card.querySelector('p');
        if(text)text.textContent='Konzeptionell konsolidierte Vertiefung komplexerer Zusammenhänge mit gemeinsamem Grundmodulkern und gegenstandsabhängigen Prüfmodulen. Kein automatischer Übergang aus Stufe 1.';
      }
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

  all('[data-event-select]').forEach(element=>element.addEventListener('change',()=>{
    active=events.find(item=>item.id===element.value)||events[0];
    paint();
  }));
  all('form[data-submit-form]').forEach(initializeForm);
  correctStageStatus();
  paint();

  const section=params.get('section')||location.hash.slice(1);
  if(section)requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());

  if(!document.querySelector('.menu-toggle')){
    const navigationScript=document.createElement('script');
    navigationScript.src='/scripts/mobile-navigation.js';
    document.head.appendChild(navigationScript);
  }
})();