let homeHeroTimer = null;

function renderHome() {
  const featuredIds = ['air-15', 'zen-14', 'think-x1', 'xps-13', 'mx-keys', 'studio-display', 'soundcore'];
  const heroSlides = featuredIds.map(productById).filter(Boolean).slice(0, 7);
  const firstHeroProduct = heroSlides[0] || products[0] || initialProducts[0];
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
  <div class="hero-dots" role="group" aria-label="Chọn quảng cáo sản phẩm">${heroSlides.map((product, index) => `<button type="button" class="${index === 0 ? 'active' : ''}" data-hero-slide="${index}" aria-label="Quảng cáo ${index + 1}: ${escapeHtml(product.name)}" aria-pressed="${index === 0}"></button>`).join('')}</div>
  </div>
  <div class="hero-photo" role="region" aria-label="Sản phẩm nổi bật HEVENT">
  <img class="hero-slide-image" src="${safeUrl(firstHeroProduct.image)}" alt="${escapeHtml(firstHeroProduct.name)}" fetchpriority="high">
  <div class="hero-note">
  <span id="hero-slide-caption">${escapeHtml(firstHeroProduct.brand)} · ${escapeHtml(firstHeroProduct.category)}</span>
  <strong id="hero-slide-title">${escapeHtml(firstHeroProduct.name)}</strong>
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
  <section class="section">${sectionTitle('Tìm theo phong cách','Một góc làm việc. Một thế giới mới.','Từ thiết bị chủ lực đến những chi tiết tạo nên khác biệt.')}<div class="category-rail">${[
    ['Laptop', '<rect x="4" y="5" width="16" height="12" rx="1.5"/><path d="M2.5 20h19l-1.5-3H4z"/>', 'Hiệu năng linh hoạt'],
    ['Bàn phím', '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M8 15h8"/>', 'Chạm vào cảm hứng'],
    ['Chuột', '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 3v5m-5 0h10"/>', 'Chuyển động chính xác'],
    ['Màn hình', '<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M12 17v4m-4 0h8"/>', 'Mở rộng góc nhìn'],
    ['Âm thanh', '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M19 19a3 3 0 0 1-3 2h-2"/>', 'Đắm chìm trong từng nhịp']
  ].map(([name, icon, sub]) => `<a class="category-tile" href="#catalog?category=${encodeURIComponent(name)}">
  <svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>
  <span>${name}<small>${sub}</small></span>
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
  wireHeroCarousel(heroSlides);
  renderHomeProducts('all');
  wireCards()
}

function wireHeroCarousel(slides) {
  if (homeHeroTimer) clearInterval(homeHeroTimer);
  const hero = document.querySelector('.hero-photo');
  const image = hero.querySelector('.hero-slide-image');
  const caption = hero.querySelector('#hero-slide-caption');
  const title = hero.querySelector('#hero-slide-title');
  const dots = [...document.querySelectorAll('.hero-dots [data-hero-slide]')];
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const product = slides[activeIndex];
    image.classList.remove('is-entering');
    image.src = safeUrl(product.image);
    image.alt = `${product.name} - ${product.brand}`;
    caption.textContent = `${product.brand} · ${product.category}`;
    title.textContent = product.name;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    void image.offsetWidth;
    image.classList.add('is-entering');
  };

  const startAutoplay = () => {
    clearInterval(homeHeroTimer);
    if (slides.length > 1) {
      homeHeroTimer = setInterval(() => {
        if (!document.hidden && !hero.matches(':hover')) {
          showSlide(activeIndex + 1);
        }
      }, 3000);
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.heroSlide));
      startAutoplay();
    });
  });
  hero.addEventListener('mouseenter', () => clearInterval(homeHeroTimer));
  hero.addEventListener('mouseleave', startAutoplay);
  startAutoplay();
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
