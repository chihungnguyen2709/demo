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
  const hashRoute=location.hash.slice(1);
  let raw=page==='index'?(hashRoute||routes[page]):(routes[page]||hashRoute)||'home';
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
const searchForm=document.querySelector('#search-form');
const searchInput=document.querySelector('#search-input');
const searchToggle=document.querySelector('#search-toggle');
function setMobileSearch(open) {
  if(!searchForm||!searchToggle)return;
  searchForm.classList.toggle('search-open',open);
  searchForm.closest('.site-header').classList.toggle('search-active',open);
  searchToggle.setAttribute('aria-expanded',String(open));
  searchToggle.setAttribute('aria-label',open?'Đóng tìm kiếm':'Mở tìm kiếm');
  searchToggle.title=open?'Đóng tìm kiếm':'Mở tìm kiếm';
  if(open)searchInput.focus();
  else searchInput.blur()
}
searchToggle?.addEventListener('click',()=> {
  if(innerWidth<=700)setMobileSearch(!searchForm.classList.contains('search-open'))
});
searchForm?.addEventListener('submit',e=> {
  e.preventDefault();
  const query=searchInput?.value||'';
  if(innerWidth<=700)setMobileSearch(false);
  search(query)
});
searchInput?.addEventListener('keydown',e=> {
  if(e.key==='Escape'&&searchForm?.classList.contains('search-open'))setMobileSearch(false)
});
document.addEventListener('click',e=> {
  if(innerWidth<=700&&searchForm?.classList.contains('search-open')&&!searchForm.contains(e.target))setMobileSearch(false)
});
window.addEventListener('resize',()=> {
  if(innerWidth>700&&searchForm?.classList.contains('search-open'))setMobileSearch(false)
});
document.querySelector('#account-link').onclick=()=>go(currentUser?(currentUser.role==='admin'?'admin':'account'):'login');
document.querySelector('#menu-toggle').onclick=()=>document.querySelector('.main-nav').classList.toggle('open');
document.querySelectorAll('.main-nav a').forEach(a=>a.onclick=()=>document.querySelector('.main-nav').classList.remove('open'));
const themeToggle=document.querySelector('#theme-toggle');
let themeTransitionTimer;
function applyTheme(theme,animate=false) {
  const root=document.documentElement;
  if(animate) {
    root.classList.add('theme-transitioning');
    clearTimeout(themeTransitionTimer)
  }
  root.dataset.theme=theme;
  try {
    localStorage.setItem('hevent-theme',theme);
  } catch (error) {
    // The selected theme still applies for this page when storage is unavailable.
  }
  const dark=theme==='dark';
  themeToggle.setAttribute('aria-label',dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối');
  themeToggle.title=dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#24212a':'#fbf9fc');
  if(animate)themeTransitionTimer=setTimeout(()=>root.classList.remove('theme-transitioning'),420)
}
themeToggle.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
applyTheme(document.documentElement.dataset.theme==='dark'?'dark':'light');
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
