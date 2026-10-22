const menus={
  crbio:[['Institucional',['Quem somos','Equipe e conselheiros','Comissões','Câmaras técnicas']],['Governança',['Regimento','Organograma','Valores estratégicos','Atas']],['Contato',['Localização','Horário de funcionamento','Fale conosco']]],
  profissionais:[['Registro',['Novo registro','Registro secundário','Transferência','Licença e cancelamento']],['Responsabilidade técnica',['Emitir ART','Baixa de ART','Certidão de acervo']],['Profissão',['Áreas de atuação','Código de ética','Título de especialidade']]],
  empresas:[['Cadastro',['Novo registro ou cadastro','Alteração cadastral','Cancelamento']],['Responsabilidade técnica',['Emitir TRT','Renovação de TRT','Inclusão de RT']],['Acesso',['Área da empresa','Acompanhamento de processo','Taxas e boletos']]]
};
const menuUrls={'Quem somos':'interna.html?pagina=institucional','Equipe e conselheiros':'interna.html?pagina=institucional','Comissões':'interna.html?pagina=institucional','Câmaras técnicas':'interna.html?pagina=institucional','Regimento':'interna.html?pagina=institucional','Organograma':'interna.html?pagina=institucional','Valores estratégicos':'interna.html?pagina=institucional','Atas':'interna.html?pagina=transparencia','Localização':'interna.html?pagina=contato','Horário de funcionamento':'interna.html?pagina=contato','Fale conosco':'interna.html?pagina=contato','Novo registro':'https://www.crbio02.gov.br/NovoRegistro.Aspx','Registro secundário':'interna.html?pagina=profissionais','Transferência':'interna.html?pagina=profissionais','Licença e cancelamento':'interna.html?pagina=profissionais','Emitir ART':'https://eco.crbio02.gov.br/servicos/Login.aspx','Baixa de ART':'https://eco.crbio02.gov.br/servicos/Login.aspx','Certidão de acervo':'interna.html?pagina=profissionais','Áreas de atuação':'interna.html?pagina=profissionais','Código de ética':'interna.html?pagina=legislacao','Título de especialidade':'interna.html?pagina=profissionais','Novo registro ou cadastro':'https://www.crbio02.gov.br/NovoRegistro.Aspx','Alteração cadastral':'interna.html?pagina=empresas','Cancelamento':'interna.html?pagina=empresas','Emitir TRT':'https://eco.crbio02.gov.br/servicos/EmiteTRT.aspx','Renovação de TRT':'interna.html?pagina=empresas','Inclusão de RT':'interna.html?pagina=empresas','Área da empresa':'https://eco.crbio02.gov.br/servicos/Login.aspx','Acompanhamento de processo':'https://eco.crbio02.gov.br/servicos/AcompanhamentoProcesso.aspx','Taxas e boletos':'https://eco.crbio02.gov.br/servicos/Recobranca.Aspx'};
const escapeHtml=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const newsIcons=[
  '<svg viewBox="0 0 64 64"><path d="M12 35h10l23 12V17L22 29H12zM22 35v17h10l3-12M50 25c5 4 5 10 0 14"/></svg>',
  '<svg viewBox="0 0 64 64"><path d="M16 7h25l9 9v41H16zM41 7v11h9M24 29h18M24 38h18M24 47h12"/></svg>',
  '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="9"/><path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M49 15l-6 6M21 43l-6 6"/></svg>'
];
const newsGrid=document.querySelector('#newsGrid');
async function renderHomeNews(){
  await CRBIOStore.migrateLegacy();
  const local=(await CRBIOStore.list('news')).filter(item=>item.status==='published').map(item=>({...item,date:item.publishAt?new Date(item.publishAt).toLocaleDateString('pt-BR'):'Homologação local',url:`noticia.html?local=${encodeURIComponent(item.id)}`}));
  const localIds=new Set(local.map(item=>String(item.id)));
  const news=[...local,...(window.CRBIO_NEWS_ARCHIVE||[]).filter(item=>!localIds.has(String(item.id)))].slice(0,3);
  newsGrid.innerHTML=news.map((item,index)=>{const image=CRBIOStore.imageUrl(item,'assets/rio-institucional.png');return `<article class="news-card news-theme-${index%3}"><div class="news-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(item.alt||'Imagem relacionada à notícia')}"><span class="news-image-icon" aria-hidden="true">${newsIcons[index%newsIcons.length]}</span></div><div class="news-card-body"><div class="news-meta"><b>${escapeHtml(item.category||'Notícia')}</b><span><i aria-hidden="true">□</i>${escapeHtml(item.date||'Homologação local')}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><a class="read-more" href="${escapeHtml(item.url)}">Leia mais <i>→</i></a></div></article>`}).join('');
}
renderHomeNews().catch(()=>{newsGrid.innerHTML='<p>Não foi possível carregar as notícias desta prévia.</p>'});
document.querySelectorAll('[data-news-direction]').forEach(button=>button.addEventListener('click',()=>{const card=newsGrid.querySelector('.news-card');if(!card)return;const distance=card.getBoundingClientRect().width+22;newsGrid.scrollBy({left:button.dataset.newsDirection==='next'?distance:-distance,behavior:'smooth'})}));
const mega=document.querySelector('#megaMenu');
document.querySelectorAll('[data-menu]').forEach(btn=>btn.addEventListener('click',()=>{
  const key=btn.dataset.menu; const isOpen=mega.dataset.open===key;
  document.querySelectorAll('[data-menu]').forEach(b=>b.setAttribute('aria-expanded','false'));
  if(isOpen){mega.hidden=true;mega.classList.remove('open');mega.dataset.open='';return}
  mega.innerHTML=menus[key].map(([title,items])=>`<div><h3>${title}</h3>${items.map(label=>{const url=menuUrls[label];return url?`<a href="${url}" ${url.startsWith('http')?'target="_blank" rel="noopener"':''}>${label}</a>`:`<span class="menu-pending">${label}</span>`}).join('')}</div>`).join('');
  mega.hidden=false;mega.classList.add('open');mega.dataset.open=key;btn.setAttribute('aria-expanded','true');
}));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
const toast=document.querySelector('#toast');function notify(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2500)}
document.querySelector('#searchForm').addEventListener('submit',e=>{e.preventDefault();const q=new FormData(e.target).get('q').trim();if(!q)return;location.href=`busca.html?q=${encodeURIComponent(q)}`});
const accBtn=document.querySelector('#accessibilityButton'),panel=document.querySelector('#accessibilityPanel');accBtn.addEventListener('click',()=>{panel.hidden=!panel.hidden;accBtn.setAttribute('aria-expanded',String(!panel.hidden))});
document.querySelector('.footer-accessibility').addEventListener('click',()=>{panel.hidden=false;accBtn.setAttribute('aria-expanded','true');panel.querySelector('button').focus()});
panel.addEventListener('click',e=>{const action=e.target.dataset.action;if(!action)return;if(action==='increase-font'){document.documentElement.style.fontSize='18px';notify('Tamanho do texto aumentado')}if(action==='contrast'){document.body.classList.toggle('high-contrast');notify('Contraste ajustado')}if(action==='reset'){document.documentElement.style.fontSize='';document.body.classList.remove('high-contrast');notify('Preferências restauradas')}});

