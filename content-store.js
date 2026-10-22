(function(){
  const DB_NAME='crbio-cms-homologacao';
  const DB_VERSION=1;
  const STORES=['news','banners'];
  let dbPromise;

  function open(){
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      const request=indexedDB.open(DB_NAME,DB_VERSION);
      request.onupgradeneeded=()=>{
        const db=request.result;
        STORES.forEach(name=>{if(!db.objectStoreNames.contains(name))db.createObjectStore(name,{keyPath:'id'})});
      };
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error);
    });
    return dbPromise;
  }

  async function transaction(store,mode,operation){
    const db=await open();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(store,mode);
      const request=operation(tx.objectStore(store));
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error);
    });
  }

  async function migrateLegacy(){
    for(const store of STORES){
      const marker=`crbio-indexed-migrated-${store}`;
      if(localStorage.getItem(marker))continue;
      let legacy=[];
      try{legacy=JSON.parse(localStorage.getItem(`crbio-${store}`)||'[]')}catch{}
      for(const item of legacy){
        if(item&&item.id)await put(store,item);
      }
      localStorage.setItem(marker,'1');
    }
  }

  async function list(store){
    const result=await transaction(store,'readonly',objectStore=>objectStore.getAll());
    return Array.isArray(result)?result:[];
  }
  const get=(store,id)=>transaction(store,'readonly',objectStore=>objectStore.get(id));
  const put=(store,item)=>transaction(store,'readwrite',objectStore=>objectStore.put(item));
  const remove=(store,id)=>transaction(store,'readwrite',objectStore=>objectStore.delete(id));
  function imageUrl(item,fallback=''){
    if(item?.imageBlob instanceof Blob)return URL.createObjectURL(item.imageBlob);
    return item?.image||fallback;
  }
  function activeBanner(item,now=new Date()){
    if(item.status!=='published')return false;
    const start=item.startsAt?new Date(item.startsAt):null;
    const end=item.endsAt?new Date(item.endsAt):null;
    return(!start||start<=now)&&(!end||end>=now);
  }

  window.CRBIOStore={open,list,get,put,remove,migrateLegacy,imageUrl,activeBanner};
})();
