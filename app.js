const heventModules = [
  'js/shared.js',
  'js/home.js',
  'js/catalog.js',
  'js/product.js',
  'js/cart.js',
  'js/checkout.js',
  'js/auth.js',
  'js/account.js',
  'js/admin.js',
  'js/chat.js',
  'js/app.js'
];
function loadHeventModule(index) {
  if (index >= heventModules.length) return;
  const script = document.createElement('script');
  script.src = heventModules[index];
  script.onload = () => loadHeventModule(index + 1);
  script.onerror = () => console.error(`Could not load ${heventModules[index]}`);
  document.body.append(script);
}
loadHeventModule(0);
