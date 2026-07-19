const nodemailer = require('nodemailer');

const LIMITS = { text:10000, topic:300, source:500, location:300, perspective:1000, name:200, email:320, phone:100, organization:300, organizationType:200, preferred:100, purpose:300, message:3000, eventContext:100, type:200 };
const clean = (value, key) => String(value ?? '').replace(/\0/g, '').trim().slice(0, LIMITS[key] || 500);
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
const lines = fields => Object.entries(fields).filter(([,v]) => v && (!Array.isArray(v) || v.length)).map(([k,v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n\n');
const attempts = new Map();

function allowedOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === 'zukunftscheck.org' || host === 'www.zukunftscheck.org' || host.endsWith('.vercel.app');
  } catch { return false; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ok:false,message:'Methode nicht zulässig.'});
  if (!req.headers['content-type']?.includes('application/json')) return res.status(415).json({ok:false,message:'Ungültiges Datenformat.'});
  if (!allowedOrigin(req.headers.origin)) return res.status(403).json({ok:false,message:'Anfrage nicht zulässig.'});
  const client = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now(), recent = (attempts.get(client) || []).filter(time => now-time < 600000);
  if (recent.length >= 5) return res.status(429).json({ok:false,message:'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'});
  recent.push(now); attempts.set(client,recent);
  const body = req.body || {};
  if (body.website) return res.status(200).json({ok:true,message:'Vielen Dank.'});
  const started = Number(body.formStartedAt);
  if (!Number.isFinite(started) || Date.now()-started < 2000 || Date.now()-started > 86400000) return res.status(400).json({ok:false,message:'Bitte laden Sie die Seite neu und versuchen Sie es erneut.'});
  const formType = ['contribution','contact'].includes(body.formType) ? body.formType : '';
  const eventContext = clean(body.eventContext,'eventContext');
  if (!formType || !eventContext || body.privacy !== true) return res.status(400).json({ok:false,message:'Bitte füllen Sie alle Pflichtfelder aus.'});

  let subject, content, replyTo;
  if (formType === 'contribution') {
    const text=clean(body.text,'text'), type=clean(body.type,'type');
    if (!text || !type) return res.status(400).json({ok:false,message:'Beitragstext und Beitragsart sind erforderlich.'});
    subject=`ZukunftsCheck – neuer fachlicher Beitrag – ${eventContext}`;
    content=lines({'Datenweg':'Fachlicher Beitrag','Veranstaltungskennung':eventContext,'Beitragsart':type,'Beitrag':text,'Thema':clean(body.topic,'topic'),'Quellenangabe':clean(body.source,'source'),'Fundstelle':clean(body.location,'location'),'Betroffenheit/Perspektive':clean(body.perspective,'perspective')});
  } else {
    const name=clean(body.name,'name'), email=clean(body.email,'email'), purpose=clean(body.purpose,'purpose');
    if (!name || !validEmail(email) || !purpose) return res.status(400).json({ok:false,message:'Name, gültige E-Mail-Adresse und Kontaktzweck sind erforderlich.'});
    replyTo=email;
    const interests=Array.isArray(body.interest)?body.interest.map(v=>clean(v,'type')).slice(0,12):[];
    subject=`ZukunftsCheck – neue Kontaktanfrage – ${eventContext}`;
    content=lines({'Datenweg':'Kontakt','Veranstaltungskennung':eventContext,'Kontaktzweck':purpose,'Name':name,'E-Mail':email,'Telefon':clean(body.phone,'phone'),'Organisation':clean(body.organization,'organization'),'Organisationstyp':clean(body.organizationType,'organizationType'),'Interessen':interests,'Bevorzugter Kontaktweg':clean(body.preferred,'preferred'),'Nachricht':clean(body.message,'message')});
  }
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.MAIL_TO) return res.status(503).json({ok:false,message:'Der Versand ist vorübergehend nicht verfügbar.'});
  try {
    const transporter=nodemailer.createTransport({host:'smtp.gmail.com',port:465,secure:true,auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});
    await transporter.sendMail({from:`ZukunftsCheck Website <${process.env.GMAIL_USER}>`,to:process.env.MAIL_TO,replyTo,subject,text:`${content}\n\nEingegangen: ${new Date().toISOString()}\nQuelle: www.zukunftscheck.org`});
    return res.status(200).json({ok:true,message:'Vielen Dank. Ihre Angaben wurden übermittelt.'});
  } catch (error) {
    console.error('Mailversand fehlgeschlagen',error?.code||error?.message||'unbekannt');
    return res.status(502).json({ok:false,message:'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.'});
  }
};
