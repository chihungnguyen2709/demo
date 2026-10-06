function subtotal() {
  return cart.reduce((sum,line)=>sum+(productById(line.id)?.price||0)*line.qty,0)
}
function changeQty(id,amount) {
  const line=cart.find(x=>x.id===id);
  if(!line)return;
  line.qty+=amount;
  if(line.qty<1)cart=cart.filter(x=>x.id!==id);
  setStore('cart',cart);
  cartCount();
  renderCart()
}
function renderCart() {
  if(!cart.length) {
    app.innerHTML=`<section class="page-shell">
  <div class="page-heading">
  <div class="eyebrow">Giỏ hàng</div>
  <h1>Giỏ hàng của bạn</h1>
  </div>
  <div class="empty-state">
  <div class="empty-mark">⌑</div>
  <h2>Đang chờ món đồ yêu thích của bạn</h2>
  <p>Khám phá bộ sưu tập công nghệ được HEVENT tuyển chọn.</p>
  <a class="button button-dark" href="#catalog">Tiếp tục mua sắm ↗</a>
  </div>
  </section>`;
    return
  }
  app.innerHTML=`<section class="page-shell">
  <div class="page-heading">
  <div class="eyebrow">Giỏ hàng</div>
  <h1>Những lựa chọn của bạn</h1>
  <p>${cart.reduce((n,x)=>n+x.qty,0)} sản phẩm đang ở đây.</p>
  </div>
  <div class="cart-layout">
  <div class="cart-list">${cart.map(line=>{const p=productById(line.id);if(!p)return'';return `<div class="cart-row">
  <a href="#product/${p.id}">${
    imageMarkup(p)
  }
  </a>
  <div>
  <h3>
  <a href="#product/${p.id}">${
    escapeHtml(p.name)
  }
  </a>
  </h3>
  <p>${
    escapeHtml(p.color||p.category)
  }
  · Còn ${
    p.stock
  }
  sản phẩm</p>
  <div class="qty-control">
  <button data-qty="${p.id}" data-delta="-1">−</button>
  <span>${
    line.qty
  }
  </span>
  <button data-qty="${p.id}" data-delta="1">+</button>
  </div>
  </div>
  <strong class="row-price">${
    fmt(p.price*line.qty)
  }
  </strong>
  <button class="remove-line" data-remove="${p.id}" aria-label="Xóa sản phẩm">×</button>
  </div>`}).join('')}</div>
  <aside class="summary-box">
  <h2>Tóm tắt đơn hàng</h2>
  <div class="summary-line">
  <span>Tạm tính</span>
  <span>${fmt(subtotal())}</span>
  </div>
  <div class="summary-line">
  <span>Giao hàng</span>
  <span>${subtotal()>=5000000?'Miễn phí':fmt(30000)}</span>
  </div>
  <div class="summary-line total">
  <span>Tổng cộng</span>
  <span>${fmt(subtotal()+(subtotal()>=5000000?0:30000))}</span>
  </div>
  <a class="button button-dark" href="#checkout">Tiến hành đặt hàng →</a>
  <small>Thuế được tính trong giá bán. Đơn hàng được xác nhận sau khi tiếp nhận.</small>
  </aside>
  </div>
  </section>`;
  document.querySelectorAll('[data-qty]').forEach(b=>b.onclick=()=>changeQty(b.dataset.qty,+b.dataset.delta));
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=> {
    cart=cart.filter(x=>x.id!==b.dataset.remove);
    setStore('cart',cart);
    cartCount();
    renderCart()
  }
  )
}
