// FARM APP - Core domain types

// Enum for Cow Health Status based on descriptions in COWS screen
export enum CowHealthStatus {
  Healthy = "Healthy",
  UnderTreatment = "UnderTreatment",
  Pregnant = "Pregnant",
  Postpartum = "Postpartum",
  Elderly = "Elderly",
  Resting = "Resting",
  Isolated = "Isolated",
  Young = "Young",
  Cull = "Cull",
  Breeding = "Breeding",
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
  Sufficient = "Sufficient",
  Low = "Low",
  OutOfStock = "OutOfStock",
}

export enum InventoryCategory {
  Feed = "Feed",
  Medicine = "Medicine",
  Hygiene = "Hygiene",
  Product = "Product",
  Other = "Other",
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
  type: "Import" | "Export" | "Adjust"
  quantity: number
  notes?: string
}

// Orders
export enum OrderStatus {
  New = "New",
  Confirmed = "Confirmed",
  Preparing = "Preparing",
  ReadyToShip = "ReadyToShip",
  Shipping = "Shipping",
  Completed = "Completed",
  Cancelled = "Cancelled",
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
  Strategic = "Strategic",
  Routine = "Routine",
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
  type: "Alert" | "Reminder" | "Info"
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
    gaugeStatus: "Balanced" | "Shortage" | "Surplus"
  }
  recommendations: Recommendation[]
  alerts: Alert[]
  priorityTasks: Task[]
}

export interface Recommendation {
  type: "RiskAlert" | "Opportunity" | "Action"
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
    | "Production"
    | "HealthRate"
    | "EmployeeEfficiency"
    | "Trend"
    | "SupplyDemand"
    | "CostEfficiency"
  data: any
  analysis: string
}


