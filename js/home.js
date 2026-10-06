function renderHome() {
  app.innerHTML=`<section class="hero">
  <div class="hero-grid">
  <div class="hero-copy">
  <div class="eyebrow">Bộ sưu tập 2026 · 01</div>
  <h1>Everyday,<br>
  <em>reimagined.</em>
  </h1>
  <p>Những công cụ tốt giúp ý tưởng đi xa hơn. Khám phá công nghệ được tuyển chọn cho cách bạn làm việc và sống.</p>
  <a class="button button-dark" href="#catalog">Khám phá bộ sưu tập <span>↗</span>
  </a>
  <div class="hero-index">
  <b>01</b> &nbsp;/&nbsp; 04 &nbsp; &nbsp; Công nghệ, theo cách của bạn</div>
  </div>
  <div class="hero-photo">
  <div class="hero-note">
  <span>Được chọn cho nhịp sống mới</span>
  <strong>MacBook Air M3</strong>
  </div>
  </div>
  </div>
  </section>
  <div class="perks">
  <div class="perk">
  <span class="perk-symbol">↗</span>
  <div>
  <strong>Giao hàng tận nơi</strong>
  <small>Miễn phí đơn từ 5 triệu</small>
  </div>
  </div>
  <div class="perk">
  <span class="perk-symbol">◇</span>
  <div>
  <strong>Chính hãng tuyển chọn</strong>
  <small>Bảo hành minh bạch</small>
  </div>
  </div>
  <div class="perk">
  <span class="perk-symbol">◷</span>
  <div>
  <strong>Đổi mới trong 30 ngày</strong>
  <small>Đơn giản, an tâm</small>
  </div>
  </div>
  <div class="perk">
  <span class="perk-symbol">✳</span>
  <div>
  <strong>Tư vấn cùng HEVENT AI</strong>
  <small>Chọn đúng từ lần đầu</small>
  </div>
  </div>
  </div>
  <section class="section">${sectionTitle('Tìm theo phong cách','Một góc làm việc. Một thế giới mới.','Từ thiết bị chủ lực đến những chi tiết tạo nên khác biệt.')}<div class="category-rail">${[['Laptop','L','Hiệu năng linh hoạt'],['Bàn phím','K','Chạm vào cảm hứng'],['Chuột','M','Chuyển động chính xác'],['Màn hình','D','Mở rộng góc nhìn'],['Âm thanh','A','Đắm chìm trong từng nhịp']].map(([name,mark,sub])=>`<a class="category-tile" data-mark="${mark}" href="#catalog?category=${encodeURIComponent(name)}">
  <span>${
    name
  }
  <small>${
    sub
  }
  </small>
  </span>
  </a>`).join('')}</div>
  </section>
  <section class="section products-section">${sectionTitle('Được HEVENT tuyển chọn','Những lựa chọn nổi bật','Sản phẩm tốt, trải nghiệm trọn vẹn.','Xem tất cả')}<div class="product-toolbar">
  <button class="chip active" data-home-filter="all">Tất cả</button>
  <button class="chip" data-home-filter="Laptop">Laptop</button>
  <button class="chip" data-home-filter="Phụ kiện">Phụ kiện</button>
  <button class="chip" id="compare-open">So sánh <span id="compare-count">0</span>
  </button>
  </div>
  <div class="product-grid" id="home-products">
  </div>
  </section>
  <section class="editorial-band">
  <div class="editorial-image">
  </div>
  <div class="editorial-copy">
  <div class="eyebrow">Thiết kế dành cho tập trung</div>
  <h2>Less noise.<br>More making.</h2>
  <p>Một chiếc laptop phù hợp không chỉ mạnh mẽ. Nó nên hòa vào nhịp làm việc, để bạn dành sự chú ý cho điều quan trọng nhất.</p>
  <a class="button button-dark" href="#catalog?category=Laptop">Tìm chiếc máy của bạn <span>↗</span>
  </a>
  </div>
  </section>
  <section class="quote-band">
  <p>“Thiết bị phù hợp nhất là thiết bị khiến mọi thứ bạn muốn làm trở nên tự nhiên hơn.”</p>
  <span>HEVENT · Gợi ý từ đội ngũ tuyển chọn</span>
  </section>`;
  renderHomeProducts('all');
  wireCards()
}
function renderHomeProducts(filter) {
  const list=filter==='all'?products.slice(0,4):products.filter(p=>p.category===filter||filter==='Phụ kiện'&&!['Laptop'].includes(p.category)).slice(0,4);
  document.querySelector('#home-products').innerHTML=list.map(card).join('');
  document.querySelectorAll('[data-home-filter]').forEach(b=> {
    b.classList.toggle('active',b.dataset.homeFilter===filter);
    b.onclick=()=>renderHomeProducts(b.dataset.homeFilter)
  }
  );
  wireCards();
  wireCompare()
}
