(()=>{
  const paths={
    location:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" class="icon-fill"/>',
    facebook:'<path d="M14 21v-8h3l.5-3H14V8.5c0-1 .4-1.5 1.8-1.5H18V4.2c-.7-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.2V10H7v3h3v8"/>',
    youtube:'<path d="M21 8.2a2.7 2.7 0 0 0-1.9-1.9C17.4 5.8 12 5.8 12 5.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 8.2 28 28 0 0 0 2.6 12 28 28 0 0 0 3 15.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-3.8 28 28 0 0 0-.4-3.8Z"/><path d="m10 9 5 3-5 3Z"/>',
    linkedin:'<path d="M6 9v10M6 5.5v.1M10 19v-6c0-2.2 1.4-4 3.8-4S18 10.8 18 13v6M10 9v10"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c.6-5 3.2-8 8-8s7.4 3 8 8"/>',
    home:'<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/>',
    building:'<path d="M3 21h18M5 21V7h7v14M12 21V3h7v18M8 10h1M8 14h1M15 7h1M15 11h1M15 15h1"/>',
    users:'<circle cx="9" cy="8" r="4"/><path d="M2.5 21c.5-5 2.7-8 6.5-8s6 3 6.5 8M16 5.5a3.5 3.5 0 0 1 0 6.5M16.5 14c3.2.4 4.7 2.7 5 7"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    shield:'<path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    file:'<path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
    megaphone:'<path d="m3 11 14-6v14L3 13Z"/><path d="M7 14v5c0 1 1 2 2 2h2l-1-7M20 9c1 2 1 4 0 6"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    phone:'<path d="M7 3h3l1.5 5-2 1.5a16 16 0 0 0 5 5L16 12l5 1.5v3C21 19 19 21 16.5 21 9 20 4 15 3 7.5 3 5 5 3 7 3Z"/>',
    external:'<path d="M14 4h6v6M20 4 11 13"/><path d="M18 13v7H4V6h7"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m4 17 5-5 4 4 3-3 5 5"/>',
    folder:'<path d="M3 6h7l2 2h9v11H3Z"/>',
    audit:'<path d="M12 3 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z"/><path d="M9 12h6M12 9v6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    dashboard:'<path d="M4 13h6V4H4ZM14 20h6v-9h-6ZM14 8h6V4h-6ZM4 20h6v-3H4Z"/>',
    newspaper:'<path d="M5 3h14v18H5Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    library:'<path d="M4 4h5v16H4ZM10 4h5v16h-5ZM16 5l4-1 2 15-4 1Z"/>',
    leaf:'<path d="M20 4C10 4 4 9 4 16c0 3 2 5 5 5 7 0 12-8 11-17Z"/><path d="M3 22c4-8 9-12 15-16"/>'
  };
  const make=(name)=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]||paths.info}</svg>`;
  const render=(root=document)=>root.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach(el=>{el.innerHTML=make(el.dataset.icon);el.classList.add('ui-icon');el.setAttribute('data-icon-ready','')});
  window.CRBioIcons={render};
  const start=()=>{render();new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('[data-icon]'))render(n.parentNode);else render(n)}}))).observe(document.body,{childList:true,subtree:true})};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
