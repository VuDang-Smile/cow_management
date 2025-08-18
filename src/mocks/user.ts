import {
  AdoptableCowItem,
  CowStatusSnapshot,
  DailyTaskItem,
  FarmRankItem,
  Player,
  PlayerNotification,
  FeedingStats,
  ActivityStats,
  MilkStats,
} from '../interfaces'

// PLAYER (USER) APP MOCKS

export const adoptableCows: AdoptableCowItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `C${100 + i}`,
  name: `Cow${(i + 1).toString().padStart(3, '0')}`,
  weightKg: 520 + (i % 5) * 10,
  farmName: ['ABC Farm', 'Sakura Farm', 'Hokkaido Milk'][i % 3],
  location: ['Hokkaido', 'Aomori', 'Iwate'][i % 3],
}))

export const sampleCowStatus: CowStatusSnapshot = {
  healthOverall: 'Good',
  milkYieldLPerDay: 18.5,
  trend: 'Down',
  feedingPercent: 80,
  latestActivity: { activity: 'Eating', minutesAgo: 60 },
}

// Detailed profile stats (data separated from language)
export const feedingStats: FeedingStats = { mealsToday: 3, consumptionPercent: 80 }
export const activityStats: ActivityStats = { steps: 5320, standHours: 6, lieHours: 18 }
export const milkStats: MilkStats = { todayLiters: 28 }

export const dailyTasksPlayer: DailyTaskItem[] = [
  {
    id: 'DT01',
    title: 'Cho ăn sáng',
    description: 'Kiểm tra và bổ sung máng ăn thông minh',
    completed: false,
    reward: { points: 10 },
  },
  {
    id: 'DT02',
    title: 'Kiểm tra sức khỏe',
    description: 'Đọc dữ liệu nhiệt độ và nhịp tim',
    completed: true,
    reward: { points: 15 },
  },
  {
    id: 'DT03',
    title: 'Ghi nhận hoạt động',
    description: 'Đồng bộ bước chân và thời gian đứng/nằm',
    completed: false,
    reward: { points: 8 },
  },
]

export const farmRanks: FarmRankItem[] = [
  { rank: 1, farmName: 'ABC Farm', region: 'Hokkaido', totalMilkYield: 24500, avgHealthScore: 92, taskCompletionRate: 96 },
  { rank: 2, farmName: 'Sakura Farm', region: 'Aomori', totalMilkYield: 23600, avgHealthScore: 89, taskCompletionRate: 90 },
  { rank: 3, farmName: 'Hokkaido Milk', region: 'Iwate', totalMilkYield: 22800, avgHealthScore: 88, taskCompletionRate: 88 },
]

export const playerNotifications: PlayerNotification[] = [
  { id: 'PN1', title: '', titleKey: 'notif_health_alert', description: '', descKey: 'notif_temp_up', params: { hours: 2 }, date: new Date(), type: 'HealthAlert', isRead: false },
  { id: 'PN2', title: '', titleKey: 'notif_feeding_done', description: '', descKey: 'notif_feeding_full', params: { percent: 100 }, date: new Date(), type: 'Feeding', isRead: false },
  { id: 'PN3', title: '', titleKey: 'notif_reward', description: '', descKey: 'notif_reward_points', params: { points: 10 }, date: new Date(), type: 'Reward', isRead: true },
]

export const samplePlayer: Player = {
  id: 'P001',
  displayName: 'User',
  email: 'user@example.com',
  avatarUrl: undefined,
  location: { country: 'Japan', region: 'Hokkaido', city: 'Sapporo' },
  preferences: { language: 'VN' },
  adoptedCowId: adoptableCows[0].id,
  adoptionStartDate: new Date(),
  adoptedCowFarm: { name: adoptableCows[0].farmName, region: adoptableCows[0].location },
  game: { level: 3, carePoints: 120, badges: ['Beginner', 'Feeder'], monthlyQRCodesScanned: 2 },
}


