import fs from 'node:fs';
const indicators={inbound:'ST.INT.ARVL',outbound:'ST.INT.DPRT',receipts:'ST.INT.RCPT.CD',expenditure:'ST.INT.XPND.CD'};
const records={};
for(const [direction,indicator]of Object.entries(indicators)){
 const url=`https://api.worldbank.org/v2/country/all/indicator/${indicator}?date=2010:2025&format=json&per_page=20000`;
 const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('World Bank HTTP '+response.status);
 const body=await response.json();if(!Array.isArray(body[1]))throw Error(JSON.stringify(body).slice(0,300));
 for(const row of body[1]){if(row.value===null||!row.countryiso3code)continue;const code=row.country.id;if(!records[code])records[code]={};if(!records[code][direction])records[code][direction]={indicator,unit:['receipts','expenditure'].includes(direction)?'current US$':'trips',source:`https://data.worldbank.org/indicator/${indicator}?locations=${code}`,api:url,series:[]};records[code][direction].series.push({year:+row.date,value:row.value});}
 console.log(indicator,body[1].filter(x=>x.value!==null).length,'observations');
}
for(const r of Object.values(records))for(const s of Object.values(r)){s.series.sort((a,b)=>a.year-b.year);s.latest=s.series.at(-1);s.baseline2019=s.series.find(x=>x.year===2019)||null;}
const atlas=JSON.parse(fs.readFileSync('dist/data/atlas.json')),codes=new Set(atlas.countries.map(c=>c.code));
const countries=Object.fromEntries(Object.entries(records).filter(([code])=>codes.has(code)));
const result={retrievedAt:new Date().toISOString(),provider:'World Bank, World Development Indicators; underlying source UN Tourism',license:'CC BY 4.0',scope:'Archived annual international tourism indicators. The source series stops in 2020, and some countries last reported earlier. These are annual trips and monetary totals, not unique people, bilateral rankings or November/December 2026 demand. The pandemic strongly affects 2020; 2019 is shown separately as a pre-pandemic reference.',countries};
fs.writeFileSync('research/travel-global.json',JSON.stringify(result));
console.log(JSON.stringify({countries:Object.keys(countries).length,inbound:Object.values(countries).filter(x=>x.inbound).length,outbound:Object.values(countries).filter(x=>x.outbound).length}));
