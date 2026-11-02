import fs from 'node:fs';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),countries=require('world-countries');
const prior=JSON.parse(fs.readFileSync(new URL('events-europe-expansion.json',import.meta.url)));
const originCodes=Object.keys(prior.travel);
const api='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/';
const toEuro=c=>({GR:'EL',GB:'UK'}[c]||c);
const toISO=c=>({EL:'GR',UK:'GB'}[c]||c);
const countryInfo=c=>countries.find(x=>x.cca2===toISO(c));
const omissions=['Domestic reporting country','Domestic/foreign/world totals','Continent and other-country aggregates','CH_LI combined Switzerland/Liechtenstein category'];
const metadata={inbound:'https://ec.europa.eu/eurostat/cache/metadata/en/tour_occ_esms.htm',outbound:'https://ec.europa.eu/eurostat/cache/metadata/en/tour_dem_esms.htm'};
function extract(j,dim,origin){
 if(!j.id||!j.dimension?.[dim]||!j.value||j.size.some(n=>n===0))return [];
 // All non-country dimensions are explicitly filtered to one category.
 for(let i=0;i<j.id.length;i++)if(j.id[i]!==dim)assert.equal(j.size[i],1,`Unexpected unfiltered ${j.id[i]}`);
 const index=j.dimension[dim].category.index;
 const rows=[];
 for(const [code,position] of Object.entries(index)){
  const country=countryInfo(code);
  if(!country||country.cca2===origin)continue;
  let offset=0;
  for(let i=0;i<j.id.length;i++)offset=offset*j.size[i]+(j.id[i]===dim?position:0);
  const value=j.value[offset];
  if(typeof value!=='number'||!Number.isFinite(value)||value<=0)continue;
  rows.push({country:country.name.common,code:country.cca2,value,status:j.status?.[offset]||null});
 }
 return rows.sort((a,b)=>b.value-a.value||a.country.localeCompare(b.country)).slice(0,20);
}
async function get(url){
 for(let attempt=0;attempt<2;attempt++){
  try{const r=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'User-Agent':'GlobalTrendesResearch/1.0'}});if(!r.ok)throw Error(`HTTP ${r.status}`);return await r.json();}
  catch(e){if(attempt===1)return {retrievalError:e.message};}
 }
}
async function profile(origin){
 const geo=toEuro(origin);
 const sources={inbound:`${api}tour_occ_arnraw?lang=EN&time=2024&geo=${geo}&unit=NR&nace_r2=I551-I553`,outbound:`${api}tour_dem_ttw?lang=EN&time=2024&geo=${geo}&unit=NR&purpose=TOTAL&duration=N_GE1`};
 const [a,b]=await Promise.all([get(sources.inbound),get(sources.outbound)]);
 const inboundMetrics=extract(a,'c_resid',origin),outboundMetrics=extract(b,'c_dest',origin);
 return [origin,{
  period:'2024 calendar year',
  label:'Historical annual top 20 individually reported country markets',
  note:'Inbound counts arrivals at hotels, holiday/short-stay accommodation and camping establishments, not border tourist arrivals or unique people. Outbound counts overnight trips of residents aged 15 and over for all personal and business purposes. These are the largest available individually named foreign-country categories, not an exhaustive worldwide ranking: regional/other-country aggregates and the combined Switzerland/Liechtenstein group are excluded. A country hidden inside an aggregate may be missing even if important. Missing values are not zero travel. Annual 2024 evidence is not a November/December 2026 forecast.',
  inbound:inboundMetrics.map(r=>r.country),outbound:outboundMetrics.map(r=>r.country),
  inboundMetrics,outboundMetrics,sources,url:inboundMetrics.length?sources.inbound:sources.outbound,
  priority:80,provider:'Eurostat',metadata,excludedCategories:omissions,
  inboundDefinition:'Accommodation arrivals by guest country of residence, NACE I551–I553; number of establishment arrivals',
  outboundDefinition:'Resident tourism trips of at least one overnight stay, population aged 15+, all purposes; number of trips',
  inboundScope:'Top available individually reported foreign-country categories; combined and regional aggregates excluded',
  outboundScope:'Top available individually reported foreign-country categories; regional aggregates excluded',
  actualCounts:{inbound:inboundMetrics.length,outbound:outboundMetrics.length},
  retrieval:{retrievedAt:new Date().toISOString(),inboundDatasetUpdated:a.updated||null,outboundDatasetUpdated:b.updated||null,inboundError:a.retrievalError||a.error||null,outboundError:b.retrievalError||b.error||null}
 }];
}
const travel={};
for(let i=0;i<originCodes.length;i+=5){
 const settled=await Promise.allSettled(originCodes.slice(i,i+5).map(profile));
 for(const row of settled){if(row.status==='rejected')throw row.reason;travel[row.value[0]]=row.value[1];}
 console.log(`Retrieved ${Object.keys(travel).length}/${originCodes.length} Eurostat profiles`);
}
for(const t of Object.values(travel))for(const side of ['inbound','outbound']){
 assert(t[side].length<=20);assert.equal(t[side].length,t[`${side}Metrics`].length);
 t[`${side}Metrics`].forEach((r,i)=>{assert.equal(r.country,t[side][i]);if(i)assert(r.value<=t[`${side}Metrics`][i-1].value);});
}
fs.writeFileSync(new URL('europe-top20.json',import.meta.url),JSON.stringify({researchedAt:'2026-11-02',retrievedAt:new Date().toISOString(),source:'Eurostat dissemination Statistics API',methodology:'Rank within separately reported ISO-country categories after excluding domestic origin, aggregate categories and missing/nonpositive cells. No named country is reconstructed from a regional aggregate. Count and flag are preserved from each selected JSON-stat cell. Lists can contain fewer than 20 countries when coverage is narrower.',travel},null,2));
console.log(JSON.stringify({profiles:Object.keys(travel).length,inbound20:Object.values(travel).filter(t=>t.inbound.length===20).length,outbound20:Object.values(travel).filter(t=>t.outbound.length===20).length,counts:Object.fromEntries(Object.entries(travel).map(([c,t])=>[c,t.actualCounts]))}));
