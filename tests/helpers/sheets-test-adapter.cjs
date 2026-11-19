// TEST ONLY: read-only Google Sheets adapter, no public endpoint.
const {createSign}=require('node:crypto');
const TEST_ID='1OK9W_cyDsY16ni8UwH1UVWR7rg6f43Pt7uqG2Wu9Cqg';
const ranges=['Kontakte!A1:G4','Interaktionen!A1:E5','Einwilligungen!A1:H11'];
function b64(x){return Buffer.from(x).toString('base64url');}
async function readTestRegister(env=process.env,fetcher=fetch){
 if(env.ZS_SHEETS_MODE!=='test'||env.ZS_TEST_SHEET_ID!==TEST_ID)throw Error('test target required');
 if(!env.ZS_TEST_SERVICE_ACCOUNT_EMAIL||!env.ZS_TEST_SERVICE_ACCOUNT_PRIVATE_KEY)throw Error('test credentials missing');
 const now=Math.floor(Date.now()/1000);
 const unsigned=b64(JSON.stringify({alg:'RS256',typ:'JWT'}))+'.'+b64(JSON.stringify({iss:env.ZS_TEST_SERVICE_ACCOUNT_EMAIL,scope:'https://www.googleapis.com/auth/spreadsheets.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+300}));
 const signature=createSign('RSA-SHA256').update(unsigned).sign(env.ZS_TEST_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g,'\n')).toString('base64url');
 const auth=await fetcher('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:unsigned+'.'+signature})});
 if(!auth.ok)throw Error('test authentication failed');
 const {access_token}=await auth.json();
 if(!access_token)throw Error('missing access token');
 const q=new URLSearchParams();for(const r of ranges)q.append('ranges',r);
 const res=await fetcher('https://sheets.googleapis.com/v4/spreadsheets/'+TEST_ID+'/values:batchGet?'+q,{headers:{Authorization:'Bearer '+access_token}});
 if(!res.ok)throw Error('test read failed');
 const data=await res.json();
 if(!Array.isArray(data.valueRanges)||data.valueRanges.length!==3)throw Error('unexpected response');
 return data.valueRanges.map(r=>r.values||[]);
}
module.exports={readTestRegister};
