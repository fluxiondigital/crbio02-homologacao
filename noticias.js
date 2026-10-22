(async()=>{
  const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  await CRBIOStore.migrateLegacy();
  const local=(await CRBIOStore.list('news')).filter(item=>item.status==='published').map(item=>({...item,date:item.publishAt?new Date(item.publishAt).toLocaleDateString('pt-BR'):'Homologação local',url:`noticia.html?local=${encodeURIComponent(item.id)}`}));
  const localIds=new Set(local.map(item=>String(item.id)));
  const official=(window.CRBIO_NEWS_ARCHIVE||[]).filter(item=>!localIds.has(String(item.id)));
  const items=[...local,...official];
  document.querySelector('#newsCount').textContent=`${items.length} publicações disponíveis`;
  document.querySelector('#allNews').innerHTML=items.map(item=>`<article class="news-card"><img src="${escape(CRBIOStore.imageUrl(item,'assets/rio-institucional.png'))}" alt="${escape(item.alt||'Imagem relacionada à notícia')}"><div class="news-body"><div class="news-meta"><b>${escape(item.category||'Notícia')}</b><span>${escape(item.date||'')}</span></div><h2>${escape(item.title)}</h2><p>${escape(item.summary||'')}</p><a href="${escape(item.url)}">Ler notícia →</a></div></article>`).join('');
})().catch(error=>{document.querySelector('#allNews').innerHTML=`<p>Não foi possível carregar o arquivo de notícias: ${error.message}</p>`});
