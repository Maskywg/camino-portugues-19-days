const days = [
  {day:1,date:'9/10',from:'Porto',to:'Póvoa de Varzim',steps:25000,km:15.7,type:'walk',line:'central',lat:41.3804,lng:-8.7609,note:'從 Porto 搭地鐵 B 線到末站，從海風裡開始步行。',stay:'Casa Tomé de Sousa'},
  {day:2,date:'9/11',from:'Póvoa de Varzim',to:'Barcelos',steps:26000,km:16,type:'walk',line:'central',lat:41.5317,lng:-8.6191,note:'沿著葡萄牙北部城鎮向內陸前進。',stay:'Residencial Kuarenta&Um'},
  {day:3,date:'9/12',from:'Barcelos',to:'Balugães',steps:30000,km:18,type:'walk',line:'central',lat:41.6436,lng:-8.6373,note:'離開公雞之城，走進鄉間與葡萄園。'},
  {day:4,date:'9/13',from:'Balugães',to:'Ponte de Lima',steps:34000,km:21,type:'walk',line:'central',lat:41.7671,lng:-8.583,note:'向利馬河與古老石橋前進。'},
  {day:5,date:'9/14',from:'Ponte de Lima',to:'Ponte de Lima',steps:null,km:null,type:'rest',line:'central',lat:41.7671,lng:-8.583,note:'停留日。讓身體，也讓目光慢下來。'},
  {day:6,date:'9/15（二）',from:'Ponte de Lima',to:'Rubiães',steps:32000,km:18,type:'walk',line:'central',lat:41.896,lng:-8.6244,note:'穿過中央線上最具挑戰性的山路之一。'},
  {day:7,date:'9/16（三）',from:'Rubiães',to:'Valença',steps:36000,km:21.3,type:'walk',line:'central',lat:42.0316,lng:-8.6444,note:'朝葡萄牙北方最後一座堡壘城市前進。'},
  {day:8,date:'9/17（四）',from:'Valença · Portugal',to:'Tui · España',steps:12000,km:7,type:'walk',line:'central',lat:42.0477,lng:-8.6444,note:'走過米尼奧河上的國際橋，一步跨進西班牙。'},
  {day:9,date:'9/18（五）',from:'Tui',to:'Redondela',steps:32000,km:20,type:'walk',line:'central',lat:42.2836,lng:-8.6095,note:'中央線在 Redondela 與海岸線相遇。'},
  {day:10,date:'9/19（六）',from:'Redondela',to:'Pontevedra',steps:40000,km:24.3,type:'walk',line:'central',lat:42.4299,lng:-8.6446,note:'長距離的一日，抵達靈性線的分岔前夜。'},
  {day:11,date:'9/20（日）',from:'Pontevedra',to:'Armenteira',steps:32100,km:18.1,type:'walk',line:'spiritual',lat:42.4625,lng:-8.7468,note:'離開中央線，轉入 Variante Espiritual。'},
  {day:12,date:'9/21（一）',from:'Armenteira',to:'Vilanova de Arousa',steps:41000,km:25.1,type:'walk',line:'spiritual',lat:42.5626,lng:-8.8279,note:'穿過 Ruta da Pedra e da Auga，從石與水走向海。'},
  {day:13,date:'9/22（二）',from:'Vilanova de Arousa',to:'Vilanova de Arousa',steps:6000,km:3.2,type:'rest',line:'spiritual',lat:42.5626,lng:-8.8279,note:'留在港灣，等待下一段海上之路。'},
  {day:14,date:'9/23（三）',from:'Vilanova de Arousa',to:'Padrón',steps:18400,km:11,boat:28,type:'special',line:'sea',lat:42.7389,lng:-8.6606,note:'船行 28 公里，再步行 11 公里；循著 Traslatio 傳說上岸。'},
  {day:15,date:'9/24（四）',from:'Padrón',to:'Santiago de Compostela',steps:19000,km:11,type:'walk',line:'spiritual',lat:42.8805,lng:-8.5457,note:'從傳說的入口，走向聖雅各最終安息的聖殿。'},
  {day:16,date:'9/25（五）',from:'Santiago de Compostela',to:'Santiago de Compostela',steps:null,km:null,type:'rest',line:'spiritual',lat:42.8805,lng:-8.5457,note:'抵達之後，在 Santiago 停留。'},
  {day:17,date:'9/26（六）',from:'Santiago de Compostela',to:'Fisterra',steps:null,km:null,type:'special',line:'after',lat:42.9047,lng:-9.2629,note:'繼續向西，前往古人眼中的世界盡頭。'},
  {day:18,date:'9/27（日）',from:'Fisterra',to:'Muxía',steps:null,km:null,type:'special',line:'after',lat:43.1046,lng:-9.2179,note:'在大西洋海岸，尋找朝聖路的另一個終點。'},
  {day:19,date:'9/28（一）',from:'Muxía',to:'Fisterra',steps:null,km:null,type:'special',line:'after',lat:42.9047,lng:-9.2629,note:'回到 Fisterra，把旅程留在海與落日之間。'}
];
const start={lat:41.1579,lng:-8.6291};
const colors={central:'#e4aa27',spiritual:'#167487',sea:'#69bfc3',after:'#a44c3b'};
const dayList=document.querySelector('#dayList');
const panel=document.querySelector('#mapPanel');
function fmt(n){return n==null?'—':n.toLocaleString('en-US')}
function card(d){return `<article class="day-card" data-day="${d.day}" data-type="${d.type}" tabindex="0"><span class="day-num">DAY ${String(d.day).padStart(2,'0')}</span><span class="day-date">${d.date}</span><div class="day-route"><h3>${d.from===d.to?d.to:`${d.from} → ${d.to}`}</h3><p>${d.note}</p>${d.stay?`<p>住宿｜${d.stay}</p>`:''}</div><div class="day-metrics"><b>${d.km!=null?d.km+' km':d.type==='rest'?'停留':'延伸旅程'}</b><span>${d.steps?fmt(d.steps)+' 步':'未記錄步數'}</span></div></article>`}
dayList.innerHTML=days.map(card).join('');
const chart=document.querySelector('#chart');
chart.innerHTML=days.filter(d=>d.steps).map(d=>`<div class="bar-col" title="Day ${d.day}：${fmt(d.steps)} 步"><i style="height:${d.steps/41000*100}%"></i><span>${d.day}</span></div>`).join('');

