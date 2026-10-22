(()=>{
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const pages=Object.entries(window.CRBIO_PORTAL.pages).map(([key,value])=>({title:value.title,summary:value.intro,type:'Página',url:`interna.html?pagina=${key}`,text:[value.title,value.accent,value.intro,...value.sections.flatMap(s=>[s.title,s.text]),...value.links.map(l=>l[0])].join(' ')}));
  const news=window.CRBIO_PORTAL.news.map(item=>({title:item.title,summary:item.summary,type:'Notícia',url:item.url,text:`${item.title} ${item.summary} ${item.category}`}));
  const entries=[...pages,...news];
  const form=document.querySelector('#localSearch'),input=document.querySelector('#searchQuery'),list=document.querySelector('#searchResults'),title=document.querySelector('#resultTitle');
  function render(query){const q=normalize(query),results=q?entries.filter(item=>normalize(item.text).includes(q)):entries;title.textContent=q?`${results.length} resultado${results.length===1?'':'s'} para “${query}”`:'Conteúdos do portal';list.innerHTML=results.length?results.map(item=>`<a class="result" href="${item.url}"${item.url.startsWith('http')?' target="_blank" rel="noopener"':''}><small>${item.type}</small><h2>${item.title}</h2><p>${item.summary}</p></a>`).join(''):'<div class="empty-results"><h2>Nenhum resultado encontrado</h2><p>Tente termos como registro, ART, boleto, legislação ou contato.</p></div>'}
  form.addEventListener('submit',event=>{event.preventDefault();const q=input.value.trim();history.replaceState(null,'',q?`?q=${encodeURIComponent(q)}`:'busca.html');render(q)});
  const initial=new URLSearchParams(location.search).get('q')||'';input.value=initial;render(initial);
})();
