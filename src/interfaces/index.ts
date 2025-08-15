// Enum for Cow Health Status based on descriptions in COWS screen
export enum CowHealthStatus {
  Healthy = "Khỏe mạnh – Sản lượng ổn định",
  UnderTreatment = "Đang điều trị – Sản lượng thấp hoặc tạm dừng",
  Pregnant = "Mang thai – Sản lượng giảm, cần chăm sóc đặc biệt",
  Postpartum = "Sau sinh – Sản lượng đang tăng trở lại",
  Elderly = "Già (sản lượng giảm) – Năng suất thấp nhưng vẫn cho sữa",
  Resting = "Nghỉ dưỡng – Tạm ngừng vắt sữa để phục hồi sức khỏe",
  Isolated = "Bị cách ly – Do bệnh truyền nhiễm hoặc nghi ngờ bệnh",
  Young = "Bò tơ – Bò non chưa đủ tuổi vắt sữa",
  Cull = "Bò loại thải – Đang trong kế hoạch bán hoặc xuất chuồng",
  Breeding = "Bò giống – Nuôi để phối giống, không tập trung khai thác sữa",
}

// Interface for Cow entity from COWS screen
export interface Cow {
  id: string; // Mã số hoặc tên
  photoUrl?: string; // Ảnh
  birthDate: Date; // Ngày sinh
  breed: string; // Giống
  healthStatus: CowHealthStatus; // Tình trạng sức khỏe
  careHistory: CareEntry[]; // Lịch sử chăm sóc (mảng các entry)
  milkProductionHistory: MilkProductionEntry[]; // Sản lượng sữa theo ngày/tháng
  predictedMilkNext24h: number; // Sản lượng dự kiến (24h tới)
  predictedMilkNext7Days: number; // Tiềm năng sản lượng (7 ngày tới)
  influencingFactors: string[]; // Yếu tố ảnh hưởng chính (e.g., "Sức khỏe tốt", "Sắp tới chu kỳ động dục")
}

// Interface for care history entry in Cow
export interface CareEntry {
  date: Date;
  description: string; // e.g., lượng thức ăn, lượng sữa, or other daily info
}

// Interface for milk production entry in Cow
export interface MilkProductionEntry {
  date: Date;
  amount: number; // Lượng sữa (lít)
  unit: string; // e.g., 'lít'
}

// Enum for Inventory Item Status from Quản lý Tồn kho & Vật tư screen
export enum InventoryStatus {
  Sufficient = "Đủ hàng", // Xanh
  Low = "Sắp hết", // Vàng
  OutOfStock = "Hết hàng", // Đỏ
}

// Enum for Inventory Category from Quản lý Tồn kho & Vật tư screen
export enum InventoryCategory {
  Feed = "Thức ăn",
  Medicine = "Thuốc",
  Hygiene = "Vệ sinh",
  Product = "Sản phẩm",
  Other = "Khác",
}

// Interface for Inventory Item from Quản lý Tồn kho & Vật tư screen
export interface InventoryItem {
  id: string;
  name: string; // Tên Vật tư
  category: InventoryCategory; // Danh mục
  quantity: number; // Số lượng tồn kho
  unit: string; // Đơn vị
  status: InventoryStatus; // Trạng thái
  value: number; // Giá trị (có thể tính tổng giá trị tồn kho)
  history: InventoryHistoryEntry[]; // Lịch sử nhập/xuất
}

// Interface for inventory history entry
export interface InventoryHistoryEntry {
  date: Date;
  type: "Nhập" | "Xuất" | "Điều chỉnh";
  quantity: number;
  notes?: string;
}

// Enum for Order Status from Quản lý Đơn hàng screen
export enum OrderStatus {
  New = "Đơn hàng Mới (Chờ xác nhận)",
  Confirmed = "Đã Xác nhận (Lên kế hoạch)",
  Preparing = "Đang chuẩn bị hàng",
  ReadyToShip = "Sẵn sàng Giao",
  Shipping = "Đang Giao hàng",
  Completed = "Hoàn thành",
  Cancelled = "Đã Hủy",
}

// Interface for Order from Quản lý Đơn hàng screen
export interface Order {
  id: string; // Mã đơn hàng
  customerName: string; // Tên khách hàng
  products: OrderProduct[]; // Sản phẩm & Số lượng
  deliveryDate: Date; // Ngày cần giao
  address: string; // Địa chỉ giao
  status: OrderStatus; // Trạng thái
  notes?: string; // Ghi chú
  history: OrderHistoryEntry[]; // Lịch sử trạng thái
}

