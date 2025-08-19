import {
  Cow,
  CowHealthStatus,
  InventoryCategory,
  InventoryItem,
  InventoryStatus,
  Order,
  OrderProduct,
  OrderStatus,
  Task,
  TaskType,
  AppNotification,
  User,
  DashboardMetrics,
  Recommendation,
  Alert,
} from '../interfaces'

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const today = new Date()

// --- COWS ---------------------------------------------------------------
export const cows: Cow[] = Array.from({ length: 18 }).map((_, i) => {
  const statuses = [
    CowHealthStatus.Healthy,
    CowHealthStatus.UnderTreatment,
    CowHealthStatus.Pregnant,
    CowHealthStatus.Postpartum,
    CowHealthStatus.Elderly,
    CowHealthStatus.Resting,
    CowHealthStatus.Isolated,
    CowHealthStatus.Young,
    CowHealthStatus.Cull,
    CowHealthStatus.Breeding,
  ]
  const healthStatus = statuses[i % statuses.length]
  const startYear = 2016 + (i % 6)
  const birthDate = new Date(startYear, randomInt(0, 11), randomInt(1, 28))
  const milkHistory = Array.from({ length: 14 }).map((__, d) => {
    return {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (13 - d)),
      amount: randomInt(18, 28) - (healthStatus === CowHealthStatus.UnderTreatment ? 8 : 0),
      unit: 'L',
    }
  })
  const predicted24 = randomInt(18, 28)
  const predicted7 = predicted24 * 7 + randomInt(-10, 40)

  return {
    id: `B${100 + i}`,
    photoUrl: undefined,
    birthDate,
    breed: ['HF', 'Jersey', 'Brown Swiss'][i % 3],
    healthStatus,
    careHistory: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), description: 'Bổ sung khoáng chất' },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), description: 'Vệ sinh chuồng trại' },
    ],
    milkProductionHistory: milkHistory,
    predictedMilkNext24h: predicted24,
    predictedMilkNext7Days: predicted7,
    influencingFactors: [
      i % 4 === 0 ? 'factor_health_good' : i % 4 === 1 ? 'factor_estrus_soon' : 'factor_weather_impact',
    ],
  }
})

// --- INVENTORY ---------------------------------------------------------
export const inventoryItems: InventoryItem[] = [
  {
    id: 'I001',
    name: 'Thức ăn loại A',
    nameKey: 'feed_a',
    category: InventoryCategory.Feed,
    quantity: 120,
    unit: 'kg',
    status: InventoryStatus.Low,
    value: 850000,
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), type: 'Import', quantity: 100 },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), type: 'Export', quantity: 60 },
    ],
  },
  {
    id: 'I002',
    name: 'Kháng sinh X',
    nameKey: 'antibiotic_x',
    category: InventoryCategory.Medicine,
    quantity: 12,
    unit: 'hộp',
    status: InventoryStatus.Sufficient,
    value: 2200000,
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), type: 'Import', quantity: 12 },
    ],
  },
  {
    id: 'I003',
    name: 'Dung dịch vệ sinh chuồng',
    nameKey: 'barn_cleaner',
    category: InventoryCategory.Hygiene,
    quantity: 0,
    unit: 'can',
    status: InventoryStatus.OutOfStock,
    value: 0,
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), type: 'Export', quantity: 3 },
    ],
  },
  {
    id: 'I004',
    name: 'Sữa tươi 1L - thành phẩm',
    nameKey: 'milk_bottle_1l',
    category: InventoryCategory.Product,
    quantity: 480,
    unit: 'chai',
    status: InventoryStatus.Sufficient,
    value: 14400000,
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), type: 'Import', quantity: 500 },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), type: 'Export', quantity: 20 },
    ],
  },
]

// --- TASKS -------------------------------------------------------------
export const tasks: Task[] = [
  {
    id: 'T001',
    title: '',
    titleKey: 'task_create_feed_order',
    description: '',
    descriptionKey: 'task_create_feed_order_desc',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    assignedTo: '佐藤 太郎',
    type: TaskType.Strategic,
    isCompleted: false,
    origin: 'Khuyến nghị từ Dashboard',
  },
  {
    id: 'T002',
    title: '',
    titleKey: 'task_vaccinate_herd2',
    description: '',
    descriptionKey: 'task_vaccinate_herd2_desc',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    assignedTo: '鈴木 花子',
    type: TaskType.Routine,
    isCompleted: true,
  },
  {
    id: 'T003',
    title: '',
    titleKey: 'task_clean_barn_b',
    description: '',
    descriptionKey: 'task_clean_barn_b_desc',
    dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    assignedTo: '田中 健',
    type: TaskType.Routine,
    isCompleted: false,
  },
]

