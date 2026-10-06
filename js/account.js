function renderAccount() {
  if(!currentUser) {
    renderAuth();
    return
  }
  if(currentUser.role==='admin') {
    app.innerHTML=`<section class="page-shell">
  <div class="empty-state">
  <h2>Tài khoản quản trị</h2>
  <p>Chuyển đến bảng quản trị để quản lý sản phẩm và đơn hàng.</p>
  <a class="button button-dark" href="#admin">Mở quản trị →</a>
  </div>
  </section>`;
    return
  }
  const myOrders=orders.filter(o=>o.userEmail===currentUser.email);
  app.innerHTML=`<section class="page-shell">
  <div class="page-heading">
  <div class="eyebrow">Không gian của bạn</div>
  <h1>Xin chào, ${escapeHtml(currentUser.name?.split(' ')[0]||'bạn')}</h1>
  <p>Quản lý đơn hàng và thông tin cá nhân tại đây.</p>
  </div>
  <div class="account-layout">
  <aside class="account-nav">
  <button class="${accountTab==='profile'?'active':''}" data-account="profile">Thông tin cá nhân</button>
  <button class="${accountTab==='orders'?'active':''}" data-account="orders">Đơn hàng của tôi (${myOrders.length})</button>
  <button id="logout">Đăng xuất</button>
  </aside>
  <section class="account-panel" id="account-panel">
  </section>
  </div>
  </section>`;
  const panel=document.querySelector('#account-panel');
  if(accountTab==='profile')panel.innerHTML=`<h2>Thông tin cá nhân</h2>
  <p>Cập nhật cách HEVENT liên hệ với bạn.</p>
  <form id="profile-form" class="form-grid">
  <div class="field">
  <label>Họ và tên</label>
  <input name="name" required value="${escapeHtml(currentUser.name)}">
  </div>
  <div class="field">
  <label>Email</label>
  <input value="${escapeHtml(currentUser.email)}" disabled>
  </div>
  <div class="field">
  <label>Số điện thoại</label>
  <input name="phone" value="${escapeHtml(currentUser.phone||'')}">
  </div>
  <div class="field full">
  <button class="button button-dark">Lưu thay đổi</button>
  </div>
  </form>`;
  else panel.innerHTML=`<h2>Đơn hàng của tôi</h2>
  <p>Theo dõi trạng thái những đơn hàng gần đây.</p>${myOrders.length?`<div style="overflow:auto">
  <table class="account-orders">
  <thead>
  <tr>
  <th>Mã đơn</th>
  <th>Ngày đặt</th>
  <th>Tổng cộng</th>
  <th>Trạng thái</th>
  </tr>
  </thead>
  <tbody>${
    myOrders.map(o=>`<tr>
  <td>${escapeHtml(o.id)}</td>
  <td>${new Date(o.date).toLocaleDateString('vi-VN')}</td>
  <td>${fmt(o.total)}</td>
  <td>
  <span class="status">${escapeHtml(o.status)}</span>
  </td>
  </tr>`).join('')
  }
  </tbody>
  </table>
  </div>`:`<div class="empty-state">
  <p>Bạn chưa có đơn hàng nào.</p>
  <a href="#catalog" class="text-link">Khám phá sản phẩm ↗</a>
  </div>`}`;
  document.querySelectorAll('[data-account]').forEach(b=>b.onclick=()=> {
    accountTab=b.dataset.account;
    renderAccount()
  }
  );
  document.querySelector('#logout').onclick=()=> {
    currentUser=null;
    setStore('session',null);
    go('home')
  }
  document.querySelector('#profile-form')?.addEventListener('submit',e=> {
    e.preventDefault();
    const d=Object.fromEntries(new FormData(e.currentTarget));
    users=users.map(u=>u.email===currentUser.email? {
      ...u,...d
    }
    :u);
    currentUser= {
      ...currentUser,...d
    }
    setStore('users',users);
    setStore('session',currentUser);
    toast('Đã cập nhật thông tin')
  }
  )
}
