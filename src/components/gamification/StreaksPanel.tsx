import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, 
  Calendar,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  Zap,
  Trophy
} from 'lucide-react';
import { blink } from '@/blink/client';

export function StreaksPanel() {
  const [streaks, setStreaks] = useState([
    {
      id: '1',
      type: 'daily_budget_check',
      currentStreak: 7,
      longestStreak: 14,
      lastActivityDate: '2025-01-17',
      isActive: true
    },
    {
      id: '2',
      type: 'transaction_logging',
      currentStreak: 3,
      longestStreak: 8,
      lastActivityDate: '2025-01-17',
      isActive: true
    },
    {
      id: '3',
      type: 'goal_progress',
      currentStreak: 0,
      longestStreak: 5,
      lastActivityDate: '2025-01-15',
      isActive: false
    },
    {
      id: '4',
      type: 'savings_deposit',
      currentStreak: 2,
      longestStreak: 12,
      lastActivityDate: '2025-01-16',
      isActive: false
    }
  ]);
  
  const [loading, setLoading] = useState(false);

  const getStreakInfo = (type: string) => {
    const streakTypes = {
      daily_budget_check: {
        title: 'Daily Budget Check',
        description: 'Check your budget every day',
        icon: '📊',
        color: 'text-blue-500'
      },
      transaction_logging: {
        title: 'Transaction Logging',
        description: 'Log transactions daily',
        icon: '📝',
        color: 'text-green-500'
      },
      goal_progress: {
        title: 'Goal Progress',
        description: 'Make progress on goals daily',
        icon: '🎯',
        color: 'text-purple-500'
      },
      savings_deposit: {
        title: 'Savings Deposit',
        description: 'Save money every day',
        icon: '💰',
        color: 'text-yellow-500'
      }
    };

    return streakTypes[type] || {
      title: 'Unknown Streak',
      description: 'Unknown streak type',
      icon: '❓',
      color: 'text-gray-500'
    };
  };

  const isStreakActive = (streak: any) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    return streak.lastActivityDate === today || streak.lastActivityDate === yesterdayStr;
  };

  const getStreakStatus = (streak: any) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (streak.lastActivityDate === today) {
      return { status: 'completed', color: 'text-green-600', text: 'Completed today!' };
    } else if (isStreakActive(streak)) {
      return { status: 'active', color: 'text-orange-600', text: 'Keep it going!' };
    } else {
      return { status: 'broken', color: 'text-red-600', text: 'Streak broken' };
    }
  };

  const getStreakReward = (streakLength: number) => {
    if (streakLength >= 30) return { xp: 100, badge: '🏆 Consistency Master' };
    if (streakLength >= 14) return { xp: 50, badge: '🔥 On Fire' };
    if (streakLength >= 7) return { xp: 25, badge: '⭐ Week Warrior' };
    if (streakLength >= 3) return { xp: 10, badge: '💪 Getting Started' };
    return { xp: 5, badge: null };
  };

  const updateStreak = async (streakId: string) => {
    try {
      setStreaks(prev => prev.map(streak => {
        if (streak.id === streakId) {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newCurrentStreak = streak.currentStreak;
          let newLongestStreak = streak.longestStreak;

          // Check if this is a continuation of the streak
          if (streak.lastActivityDate === yesterdayStr) {
            newCurrentStreak += 1;
          } else if (streak.lastActivityDate !== today) {
            // Starting a new streak
            newCurrentStreak = 1;
          }

          // Update longest streak if current is higher
          if (newCurrentStreak > newLongestStreak) {
            newLongestStreak = newCurrentStreak;
          }

          return {
            ...streak,
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastActivityDate: today,
            isActive: true
          };
        }
        return streak;
      }));
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const activeStreaks = streaks.filter(s => isStreakActive(s));
  const totalCurrentStreak = streaks.reduce((sum, s) => sum + s.currentStreak, 0);
  const longestOverallStreak = Math.max(...streaks.map(s => s.longestStreak), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          Streaks ({activeStreaks.length} active)
        </CardTitle>
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Total: {totalCurrentStreak} days
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            Best: {longestOverallStreak} days
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streaks.map((streak) => {
            const info = getStreakInfo(streak.type);
            const status = getStreakStatus(streak);
            const reward = getStreakReward(streak.currentStreak);
            const isActive = isStreakActive(streak);

            return (
              <Card 
                key={streak.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  isActive ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200' : 'bg-gray-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <h4 className="font-semibold">{info.title}</h4>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                      
                      {isActive && (
                        <Flame className="w-6 h-6 text-red-500 animate-pulse" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{streak.currentStreak}</div>
                        <div className="text-xs text-gray-500">Current</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{streak.longestStreak}</div>
                        <div className="text-xs text-gray-500">Best</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{reward.xp}</div>
                        <div className="text-xs text-gray-500">XP</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className={`text-sm font-medium ${status.color}`}>
                        {status.text}
                      </div>
                      
                      {reward.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {reward.badge}
                        </Badge>
                      )}
                      
                      {streak.lastActivityDate && (
                        <div className="text-xs text-gray-500">
                          Last activity: {new Date(streak.lastActivityDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateStreak(streak.id)}
                        className="flex-1"
                        disabled={streak.lastActivityDate === new Date().toISOString().split('T')[0]}
                      >
                        {streak.lastActivityDate === new Date().toISOString().split('T')[0] 
                          ? <CheckCircle className="w-4 h-4" />
                          : <Zap className="w-4 h-4" />
                        }
                        {streak.lastActivityDate === new Date().toISOString().split('T')[0] 
                          ? 'Done Today' 
                          : 'Mark Complete'
                        }
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Streak Milestones */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-600" />
            Streak Milestones
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-2 bg-white rounded border">
              <div className="font-bold text-gray-600">3 Days</div>
              <div className="text-xs text-gray-500">💪 Getting Started</div>
            </div>
            <div className="text-center p-2 bg-white rounded border">
              <div className="font-bold text-blue-600">7 Days</div>
              <div className="text-xs text-gray-500">⭐ Week Warrior</div>
            </div>
            <div className="text-center p-2 bg-white rounded border">
              <div className="font-bold text-purple-600">14 Days</div>
              <div className="text-xs text-gray-500">🔥 On Fire</div>
            </div>
            <div className="text-center p-2 bg-white rounded border">
              <div className="font-bold text-yellow-600">30 Days</div>
              <div className="text-xs text-gray-500">🏆 Consistency Master</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}