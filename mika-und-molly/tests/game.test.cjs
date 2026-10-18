// node tests/game.test.cjs — no dependencies. Logic/DOM-contract simulation, not browser QA.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function createGame(withSpeech = false, withIntro = false) {
  const nodes=[], byId=new Map(), browserEvents={}, speechEvents={};
  let doc;
  class Element {
    constructor(tag='div',attrs='') {
      this.tagName=tag.toUpperCase();this.attrs=attrs;this.style={setProperty(k,v){this[k]=v}};this.children=[];this.listeners={};this.open=false;this.value='';this.dataset={};this.classes=new Set();
      this.classList={add:c=>this.classes.add(c),remove:c=>this.classes.delete(c),toggle:(c,v)=>v?this.classes.add(c):this.classes.delete(c)};
      for(const m of attrs.matchAll(/data-([\w-]+)(?:="([^"]*)")?/g))this.dataset[m[1]]=m[2]||'';
      const id=attrs.match(/\bid="([^"]*)"/);if(id)this.id=id[1];
      nodes.push(this);
    }
    set id(v){this._id=v;byId.set(v,this)} get id(){return this._id}
    set innerHTML(v){this.html=v;this.children=[]} get innerHTML(){return this.html||''}
    append(child){this.children.push(child)}
    querySelector(tag){return this.children.find(c=>c.tagName===tag.toUpperCase())||null}
    addEventListener(type,fn){this.listeners[type]=fn}
    setAttribute(k,v){this[k]=v}
    focus(){doc.activeElement=this}
    showModal(){assert(!this.open);this.open=true}
    close(){this.open=false}
    scrollIntoView(){}
    setPointerCapture(){}
    getBoundingClientRect(){return {left:0,top:0,width:480,height:352}}
    getContext(){return context}
  }
  const context=new Proxy({}, {get(target,key){return target[key]??((...args)=>{for(const arg of args)if(typeof arg==='number')assert(Number.isFinite(arg),'Invalid canvas coordinate: '+key)})}});
  for(const m of html.split('<script>')[0].matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi))new Element(m[1],m[2]);
  function get(id){assert(byId.has(id),'Missing DOM id: '+id);return byId.get(id)}
  doc={hidden:false,listeners:{},getElementById:get,createElement:tag=>new Element(tag),
    querySelectorAll:sel=>{const key=sel.match(/^\[data-([\w-]+)\]$/)?.[1];return key?nodes.filter(n=>Object.hasOwn(n.dataset,key)):[]},
    querySelector:sel=>sel==='.portrait'?nodes.find(n=>/class="portrait"/.test(n.attrs)):null,
    addEventListener(type,fn){this.listeners[type]=fn}};
  const spoken=[];let cancelCount=0,voices=[];
  const browser={addEventListener:(type,fn)=>browserEvents[type]=fn};
  if(withSpeech){browser.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};browser.speechSynthesis={cancel(){cancelCount++},speak:u=>spoken.push(u),getVoices:()=>voices,addEventListener:(type,fn)=>speechEvents[type]=fn}}
  const sandbox={document:doc,window:browser,requestAnimationFrame:()=>1};
  let script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
  script=script.replace('reset();\nrequestAnimationFrame(frame);','globalThis.test={film,FILMS,playFilm,finishFilm,renderFilm,finalChoice,completeWin,stressEvent,reset,step,draw,walkTo,routeTo,canStand,isBlocked,interact,closeCinema,dismissDialogue,closePuzzle,submitPuzzle,say,change,readCurrent,stopSpeech,setAutoSpeech,loadVoices,PUZZLES,ROOMS,motion,speech,director,cue,stepDirector,visitorPose,arrivalBeat,observedBeats,resetDirector,scene,INTRO,startIntro,finishIntro,showIntro,revealHelp,routeInstruction,earlyObject,CLUE_PURPOSE,ui,splitSpeech,bubblePlacement,nextMainStep,openObject,closeObject,advanceSpeech,agendaContent,getTasks,chooseApproach,routeComplete,npcRecall,openPuzzle,win,get state(){return s}};reset();\nrequestAnimationFrame(frame);');
  vm.runInNewContext(script,sandbox,{filename:'index.html'});
  // Result buttons are created via innerHTML by the game; simulate their parser creation.
  new Element('button','id="again"');
  if(!withIntro){sandbox.test.finishIntro();const reset=sandbox.test.reset;sandbox.test.reset=()=>{reset();sandbox.test.finishIntro()}}
  return {t:sandbox.test,get,doc,browserEvents,spoken,speechEvents,setVoices:v=>voices=v,get cancels(){return cancelCount}};
}
const game=createGame(),{t,get,doc}=game;
function tick(seconds){for(let i=0;i<Math.round(seconds*60);i++)t.step(1/60)}
function close(){while(t.film.active)t.finishFilm();if(get('objectView').open)t.closeObject();if(get('puzzle').open)t.closePuzzle();if(get('cinema').open)t.closeCinema();t.dismissDialogue()}
function settle(){let steps=0;while(t.motion.path.length||t.motion.target){t.step(1/60);if(++steps>5000)throw Error('Path stalled in '+t.state.room)}assert(t.canStand(t.state.x,t.state.y),'Mika ended inside furniture');}
function inspect(key){close();const target=t.ROOMS[t.state.room].objects.find(o=>o.key===key);assert(target,`No ${key} in ${t.state.room}`);t.walkTo(target.x,target.y);settle();while(t.film.active)t.finishFilm();if(t.earlyObject(key))choose('Trotzdem genauer ansehen');}
function travel(to){close();const door=t.ROOMS[t.state.room].doors.find(d=>d.to===to);assert(door,'No exit to '+to);t.walkTo(door.x,door.y);settle();while(t.film.active)t.finishFilm();}
function go(to){if(t.state.room===to)return;if(t.state.room!=='hall')travel('hall');if(to!=='hall')travel(to);assert.equal(t.state.room,to);}
function assertGuidance(){const n=t.nextMainStep();assert(n.text&&n.why&&n.hint&&n.location);assert(t.ROOMS[n.room].objects.some(o=>o.key===n.object),'Unknown story target '+n.object);assert.equal(t.getTasks().active.length,1)}
function choose(part){if(part==='Weiter'&&t.ui.sequence){t.advanceSpeech(1);return}const wrap=get(get('cinema').open?'cinemaChoices':get('objectView').open?'objectChoices':'choices');const b=wrap.children.find(el=>el.textContent.includes(part));assert(b,'Missing choice '+part);b.onclick();while(t.film.active)t.finishFilm();assertGuidance();}
function solve(key,values){assert.equal(t.state.activePuzzle,key);for(const [id,val] of Object.entries(values))get('answer-'+id).value=val;t.submitPuzzle();assertGuidance();}
const solutions={room:{place:'203',start:'10',duration:'90'},cabinet:{first:'2',second:'4',third:'1'},printer:{tray:'2',format:'a4',queue:'own'},mail:{group:'C',attachment:'2',scope:'active'}};
function reachable(){for(const obj of [...t.ROOMS[t.state.room].objects,...t.ROOMS[t.state.room].doors])assert(t.routeTo(obj,true),`Unreachable ${obj.key} in ${t.state.room}`);t.draw()}
function meetMolly(approach='Kooperativ'){go('molly');inspect('molly');assert(get('cinema').open);while(t.ui.sequence&&t.ui.sequence.index<t.ui.sequence.pages.length-1)t.advanceSpeech(1);choose(approach);close();assert(t.state.tech);}
function collectRoom(){go('mika');inspect('brief');go('hall');inspect('board');go('kitchen');inspect('dieter');choose('Planmarkierung');close();go('meeting');inspect('petra');choose('Raum und Zeit');solve('room',solutions.room);assert(t.state.petra)}
function collectTech(){go('molly');inspect('routing');go('kitchen');inspect('service');go('archive');inspect('index');inspect('shelf');choose('Zahlenschloss');solve('cabinet',solutions.cabinet);assert(t.state.paper);inspect('printer');choose('Auftrag anhand');solve('printer',solutions.printer);assert(t.state.printer)}
function collectMail(){go('hall');inspect('policy');inspect('board');go('meeting');inspect('whiteboard');go('archive');inspect('registry');go('mika');inspect('terminal');choose('Verteiler und Anlage');solve('mail',solutions.mail);assert(t.state.recipients)}

