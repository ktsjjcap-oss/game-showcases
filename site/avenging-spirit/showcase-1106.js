import {artboards,icon} from './visual-r2.js?v=20261106r2';
import {blocks} from './edition-1106.js?v=20261106r1';
import {hosts} from './roster.js?v=20261102r7';
import {revision} from './revision-copy.js?v=20261102r7';

const url = new URL(location.href);
const lang = ['ko','ja','en'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'ja';
const index = ['ko','ja','en'].indexOf(lang);
const t = value => value.split('|')[index].trim();
const asset = name => './assets/edition-1106/'+name+'.webp';
const uiLang = lang==='en' ? 'ja' : lang;
const version = '20261106r2';
const metadata = {
  '01':'출전 호스트|出撃ホスト|Starting host','02':'메인과 보조 2명|メインとサポート2体|Main and two supports',
  '03':'빙의 선택|憑依の選択|Possession choices','04':'유령 HP와 보조 잠금|幽霊HPとサポート枠のロック|Ghost HP and support locks',
  '05':'메인 승격 선택|メイン昇格の選択|Choose a support to promote','06':'레벨업 카드 선택|レベルアップカードの選択|Level-up card choice',
  '07':'천사 제단|天使の祭壇|Angel Shrine','08':'악마 제단|悪魔の祭壇|Devil Shrine','09':'떠돌이 상인|旅の商人|Traveling merchant',
  '11':'호스트 목록|ホスト一覧|Host roster','12':'호스트 성장|ホスト育成|Host growth','13':'스킬 정보|スキル詳細|Skill details','14':'유령 성장|幽霊育成|Ghost growth',
  '15':'도전 모드|チャレンジモード|Challenge modes','16':'탑 층과 보상|塔の階層と報酬|Tower floors and rewards','17':'탑 전투|塔の戦闘|Tower combat','18':'탑 클리어|塔のクリア結果|Tower clear',
  '19':'골드 던전 입장|ゴールドダンジョン入場|Gold Dungeon entry','20':'골드 던전 전투|ゴールドダンジョン戦闘|Gold Dungeon combat','21':'보스 경고|ボス出現警告|Boss warning',
  '22':'호스트 조각 소환|ホストの欠片召喚|Host shard summons','23':'소환 확률|召喚提供割合|Summon rates','24':'오늘의 상점|本日のショップ|Daily Shop','25':'추천 상품|おすすめ商品|Featured products','26':'젬 상품|ジェム商品|Gem packs'
};
const escape = s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function shot(id, hero=false) {
  const title=t(metadata[id]);
  const src=asset(id+'-'+uiLang);
  return `<figure class="shot shot-${id}"><a class="shot-link" href="${src}" data-shot="${src}" aria-label="${escape(title)}"><img src="${src}" alt="${escape(title)}" ${hero?'fetchpriority="high"':'loading="lazy"'}></a><figcaption>${title}${lang==='en'?' <small>JP UI</small>':''}</figcaption></figure>`;
}
const hostOrder = {
  gangster:['R',1],thug:['R',3],hopper:['R',4],hopper_smg:['R',15],commando_mg:['R',7],
  salamander:['R',6],dragon_blue:['R',14],white_wizard:['R',11],snowwoman:['R',13],
  amazon:['SR',9],ninja:['SR',10],commando_laser:['SR',12],commando_grenade:['SR',2],
  commando_missile:['SR',18],guru:['SR',5],ninja_chain:['SR',16],robot:['SR',8],
  dragoon:['SSR',19],medium:['SSR',17],baseball:['SSR',20],vampire:['SSR',0],amazon_elite:['hidden',0],death:['hidden',0]
};
const melee=new Set(['amazon','guru','ninja_chain','baseball','amazon_elite','death']);
const hostLang=['ko','en','ja'].indexOf(lang);
function roster() {
  return `<div class="roster">${['R','SR','SSR','hidden'].map(group=>{
    const records=Object.entries(hostOrder).filter(([,v])=>v[0]===group);
    return `<div class="rank rank-${group}" data-source="9–10"><div class="rank-title"><b>${group==='hidden'?t('히든|隠し|HIDDEN'):group}</b><span>${records.length}</span></div><div class="portraits">${records.map(([id,[,chapter]])=>{
      const record=hosts.find(row=>row[0]===id);
      const name=record[3][hostLang];
      const type=t(['파워|パワー|Power','무기|ウェポン|Weapon','마법|マジック|Magic'][record[2]]);
      const range=melee.has(id)?t('근접|近接|Melee'):t('원거리|遠距離|Ranged');
      const reward=chapter?t('챕터|チャプター|Chapter')+' '+chapter:id==='vampire'?t('소환 전용|召喚限定|Summon only'):t('랜덤 출전|ランダム出撃|Random entry');
      return `<article><img src="${asset('portrait_'+id)}" loading="lazy" alt=""><h3>${name}</h3><span>${type} · ${range}</span><small>${reward}</small><details><summary>${t('스킬|スキル|Skills')}</summary><p>${record[4][hostLang]}</p></details></article>`;
    }).join('')}</div></div>`;
  }).join('')}</div>`;
}
const boss=()=>`<div class="boss-strip" data-source="6"><h3>${t('챕터를 지키는 보스 6종|チャプターを守る6体のボス|Six chapter bosses')}</h3><div>${revision[lang].bossNames.map((name,i)=>`<article><img src="./assets/boss-${i}.webp" alt="" loading="lazy"><b>${name}</b><p>${revision[lang].bossPatterns[i]}</p></article>`).join('')}</div></div>`;
const pages={start:'7,10',possess:'3–4',survive:'3–5',hosts:'9–11',run:'5–7',growth:'9–11',tower:'7–8',gold:'8–9',economy:'11–13'};
const boards=artboards(t,asset,shot);
function section([id,tag,title,lead,shots,facts]) {
  const figures=shots.split(' ');
  const extra={
    run:['카드 9그룹|カード9グループ|Nine card groups','궤도 · 원소 · 하늘 · 기본 · HP · 연쇄 · 방향 · 궤적 · 근접|周回・元素・空・基本・HP・連鎖・方向・軌道・近接|Orbit · element · sky · base · HP · chain · direction · trajectory · melee','5'],
    tower:['층 종류 10가지|階層ルール10種|Ten floor types','기본 · 역풍 · 삼색 · 인연 · 결속 · 빼앗기 · 제한 · 중간 보스 · 보스 · 최종 보스|基本・逆風・三色・絆・結束・奪取・制限・中ボス・ボス・最終ボス|Standard · Headwind · Tri-color · Bond · Unity · Seizure · Restriction · Midboss · Boss · Final boss','7–8']
  }[id];
  const ruleRows=extra?[...facts,extra]:facts;
  return `<section id="${id}" class="chapter chapter-${id}"><div class="chapter-top"><p class="kicker">${tag}</p><h2 data-source="${pages[id]}">${t(title)}</h2><p class="lead" data-source="${pages[id]}">${t(lead)}</p></div>
  ${boards[id]()}
  ${id==='hosts'?roster():''}
  <div class="screen-ribbon r2-screens">${figures.map(n=>shot(n)).join('')}</div>
  <details class="rulebook"><summary>${t('세부 규칙과 수치|詳しいルール・数値|Detailed rules and values')} <span>+</span></summary>
  <div class="rule-details">${ruleRows.map(([head,body,page])=>`<article data-source="${page}"><h3>${t(head)}</h3><p>${t(body)}</p></article>`).join('')}</div></details>
  ${id==='run'?boss():''}</section>`;
}
const heroTitle=t('적의 몸을 빼앗아라|敵の体を奪い、戦え。|Take their bodies. Fight back.');
document.documentElement.lang=lang;
document.title='AVENGING SPIRIT-M — '+heroTitle;
document.querySelector('meta[name=description]').content=heroTitle;
document.getElementById('app').innerHTML=`
<header class="header"><div class="header-inner"><a href="#home" class="brand">AVENGING <span>SPIRIT-M</span></a>
<nav aria-label="${t('섹션|セクション|Sections')}"><a href="#possess">${t('빙의|憑依|Possession')}</a><a href="#hosts">${t('호스트|ホスト|Hosts')}</a><a href="#run">${t('챕터|チャプター|Chapters')}</a><a href="#tower">${t('도전|チャレンジ|Challenges')}</a><a href="#economy">${t('상점|ショップ|Shop')}</a></nav>
<div class="languages" aria-label="${t('언어|言語|Language')}">${[['ja','日本語'],['ko','한국어'],['en','EN']].map(([key,name])=>`<a href="?lang=${key}&amp;v=${version}${url.hash}" hreflang="${key}" ${lang===key?'aria-current="true"':''}>${name}</a>`).join('')}</div></div></header>
<main><section id="home" class="hero"><div class="hero-bg"></div><div class="hero-inner"><div class="hero-copy"><img class="logo" src="${asset('rb_art_logo_transparent')}" alt="AVENGING SPIRIT-M" fetchpriority="high"><p class="kicker">POSSESSION ROGUELIKE</p><h1>${heroTitle}</h1><p class="lead" data-source="2–4">${t('죽어서 유령이 된 주인공. 원작의 빙의 액션을 모바일 로그라이크로 되살렸다.|主人公は死して幽霊に。原作の憑依アクションが、モバイルのローグライクとしてよみがえります。|Death turns the hero into a ghost. The arcade original’s possession action returns as a mobile roguelike.')}</p><a class="hero-cta" href="#possess">${t('빙의 방식 보기|憑依アクションを見る|See how possession works')} <span aria-hidden="true">↘</span></a></div>
<div class="hero-display hero-story" data-source="2–4"><div class="hero-ring" aria-hidden="true"></div><div class="hero-stage spirit"><img src="${asset('rb_art_mascot_ghost_happy')}" alt=""><b>${t('죽음 → 유령|死 → 幽霊|Death → ghost')}</b></div><span class="hero-arrow">${icon('arrow')}</span><div class="hero-stage enemy"><img src="${asset('portrait_baseball')}" alt=""><b>${t('적 호스트|敵ホスト|Enemy host')}</b></div><span class="hero-arrow second">${icon('arrow')}</span><div class="hero-stage takeover"><img src="${asset('portrait_baseball')}" alt=""><b>${t('빙의 → 내 몸으로 전투|憑依 → 自分の体で戦う|Possess → fight in that body')}</b></div></div></div></section>
<div class="edition-wrap">${blocks.map(section).join('')}</div></main>
<footer><p data-source="13">${t('로비 탭 · 상점 / 호스트 / 전투 / 소환 / 도전|ロビー：ショップ／ホスト／バトル／召喚／チャレンジ|Lobby tabs: Shop / Hosts / Battle / Summon / Challenge')}</p>
<p data-source="13">${t('게임 지원 언어 · 한국어 · 일본어 · 영어 · 중국어 번체 · 중국어 간체|ゲーム対応言語：韓国語、日本語、英語、中国語（繁体字・簡体字）|Game languages: Korean, Japanese, English, Traditional Chinese and Simplified Chinese')}</p>
<p>${t('개발 중인 게임입니다. 수치와 상품 구성은 변경될 수 있습니다.|開発中のゲームです。数値や商品構成は変更される場合があります。|Game in development. Values and product contents may change.')}</p><p>AVENGING SPIRIT · © 1991 JALECO / CITY CONNECTION</p></footer>
<dialog class="lightbox" aria-label="${t('게임 화면|ゲーム画面|Game screenshot')}"><form method="dialog"><button aria-label="${t('닫기|閉じる|Close')}">×</button></form><img alt=""></dialog>`;

const dialog=document.querySelector('dialog');
document.querySelectorAll('[data-shot]').forEach(link=>link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  const image=dialog.querySelector('img');
  image.src=link.dataset.shot;
  image.alt=link.getAttribute('aria-label');
  dialog.showModal();
}));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.querySelectorAll('.languages a').forEach(link=>link.addEventListener('click',()=>{
  const header=document.querySelector('.header').offsetHeight;
  const active=[...document.querySelectorAll('main section[id]')].filter(section=>section.getBoundingClientRect().top<=header+50).at(-1);
  if(active)link.hash=active.id;
}));
if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
