function appendMessage(text,kind='assistant') {
  const box=document.querySelector('#chat-messages');
  const node=document.createElement('div');
  node.className=`message ${kind==='user'?'user-message':'assistant-message'}`;
  node.textContent=text;
  box.append(node);
  box.scrollTop=box.scrollHeight
}
function recommendFor(text) {
  const q=text.toLowerCase();
  let matches=products.filter(p=>p.category==='Laptop');
  if(/sinh viên|di chuyển|mỏng nhẹ|pin|học/.test(q))matches=products.filter(p=>p.category==='Laptop'&&p.price<35000000);
  else if(/game|gaming|đồ họa|render|mạnh nhất/.test(q))matches=products.filter(p=>p.category==='Laptop').sort((a,b)=>parseInt(b.ram)-parseInt(a.ram));
  else if(/rẻ|tiết kiệm|ngân sách|dưới/.test(q)) {
    const n=q.match(/(\d+)\s*(?:triệu|tr)/);
    const limit=n?Number(n[1])*1000000:25000000;
    matches=products.filter(p=>p.price<=limit).sort((a,b)=>b.price-a.price)
  }
  return matches.slice(0,2)
}
function sendChat(text) {
  appendMessage(text,'user');
  chatHistory.push( {
    role:'user',content:text
  }
  );
  const q=text.toLowerCase();
  let answer='';
  if(/so sánh|compare/.test(q)) {
    const laptops=products.filter(p=>p.category==='Laptop').slice(0,2);
    answer=`Mình sẽ so sánh ${laptops[0]?.name} và ${laptops[1]?.name}: ${laptops[0]?.ram} RAM, ${laptops[0]?.storage} lưu trữ so với ${laptops[1]?.ram} RAM, ${laptops[1]?.storage}. ${laptops[0]?.name} có giá ${fmt(laptops[0]?.price)}, còn ${laptops[1]?.name} là ${fmt(laptops[1]?.price)}. Bạn có thể đánh dấu 2 sản phẩm để xem bảng so sánh chi tiết.`
  }
  else if(/đặt hàng|mua hàng|thanh toán|giao hàng/.test(q)) {
    answer='Bạn chọn sản phẩm rồi thêm vào giỏ, mở giỏ hàng và chọn “Tiến hành đặt hàng”. Điền thông tin nhận hàng, chọn thanh toán khi nhận hoặc chuyển khoản, sau đó xác nhận. Đơn từ 5 triệu được miễn phí giao hàng.'
  }
  else if(/đơn hàng|tra cứu|trạng thái/.test(q)) {
    answer=currentUser?`Mở mục Tài khoản → Đơn hàng của tôi để xem trạng thái đơn đã đặt bằng ${currentUser.email}.`:'Đăng nhập tài khoản HEVENT rồi mở “Đơn hàng của tôi” để theo dõi. Đơn khách đặt có thể được nhân viên tra cứu qua yêu cầu hỗ trợ.'
  }
  else if(/bảo hành|đổi trả|hỏng|lỗi/.test(q)) {
    answer='Các sản phẩm HEVENT tuyển chọn có bảo hành chính hãng và hỗ trợ đổi mới trong 30 ngày theo chính sách cửa hàng. Gửi yêu cầu hỗ trợ để nhân viên liên hệ, hoặc cung cấp mã đơn nếu bạn đã mua hàng.'
  }
  else if(/nhân viên|tư vấn viên|liên hệ|hỗ trợ|gọi/.test(q)) {
    answer='Mình có thể chuyển yêu cầu cho đội ngũ HEVENT. Nhấn “Cần nhân viên hỗ trợ?” bên dưới và để lại nội dung cùng email hoặc số điện thoại nhé.'
  }
  else {
    const picks=recommendFor(q);
    if(picks.length) {
      answer=`${/sinh viên|học/.test(q)?'Cho nhu cầu học tập, mình ưu tiên máy nhẹ, pin tốt và đủ dùng nhiều năm. ':/game|đồ họa|render/.test(q)?'Với nhu cầu đồ họa hoặc hiệu năng cao, mình ưu tiên RAM lớn và cấu hình mạnh. ':''}Bạn có thể tham khảo ${picks.map(p=>`${
        p.name
      }
      (${
        fmt(p.price)
      }
      , ${
        p.cpu
      }
      , ${
        p.ram
      }
      )`).join(' hoặc ')}. Mức ngân sách và phần mềm bạn dùng thường xuyên là gì để mình gợi ý sát hơn?`
    }
    else answer='Mình có thể tư vấn laptop theo ngân sách và nhu cầu, so sánh cấu hình, hướng dẫn đặt hàng hoặc tiếp nhận yêu cầu bảo hành. Bạn cho mình biết ngân sách và công việc chính nhé.'
  }
  setTimeout(()=> {
    appendMessage(answer);
    chatHistory.push( {
      role:'assistant',content:answer
    }
    )
  }
  ,220)
}
document.querySelector('#chat-launcher').onclick=()=> {
  document.querySelector('#chat-panel').hidden=false;
  document.querySelector('#chat-launcher').hidden=true
}
document.querySelector('#chat-close').onclick=()=> {
  document.querySelector('#chat-panel').hidden=true;
  document.querySelector('#chat-launcher').hidden=false
}
document.querySelectorAll('[data-prompt]').forEach(b=>b.onclick=()=>sendChat(b.dataset.prompt));
document.querySelector('#chat-form').onsubmit=e=> {
  e.preventDefault();
  const input=document.querySelector('#chat-input');
  if(input.value.trim())sendChat(input.value.trim());
  input.value=''
}
document.querySelector('#ticket-open').onclick=()=>openModal('Gửi yêu cầu hỗ trợ',`<p style="font-size:10px;color:#727c73;line-height:1.7">Đội ngũ HEVENT sẽ liên hệ bạn về sản phẩm, đơn hàng hoặc bảo hành.</p>
  <form id="ticket-form">
  <div class="field">
  <label>Họ và tên</label>
  <input name="name" required value="${escapeHtml(currentUser?.name||'')}">
  </div>
  <div class="field">
  <label>Email hoặc số điện thoại</label>
  <input name="contact" required value="${escapeHtml(currentUser?.email||'')}">
  </div>
  <div class="field">
  <label>Yêu cầu của bạn</label>
  <textarea name="message" rows="4" required>
  </textarea>
  </div>
  <div class="modal-actions">
  <button class="button button-dark">Gửi yêu cầu</button>
  </div>
  </form>`);
