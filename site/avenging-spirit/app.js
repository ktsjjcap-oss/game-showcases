import {bindReviewUI} from './review.js?v=20261102r3';
import {copy} from './copy.js?v=20261102r3';
import {revision} from './revision-copy.js?v=20261102r3';
import {elements,economy} from './enhanced.js?v=20261102r3';
import {partyIntro,possession,synergies,partyCards,partyGrowth,partyModes,ultimateShowcase} from './party.js?v=20261102r3';
import {partyCopy} from './party-copy.js?v=20261102r3';
import {hostRoster} from './roster.js?v=20261102r3';
let lang=new URLSearchParams(location.search).get('lang');try{lang=lang||localStorage.getItem('avenging-language')}catch{}if(!copy[lang])lang='ko';
const img=(name,alt='',cls='')=>`<img class="${cls}" src="assets/${name}.webp" alt="${alt}" loading="lazy">`;
const phone=(name,alt)=>`<figure class="phone">${img(name,alt)}<figcaption>${alt}</figcaption></figure>`;
const label=(n,name)=>`<p class="eyebrow"><span>${n}</span> ${name}</p>`;
let observer;function render(){observer?.disconnect();const t={...copy[lang]},r=revision[lang];Object.assign(t,{hero:r.hero,lead:r.lead,intro:r.intro,introBody:r.introBody,action:r.action,actionLead:r.actionLead,hosts:r.hosts,hostLead:r.hostLead,cards:r.cards,journey:r.journey,growth:r.growth,challenge:r.challenge,economy:r.currencyTitle,economyLead:r.currencyLead,ending:r.end,endBody:r.endBody});document.documentElement.lang=lang;document.title=({ko:"어벤징 스피릿-M | 빙의 액션과 로그라이크의 만남",en:"AVENGING SPIRIT-M | Possession Meets Roguelike Action",ja:"AVENGING SPIRIT-M | 憑依で戦うローグライクアクション"})[lang];document.querySelector("meta[name=description]").content=r.lead.replace(/<br>/g," ");
document.getElementById('app').innerHTML=`<header><a class="brand" href="#home">AVENGING<span>SPIRIT <small>M</small></span></a><nav aria-label="${t.menu}">${['action','synergy','hosts','growth','economy'].map((id,i)=>`<a href="#${id}">${({ko:['빙의 파티','시너지','호스트','성장','BM'],en:['Party','Synergies','Hosts','Growth','BM'],ja:['憑依パーティ','シナジー','ホスト','育成','BM']})[lang][i]}</a>`).join('')}</nav><div class="languages" role="group" aria-label="${t.language}">${[['ko','한국어'],['en','EN'],['ja','日本語']].map(([l,n])=>`<button data-lang="${l}" aria-pressed="${lang===l}">${n}</button>`).join('')}</div><div class="progress"></div></header><main>
<section class="hero" id="home"><img src="assets/hero.webp" class="hero-art" alt="" fetchpriority="high"><div class="hero-copy"><p class="eyebrow">${t.tag}</p><div class="wordmark">AVENGING<br><span>SPIRIT</span><small>RE:BORN</small></div><h1>${t.hero}</h1><p>${t.lead}</p></div><a class="scroll-link" href="#intro">${t.scroll} <span>↓</span></a></section>
${partyIntro(lang)}
${possession(lang)}
${synergies(lang)}

<section class="hosts wrap" id="hosts">${label('03','HOSTS & ELEMENTS')}${hostRoster(lang)}${elements(lang)}${ultimateShowcase(lang)}</section>
${partyCards(lang)}

<section class="journey wrap" id="journey">${label('05','THE 30-STAGE RUN')}<h2>${t.journey}</h2><p class="lead">${t.journeyLead}</p><div class="route-layout"><ol class="route">${t.milestones.map(s=>`<li><span>${s[0]}</span><div><h3>${s[1]}</h3><p>${s[2]}</p></div></li>`).join('')}</ol><figure class="party-screen"><div><img src="assets/source/S10a_angel_altar.webp" alt="${partyCopy[lang].journeyCaption}" loading="lazy"></div><figcaption>${partyCopy[lang].journeyCaption}</figcaption></figure></div><div class="boss-section"><div class="boss-heading"><div><p class="eyebrow">BOSS BATTLES</p><h3>${r.bossTitle}</h3><p>${r.bossBody}</p></div></div><div class="boss-gallery">${r.bossNames.map((n,i)=>`<article>${img('boss-'+i,n)}<h4>${n}</h4><p>${r.bossPatterns[i]}</p></article>`).join('')}</div></div></div></section>
${partyGrowth(lang)}
${partyModes(lang)}
${economy(t,lang)}
<section class="ending"><div><p class="eyebrow">AVENGING SPIRIT-M</p><h2>${t.ending}</h2><p>${t.endBody}</p><a href="#home">${t.top} ↑</a></div></section></main><footer><p>${t.footer}</p><p>${t.imageNote}</p><div><button id="print">${t.print}</button></div><small>AVENGING SPIRIT · © 1991 JALECO / CITY CONNECTION<br>${({ko:"표시 가격은 원화(KRW) 기준입니다. 영문·일문 명칭은 소개용 번역입니다.",en:"Prices are shown in Korean won (KRW). English and Japanese names are provisional translations.",ja:"表示価格は韓国ウォン（KRW）です。英語・日本語の名称は紹介用の仮訳です。"})[lang]}</small></footer>`;
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{const anchor=[...document.querySelectorAll('main section[id]')].filter(s=>s.getBoundingClientRect().top<=document.querySelector('header').getBoundingClientRect().height+30).pop();const anchorId=anchor?.id,anchorOffset=anchor?.getBoundingClientRect().top;const y=scrollY;lang=b.dataset.lang;try{localStorage.setItem('avenging-language',lang)}catch{}const u=new URL(location);u.searchParams.set('lang',lang);history.replaceState(null,'',u);render();const current=anchorId&&document.getElementById(anchorId);scrollTo({top:current?scrollY+current.getBoundingClientRect().top-anchorOffset:y,behavior:"instant"})});document.getElementById('print').onclick=()=>print();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{const target=document.querySelector(a.getAttribute('href'));if(!target)return;e.preventDefault();history.pushState(null,'',a.getAttribute('href'));scrollTo({top:Math.max(0,scrollY+target.getBoundingClientRect().top-document.querySelector('header').getBoundingClientRect().height-24),behavior:'instant'});});
bindReviewUI(lang);update();}
function update(){const total=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress')?.style.setProperty('width',`${total?scrollY/total*100:0}%`)}
addEventListener('scroll',update,{passive:true});render();
