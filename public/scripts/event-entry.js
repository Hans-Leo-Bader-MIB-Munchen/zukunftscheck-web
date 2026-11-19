(()=>{"use strict";
const id=new URLSearchParams(location.search).get("event");
const event=(window.ZS_EVENTS||[]).find(e=>e.id===id&&e.id!=="ALLGEMEIN");
const status=document.getElementById("event-status");
const links=document.querySelectorAll("[data-event-route]");
if(!event){
 if(id){status.textContent="Veranstaltung nicht gefunden. Bitte prüfen Sie den QR-Code.";links.forEach(a=>{a.removeAttribute("href");a.setAttribute("aria-disabled","true");});}
 return;
}
document.getElementById("event-title").textContent=event.label;
status.textContent="Veranstaltungsbezug erkannt. Nur interne Vorschau.";
links.forEach(a=>{a.href="/teilnahme.html?event="+encodeURIComponent(event.id)+"#"+a.dataset.eventRoute;});
})();