// Held movement uses fractional positions, not browser key repeat; release really stops.
const keyboard=(type,code,repeat=false)=>doc.listeners[type]({code,repeat,target:{tagName:'BODY'},preventDefault(){}});
keyboard('keydown','ArrowLeft');tick(.1);assert(t.state.x<7&&t.state.x>6);keyboard('keyup','ArrowLeft');const stopped=t.state.x;tick(.2);assert.equal(t.state.x,stopped);
t.reset();keyboard('keydown','ArrowUp');tick(5);keyboard('keyup','ArrowUp');assert(t.state.y>.7&&t.state.y<1);assert(t.canStand(t.state.x,t.state.y));
// 30 fps and 120 fps cover the same distance; diagonals cannot move faster.
function distanceAt(fps,diagonal){t.reset();keyboard('keydown','ArrowRight');if(diagonal)keyboard('keydown','ArrowDown');for(let i=0;i<fps/5;i++)t.step(1/fps);const d=Math.hypot(t.state.x-7,t.state.y-7);game.browserEvents.blur();return d}
assert(Math.abs(distanceAt(30,false)-distanceAt(120,false))<1e-8);assert(Math.abs(distanceAt(60,true)-distanceAt(60,false))<1e-8);
// Pointer hold/release uses the same frame motion.
t.reset();const button=doc.querySelectorAll('[data-move]').find(b=>b.dataset.move==='left');button.listeners.pointerdown({pointerId:1,preventDefault(){}});tick(.2);assert(t.state.x<7);button.listeners.pointercancel({pointerId:1});const p=t.state.x;tick(.2);assert.equal(t.state.x,p);
// A held key may enter a room once, but must not bounce straight back through the exit.
t.reset();keyboard('keydown','ArrowDown');tick(2);assert.equal(t.state.room,'hall');assert.equal(t.motion.keys.size,0);tick(2);assert.equal(t.state.room,'hall');keyboard('keyup','ArrowDown');
// Releasing focus cancels a pending click route as well as held keys.
t.reset();t.walkTo(12,8);assert(t.motion.path.length);game.browserEvents.blur();assert.equal(t.motion.path.length,0);
// Decorations must not overlap interactive objects, doors, or desk collision tiles.
for(const [name,r] of Object.entries(t.ROOMS)){const seen=new Set();const positions=[...r.objects,...r.doors,...r.decor,...(r.blocks||[]).map(([x,y])=>({x,y})),...r.desks.flatMap(([x,y,w])=>Array.from({length:w},(_,i)=>({x:x+i,y})))];for(const o of positions){const key=o.x+','+o.y;assert(!seen.has(key),'Overlapping blockers in '+name+': '+key);seen.add(key)}}