// --- ORDERS ------------------------------------------------------------
export const orders: Order[] = [
  {
    id: 'O-00045',
    customerName: 'ABC工場',
    products: [
      { name: '牛乳1L', nameKey: 'milk_bottle_1l', quantity: 1200, unit: 'chai' } as OrderProduct,
    ],
    deliveryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    address: '東京都大田区',
    status: OrderStatus.Confirmed,
    notes: '午前中納品を優先',
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), status: OrderStatus.New },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), status: OrderStatus.Confirmed },
    ],
  },
  {
    id: 'O-00046',
    customerName: 'ミルクショップ青',
    products: [
      { name: '牛乳1L', nameKey: 'milk_bottle_1l', quantity: 300, unit: 'chai' },
    ],
    deliveryDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    address: '北海道札幌市',
    status: OrderStatus.Preparing,
    history: [
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), status: OrderStatus.New },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), status: OrderStatus.Confirmed },
      { date: new Date(today.getFullYear(), today.getMonth(), today.getDate()), status: OrderStatus.Preparing },
    ],
  },
]

// --- USERS -------------------------------------------------------------
export const users: User[] = [
  {
    id: 'U001',
    fullName: '佐藤 太郎',
    email: 'sato.taro@farm.local',
    role: 'Quản lý' as any,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
    status: 'Active',
    notes: 'Tài khoản quản trị',
  },
  {
    id: 'U002',
    fullName: '鈴木 花子',
    email: 'suzuki.hanako@farm.local',
    role: 'Nhân viên' as any,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 20),
    status: 'Active',
  },
  {
    id: 'U003',
    fullName: '田中 健',
    email: 'tanaka.ken@farm.local',
    role: 'Nhân viên' as any,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10),
    status: 'Inactive',
  },
]

// --- NOTIFICATIONS -----------------------------------------------------
export const notifications: AppNotification[] = [
  {
    id: 'N001',
    title: '', titleKey: 'farm_alert_cow_drop',
    description: '', descKey: 'farm_alert_cow_drop_desc', params: { impact: 50 },
    date: new Date(),
    type: 'Alert',
    isRead: false,
  },
  {
    id: 'N002',
    title: '', titleKey: 'farm_alert_feed_low',
    description: '', descKey: 'farm_alert_feed_low_desc',
    date: new Date(),
    type: 'Reminder',
    isRead: false,
  },
]

// --- REPORTS DATA ------------------------------------------------------
export const reportDailyMilk = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (29 - i))
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    value: 3200 + randomInt(-150, 200),
  }
})

export const reportSupplyDemand = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (29 - i))
  const supply = 23000 + randomInt(-800, 600)
  const actual = supply + randomInt(-1200, 1200)
  const demand = 24000 + randomInt(-600, 800)
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    supply,
    actual,
    demand,
  }
})

export const employeePerformance = [
  { name: '佐藤 太郎', tasks: 18 },
  { name: '鈴木 花子', tasks: 22 },
  { name: '田中 健', tasks: 15 },
]

// --- Aggregated Weekly / Monthly Reports --------------------------------
const formatMonth = (d: Date) => `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`

export const reportMilkWeekly = Array.from({ length: 8 }).map((_, i) => {
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (7 * (7 - i)))
  return {
    date: `Tuần ${i + 1}`,
    value: 3200 * 7 + randomInt(-600, 800),
  }
})

export const reportMilkMonthly = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date(today.getFullYear(), today.getMonth() - (11 - i), 1)
  return {
    date: formatMonth(d),
    value: 3200 * 30 + randomInt(-3000, 3500),
  }
})

export const reportSupplyDemandWeekly = Array.from({ length: 8 }).map((_, i) => {
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (7 * (7 - i)))
  const supply = 23000 * 7 + randomInt(-5000, 5000)
  const actual = supply + randomInt(-6000, 6000)
  const demand = 24000 * 7 + randomInt(-4000, 6000)
  return {
    date: `Tuần ${i + 1}`,
    supply,
    actual,
    demand,
  }
})

export const reportSupplyDemandMonthly = Array.from({ length: 12 }).map((_, i) => {
  const d = new Date(today.getFullYear(), today.getMonth() - (11 - i), 1)
  const supply = 23000 * 30 + randomInt(-20000, 22000)
  const actual = supply + randomInt(-24000, 24000)
  const demand = 24000 * 30 + randomInt(-18000, 22000)
  return {
    date: formatMonth(d),
    supply,
    actual,
    demand,
  }
})

