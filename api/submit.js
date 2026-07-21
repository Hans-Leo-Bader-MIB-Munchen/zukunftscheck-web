const nodemailer = require('nodemailer');

const LIMITS = {
  text:10000, topic:300, source:500, location:300, perspective:1000,
  name:200, email:320, phone:100, organization:300, organizationType:200,
  preferred:100, purpose:300, message:3000, eventContext:100, type:200,
  projectTitle:200, projectType:200, projectDescription:3000,
  pendingDecision:2000, requesterRole:500, involvedParties:2000,
  existingChecks:3000, openQuestion:2000, projectStage:200,
  timeframe:300, additionalContext:2000
};

const clean = (value, key) => String(value ?? '')
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  .replace(/[<>]/g, '')
  .trim()
  .slice(0, LIMITS[key] || 500);
const cleanLine = (value, key) => clean(value, key).replace(/[\r\n]+/g, ' ');
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
const validEventContext = value => /^[A-Z0-9._:-]{1,100}$/.test(value);
const lines = fields => Object.entries(fields)
  .filter(([,value]) => value && (!Array.isArray(value) || value.length))
  .map(([key,value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
  .join('\n\n');

const CONTRIBUTION_TYPES = new Set(['Hinweis','Frage','Vorschlag','Quellenhinweis','Dokumentationshinweis','Sonstiger fachlicher Beitrag']);
const CONTACT_PURPOSES = new Set(['Allgemeines Interesse am ZukunftsCheck','Interesse an einer Veranstaltung','Rückfrage zu einer Veranstaltung','Interesse an einer Mitwirkung','Sonstige Kontaktaufnahme']);
const CONTACT_INTERESTS = new Set(['Allgemeines Interesse am ZukunftsCheck','ZukunftsCheck-Veranstaltungen','Mitwirkungsmöglichkeiten']);
const STAGE0_PROJECT_TYPES = new Set(['Kommune','Unternehmen und Organisationen','Gebäude und Energie','Kommunikation und Veranstaltungen','Entscheidung','Noch nicht sicher zuordenbar']);
const attempts = new Map();

function allowedOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === 'zukunftscheck.org' || host === 'www.zukunftscheck.org' || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ok:false,message:'Methode nicht zulässig.'});
  if (!req.headers['content-type']?.includes('application/json')) return res.status(415).json({ok:false,message:'Ungültiges Datenformat.'});
  if (!allowedOrigin(req.headers.origin)) return res.status(403).json({ok:false,message:'Anfrage nicht zulässig.'});

  const client = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const recent = (attempts.get(client) || []).filter(time => now-time < 600000);
  if (recent.length >= 5) return res.status(429).json({ok:false,message:'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'});
  recent.push(now);
  attempts.set(client,recent);

  const body = req.body || {};
  if (body.website) return res.status(200).json({ok:true,message:'Vielen Dank.'});
  const started = Number(body.formStartedAt);
  if (!Number.isFinite(started) || Date.now()-started < 2000 || Date.now()-started > 86400000) {
    return res.status(400).json({ok:false,message:'Bitte laden Sie die Seite neu und versuchen Sie es erneut.'});
  }

  const formType = ['contribution','stage0','contact'].includes(body.formType) ? body.formType : '';
  if (!formType || body.privacy !== true) {
    return res.status(400).json({ok:false,message:'Bitte füllen Sie alle Pflichtfelder aus.'});
  }

  let subject;
  let content;
  let replyTo;
  let successMessage='Vielen Dank. Ihre Angaben wurden übermittelt.';

  if (formType === 'contribution') {
    const eventContext=cleanLine(body.eventContext,'eventContext');
    const text=clean(body.text,'text');
    const type=cleanLine(body.type,'type');
    if (!validEventContext(eventContext) || !text || !CONTRIBUTION_TYPES.has(type)) {
      return res.status(400).json({ok:false,message:'Beitragstext, Beitragsart und gültiger Bezug sind erforderlich.'});
    }
    subject=`ZukunftsCheck – neuer fachlicher Beitrag – ${eventContext}`;
    content=lines({
      'Datenweg':'Fachlicher Beitrag',
      'Veranstaltungskennung':eventContext,
      'Beitragsart':type,
      'Beitrag':text,
      'Thema':clean(body.topic,'topic'),
      'Quellenangabe':clean(body.source,'source'),
      'Fundstelle':clean(body.location,'location'),
      'Betroffenheit/Perspektive':clean(body.perspective,'perspective')
    });
    successMessage='Vielen Dank. Ihr fachlicher Beitrag wurde übermittelt.';
  } else if (formType === 'stage0') {
    const projectTitle=cleanLine(body.projectTitle,'projectTitle');
    const projectType=cleanLine(body.projectType,'projectType');
    const projectDescription=clean(body.projectDescription,'projectDescription');
    const pendingDecision=clean(body.pendingDecision,'pendingDecision');
    const requesterRole=clean(body.requesterRole,'requesterRole');
    const involvedParties=clean(body.involvedParties,'involvedParties');
    const existingChecks=clean(body.existingChecks,'existingChecks');
    const openQuestion=clean(body.openQuestion,'openQuestion');
    const name=cleanLine(body.name,'name');
    const email=cleanLine(body.email,'email');

    if (!projectTitle || !STAGE0_PROJECT_TYPES.has(projectType) || !projectDescription || !pendingDecision || !requesterRole || !involvedParties || !existingChecks || !openQuestion || !name || !validEmail(email)) {
      return res.status(400).json({ok:false,message:'Bitte füllen Sie alle Pflichtfelder der Stufe-0-Anfrage vollständig aus und prüfen Sie die E-Mail-Adresse.'});
    }

    replyTo=email;
    subject=`ZukunftsCheck – neue Stufe-0-Anfrage – ${projectTitle}`;
    content=lines({
      'Datenweg':'Stufe-0-Anfrage',
      'Bearbeitungsart':'Manuelle Bedarfs- und Passungsprüfung; keine automatische Ergebniszuweisung',
      'Vorhaben':projectTitle,
      'Anwendungsbereich':projectType,
      'Beschreibung':projectDescription,
      'Anstehende Entscheidung oder Bindung':pendingDecision,
      'Rolle der anfragenden Person':requesterRole,
      'Bereits zuständige oder beteiligte Stellen':involvedParties,
      'Vorhandene Prüfungen, Beratungen, Planungen oder Verfahren':existingChecks,
      'Möglicherweise noch offene Frage':openQuestion,
      'Name':name,
      'E-Mail':email,
      'Organisation':clean(body.organization,'organization'),
      'Organisationstyp':cleanLine(body.organizationType,'organizationType'),
      'Projektstand':cleanLine(body.projectStage,'projectStage'),
      'Zeitlicher Rahmen':clean(body.timeframe,'timeframe'),
      'Telefon':cleanLine(body.phone,'phone'),
      'Bevorzugter Kontaktweg':cleanLine(body.preferred,'preferred'),
      'Ergänzende Hinweise':clean(body.additionalContext,'additionalContext')
    });
    successMessage='Ihre Stufe-0-Anfrage wurde übermittelt. Sie wird manuell darauf geprüft, ob ein zusätzlicher, noch nicht abgedeckter und für den ZukunftsCheck geeigneter Klärungsbedarf besteht. Die Übermittlung ist noch keine fachliche Prüfung, keine Annahme eines Auftrags und keine Zusage einer weiteren ZukunftsCheck-Stufe.';
  } else {
    const eventContext=cleanLine(body.eventContext,'eventContext');
    const name=cleanLine(body.name,'name');
    const email=cleanLine(body.email,'email');
    const purpose=cleanLine(body.purpose,'purpose');
    if (!validEventContext(eventContext) || !name || !validEmail(email) || !CONTACT_PURPOSES.has(purpose)) {
      return res.status(400).json({ok:false,message:'Name, gültige E-Mail-Adresse, Kontaktzweck und gültiger Bezug sind erforderlich.'});
    }
    replyTo=email;
    const interests=Array.isArray(body.interest)
      ? body.interest.map(value=>cleanLine(value,'type')).filter(value=>CONTACT_INTERESTS.has(value)).slice(0,3)
      : [];
    subject=`ZukunftsCheck – neue Kontaktanfrage – ${eventContext}`;
    content=lines({
      'Datenweg':'Allgemeiner Kontakt',
      'Veranstaltungskennung':eventContext,
      'Kontaktzweck':purpose,
      'Name':name,
      'E-Mail':email,
      'Telefon':cleanLine(body.phone,'phone'),
      'Organisation':clean(body.organization,'organization'),
      'Organisationstyp':cleanLine(body.organizationType,'organizationType'),
      'Interessen':interests,
      'Bevorzugter Kontaktweg':cleanLine(body.preferred,'preferred'),
      'Nachricht':clean(body.message,'message')
    });
    successMessage='Vielen Dank. Ihre allgemeine Kontaktanfrage wurde übermittelt.';
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.MAIL_TO) {
    return res.status(503).json({ok:false,message:'Der Versand ist vorübergehend nicht verfügbar.'});
  }

  try {
    const transporter=nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}
    });
    await transporter.sendMail({
      from:`ZukunftsCheck Website <${process.env.GMAIL_USER}>`,
      to:process.env.MAIL_TO,
      replyTo,
      subject,
      text:`${content}\n\nEingegangen: ${new Date().toISOString()}\nQuelle: www.zukunftscheck.org`
    });
    return res.status(200).json({ok:true,message:successMessage});
  } catch (error) {
    console.error('Mailversand fehlgeschlagen',error?.code||error?.message||'unbekannt');
    return res.status(502).json({ok:false,message:'Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.'});
  }
};