// Each route traverses the actual rooms; no progress flags are injected.
Object.assign(solutions,{
 cooperation:{first:'R',second:'E',third:'I'},mandate:{sender:'molly',checker:'mika',evidence:'send'},
 escalation:{finding:'open',destination:'internal',evidence:'originals'},
 acceptance:{start:'10',sender:'molly',proof:'send'},copier:{first:'pause',access:'side',paper:'a4'}
});
function prepareRoute(kind){
 if(kind==='coop'){
  go('mika');inspect('calendar');choose('datierten');go('hall');inspect('bulletin');choose('freigegebenen');go('molly');inspect('dispatch');choose('Reihenfolge bilden');solve('cooperation',solutions.cooperation);
 }else{
  go('archive');inspect('procedure');choose('Regeln');
  if(kind==='lead'){go('mika');inspect('calendar');choose('Zuständigkeitsnotiz');inspect('calendar');choose('Auftrag');solve('mandate',solutions.mandate)}
  else{go('molly');inspect('inbox');go('mika');inspect('phone');choose('interne Koordination');go('archive');inspect('procedure');choose('Eskalationsakte');solve('escalation',solutions.escalation)}
 }
 assert(t.state[{coop:'coopReady',lead:'leadReady',formal:'formalReady'}[kind]]);assert(t.director.seen.has('solved-'+{coop:'cooperation',lead:'mandate',formal:'escalation'}[kind]));
}
function finish(kind,technical=false){
 if(kind==='lead'){go('mika');inspect('calendar');choose('Abnahme dokumentieren');solve('acceptance',solutions.acceptance)}
 if(kind==='formal'){go('mika');inspect('phone');choose('Abschluss mit')}
 assert(t.routeComplete());go('molly');inspect('molly');choose(technical?'technische Terminprüfung':kind==='coop'?'gemeinsamen Belegabgleich':'Uhrzeit mit');choose(technical?'Versand übernehmen':'selbst senden');choose('Klare Ansage');assert.equal(t.state.ending,'win');assert(t.state.sent);assert(get('result').innerHTML.includes('MISSION ERFOLGREICH'));close();
}
for(const [kind,label] of [['coop','Kooperativ'],['lead','Konsequent'],['formal','Formell']]){
 t.reset();assert.equal(t.getTasks().active.length,1);assert.equal(t.getTasks().side.length,0);
 reachable();travel('hall');reachable();travel('meeting');assert.equal(t.state.room,'hall');travel('archive');assert.equal(t.state.room,'hall');
 meetMolly(label);prepareRoute(kind);
 if(kind==='coop'){go('kitchen');inspect('dieter');choose('Materialhilfe');assert(t.state.paper&&t.state.clues.service)}
 if(kind==='lead'){go('archive');inspect('shelf');choose('Materialfreigabe');assert(t.state.paper);go('kitchen');inspect('service')}
 if(kind==='formal'){go('mika');inspect('phone');choose('Schriftliche');assert(t.state.clues.dieter&&t.state.clues.registry);collectTech()}
 else{go('archive');inspect('printer');choose('Auftrag anhand');solve('printer',solutions.printer)}
 assert(!t.state.petra&&!t.state.recipients);collectMail();collectRoom();
 for(const room of Object.keys(t.ROOMS)){go(room);reachable()}
 finish(kind,kind==='formal');
 const pos=[t.state.x,t.state.y];keyboard('keydown','ArrowLeft');tick(1);assert.deepEqual([t.state.x,t.state.y],pos);
 get('again').onclick();assert.equal(t.state.stress,28);assert.equal(t.state.history.length,0);assert(!t.state.sent);
}
// All six changes of approach remain winnable, even after the common work is done.
for(const from of ['coop','lead','formal'])for(const to of ['coop','lead','formal'])if(from!==to){
 t.reset();meetMolly();t.chooseApproach(from);close();prepareRoute(from);collectTech();collectMail();collectRoom();
 const clues=Object.keys(t.state.clues).length;t.chooseApproach(to);close();assert(Object.keys(t.state.clues).length===clues);assert(t.state.printer&&t.state.petra&&t.state.recipients);
 assert(t.npcRecall('molly').includes('Erst'));prepareRoute(to);finish(to);
}
// Social consequences are persistent, but correcting a blame restores help for free.
t.reset();meetMolly();prepareRoute('coop');go('mika');inspect('phone');let value=t.state.stress;choose('Molly als Ursache');assert(t.state.stress>value);assert(t.state.publicBlame);
go('kitchen');inspect('dieter');assert(!get('choices').children.some(b=>b.textContent.includes('Materialhilfe')));assert(t.npcRecall('molly').includes('Telefon'));choose('sachlich berichtigen');assert(t.state.blameRepaired);inspect('dieter');choose('Materialhilfe');assert(t.state.paper);
// At near-burnout, correct actions still finish without any unavoidable stress.
t.state.stress=99;collectRoom();go('archive');inspect('printer');choose('Auftrag anhand');solve('printer',solutions.printer);collectMail();finish('coop');
// Alternative evidence: copy and originals both accepted; unsupported guesses do not progress.
t.reset();meetMolly('Formell');go('archive');inspect('procedure');choose('Regeln');inspect('procedure');choose('Eskalationsakte');value=t.state.stress;solve('escalation',solutions.escalation);assert(!t.state.formalReady);assert.equal(t.state.stress,value);close();
go('molly');inspect('inbox');go('mika');inspect('phone');choose('interne Koordination');inspect('bin');choose('Blatt glätten');go('archive');inspect('procedure');choose('Eskalationsakte');solve('escalation',{...solutions.escalation,evidence:'copy'});assert(t.state.formalReady&&!t.state.originalsUsed);
// Copier has its own two-source puzzle and a risky but playable alternative.
inspect('copier');choose('Durchschlag ziehen');assert(t.state.copyForced&&t.state.copyMade&&!t.state.copierFixed);assert(t.director.seen.has('rough-copy'));go('kitchen');inspect('service');go('archive');inspect('copier');choose('Sicherheitsnotiz');solve('copier',solutions.copier);assert(t.state.copierFixed);
collectTech();collectRoom();collectMail();finish('formal');
// Finite relief, spill recovery, timer, and preserved stamp courtesy.
t.reset();meetMolly();go('kitchen');inspect('coffee');choose('großen Bezug');assert(t.state.coffeeSpill&&t.state.clues.calendar);inspect('supplies');inspect('coffee');choose('Missgeschick beseitigen');assert(t.state.spillCleaned);value=t.state.stress;inspect('coffee');assert.equal(t.state.stress,value);
inspect('water');inspect('found');go('mika');inspect('plant');value=t.state.stress;inspect('plant');assert.equal(t.state.stress,value);inspect('brief');go('hall');inspect('board');go('kitchen');inspect('dieter');choose('Planmarkierung');go('meeting');inspect('timer');choose('Terminmappe');value=t.state.stress;inspect('timer');choose('Terminmappe');assert.equal(t.state.stress,value);inspect('petra');choose('Stempel');assert(t.director.seen.has('stamp-return'));inspect('petra');choose('Raum und Zeit');value=t.state.stress;
solve('room',{...solutions.room,place:'102'});assert.equal(t.state.stress,value);solve('room',{...solutions.room,place:'102'});assert(t.state.stress>value&&!t.state.petra);
get('puzzle').listeners.cancel({preventDefault(){}});inspect('petra');choose('Raum und Zeit');assert.equal(get('answer-place').value,'102');solve('room',solutions.room);
// Exploration and thinking never cause automatic stress.
t.reset();t.state.room='hall';t.state.x=7;t.state.y=7;value=t.state.stress;
for(let sec=0;sec<120;sec++){const code=sec%2?'ArrowLeft':'ArrowRight';keyboard('keydown',code);tick(1);keyboard('keyup',code)}
assert.equal(t.state.stress,value);tick(60);assert.equal(t.state.stress,value);
t.say('MOLLY','In Ruhe nachdenken.');const modalPos=[t.state.x,t.state.y];keyboard('keydown','ArrowLeft');tick(3);assert.deepEqual([t.state.x,t.state.y],modalPos);get('cinema').listeners.cancel({preventDefault(){}});assert(!get('cinema').open);
// Burnout during a puzzle closes all modals and cannot become a win.
t.reset();meetMolly();go('molly');inspect('routing');go('archive');inspect('index');inspect('shelf');choose('Zahlenschloss');t.state.stress=99;
solve('cabinet',{first:'1',second:'1',third:'1'});assert.equal(t.state.stress,100);assert.equal(t.state.ending,'lose');assert(!get('puzzle').open&&!get('cinema').open);assert(get('result').innerHTML.includes('BURNOUT – GAME OVER'));t.submitPuzzle();t.win();assert(!t.state.sent&&!t.state.paper);get('again').onclick();assert.equal(t.state.stress,28);
assert(!/[+−–]\d+ Stress|kostet \d+ Stress|Lösung: Raum/.test(html));

