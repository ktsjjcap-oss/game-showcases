const copy={
ko:{controlsTitle:'이동과 스킬은 직접, 보조의 공격은 자동으로',controls:[['이동·회피','왼쪽 조이스틱으로 메인을 움직입니다. 이동 중에는 공격을 멈춥니다.'],['기본 공격','멈추면 가까운 적을 자동 공격합니다. 보조는 메인을 따라다니며 자동으로 지원합니다.'],['액티브·필살기','오른쪽 버튼으로 직접 사용합니다. 새 호스트 영입은 버튼 대신 적을 터치합니다.']],budgetTitle:'유령 HP 100으로 세 명의 파티를 만든다면',budget:['시작','첫 호스트에 빙의','보조 1명 영입','보조 2명 완성'],scope:[['이번 도전의 강화','레벨업 카드','현재 도전에서 전투와 파티를 강화합니다. 호스트를 교체해도 카드와 보조 자리 레벨은 유지됩니다.'],['다음 도전에도 남는 성장','유령·호스트 육성','로비에서 능력치, 성급, 스킬을 강화합니다. 다시 도전할 때도 성장한 전력으로 시작합니다.']],skills:[['액티브','버튼으로 사용하는 전투 스킬'],['패시브','조건에 따라 전투를 돕는 고유 효과'],['필살기','호스트의 개성을 살린 강력한 한 수']],zoom:'화면 확대',close:'닫기',dialog:'게임 화면 확대',imageHint:'스크린샷 전체 보기'},
en:{controlsTitle:'Control movement and skills. Let supports assist.',controls:[['Move & evade','Move your main host with the left stick. Moving stops its attacks.'],['Basic attacks','Stand still to attack nearby enemies automatically. Supports follow and assist automatically.'],['Skills & ultimates','Use the buttons on the right. To recruit a new host, tap the enemy itself.']],budgetTitle:'Build a three-host party from 100 Ghost HP',budget:['Start','Possess the first host','Recruit one support','Complete your party'],scope:[['Power for this run','Level-up cards','Strengthen combat and your party during the current run. Cards and support-slot levels remain when you switch hosts.'],['Progress for future runs','Ghost & host growth','Upgrade stats, star ranks and skills in the lobby. These upgrades carry into your next run.']],skills:[['Active skill','A combat skill you activate with a button'],['Passive ability','A unique effect that helps under specific conditions'],['Ultimate','A powerful signature move unique to the host']],zoom:'Enlarge screenshot',close:'Close',dialog:'Enlarged game screenshot',imageHint:'View the complete screenshot'},
ja:{controlsTitle:'移動とスキルを操作し、サポートと共闘。',controls:[['移動・回避','左スティックでメインを操作。移動中は攻撃を止めます。'],['通常攻撃','止まると近くの敵を自動攻撃。サポートはメインに追従し、自動で援護します。'],['スキル・必殺技','右側のボタンで使用。新たなホストを仲間にするときは、敵を直接タップします。']],budgetTitle:'幽霊HP100から3体のパーティを作る例',budget:['開始','最初のホストに憑依','サポート1体を加入','3体のパーティが完成'],scope:[['今回の挑戦で強化','レベルアップカード','現在の挑戦中に戦闘とパーティを強化。ホストを交代してもカードとサポート枠レベルは維持されます。'],['次の挑戦にも残る育成','幽霊・ホスト育成','ロビーで能力値、星ランク、スキルを強化。その成長を次の挑戦へ持ち越せます。']],skills:[['アクティブ','ボタンで使用する戦闘スキル'],['パッシブ','条件に応じて戦闘を助ける固有効果'],['必殺技','ホストの個性を生かした強力な一手']],zoom:'画面を拡大',close:'閉じる',dialog:'ゲーム画面を拡大',imageHint:'画面全体を表示'}
};
export function controlGuide(lang){const t=copy[lang];return `<div class="control-guide"><h3>${t.controlsTitle}</h3><div>${t.controls.map((c,i)=>`<article><span>0${i+1}</span><h4>${c[0]}</h4><p>${c[1]}</p></article>`).join('')}</div></div>`;}
export function hpExample(lang){const t=copy[lang];return `<div class="hp-example"><h4>${t.budgetTitle}</h4><ol>${t.budget.map((s,i)=>`<li><strong>${[100,80,70,60][i]}</strong><span>${s}</span>${i<3?'<i aria-hidden="true">→</i>':''}</li>`).join('')}</ol></div>`;}
export function upgradeScope(lang){return `<div class="upgrade-scope">${copy[lang].scope.map((s,i)=>`<article><span>${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join('')}</div>`;}
export function skillTypes(lang){return `<div class="skill-types">${copy[lang].skills.map(s=>`<article><h4>${s[0]}</h4><p>${s[1]}</p></article>`).join('')}</div>`;}
let headerObserver;
export function bindReviewUI(lang){
 const t=copy[lang],header=document.querySelector('header');headerObserver?.disconnect();
 const updateHeader=()=>document.documentElement.style.setProperty('--site-header-height',`${Math.ceil(header.getBoundingClientRect().height)}px`);
 updateHeader();headerObserver=new ResizeObserver(updateHeader);headerObserver.observe(header);
 const dialog=document.createElement('dialog');dialog.className='screenshot-dialog';dialog.setAttribute('aria-label',t.dialog);
 dialog.innerHTML=`<div class="screenshot-toolbar"><strong></strong><button type="button">${t.close} ×</button></div><div class="screenshot-content"><img alt=""></div>`;
 document.getElementById('app').append(dialog);let returnFocus,oldOverflow;
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow||'';if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 document.querySelectorAll('figure.party-screen,figure.source-phone').forEach(figure=>{
  const image=figure.querySelector('img'),caption=figure.querySelector('figcaption');if(!image||!caption)return;
  const button=document.createElement('button');button.type='button';button.className='screenshot-zoom';button.textContent=t.zoom+' ↗';button.setAttribute('aria-label',`${t.zoom}: ${image.alt||t.imageHint}`);
  button.onclick=()=>{returnFocus=button;oldOverflow=document.body.style.overflow;const full=dialog.querySelector('img');full.src=image.getAttribute('src');full.alt=image.alt;dialog.querySelector('strong').textContent=image.alt||t.dialog;dialog.showModal();document.body.style.overflow='hidden';};caption.append(button);
 });
}
