const paths={
 ghost:'M5 26V15a11 11 0 0 1 22 0v11l-5-4-6 5-6-5-5 4ZM12 14v2m8-2v2',
 host:'M16 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12ZM5 29v-4a11 11 0 0 1 22 0v4Z',
 clock:'M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 5v8l5 3',
 coin:'M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 6v12m-3-9 3-3',
 heart:'M16 28 5 17C-1 8 10 2 16 10c6-8 17-2 11 7Z',
 tap:'M12 16V6a2 2 0 0 1 4 0v9l3-2 7 4-2 11H11l-7-8 3-3 5 4',
 lock:'M9 13V9a7 7 0 0 1 14 0v4M6 13h20v15H6Zm10 6v4',
 lantern:'M12 8V5a4 4 0 0 1 8 0v3M8 8h16l3 17H5Zm5 13 3-8 3 8Z',
 sword:'m7 25 19-19 2-2-1 9L11 28m-6-9 8 8m-9 2 5-5',
 fist:'M5 17V9l4-2 3 2 4-3 4 2 4-1 3 5-2 10-5 6H11l-6-7Zm4-8v7m7-8v8m6-7v7',
 magic:'m16 3 3 9 10 4-10 3-3 10-3-10-10-3 10-4Z',
 shield:'m16 3 11 5v8c0 7-7 11-11 14-4-3-11-7-11-14V8Zm-5 13 3 3 7-7',
 target:'M16 4a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm0 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM16 1v5m0 20v5M1 16h5m20 0h5',
 people:'M12 6a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm8 0a5 5 0 0 1 0 10M3 27v-3a9 9 0 0 1 18 0v3Zm19-9a7 7 0 0 1 7 7v2h-5',
 shop:'M4 11 7 5h18l3 6v5H4Zm3 5v12h18V16m-13 12v-8h8v8',
 card:'M7 3h18v26H7Zm9 6 4 7-4 7-4-7Z',
 star:'m16 3 4 8 9 2-7 6 2 9-8-4-8 4 2-9-7-6 9-2Z',
 gem:'M3 12 9 5h14l6 7-13 16Zm0 0h26M9 5l7 23 7-23',
 tower:'M9 29V9h14v20ZM9 9V3h4v6m6 0V3h4v6m-10 6h6m-6 5h6m-6 5h6',
 bolt:'M17 2 5 18h10l-1 12 13-18H17Z',
 skull:'M8 23a12 12 0 1 1 16 0v5H8Zm3-7v2m10-2v2m-5 5v5',
 arrow:'M3 16h24m-8-8 8 8-8 8'
};
export const icon=name=>`<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="${paths[name]}"/></svg>`;
export function artboards(t,asset,shot) {
 const n=(glyph,title,stat='',note='')=>`<div class="visual-node">${icon(glyph)}<strong>${t(title)}</strong>${stat?`<b>${stat}</b>`:''}${note?`<small>${t(note)}</small>`:''}</div>`;
 const arrow=()=>`<span class="signal-arrow">${icon('arrow')}</span>`;
 const chain=(...nodes)=>`<div class="visual-chain">${nodes.join(arrow())}</div>`;
 const p=(name,cls='')=>`<img class="visual-portrait ${cls}" src="${asset('portrait_'+name)}" alt="" loading="lazy">`;
 const board=(id,page,html)=>`<div class="artboard board-${id}" data-source="${page}">${html}</div>`;
 const nodes=[
  ['ghost','유령|幽霊|Ghost','0','출전비 · 유령 EXP +50%|出撃費用・幽霊EXP＋50%|Entry fee · Ghost EXP +50%'],
  ['host','보유 호스트|所持ホスト|Owned host','GOLD','호스트별 출전비 × 챕터 배율|ホスト別費用×チャプター倍率|Host fee × chapter multiplier'],
  ['card','? 랜덤|？ランダム|? Random','R × 80%','골드 +20% · 클리어 조각 +2 · 히든 1%|ゴールド＋20%・クリアで欠片＋2・隠し1%|Gold +20% · 2 shards on clear · 1% hidden'],
  ['clock','오늘의 호스트|本日のホスト|Daily host','0','출전비 · 미보유 포함 · 05:00 교체|出撃費用・未所持も対象・05:00更新|Entry fee · includes unowned · resets 05:00']
 ];
 return {
 start:()=>board('start','7,10',`<div class="entry-grid">${nodes.map(args=>n(...args)).join('')}</div><div class="visual-foot">${icon('bolt')} ${t('챕터 입장 행동력 5|チャプター入場に行動力5|5 energy per chapter entry')}</div>`),
 possess:()=>board('possess','3–4',`${chain(n('heart','적 호스트 HP|敵ホストのHP|Enemy host HP','<span class="hp-mini"></span> <span>‹ 70%</span>'),n('tap','빙의 가능 → 터치|憑依可能 → タップ|Eligible → tap'),n('people','메인·보조·놔두기|メイン・サポート・見送り|Main · support · leave'),n('heart','빙의한 몸의 체력|憑依した体のHP|Possessed body HP','100%'))}<div class="party-map">
 <div class="choice-map"><b>${t('빙의 선택|憑依先を選択|Choose a slot')}</b>${[['host','메인 교체|メイン交代|Replace main','−20'],['people','보조 1·2 배치|サポート1・2に配置|Assign support 1 or 2','−10'],['arrow','놔두기|見送る|Leave','0']].map(args=>n(...args)).join('')}</div>
 <div class="formation"><span>${p('ninja')}<small>${t('보조 1 · 위력 30%|サポート1・威力30%|Support 1 · 30% power')}</small></span><span>${p('gangster')}<strong>${t('메인|メイン|Main')}</strong></span><span>${p('snowwoman')}<small>${t('보조 2 · 위력 30%|サポート2・威力30%|Support 2 · 30% power')}</small></span></div></div>`),
 survive:()=>board('survive','3–4',`<div class="hp-chart">${[[100,'챕터 시작|チャプター開始|Chapter start'],[80,'첫 빙의 −20|初回憑依 −20|First possession −20'],[70,'보조 −10|サポート −10|Support −10'],[60,'보조 −10|サポート −10|Support −10']].map(([v,label])=>`<div><span>${t(label)}</span><i><em style="--fill:${v}%"></em></i><b>${v}</b></div>`).join('')}<div class="critical">${icon('lock')} ${t('HP 20 미만 → 게임 오버|HP20未満 → ゲームオーバー|Below 20 HP → game over')}</div></div><div class="branch"><b>${t('메인이 쓰러지면|メインが倒れたら|Main host falls')}</b><div>${n('lantern','등불 부활|ランタンで復活|Lantern revival','50%')}${n('people','보조 승격|サポート昇格|Promote support','15s · −20')}${n('ghost','재빙의|再憑依|Repossess','−20')}</div></div>`),
 hosts:()=>board('hosts','3–4,9–11',`<div class="host-systems"><div class="triangle">${n('fist','파워|パワー|Power')}${n('sword','무기|ウェポン|Weapon')}${n('magic','마법|マジック|Magic')}<svg viewBox="0 0 240 150" aria-hidden="true"><path d="M73 64 111 28m15 0 43 39m-12 45H83m18-84h10v11m58 18v10h-10m-66 38-10 7 10 7"/></svg><small>×1.3 / ×0.7</small></div><div class="faction-bond"><div class="factions">${[['target','갱단|ギャング|Gang'],['heart','코만도|コマンドー|Commando'],['shield','무도|武闘|Martial'],['skull','괴물|モンスター|Monsters'],['magic','마도|魔道|Mystics']].map(args=>n(...args)).join('')}</div><div class="bond">${p('gangster')}<div><b>${t('인연 · 낮은 성급 기준|絆・低い方の星ランク|Bond · lower star rank')}</b><small>★ 0–3 ×1　·　4–7 ×1.15　·　8–10 ×1.3</small></div>${p('thug')}</div></div></div><div class="skill-strip">${n('bolt','액티브|アクティブ|Active')}${n('shield','패시브|パッシブ|Passive')}${n('magic','필살기|必殺技|Ultimate','35–50s')}</div>`),
 run:()=>board('run','4–7',`<div class="run-map">${[[1,'ghost','시작|開始|Start'],[5,'magic','천사 제단|天使の祭壇|Angel shrine'],[10,'skull','중간 보스 → 악마 제단|中ボス → 悪魔の祭壇|Midboss → Devil shrine'],[15,'shop','떠돌이 상인|旅の商人|Merchant'],[20,'skull','중간 보스 → 악마 제단|中ボス → 悪魔の祭壇|Midboss → Devil shrine'],[25,'magic','천사 제단|天使の祭壇|Angel shrine'],[30,'target','챕터 보스|チャプターボス|Chapter boss']].map(([floor,glyph,label])=>n(glyph,label,String(floor).padStart(2,'0'))).join('')}</div><div class="pick-flow"><div>${icon('card')}${icon('card')}${icon('card')}</div>${arrow()}${n('card','레벨업 카드 3장 중 1장|カード3枚から1枚|Pick 1 of 3 level-up cards')}</div>`),
 growth:()=>board('growth','9–11',`${chain(n('gem','조각|欠片|Shards'),n('lock','자동 해금|自動解放|Auto-unlock','R 2 · SR 4 · SSR 6'),n('star','성급|星ランク|Star rank','0 → 10'),n('bolt','스킬 Lv|スキルLv|Skill levels','10 / 5','액티브 / 필살기|アクティブ／必殺技|Active / ultimate'))}<div class="ghost-stats"><b>${icon('ghost')} ${t('유령 강화 9줄 · 최대 Lv.120|幽霊強化9項目・最大Lv.120|9 ghost upgrades · Lv.120 max')}</b><div>${[['sword','공격|攻撃|Attack'],['heart','체력|HP|HP'],['target','치명|クリティカル|Crit'],['magic','치명 피해|会心ダメージ|Crit damage'],['bolt','공속|攻撃速度|Attack speed'],['arrow','이속|移動速度|Move speed'],['target','사거리|射程|Range'],['shield','피해 감소|被ダメージ軽減|Damage reduction'],['people','보조 위력|サポート威力|Support power']].map(args=>n(...args)).join('')}</div></div>`),
 tower:()=>board('tower','7–8',`<div class="tower-map"><img src="${asset('rb_art_key_challenge_tower')}" alt="" loading="lazy"><ol>${[[50,'소환권 5 · SSR 조각 3|召喚券5・SSRの欠片3|5 summon tickets · 3 SSR shards'],[25,'소환권 4|召喚券4|4 summon tickets'],[20,'SR 조각 3|SRの欠片3|3 SR shards'],[10,'SR 조각 3|SRの欠片3|3 SR shards'],[1,'첫 빙의 · HP 40|初回憑依・HP40|First possession · 40 HP']].map(([floor,label])=>`<li><b>${floor}F</b><span>${t(label)}</span></li>`).join('')}</ol></div><div class="visual-foot">${icon('clock')} ${t('주간 첫 클리어 보상 · 월요일 05:00 초기화|毎週の初クリア報酬・月曜05:00リセット|Weekly first-clear rewards · resets Monday 05:00')}</div>`),
 gold:()=>board('gold','8–9',`<div class="difficulty">${[['쉬움|易しい|Easy','3 MIN','×1'],['보통|普通|Normal','4 MIN','×1.5'],['어려움|難しい|Hard','5 MIN','×2']].map(([label,time,gain])=>n('clock',label,time,gain+' '+t('골드|ゴールド|gold')+'|'+gain+' '+t('골드|ゴールド|gold')+'|'+gain+' '+t('골드|ゴールド|gold'))).join('')}</div><div class="week">${[['월|月|MON','fist','주먹|拳|Fists'],['화|火|TUE','target','총|銃|Guns'],['수|水|WED','people','갱단+괴물|ギャング＋怪物|Gang + Monsters'],['목|木|THU','shield','코만도|コマンドー|Commando'],['금|金|FRI','magic','무도+마도|武闘＋魔道|Martial + Mystics'],['토|土|SAT','host','전체|全員|All'],['일|日|SUN','host','전체|全員|All']].map(([day,glyph,label])=>n(glyph,day,'',label)).join('')}</div><div class="streak">${n('target','10연속|10連続|10 kills','×1.2')}${n('target','30연속|30連続|30 kills','×1.5')}${n('target','60연속|60連続|60 kills','×2')}${n('skull','종료 1분 전 보스|残り1分でボス|Boss at 1 min left')}</div>`),
 economy:()=>board('economy','11–13',`<div class="currency-map">${[['gem','젬|ジェム|Gems','소환 · 상자 · 행동력 충전 · 새로고침 · 추가 입장|召喚・箱・行動力回復・更新・追加入場|Summons · chests · energy · refreshes · extra entries'],['coin','골드|ゴールド|Gold','출전 · 성급 · 강화|出撃・星ランク・強化|Entry · star ranks · upgrades'],['bolt','행동력|行動力|Energy','챕터 입장 −5|チャプター入場 −5|Chapter entry −5']].map(([glyph,label,to])=>`<div>${n(glyph,label)}${arrow()}<strong>${t(to)}</strong></div>`).join('')}</div><div class="summon-bar" role="img" aria-label="R 79%, SR 19%, SSR 2%"><div><i></i><i></i><i></i></div><span>R <b>79%</b></span><span>SR <b>19%</b></span><span>SSR <b>2%</b></span></div>`)
 };
}
