import fs from'node:fs';
const root=new URL('./',import.meta.url),names=['events-curated.json','events-asia-expansion.json','events-europe-expansion.json','events-world-expansion.json','events-additional.json','europe-top20.json','europe-full-v2.json','india-top20.json','greenland-detail.json','travel-asia-v2.json','travel-anglo-v2.json','travel-world-v2.json','travel-southasia-v2.json','travel-uae-v2.json'];
const bundles=names.filter(n=>fs.existsSync(new URL(n,root))).map(n=>({name:n,data:JSON.parse(fs.readFileSync(new URL(n,root)))}));
const events=[],keys=new Set(),travel={},exclusions=[];
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/2026|[^a-z0-9]/g,'');
const year=s=>Math.max(0,...String(s).match(/20\d\d/g)||[]);
function direction(p,d){if(!p[d]?.length)return null;return{markets:p.priority>=80&&p[d+'Metrics']?.length>p[d].length?p[d+'Metrics'].map(m=>m.country):p[d],period:p[d+'Period']||p.period,label:p[d+'MetricLabel']||p[d+'Label']||p.label,note:p[d+'Note']||p.note,url:p[d+'Url']||p[d+'Source']||(!Array.isArray(p.sources)&&p.sources?.[d])||p.url,metrics:p[d+'Metrics']||p[d+'Counts']?.map((value,i)=>({country:p[d][i],value}))||[],total:p[d+'Total']||null,priority:p.priority||0,unit:p[d+'Unit']||null,scope:p[d+'Scope']||null,rankingNote:p.rankingNote||null};}
for(const {name,data}of bundles){
 for(const e of data.events||[]){const key=e.iso2+'|'+norm(e.title);if(keys.has(key))continue;keys.add(key);events.push({...e,researchFile:name});}
 for(const [code,p]of Object.entries(data.travel||{})){
  const r=travel[code]||(travel[code]={directions:{},monthly:{},evidence:[]});
  // Keep source provenance here; selected numeric tables live in directions.
  // Full source extracts remain in the individual research bundles.
  const {inboundMetrics,outboundMetrics,inboundCounts,outboundCounts,...provenance}=p;
  r.evidence.push({...provenance,researchFile:name});
  for(const d of['inbound','outbound']){const candidate=direction(p,d),old=r.directions[d];if(candidate&&(!old||candidate.priority>old.priority||year(candidate.period)>year(old.period)||old.markets.length<2&&candidate.markets.length>1&&year(candidate.period)>=year(old.period)))r.directions[d]=candidate;}
  Object.assign(r.monthly,p.monthly||{});
  if(p.hotelMarkets)r.hotelMarkets=p.hotelMarkets;if(p.outboundStatus)r.outboundStatus=p.outboundStatus;
 }
 if(data.excluded)exclusions.push(data.excluded);if(data.researchExclusions)exclusions.push(data.researchExclusions);
}
for(const r of Object.values(travel)){r.inbound=r.directions.inbound?.markets||[];r.outbound=r.directions.outbound?.markets||[];r.period='Direction-specific historical periods';r.label='Historical source-market evidence';r.note='Read the period, definitions and source for the selected direction.';r.url=r.directions.inbound?.url||r.directions.outbound?.url;}
const result={researchedAt:'2026-11-02',scope:'Expanded primary-source event and historical travel research. This is a researched calendar, not an exhaustive inventory of all local events.',events,travel,exclusions};
fs.writeFileSync(new URL('expanded-research.json',root),JSON.stringify(result));
console.log(JSON.stringify({events:events.length,eventCountries:new Set(events.map(e=>e.iso2)).size,travelMarkets:Object.keys(travel).length,inboundProfiles:Object.values(travel).filter(t=>t.inbound.length).length,outboundProfiles:Object.values(travel).filter(t=>t.outbound.length).length}));
