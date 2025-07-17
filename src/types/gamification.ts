export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  category: 'budgeting' | 'saving' | 'spending' | 'goals' | 'streak' | 'milestone';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  createdAt: string;
}

export interface UserLevel {
  id: string;
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  nextLevelXP: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Streak {
  id: string;
  userId: string;
  type: 'daily_budget_check' | 'transaction_logging' | 'goal_progress' | 'savings_deposit';
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Challenge {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  target: number;
  progress: number;
  reward: {
    xp: number;
    points: number;
    badge?: string;
  };
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface GameStats {
  id: string;
  userId: string;
  totalPoints: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  longestStreak: number;
  challengesCompleted: number;
  level: number;
  xp: number;
  rank: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'achievement' | 'level_up' | 'streak' | 'challenge' | 'milestone';
  title: string;
  message: string;
  icon: string;
  isRead: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  level: number;
  totalXP: number;
  achievementsCount: number;
  rank: number;
}

export const LEVEL_TITLES = [
  'Budget Beginner',
  'Penny Pincher',
  'Savings Starter',
  'Money Manager',
  'Budget Boss',
  'Financial Guru',
  'Wealth Wizard',
  'Money Master',
  'Financial Legend',
  'Budget Deity'
];

export const ACHIEVEMENT_CATEGORIES = {
  budgeting: { name: 'Budgeting', color: '#3B82F6', icon: '📊' },
  saving: { name: 'Saving', color: '#10B981', icon: '💰' },
  spending: { name: 'Spending', color: '#F59E0B', icon: '💳' },
  goals: { name: 'Goals', color: '#8B5CF6', icon: '🎯' },
  streak: { name: 'Streaks', color: '#EF4444', icon: '🔥' },
  milestone: { name: 'Milestones', color: '#06B6D4', icon: '🏆' }
};

export const RARITY_COLORS = {
  common: '#6B7280',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B'
};