import fs from 'node:fs';
import path from 'node:path';
const events=[];
const add=(iso2,title,month,start,end,dateStatus,description,url)=>events.push({iso2,title,month,start,end,dateStatus,description,url});
const confirmed='2026 dates published by official tourism board, government, venue or organiser; recheck before travel';
const monthOnly='2026 month published; individual programme dates not confirmed';
const annual='Recurring annual month; 2026 programme and exact dates unconfirmed';
const bhutan='https://a.storyblok.com/f/171618/x/421b8ac6a3/tentative_festival_dates_2026.pdf';
for(const [title,month,description] of [
['Black-necked Crane Festival',11,'Phobjikha celebrates crane conservation and community culture. The association calendar is tentative; verify locally.'],
['Goenpai Drupchen',11,'Trongsa Dzong hosts a religious celebration. The national tourism calendar is tentative; verify locally.'],
['Mongar Tshechu',11,'Mongar Dzong hosts religious dances and community observance. The association calendar is tentative; verify locally.'],
['Trashigang Tshechu',11,'Eastern Bhutan gathers for a dzong festival. The association calendar is tentative; verify locally.'],
['Nalakhar Tshechu',11,'Bumthang village festival with religious observances. The association calendar is tentative; verify locally.'],
['Druk Wangyel Tshechu',12,'Dochula hosts a distinctive ceremonial festival. The association calendar is tentative; verify locally.'],
['Trongsa Tshechu',12,'Trongsa Dzong hosts a winter religious festival. The association calendar is tentative; verify locally.'],
['Lhuentse Tshechu',12,'Lhuentse Dzong hosts masked dance traditions. The national tourism calendar is tentative; verify locally.'],
['Phuntsholing Tshechu',11,'Phuntsholing celebrates sacred dance traditions. The national tourism calendar is tentative; verify locally.'],
['Jambay Lhakhang Singye Cham',11,'Bumthang hosts ceremonial dance traditions at Jambay Lhakhang. The national tourism calendar is tentative; verify locally.'],
['Samdrupjongkhar Tshechu',12,'Eastern Bhutan holds a community religious festival. The national tourism calendar is tentative; verify locally.'],
['Nabji Lhakhang Drup',12,'Nabji village in Trongsa hosts its traditional religious gathering. The national tourism calendar is tentative; verify locally.']
]) add('BT',title,[month],null,null,'Tentative 2026 national tourism calendar; exact days withheld pending organiser confirmation',description.replace('association calendar','national tourism calendar'),bhutan);
add('KH','Bon Om Touk / Water Festival',[11],'2026-11-23','2026-11-25','2026 national festival holiday dates confirmed; local boat races and performances require separate confirmation','Cambodia observes the Water Festival. These official holiday dates do not guarantee that Phnom Penh boat races or particular local programmes will take place.','https://nbc.gov.kh/english./news_and_events/official_holiday.php');
add('LA','That Luang Festival and Trade Fair',[11],null,null,annual,'Vientiane’s principal Buddhist festival includes offerings and candlelit processions around Pha That Luang; confirm the local 2026 programme.','https://www.tourismlaos.org/welcome/buddhism-and-belief/festivals/');
add('LA','That Inghang Festival',[12],null,null,annual,'Savannakhet’s sacred stupa is a focus of Buddhist pilgrimage and community festivities. Exact 2026 days remain unverified.','https://www.tourismlaos.org/welcome/buddhism-and-belief/festivals/');
add('NP','Tihar / Festival of Lights',[11],null,null,'November 2026 confirmed by embassy holiday calendar; full festival dates not established by that source','Nepal’s multi-day festival honours animals, prosperity and sibling bonds. Embassy closures on November 10–11 are not the full public festival programme.','https://uk.nepalembassy.gov.np/pages/embassy-holidays/');
add('NP','Udhauli and Yomari Punhi',[12],'2026-12-24','2026-12-24','2026 date listed by diplomatic calendar; community programmes vary','Kirat seasonal observance and Newar harvest traditions are marked in December. Confirm community events individually.','https://um.dk/media/xsmpgybp/nepal-2026.pdf');
add('NP','Tamu Lhosar',[12],'2026-12-30','2026-12-30','2026 date listed by diplomatic calendar; local programme unconfirmed','The Gurung New Year brings cultural gatherings and traditional dress. Individual venue schedules are separate from the observance date.','https://um.dk/media/xsmpgybp/nepal-2026.pdf');
add('VN','Chu Dang Ya Wild Sunflower Week',[11],null,null,monthOnly,'Gia Lai celebrates sunflower season with local crafts and cultural performance. The national portal gives a November window rather than a detailed daily programme.','https://vietnam.travel/things-to-do/festival-event/chu-dang-ya-volcano-wild-sunflower-week/');
add('VN','Da Lat Flower Festival',[12],null,null,monthOnly,'The national tourism portal lists December 2026 for flower-focused cultural tourism across Da Lat and neighbouring districts; verify performance days.','https://vietnam.travel/things-to-do/festival-event/11th-da-lat-flower-festival-2026/');
add('VN','Visit Vietnam Year – Gia Lai Closing Ceremony',[12],null,null,monthOnly,'Gia Lai concludes its tourism-year programme with a heritage celebration. The portal supplies a December window; the ceremony day is not established.','https://vietnam.travel/things-to-do/festival-event/closing-ceremony-visit-vietnam-year-gia-lai-2026/');
add('SG','Deepavali in Singapore',[11],'2026-11-08','2026-11-08',confirmed,'Singapore’s Hindu Festival of Lights centres on family and religious observance, with Little India a key cultural setting.','https://www.visitsingapore.com/whats-happening/all-happenings/');
add('SG','Singapore Writers Festival',[11],'2026-11-13','2026-11-22',confirmed,'The Civic District hosts literary conversations, readings and performances. Some programmes require separate tickets or registration.','https://cp.bookmyshow.sg/en/passes/singapore-writers-festival-festival-pass/SWF26FP1');
add('SG','Christmas Together',[11],'2026-11-27','2026-11-29',confirmed,'Marina Bay Sands hosts an indoor festive village with creators, workshops and performances, supporting Singapore Red Cross Young Hearts.','https://sustainablemarkets.sg/');
add('SG','Singapore International Marathon',[12],'2026-12-04','2026-12-06',confirmed,'Singapore’s national marathon weekend includes multiple running categories, with specific race timings published separately.','https://singaporeinternationalmarathon.com/');
const tw='https://eng.taiwan.net.tw/m1.aspx?sNo=0044201';
for(const [title,start,end,month,description] of [
['Taiwan Science Festival','2026-11-07','2026-11-15',[11],'A nationwide science-focused festival listed on the official tourism calendar.'],
['Hakka Autumn Harvest Festival','2026-11-07','2026-12-05',[11,12],'Pingtung celebrates Hakka harvest culture across a multi-week programme.'],
['Biennial Butterfly Beauty Festival','2026-10-31','2027-03-31',[11,12],'Kaohsiung’s butterfly-season programme links nature and visitor experiences.'],
['Sun Moon Lake Music and Fireworks Festival','2026-09-12','2026-11-14',[11],'Nantou’s multi-date festival combines lakeside music and fireworks; consult individual show dates.'],
['Taichung International Flower Carpet Festival','2026-10-31','2026-11-22',[11],'Taichung presents seasonal floral displays across the festival period.']
])add('TW',title,month,start,end,confirmed,description,tw);
add('HK','Hong Kong Gourmet Month',[11],'2026-10-29','2026-11-30',confirmed,'A citywide food and nightlife programme brings limited menus and culinary experiences to participating venues.','https://www.discoverhongkong.com/eng/events/hong-kong-gourmet-month.html');
add('HK','Asia+ Festival',[11],'2026-09-23','2026-11-29',confirmed,'Hong Kong’s arts programme showcases cultural exchange through multiple performances and events. Check individual sessions.','https://www.discoverhongkong.com/eng/events.html?cate=3__7__13__12__9__6__4__0__10__2');
add('HK','Hong Kong Brands and Products Expo',[12],'2026-12-12','2027-01-04',confirmed,'The 60th expo brings local brands and consumer products to a year-end exhibition programme.','https://www.discoverhongkong.com/');
add('CN','China International Import Expo',[11],'2026-11-05','2026-11-10',confirmed,'Shanghai hosts the international trade exhibition at the National Exhibition and Convention Center. Business access and registration conditions apply.','https://www.investhk.gov.hk/en/events/china-international-import-expo-ciie-2026/');
add('ID','Banda Neira Festival',[11],'2026-11-12','2026-11-14',confirmed,'Central Maluku celebrates Banda’s heritage with traditional performance, village culture and nutmeg-related activities.','https://www.indonesia.travel/id/en/events/event-detail/banda-neira-festival-2026');
add('ID','Djakarta Warehouse Project',[12],'2026-12-11','2026-12-13',confirmed,'Jakarta hosts a three-day electronic music festival; tickets and admission conditions are set by the organiser.','https://dwpfest.com/');
add('MY','Comic Fiesta',[12],null,null,'2026 December edition confirmed; exact public admission dates require checking current organiser materials','Kuala Lumpur’s animation, comics and games convention features independent creators and cosplay. The organiser’s text confirms December 2026 ticket redemption; check dated admission passes.','https://comicfiesta.org/cf2026-tickets');
add('MY','MaTiC Cultural Performance Season',[11,12],'2026-11-01','2026-12-31','2026 season published; performances on selected weekdays, not continuous daily opening','Kuala Lumpur’s Malaysia Tourism Centre stages traditional dance and music, excluding Fridays. Consult the detailed performance schedule.','https://www.matic.gov.my/en/imedia/cultural-show');
const ph='https://philippinetourism.co.kr/festival';
for(const [title,month,description]of[
['Higantes Festival',11,'Angono, Rizal is known for its giant-figure cultural festival; the official tourism directory lists November without a current 2026 programme.'],
['San Fernando Giant Lantern Festival',12,'Pampanga’s lantern tradition is a major December attraction. The current competition day and display schedule require local confirmation.'],
['Shariff Kabunsuan Festival',12,'Cotabato’s December festival commemorates regional Islamic heritage through local cultural celebrations; exact 2026 programme remains unverified.']
])add('PH',title,[month],null,null,annual,description,ph);
const qa='https://visitqatar.com/intl-en/events-calendar';
for(const [title,start,end,description]of[
['FIP World Cup Qatar','2026-11-02','2026-11-07','International padel teams compete at Khalifa International Tennis and Squash Complex.'],
['Al Shaqab International Arabian Horse Show','2026-11-04','2026-11-07','Arabian horses from Qatar and abroad feature at Al Shaqab’s Longines arena.'],
['Qatar Boat Show','2026-11-04','2026-11-07','Old Doha Port hosts marine brands and boating experiences.'],
['Design Doha Biennale','2026-11-05','2026-11-07','Doha presents a design and cultural-exchange programme in Fereej Al Asmakh.'],
['MotoGP Qatar Grand Prix','2026-11-06','2026-11-08','Lusail International Circuit hosts the motorcycle racing weekend.'],
['MWC Doha','2026-11-08','2026-11-10','The GSMA-backed mobile technology gathering takes place at Doha Exhibition and Convention Center.']
])add('QA',title,[11],start,end,confirmed,description,qa);
const om='https://experienceoman.om/ar/%D8%A7%D9%84%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A7%D8%AA?startDate=2026-01-18';
add('OM','Oman Science Festival',[11],'2026-11-02','2026-11-11',confirmed,'Oman Convention and Exhibition Centre hosts an interactive science programme.',om);
add('OM','Military Music: Oman and the World',[11],'2026-11-05','2026-11-07',confirmed,'Royal Opera House Muscat’s outdoor venue presents an international military music programme.',om);
add('OM','Bidiya Sands Carnival',[11],'2026-11-19','2026-11-19',confirmed,'Bidiya in North Al Sharqiyah hosts a desert carnival listed by Oman’s tourism portal.',om);
add('OM','Muscat International Jewelry Exhibition',[12],'2026-12-03','2026-12-07',confirmed,'The 15th jewellery exhibition takes place at Oman Convention and Exhibition Centre.','https://ocec.om/events-exhibitions/');
const bh='https://www.bahrain.com/?lang=en';
for(const[title,start,end,description]of[
['Bahrain Comic Con','2026-11-06','2026-11-07','Bahrain International Circuit hosts pop-culture entertainment and fan activities.'],
['Royal Bahrain Concours','2026-11-06','2026-11-07','Royal Golf Club hosts an automotive showcase.'],
['Jewellery Arabia','2026-11-24','2026-11-28','Exhibition World Bahrain hosts the jewellery and luxury exhibition.'],
['Dar Shabab Al Riffa Performance','2026-11-07','2026-11-07','A traditional music performance is listed at Dar Al Riffa.']
])add('BH',title,[11],start,end,confirmed,description,bh);
add('SA','AlUla Skyrise Balloon Season',[11],'2026-11-06','2026-11-15',confirmed,'AlUla offers scheduled hot-air balloon experiences around its heritage landscapes, subject to operating conditions.','https://www.experiencealula.com/en/whats-on');
add('SA','AlUla Half Marathon',[12],'2026-12-19','2026-12-19',confirmed,'A race day through AlUla’s landscapes, with registration conditions published by the organiser.','https://www.experiencealula.com/en/whats-on');
add('LB','Beirut Marathon',[11],'2026-11-29','2026-11-29',confirmed,'Beirut’s annual running programme includes marathon, half marathon and shorter categories. Confirm routes and local arrangements with the association.','https://www.beirutmarathon.org/registration.php');
add('TR','Şeb-i Arus / Rumi Commemoration Ceremonies',[12],'2026-12-07','2026-12-17',confirmed,'Konya commemorates Rumi through sema ceremonies and cultural events at the Mevlana Cultural Centre.','https://sebiarus.ktb.gov.tr/TR-410225/seb-i-arus-753-yil.html');
add('UZ','Tashkent International Tourism Fair',[11],'2026-11-25','2026-11-27',confirmed,'The Tourism on the Silk Road trade gathering takes place at CAEx in Tashkent.','https://gov.uz/en/uzbektourism/news/view/98994');
add('MV','Finolhu Artist Residency',[11],'2026-11-06','2026-11-12',confirmed,'Artist Yakov Khomich leads an island residency at Finolhu. This is a resort-specific programme, not a nationwide festival.','https://events.visitmaldives.com/');
add('MV','Nautilus Pastry Masters Residency',[11],'2026-11-07','2026-11-12',confirmed,'Pastry chef Elena Nabiullina presents a guest culinary residency at The Nautilus; resort access arrangements apply.','https://events.visitmaldives.com/');
add('MV','JOALI BEING Tides of Tradition',[12],'2026-12-22','2027-01-08',confirmed,'A resort-specific programme combines festive traditions, wellbeing, dining and family experiences. Dates follow the detailed event text.','https://events.visitmaldives.com/');
add('PK','Aalmi Urdu Conference',[12],'2026-12-10','2026-12-13',confirmed,'Arts Council Karachi’s 19th Urdu conference presents literature, poetry, dialogue and music.','https://acpkhi.com/auc/');
add('BD','Safina Park Hemanti Fair',[11,12],'2026-11-25','2026-12-15',confirmed,'The Rajshahi-region fair presents folk performance, traditional entertainment and stalls in Godagari.','https://www.safinamela.com/');
const mo='https://www.macaotourism.gov.mo/en/events/calendar';
add('MO','Macau Grand Prix',[11],'2026-11-19','2026-11-22',confirmed,'The 73rd street-circuit motorsport meeting takes place on the Guia Circuit. Check individual race sessions and ticket conditions.',mo);
add('MO','Light Up Macao',[12],'2026-12-05','2027-01-10',confirmed,'Macao’s seasonal light-art programme spans December into January. Individual installations and operating hours require checking.',mo);
const moh='https://www.macaotourism.gov.mo/en/whatson';
add('MO','Macao International Music Festival',[11],'2026-11-01','2026-11-29',confirmed,'The 38th festival presents an international music programme under the theme Silk Resonances; individual performances are separately scheduled.',moh);
add('MO','hush! Beach Concerts × Urban Sports Wellfest',[11],'2026-11-14','2026-11-15',confirmed,'Hac Sa Beach, Coloane hosts live music alongside sport, fitness and wellbeing activities.',moh);
add('MO','Macau Food Festival',[11,12],'2026-11-20','2026-12-06',confirmed,'Sai Van Lake Square hosts an open-air programme of Macanese and international food stalls.',moh);
add('MM','Taunggyi Tazaungdine Hot-Air Balloon Festival',[11],'2026-11-18','2026-11-24','2026 organising committee dates reported by government; weather and participation can alter duration','Traditional balloon competitions are scheduled at Taunggyi’s Awaiya ground. An awards ceremony is planned for November 25; the competition period may extend.','https://mdn.gov.mm/en/taunggyi-tazaungdine-hot-air-balloon-festival-set-18-nov');
add('MN','Chinggis Khaan Birthday Mounted Archery Competition',[11],'2026-11-21','2026-11-21','2026 date published by national mounted archery federation; venue and spectator access unconfirmed','The Mongolian Mounted Archery Federation lists a birthday competition in its 2026 programme. Confirm location and public access directly.','https://mhaf.info/competitions/ezen-cingis-xaany-torson-odriin-temceen');
add('JO','Ayla Red Sea Half Marathon',[12],'2026-12-04','2026-12-04',confirmed,'Run Jordan’s annual Aqaba running event returns under the Ayla Red Sea Half Marathon name. Category details and registration conditions are published by the organiser.','https://registration.runjordan.com/Event/Details/1007');
add('PS','Bethlehem Old City Christmas Market',[12],null,null,annual,'Palestine’s tourism portal describes a recurring seasonal market with local crafts and cultural entertainment. A 2026 operating programme has not been verified.','https://www.travelpalestine.ps/en/Article/17/The-Enchanting-Christmas-Market-of-Bethlehem%27s-Old-City');
const myIn='https://storage.dosm.gov.my/tourism/tourism_2024.pdf';
const myOut='https://www.tourism.gov.my/files/uploads/Malaysian-Outbound-and-Domestic-Travel-Behavior.pdf';
const idSource='https://www.bps.go.id/en/pressrelease/2024/09/02/2354/kunjungan-wisatawan-mancanegara-wisman-pada-juli-2024-mencapai-1-31-juta-kunjungan-naik-16-91-persen-year-on-year-y-on-y-.html';
const travel={
MY:{period:'2024 inbound visitor arrivals; 2023 outbound holiday survey',label:'Historical visitor markets and surveyed outbound holiday destinations',inbound:['Singapore','Indonesia','China','Thailand','Brunei'],outbound:['Thailand','Indonesia','Singapore','Japan','China','South Korea'],inboundPeriod:'2024',outboundPeriod:'2023',inboundUrl:myIn,outboundUrl:myOut,note:'Inbound counts include same-day visitors and overnight tourists. Outbound destinations are from a Tourism Malaysia respondent survey conducted in February–March 2024 about 2023 overnight holiday trips; China and South Korea tied at 4.6%. These are different measures and are not November/December 2026 predictions.',url:myIn,sources:[myIn,myOut]},
ID:{period:'July 2024',label:'Historical monthly visitor nationalities and outbound destinations',inbound:['Malaysia','Australia','China'],outbound:['Malaysia','Saudi Arabia','Singapore','Thailand'],inboundPeriod:'July 2024',outboundPeriod:'July 2024',inboundUrl:idSource,outboundUrl:idSource,note:'BPS reports leading visitor nationalities and outbound destinations specifically for July 2024. This historical month is not a seasonal November/December ranking or a 2026 forecast.',url:idSource},
VN:{period:'2024',label:'Annual historical inbound source markets',inbound:['South Korea','China','Taiwan','United States','Japan'],outbound:[],note:'Top source markets from annual General Statistics Office figures reported by Vietnam’s government portal. No comparable official outbound destination ranking verified; no monthly 2026 claim.',url:'https://en.baochinhphu.vn/foreign-arrivals-to-viet-nam-up-nearly-40-in-2024-111250107094838837.htm'},
LK:{period:'2025',label:'Annual historical inbound source markets',inbound:['India','United Kingdom','Russia','Germany','China'],outbound:[],note:'Sri Lanka Tourism Development Authority’s 2025 Year in Review, updated April 2026. Annual source-market totals, not November/December 2026 forecasts. Comparable official outbound destination ranking not verified.',url:'https://www.sltda.gov.lk/storage/common_media/Year_in_Review_2025_Final_updated_Report_2026_04_02-1.pdf'},
NP:{period:'2025',label:'Annual historical inbound source markets',inbound:['India','United States','China','United Kingdom','Bangladesh'],outbound:[],note:'Top five tourist nationalities in the Government of Nepal’s 2025 Tourism Statistics fact sheet. Comparable official outbound destination ranking not verified. These are annual historical data.',url:'https://giwmscdnone.gov.np/media/pdf_upload/Nepal%20tourism%20statistics%202025_ibddtm6.pdf'},
MV:{period:'2024',label:'Annual historical inbound source markets',inbound:['China','Russia','United Kingdom','Germany','Italy'],outbound:[],note:'Maldives Bureau of Statistics World Tourism Day 2025 infographic reports the top nationalities for 2024 arrivals. Comparable official outbound destination ranking not verified.',url:'https://statisticsmaldives.gov.mv/mbs/wp-content/uploads/2025/10/WTD-2025.pdf'}
};
const result={researchedAt:'2026-11-02',scope:'Primary-source Asia and Middle East expansion. Tentative and recurring entries deliberately omit exact dates. Event descriptions are original paraphrases. Not exhaustive.',events,travel,excluded:[{iso2:'SA',title:'Red Sea International Film Festival 2026',reason:'Organiser says no 2026 edition; postponed to Q4 2027. Older submissions page is stale.',url:'https://redseafilmfest.com/en/red-sea-film-festival-2026-faq/'}]};
const target=path.join(import.meta.dirname,'events-asia-expansion.json');
fs.writeFileSync(target,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({events:events.length,countries:new Set(events.map(e=>e.iso2)).size,file:target}));
