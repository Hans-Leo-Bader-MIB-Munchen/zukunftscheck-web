const assert=require('node:assert/strict');
const {generateKeyPairSync}=require('node:crypto');
const {readTestRegister}=require('./helpers/sheets-test-adapter.cjs');
(async()=>{
 const env={ZS_SHEETS_MODE:'test',ZS_TEST_SHEET_ID:'1OK9W_cyDsY16ni8UwH1UVWR7rg6f43Pt7uqG2Wu9Cqg',ZS_TEST_SERVICE_ACCOUNT_EMAIL:'test@example.invalid',ZS_TEST_SERVICE_ACCOUNT_PRIVATE_KEY:generateKeyPairSync('rsa',{modulusLength:2048}).privateKey.export({type:'pkcs8',format:'pem'})};
 let calls=0;
 const mock=async(url,opts)=>{calls++;if(calls===1){assert.equal(url,'https://oauth2.googleapis.com/token');return {ok:true,json:async()=>({access_token:'mock'})}}assert.ok(url.startsWith('https://sheets.googleapis.com/v4/spreadsheets/'+env.ZS_TEST_SHEET_ID+'/'));assert.equal(opts.headers.Authorization,'Bearer mock');return {ok:true,json:async()=>({valueRanges:[{values:[['contact_id']]},{values:[['interaction_id']]},{values:[['consent_event_id']]}]})}};
 await assert.rejects(()=>readTestRegister({...env,ZS_TEST_SHEET_ID:'wrong'},mock),/test target/);
 await assert.rejects(()=>readTestRegister({...env,ZS_SHEETS_MODE:'production'},mock),/test target/);
 await assert.rejects(()=>readTestRegister({...env,ZS_TEST_SERVICE_ACCOUNT_PRIVATE_KEY:''},mock),/credentials/);
 assert.equal(calls,0);
 assert.equal((await readTestRegister(env,mock)).length,3);
 assert.equal(calls,2);
 await assert.rejects(()=>readTestRegister(env,async()=>({ok:false})),/authentication failed/);
 console.log('PASS: target/mode/credentials guards, mock read, auth failure');
})().catch(e=>{console.error(e.message);process.exitCode=1});
