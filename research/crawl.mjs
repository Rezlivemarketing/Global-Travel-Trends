import fs from 'node:fs';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {load} from 'cheerio';
const require=createRequire(import.meta.url),countries=require('world-countries');
const root=new URL('../',import.meta.url),out=new URL('../dist/data/',import.meta.url);
fs.mkdirSync(out,{recursive:true});
const records=[],failures=[],seen=new Set(),queue=[];
const aliases={'United States':'United States of America','United Kingdom':'United Kingdom','Vatican City':'Vatican City','DR Congo':'Democratic Republic of the Congo','Republic of the Congo':'Republic of the Congo','Ivory Coast':"Côte d'Ivoire",'Czechia':'Czech Republic','South Korea':'South Korea','North Korea':'North Korea','São Tomé and Príncipe':'São Tomé and Príncipe'};
const wiki=(s)=>encodeURIComponent(s.replaceAll(' ','_'));
function add(url,code,kind){if(!seen.has(url)){seen.add(url);queue.push({url,code,kind});}}
for(const c of countries){const n=aliases[c.name.common]||c.name.common; add('https://en.wikivoyage.org/wiki/'+wiki(n),c.cca2,'country-guide');}
function save(){fs.writeFileSync(new URL('sources.json',out),JSON.stringify(records));fs.writeFileSync(new URL('crawl-failures.json',out),JSON.stringify(failures));fs.writeFileSync(new URL('crawl-stats.json',out),JSON.stringify({retrievedAt:new Date().toISOString(),pages:records.length,domains:new Set(records.map(x=>new URL(x.url).hostname)).size,attempted:seen.size,failed:failures.length,notes:'Successful HTML pages with readable travel content. Automated retrieval and indexing, not manual verification of every claim. Event dates and market rankings are separately curated. Crawl page totals do not mean distinct websites.'}));}
const forbidden=/^(Special|File|Category|Template|Help|Wikivoyage|User|Talk|MediaWiki|Module|Portal|Wikipedia):/i;
let pointer=0,active=0;
async function run(item){
 let r;
 try{
  r=await fetch(item.url,{signal:AbortSignal.timeout(22000),headers:{'User-Agent':'GlobalTrendesResearch/1.0 (travel-planning atlas; non-commercial evidence indexing)'}});
  if(!r.ok) throw Error('HTTP '+r.status);
  const html=await r.text(),$=load(html);$('script,style,.navbox,.reflist,nav,footer,header,.mw-editsection,.toc').remove();
  const main=$('#mw-content-text .mw-parser-output').first();const body=main.length?main:$('main').first().length?$('main').first():$('body');
  const text=body.text().replace(/\s+/g,' ').trim();if(text.length<1200)throw Error('Insufficient readable travel content');
  const title=$('h1').first().text().trim()||$('title').text().trim();
  const headings=body.find('h2,h3').map((i,e)=>$(e).text().trim()).get().slice(0,20);
  let climate=''; const climateHeading=body.find('h2,h3,h4').filter((i,e)=>/climate|when to (go|visit)/i.test($(e).text())).first();
  if(climateHeading.length){let parts=[];let next=climateHeading.parent('.mw-heading').length?climateHeading.parent().next():climateHeading.next();for(let i=0;i<7&&next.length;i++,next=next.next()){if(next.is('h2,h3,.mw-heading'))break;if(next.is('p'))parts.push(next.text());}climate=parts.join(' ').replace(/\s+/g,' ').slice(0,620);}
  const description=($('meta[name="description"]').attr('content')||text.slice(0,230)).replace(/\s+/g,' ').slice(0,260);
  records.push({id:records.length+1,country:item.code,kind:item.kind,title,url:r.url,status:r.status,retrievedAt:new Date().toISOString(),description,headings,climate,contentSha256:crypto.createHash('sha256').update(text).digest('hex'),license:r.url.includes('wikivoyage')?'CC BY-SA 4.0; Wikivoyage contributors':r.url.includes('wikipedia')?'CC BY-SA 4.0; Wikipedia contributors':'Source retains copyright; metadata indexed only'});
  if(item.kind==='country-guide'){
   const candidates=[];body.find('a[href^="/wiki/"]').each((i,e)=>{const href=$(e).attr('href');let name;try{name=decodeURIComponent(href.split('/wiki/')[1]);}catch{return;}if(!name||forbidden.test(name)||name.includes('#')||/Main_Page|Travel_topics|Phrasebook|Destinations|Itineraries/.test(name))return;const section=$(e).closest('section').attr('data-mw-section-id');candidates.push('https://en.wikivoyage.org'+href.split('#')[0]);});
   const unique=[...new Set(candidates)].filter(x=>x!==item.url); for(const u of unique.slice(0,12))add(u,item.code,'destination-guide');
  }
 }catch(e){failures.push({...item,error:e.message,at:new Date().toISOString()});}
}
// Six workers, paced between requests. Only directly public, unrestricted travel guides.
async function worker(){while(records.length<1120){const item=queue[pointer++];if(!item){pointer--;if(active===0)break;await new Promise(r=>setTimeout(r,500));continue;}active++;await run(item);active--;if((records.length+failures.length)%20===0){save();console.log(JSON.stringify({pages:records.length,failed:failures.length,queued:queue.length-pointer}));}await new Promise(r=>setTimeout(r,900));}}
await Promise.all(Array.from({length:6},worker));save();console.log('Research crawl complete: '+records.length+' pages.');
