import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  Trophy,
  Flame,
  Target,
  Zap,
  Gift,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GamificationHeader } from '@/components/gamification/GamificationHeader';
import { GamifiedTransactionForm } from '@/components/gamification/GamifiedTransactionForm';

interface CategoryGroup {
  id: string;
  name: string;
  categories: Category[];
  isExpanded: boolean;
}

interface Category {
  id: string;
  name: string;
  budgeted: number;
  activity: number;
  available: number;
}

const mockCategoryGroups: CategoryGroup[] = [
  {
    id: '1',
    name: 'Immediate Obligations',
    isExpanded: true,
    categories: [
      { id: '1', name: 'Rent/Mortgage', budgeted: 1200, activity: -1200, available: 0 },
      { id: '2', name: 'Electric', budgeted: 120, activity: -95, available: 25 },
      { id: '3', name: 'Water', budgeted: 60, activity: -55, available: 5 },
      { id: '4', name: 'Internet', budgeted: 80, activity: -80, available: 0 },
    ]
  },
  {
    id: '2',
    name: 'True Expenses',
    isExpanded: true,
    categories: [
      { id: '5', name: 'Car Insurance', budgeted: 100, activity: 0, available: 100 },
      { id: '6', name: 'Car Maintenance', budgeted: 50, activity: -25, available: 25 },
      { id: '7', name: 'Medical', budgeted: 200, activity: -150, available: 50 },
    ]
  },
  {
    id: '3',
    name: 'Quality of Life Goals',
    isExpanded: true,
    categories: [
      { id: '8', name: 'Groceries', budgeted: 400, activity: -350, available: 50 },
      { id: '9', name: 'Restaurants', budgeted: 200, activity: -180, available: 20 },
      { id: '10', name: 'Entertainment', budgeted: 150, activity: -120, available: 30 },
    ]
  },
  {
    id: '4',
    name: 'Just for Fun',
    isExpanded: false,
    categories: [
      { id: '11', name: 'Vacation', budgeted: 300, activity: 0, available: 300 },
      { id: '12', name: 'Hobbies', budgeted: 100, activity: -75, available: 25 },
    ]
  }
];

