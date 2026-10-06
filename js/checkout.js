function renderCheckout() {
  if(!cart.length) {
    renderCart();
    return
  }
  app.innerHTML=`<section class="page-shell">
  <div class="page-heading">
  <div class="eyebrow">Hoàn tất đơn hàng</div>
  <h1>Đặt hàng</h1>
  <p>Chỉ còn một bước để thiết bị mới đồng hành cùng bạn.</p>
  </div>
  <form id="checkout-form" class="checkout-layout">
  <div>
  <section class="form-section">
  <h2>Thông tin nhận hàng</h2>
  <div class="form-grid">
  <div class="field">
  <label>Họ và tên</label>
  <input name="name" required value="${escapeHtml(currentUser?.name||'')}">
  </div>
  <div class="field">
  <label>Số điện thoại</label>
  <input name="phone" type="tel" required pattern="[0-9+() -]{9,15}">
  </div>
  <div class="field">
  <label>Email</label>
  <input name="email" type="email" required value="${escapeHtml(currentUser?.email||'')}">
  </div>
  <div class="field">
  <label>Tỉnh / thành phố</label>
  <input name="city" required>
  </div>
  <div class="field full">
  <label>Địa chỉ giao hàng</label>
  <input name="address" required placeholder="Số nhà, tên đường, phường / xã">
  </div>
  <div class="field full">
  <label>Ghi chú đơn hàng</label>
  <textarea name="note" rows="3" placeholder="Thời gian nhận hàng thuận tiện...">
  </textarea>
  </div>
  </div>
  </section>
  <section class="form-section">
  <h2>Phương thức thanh toán</h2>
  <label class="payment-option">
  <input type="radio" name="payment" value="cod" checked> Thanh toán khi nhận hàng</label>
  <label class="payment-option">
  <input type="radio" name="payment" value="bank"> Chuyển khoản ngân hàng</label>
  </section>
  </div>
  <aside class="summary-box">
  <h2>Đơn hàng của bạn</h2>${cart.map(x=>`<div class="summary-line">
  <span>${
    escapeHtml(productById(x.id)?.name||'Sản phẩm')
  }
  × ${
    x.qty
  }
  </span>
  <span>${
    fmt((productById(x.id)?.price||0)*x.qty)
  }
  </span>
  </div>`).join('')}<div class="summary-line">
  <span>Giao hàng</span>
  <span>${subtotal()>=5000000?'Miễn phí':fmt(30000)}</span>
  </div>
  <div class="summary-line total">
  <span>Tổng cộng</span>
  <span>${fmt(subtotal()+(subtotal()>=5000000?0:30000))}</span>
  </div>
  <button class="button button-dark" type="submit">Xác nhận đặt hàng · ${fmt(subtotal()+(subtotal()>=5000000?0:30000))}</button>
  <small>Bằng việc đặt hàng, bạn đồng ý với điều khoản mua hàng của HEVENT.</small>
  </aside>
  </form>
  </section>`;
  document.querySelector('#checkout-form').onsubmit=e=> {
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    const order= {
      id:'HV-'+Date.now().toString().slice(-7),
      date:new Date().toISOString(),
      items:cart.map(x=>( {
        ...x
      }
      )),
      total:subtotal()+(subtotal()>=5000000?0:30000),
      customer:data.name,
      email:data.email,
      phone:data.phone,
      address:[data.address,
      data.city].join(', '),
      payment:data.payment,
      status:'Chờ xác nhận',
      userEmail:currentUser?.email||data.email
    }
    orders.unshift(order);
    setStore('orders',orders);
    cart=[];
    setStore('cart',cart);
    cartCount();
    renderSuccess(order)
  }
}
function renderSuccess(order) {
  app.innerHTML=`<section class="page-shell">
  <div class="empty-state">
  <div class="empty-mark">✓</div>
  <div class="eyebrow" style="justify-content:center">HEVENT · Đơn hàng đã tiếp nhận</div>
  <h2>Cảm ơn bạn, ${escapeHtml(order.customer)}.</h2>
  <p>Mã đơn hàng <strong>${escapeHtml(order.id)}</strong> · Tổng thanh toán <strong>${fmt(order.total)}</strong>
  <br>Chúng tôi sẽ liên hệ xác nhận đơn trong thời gian sớm nhất.</p>
  <a class="button button-dark" href="#account">Theo dõi đơn hàng</a>
  </div>
  </section>`
}
