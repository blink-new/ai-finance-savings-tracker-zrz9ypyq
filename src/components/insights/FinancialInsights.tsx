import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  AlertTriangle, 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Calendar
} from 'lucide-react';

const insights = [
  {
    id: '1',
    type: 'tip',
    title: 'Optimize Your Coffee Spending',
    description: 'You spent $180 on coffee this month. Making coffee at home 3 days a week could save you $540 annually.',
    category: 'Food & Dining',
    priority: 'medium',
    savings: 540,
    icon: Lightbulb
  },
  {
    id: '2',
    type: 'warning',
    title: 'Budget Alert: Entertainment',
    description: 'You\'ve exceeded your entertainment budget by 25% this month. Consider reducing streaming subscriptions.',
    category: 'Entertainment',
    priority: 'high',
    overspend: 125,
    icon: AlertTriangle
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Savings Goal Milestone!',
    description: 'Congratulations! You\'ve reached 68% of your emergency fund goal. Keep up the great work!',
    category: 'Emergency Fund',
    priority: 'low',
    progress: 68,
    icon: Trophy
  },
  {
    id: '4',
    type: 'tip',
    title: 'Investment Opportunity',
    description: 'You have $2,400 sitting in low-interest savings. Consider moving some to a high-yield account.',
    category: 'Investment',
    priority: 'medium',
    potential: 2400,
    icon: TrendingUp
  }
];

const monthlyTrends = [
  { category: 'Food & Dining', current: 1200, previous: 1100, change: 9.1 },
  { category: 'Transportation', current: 800, previous: 850, change: -5.9 },
  { category: 'Entertainment', current: 500, previous: 400, change: 25.0 },
  { category: 'Shopping', current: 600, previous: 750, change: -20.0 },
  { category: 'Bills & Utilities', current: 850, previous: 820, change: 3.7 }
];

const budgetHealth = [
  { category: 'Food & Dining', budget: 1000, spent: 1200, percentage: 120 },
  { category: 'Transportation', budget: 900, spent: 800, percentage: 89 },
  { category: 'Entertainment', budget: 400, spent: 500, percentage: 125 },
  { category: 'Shopping', budget: 800, spent: 600, percentage: 75 },
  { category: 'Bills & Utilities', budget: 900, spent: 850, percentage: 94 }
];

export function FinancialInsights() {
  const getInsightColor = (type: string, priority: string) => {
    if (type === 'warning') return 'border-red-200 bg-red-50';
    if (type === 'achievement') return 'border-green-200 bg-green-50';
    if (priority === 'high') return 'border-orange-200 bg-orange-50';
    return 'border-blue-200 bg-blue-50';
  };

  const getIconColor = (type: string, priority: string) => {
    if (type === 'warning') return 'text-red-600';
    if (type === 'achievement') return 'text-green-600';
    if (priority === 'high') return 'text-orange-600';
    return 'text-blue-600';
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage > 100) return 'text-red-600';
    if (percentage > 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Financial Insights</h2>
        <p className="text-gray-600 mt-1">AI-powered analysis of your spending patterns and recommendations</p>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className={`${getInsightColor(insight.type, insight.priority)} border-l-4`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white ${getIconColor(insight.type, insight.priority)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{insight.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'}>
                    {insight.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                
                {insight.savings && (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <DollarSign className="h-4 w-4" />
                    Potential annual savings: ${insight.savings}
                  </div>
                )}
                
                {insight.overspend && (
                  <div className="flex items-center gap-2 text-red-600 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    Over budget by: ${insight.overspend}
                  </div>
                )}
                
                {insight.progress && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Target className="h-4 w-4" />
                      Progress: {insight.progress}%
                    </div>
                    <Progress value={insight.progress} className="h-2" />
                  </div>
                )}
                
                {insight.potential && (
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    Available amount: ${insight.potential.toLocaleString()}
                  </div>
                )}
                
                <Button variant="outline" size="sm" className="mt-4">
                  Take Action
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-gray-900">{trend.category}</div>
                  <Badge variant="secondary">${trend.current.toLocaleString()}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {trend.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`font-medium ${
                    trend.change > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Health */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Health Check</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetHealth.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{budget.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      ${budget.spent} / ${budget.budget}
                    </span>
                    <span className={`font-medium ${getBudgetColor(budget.percentage)}`}>
                      {budget.percentage}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={Math.min(budget.percentage, 100)} 
                  className={`h-2 ${budget.percentage > 100 ? '[&>div]:bg-red-500' : ''}`}
                />
                {budget.percentage > 100 && (
                  <div className="text-sm text-red-600">
                    Over budget by ${budget.spent - budget.budget}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Score */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">78</div>
            <div className="text-lg text-gray-600">Good Financial Health</div>
            <Progress value={78} className="h-4 max-w-md mx-auto" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85</div>
                <div className="text-sm text-gray-600">Savings Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">72</div>
                <div className="text-sm text-gray-600">Budget Control</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">76</div>
                <div className="text-sm text-gray-600">Goal Progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}