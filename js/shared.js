const initialProducts = [
  {
    id: 'air-15',
    brand: 'Apple',
    name: 'MacBook Air 15-inch M3',
    category: 'Laptop',
    price: 32990000,
    oldPrice: 35990000,
    cpu: 'Apple M3',
    ram: '16GB',
    storage: '512GB SSD',
    screen: '15.3 inch Liquid Retina',
    tag: 'Bán chạy',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=82',
    color: 'Bạc',
    stock: 18
  },
  {
    id: 'zen-14',
    brand: 'ASUS',
    name: 'Zenbook 14 OLED UX3405',
    category: 'Laptop',
    price: 27990000,
    oldPrice: 30990000,
    cpu: 'Intel Core Ultra 7',
    ram: '16GB',
    storage: '1TB SSD',
    screen: '14 inch 3K OLED',
    tag: 'Mới',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=82',
    color: 'Xanh sương',
    stock: 12
  },
  {
    id: 'think-x1',
    brand: 'Lenovo',
    name: 'ThinkPad X1 Carbon Gen 12',
    category: 'Laptop',
    price: 41990000,
    oldPrice: 44990000,
    cpu: 'Intel Core Ultra 7',
    ram: '32GB',
    storage: '1TB SSD',
    screen: '14 inch 2.8K OLED',
    tag: 'Cao cấp',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=82',
    color: 'Đen',
    stock: 7
  },
  {
    id: 'xps-13',
    brand: 'Dell',
    name: 'XPS 13 Plus 9340',
    category: 'Laptop',
    price: 36990000,
    oldPrice: 39990000,
    cpu: 'Intel Core Ultra 7',
    ram: '16GB',
    storage: '512GB SSD',
    screen: '13.4 inch OLED',
    tag: 'Ưu đãi',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=82',
    color: 'Platinum',
    stock: 9
  },
  {
    id: 'mx-keys',
    brand: 'Logitech',
    name: 'MX Keys Mini — Graphite',
    category: 'Bàn phím',
    price: 2290000,
    oldPrice: 2690000,
    cpu: 'Bluetooth',
    ram: 'Đa thiết bị',
    storage: 'Pin 10 ngày',
    screen: 'Layout nhỏ gọn',
    tag: 'Được yêu thích',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=82',
    color: 'Graphite',
    stock: 34
  },
  {
    id: 'mx-master',
    brand: 'Logitech',
    name: 'MX Master 3S Wireless',
    category: 'Chuột',
    price: 2490000,
    oldPrice: 2890000,
    cpu: '8000 DPI',
    ram: 'Bluetooth',
    storage: 'Pin 70 ngày',
    screen: 'Quiet Clicks',
    tag: 'Bán chạy',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=82',
    color: 'Đen',
    stock: 27
  },
  {
    id: 'studio-display',
    brand: 'HEVENT',
    name: 'Studio Display 27-inch 4K',
    category: 'Màn hình',
    price: 11990000,
    oldPrice: 13990000,
    cpu: '4K UHD',
    ram: 'IPS 100Hz',
    storage: 'USB-C 90W',
    screen: '27 inch',
    tag: 'Lựa chọn mới',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=82',
    color: 'Silver',
    stock: 11
  },
  {
    id: 'soundcore',
    brand: 'Soundcore',
    name: 'Space One Pro Headphones',
    category: 'Âm thanh',
    price: 3990000,
    oldPrice: 4590000,
    cpu: 'Adaptive ANC',
    ram: 'Bluetooth 5.3',
    storage: 'Pin 60 giờ',
    screen: 'Hi-Res Audio',
    tag: 'Mới',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=82',
    color: 'Kem',
    stock: 22
  }
];

