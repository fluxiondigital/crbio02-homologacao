(()=>{
  const key=new URLSearchParams(location.search).get('pagina')||'institucional';
  const data=window.CRBIO_PORTAL.pages[key];
  if(!data){location.replace('404.html');return}
  document.body.dataset.page=key;
  document.title=`${data.title} — CRBio-02`;
  document.querySelector('#crumb').textContent=data.title;
  document.querySelector('#pageEyebrow').textContent=data.eyebrow;
  document.querySelector('#pageTitle').innerHTML=`${data.title}<span>${data.accent}</span>`;
  document.querySelector('#pageIntro').textContent=data.intro;
  document.querySelector('#infoGrid').innerHTML=data.sections.map((item,index)=>`<article class="info-card"><span>${String(index+1).padStart(2,'0')}</span><h2>${item.title}</h2><p>${item.text}</p></article>`).join('');
  document.querySelector('#linkGrid').innerHTML=data.links.map(([label,url])=>`<a href="${url}"${/^(https?:|mailto:)/.test(url)?' target="_blank" rel="noopener"':''}><span>${label}</span><span aria-hidden="true">${url.startsWith('http')?'↗':'→'}</span></a>`).join('');
})();
