const hosts=[
['gangster','R',1,['갱스터','Gangster','ギャング'],['표식 · 처형','Mark & execute','標的・処刑']],
['thug','R',1,['폭력배','Hoodlum','ならず者'],['연속 사격','Rapid gunfire','連続射撃']],
['amazon','R',1,['아마존','Amazon','アマゾン'],['도약 · 근접 돌격','Leap & strike','跳躍・近接突撃']],
['hopper','R',1,['호퍼','Hopper','ホッパー'],['정조준 · 급소 공격','Aim & critical hits','精密射撃・急所']],
['commando_mg','R',1,['코만도 (기관총)','Commando (MG)','コマンドー（機関銃）'],['방벽 · 지속 사격','Barrier & sustained fire','防壁・継続射撃']],
['commando_grenade','R',0,['코만도 (수류탄)','Commando (Grenade)','コマンドー（手榴弾）'],['폭격 · 광역 공격','Bombardment & area damage','爆撃・範囲攻撃']],
['salamander','R',2,['샐러맨더','Salamander','サラマンダー'],['독 뿜기 · 독 늪','Poison spit & pools','毒噴射・毒沼']],
['dragon_blue','R',2,['청룡','Blue Dragon','青龍'],['번개 · 낙뢰','Lightning strikes','電撃・落雷']],
['guru','R',0,['구루','Guru','グル'],['결계 · 방어','Wards & defense','結界・防御']],
['white_wizard','R',2,['화이트 위저드','White Wizard','ホワイトウィザード'],['중력 · 관통 광선','Gravity & piercing beams','重力・貫通光線']],
['snowwoman','R',2,['설녀','Snow Maiden','雪女'],['빙결 · 적 제어','Freeze & control','氷結・行動妨害']],
['hopper_smg','SR',1,['호퍼 (기관단총)','Hopper (SMG)','ホッパー（短機関銃）'],['회피 사격 · 돌진','Evasive fire & charge','回避射撃・突進']],
['commando_laser','SR',0,['코만도 (레이저)','Commando (Laser)','コマンドー（レーザー）'],['관통 · 연쇄 방전','Piercing & chain lightning','貫通・連鎖放電']],
['ninja','SR',1,['닌자','Ninja','忍者'],['그림자 이동 · 분신','Shadow step & clones','影移動・分身']],
['ninja_chain','SR',0,['닌자 (사슬)','Ninja (Chain)','忍者（鎖）'],['끌어오기 · 연격','Pull & chain attacks','引き寄せ・連撃']],
['robot','SR',0,['로봇','Robot','ロボット'],['포탑 · 지원 소환','Turrets & support summons','砲台・支援召喚']],
['commando_missile','SR',0,['코만도 (미사일)','Commando (Missile)','コマンドー（ミサイル）'],['유도탄 · 집중 포격','Homing & focused fire','誘導弾・集中砲火']],
['amazon_elite','SSR',1,['아마존 정예','Elite Amazon','精鋭アマゾン'],['불굴 · 반격','Resilience & counterattack','不屈・反撃']],
['dragoon','SSR',2,['드라군','Dragoon','ドラグーン'],['화염 지대 · 메테오','Flame zones & meteors','炎の領域・メテオ']],
['medium','SSR',2,['영매','Medium','霊媒師'],['골렘 · 원혼 소환','Golems & spirit summons','ゴーレム・怨霊召喚']],
['baseball','SSR',0,['슬러거','Slugger','スラッガー'],['탄환 반사 · 회오리','Bullet reflection & cyclone','弾丸反射・旋風']],
['vampire','SSR',2,['흡혈귀','Vampire','吸血鬼'],['흡혈 · 생존','Life drain & sustain','吸血・生存']],
['death','SSR',2,['사신','Reaper','死神'],['사신의 시간 · 망자 군단','Reaper’s hour & undead army','死神の時間・死者の軍団']]
];
const text={
ko:{title:'원작의 호스트를 그대로 재현!<br>각자의 스킬로 완성하는 전투 전략',body:'원작에서 만났던 23종의 호스트가 모바일로 돌아옵니다. 익숙한 외형과 공격 방식에 고유 액티브·패시브·필살기를 더해, 호스트마다 다른 액션과 공략을 즐길 수 있습니다.',types:['파워','무기','마법'],unit:'종',hidden:'히든',all:'전체 호스트',note:'23종 전체 라인업 · 사신은 랜덤 출전에서 만날 수 있는 히든 호스트입니다.',skill:'액티브 · 패시브 · 전용 필살기'},
en:{title:'Classic hosts, faithfully recreated.<br>Unique skills. Distinct combat strategies.',body:'All 23 hosts return from the original on mobile. Familiar looks and attack styles return with unique active skills, passive abilities and ultimates. Each host offers a different way to fight.',types:['Power','Weapon','Magic'],unit:'hosts',hidden:'HIDDEN',all:'All hosts',note:'Complete 23-host lineup · The Reaper is a hidden host encountered through random deployment.',skill:'Active skills · Passives · Unique ultimates'},
ja:{title:'原作のホストをそのまま再現！<br>固有スキルで広がる戦闘戦略。',body:'原作に登場した23種類のホストがモバイルに再登場。おなじみの姿と攻撃スタイルに、固有のアクティブ・パッシブ・必殺技を加え、ホストごとに異なるアクションと攻略を楽しめます。',types:['パワー','ウェポン','マジック'],unit:'種類',hidden:'隠しホスト',all:'全ホスト',note:'全23種類のラインナップ · 死神はランダム出撃で出会える隠しホストです。',skill:'アクティブ · パッシブ · 専用必殺技'}
};
export function hostRoster(lang){const t=text[lang],l=['ko','en','ja'].indexOf(lang);return `<div class="host-roster-intro"><h2>${t.title}</h2><p class="lead">${t.body}</p><p class="host-skill-line">${t.skill}</p></div><div class="complete-roster" aria-label="${t.all}">${['R','SR','SSR'].map(g=>{const items=hosts.filter(h=>h[1]===g);return `<section class="rarity-group rarity-group-${g.toLowerCase()}" aria-labelledby="grade-${g}"><div class="rarity-heading"><h3 id="grade-${g}">${g}</h3><span>${items.length} ${t.unit}</span><i aria-hidden="true"></i></div><div class="host-card-grid">${items.map(h=>`<article class="host-roster-card${h[0]==='death'?' is-hidden':''}"><div class="host-portrait"><img src="assets/source/face_${h[0]}.png" alt="${h[3][l]}" loading="lazy" width="96" height="96">${h[0]==='death'?`<span class="hidden-tag">${t.hidden}</span>`:''}</div><h4>${h[3][l]}</h4><span class="host-element"><img src="assets/source/${['rps_gem_force.png','rps_gem_blade.png','rps_gem_magic.png'][h[2]]}" alt="" width="20" height="20">${t.types[h[2]]}</span><p>${h[4][l]}</p></article>`).join('')}</div></section>`}).join('')}</div><p class="note roster-note">${t.note}</p>`;}
export {hosts};