document.addEventListener('submit',e=> {
  if(e.target.id==='category-form') {
    setTimeout(()=>setStore('categories',categoryList),0);
    return
  }
  if(e.target.id!=='ticket-form')return;
  e.preventDefault();
  const d=Object.fromEntries(new FormData(e.target));
  tickets.unshift( {
    id:'YC-'+Date.now().toString().slice(-6),...d,date:new Date().toISOString(),status:'Mới'
  }
  );
  setStore('tickets',tickets);
  closeModal();
  appendMessage('Mình đã ghi nhận yêu cầu hỗ trợ. Đội ngũ HEVENT sẽ liên hệ bạn sớm nhé.');
  toast('Đã gửi yêu cầu hỗ trợ')
}
);
document.addEventListener('input',e=> {
  if(e.target.id!=='admin-search')return;
  e.stopImmediatePropagation();
  const table=document.querySelector('#admin-product-table');
  if(!table)return;
  const term=e.target.value.toLowerCase();
  table.outerHTML=productTable(products.filter(p=>(p.name+p.brand).toLowerCase().includes(term)));
  wireAdminProductActions()
}
,true);
document.addEventListener('change',e=> {
  if(e.target.name!=='category'||!location.hash.startsWith('#catalog'))return;
  catalogFilters.category=e.target.value;
  location.hash=e.target.value?`catalog?category=${encodeURIComponent(e.target.value)}`:'catalog';
  renderCatalog()
}
);
document.querySelector('.header-search').addEventListener('click',e=> {
  if(innerWidth>700||e.target.closest('input'))return;
  e.preventDefault();
  e.currentTarget.classList.add('search-open');
  document.querySelector('#search-input').focus()
}
);
document.querySelector('a[href="#support-request"]').onclick=e=> {
  e.preventDefault();
  document.querySelector('#chat-panel').hidden=false;
  document.querySelector('#chat-launcher').hidden=true;
  document.querySelector('#ticket-open').click()
}