// --- DASHBOARD METRICS -------------------------------------------------
export const getDashboardMetrics = (): DashboardMetrics => {
  const totalCows = cows.length
  const healthSummary: Record<CowHealthStatus, number> = {
    [CowHealthStatus.Healthy]: cows.filter(c => c.healthStatus === CowHealthStatus.Healthy).length,
    [CowHealthStatus.UnderTreatment]: cows.filter(c => c.healthStatus === CowHealthStatus.UnderTreatment).length,
    [CowHealthStatus.Pregnant]: cows.filter(c => c.healthStatus === CowHealthStatus.Pregnant).length,
    [CowHealthStatus.Postpartum]: cows.filter(c => c.healthStatus === CowHealthStatus.Postpartum).length,
    [CowHealthStatus.Elderly]: cows.filter(c => c.healthStatus === CowHealthStatus.Elderly).length,
    [CowHealthStatus.Resting]: cows.filter(c => c.healthStatus === CowHealthStatus.Resting).length,
    [CowHealthStatus.Isolated]: cows.filter(c => c.healthStatus === CowHealthStatus.Isolated).length,
    [CowHealthStatus.Young]: cows.filter(c => c.healthStatus === CowHealthStatus.Young).length,
    [CowHealthStatus.Cull]: cows.filter(c => c.healthStatus === CowHealthStatus.Cull).length,
    [CowHealthStatus.Breeding]: cows.filter(c => c.healthStatus === CowHealthStatus.Breeding).length,
  }

  const todayMilkProduction = cows.reduce((sum, c) => {
    const last = c.milkProductionHistory[c.milkProductionHistory.length - 1]
    return sum + (last?.amount ?? 0)
  }, 0)

  const inventoryValue = inventoryItems.reduce((sum, i) => sum + i.value, 0)
  const lowStockCount = inventoryItems.filter(i => i.status === InventoryStatus.Low).length
  const outOfStockCount = inventoryItems.filter(i => i.status === InventoryStatus.OutOfStock).length
  const availableCount = inventoryItems.filter(i => i.status === InventoryStatus.Sufficient).length

  const farmSupplyForecast = 22500
  const allocatedDemandForecast = 24200
  const gaugeStatus: DashboardMetrics['supplyDemand']['gaugeStatus'] =
    farmSupplyForecast > allocatedDemandForecast + 500
      ? 'Surplus'
      : farmSupplyForecast + 500 < allocatedDemandForecast
      ? 'Shortage'
      : 'Balanced'

  const recommendations: Recommendation[] =
    gaugeStatus === 'Surplus'
      ? [
          { type: 'RiskAlert', description: 'Dự báo dư thừa ~1,200 lít trong 5 ngày tới do nhà máy ABC giảm đơn hàng.', descriptionKey: 'rec_surplus' },
          { type: 'Action', description: 'Liên hệ Nhà máy chế biến XYZ (cách 30km), họ đang có nhu cầu sữa bột.', descriptionKey: 'rec_contact_factory', actionLink: '#' },
          { type: 'Action', description: 'Cân nhắc giảm khẩu phần ăn tăng cường cho đàn bò #3 trong 3 ngày tới.', descriptionKey: 'rec_reduce_feed' },
        ]
      : [
          { type: 'Opportunity', description: 'Nhu cầu thị trường dự báo tăng mạnh (+15%) vào cuối tuần do thời tiết nắng nóng.', descriptionKey: 'rec_demand_up' },
          { type: 'Action', description: 'Ưu tiên áp dụng khẩu phần ăn tăng sản lượng cho 25 con bò tiềm năng cao nhất.', descriptionKey: 'rec_increase_feed' },
        ]

  const alerts: Alert[] = [
    { description: 'Bò #B247 giảm sản lượng 20%', descriptionKey: 'alert_cow_drop', predictedImpact: '-{impact} lít vào dự báo cung tuần này', predictedImpactKey: 'alert_cow_drop_impact', params: { impact: 50 } },
    { description: 'Thức ăn loại A sắp hết', descriptionKey: 'alert_feed_low', predictedImpact: 'Có thể giảm 5% tổng sản lượng nếu không nhập kịp', predictedImpactKey: 'alert_feed_low_impact' },
  ]

  return {
    totalCows,
    healthSummary,
    todayMilkProduction,
    milkChangePercentage: 5,
    inventorySummary: {
      totalValue: inventoryValue,
      lowStockCount,
      outOfStockCount,
      availableCount,
      predictedCostNext30Days: 12000000,
    },
    supplyDemand: {
      farmSupplyForecast,
      allocatedDemandForecast,
      gaugeStatus,
    },
    recommendations,
    alerts,
    priorityTasks: tasks,
  }
}

export type { DashboardMetrics } from '../interfaces'


