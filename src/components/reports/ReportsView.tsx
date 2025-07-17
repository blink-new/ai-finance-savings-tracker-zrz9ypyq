import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySpending {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
}

interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

const mockCategorySpending: CategorySpending[] = [
  { category: 'Groceries', budgeted: 400, spent: 350, remaining: 50, percentage: 87.5 },
  { category: 'Restaurants', budgeted: 200, spent: 180, remaining: 20, percentage: 90 },
  { category: 'Transportation', budgeted: 150, spent: 125, remaining: 25, percentage: 83.3 },
  { category: 'Entertainment', budgeted: 150, spent: 120, remaining: 30, percentage: 80 },
  { category: 'Electric', budgeted: 120, spent: 95, remaining: 25, percentage: 79.2 },
  { category: 'Internet', budgeted: 80, spent: 80, remaining: 0, percentage: 100 },
  { category: 'Medical', budgeted: 200, spent: 150, remaining: 50, percentage: 75 },
  { category: 'Car Insurance', budgeted: 100, spent: 0, remaining: 100, percentage: 0 }
];

const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Sep 2024', income: 4200, expenses: 3800, net: 400 },
  { month: 'Oct 2024', income: 4200, expenses: 3950, net: 250 },
  { month: 'Nov 2024', income: 4200, expenses: 3700, net: 500 },
  { month: 'Dec 2024', income: 4500, expenses: 4100, net: 400 },
  { month: 'Jan 2025', income: 4200, expenses: 3650, net: 550 }
];

export function ReportsView() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedReport, setSelectedReport] = useState('spending-by-category');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalBudgeted = mockCategorySpending.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = mockCategorySpending.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Analyze your spending patterns and budget performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="year-to-date">Year to Date</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Budgeted</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalBudgeted)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-xl font-bold text-red-600">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(totalRemaining)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Used</p>
                <p className="text-xl font-bold text-purple-600">
                  {Math.round((totalSpent / totalBudgeted) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategorySpending.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.spent)} / {formatCurrency(category.budgeted)}
                      </span>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(category.remaining)} remaining
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={category.percentage} 
                      className="flex-1 h-2"
                    />
                    <Badge 
                      variant={category.percentage >= 100 ? "destructive" : 
                               category.percentage >= 80 ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {Math.round(category.percentage)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMonthlyTrends.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{month.month}</span>
                    <span className={cn(
                      "font-semibold",
                      month.net >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {month.net >= 0 ? '+' : ''}{formatCurrency(month.net)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income:</span>
                      <span className="text-green-600 font-medium">
                        +{formatCurrency(month.income)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expenses:</span>
                      <span className="text-red-600 font-medium">
                        -{formatCurrency(month.expenses)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Over Budget Categories */}
            <div>
              <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Over Budget
              </h4>
              <div className="space-y-2">
                {mockCategorySpending
                  .filter(cat => cat.percentage >= 100)
                  .map(category => (
                    <div key={category.category} className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm font-medium">{category.category}</span>
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(category.percentage)}%
                      </Badge>
                    </div>
                  ))}
                {mockCategorySpending.filter(cat => cat.percentage >= 100).length === 0 && (
                  <p className="text-sm text-gray-500">No categories over budget</p>
                )}
              </div>
            </div>

            {/* Warning Categories */}
            <div>
              <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Warning (80%+)
              </h4>
              <div className="space-y-2">
                {mockCategorySpending
                  .filter(cat => cat.percentage >= 80 && cat.percentage < 100)
                  .map(category => (
                    <div key={category.category} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">{category.category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(category.percentage)}%
                      </Badge>
                    </div>
                  ))}
                {mockCategorySpending.filter(cat => cat.percentage >= 80 && cat.percentage < 100).length === 0 && (
                  <p className="text-sm text-gray-500">No categories in warning zone</p>
                )}
              </div>
            </div>

            {/* On Track Categories */}
            <div>
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                On Track
              </h4>
              <div className="space-y-2">
                {mockCategorySpending
                  .filter(cat => cat.percentage < 80)
                  .slice(0, 5)
                  .map(category => (
                    <div key={category.category} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium">{category.category}</span>
                      <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                        {Math.round(category.percentage)}%
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}