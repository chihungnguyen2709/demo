function renderProduct(id) {
  const p=productById(id)||products[0];
  if(!p) {
    go('catalog');
    return
  }
  app.innerHTML=`<div class="breadcrumb">
  <a href="#home">Trang chủ</a>　/　<a href="#catalog?category=${encodeURIComponent(p.category)}">${escapeHtml(p.category)}</a>　/　${escapeHtml(p.name)}</div>
  <section class="product-detail">
  <div>
  <div class="detail-photo">${imageMarkup(p)}</div>
  <div class="detail-thumb-row">
  <button class="detail-thumb selected">${imageMarkup(p)}</button>
  <button class="detail-thumb">${imageMarkup({...p,image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=75'})}</button>
  <button class="detail-thumb">${imageMarkup({...p,image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=75'})}</button>
  </div>
  </div>
  <div class="detail-copy">
  <span class="product-brand">${escapeHtml(p.brand)} · ${escapeHtml(p.category)}</span>
  <h1>${escapeHtml(p.name)}</h1>
  <div class="detail-rating">
  <b>★★★★★</b>　4.9 · 128 đánh giá</div>
  <div class="detail-price">${fmt(p.price)}</div>
  <div class="detail-old">${fmt(p.oldPrice||p.price)}</div>
  <p class="detail-note">Trả góp 0% · Giao hàng miễn phí · Hàng chính hãng</p>
  <h3>Màu sắc</h3>
  <div class="color-options">
  <button class="color-dot active">${escapeHtml(p.color||'Bạc')}</button>
  <button class="color-dot">Đen</button>
  <button class="color-dot">Bạc</button>
  </div>
  <div class="detail-actions">
  <div class="qty-control">
  <button id="qty-minus">−</button>
  <span id="detail-qty">1</span>
  <button id="qty-plus">+</button>
  </div>
  <button class="button button-dark" id="detail-add">Thêm vào giỏ · ${fmt(p.price)}</button>
  <button class="button button-outline" id="detail-buy">Mua ngay ↗</button>
  </div>
  <div class="spec-list">
  <div class="spec-row">
  <span>Bộ xử lý</span>
  <strong>${escapeHtml(p.cpu)}</strong>
  </div>
  <div class="spec-row">
  <span>Bộ nhớ</span>
  <strong>${escapeHtml(p.ram)}</strong>
  </div>
  <div class="spec-row">
  <span>Lưu trữ</span>
  <strong>${escapeHtml(p.storage)}</strong>
  </div>
  <div class="spec-row">
  <span>Màn hình</span>
  <strong>${escapeHtml(p.screen)}</strong>
  </div>
  </div>
  <div class="benefit-list">
  <span>
  <b>✓</b> Bảo hành chính hãng</span>
  <span>
  <b>✓</b> Hỗ trợ tận tâm</span>
  <span>
  <b>✓</b> Đổi mới trong 30 ngày</span>
  <span>
  <b>✓</b> Kiểm tra trước khi nhận</span>
  </div>
  </div>
  </section>
  <section class="section">${sectionTitle('Kết hợp cùng','Hoàn thiện góc làm việc')}</section>
  <div class="section product-grid">${products.filter(x=>x.id!==p.id).slice(0,4).map(card).join('')}</div>`;
  document.querySelector('#qty-minus').onclick=()=> {
    detailQty=Math.max(1,detailQty-1);
    document.querySelector('#detail-qty').textContent=detailQty
  }
  document.querySelector('#qty-plus').onclick=()=> {
    detailQty++;
    document.querySelector('#detail-qty').textContent=detailQty
  }
  document.querySelector('#detail-add').onclick=()=>addToCart(p.id,detailQty);
  document.querySelector('#detail-buy').onclick=()=> {
    addToCart(p.id,detailQty);
    go('checkout')
  }
  document.querySelectorAll('.color-dot').forEach(b=>b.onclick=()=> {
    document.querySelectorAll('.color-dot').forEach(x=>x.classList.remove('active'));
    b.classList.add('active')
  }
  );
  document.querySelectorAll('.detail-thumb').forEach(b=>b.onclick=()=> {
    document.querySelectorAll('.detail-thumb').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    document.querySelector('.detail-photo img').src=b.querySelector('img').src
  }
  );
  wireCards();
  wireCompare()
}
function wireCards() {
  document.querySelectorAll('[data-product]').forEach(el=>el.onclick=()=>go('product/'+el.dataset.product));
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=e=> {
    e.stopPropagation();
    addToCart(b.dataset.add)
  }
  );
  document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=> {
    e.stopPropagation();
    b.textContent=b.textContent==='♡'?'♥':'♡';
    toast(b.textContent==='♥'?'Đã lưu vào danh sách yêu thích':'Đã bỏ khỏi yêu thích')
  }
  )
}
function wireCompare() {
  document.querySelectorAll('[data-compare]').forEach(input=>input.onchange=()=> {
    if(input.checked&&!compareIds.includes(input.dataset.compare)) {
      if(compareIds.length>=2) {
        input.checked=false;
        toast('Mỗi lần có thể so sánh tối đa 2 sản phẩm');
        return
      }
      compareIds.push(input.dataset.compare)
    }
    else compareIds=compareIds.filter(id=>id!==input.dataset.compare);
    const c=document.querySelector('#compare-count');
    if(c)c.textContent=compareIds.length;
    if(compareIds.length===2)openCompare()
  }
  );
  document.querySelector('#compare-open')?.addEventListener('click',openCompare)
}
function openCompare() {
  const list=compareIds.map(productById).filter(Boolean);
  if(list.length<2) {
    toast('Chọn 2 sản phẩm để bắt đầu so sánh');
    return
  }
  openModal('So sánh cấu hình',`<div class="compare-grid">${list.map(p=>`<div class="compare-product">${
    imageMarkup(p)
  }
  <h3>${
    escapeHtml(p.name)
  }
  </h3>
  <strong>${
    fmt(p.price)
  }
  </strong>
  </div>`).join('')}</div>${[['Bộ xử lý',p=>p.cpu],['RAM',p=>p.ram],['Lưu trữ',p=>p.storage],['Màn hình',p=>p.screen],['Danh mục',p=>p.category]].map(([label,value])=>`<div class="compare-row">
  <span>${
    label
  }
  </span>
  <strong>${
    list.map(value).map(escapeHtml).join('　 /　 ')
  }
  </strong>
  </div>`).join('')}<div class="modal-actions">
  <button class="button button-dark" onclick="document.querySelector('.modal-backdrop').remove()">Hoàn tất</button>
  </div>`)
}
