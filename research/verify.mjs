import fs from 'node:fs';import assert from 'node:assert/strict';import{load}from'cheerio';
const data=JSON.parse(fs.readFileSync('dist/data/atlas.json')),sources=JSON.parse(fs.readFileSync('dist/data/sources.json')),stats=JSON.parse(fs.readFileSync('dist/data/crawl-stats.json'));
assert.equal(data.countries.length,250);assert.equal(new Set(data.countries.map(c=>c.code)).size,250);
const codes=new Set(data.countries.map(c=>c.code));
for(const e of data.events){assert(codes.has(e.iso2));assert(e.url.startsWith('https://'));assert(e.month.every(m=>[11,12].includes(m)));if(e.start&&e.end)assert(e.start<=e.end);assert(e.dateStatus);}
for(const c of data.countries){assert(c.lat>=-90&&c.lat<=90);assert(c.lng>=-180&&c.lng<=180);for(const h of c.holidays){assert(h.date.startsWith('2026-'));assert([11,12].includes(h.month));assert(h.source.startsWith('https://'));}}
for(const t of Object.values(data.travel)){assert(t.period);assert(t.note);assert(t.url.startsWith('https://'));assert(t.label.toLowerCase().includes('historical'));}
assert(sources.length>=1000);assert(stats.domains>=1000);assert.equal(new Set(sources.map(s=>s.url)).size,sources.length);assert(sources.every(s=>s.status===200&&s.retrievedAt&&s.contentSha256));assert.equal(stats.pages,sources.length);assert.equal(stats.domains,new Set(sources.map(s=>new URL(s.url).hostname)).size);
const $=load(fs.readFileSync('dist/index.html','utf8'));assert.equal($('#continent option').length,8);assert.equal($('[data-tab]').length,4);assert.equal($('[data-month]').length,2);
for(const e of $('script[src],link[rel="stylesheet"],img[src]').toArray()){const src=$(e).attr('src')||$(e).attr('href');if(!src.startsWith('http'))assert(fs.existsSync('dist/'+src),'Missing asset '+src);}
for(const p of ['world.json','atlas.json','curated-research.json','seasonal-research.json','crawl-stats.json','sources.json','crawl-failures.json'])assert(fs.existsSync('dist/data/'+p));
console.log(JSON.stringify({result:'passed',countries:250,events:data.events.length,calendarEntries:data.countries.reduce((n,c)=>n+c.holidays.length,0),sourcePages:sources.length,distinctHosts:stats.domains,historicalMarkets:Object.keys(data.travel).length,seasonalProfiles:Object.keys(data.seasonal).length}));
