// Nur für den Caldoa-Vorschauzweig. Nicht nach main übernehmen.
module.exports = function previewUnavailable(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(503).json({ ok: false, message: 'In der internen Vorschau ist die Sicherheitsprüfung für Formulare deaktiviert.' });
};