const getStore = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(`hevent-${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
};

const setStore = (key, value) => {
  localStorage.setItem(`hevent-${key}`, JSON.stringify(value));
};

const demoUsers = [
  {
    name: 'Nguyễn Minh Anh',
    email: 'minhanh@example.com',
    phone: '0901234567',
    role: 'customer',
    joined: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    name: 'Trần Gia Huy',
    email: 'giahuy@example.com',
    phone: '0912345678',
    role: 'customer',
    joined: new Date(Date.now() - 86400000 * 28).toISOString()
  },
  {
    name: 'Lê Khánh Linh',
    email: 'khanhlinh@example.com',
    phone: '0987654321',
    role: 'customer',
    joined: new Date(Date.now() - 86400000 * 12).toISOString()
  }
];

const demoOrders = [
  {
    id: 'HV-DEMO-1001',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [{ id: 'air-15', qty: 1 }],
    total: 32990000,
    customer: 'Nguyễn Minh Anh',
    email: 'minhanh@example.com',
    phone: '0901234567',
    address: 'TP. Hồ Chí Minh',
    payment: 'bank',
    status: 'Đã giao',
    userEmail: 'minhanh@example.com',
    demo: true
  },
  {
    id: 'HV-DEMO-1002',
    date: new Date(Date.now() - 86400000).toISOString(),
    items: [{ id: 'zen-14', qty: 1 }],
    total: 27990000,
    customer: 'Trần Gia Huy',
    email: 'giahuy@example.com',
    phone: '0912345678',
    address: 'Hà Nội',
    payment: 'cod',
    status: 'Đang giao',
    userEmail: 'giahuy@example.com',
    demo: true
  },
  {
    id: 'HV-DEMO-1003',
    date: new Date().toISOString(),
    items: [
      { id: 'mx-keys', qty: 1 },
      { id: 'mx-master', qty: 1 }
    ],
    total: 4780000,
    customer: 'Lê Khánh Linh',
    email: 'khanhlinh@example.com',
    phone: '0987654321',
    address: 'Đà Nẵng',
    payment: 'cod',
    status: 'Chờ xác nhận',
    userEmail: 'khanhlinh@example.com',
    demo: true
  }
];

let products = getStore('products', initialProducts);
let cart = getStore('cart', []);
let orders = getStore('orders', demoOrders);
let users = getStore('users', demoUsers);
let tickets = getStore('tickets', []);
let currentUser = getStore('session', null);
let compareIds = [];
let detailQty = 1;
let catalogFilters = {
  category: new URLSearchParams(location.hash.split('?')[1] || '').get('category') || '',
  brand: '',
  maxPrice: 50000000,
  sort: 'featured'
};
let adminTab = 'overview';
let accountTab = 'profile';
let chatHistory = [];

const app = document.querySelector('#app');
const fmt = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
const safeUrl = (value) => (/^https:\/\//.test(value) ? value : '');
const productById = (id) => products.find((product) => product.id === id);
const categoryList = getStore('categories', ['Laptop', 'Bàn phím', 'Chuột', 'Màn hình', 'Âm thanh']);

function pageUrl(path) {
  const [route, ...parts] = path.split('?');
  const query = parts.join('?');

  if (route.startsWith('search/')) {
    return `search.html?q=${encodeURIComponent(decodeURIComponent(route.slice(7)))}`;
  }
  if (route.startsWith('product/')) {
    return `product.html?id=${encodeURIComponent(route.slice(8))}`;
  }

  const pages = {
    home: 'index.html',
    catalog: 'categories.html',
    cart: 'cart.html',
    checkout: 'checkout.html',
    login: 'login.html',
    register: 'register.html',
    account: 'account.html',
    admin: 'admin.html'
  };

  return `${pages[route] || 'index.html'}${query ? `?${query}` : ''}`;
}

function go(path) {
  location.href = pageUrl(path);
}

function toast(message) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('show'), 2400);
}

function cartCount() {
  document.querySelector('#cart-count').textContent = cart.reduce((count, item) => count + item.qty, 0);
}

function addToCart(id, quantity = 1) {
  const product = productById(id);
  if (!product) return;

  const line = cart.find((item) => item.id === id);
  if (line) line.qty += quantity;
  else cart.push({ id, qty: quantity });

  setStore('cart', cart);
  cartCount();
  toast('Đã thêm sản phẩm vào giỏ hàng');
}

function imageMarkup(product, className = '') {
  return `<img class="${className}" src="${safeUrl(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'">`;
}

function card(product) {
  return `
    <article class="product-card" data-id="${escapeHtml(product.id)}">
      <div class="product-visual" data-product="${escapeHtml(product.id)}">
        ${imageMarkup(product)}
        <span class="product-tag">${escapeHtml(product.tag || 'HEVENT')}</span>
        <button class="product-fav" data-fav="${escapeHtml(product.id)}" aria-label="Lưu sản phẩm">♡</button>
      </div>
      <div class="product-info">
        <span class="product-brand">${escapeHtml(product.brand)} · ${escapeHtml(product.category)}</span>
        <h3 data-product="${escapeHtml(product.id)}">${escapeHtml(product.name)}</h3>
        <div class="product-meta">${escapeHtml(product.cpu)} · ${escapeHtml(product.ram)} · ${escapeHtml(product.storage)}</div>
        <div class="product-bottom">
          <div>
            <div class="product-price">${fmt(product.price)}</div>
            <div class="product-old">${fmt(product.oldPrice || product.price)}</div>
          </div>
          <button class="add-small" data-add="${escapeHtml(product.id)}" aria-label="Thêm ${escapeHtml(product.name)} vào giỏ">+</button>
        </div>
        <label class="product-compare">
          <input type="checkbox" data-compare="${escapeHtml(product.id)}" ${compareIds.includes(product.id) ? 'checked' : ''}>
          So sánh
        </label>
      </div>
    </article>`;
}

function sectionTitle(kicker, title, copy = '', link = '') {
  return `
    <div class="section-heading">
      <div>
        <div class="eyebrow">${kicker}</div>
        <h2>${title}</h2>
        ${copy ? `<p>${copy}</p>` : ''}
      </div>
      ${link ? `<a class="text-link" href="#catalog">${link} <span>↗</span>
  </a>` : ''}
    </div>`;
}
