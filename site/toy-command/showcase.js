const languages = ['ko', 'ja', 'en'];
const index = Math.max(0, languages.indexOf(new URLSearchParams(location.search).get('lang')));
const lang = languages[index];
const t = (ko, ja, en) => [ko, ja, en][index];
document.documentElement.lang = lang;
document.querySelector(`nav [lang=${lang}]`).setAttribute('aria-current','page');
const media = 'media/';
const pic = (name, caption, cls='') => `<figure class="${cls}"><img src="${media}${name}.webp" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;
const loop = (name, poster) => `<figure class="feature"><video id="loop-${name}" muted playsinline loop preload="none" poster="${media}${poster}.webp" aria-label="${t('실제 게임 플레이','実際のゲームプレイ','Gameplay footage')}"><source src="${media}${name}.webm" type="video/webm"><source src="${media}${name}.mp4" type="video/mp4"></video></figure>`;
const grid = (...children) => `<div class="grid">${children.join('')}</div>`;
const flow = (...steps) => `<ol class="resource-flow">${steps.map(([asset,label])=>`<li><img src="${media}${asset}.webp" alt="" loading="lazy"><span>${label}</span></li>`).join('')}</ol>`;
const section = (tag, name, copy, body) => `<section class="wrap"><span class="eyebrow">${tag}</span><h2>${name}</h2><p>${copy}</p>${body}</section>`;
const weapons = [
 ['W00','별 딱총','スターポップガン','Star Pop Gun',10,'∞','5'],
 ['W01','헤비 코르크 머신건','ヘビーコルクマシンガン','Heavy Cork Machine Gun',9,200,'12'],
 ['W02','구슬 펌프 샷건','ビー玉ポンプショットガン','Marble Pump Shotgun',9,30,'1.6 × 7'],
 ['W03','슈퍼 물대포','スーパー水鉄砲','Super Water Cannon',6,120,'8'],
 ['W04','슬라임 유탄','スライムグレネード','Slime Grenade',15,15,'1.2'],
 ['W05','폼로켓 런처','フォームロケットランチャー','Foam Rocket Launcher',25,12,'1 × 3'],
 ['W06','디스크 런처','ディスクランチャー','Disc Launcher',35,20,'1.5'],
 ['W07','컨페티 플레이머','コンフェッティフレイマー','Confetti Flamer',8,100,'10'],
 ['W08','찌릿 정전기건','静電チェーンガン','Static Chain Gun',25,60,'4'],
 ['W09','다트 저격 라이플','ダーツスナイパーライフル','Dart Sniper Rifle',120,10,'0.9'],
 ['W10','스페이스 블래스터','スペースブラスター','Space Blaster',15,80,'10'],
 ['B01','물풍선 폭탄','水風船ボム','Water Balloon Bomb',80,3,''],
 ['J01','고무닭','ゴム製チキン','Rubber Chicken',150,1,'']
];
const weaponGrid = grid(...weapons.map(([id,ko,ja,en,dmg,ammo,rate])=>`<article class="weapon-card"><img src="${media}${(['W06','W07'].includes(id)?'shot-':'detail-')+id}.webp" alt="${t(ko,ja,en)}" loading="lazy"><h3>${t(ko,ja,en)}</h3>${id==='J01' ? `<p>${t('떨어진 자리 근처의 일반 적을 2초 동안 웃게 해 멈춘다','落下地点付近の通常の敵を笑わせ、2秒間足止めする','Makes nearby regular enemies stop and laugh for 2 seconds')}</p>` : ''}<small>${t('피해','ダメージ','Damage')} ${dmg} · ${t('탄수','弾数','Ammo')} ${ammo}${rate ? ` <span class="shot-rate">${t('발사/초','発射/秒','Shots/s')} ${rate}</span>`:''}</small></article>`));
const chapters = [ ['동네 문방구','町の文具店','Neighborhood Stationery'],['키즈카페','キッズカフェ','Kids’ Café'],['하비샵','ホビーショップ','Hobby Shop'],['야시장','ナイトマーケット','Night Market'],['보드게임','ボードゲーム','Board Games'],['아쿠아','アクア','Aqua'],['갤러리아','ガレリア','Galleria'],['엑스포','エキスポ','Expo'],['메가스토어','メガストア','Megastore'],['플래그십','旗艦店','Flagship'] ];
const modes = [
 [t('토이 리그','トイリーグ','Toy League'),'2-10',t('5분 · 동일 장비 · 주간 점수 경쟁','5分・装備固定・週間スコア競争','5 min · fixed gear · weekly high scores'),t('리그 메달 · 황금 태엽','リーグメダル・金のぜんまい','League medals · golden wind-up keys')],
 ['TOY WEST','3-10',t('약 30분 · 장비 고정 · 갈림길과 원코인 클리어','約30分・装備固定・分岐とワンコインクリア','~30 min · fixed gear · branching routes and one-credit clears'),t('서부 무기 스킨 · 칭호','西部風武器スキン・称号','Western weapon skins · titles')],
 [t('캡슐 러시','カプセルラッシュ','Capsule Rush'),'5-10',t('10~15분 · 내 성장 적용 · 강화 3장 중 1장','10〜15分・育成反映・強化カードを3枚から1枚選択','10–15 min · progression enabled · pick 1 of 3 upgrades'),t('10 · 20 · 30 · 50층 첫 달성 보상','10・20・30・50階の初到達報酬','First-time rewards at floors 10, 20, 30 and 50')],
 [t('말랑성 원정','ぷにぷに城遠征','Squishy Castle Expedition'),'4-10',t('약 5분/등급 · 장비와 모듈로 공장 결함 돌파','難度ごとに約5分・装備とモジュールで工場の異常に対処','~5 min per tier · tackle factory hazards with gear and modules'),t('젤리 결정 · 모듈 상자 · 돌파석','ゼリー結晶・モジュール箱・限界突破石','Jelly crystals · module crates · breakthrough stones')]
];
const development = t('개발 중 화면','開発中の画面','Development footage');
const chapterCast = [
 ['E01','M01','B01'], ['E11','M02','B02'], ['E15','M03','B03'], ['E21','M04','B04'],
 ['E33','M10','B11'], ['E25','M05','B05'], ['E22','M06','B06'], ['E28','M07','B07'],
 ['E30','M08','B08'], ['E19','M09','B09','B10'],
];
const modeArt = ['league-action','west-action','G13_1_capsule_ballpool_f03','expedition-action'];
const modeGrid = grid(...modes.map(([name,gate,rules,reward],i)=>`<article class="mode">${modeArt[i] ? `<img class="mode-art" src="${media}${modeArt[i]}.webp" alt="" loading="lazy">` : ""}<small>${t('해금','解放','Unlock')} ${gate}</small><h3>${name}</h3><p>${rules}</p><small>${reward}</small></article>`));
const markup = `
<section class="hero"><video class="hero-play" muted playsinline loop preload="metadata" poster="${media}hero-action.webp" aria-label="${t('실제 게임 플레이','実際のゲームプレイ','Gameplay footage')}"><source src="${media}hero-action.webm" type="video/webm"><source src="${media}hero-action.mp4" type="video/mp4"></video><div class="copy"><img class="logo" src="${media}toy-command-${lang==='ko'?'ko':'intl'}.png?v=4" alt="${t('장난감 특공대','TOY COMMAND','TOY COMMAND')}"><h1>${t('작은 장난감들의<br>아주 큰 전쟁','小さなおもちゃの<br>大きな戦い','Tiny toys.<br>One big battle.')}</h1><p>${t('크리스마스 전날, 빙의된 장난감 군단을 막아라.','クリスマス目前。乗っ取られたおもちゃ軍団を止めろ。','Stop a possessed toy army before Christmas.')}</p></div></section>
${section('00 / STORY',t('가게를 지켜라','おもちゃ屋を守れ','Defend the toy shop'),t('외계 존재가 장난감 군단에 빙의했다. 크리스마스 전날, 태엽 토끼 잭 래빗이 가게를 지킨다.','宇宙から来た存在がおもちゃの軍団に取りついた。クリスマス前夜、ぜんまいウサギのジャック・ラビットがおもちゃ屋を守る。','Alien beings possess a toy army on Christmas Eve. Wind-up rabbit Jack Rabbit defends the shops.'),`<div class="story-beat"><div><div class="story-jack-stage story-intruder" aria-hidden="true"><svg viewBox="0 0 320 180"><defs><linearGradient id="intruder-ink" x2="1" y2="1"><stop stop-color="#f3b6ff"/><stop offset=".43" stop-color="#9c48d0"/><stop offset="1" stop-color="#341449"/></linearGradient></defs><path d="M39 17c57 31 87 0 124 26 16 11 28 10 49 20 34 17 35 47 9 66-16 11-41 12-58 2-16-10-24-28-37-38-17-13-42-9-59-18 19 0 32-4 35-12-26 1-52-15-63-46Z" fill="url(#intruder-ink)" stroke="#d990fa" stroke-width="2"/><path d="M153 82q20-10 39 5l-5 10q-19 1-34-15m77-3q-15-4-27 9l6 8q15-3 21-17" fill="#ffeaff"/></svg></div><strong>${t('외계 존재가 침입 · 삽화','宇宙からの侵入・イラスト','Alien invasion · illustration')}</strong></div><div><div class="story-jack-stage story-possessed"><img src="${media}story-soldier-game.webp" alt="" loading="lazy"><i aria-hidden="true"></i></div><strong>${t('장난감 병정에 빙의','おもちゃ兵に憑依','Toy soldiers possessed')}</strong></div><div><div class="story-jack-stage"><img src="${media}jack-png-w360.webp" srcset="${media}jack-png-w192.webp 192w, ${media}jack-png-w360.webp 360w" sizes="(max-width: 600px) 96px, 180px" alt="" loading="lazy"></div><strong>${t('잭 래빗 출동','ジャック・ラビット出動','Jack Rabbit deploys')}</strong></div></div>`+grid(pic('N11_lobby_keyvisual',t('가게와 잭 래빗 · 일러스트','おもちゃ屋とジャック・ラビット・イラスト','The toy shop and Jack Rabbit · illustration')),pic('U01_lobby_ko',t('실제 로비 화면','実際のロビー画面','In-game lobby'),'ui')))}
${section('01 / ARCADE SHOOTER',t('조준하고, 구르고, 엄폐물을 써라','狙い、転がり、遮蔽物を使おう','Aim, roll and use cover'),t('태엽 토끼 잭 래빗이 출동한다. 화면 위쪽의 적을 쏘고, 공격 예고가 보이면 굴러 피한다.','ぜんまい仕掛けのジャック・ラビットが出動。画面上方の敵を撃ち、予兆を見たらローリングで回避。','Wind up Jack Rabbit, fire at enemies up-screen and roll clear of incoming attacks.'),loop('L01','G01v3_market_hero_a_f05')+loop('L02','L02-new-poster')+grid(pic('U21_battle_hud_ko_f01',t('이동 · 자동 연사','移動・オート連射','Move · auto-fire')),pic('G02_dodge_roll_b_f07',t('공격 예고 → 구르기','攻撃予兆 → ローリング','Attack tell → roll')),pic('G12_1_shutter_enter_f07',t('다음 가게로 전진','次の店へ進む','Advance to the next shop')))+grid(...[1,2,3].map((step,i)=>pic(`cover-step-${step}`,[t('엄폐','遮蔽','Cover'),t('손상','損傷','Damaged'),t('붕괴','破壊','Broken')][i]))))}
${section('02 / CHAIN REACTION',t('진열대째 무너뜨려라','棚ごと崩せ','Bring the shelves down'),t('진열대와 발코니를 쏘면 아래 적을 덮치고 동전이 쏟아진다.','棚やバルコニーを撃つと下の敵を巻き込み、コインが降り注ぐ。','Shoot down shelves and balconies to crush enemies and spill coins.'),loop('L03','L03-collapse-poster'))}
${section('03 / PICKUP',t('포로를 구하고 무기를 바꿔라','仲間を救って武器を拾え','Rescue toys and pick up their weapons'),t('구출한 장난감이 무기를 떨어뜨린다. 탄을 다 쓰면 무한탄 별 딱총으로 돌아간다.','助けたおもちゃが武器を落とす。弾切れになると無限弾のスターポップガンに戻る。','Rescued toys drop weapons. Run out of ammo and switch back to the unlimited Star Pop Gun.'),loop('L05','L05-new-poster')+grid(pic('G06_rescue_a_freed_crop_f05',t('포로 구출','仲間を救出','Rescue')),pic('G06_rescue_c_firstshot_crop_f05',t('샷건 첫 발','ショットガンの一撃','First shotgun blast'))))}
${section('04 / ARMORY',t('13가지 무기, 13가지 손맛','13種の武器、異なる手応え','13 weapons, 13 ways to fire'),t('기본 피해는 탄 한 발 기준.','基本ダメージは弾1発あたり。','Base damage is per projectile.'),loop('L06','L06-new-poster')+weaponGrid)}
${section('05 / BOSS ENCOUNTERS',t('다섯 대가 한 몸으로','5台が1体に合体','Five vehicles. One giant boss.'),t('예고를 피하고 약점과 부위를 노려라.','予兆をかわし、弱点やパーツを狙え。','Read the tells and target weak points and breakable parts.'),loop('L07','G11_3_pose_f03')+loop('L08','G10_1_roar_f05')+loop('L09','L09-new-poster')+grid(pic('atlas-vehicles-lineup',t('합체 전 차량 5대','合体前の車両5台','Five vehicles before the merge')),pic('G11_2_transform_b_f05',t('변신','変形','Transformation')),pic('G10_6_partbreak_f04',t('렉스 데모기 · 포효 · 꼬리 쓸기 예고 · 부위 파괴','レックスデモ機・咆哮・尻尾なぎ払いの予兆・部位破壊','Rex Demo · roar, tail-sweep tell and part break'))))}
${section('06 / CAMPAIGN',t('10챕터 · 100스테이지','全10章・100ステージ','10 chapters · 100 stages'),t('스토리 전장 41곳. 장마다 적과 보스가 달라진다.','ストーリーの戦場は41種類。章ごとに敵とボスが変わる。','41 story arenas with different enemies and bosses across the chapters.'),`<div class="chapter-gallery">${chapters.map((names,i)=>{
    const chapter=String(i+1).padStart(2,'0');
    const label=`${i+1} · ${t(...names)}`;
    const cast=chapterCast[i].map((id, role)=>{
        const caption=role===0?t('적','敵','Enemy'):role===1?t('중간보스','中ボス','Midboss'):t('보스','ボス','Boss');
        return `<span><img src="${media}campaign-${id}.webp" alt="" loading="lazy">${caption}</span>`;
    }).join('');
    return `<details class="chapter"><summary><img src="${media}chapter-${chapter}-scene.webp" alt="" loading="lazy">${label}<div class="chapter-cast">${cast}</div></summary><a href="${media}U03_ch${chapter}_ko.webp"><img src="${media}U03_ch${chapter}_ko-focus.webp" alt="${label}" loading="lazy">${t('지도 크게 보기','地図を拡大','View full map')}</a></details>`;
}).join('')}</div>`)}
${section('07 / MODES',t('네 가지 다른 도전','4つの異なる挑戦','Four ways to play'),t('점수 경쟁, 원코인 완주, 즉석 강화, 모듈 원정.','スコア競争、ワンコイン完走、その場で強化、モジュール遠征。','Chase scores, clear on one credit, draft upgrades or take modules on expedition.'),modeGrid+grid(pic('U20_capsule_perk_ko',t('캡슐 러시 · 강화 선택','カプセルラッシュ・強化選択','Capsule Rush · Choose an upgrade'),'ui'),pic('capsule-rush-action',t('캡슐 러시 · 선택 후 전투','カプセルラッシュ・選択後の戦闘','Capsule Rush · Combat after selection'),'ui'))+loop('L10','modes-loop-poster'))}
${section('08 / WORKSHOP',t('정비하고, 갈아입고, 수집하라','整備、着せ替え、コレクション','Upgrade, dress up and collect'),t('장비 6부위, 옷장 13벌, 도감 112종. 코스튬은 옷장에서 확인할 수 있다.','装備6部位、衣装13着、図鑑112種。衣装はクローゼットで確認できる。','6 gear slots, 13 wardrobe outfits and 112 collection entries. Try on outfits in the wardrobe.'),flow(['U19_result_ko',t('작전 완료','作戦完了','Operation cleared')],['flow-rewards-game',t('나사 · 조각 획득','ネジ・かけらを獲得','Collect screws and parts')],['flow-gear-game',t('정비에서 장비 성장','整備で装備を強化','Upgrade gear in the workshop')])+loop('L11','wardrobe-full')+grid(pic('workshop-U05_armory_t0_ko',t('태엽 심장 특성','ぜんまいハートの特性','Wind-up Heart traits'),'ui'),pic('workshop-U07_armory_t2_ko',t('장비 정비','装備整備','Gear upgrades'),'ui'),pic('wardrobe-alt',t('옷장','クローゼット','Wardrobe'),'ui'),pic('workshop-U18_codex_bosses_ko',t('보스 도감','ボス図鑑','Boss collection'),'ui')))}
${section('09 / SUPPLY',t('상점과 작전 기록','ショップと作戦記録','Supply shop and Operation Record'),t('8주 패스 · 저금통 · 코스튬 상점 · VIP 30일 · 확률 공개 보급 상자.','8週間パス・貯金箱・衣装ショップ・30日間VIP・排出率公開の補給箱。','8-week pass · piggy bank · outfit shop · 30-day VIP · supply crates with disclosed odds.'),grid(pic('U12_shop_t2_ko-focus',t('작전 기록','作戦記録','Operation Record'),'ui'),pic('U13_piggy_ko-focus',t('저금통','貯金箱','Piggy bank'),'ui'),pic('U14_shop_box_ko-focus',t('보급 상자 · 50회 천장','補給箱・50回で天井','Supply crate · 50-pull guarantee'),'ui')))}
<footer class="wrap closing"><div><img class="footer-logo" src="${media}toy-command-${lang==='ko'?'ko':'intl'}.png?v=4" alt="TOY COMMAND" loading="lazy"><span>${development}</span><p class="minor">${t('실제 게임 UI는 한국어로 표시됩니다.','ゲーム内UIは韓国語で表示しています。','The captured game UI is shown in Korean.')}</p></div><div class="boss-lineup closing-stage" role="img" aria-label="${t('잭 래빗과 보스 세 종 · 단체 일러스트','ジャック・ラビットとボス3体・イラスト','Jack Rabbit and three bosses · group illustration')}">${['footer-atlas-game','jack-png-w360','R02_boss_tintron','footer-rex-game'].map(name=>`<span><img src="${media}${name}.webp" alt="" loading="lazy"></span>`).join('')}</div></footer>`;
const imageSizes = {
    logo: '(max-width: 600px) 220px, 440px',
    'footer-logo': '320px',
    'mode-art': '(max-width: 600px) 335px, 280px',
};
document.querySelector('#showcase').innerHTML = (matchMedia('(max-width: 600px)').matches ? markup.replace(/poster="(media\/[^"]+)\.webp"/g, 'poster="$1-mobile.webp"') : markup).replace(/<img\b[^>]*>/g, tag => {
    const source = tag.match(/src="media\/([^?"]+)/)?.[1];
    const srcset = responsiveImages[source];
    if (!srcset) return tag;
    const style = tag.match(/class="([^"]+)/)?.[1]?.split(' ')[0];
    const sizes = imageSizes[style] || '(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) 45vw, 570px';
    return tag.replace('>', ` srcset="${srcset}" sizes="${sizes}">`);
});

const videos = document.querySelectorAll('video');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function addVideoToggle(video) {
    if (video.nextElementSibling) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-toggle';
    button.setAttribute('aria-controls', video.id);
    const refresh = () => {
        button.textContent = video.paused ? t('영상 재생','動画を再生','Play video') : t('일시정지','一時停止','Pause');
    };
    button.addEventListener('click', () => {
        if (!video.paused) video.pause();
        else video.play().catch(() => { video.controls = true; });
    });
    video.addEventListener('play', refresh);
    video.addEventListener('pause', refresh);
    refresh();
    video.after(button);
}
if (reduceMotion) {
    videos.forEach(addVideoToggle);
} else {
    const observer = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
            if (isIntersecting) target.play().catch(() => addVideoToggle(target));
            else target.pause();
        }
    }, { threshold: 0.25 });
    videos.forEach(video => observer.observe(video));
}
