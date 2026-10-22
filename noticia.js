(async()=>{
  const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=new URLSearchParams(location.search),localId=params.get('local'),officialId=params.get('id');
  let item=null,local=false;
  if(localId){await CRBIOStore.migrateLegacy();item=await CRBIOStore.get('news',localId);local=true}else item=(window.CRBIO_NEWS_ARCHIVE||[]).find(entry=>String(entry.id)===String(officialId));
  const article=document.querySelector('#newsArticle');
  if(!item){article.innerHTML='<div class="article-empty"><h1>Notícia não encontrada</h1><p>O conteúdo solicitado não está disponível nesta homologação.</p><a href="noticias.html">Voltar às notícias</a></div>';return}
  const image=CRBIOStore.imageUrl(item,'assets/rio-institucional.png');
  const content=local?String(item.content||item.summary||'').split(/\n{2,}/).map(paragraph=>`<p>${escape(paragraph).replace(/\n/g,'<br>')}</p>`).join(''):item.contentHtml;
  document.title=`${item.title} — CRBio-02`;
  article.innerHTML=`<header class="article-header"><p class="eyebrow">${escape(item.category||'Notícia')}</p><h1>${escape(item.title)}</h1><p class="article-summary">${escape(item.summary||'')}</p><time>${escape(item.date||(item.publishAt?new Date(item.publishAt).toLocaleDateString('pt-BR'):'Homologação local'))}</time></header><figure><img src="${escape(image)}" alt="${escape(item.alt||'Imagem relacionada à notícia')}"></figure><div class="article-content">${content||`<p>${escape(item.summary||'')}</p>`}</div>${item.legacyUrl?`<aside class="article-source"><b>Publicação original preservada</b><p>Consulte também a versão atualmente publicada no portal oficial do CRBio-02.</p><a href="${escape(item.legacyUrl)}" target="_blank" rel="noopener">Abrir publicação original ↗</a></aside>`:''}<nav class="article-back"><a href="noticias.html">← Voltar para todas as notícias</a></nav>`;
})().catch(error=>{document.querySelector('#newsArticle').innerHTML=`<div class="article-empty"><h1>Não foi possível abrir a notícia</h1><p>${error.message}</p><a href="noticias.html">Voltar às notícias</a></div>`});