let map,markers={},routeLines={};
function panelView(d){panel.innerHTML=`<span class="daytag">DAY ${String(d.day).padStart(2,'0')} · ${d.date}</span><h3>${d.from===d.to?d.to:`${d.from} → ${d.to}`}</h3><p>${d.note}</p><div class="metrics"><span>${d.km!=null?'🚶 '+d.km+' km':'📍 停留／移動'}</span>${d.boat?`<span>⛵ ${d.boat} km</span>`:''}<span>${d.steps?'◉ '+fmt(d.steps)+' 步':''}</span></div>`;document.querySelectorAll('.day-card').forEach(el=>el.classList.toggle('active',+el.dataset.day===d.day))}
function initMap(){
  if(!window.L){panel.innerHTML='<h3>地圖載入失敗</h3><p>請確認網路連線後重新整理；每日旅程仍可在下方閱讀。</p>';return}
  map=L.map('map',{zoomControl:false,attributionControl:false,scrollWheelZoom:false}).setView([42.25,-8.7],7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);L.control.zoom({position:'topright'}).addTo(map);
  const grouped={central:[start],spiritual:[],sea:[],after:[]};
  days.forEach(d=>grouped[d.line].push({lat:d.lat,lng:d.lng}));
  grouped.spiritual.unshift({lat:days[9].lat,lng:days[9].lng});
  grouped.spiritual.splice(grouped.spiritual.length-2,0,{lat:days[13].lat,lng:days[13].lng});
  grouped.sea.unshift({lat:days[12].lat,lng:days[12].lng});grouped.after.unshift({lat:days[15].lat,lng:days[15].lng});
  Object.entries(grouped).forEach(([key,pts])=>{routeLines[key]=L.polyline(pts.map(p=>[p.lat,p.lng]),{color:colors[key],weight:key==='sea'?6:7,opacity:.92,dashArray:key==='sea'?'6 13':null,lineCap:'round'}).addTo(map)});
  days.forEach(d=>{const cls=d.line==='sea'?'sea-mark':d.line==='spiritual'?'spirit':d.line==='after'?'finish':'';const icon=L.divIcon({className:'',html:`<div class="marker ${cls}"><span>${d.day}</span></div>`,iconSize:[34,34],iconAnchor:[17,30]});markers[d.day]=L.marker([d.lat,d.lng],{icon}).addTo(map).on('click',()=>selectDay(d,true));});
  fitAll();panelView(days[0]);
}
function fitAll(){map.fitBounds([[41.12,-9.34],[43.17,-8.45]],{padding:[35,35]})}
function selectDay(d,scroll=false){panelView(d);if(map){map.flyTo([d.lat,d.lng],d.day>=17?10:11,{duration:1});markers[d.day].openPopup().bindPopup(`<b>Day ${d.day}</b><br>${d.to}`).openPopup()}if(scroll){const el=document.querySelector(`[data-day="${d.day}"]`);if(el&&window.innerWidth>850)el.scrollIntoView({behavior:'smooth',block:'center'})}}
dayList.addEventListener('click',e=>{const el=e.target.closest('.day-card');if(el)selectDay(days.find(d=>d.day===+el.dataset.day))});
dayList.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.day-card')){e.preventDefault();selectDay(days.find(d=>d.day===+e.target.dataset.day))}});
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.day-card').forEach(c=>c.classList.toggle('hidden',btn.dataset.filter!=='all'&&c.dataset.type!==btn.dataset.filter))}));
document.querySelector('#resetMap').addEventListener('click',()=>document.querySelector('#routeTabs [data-route="all"]').click());
const routeRanges={central:[1,10],spiritual:[11,16],sea:[13,14],after:[17,19]};
document.querySelector('#routeTabs').addEventListener('click',e=>{
  const btn=e.target.closest('button');if(!btn||!map)return;
  document.querySelectorAll('#routeTabs button').forEach(b=>b.classList.toggle('active',b===btn));
  const key=btn.dataset.route;
  Object.entries(routeLines).forEach(([name,line])=>line.setStyle({opacity:(key==='all'||name===key)?0.92:0.12,weight:(key==='all'||name===key)?(name==='sea'?6:7):3}));
  Object.entries(markers).forEach(([n,m])=>{const range=routeRanges[key];m.setOpacity(!range||(+n>=range[0]&&+n<=range[1])?1:.18)});
  if(key==='all'){fitAll();panelView(days[0]);return}
  const range=routeRanges[key],subset=days.filter(d=>d.day>=range[0]&&d.day<=range[1]);
  map.fitBounds(subset.map(d=>[d.lat,d.lng]),{padding:[70,70]});panelView(subset[0]);
});
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
addEventListener('scroll',()=>{document.querySelector('#progress').style.width=`${scrollY/(document.documentElement.scrollHeight-innerHeight)*100}%`},{passive:true});
initMap();