// Interface for order product
export interface OrderProduct {
  name: string;
  quantity: number;
  unit: string; // e.g., 'lít'
}

// Interface for order history entry
export interface OrderHistoryEntry {
  date: Date;
  status: OrderStatus;
  notes?: string;
}

// Enum for Task Type (inferred from TASK MANAGEMENT screen)
export enum TaskType {
  Strategic = "Nhiệm vụ Chiến lược",
  Routine = "Nhiệm vụ định kỳ",
}

// Interface for Task from TASK MANAGEMENT screen
export interface Task {
  id: string;
  title: string; // e.g., "Tạo đơn hàng thức ăn tăng sản lượng"
  description: string;
  dueDate: Date; // Ngày/tuần
  assignedTo: string; // Nhân viên
  type: TaskType; // Loại nhiệm vụ
  isCompleted: boolean; // Đánh dấu hoàn thành
  origin?: string; // Nguồn gốc từ AI khuyến nghị (nếu là Strategic)
}

// Interface for Notification from Notifications screen
// NOTE: Renamed to avoid collision with DOM Notification type
export interface AppNotification {
  id: string;
  title: string; // e.g., "Bò #mã số giảm sản lượng 20%"
  description: string; // Chi tiết thông báo
  date: Date;
  type: "Cảnh báo" | "Nhắc nhở" | "Thông tin"; // Inferred types like cảnh báo bò, nhắc nhở tiêm phòng
  isRead: boolean;
}

// Enum for User Role from Settings screen
export enum UserRole {
  Manager = "Quản lý",
  Employee = "Nhân viên",
}

// Interface for User from Settings screen
export interface User {
  id: string;
  fullName: string; // Họ tên
  email: string; // Email (tài khoản đăng nhập)
  role: UserRole; // Vai trò
  createdAt: Date; // Ngày tạo
  status: "Active" | "Inactive"; // Trạng thái
  notes?: string; // Ghi chú
}

// Interface for Farm from Settings screen
export interface Farm {
  name: string; // Tên trang trại
  address: string; // Địa chỉ
  license: string; // Giấy phép hoạt động
  language: string; // Tùy chọn ngôn ngữ
}

// Interface for Dashboard Metrics (aggregated data for HOME / DASHBOARD)
export interface DashboardMetrics {
  totalCows: number; // Tổng số bò
  healthSummary: Record<CowHealthStatus, number>; // Phân loại sức khỏe (số lượng theo status)
  todayMilkProduction: number; // Sản lượng sữa hôm nay (lít)
  milkChangePercentage: number; // So với hôm qua (e.g., +5 or -3)
  inventorySummary: {
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    availableCount: number;
    predictedCostNext30Days: number;
  };
  supplyDemand: {
    farmSupplyForecast: number; // Dự báo Cung của Trang trại (lít)
    allocatedDemandForecast: number; // Dự báo Cầu được phân bổ (lít)
    gaugeStatus: "Cân bằng" | "Thiếu hụt" | "Dư thừa"; // Vùng Xanh/Vàng/Đỏ
  };
  recommendations: Recommendation[]; // Hộp khuyến nghị
  alerts: Alert[]; // Cảnh báo thông minh
  priorityTasks: Task[]; // Nhiệm vụ ưu tiên
}

// Interface for Recommendation in Dashboard
export interface Recommendation {
  type: "Cảnh báo Rủi ro" | "Cơ hội" | "Hành động Đề xuất";
  description: string; // e.g., "Liên hệ Nhà máy chế biến XYZ"
  actionLink?: string; // [Nhấn để xem thông tin liên hệ]
}

// Interface for Alert in Dashboard
export interface Alert {
  description: string; // e.g., "Bò #mã số giảm sản lượng 20%"
  predictedImpact: string; // e.g., "-50 lít vào dự báo cung tuần này"
}

// Interface for Report from REPORTS / ANALYTICS screen
// NOTE: Renamed to avoid collision with possible DOM "Report" type
export interface AnalyticsReport {
  type:
    | "Sản lượng"
    | "Tỷ lệ Sức khỏe"
    | "Hiệu quả Nhân viên"
    | "Xu hướng"
    | "Cung-Cầu"
    | "Hiệu quả Chi phí";
  data: any; // Có thể là chart data, e.g., { dates: Date[], values: number[] } tùy loại
  analysis: string; // Phân tích nguyên nhân (e.g., "Lãng phí do sản lượng thực tế cao hơn nhu cầu")
}
