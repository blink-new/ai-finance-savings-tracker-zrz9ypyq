export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
  accountId: string;
  cleared: boolean;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  balance: number;
  workingBalance: number;
  clearedBalance: number;
  createdAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  groupId: string;
  budgeted: number;
  activity: number;
  available: number;
  month: string;
  createdAt: string;
}

export interface CategoryGroup {
  id: string;
  userId: string;
  name: string;
  sortOrder: number;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  month: string;
  toBeBudgeted: number;
  createdAt: string;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  createdAt: string;
}

export interface FinancialInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement';
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export interface FinancialHealthAssessment {
  id: string;
  userId: string;
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  responses: Record<string, any>;
  recommendations: string[];
  completedAt: string;
  createdAt: string;
}

export interface HealthQuestion {
  id: string;
  category: string;
  question: string;
  type: 'number' | 'select' | 'boolean' | 'range';
  options?: string[];
  min?: number;
  max?: number;
  required: boolean;
  weight: number;
}

// Re-export gamification types
export * from './gamification';