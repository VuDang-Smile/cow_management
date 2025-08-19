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
  UserNewsItem,
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
    title: '',
    titleKey: 'task_feed_morning',
    description: '',
    descKey: 'task_feed_morning_desc',
    completed: false,
    reward: { points: 10 },
  },
  {
    id: 'DT02',
    title: '',
    titleKey: 'task_health_check',
    description: '',
    descKey: 'task_health_check_desc',
    completed: true,
    reward: { points: 15 },
  },
  {
    id: 'DT03',
    title: '',
    titleKey: 'task_activity_log',
    description: '',
    descKey: 'task_activity_log_desc',
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

// NEWS (JP content) - mock list similar to podcast/news style with images
export const userNewsList: UserNewsItem[] = [
  {
    id: 'N001',
    titleJa: '雨でも止まらない！晴雨で変わる牧場の動き',
    excerptJa: '雨天時の牛舎管理や作業の工夫、湿度と健康管理、田畑作業の調整について解説。',
    imageUrl: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1200&auto=format&fit=crop',
    categoryJa: '牧場ニュース',
    publishedAt: '2025-08-10T07:10:00+09:00',
    sourceName: '川上牧場',
    sourceUrl: 'https://listen.style/p/kawakamifarm2/q33ptugi',
    tagsJa: ['牛乳', '酪農', '牧場運営'],
    contentJa: [
      '雨の日でも牧場の仕事は止まりません。湿度が高い日は、牛舎の換気と床の乾燥を意識して管理します。',
      '子牛の健康は特に気を配り、寝床の乾燥と清潔を保つことが重要です。',
      '田畑作業は天候を見ながらスケジュール調整し、無理のない範囲で進めます。'
    ]
  },
  {
    id: 'N002',
    titleJa: '「儲かる牛舎」の共通点とは？省力・快適・未来型構造',
    excerptJa: '作業動線、換気、採光、IoT活用まで。牛にも人にも優しい設計のポイント。',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200&auto=format&fit=crop',
    categoryJa: '設備・設計',
    publishedAt: '2025-08-05T06:30:00+09:00',
    sourceName: '川上牧場ラジオ',
    tagsJa: ['牛舎', '省力化', 'スマート農業'],
    contentJa: [
      '省力化の鍵は、無駄のない動線と自動化の組み合わせ。',
      '換気・採光は牛の快適性に直結し、健康スコアや乳量にも影響します。',
      'IoTセンサーで環境を見える化し、日々の微調整を行うことが成果につながります。'
    ]
  },
  {
    id: 'N003',
    titleJa: '牛乳の栄養比較：アメリカと日本の違い',
    excerptJa: '成分表示や飲み方の文化差から見える、牛乳の楽しみ方のバリエーション。',
    imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop',
    categoryJa: 'ミルクの話',
    publishedAt: '2025-08-09T07:00:00+09:00',
    sourceName: 'ミルクチェーン編集部',
    tagsJa: ['栄養', 'ミルク', 'ライフスタイル'],
    contentJa: [
      '脂肪分やビタミンの強化基準、パスチャライズの温度など、国によって仕様が異なります。',
      '飲み方の文化差も味わいに影響し、温め方や合わせる食材で印象が変わります。'
    ]
  },
  {
    id: 'N004',
    titleJa: '夏休みこども酪農相談室：牛のお世話を学ぼう',
    excerptJa: '子ども向けに、給餌・清掃・健康チェックを分かりやすく紹介。',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    categoryJa: '学び',
    publishedAt: '2025-08-01T07:00:00+09:00',
    sourceUrl: 'https://youtube.com/playlist?list=PLyq5VP_ktZhG31vaYqbpJeEq4wCdc1A1i',
    sourceName: '川上牧場YouTube',
    tagsJa: ['教育', '子ども', '酪農'],
    contentJa: [
      '給餌は量と時間が大切。清掃は牛のストレス軽減にもつながります。',
      '健康チェックは毎日の観察が基本。小さな変化を見逃さない目を育てましょう。'
    ]
  },
  {
    id: 'N005',
    titleJa: '【新法案】食品流通の公正取引ルール解説',
    excerptJa: '価格交渉の透明化や生産者保護など、酪農家が知っておきたいポイントを解説。',
    imageUrl: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1200&auto=format&fit=crop',
    categoryJa: '業界ニュース',
    publishedAt: '2025-07-28T08:00:00+09:00',
    tagsJa: ['ルール', '法案', '取引'],
    contentJa: [
      '新法案は取引の公正性を高め、生産者の立場を守ることを目的としています。',
      '契約の明確化や支払いサイトの適正化が進むことが期待されます。'
    ]
  }
]


