import fs from'node:fs';
const dir='dist/data/',raw=JSON.parse(fs.readFileSync(dir+'sources.json')),prior=JSON.parse(fs.readFileSync(dir+'crawl-stats.json'));
const excluded=raw.filter(x=>/^privacy|^cookie|^terms|^sign in|^log in|^access denied|^403|^404|^just a moment/i.test(x.title));
const clean=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/^(?:skip to content|hoppa till innehåll)\s*/i,'').trim();
const sources=[...new Map(raw.filter(x=>!excluded.includes(x)).map(x=>[x.url,x])).values()].map((x,i)=>({...x,id:i+1,title:clean(x.title).slice(0,180),description:clean(x.description).slice(0,260)}));
const stats={...prior,pages:sources.length,domains:new Set(sources.map(x=>new URL(x.url).hostname)).size,finalizedAt:new Date().toISOString(),excludedPolicyOrErrorPages:excluded.length,duplicateURLsRemoved:raw.length-sources.length-excluded.length,notes:'Distinct successfully retrieved, readable travel/background source pages and distinct source hostnames. Automated indexing is not manual verification of every claim. Curated events and historical annual market claims are separately sourced. Final index deduplicates final URLs and excludes detected policy/error pages. Sources are not all specific to November or December; seasonal claims are in the curated datasets.'};
fs.writeFileSync(dir+'sources.json',JSON.stringify(sources));fs.writeFileSync(dir+'crawl-stats.json',JSON.stringify(stats));
console.log(JSON.stringify(stats));
