import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Lock, 
  Star,
  Target,
  Flame,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';
import { blink } from '@/blink/client';

export function AchievementsPanel() {
  const [achievements, setAchievements] = useState([
    {
      id: '1',
      title: 'First Budget',
      description: 'Create your first budget category',
      icon: '📊',
      category: 'budgeting',
      points: 50,
      rarity: 'common',
      isUnlocked: true,
      progress: 1,
      maxProgress: 1,
      unlockedAt: '2025-01-15T10:30:00.000Z'
    },
    {
      id: '2',
      title: 'Budget Master',
      description: 'Create 10 budget categories',
      icon: '🎯',
      category: 'budgeting',
      points: 200,
      rarity: 'rare',
      isUnlocked: false,
      progress: 4,
      maxProgress: 10
    },
    {
      id: '3',
      title: 'First Savings',
      description: 'Save your first $100',
      icon: '💰',
      category: 'saving',
      points: 100,
      rarity: 'common',
      isUnlocked: true,
      progress: 100,
      maxProgress: 100,
      unlockedAt: '2025-01-14T15:20:00.000Z'
    },
    {
      id: '4',
      title: 'Spending Tracker',
      description: 'Log 50 transactions',
      icon: '📝',
      category: 'spending',
      points: 150,
      rarity: 'common',
      isUnlocked: false,
      progress: 23,
      maxProgress: 50
    },
    {
      id: '5',
      title: 'Daily Habit',
      description: 'Check your budget for 7 days straight',
      icon: '🔥',
      category: 'streak',
      points: 200,
      rarity: 'rare',
      isUnlocked: true,
      progress: 7,
      maxProgress: 7,
      unlockedAt: '2025-01-16T09:00:00.000Z'
    },
    {
      id: '6',
      title: 'Emergency Fund',
      description: 'Build a $5,000 emergency fund',
      icon: '🛡️',
      category: 'saving',
      points: 1000,
      rarity: 'epic',
      isUnlocked: false,
      progress: 1200,
      maxProgress: 5000
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const ACHIEVEMENT_CATEGORIES = {
    budgeting: { name: 'Budgeting', color: '#3B82F6', icon: '📊' },
    saving: { name: 'Saving', color: '#10B981', icon: '💰' },
    spending: { name: 'Spending', color: '#F59E0B', icon: '💳' },
    goals: { name: 'Goals', color: '#8B5CF6', icon: '🎯' },
    streak: { name: 'Streaks', color: '#EF4444', icon: '🔥' },
    milestone: { name: 'Milestones', color: '#06B6D4', icon: '🏆' }
  };

  const RARITY_COLORS = {
    common: '#6B7280',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B'
  };

  const unlockAchievement = async (achievementId: string) => {
    try {
      setAchievements(prev => prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, isUnlocked: true, unlockedAt: new Date().toISOString() }
          : achievement
      ));
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements ({unlockedCount}/{totalCount})
        </CardTitle>
        <Progress value={(unlockedCount / totalCount) * 100} className="w-full" />
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {category.icon}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${
                    achievement.isUnlocked 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    {/* Rarity indicator */}
                    <div 
                      className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent"
                      style={{ borderBottomColor: RARITY_COLORS[achievement.rarity] }}
                    />
                    
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.isUnlocked ? achievement.icon : '🔒'}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold ${achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h4>
                          {achievement.isUnlocked && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        
                        <p className={`text-sm ${achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                        
                        {!achievement.isUnlocked && achievement.maxProgress > 1 && (
                          <div className="space-y-1">
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                            <p className="text-xs text-gray-500">
                              {achievement.progress}/{achievement.maxProgress}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="secondary" 
                            style={{ backgroundColor: RARITY_COLORS[achievement.rarity] + '20' }}
                          >
                            {achievement.rarity}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star className="w-3 h-3" />
                            {achievement.points}
                          </div>
                        </div>
                        
                        {achievement.isUnlocked && achievement.unlockedAt && (
                          <p className="text-xs text-green-600">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}