const TEST_SITE_KEY='1x00000000000000000000AA';

module.exports=function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET')return res.status(405).json({ok:false,message:'Methode nicht zulässig.'});

  const environment=String(process.env.VERCEL_ENV||process.env.NODE_ENV||'development').toLowerCase();
  const isProduction=environment==='production';
  const siteKey=isProduction?process.env.TURNSTILE_SITE_KEY:(process.env.TURNSTILE_SITE_KEY||TEST_SITE_KEY);

  if(!siteKey){
    return res.status(503).json({ok:false,message:'Sicherheitsprüfung ist derzeit nicht verfügbar.'});
  }

  return res.status(200).json({ok:true,siteKey});
};