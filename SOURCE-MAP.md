# Bản đồ source HEVENT

## Các trang HTML

| File | Chức năng |
| --- | --- |
| `index.html` | Trang chủ |
| `categories.html` | Danh mục sản phẩm |
| `search.html` | Tìm kiếm và lọc sản phẩm |
| `product.html` | Chi tiết sản phẩm |
| `cart.html` | Giỏ hàng |
| `checkout.html` | Đặt hàng |
| `login.html` | Đăng nhập |
| `register.html` | Đăng ký |
| `account.html` | Quản lý tài khoản |
| `admin.html` | Quản trị sản phẩm, đơn hàng, tài khoản và thống kê demo |

## CSS

- `styles.css`: giao diện dùng chung, bố cục, thành phần sản phẩm và chatbot.
- `mobile.css`: các điều chỉnh cho màn hình nhỏ.
- `admin.css`: các quy tắc riêng cho trang quản trị.

## JavaScript

- `app.js` ở thư mục gốc: nạp lần lượt các module JavaScript theo trang.
- `js/shared.js`: dữ liệu demo, trạng thái lưu trong trình duyệt và hàm dùng chung.
- `js/app.js`: khởi tạo ứng dụng và các thành phần dùng chung.
- `js/home.js`: nội dung và tương tác trang chủ.
- `js/catalog.js`: danh mục, tìm kiếm và lọc sản phẩm.
- `js/product.js`: chi tiết sản phẩm và so sánh cấu hình.
- `js/cart.js`: thao tác giỏ hàng.
- `js/checkout.js`: đặt hàng.
- `js/auth.js`: đăng nhập và đăng ký.
- `js/account.js`: thông tin và lịch sử đơn hàng của tài khoản.
- `js/admin.js`: bảng quản trị và số liệu demo.
- `js/chat.js`: giao diện chatbot tư vấn, gợi ý sản phẩm và hướng dẫn đặt hàng.

Các dữ liệu và giao dịch hiện là bản demo chạy phía trình duyệt; chúng được lưu bằng `localStorage`, chưa kết nối máy chủ hoặc dịch vụ AI bên ngoài.
