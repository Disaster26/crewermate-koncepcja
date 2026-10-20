/* menu */
(function(){
  const h=document.querySelector('.ham'),p=document.getElementById('panel');if(!h||!p)return;
  const u=o=>{h.setAttribute('aria-expanded',o);p.classList.toggle('otwarte',o)};
  h.addEventListener('click',()=>u(h.getAttribute('aria-expanded')!=='true'));
  p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>u(false)));
})();

/* kalkulator: dobor pakietu (prawdziwe pakiety i ceny z crewermate.pl) + liczba pojemnikow */
(function(){
  const wyn=document.getElementById('wynik');if(!wyn)return;
  const st={co:'m50',m2:45,pietro:'2',winda:'nie',kiedy:'tydzien'};
  const P={eko:{n:'Pakiet ekonomiczny',c:'250 zł',o:'Szybki przewóz kilku rzeczy, termin nawet tego samego dnia.'},
    kom:{n:'Pakiet komfortowy',c:'690 zł',o:'Mieszkanie do 50 m², dwuosobowy zespół, zabezpieczenie mebli.'},
    pre:{n:'Pakiet Premium',c:'1 490 zł',o:'Duże mieszkanie lub dom, pojemniki w cenie, ubezpieczenie do 200 000 zł.'},
    vip:{n:'VIP Relocation',c:'od 3 490 zł',o:'Dedykowany asystent, przeprowadzki kilkudniowe i ogólnopolskie.'}};
  const m2=document.getElementById('m2'),m2O=document.getElementById('m2O');
  function dobierz(){
    if(st.co==='kilka')return 'eko';
    if(st.co==='firma')return st.m2>120?'vip':'pre';
    if(st.co==='duze'||st.m2>50)return st.m2>140?'vip':'pre';
    return 'kom';
  }
  function rysuj(){
    const k=dobierz(),p=P[k];
    const ludzi=st.co==='kilka'?'1-2':(st.m2<=50?'2':st.m2<=100?'3':'4+');
    const poj=st.co==='kilka'?'nie są potrzebne':('ok. '+Math.max(10,Math.round(st.m2*0.9/5)*5)+' szt.');
    const trudno=(st.pietro!=='0'&&st.winda==='nie');
    wyn.innerHTML=(st.kiedy==='ekspres'?'<span class="ekspres">Tryb ekspresowy 0-2 dni, zadzwoń od razu</span>':'')+
      '<span class="w-t">Proponujemy</span><h3>'+p.n+'</h3><div class="w-c">'+p.c+'</div><p class="w-o">'+p.o+'</p>'+
      '<ul class="wl"><li><span>Zespół</span>'+ludzi+' osoby</li><li><span>Pojemniki zamiast kartonów</span>'+poj+'</li><li><span>Wnoszenie</span>'+(trudno?'piętro bez windy, uwzględnimy w wycenie':'bez utrudnień')+'</li></ul>'+
      '<a class="btn btn-czer" href="#kontakt">Wyślij do darmowej wyceny</a>';
    document.querySelectorAll('.pak').forEach(x=>x.classList.toggle('podsw',x.dataset.pak===k));
    const t=document.getElementById('kalkTekst');
    if(t)t.value=p.n+', '+st.m2+' m², '+({kilka:'kilka rzeczy',m50:'mieszkanie',duze:'duże mieszkanie / dom',firma:'biuro / firma'}[st.co])+', piętro '+({0:'parter',2:'1-3',4:'4+'}[st.pietro])+', winda: '+(st.winda==='tak'?'jest':'brak')+', termin: '+({ekspres:'pilnie 0-2 dni',tydzien:'w tym miesiącu',pozniej:'później'}[st.kiedy])+'.';
  }
  document.querySelectorAll('#kalkulator .chipy').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));st[g.dataset.p]=b.dataset.v;
    if(g.dataset.p==='co'){const d={kilka:15,m50:45,duze:90,firma:120}[b.dataset.v];m2.value=d;st.m2=d;m2O.textContent=d+' m²';}rysuj()}));
  m2.addEventListener('input',()=>{st.m2=+m2.value;m2O.textContent=m2.value+' m²';rysuj()});
  rysuj();
})();

/* mapa */
(function(){
  const box=document.getElementById('mapa');if(!box||!window.L)return;
  const ll=[50.2987,19.1361];
  const m=L.map(box,{scrollWheelZoom:false,tap:false}).setView(ll,10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(m);
  L.marker(ll,{icon:L.divIcon({className:'',html:'<div class="pin"></div>',iconSize:[22,22],iconAnchor:[11,22]})}).addTo(m).bindTooltip('CREWERMATE · Sosnowiec',{direction:'top',offset:[0,-20],permanent:true});
  [[50.2649,19.0238,'Katowice'],[50.3249,19.1291,'Będzin'],[50.3483,19.2084,'Dąbrowa Górnicza'],[50.2905,18.9762,'Chorzów']].forEach(c=>L.circleMarker([c[0],c[1]],{radius:6,color:'#d9262f',weight:2,fillColor:'#d9262f',fillOpacity:.45}).addTo(m).bindTooltip(c[2]));
})();

/* dolny pasek na telefonie dopiero po przewinieciu */
(function(){
  const m=document.querySelector('.mob'),t=document.querySelector('.hero-cta');if(!m)return;
  if(!t||!('IntersectionObserver' in window)){m.classList.add('widac');return}
  new IntersectionObserver(w=>w.forEach(x=>m.classList.toggle('widac',!x.isIntersecting&&x.boundingClientRect.top<0)),{threshold:0}).observe(t);
})();