// New presentation contract: one task, short pages, named bubbles, no stacked modals.
t.reset();assert.equal(get('activeTasks').children.length,1);assert(get('activeTasks').children[0].textContent.includes('Molly'));get('taskHelp').onclick();assert(!get('taskTip').hidden);const hintStress=t.state.stress;get('taskHelp').onclick();assert(!get('taskTip').hidden);assert.equal(t.state.helpLevel,2);assert.equal(t.state.stress,hintStress);
const chunks=t.splitSpeech('Erster Satz. Zweiter Satz! Dritter Satz? Vierter Satz.');assert.equal(chunks.length,2);assert(chunks.every(p=>(p.match(/[.!?]/g)||[]).length<=2));
t.say('PETRA','Ein kurzer Satz. Noch ein Satz. Und jetzt etwas Neues. Das kann warten.');assert(!get('bubble').hidden);assert.equal(get('speaker').textContent,'PETRA');assert.equal(t.ui.actor,'petra');assert.equal(t.ui.pages.length,2);const firstPage=get('message').textContent;get('talkNext').onclick();assert.notEqual(get('message').textContent,firstPage);get('talkBack').onclick();assert.equal(get('message').textContent,firstPage);get('dialogDismiss').onclick();assert(get('bubble').hidden&&get('replyTray').hidden&&!t.state.dialogOptions);
// Placement uses wrapped height and stays inside narrow and wide map bounds.
for(const width of [240,280,320,390,480,768,1000])for(const x of [0,2,7,12,14])for(const y of [1,3,5,8,9]){
 const p=t.bubblePlacement(x,y,width,130);assert(p.left>=0&&p.left+p.width<=100.001);assert(p.top>=0&&(p.top/100*width*11/15+130)<=width*11/15+.01);assert(p.tail>=8&&p.tail<=92);
}
// The agenda is a usable document before booking; marked/taken states survive closing.
t.reset();go('hall');inspect('board');go('meeting');inspect('whiteboard');assert(get('objectView').open);assert(get('objectArt').innerHTML.includes('Mittwoch, 14. Oktober'));assert(get('objectArt').innerHTML.includes('Noch nicht bestätigt'));assert(t.state.clues.agenda);assert.equal(get('objectChoices').children.length,3);
const objectPos=[t.state.x,t.state.y];keyboard('keydown','ArrowLeft');tick(1);keyboard('keyup','ArrowLeft');assert.deepEqual([t.state.x,t.state.y],objectPos);
choose('Untersuchen');assert(get('objectMessage').textContent.includes('Petra'));choose('markieren');assert(t.state.agendaMarked&&get('objectArt').innerHTML.includes('paper-detail marked'));choose('mitnehmen');assert(t.state.agendaTaken);get('objectView').listeners.cancel({preventDefault(){}});assert(!get('objectView').open&&t.ui.object===null&&!t.state.dialogOptions);
inspect('whiteboard');assert(get('objectArt').innerHTML.includes('marked'));close();meetMolly();collectRoom();go('meeting');inspect('whiteboard');assert(get('objectArt').innerHTML.includes('10:00–11:30 · bestätigt'));assert(get('objectArt').innerHTML.includes('203 · gebucht'));
// Every close-up opens and closes repeatedly, preserves movement, and retains the route.
for(const [room,keys] of Object.entries({mika:['brief','terminal','phone','calendar'],molly:['inbox','routing','dispatch','shredder'],hall:['board','policy','bulletin'],archive:['printer','copier','procedure','shelf','index','registry'],kitchen:['coffee','service']}))for(const key of keys){
 go(room);inspect(key);assert(get('objectView').open,key+' detail missing');assert(get('objectArt').innerHTML.length>100);assert(!get('cinema').open&&!get('puzzle').open);assert.equal(get('activeTasks').children.length,1);get('objectClose').onclick();assert(!get('objectView').open&&!t.state.dialogOptions);inspect(key);close();
}
// Real object consequences update the artwork; switching into a puzzle closes its parent.
go('kitchen');inspect('coffee');choose('großen Bezug');assert(get('objectArt').innerHTML.includes('coffee-puddle'));inspect('supplies');inspect('coffee');choose('Missgeschick beseitigen');assert(!get('objectArt').innerHTML.includes('coffee-puddle'));
go('archive');inspect('printer');choose('Auftrag anhand');assert(get('puzzle').open&&!get('objectView').open&&t.ui.object===null);get('puzzleClose').onclick();assert(!get('puzzle').open&&!t.state.dialogOptions);inspect('printer');t.state.stress=99;choose('Neustart erzwingen');assert.equal(t.state.ending,'lose');assert(!get('objectView').open&&!get('puzzle').open);t.reset();assert.equal(t.ui.object,null);assert(get('bubble').hidden);
// The cinematic opening changes the visible portrait with the actual speaking turn.
go('molly');inspect('molly');assert.equal(get('cinemaSpeaker').textContent,'Mika');assert(!get('mikaPortrait').hidden&&get('mollyPortrait').hidden);choose('Weiter');assert.equal(get('cinemaSpeaker').textContent,'Molly');assert(!get('mollyPortrait').hidden&&get('mikaPortrait').hidden);get('cinema').listeners.cancel({preventDefault(){}});assert(!get('cinema').open&&!t.state.dialogOptions);
// One clear guide step per route, including correction and finishing obligations.
t.reset();meetMolly();assert(t.nextMainStep().text.includes('Kalender'));prepareRoute('coop');assert(t.nextMainStep().text.includes('Terminmappe'));collectRoom();assert(t.nextMainStep().text.includes('Dieter'));go('mika');inspect('phone');choose('Molly als Ursache');assert(t.nextMainStep().text.includes('Ablaufkarte'));inspect('phone');choose('Vorwurf berichtigen');assert(t.nextMainStep().text.includes('Dieter'));t.chooseApproach('lead');close();assert(t.nextMainStep().text.includes('Zuständigkeiten'));prepareRoute('lead');assert(t.nextMainStep().text.includes('Freigabe'));collectTech();collectMail();assert(t.nextMainStep().text.includes('Teamkalender'));finish('lead');assert.equal(t.getTasks().active.length,1);assert(t.getTasks().active[0].includes('Geschafft'));
const ids=[...html.split('<script>')[0].matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'Duplicate static DOM IDs');
assert(html.includes('@media(max-width:700px)')&&html.includes('max-height:calc(100dvh - 24px)')&&html.includes('prefers-reduced-motion'));

