function renderAdmin() {
  if(currentUser?.role!=='admin') {
    renderAuth();
    toast('Đăng nhập bằng tài khoản quản trị để tiếp tục');
    return
  }
  const totalRevenue=orders.filter(o=>o.status==='Đã giao').reduce((s,o)=>s+o.total,0);
  app.innerHTML=`<section class="admin-shell">
  <aside class="admin-side">
  <a class="brand" href="#home">HEVENT<span style="color:#ed7553">.</span>
  </a>
  <small>WORKSPACE</small>
  <button data-admin="overview" class="${adminTab==='overview'?'active':''}">▦　Tổng quan</button>
  <button data-admin="products" class="${adminTab==='products'?'active':''}">◫　Sản phẩm</button>
  <button data-admin="categories" class="${adminTab==='categories'?'active':''}">▤　Danh mục</button>
  <button data-admin="orders" class="${adminTab==='orders'?'active':''}">⌑　Đơn hàng</button>
  <button data-admin="customers" class="${adminTab==='customers'?'active':''}">♙　Khách hàng</button>
  <button data-admin="tickets" class="${adminTab==='tickets'?'active':''}">✉　Yêu cầu hỗ trợ</button>
  </aside>
  <div class="admin-content" id="admin-content">
  </div>
  </section>`;
  document.querySelectorAll('[data-admin]').forEach(b=>b.onclick=()=> {
    adminTab=b.dataset.admin;
    renderAdmin()
  }
  );
  renderAdminTab(totalRevenue)
}
function renderAdminTab(revenue) {
  const el=document.querySelector('#admin-content');
  const heading=(title,sub,action='')=>`<div class="admin-heading">
  <div>
  <h1>${title}</h1>
  <p>${sub}</p>
  </div>${action}</div>`;
  if(adminTab==='overview') {
    el.innerHTML=heading('Tổng quan','Chào mừng trở lại. Đây là những gì đang diễn ra hôm nay.')+`<div class="admin-stats">
  <div class="admin-stat">
  <small>Sản phẩm</small>
  <strong>${products.length}</strong>
  <span>Trong danh mục</span>
  </div>
  <div class="admin-stat">
  <small>Đơn hàng</small>
  <strong>${orders.length}</strong>
  <span>${orders.filter(o=>o.status==='Chờ xác nhận').length} chờ xác nhận</span>
  </div>
  <div class="admin-stat">
  <small>Khách hàng</small>
  <strong>${users.length}</strong>
  <span>Tài khoản đã đăng ký</span>
  </div>
  <div class="admin-stat">
  <small>Doanh thu đã giao</small>
  <strong style="font-size:18px">${fmt(revenue)}</strong>
  <span>Đơn hoàn tất</span>
  </div>
  </div>
  <div class="admin-table-wrap">
  <div class="admin-toolbar">
  <strong>Đơn hàng gần đây</strong>
  <button class="table-action" data-admin="orders">Xem tất cả →</button>
  </div>${orderTable(orders.slice(0,5))}</div>`;
    el.querySelector('[data-admin=orders]').onclick=()=> {
      adminTab='orders';
      renderAdmin()
    }
    return
  }
  if(adminTab==='products') {
    el.innerHTML=heading('Sản phẩm','Thêm mới, chỉnh sửa thông tin và tình trạng tồn kho.',`<button class="button button-dark" id="add-product">＋ Thêm sản phẩm</button>`)+`<div class="admin-table-wrap">
  <div class="admin-toolbar">
  <input id="admin-search" placeholder="Tìm sản phẩm...">
  <span>${products.length} sản phẩm</span>
  </div>${productTable(products)}</div>`;
    document.querySelector('#add-product').onclick=()=>productModal();
    document.querySelector('#admin-search').oninput=e=> {
      const term=e.target.value.toLowerCase();
      document.querySelector('#admin-product-table').innerHTML=productTable(products.filter(p=>(p.name+p.brand).toLowerCase().includes(term))).replace(/^.*?<table class="admin-table" id="admin-product-table">/s,'<table class="admin-table" id="admin-product-table">').replace(/<\/table>.*$/s,'</table>');
      wireAdminProductActions()
    }
    wireAdminProductActions();
    return
  }
  if(adminTab==='categories') {
    const list=[...new Set([...categoryList,...products.map(p=>p.category)])];
    el.innerHTML=heading('Danh mục','Danh mục được tổng hợp từ các sản phẩm đang bán.',`<button class="button button-dark" id="add-category">＋ Thêm danh mục</button>`)+`<div class="admin-categories">${list.map(c=>`<div class="admin-category">
  <strong>${
      escapeHtml(c)
    }
    </strong>
  <span>${
      products.filter(p=>p.category===c).length
    }
    sản phẩm</span>
  </div>`).join('')}</div>`;
    document.querySelector('#add-category').onclick=()=>openModal('Thêm danh mục',`<form id="category-form">
  <div class="field">
  <label>Tên danh mục</label>
  <input name="name" required>
  </div>
  <div class="modal-actions">
  <button class="button button-dark">Lưu danh mục</button>
  </div>
  </form>`);
    document.querySelector('#category-form').onsubmit=e=> {
      e.preventDefault();
      const name=new FormData(e.currentTarget).get('name');
      categoryList.push(name);
      closeModal();
      renderAdmin()
    }
    return
  }
  if(adminTab==='orders') {
    el.innerHTML=heading('Đơn hàng','Tiếp nhận đơn mới và cập nhật trạng thái giao hàng.')+`<div class="admin-table-wrap">${orderTable(orders)}</div>`;
    wireOrderActions();
    return
  }
  if(adminTab==='customers') {
    el.innerHTML=heading('Khách hàng','Tài khoản khách hàng đã đăng ký.')+`<div class="admin-table-wrap">
  <table class="admin-table">
  <thead>
  <tr>
  <th>Khách hàng</th>
  <th>Email</th>
  <th>Điện thoại</th>
  <th>Ngày tham gia</th>
  <th>Vai trò</th>
  </tr>
  </thead>
  <tbody>${users.map(u=>`<tr>
  <td>${
      escapeHtml(u.name)
    }
    </td>
  <td>${
      escapeHtml(u.email)
    }
    </td>
  <td>${
      escapeHtml(u.phone||'—')
    }
    </td>
  <td>${
      u.joined?new Date(u.joined).toLocaleDateString('vi-VN'):'—'
    }
    </td>
  <td>${
      escapeHtml(u.role)
    }
    </td>
  </tr>`).join('')||'<tr><td colspan="5">Chưa có tài khoản.</td></tr>'}</tbody>
  </table>
  </div>`;
    return
  }
  if(adminTab==='tickets') {
    el.innerHTML=heading('Yêu cầu hỗ trợ','Tiếp nhận thông tin khách hàng từ trợ lý HEVENT.')+`<div class="admin-table-wrap">
  <table class="admin-table">
  <thead>
  <tr>
  <th>Mã yêu cầu</th>
  <th>Khách hàng</th>
  <th>Liên hệ</th>
  <th>Nội dung</th>
  <th>Ngày gửi</th>
  <th>Trạng thái</th>
  </tr>
  </thead>
  <tbody>${tickets.map(t=>`<tr>
  <td>${
      escapeHtml(t.id)
    }
    </td>
  <td>${
      escapeHtml(t.name)
    }
    </td>
  <td>${
      escapeHtml(t.contact)
    }
    </td>
  <td>${
      escapeHtml(t.message)
    }
    </td>
  <td>${
      new Date(t.date).toLocaleDateString('vi-VN')
    }
    </td>
  <td>
  <select class="admin-select" data-ticket="${t.id}">${
      ['Mới',
      'Đang xử lý',
      'Đã liên hệ',
      'Đã đóng'].map(s=>`<option ${s===t.status?'selected':''}>${s}</option>`).join('')
    }
    </select>
  </td>
  </tr>`).join('')||'<tr><td colspan="6">Chưa có yêu cầu hỗ trợ.</td></tr>'}</tbody>
  </table>
  </div>`;
    document.querySelectorAll('[data-ticket]').forEach(s=>s.onchange=()=> {
      tickets=tickets.map(t=>t.id===s.dataset.ticket? {
        ...t,status:s.value
      }
      :t);
      setStore('tickets',tickets)
    }
    );
    return
  }
}
function orderTable(list) {
  return `<table class="admin-table">
  <thead>
  <tr>
  <th>Mã đơn</th>
  <th>Khách hàng</th>
  <th>Ngày đặt</th>
  <th>Tổng tiền</th>
  <th>Thanh toán</th>
  <th>Trạng thái</th>
  </tr>
  </thead>
  <tbody>${list.map(o=>`<tr>
  <td>${
    escapeHtml(o.id)
  }
  </td>
  <td>${
    escapeHtml(o.customer)
  }
  </td>
  <td>${
    new Date(o.date).toLocaleDateString('vi-VN')
  }
  </td>
  <td>${
    fmt(o.total)
  }
  </td>
  <td>${
    o.payment==='bank'?'Chuyển khoản':'COD'
  }
  </td>
  <td>
  <select class="admin-select" data-order="${o.id}">${
    ['Chờ xác nhận',
    'Đang chuẩn bị',
    'Đang giao',
    'Đã giao',
    'Đã hủy'].map(s=>`<option ${s===o.status?'selected':''}>${s}</option>`).join('')
  }
  </select>
  </td>
  </tr>`).join('')||'<tr><td colspan="6">Chưa có đơn hàng.</td></tr>'}</tbody>
  </table>`
}
function wireOrderActions() {
  document.querySelectorAll('[data-order]').forEach(s=>s.onchange=()=> {
    orders=orders.map(o=>o.id===s.dataset.order? {
      ...o,status:s.value
    }
    :o);
    setStore('orders',orders);
    toast('Đã cập nhật trạng thái đơn hàng')
  }
  )
}
function productTable(list) {
  return `<table class="admin-table" id="admin-product-table">
  <thead>
  <tr>
  <th>Sản phẩm</th>
  <th>Danh mục</th>
  <th>Giá bán</th>
  <th>Tồn kho</th>
  <th>
  </th>
  </tr>
  </thead>
  <tbody>${list.map(p=>`<tr>
  <td>
  <div class="admin-product-cell">${
    imageMarkup(p)
  }
  <span>${
    escapeHtml(p.name)
  }
  </span>
  </div>
  </td>
  <td>${
    escapeHtml(p.category)
  }
  </td>
  <td>${
    fmt(p.price)
  }
  </td>
  <td>${
    p.stock
  }
  </td>
  <td>
  <button class="table-action" data-edit="${p.id}">Sửa</button>　<button class="table-action" data-delete="${p.id}">Xóa</button>
  </td>
  </tr>`).join('')||'<tr><td colspan="5">Không tìm thấy sản phẩm.</td></tr>'}</tbody>
  </table>`
}
function wireAdminProductActions() {
  document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>productModal(productById(b.dataset.edit)));
  document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=> {
    if(confirm('Xóa sản phẩm này khỏi cửa hàng?')) {
      products=products.filter(p=>p.id!==b.dataset.delete);
      setStore('products',products);
      renderAdmin()
    }
  }
  )
}
function productModal(p= {
  id:'',brand:'',name:'',category:'Laptop',price:'',oldPrice:'',cpu:'',ram:'',storage:'',screen:'',tag:'Mới',image:'',color:'Bạc',stock:0
}
) {
  openModal(p.id?'Chỉnh sửa sản phẩm':'Thêm sản phẩm',`<form id="product-form">
  <div class="form-grid">
  <div class="field">
  <label>Tên sản phẩm</label>
  <input name="name" required value="${escapeHtml(p.name)}">
  </div>
  <div class="field">
  <label>Thương hiệu</label>
  <input name="brand" required value="${escapeHtml(p.brand)}">
  </div>
  <div class="field">
  <label>Danh mục</label>
  <input name="category" required value="${escapeHtml(p.category)}">
  </div>
  <div class="field">
  <label>Giá bán (₫)</label>
  <input name="price" type="number" min="0" required value="${p.price}">
  </div>
  <div class="field">
  <label>Giá niêm yết (₫)</label>
  <input name="oldPrice" type="number" min="0" value="${p.oldPrice}">
  </div>
  <div class="field">
  <label>Tồn kho</label>
  <input name="stock" type="number" min="0" required value="${p.stock}">
  </div>
  <div class="field">
  <label>Bộ xử lý / mô tả</label>
  <input name="cpu" value="${escapeHtml(p.cpu)}">
  </div>
  <div class="field">
  <label>RAM</label>
  <input name="ram" value="${escapeHtml(p.ram)}">
  </div>
  <div class="field">
  <label>Lưu trữ</label>
  <input name="storage" value="${escapeHtml(p.storage)}">
  </div>
  <div class="field">
  <label>Màn hình</label>
  <input name="screen" value="${escapeHtml(p.screen)}">
  </div>
  <div class="field full">
  <label>URL hình ảnh</label>
  <input name="image" type="url" required value="${escapeHtml(p.image)}">
  </div>
  </div>
  <div class="modal-actions">
  <button type="button" class="button button-outline" id="modal-cancel">Hủy</button>
  <button class="button button-dark">Lưu sản phẩm</button>
  </div>
  </form>`);
  document.querySelector('#modal-cancel').onclick=closeModal;
  document.querySelector('#product-form').onsubmit=e=> {
    e.preventDefault();
    const d=Object.fromEntries(new FormData(e.currentTarget));
    for(const k of ['price','oldPrice','stock'])d[k]=Number(d[k]||0);
    if(p.id)products=products.map(x=>x.id===p.id? {
      ...x,...d
    }
    :x);
    else products.unshift( {
      id:'p-'+Date.now(),tag:'Mới',color:'Bạc',...d
    }
    );
    setStore('products',products);
    closeModal();
    renderAdmin();
    toast('Đã lưu sản phẩm')
  }
}
function openModal(title,html) {
  let back=document.querySelector('.modal-backdrop');
  if(!back) {
    back=document.createElement('div');
    back.className='modal-backdrop';
    document.body.append(back)
  }
  back.innerHTML=`<section class="modal" role="dialog" aria-modal="true">
  <div class="modal-head">
  <h2>${title}</h2>
  <button class="modal-close" aria-label="Đóng">×</button>
  </div>${html}</section>`;
  back.querySelector('.modal-close').onclick=closeModal;
  back.onclick=e=> {
    if(e.target===back)closeModal()
  }
}
function closeModal() {
  document.querySelector('.modal-backdrop')?.remove()
}
const renderAdminWithLogout=renderAdmin;
renderAdmin=function() {
  renderAdminWithLogout();
  const nav=document.querySelector('.admin-side');
  if(!nav||nav.querySelector('#admin-logout'))return;
  const button=document.createElement('button');
  button.id='admin-logout';
  button.textContent='↪　Đăng xuất';
  button.title='Đăng xuất khỏi tài khoản quản trị';
  button.onclick=()=> {
    currentUser=null;
    setStore('session',null);
    adminTab='overview';
    go('home')
  }
  nav.append(button)
}
const renderAdminTabBase=renderAdminTab;
renderAdminTab=(revenue)=> {
  renderAdminTabBase(revenue);
  if(adminTab!=='overview')return;
  const stats=document.querySelector('.admin-stats');
  if(!stats)return;
  const stock=products.reduce((sum,p)=>sum+Number(p.stock||0),0);
  const lowStock=products.filter(p=>Number(p.stock||0)<10).length;
  stats.insertAdjacentHTML('beforeend',`<div class="admin-stat">
  <small>Tồn kho</small>
  <strong>${stock}</strong>
  <span>${lowStock} sản phẩm sắp hết</span>
  </div>`)
}
