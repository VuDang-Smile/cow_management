# 🏠 Luồng Nhân viên - Staff Portal

## Tổng quan

Luồng nhân viên được thiết kế dành riêng cho nhân viên trang trại với các quyền hạn và chức năng phù hợp với vai trò của họ.

## 🚀 Cách truy cập

1. Mở ứng dụng Milk Chain
2. Trên trang chủ, chọn **"👨‍💼 Nhân viên"**
3. Hoặc truy cập trực tiếp: `/staff`

## 📋 Menu và Chức năng

### 🏠 HOME (Trang chủ)
- **Tổng quan công việc hôm nay**: Hiển thị tiến độ hoàn thành công việc
- **Công việc trong ngày**: Danh sách các công việc được giao
- **Cảnh báo tồn kho**: Thông báo vật tư sắp hết
- **Thông báo nhanh**: Các thông báo quan trọng

### 🐄 COWS (Quản lý Bò)
- **Xem danh sách bò**: Thông tin cơ bản và tình trạng sức khỏe
- **Nhập dữ liệu kiểm tra sức khỏe**: 
  - Nhiệt độ
  - Cân nặng
  - Triệu chứng
  - Điều trị
  - Ghi chú
- **Lưu ý**: Chỉ thêm bản ghi mới, không được xóa hoặc sửa dữ liệu cũ

### 📋 TASK MANAGEMENT (Quản lý Công việc)
- **Xem công việc được giao**: Danh sách các nhiệm vụ
- **Cập nhật trạng thái**: 
  - Chờ thực hiện
  - Đang thực hiện
  - Hoàn thành
- **Ghi chú tiến độ**: Thêm thông tin về quá trình thực hiện

### 📦 Quản lý Tồn kho & Vật tư
- **Xem danh sách vật tư**: Thông tin tồn kho hiện tại
- **Nhập/Xuất vật tư**: Chỉ khi được phân quyền
- **Cảnh báo tồn kho thấp**: Thông báo khi vật tư sắp hết
- **Lý do giao dịch**:
  - Sử dụng hàng ngày
  - Khẩn cấp
  - Nhập bổ sung
  - Liên quan công việc

### 📋 Quản lý Đơn hàng
- **Xem đơn hàng**: Cả đơn hàng đến và đi
- **Cập nhật trạng thái**:
  - Đã xác nhận
  - Đang vận chuyển
  - Đã giao/Đã nhận
  - Đã hủy
- **Chi tiết đơn hàng**: Danh sách mặt hàng và giá trị

### 🔔 Notifications (Thông báo)
- **Bộ lọc thông báo**:
  - Tất cả thông báo
  - Chưa đọc
  - Khẩn cấp
  - Theo loại (Công việc, Tồn kho, Tiêm phòng, Sức khỏe, Đơn hàng)
- **Đánh dấu đã đọc**
- **Thực hiện hành động** từ thông báo

## 🔐 Phân quyền

### Quyền hạn của Nhân viên:
- ✅ Xem thông tin bò và sức khỏe
- ✅ Nhập dữ liệu kiểm tra sức khỏe mới
- ✅ Xem và cập nhật trạng thái công việc được giao
- ✅ Xem tồn kho vật tư
- ✅ Nhập/xuất vật tư (khi được phân quyền)
- ✅ Xem và cập nhật trạng thái đơn hàng
- ✅ Xem thông báo liên quan

### Hạn chế:
- ❌ Không thể xóa hoặc sửa dữ liệu cũ
- ❌ Không thể tạo công việc mới
- ❌ Không thể xem báo cáo chi tiết
- ❌ Không thể quản lý tài khoản người khác

## 🎨 Giao diện

### Thiết kế:
- Layout tương tự như Farm Portal
- Màu sắc chủ đạo: Xanh lá (#16a34a)
- Icon và emoji trực quan
- Responsive design

### Các trạng thái:
- 🔴 Khẩn cấp/Cao
- 🟡 Trung bình/Đang thực hiện
- 🟢 Thấp/Hoàn thành
- ⚪ Chờ thực hiện

## 📱 Responsive

Giao diện được thiết kế responsive và hoạt động tốt trên:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM
- **Styling**: CSS Custom Properties
- **State Management**: React Hooks
- **Icons**: Emoji và Unicode symbols

## 🚀 Khởi chạy

```bash
# Cài đặt dependencies
npm install

# Khởi chạy development server
npm run dev

# Build production
npm run build
```

## 📝 Ghi chú

- Tất cả dữ liệu hiện tại là mock data
- Cần tích hợp với backend API thực tế
- Có thể cần thêm authentication/authorization
- Có thể mở rộng thêm các tính năng khác theo yêu cầu