// The real startup is a playable, skippable phone scene, not an invisible instruction.
const opening=createGame(false,true),ot=opening.t;assert(ot.state.introActive);assert(!opening.get('bubble').hidden);assert.equal(ot.nextMainStep().object,'phone');
const openingPosition=[ot.state.x,ot.state.y],openingStress=ot.state.stress;
ot.motion.keys.add('ArrowRight');ot.step(.05);assert.deepEqual([ot.state.x,ot.state.y],openingPosition);
let openingTurns=0;while(ot.state.introActive){const button=opening.get('talkNext');assert(!button.hidden&&!button.disabled);assert(ot.ui.pages.length===1,'Each opening turn must be one short bubble');button.onclick();assert(++openingTurns<20)}
assert.equal(openingTurns,ot.INTRO.length);assert.equal(ot.state.stress,openingStress);assert(ot.state.introDone);assert(ot.nextMainStep().text.includes('Molly'));assert(ot.state.storyEvent.includes('Petra'));assert(!ot.state.dialogOptions);
ot.reset();assert(ot.state.introActive);ot.dismissDialogue();assert(!ot.state.introActive&&ot.state.introDone);assert(ot.nextMainStep().text.includes('Molly'));
// Early objects offer context without silently collecting the detailed clue; revisit works.
t.reset();t.openObject('brief');assert(get('objectArt').innerHTML.includes('NOCH KEIN AUFTRAG'));assert(!t.state.clues.brief);choose('Erst mit Molly');assert(!get('objectView').open);meetMolly();go('mika');inspect('brief');assert(t.state.clues.brief);assert(!get('objectArt').innerHTML.includes('NOCH KEIN AUFTRAG'));assert(t.state.storyEvent.includes('passenden Raum'));
// Three distinct help levels, reset on real progress, accurate destination for every approach.
for(const [route,label,firstTarget] of [['coop','Kooperativ','calendar'],['lead','Konsequent','calendar'],['formal','Formell','inbox']]){
 t.reset();meetMolly(label);assert.equal(t.nextMainStep().object,firstTarget);const before=t.state.stress;
 for(let i=1;i<=3;i++){t.revealHelp();assert.equal(t.state.helpLevel,i);assert(get('taskTip').textContent.startsWith('Hilfe '+i+'/3:'))}
 assert(get('taskTip').textContent.includes('Klicke'));assert.equal(t.state.stress,before);t.revealHelp();assert.equal(t.state.helpLevel,3);
 prepareRoute(route);assert.equal(t.state.helpLevel,0);assert(get('taskTip').hidden);assert(t.state.storyEvent.length>30);
 const recommendation=t.nextMainStep().text;go('kitchen');inspect('water');inspect('found');go('mika');inspect('plant');assert.equal(t.nextMainStep().text,recommendation,'Side quest must not replace the main goal');
 collectRoom();assert(t.state.storyEvent.includes('Petra'));collectTech();assert(t.state.storyEvent.includes('Testseite'));collectMail();assert(t.state.storyEvent.includes('Liste'));finish(route);assert(t.state.storyEvent.includes('Molly sendet selbst'));assert.equal(t.getTasks().active.length,1);
}
// Every target mentioned in the story is an existing room object; full location help works from each room.
t.reset();meetMolly();for(const room of Object.keys(t.ROOMS)){t.state.room=room;const n=t.nextMainStep();assert(t.routeInstruction(n).includes('TEAMKALENDER'));assertGuidance()}
t.reset();


