const url = new URL(location.href);
const lang = ['ko','ja','en'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'ko';
const uiLang = lang === 'en' ? 'ja' : lang;
const t = value => value.split('|')[['ko','ja','en'].indexOf(lang)];
const asset = (name, ext='webp') => './assets/edition-1106/'+name+'.'+ext;
const media = (kind, name, caption, eager=false) => {
  const label = t(caption);
  const src = kind === 'gif' ? asset('loop-'+name) : asset(name+'-'+uiLang+(['10','19'].includes(name)?'-full':''));
  return `<figure class="game-frame"><img src="${src}" alt="${label}" ${eager?'fetchpriority="high"':'loading="lazy"'}><figcaption>${label}</figcaption></figure>`;
};
const gif = (name,caption,eager) => media('gif',name,caption,eager);
const screen = (name,caption) => media('screen',name,caption);
const copy = (title,body) => `<div class="chapter-copy"><h2>${t(title)}</h2><p>${t(body)}</p></div>`;
const gallery = (...items) => `<div class="game-gallery">${items.join('')}</div>`;
const chapter = (id,heading,visual,extra='') => `<section id="${id}" class="story story-${id}"><div class="story-opening">${heading}${visual}</div>${extra}</section>`;
const route = [
  ['01','첫 전투|最初の戦闘|First fight'],
  ['10','중간 보스|中ボス|Midboss'],
  ['15','떠돌이 상인|旅の商人|Traveling merchant'],
  ['20','중간 보스|中ボス|Midboss'],
  ['30','챕터 보스|チャプターボス|Chapter boss']
];
const routeGraphic = `<div class="chapter-route"><ol aria-label="${t('챕터의 주요 지점|チャプターの主な部屋|Chapter milestones')}">${route.map(([room,label])=>`<li><strong>${room}</strong><span>${t(label)}</span></li>`).join('')}</ol><img src="${asset('room-hud-'+uiLang)}" alt="${t('게임 화면 상단의 현재 방 표시|画面上部の現在地表示|Current room shown at the top of the game screen')}" loading="lazy"><p>${t('게임 화면 위에서 현재 방을 확인할 수 있습니다.|画面上部で、いま何部屋目かを確認できます。|The display at the top of the screen shows which room you’re in.')}</p></div>`;
const title = t('적의 몸으로 싸우는 액션 로그라이크|敵に乗り移って戦うアクションローグライク|An action roguelike about possessing enemies');
document.documentElement.lang = lang;
document.title = 'AVENGING SPIRIT-M — '+title;
document.querySelector('meta[name=description]').content = title;
document.querySelector('#app').innerHTML = `
<header class="header"><div class="header-inner"><a class="brand" href="#home">AVENGING <span>SPIRIT-M</span></a>
<nav><a href="#possess">${t('빙의|憑依|Possession')}</a><a href="#hosts">${t('호스트|ホスト|Hosts')}</a><a href="#run">${t('챕터|チャプター|Chapters')}</a><a href="#tower">${t('도전|チャレンジ|Challenges')}</a></nav>
<div class="languages">${[['ko','한국어'],['ja','日本語'],['en','EN']].map(([key,label])=>`<a href="?lang=${key}${url.hash}" hreflang="${key}" ${lang===key?'aria-current="true"':''}>${label}</a>`).join('')}</div></div></header>
<main>
<section id="home" class="hero"><div class="hero-bg"></div><div class="hero-inner"><div class="hero-copy">
<h1 class="game-title"><img class="logo" src="${asset('rb_art_logo_transparent')}" alt="Avenging Spirit" fetchpriority="high"><span>AVENGING SPIRIT-M</span></h1>
<p class="hero-genre">${title}</p><p class="lead">${t('유령이 되어 적에게 빙의하세요. 몸을 바꿀 때마다 무기와 기술도 달라집니다.|幽霊になって敵に乗り移ろう。体を替えれば、使える武器も技も変わります。|Possess an enemy and fight with its weapons and abilities. Switch bodies to change how you play.')}</p></div>
${gif('possess','적에게 빙의하는 실제 플레이|敵に乗り移るプレイ映像|Gameplay: taking over an enemy',true)}</div></section>
<div class="edition-wrap">
${chapter('start',copy('출전할 몸을 고르세요|どの体で出撃する？|Choose your starting body','유령으로 출발하면 첫 방에서 몸을 얻습니다. 보유 호스트를 선택하거나 랜덤과 오늘의 호스트로 시작할 수도 있습니다.|幽霊で出撃すると、最初の部屋で敵に乗り移れます。所持ホストのほか、ランダムや本日のホストでも出撃できます。|Start as a ghost and take a body in the first room, bring a host you own, or try a random or daily host.'),screen('01','챕터 출전 화면|チャプターの出撃画面|Chapter entry'))}
${chapter('possess',copy('쓰러뜨릴 적, 빙의할 적|倒すか、乗り移るか|Defeat them or take over','적의 체력이 70% 아래로 내려가면 빙의할 수 있습니다. 새 몸을 직접 조종하거나 보조로 둘 수 있습니다. 보조 두 명은 메인과 함께 싸웁니다.|敵のHPが70％を切ると憑依できます。乗り移った体は自分で操作するか、サポートに回せます。サポートは最大2体まで一緒に戦います。|Once an enemy drops below 70% health, take over as your main host or assign it to support. Up to two supports fight alongside you.'),gallery(screen('03','빙의한 몸을 어느 자리에 넣을지 선택|憑依した敵の配置を選ぶ|Choose a role for the new host'),screen('02','메인과 보조가 함께 싸우는 모습|メインとサポートの共闘|Your main host fights alongside two supports')))}
${chapter('survive',copy('몸을 잃어도 한 번 더|体を失っても、まだ戦える|Losing a body isn’t the end','메인이 쓰러지면 보조를 대신 내보낼 수 있습니다. 몸을 바꾸는 데는 유령 HP가 들고, 영혼 등불이 있으면 쓰러진 메인을 되살릴 수 있습니다.|メインが倒れたら、サポートを代わりに出せます。体の交代には幽霊HPを使います。魂のランタンがあれば、倒れたメインを復活させられます。|If your main host falls, promote a support to take over. Swapping costs ghost HP. A Soul Lantern can revive your fallen host.'),gif('rescue','메인 호스트가 쓰러졌을 때의 전투|メインホストが倒れたときの戦闘|Gameplay: losing your main host'))}
${chapter('hosts',copy('몸을 바꾸면 전투도 바뀐다|体を替えれば、戦い方も変わる|New body, new fighting style','일반 호스트 21종과 히든 2종. 미사일로 멀리서 공격하거나, 눈보라를 일으키거나, 뱀파이어의 기술로 싸울 수 있습니다.|通常ホスト21体と隠しホスト2体。ミサイルで遠くから攻めたり、吹雪を起こしたり、ヴァンパイアの技を使ったりできます。|There are 21 regular hosts and two hidden ones. Fire missiles from a distance, summon a blizzard, or fight with the vampire’s abilities.'),gallery(gif('missile','미사일 코만도|ミサイルコマンドー|Missile Commando'),gif('snow','설녀|雪女|Snow Woman'),gif('vampire','뱀파이어|ヴァンパイア|Vampire')))}
${chapter('run',copy('한 챕터, 30개의 방|1チャプターは30部屋|30 rooms per chapter','방을 돌파하며 카드를 골라 공격을 강화합니다. 중간 보스와 상인을 지나 마지막 방의 챕터 보스에 도전하세요. 방에 들어갈 때마다 진행이 저장됩니다.|道中でカードを選び、攻撃を強化。中ボスや旅の商人を経て、最後の部屋でチャプターボスに挑みます。進行は入室時に保存されます。|Clear rooms and pick upgrade cards along the way. Fight midbosses, visit the merchant, then face the chapter boss in the final room. Progress saves when you enter a room.'),routeGraphic,gallery(gif('cards','전투 후 카드 3장 중 1장 선택|戦闘後、3枚から1枚を選ぶ|Pick one of three cards after combat'),gif('boss','챕터 보스전|チャプターボス戦|Chapter boss fight')))}
${chapter('growth',copy('한 판이 끝나도 성장은 남는다|プレイを終えても育成は続く|Progress carries over between runs','호스트 조각으로 새 호스트를 얻거나 성급을 올립니다. 유령 강화는 어떤 몸을 쓰든 적용됩니다.|ホストの欠片を集めると、新たなホストの解放や星ランクの強化ができます。幽霊の強化は、どの体でも有効です。|Collect shards to unlock and rank up hosts. Upgrading the ghost improves shared stats, whichever body you use.'),gallery(gif('growth','호스트 성급 올리기|ホストの星ランクを上げる|Ranking up a host'),screen('14','유령의 공통 능력 강화|幽霊の共通ステータスを強化|Upgrading shared ghost stats')))}
${chapter('tower',copy('망령의 탑 50층에 도전|亡霊の塔、全50階へ|Climb all 50 floors of the Spectre Tower','층마다 전투 조건이 달라집니다. 그 층에 나온 호스트 세 명 중 하나를 골라 싸우고, 주간 첫 클리어 보상을 받으세요.|階ごとに戦闘条件が変わります。出現した3体から1体を選んで戦い、その週の初クリア報酬を獲得しましょう。|Each floor changes the rules. Choose one of three available hosts and earn a reward for your first clear of the week.'),gallery(gif('tower','망령의 탑 실제 전투|亡霊の塔の戦闘|Spectre Tower gameplay'),screen('18','층을 클리어한 뒤 받는 보상|クリア後の報酬|Floor clear rewards')))}
${chapter('gold',copy('골드 던전에서 처치를 이어가세요|ゴールドダンジョンで連続撃破|Keep your streak going in the Gold Dungeon','제한 시간 동안 적을 연달아 쓰러뜨리면 골드가 더 쌓입니다. 무리가 몰려올 때 빠르게 처리해 보세요. 출전 호스트는 요일마다 달라집니다.|制限時間内に敵を続けて倒すと、獲得ゴールドが増えます。敵がまとまって来たら一気に倒しましょう。出撃できるホストは曜日で変わります。|Defeat enemies in quick succession to earn more gold before time runs out. Clear groups quickly to keep the streak alive. Available hosts change by day.'),gallery(gif('gold','적을 연달아 쓰러뜨리는 골드 던전 전투|ゴールドダンジョンで敵を連続撃破|Chaining kills in the Gold Dungeon'),screen('19','골드 던전 난이도 선택|ゴールドダンジョンの難易度選択|Gold Dungeon difficulty selection')))}
${chapter('economy',copy('다음 출전을 위한 준비|次の出撃に備える|Gear up for the next run','골드는 출전과 강화에, 젬은 소환 등에 씁니다. 소환과 오늘의 상점에서 호스트 조각을 모을 수 있습니다.|ゴールドは出撃や育成に、ジェムは召喚などに使います。ホストの欠片は召喚や本日のショップで入手できます。|Spend gold on deployment and upgrades, or use gems to summon. Summons and the Daily Shop both offer host shards.'),gallery(gif('summon','호스트 조각 소환|ホストの欠片を召喚|Summoning host shards'),screen('24','오늘의 상점|本日のショップ|Daily Shop')))}
</div></main><footer><p>${t('개발 중인 화면입니다.|画面は開発中のものです。|Gameplay shown is from a build in development.')}</p>${lang==='ko'?'':`<p>${t('게임 UI는 촬영 당시 화면입니다.|プレイ映像には韓国語のゲーム画面が含まれます。|Gameplay clips may show the Korean game interface.')}</p>`}<p>AVENGING SPIRIT · © 1991 JALECO / CITY CONNECTION</p></footer>`;
if(url.hash) requestAnimationFrame(()=>document.getElementById(url.hash.slice(1))?.scrollIntoView());


