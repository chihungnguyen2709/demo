function search(q) {
  if(!q.trim())return;
  go('search/'+encodeURIComponent(q.trim()))
}
function currentRoute() {
  const page=location.pathname.split(/[\\/]/).pop().replace(/\.html?$/i,'');
  const params=new URLSearchParams(location.search);
  const routes= {
    index:'home',
    categories:'catalog',
    search:`search/${encodeURIComponent(params.get('q')||'')}`,
    product:`product/${params.get('id')||''}`,
    cart:'cart',
    checkout:'checkout',
    login:'login',
    register:'register',
    account:'account',
    admin:'admin'
  }
  let raw=location.hash.slice(1)||routes[page]||'home';
  if(!location.hash&&page==='categories') {
    catalogFilters.category=params.get('category')||'';
    if(params.has('category'))raw+=`?category=${encodeURIComponent(params.get('category'))}`
  }
  const [path,
  ...query]=raw.split('?');
  if(path.startsWith('search/'))renderSearch(decodeURIComponent(path.slice(7)));
  else if(path.startsWith('product/')) {
    detailQty=1;
    renderProduct(path.slice(8))
  }
  else if(path==='catalog') {
    catalogFilters.category=new URLSearchParams(query.join('?')).get('category')||catalogFilters.category;
    renderCatalog()
  }
  else if(path==='cart')renderCart();
  else if(path==='checkout')renderCheckout();
  else if(path==='account')renderAccount();
  else if(path==='login')renderAuth();
  else if(path==='register')renderAuth('register');
  else if(path==='admin')renderAdmin();
  else renderHome();
  document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')===location.hash))
}
document.querySelector('#search-form').addEventListener('submit',e=> {
  e.preventDefault();
  search(document.querySelector('#search-input').value)
}
);
document.querySelector('#account-link').onclick=()=>go(currentUser?(currentUser.role==='admin'?'admin':'account'):'login');
document.querySelector('#menu-toggle').onclick=()=>document.querySelector('.main-nav').classList.toggle('open');
document.querySelectorAll('.main-nav a').forEach(a=>a.onclick=()=>document.querySelector('.main-nav').classList.remove('open'));
document.addEventListener('click',e=> {
  const link=e.target.closest('a[href^="#"]');
  if(!link||e.defaultPrevented)return;
  const route=link.getAttribute('href').slice(1);
  if(!route||document.getElementById(route))return;
  e.preventDefault();
  go(route)
}
);
window.addEventListener('hashchange',currentRoute);
document.querySelector('#newsletter-form').onsubmit=e=> {
  e.preventDefault();
  document.querySelector('#newsletter-status').textContent='Cảm ơn bạn đã đăng ký.';
  e.currentTarget.reset()
}
const ticketStyle=document.createElement('style');
ticketStyle.textContent='[hidden]{display:none!important}';
document.head.append(ticketStyle);
cartCount();
currentRoute();