// Regression: the original intro had eleven pages but its in-bubble Next was hidden/disabled.
const legacyIntro=[
 ['MIKA','Montag, 08:02. Der Schreibtisch ist ordentlich. Das Telefon hält das offenbar für ein Versehen.'],
 ['PETRA','Mika? Die Besprechung am Mittwoch: Haben die acht Leute schon ihre Einladung?'],
 ['MIKA','Natürlich. Molly kümmert sich um den Versand. Ich habe sogar die Schriftgröße abgestimmt.'],
 ['PETRA','Sehr gut. Dann fehlt ja höchstens noch der Versand.'],
 ['MIKA','Du klingst, als wäre das ein eigener Arbeitsschritt.'],
 ['PETRA','In meinem Kalender steht noch kein bestätigter Raum. Frag Molly lieber, bevor wir uns alle im Flur treffen.'],
 ['MIKA','Ich kläre das. Raum, Zeit und die richtige Tagesordnung müssen stimmen. Molly soll die Einladung dann selbst verschicken.'],
 ['MIKA','Erst zu Molly. Die Schriftgröße wird ohne mich zurechtkommen.']
].flatMap(([who,text])=>t.splitSpeech(text).map(page=>[who,page]));

assert.equal(legacyIntro.length,11);
t.reset();t.startIntro(legacyIntro);let stamps=1000;
for(let page=0;page<11;page++){
 assert.equal(t.state.introPage,page);assert.equal(get('talkCount').textContent,`${page+1} / 11`);
 assert(!get('talkNext').hidden&&!get('talkNext').disabled);assert.equal(doc.activeElement.id,'talkNext');
 if(page===10){get('talkBack').onclick({detail:1,timeStamp:stamps+=250});assert.equal(t.state.introPage,9);get('talkNext').onclick({detail:1,timeStamp:stamps+=250});assert.equal(t.state.introPage,10)}
 get('talkNext').onclick({detail:1,timeStamp:stamps+=250});
}
assert(!t.state.introActive&&!t.state.dialogOptions);assert(t.canStand(t.state.x,t.state.y));keyboard('keydown','ArrowLeft');tick(.1);keyboard('keyup','ArrowLeft');assert(t.state.x<7);
// New six-page intro: mouse double clicks, key repeat and native-button duplication cannot skip.
t.reset();t.startIntro();assert.equal(t.INTRO.length,6);
get('talkNext').onclick({detail:1,timeStamp:10000});assert.equal(t.state.introPage,1);
get('talkNext').onclick({detail:2,timeStamp:10020});assert.equal(t.state.introPage,1);
get('talkNext').onclick({detail:1,timeStamp:10040});assert.equal(t.state.introPage,1);
const keyEvent=(code,repeat,timeStamp,target=get('talkNext'))=>({code,repeat,timeStamp,target,preventDefault(){}});
doc.listeners.keydown(keyEvent('Enter',false,10300));assert.equal(t.state.introPage,2);
doc.listeners.keydown(keyEvent('Enter',true,10600));assert.equal(t.state.introPage,2);
get('talkNext').onclick({detail:0,timeStamp:10301});assert.equal(t.state.introPage,2,'No native click after handled keydown');
doc.listeners.keydown(keyEvent('Space',false,10700,{tagName:'BODY'}));assert.equal(t.state.introPage,3);
doc.listeners.keydown(keyEvent('Space',true,11000,{tagName:'BODY'}));assert.equal(t.state.introPage,3);
while(t.state.introActive)get('talkNext').onclick({detail:1,timeStamp:stamps+=2000});
assert(!t.state.dialogOptions);assert(t.nextMainStep().text.includes('Molly'));
// Cinema also reaches page eleven; Enter on the last page cannot pick a real answer.
let picked=0;t.scene(Array.from({length:11},(_,i)=>'Seite '+(i+1)+'.'),[{label:'Bewusst wählen',run:()=>{picked++;t.closeCinema()}}]);
for(let i=0;i<10;i++){assert.equal(get('cinemaCount').textContent,`${i+1} / 11`);get('cinemaNext').onclick()}
assert.equal(get('cinemaCount').textContent,'11 / 11');assert(get('cinemaNext').hidden);const oldChoice=get('cinemaChoices').children[0];
doc.listeners.keydown(keyEvent('Enter',false,50000,{tagName:'BODY'}));assert.equal(picked,0);oldChoice.onclick();assert.equal(picked,1);oldChoice.onclick();assert.equal(picked,1,'Stale answer must not fire twice');assert(!get('cinema').open&&!t.state.dialogOptions);
// All normal pages are reachable with the same controls; ending releases the movement lock.
t.say('MIKA',Array.from({length:22},(_,i)=>'Satz '+(i+1)+'.').join(' '));assert.equal(t.ui.pages.length,11);
for(let i=0;i<10;i++)get('talkNext').onclick();assert.equal(get('talkCount').textContent,'11 / 11');get('talkNext').onclick();assert(!t.state.dialogOptions&&get('bubble').hidden);
// Direction is one-shot, does not move colliders, and supports the complete story.
t.reset();meetMolly();go('hall');assert(t.director.seen.has('leaving-molly'));assert.equal(t.director.active.visitor,'molly');const roomObjects=JSON.stringify(t.ROOMS);const visitorStart=t.visitorPose();tick(.8);const visitorEnd=t.visitorPose();assert(visitorStart&&visitorEnd);assert.notEqual(visitorStart.y,visitorEnd.y);assert.equal(JSON.stringify(t.ROOMS),roomObjects);
go('archive');assert(t.director.seen.has('archive-arrival'));assert.equal(t.visitorPose().key,'dieter');assert(!t.state.dialogOptions);reachable();t.draw();
go('kitchen');assert(t.director.seen.has('kitchen-arrival'));inspect('coffee');choose('großen Bezug');assert(t.director.seen.has('coffee-spill'));inspect('supplies');inspect('coffee');choose('Missgeschick beseitigen');assert(t.director.seen.has('coffee-clean'));
go('mika');inspect('brief');inspect('brief');inspect('brief');assert(t.director.seen.has('repeat-inspection'));const countRepeat=[t.director.active,...t.director.queue].filter(b=>b?.id==='repeat-inspection').length;inspect('brief');assert([t.director.active,...t.director.queue].filter(b=>b?.id==='repeat-inspection').length<=countRepeat);
prepareRoute('coop');assert(t.director.seen.has('solved-cooperation'));collectRoom();assert(t.director.seen.has('solved-room'));go('mika');assert(t.director.seen.has('petra-confirmation'));collectTech();assert(t.director.seen.has('solved-printer'));collectMail();assert(t.director.seen.has('solved-mail'));finish('coop');assert(t.state.sent);
// Authored scenes are finite and replay-safe, without any extra stress or collision mutation.
t.reset();meetMolly();go('archive');const snapshot=JSON.stringify(t.ROOMS),before=t.state.stress;assert(t.director.active.id==='archive-arrival');tick(6);assert.equal(t.director.active,null);assert.equal(t.state.stress,before);t.arrivalBeat('hall');assert.equal(t.director.active,null);assert.equal(JSON.stringify(t.ROOMS),snapshot);
// Real later consequences and discomfort use acting beats without extra stress costs.
t.reset();meetMolly();go('mika');inspect('phone');choose('Molly als Ursache');assert(t.director.seen.has('public-call'));assert(t.director.reaction>0);go('hall');assert(t.director.seen.has('hall-consequence'));assert.equal(t.visitorPose().key,'petra');go('mika');inspect('phone');choose('Vorwurf berichtigen');assert(t.director.seen.has('corrected-call'));
t.state.stress=90;t.change(1,'Sorge');assert(t.director.reaction>0);t.draw();t.change(9,'Grenze');assert.equal(t.state.ending,'lose');assert.equal(t.director.active,null);assert.equal(t.director.queue.length,0);assert(!get('objectView').open&&!get('cinema').open);
t.reset();assert.equal(t.director.seen.size,0);

