import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),countries=require('world-countries');
const root=new URL('./',import.meta.url),api='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/';
const iso=c=>({EL:'GR',UK:'GB'}[c]||c),country=c=>countries.find(x=>x.cca2===iso(c));
const travel={},audit=[];
for(const year of [2025,2024])for(const direction of ['inbound','outbound']){
 const dataset=direction==='inbound'?'tour_occ_arnraw':'tour_dem_ttw',extra=direction==='inbound'?'nace_r2=I551-I553':'purpose=TOTAL&duration=N_GE1';
 const url=`${api}${dataset}?lang=EN&time=${year}&unit=NR&${extra}`;
 let j;
 if(process.argv.includes('--cached'))j=JSON.parse(fs.readFileSync(new URL(`../work/euro-${direction}-${year}.json`,root)));
 else{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`${r.status} ${url}`);j=await r.json();}
 const marketDim=direction==='inbound'?'c_resid':'c_dest',marketIndex=j.id.indexOf(marketDim),geoIndex=j.id.indexOf('geo');
 const codes=j.id.map(id=>Object.fromEntries(Object.entries(j.dimension[id].category.index).map(([k,v])=>[v,k])));
 const profiles={};
 for(const [offset,raw]of Object.entries(j.value||{})){
  if(!Number.isFinite(raw)||raw<=0)continue;
  let n=+offset;const positions=Array(j.size.length);for(let i=j.size.length-1;i>=0;i--){positions[i]=n%j.size[i];n=Math.floor(n/j.size[i]);}
  const origin=country(codes[geoIndex][positions[geoIndex]]),market=country(codes[marketIndex][positions[marketIndex]]);
  if(!origin||!market||origin.cca2===market.cca2)continue;
  (profiles[origin.cca2]??=[]).push({country:market.name.common,code:market.cca2,value:raw,status:j.status?.[offset]||null,url:url+'&geo='+codes[geoIndex][positions[geoIndex]]});
 }
 for(const [code,rows]of Object.entries(profiles)){
  rows.sort((a,b)=>b.value-a.value||a.country.localeCompare(b.country));
  const p=travel[code]??={priority:90,provider:'Eurostat'};
  audit.push({code,direction,year,rows:rows.length,updated:j.updated});
  if(p[direction]?.length)continue;
  const scope=direction==='inbound'?'Arrivals at hotels, short-stay accommodation and camping establishments (NACE I551–I553), classified by guest residence. These are establishment arrivals, not border arrivals or unique people.':'Overnight tourism trips of residents aged 15+, for personal and business purposes, by principal destination country. These are survey-estimated trips, not unique people.';
  Object.assign(p,{[direction]:rows.map(x=>x.country),[direction+'Metrics']:rows,[direction+'Period']:String(year),[direction+'Unit']:direction==='inbound'?'accommodation arrivals':'overnight trips',[direction+'MetricLabel']:direction==='inbound'?'Guest origins at tourism accommodation':'Resident overnight trips by destination',[direction+'Url']:url+'&geo='+({GR:'EL',GB:'UK'}[code]||code),[direction+'Scope']:scope,[direction+'Note']:'All positive individually reported country categories are retained for full-list search. Ranking is among these reported countries only. Regional aggregates, combined Switzerland/Liechtenstein and domestic totals are excluded; a major market within an aggregate may be absent. Missing or suppressed values are not zero. This annual historical record is not a November–December 2026 forecast.'});
 }
}
fs.writeFileSync(new URL('europe-full-v2.json',root),JSON.stringify({researchedAt:'2026-11-02',methodology:'Newest positive annual country table from 2025 or fallback2024, independently per direction. No values combined across years or measures.',travel,audit},null,2));
console.log(JSON.stringify({countries:Object.keys(travel).length,inbound:Object.values(travel).filter(p=>p.inbound).length,outbound:Object.values(travel).filter(p=>p.outbound).length,newCountries:Object.keys(travel).filter(x=>!JSON.parse(fs.readFileSync(new URL('europe-top20.json',root))).travel[x]),counts:Object.fromEntries(Object.entries(travel).map(([k,p])=>[k,[p.inbound?.length||0,p.outbound?.length||0,p.inboundPeriod,p.outboundPeriod]]))}));
