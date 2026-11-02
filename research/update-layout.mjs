import fs from'node:fs';import{load}from'cheerio';
const file='dist/index.html',$=load(fs.readFileSync(file,'utf8'));
$('section.hero').remove();$('body').addClass('atlas-focused');
$('#tab-inbound').html('Inbound travel <span>↙</span>');$('#tab-outbound').html('Outbound travel <span>↗</span>');
$('.site-header nav a').filter((i,e)=>$(e).attr('href')==='#inspiration').before('<a href="#calendar">Event calendar</a>');
$('#explorer>.section-top h2').replaceWith('<h1 class="atlas-title">November & December,<br><em>mapped.</em></h1>');
$('.stats #event-count').next().text('events & celebrations');
if(!$('#calendar').length)$('.atlas-layout').after(`<section id="calendar" class="event-calendar"><div class="section-top"><div><div class="eyebrow">EVENTS, FESTIVALS & IMPORTANT DATES</div><h2>Your date-by-date calendar.</h2></div><p>Choose a highlighted date to see its programme.<br>Switch between country, continent and worldwide views.</p></div><div id="calendar-content"><p>Loading the event calendar…</p></div></section>`);
fs.writeFileSync(file,$.html());