// TTS: unavailable fallback, delayed German voices, auto mode and cancellation race.
assert(get('voiceSelect').disabled);assert(doc.querySelectorAll('[data-read]').every(b=>b.disabled));
const audio=createGame(true),a=audio.t;
audio.setVoices([{lang:'en-US',voiceURI:'en',name:'English',localService:true},{lang:'de-DE',voiceURI:'remote',name:'Deutsch online',localService:false},{lang:'de-DE',voiceURI:'local',name:'Deutsch lokal',localService:true}]);audio.speechEvents.voiceschanged();assert.equal(audio.get('voiceSelect').value,'local');
a.setAutoSpeech(true);assert(audio.spoken.length>0);assert.equal(audio.spoken.at(-1).lang,'de-DE');assert.equal(audio.spoken.at(-1).voice.voiceURI,'local');
a.say('MOLLY','Ein neuer Satz. Noch ein Satz.');const pending=audio.spoken.at(-1),count=audio.spoken.length;a.closeCinema();pending.onend();assert.equal(audio.spoken.length,count,'Canceled utterance must not enqueue old text');
a.setAutoSpeech(false);a.say('MIKA','Dieser Satz bleibt still.');assert.equal(audio.spoken.length,count);a.readCurrent();assert.equal(audio.spoken.length,count+1);audio.spoken.at(-1).onerror({error:'not-allowed'});assert(audio.doc.querySelectorAll('[data-speech-status]').every(el=>el.textContent.includes('not-allowed')));
a.reset();a.setAutoSpeech(true);a.openObject('phone');const objectUtterance=audio.spoken.at(-1),objectCount=audio.spoken.length;a.closeObject();objectUtterance.onend();assert.equal(audio.spoken.length,objectCount,'Closed object must not resume speech');
a.say('MIKA','Erstens. Zweitens. Drittens. Viertens.');const pageUtterance=audio.spoken.at(-1);a.advanceSpeech(1);const pageCount=audio.spoken.length;pageUtterance.onend();assert.equal(audio.spoken.length,pageCount,'Previous page must not resume speech');
a.reset();assert.equal(a.speech.utterance,null);assert(audio.cancels>0);
assert(!/<script[^>]+src=|<link[^>]+href=['"]https?:/i.test(html));
console.log('PASS: original intro page 11, unified mouse/keyboard navigation, double-click/repeat/stale-handler protection, short six-page opening, one-shot acting/visitor/stress beats; complete/skip opening; contextual early clues and revisits; three help levels across all routes; story milestones and side-quest recovery; short speech pages and speaker portraits; 21 object views, agenda actions and live art; exclusive modals; one next step; bubble geometry at 7 widths; speech cancellation on close/page change; 3 full routes, 6 route switches, NPC memory/recovery, evidence alternatives, 6 reachable rooms, finite relief, no exploration stress, burnout/restart, continuous movement, TTS fallback and cancellation.');

// Authored films: natural completion, skip, replay prevention, modal restoration and reset.
for(const id of Object.keys(t.FILMS)){
 t.reset();t.dismissDialogue();t.state.films={};let ended=0;
 t.say('MOLLY','Eine kurze Aussage.');const pos=[t.state.x,t.state.y];
 assert(t.playFilm(id,()=>ended++));assert(get('film').open&&!get('cinema').open);
 const frames=[];for(const fraction of [0,.4,.8]){t.film.time=t.FILMS[id].duration*fraction;t.renderFilm();frames.push(get('filmArt').innerHTML)}
 assert.equal(new Set(frames).size,3,id+' has distinct animation frames');
 t.motion.keys.add('ArrowLeft');t.step(.01);assert.deepEqual([t.state.x,t.state.y],pos);t.motion.keys.clear();
 t.film.time=0;tick(t.FILMS[id].duration+.1);assert.equal(ended,1);assert(!get('film').open&&get('cinema').open);assert.equal(t.film.active,null);
 t.finishFilm();assert.equal(ended,1);assert(!t.playFilm(id));
 t.state.films={};t.playFilm(id);get('film').listeners.cancel({preventDefault(){}});assert(!get('film').open);assert(get('cinema').open);
 t.state.films={};t.playFilm(id);t.reset();assert(!get('film').open&&!t.film.active);assert.deepEqual(Object.keys(t.state.films),[]);
}
// Burnout stops input immediately, hides the result until the visible collapse ends.
t.reset();t.state.stress=99;t.change(4,'Noch einmal ohne Prüfung');assert.equal(t.state.ending,'lose');assert.equal(t.film.active,'burnout');assert(get('result').hidden);const burnoutPosition=[t.state.x,t.state.y];keyboard('keydown','ArrowRight');tick(8.2);assert.deepEqual([t.state.x,t.state.y],burnoutPosition);assert(!get('result').hidden&&!get('film').open);assert(get('result').innerHTML.includes('BURNOUT – GAME OVER'));
// Route consequences occur once; setting a deadline reduces the delayed cooperative cost.
for(const deadline of [false,true]){
 t.reset();meetMolly();prepareRoute('coop');collectRoom();collectTech();collectMail();go('molly');t.state.deadline=deadline;t.state.stress=40;
 inspect('molly');assert.equal(t.state.stress,deadline?43:50);assert(t.state.films.error&&t.state.films.finale);
 const after=t.state.stress;inspect('molly');assert.equal(t.state.stress,after);assert.equal(t.state.history.filter(e=>e.key==='delayed').length,1);
}
// All final leadership choices win at low, medium and high stress; clear leadership is safe at 99.
for(const route of ['coop','lead','formal'])for(const stress of [10,50,90])for(const choice of ['firm','support','official']){
 t.reset();t.state.approach=route;t.state[{coop:'coopReady',lead:'leadReady',formal:'formalReady'}[route]]=true;
 Object.assign(t.state,{met:true,petra:true,printer:true,recipients:true,handover:true,release:true,proofread:true,stress});
 t.win();assert(get('cinema').open);t.finalChoice(choice);assert.equal(t.film.active,'sent');t.finishFilm();assert(t.state.sent&&t.state.ending==='win');assert.equal(t.state.decisions.final,choice);
}
t.reset();Object.assign(t.state,{approach:'coop',coopReady:true,met:true,petra:true,printer:true,recipients:true,proofread:true,stress:99});t.finalChoice('firm');t.finishFilm();assert(t.state.sent);
// Repeated unnecessary chasing and perfectionism can lose, unlike harmless examination.
t.reset();meetMolly();t.state.stress=90;for(let n=0;n<3&&!t.state.ending;n++){inspect('molly');choose('freundlich nach')}assert.equal(t.state.ending,'lose');
t.reset();t.state.stress=85;t.step(.01);assert.equal(t.film.active,'warning');t.finishFilm();t.step(.01);assert(!t.film.active);assert.equal(t.state.stress,85);
console.log('PASS: all 8 films animate, finish, skip, restore modals and reset; burnout collapse; delayed route costs and deadline mitigation; 27 final route/stress/decision combinations; safe leadership at 99; repeated chasing can lose; one-shot critical warning.');
// Skipping with Enter cannot turn its following native click into a second dialogue step.
t.reset();t.say('MOLLY','Erster Satz. Zweiter Satz. Dritter Satz. Vierter Satz.');t.playFilm('surprise');
doc.listeners.keydown({code:'Enter',repeat:false,timeStamp:90000,target:get('filmSkip'),preventDefault(){}});assert(!t.film.active);assert.equal(t.ui.page,0);get('cinemaNext').onclick({detail:0,timeStamp:90001});assert.equal(t.ui.page,0);get('cinemaNext').onclick({detail:1,timeStamp:90300});assert.equal(t.ui.page,1);
console.log('PASS: keyboard skip suppresses the duplicate native click.');
