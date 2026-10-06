function renderAuth(mode='login') {
  app.innerHTML=`<section class="page-shell">
  <div class="auth-wrap">
  <div class="eyebrow">Tài khoản HEVENT</div>
  <div class="auth-tabs">
  <button data-auth="login" class="${mode==='login'?'active':''}">Đăng nhập</button>
  <button data-auth="register" class="${mode==='register'?'active':''}">Tạo tài khoản</button>
  </div>
  <h1>${mode==='login'?'Chào mừng bạn trở lại':'Bắt đầu hành trình mới'}</h1>
  <p>${mode==='login'?'Đăng nhập để xem đơn hàng và lưu lựa chọn.':'Tạo tài khoản để trải nghiệm mua sắm liền mạch.'}</p>
  <form id="auth-form">${mode==='register'?`<div class="field">
  <label>Họ và tên</label>
  <input name="name" required>
  </div>`:''}<div class="field">
  <label>Email</label>
  <input name="email" type="email" required autocomplete="email">
  </div>
  <div class="field">
  <label>Mật khẩu</label>
  <input name="password" type="password" required minlength="6" autocomplete="${mode==='login'?'current-password':'new-password'}">
  </div>${mode==='register'?`<div class="field">
  <label>Số điện thoại</label>
  <input name="phone" type="tel">
  </div>`:''}<button class="button button-dark" type="submit">${mode==='login'?'Đăng nhập':'Tạo tài khoản'} <span>→</span>
  </button>
  </form>
  <div class="auth-switch">${mode==='login'?'Chưa có tài khoản?':'Đã có tài khoản?'} <button data-auth="${mode==='login'?'register':'login'}">${mode==='login'?'Đăng ký ngay':'Đăng nhập'}</button>
  </div>
  </div>
  </section>`;
  document.querySelectorAll('[data-auth]').forEach(b=>b.onclick=()=>renderAuth(b.dataset.auth));
  document.querySelector('#auth-form').onsubmit=e=> {
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    const email=data.email.toLowerCase();
    if(mode==='register') {
      if(users.some(u=>u.email===email)) {
        toast('Email này đã được đăng ký');
        return
      }
      users.push( {
        name:data.name,email,password:data.password,phone:data.phone,role:'customer',joined:new Date().toISOString()
      }
      );
      setStore('users',users)
    }
    else {
      const found=users.find(u=>u.email===email&&u.password===data.password);
      if(found) {
        currentUser= {
          ...found,
          password:undefined
        }
        setStore('session',currentUser);
        go('account');
        return
      }
      if(email==='admin@hevent.vn'&&data.password==='hevent2026') {
        currentUser= {
          name:'HEVENT Admin',
          email,
          role:'admin'
        }
        setStore('session',currentUser);
        go('admin');
        return
      }
      toast('Email hoặc mật khẩu chưa chính xác');
      return
    }
    const found=users.find(u=>u.email===email);
    currentUser= {
      ...found,
      password:undefined
    }
    setStore('session',currentUser);
    go('account')
  }
}