export function BudgetView() {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>(mockCategoryGroups);
  const [toBeBudgeted, setToBeBudgeted] = useState(250);
  const [currentMonth, setCurrentMonth] = useState('January 2025');
  const [showReward, setShowReward] = useState(false);
  const [rewardInfo, setRewardInfo] = useState<any>(null);

  const toggleGroup = (groupId: string) => {
    setCategoryGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  const updateCategoryBudget = (categoryId: string, amount: number) => {
    setCategoryGroups(groups =>
      groups.map(group => ({
        ...group,
        categories: group.categories.map(category =>
          category.id === categoryId
            ? { 
                ...category, 
                budgeted: amount,
                available: amount + category.activity
              }
            : category
        )
      }))
    );

    // Show gamification reward
    showBudgetReward();
  };

  const showBudgetReward = () => {
    const reward = {
      xp: 15,
      message: "Great job updating your budget!",
      badges: ['📊 Budget Optimizer']
    };
    
    setRewardInfo(reward);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAvailableColor = (available: number) => {
    if (available < 0) return 'text-red-600';
    if (available === 0) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getAvailableBg = (available: number) => {
    if (available < 0) return 'bg-red-50';
    if (available === 0) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const getBudgetHealthScore = () => {
    const totalCategories = categoryGroups.reduce((sum, group) => sum + group.categories.length, 0);
    const healthyCategories = categoryGroups.reduce((sum, group) => 
      sum + group.categories.filter(cat => cat.available >= 0).length, 0
    );
    return Math.round((healthyCategories / totalCategories) * 100);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-50 to-emerald-50 border-green-200';
    if (score >= 60) return 'from-yellow-50 to-orange-50 border-yellow-200';
    return 'from-red-50 to-pink-50 border-red-200';
  };

  const healthScore = getBudgetHealthScore();

  return (
    <div className="space-y-6">
      {/* Gamification Header */}
      <GamificationHeader />

      {/* Reward Animation */}
      {showReward && rewardInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-500">
          <Card className="p-6 text-center space-y-4 animate-in zoom-in duration-700 max-w-sm mx-4">
            <div className="text-4xl animate-bounce">🎉</div>
            <h3 className="text-xl font-bold text-primary">{rewardInfo.message}</h3>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">+{rewardInfo.xp} XP</span>
            </div>
            {rewardInfo.badges.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {rewardInfo.badges.map((badge: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Header with Gamification */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Budget
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Gamified
            </Badge>
          </h1>
          <p className="text-gray-600">{currentMonth}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={showBudgetReward}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category (+15 XP)
          </Button>
          <Button variant="outline" size="sm">
            Previous Month
          </Button>
          <Button variant="outline" size="sm">
            Next Month
          </Button>
        </div>
      </div>

      {/* Budget Health Score */}
      <Card className={`bg-gradient-to-r ${getHealthScoreBg(healthScore)}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center">
                <Trophy className={`h-6 w-6 ${getHealthScoreColor(healthScore)}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Budget Health Score</h3>
                <p className="text-sm text-gray-600">
                  {healthScore >= 80 ? "Excellent budget management!" : 
                   healthScore >= 60 ? "Good progress, keep it up!" : 
                   "Needs attention - some categories are overspent"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getHealthScoreColor(healthScore)}`}>
                {healthScore}%
              </div>
              <Progress value={healthScore} className="w-24 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* To Be Budgeted */}
          <Card className={cn(
            "border-2",
            toBeBudgeted > 0 ? "border-green-200 bg-green-50" : 
            toBeBudgeted < 0 ? "border-red-200 bg-red-50" : 
            "border-yellow-200 bg-yellow-50"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    toBeBudgeted > 0 ? "bg-green-100" : 
                    toBeBudgeted < 0 ? "bg-red-100" : 
                    "bg-yellow-100"
                  )}>
                    <DollarSign className={cn(
                      "h-6 w-6",
                      toBeBudgeted > 0 ? "text-green-600" : 
                      toBeBudgeted < 0 ? "text-red-600" : 
                      "text-yellow-600"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">To Be Budgeted</h3>
                    <p className="text-sm text-gray-600">
                      {toBeBudgeted > 0 ? "Ready to assign" : 
                       toBeBudgeted < 0 ? "Overbudgeted" : 
                       "All money assigned"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-2xl font-bold",
                    toBeBudgeted > 0 ? "text-green-600" : 
                    toBeBudgeted < 0 ? "text-red-600" : 
                    "text-yellow-600"
                  )}>
                    {formatCurrency(toBeBudgeted)}
                  </div>
                  {toBeBudgeted === 0 && (
                    <Badge variant="secondary" className="mt-1">
                      <Trophy className="w-3 h-3 mr-1" />
                      Perfect Balance!
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Categories */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Budget Categories</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>Update any category to earn XP!</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                <div>Category</div>
                <div className="text-center">Budgeted</div>
                <div className="text-center">Activity</div>
                <div className="text-center">Available</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {categoryGroups.map((group) => (
                <div key={group.id} className="border-b border-gray-100 last:border-b-0">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {group.isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="font-medium text-gray-900">{group.name}</span>
                      {group.categories.every(cat => cat.available >= 0) && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Healthy
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center w-20">
                        {formatCurrency(group.categories.reduce((sum, cat) => sum + cat.budgeted, 0))}
                      </div>
                      <div className="text-center w-20">
                        {formatCurrency(group.categories.reduce((sum, cat) => sum + cat.activity, 0))}
                      </div>
                      <div className="text-center w-20">
                        {formatCurrency(group.categories.reduce((sum, cat) => sum + cat.available, 0))}
                      </div>
                    </div>
                  </button>

                  {/* Categories */}
                  {group.isExpanded && (
                    <div className="bg-gray-50">
                      {group.categories.map((category) => (
                        <div
                          key={category.id}
                          className="px-6 py-3 grid grid-cols-4 gap-4 items-center hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-2 pl-6">
                            <span className="text-gray-700">{category.name}</span>
                            {category.available < 0 && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            {category.available > 0 && category.activity < 0 && (
                              <Badge variant="secondary" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Under budget
                              </Badge>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <Input
                              type="number"
                              value={category.budgeted}
                              onChange={(e) => updateCategoryBudget(category.id, Number(e.target.value))}
                              className="w-20 h-8 text-center text-sm"
                            />
                          </div>
                          
                          <div className="text-center">
                            <span className={cn(
                              "text-sm font-medium",
                              category.activity < 0 ? "text-red-600" : "text-green-600"
                            )}>
                              {formatCurrency(category.activity)}
                            </span>
                          </div>
                          
                          <div className="text-center">
                            <Badge
                              variant="secondary"
                              className={cn(
                                "font-medium",
                                getAvailableBg(category.available),
                                getAvailableColor(category.available)
                              )}
                            >
                              {formatCurrency(category.available)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Budgeted</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(categoryGroups.reduce((sum, group) => 
                        sum + group.categories.reduce((catSum, cat) => catSum + cat.budgeted, 0), 0
                      ))}
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
                    <p className="text-sm text-gray-600">Total Activity</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(categoryGroups.reduce((sum, group) => 
                        sum + group.categories.reduce((catSum, cat) => catSum + cat.activity, 0), 0
                      ))}
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
                    <p className="text-sm text-gray-600">Total Available</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(categoryGroups.reduce((sum, group) => 
                        sum + group.categories.reduce((catSum, cat) => catSum + cat.available, 0), 0
                      ))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar with Gamified Transaction Form */}
        <div className="space-y-6">
          <GamifiedTransactionForm />
          
          {/* Budget Achievements */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-500" />
                Budget Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <span className="text-sm">Zero-Based Budget</span>
                </div>
                <Badge variant={toBeBudgeted === 0 ? "default" : "secondary"}>
                  {toBeBudgeted === 0 ? "Unlocked!" : "Locked"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💚</span>
                  <span className="text-sm">All Categories Healthy</span>
                </div>
                <Badge variant={healthScore === 100 ? "default" : "secondary"}>
                  {healthScore === 100 ? "Unlocked!" : `${healthScore}%`}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm">Budget Master</span>
                </div>
                <Badge variant="secondary">
                  Coming Soon
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}