const carousel=document.querySelector('.official-carousel');
async function initCarousel(){
if(carousel){
  const uploaded=(await CRBIOStore.list('banners')).filter(item=>CRBIOStore.activeBanner(item)).sort((a,b)=>(Number(a.order)||99)-(Number(b.order)||99));
  if(uploaded.length){
    const track=carousel.querySelector('.carousel-track');
    uploaded.slice().reverse().forEach(item=>{const slide=document.createElement('a');slide.className='official-slide uploaded-slide';slide.href=item.link||'#';if(item.external==='true'){slide.target='_blank';slide.rel='noopener'}slide.setAttribute('aria-hidden','true');slide.tabIndex=-1;const img=document.createElement('img');img.src=CRBIOStore.imageUrl(item);img.alt=item.alt||item.title;img.width=1920;img.height=800;slide.append(img);track.prepend(slide)});
  }
  const slides=[...carousel.querySelectorAll('.official-slide')],dotsContainer=carousel.querySelector('.carousel-dots'),status=carousel.querySelector('#bannerStatus'),pauseButton=carousel.querySelector('.carousel-pause');
  dotsContainer.innerHTML=slides.map((_,index)=>`<button class="${index===0?'active':''}" type="button" role="tab" aria-selected="${index===0?'true':'false'}" aria-label="Ir para banner ${index+1}" data-slide="${index}"></button>`).join('');
  const dots=[...dotsContainer.querySelectorAll('[data-slide]')];
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current=0,timer=null,paused=reducedMotion,pointerStart=null;
  function showSlide(next,announce=true){
    current=(next+slides.length)%slides.length;
    slides.forEach((slide,index)=>{const active=index===current;slide.classList.toggle('active',active);slide.setAttribute('aria-hidden',String(!active));slide.tabIndex=active?0:-1});
    dots.forEach((dot,index)=>{const active=index===current;dot.classList.toggle('active',active);dot.setAttribute('aria-selected',String(active))});
    if(announce)status.textContent=`Banner ${current+1} de ${slides.length}: ${slides[current].querySelector('img').alt}`;
  }
  function stopRotation(){if(timer){clearInterval(timer);timer=null}}
  function startRotation(){stopRotation();if(!paused&&!document.hidden)timer=setInterval(()=>showSlide(current+1,false),6500)}
  function select(next){showSlide(next);startRotation()}
  carousel.querySelector('.previous').addEventListener('click',()=>select(current-1));
  carousel.querySelector('.next').addEventListener('click',()=>select(current+1));
  dots.forEach(dot=>dot.addEventListener('click',()=>select(Number(dot.dataset.slide))));
  pauseButton.addEventListener('click',()=>{paused=!paused;pauseButton.setAttribute('aria-pressed',String(paused));pauseButton.textContent=paused?'▶':'Ⅱ';pauseButton.setAttribute('aria-label',paused?'Retomar rotação dos banners':'Pausar rotação dos banners');paused?stopRotation():startRotation()});
  carousel.addEventListener('mouseenter',stopRotation);carousel.addEventListener('mouseleave',startRotation);
  carousel.addEventListener('focusin',stopRotation);carousel.addEventListener('focusout',event=>{if(!carousel.contains(event.relatedTarget))startRotation()});
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();select(current-1)}if(event.key==='ArrowRight'){event.preventDefault();select(current+1)}});
  carousel.addEventListener('pointerdown',event=>{pointerStart=event.clientX});carousel.addEventListener('pointerup',event=>{if(pointerStart===null)return;const distance=event.clientX-pointerStart;pointerStart=null;if(Math.abs(distance)>55)select(current+(distance<0?1:-1))});
  document.addEventListener('visibilitychange',()=>document.hidden?stopRotation():startRotation());
  pauseButton.setAttribute('aria-pressed',String(paused));if(paused){pauseButton.textContent='▶';pauseButton.setAttribute('aria-label','Retomar rotação dos banners')}
  showSlide(0,false);startRotation();
}
}
initCarousel().catch(error=>console.error('Falha ao carregar banners da homologação',error));
