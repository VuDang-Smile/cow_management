// PLAYER (USER) APP - Interfaces

export type AuthProvider = 'Google' | 'Facebook' | 'Email'

export interface AuthCredentials {
  email: string
  password: string
}

export interface LocationInfo {
  country: string
  region: string
  city: string
}

export interface GameAccountInfo {
  level: number
  carePoints: number
  badges: string[]
  monthlyQRCodesScanned: number
}

export interface Player {
  id: string
  displayName: string
  email?: string
  avatarUrl?: string
  location: LocationInfo
  preferences: {
    language: 'JP' | 'EN' | 'VN'
  }
  adoptedCowId?: string
  adoptionStartDate?: Date
  adoptedCowFarm?: {
    name: string
    region: string
  }
  game: GameAccountInfo
}

export interface AdoptableCowItem {
  id: string
  name: string
  weightKg: number
  farmName: string
  location: string
  avatarUrl?: string
}

export type HealthOverall = 'Good' | 'Fair' | 'Poor'
export type TrendDirection = 'Up' | 'Down' | 'Stable'

export interface LatestActivityInfo {
  activity: 'Eating' | 'Ruminating' | 'Walking' | 'Lying' | 'Milking'
  minutesAgo: number
}

export interface CowStatusSnapshot {
  healthOverall: HealthOverall
  milkYieldLPerDay: number
  trend: TrendDirection
  feedingPercent: number
  latestActivity: LatestActivityInfo
}

// Realtime extended stats for detailed profile
export interface FeedingStats {
  mealsToday: number
  consumptionPercent: number
}

export interface ActivityStats {
  steps: number
  standHours: number
  lieHours: number
}

export interface MilkStats {
  todayLiters: number
}

export interface GameItem {
  id: string
  name: string
  type: 'Voucher' | 'Feed' | 'Badge' | 'PointBoost' | 'Other'
  description?: string
}

export interface DailyTaskItem {
  id: string
  title: string
  description: string
  completed: boolean
  reward?: { points?: number; items?: GameItem[] }
  // Optional i18n keys to render localized content via DICTS
  titleKey?: string
  descKey?: string
}

export interface FarmRankItem {
  rank: number
  farmName: string
  region: string
  totalMilkYield: number
  avgHealthScore: number
  taskCompletionRate: number
}

export interface QRScanResult {
  valid: boolean
  message: string
  reward?: { points?: number; items?: GameItem[] }
}

export type PlayerNotificationType = 'HealthAlert' | 'Feeding' | 'Task' | 'Reward' | 'Info'

export interface PlayerNotification {
  id: string
  title: string
  description: string
  date: Date
  type: PlayerNotificationType
  isRead: boolean
  // Optional i18n keys to separate content from language
  titleKey?: string
  descKey?: string
  params?: Record<string, any>
}

// User News items for the User app
export interface UserNewsItem {
  id: string
  titleJa: string
  excerptJa: string
  imageUrl: string
  categoryJa: string
  publishedAt: string
  sourceName?: string
  sourceUrl?: string
  tagsJa?: string[]
  contentJa?: string[]
}


