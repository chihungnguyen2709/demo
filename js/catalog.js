function renderCatalog() {
  const params=new URLSearchParams(location.hash.split('?')[1]||'');
  if(params.has('category'))catalogFilters.category=params.get('category');
  let list=products.filter(p=>(!catalogFilters.category||p.category===catalogFilters.category||catalogFilters.category==='Phụ kiện'&&!['Laptop'].includes(p.category))&&(!catalogFilters.brand||p.brand===catalogFilters.brand)&&p.price<=catalogFilters.maxPrice);
  if(catalogFilters.sort==='price-asc')list.sort((a,b)=>a.price-b.price);
  if(catalogFilters.sort==='price-desc')list.sort((a,b)=>b.price-a.price);
  if(catalogFilters.sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'vi'));
  const brands=[...new Set(products.map(p=>p.brand))];
  app.innerHTML=`<div class="catalog-layout">
  <div class="catalog-title">
  <div>
  <div class="eyebrow">Cửa hàng HEVENT</div>
  <h1>${catalogFilters.category?escapeHtml(catalogFilters.category):'Tất cả sản phẩm'}</h1>
  <p>Tìm người bạn đồng hành cho những điều bạn muốn tạo nên.</p>
  </div>
  </div>
  <aside class="catalog-side">
  <div class="filter-group">
  <h3>Danh mục</h3>${['','Laptop',...categoryList.slice(1),'Phụ kiện'].map(c=>`<label class="filter-option">
  <input type="radio" name="category" value="${escapeHtml(c)}" ${
    catalogFilters.category===c?'checked':''
  }
  > ${
    c||'Tất cả'
  }
  <span>${
    c?products.filter(p=>p.category===c||c==='Phụ kiện'&&p.category!=='Laptop').length:products.length
  }
  </span>
  </label>`).join('')}</div>
  <div class="filter-group">
  <h3>Thương hiệu</h3>${brands.map(b=>`<label class="filter-option">
  <input type="radio" name="brand" value="${escapeHtml(b)}" ${
    catalogFilters.brand===b?'checked':''
  }
  > ${
    escapeHtml(b)
  }
  </label>`).join('')}<label class="filter-option">
  <input type="radio" name="brand" value="" ${!catalogFilters.brand?'checked':''}> Tất cả hãng</label>
  </div>
  <div class="filter-group">
  <h3>Khoảng giá tối đa</h3>
  <div class="range-wrap">
  <input id="price-range" type="range" min="1000000" max="50000000" step="1000000" value="${catalogFilters.maxPrice}">
  <div class="range-value" id="price-value">Đến ${fmt(catalogFilters.maxPrice)}</div>
  </div>
  </div>
  </aside>
  <section class="catalog-results">
  <div class="catalog-controls">
  <span id="results-count">${list.length} sản phẩm</span>
  <select id="catalog-sort" aria-label="Sắp xếp sản phẩm">
  <option value="featured">Sắp xếp: Nổi bật</option>
  <option value="price-asc" ${catalogFilters.sort==='price-asc'?'selected':''}>Giá thấp đến cao</option>
  <option value="price-desc" ${catalogFilters.sort==='price-desc'?'selected':''}>Giá cao đến thấp</option>
  <option value="name" ${catalogFilters.sort==='name'?'selected':''}>Tên A–Z</option>
  </select>
  </div>
  <div class="product-grid catalog-grid" id="catalog-products">${list.length?list.map(card).join(''):`<div class="empty-state">
  <h2>Chưa tìm thấy sản phẩm</h2>
  <p>Thử chọn bộ lọc khác để xem thêm sản phẩm.</p>
  </div>`}</div>
  </section>
  </div>`;
  document.querySelectorAll('[name=category]').forEach(x=>x.onchange=()=> {
    catalogFilters.category=x.value;
    renderCatalog()
  }
  );
  document.querySelectorAll('[name=brand]').forEach(x=>x.onchange=()=> {
    catalogFilters.brand=x.value;
    renderCatalog()
  }
  );
  document.querySelector('#price-range').oninput=e=> {
    catalogFilters.maxPrice=+e.target.value;
    document.querySelector('#price-value').textContent='Đến '+fmt(catalogFilters.maxPrice)
  }
  document.querySelector('#price-range').onchange=renderCatalog;
  document.querySelector('#catalog-sort').onchange=e=> {
    catalogFilters.sort=e.target.value;
    renderCatalog()
  }
  wireCards();
  wireCompare()
}
function renderSearch(q) {
  const term=q.trim().toLowerCase();
  const list=products.filter(p=>`${p.name} ${p.brand} ${p.category} ${p.cpu} ${p.ram}`.toLowerCase().includes(term));
  app.innerHTML=`<section class="page-shell">
  <div class="page-heading">
  <div class="eyebrow">Tìm kiếm HEVENT</div>
  <h1>Kết quả cho “${escapeHtml(q)}”</h1>
  <p>${list.length} sản phẩm phù hợp với tìm kiếm của bạn.</p>
  </div>
  <div class="product-grid catalog-grid">${list.length?list.map(card).join(''):`<div class="empty-state">
  <h2>Chưa có kết quả</h2>
  <p>Hãy thử tên sản phẩm,
  thương hiệu hoặc danh mục khác.</p>
  <button class="button button-dark" onclick="location.hash='catalog'">Xem tất cả sản phẩm</button>
  </div>`}</div>
  </section>`;
  wireCards();
  wireCompare()
}
