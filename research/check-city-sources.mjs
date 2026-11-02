import fs from'node:fs';
const data=JSON.parse(fs.readFileSync('research/destination-cities-global.json')),urls=[...new Set(Object.values(data.destinations).flatMap(d=>[d.url,...d.cities.map(c=>c.url)]))],results=[];let i=0;
await Promise.all(Array.from({length:6},async()=>{while(i<urls.length){const url=urls[i++];try{const r=await fetch(url,{signal:AbortSignal.timeout(15000)});results.push({url,status:r.status,finalURL:r.url});await r.body?.cancel();}catch(e){results.push({url,error:e.message});}}}));
fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/city-source-checks.json',JSON.stringify({checkedAt:new Date().toISOString(),results}));console.log(JSON.stringify(results.filter(x=>x.status!==200)));
