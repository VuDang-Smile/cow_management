// FARM APP - Core domain types

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
  id: string
  photoUrl?: string
  birthDate: Date
  breed: string
  healthStatus: CowHealthStatus
  careHistory: CareEntry[]
  milkProductionHistory: MilkProductionEntry[]
  predictedMilkNext24h: number
  predictedMilkNext7Days: number
  influencingFactors: string[]
}

export interface CareEntry {
  date: Date
  description: string
}

export interface MilkProductionEntry {
  date: Date
  amount: number
  unit: string
}

// Inventory
export enum InventoryStatus {
  Sufficient = "Đủ hàng",
  Low = "Sắp hết",
  OutOfStock = "Hết hàng",
}

export enum InventoryCategory {
  Feed = "Thức ăn",
  Medicine = "Thuốc",
  Hygiene = "Vệ sinh",
  Product = "Sản phẩm",
  Other = "Khác",
}

export interface InventoryItem {
  id: string
  name: string
  nameKey?: string
  category: InventoryCategory
  quantity: number
  unit: string
  status: InventoryStatus
  value: number
  history: InventoryHistoryEntry[]
}

export interface InventoryHistoryEntry {
  date: Date
  type: "Nhập" | "Xuất" | "Điều chỉnh"
  quantity: number
  notes?: string
}

// Orders
export enum OrderStatus {
  New = "Đơn hàng Mới (Chờ xác nhận)",
  Confirmed = "Đã Xác nhận (Lên kế hoạch)",
  Preparing = "Đang chuẩn bị hàng",
  ReadyToShip = "Sẵn sàng Giao",
  Shipping = "Đang Giao hàng",
  Completed = "Hoàn thành",
  Cancelled = "Đã Hủy",
}

export interface Order {
  id: string
  customerName: string
  products: OrderProduct[]
  deliveryDate: Date
  address: string
  status: OrderStatus
  notes?: string
  history: OrderHistoryEntry[]
}

export interface OrderProduct {
  name: string
  nameKey?: string
  quantity: number
  unit: string
}

export interface OrderHistoryEntry {
  date: Date
  status: OrderStatus
  notes?: string
}

// Tasks
export enum TaskType {
  Strategic = "Nhiệm vụ Chiến lược",
  Routine = "Nhiệm vụ định kỳ",
}

export interface Task {
  id: string
  title: string
  titleKey?: string
  description: string
  descriptionKey?: string
  dueDate: Date
  assignedTo: string
  type: TaskType
  isCompleted: boolean
  origin?: string
}

// Notifications used in farm app
export interface AppNotification {
  id: string
  title: string
  titleKey?: string
  description: string
  descKey?: string
  params?: Record<string, any>
  date: Date
  type: "Cảnh báo" | "Nhắc nhở" | "Thông tin"
  isRead: boolean
}

// Settings
export enum UserRole {
  Manager = "Quản lý",
  Employee = "Nhân viên",
}

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  createdAt: Date
  status: "Active" | "Inactive"
  notes?: string
}

export interface Farm {
  name: string
  address: string
  license: string
  language: string
}

// Dashboard
export interface DashboardMetrics {
  totalCows: number
  healthSummary: Record<CowHealthStatus, number>
  todayMilkProduction: number
  milkChangePercentage: number
  inventorySummary: {
    totalValue: number
    lowStockCount: number
    outOfStockCount: number
    availableCount: number
    predictedCostNext30Days: number
  }
  supplyDemand: {
    farmSupplyForecast: number
    allocatedDemandForecast: number
    gaugeStatus: "Cân bằng" | "Thiếu hụt" | "Dư thừa"
  }
  recommendations: Recommendation[]
  alerts: Alert[]
  priorityTasks: Task[]
}

export interface Recommendation {
  type: "Cảnh báo Rủi ro" | "Cơ hội" | "Hành động Đề xuất"
  description: string
  descriptionKey?: string
  actionLink?: string
}

export interface Alert {
  description: string
  descriptionKey?: string
  predictedImpact: string
  predictedImpactKey?: string
  params?: Record<string, any>
}

// Reports / Analytics
export interface AnalyticsReport {
  type:
    | "Sản lượng"
    | "Tỷ lệ Sức khỏe"
    | "Hiệu quả Nhân viên"
    | "Xu hướng"
    | "Cung-Cầu"
    | "Hiệu quả Chi phí"
  data: any
  analysis: string
}


