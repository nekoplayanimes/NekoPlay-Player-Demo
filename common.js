// Dependências mínimas para executar o player original sem autenticação/Supabase.
async function userRequired(){return {id:"local-player-test",email:""}}
async function catalog(){const r=await fetch("catalog.json",{cache:"no-store"});if(!r.ok)throw Error("Não foi possível carregar catalog.json");return r.json()}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[c]))}
function header(){return ""}
function toast(s){let t=document.querySelector(".np-test-toast");if(!t){t=document.createElement("div");t.className="np-test-toast";t.style.cssText="position:fixed;z-index:9999;left:50%;bottom:20px;transform:translateX(-50%);background:#211a30;color:white;padding:12px 16px;border:1px solid #ffffff30;border-radius:10px";document.body.appendChild(t)}t.textContent=s;t.hidden=false;clearTimeout(t._timer);t._timer=setTimeout(()=>t.hidden=true,2400)}
function saveEpisodeProgress(){}
