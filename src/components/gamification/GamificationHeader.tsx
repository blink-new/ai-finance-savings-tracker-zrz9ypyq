import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { blink } from '@/blink/client';

export function GamificationHeader() {
  const [userLevel, setUserLevel] = useState({
    currentLevel: 5,
    currentXP: 350,
    totalXP: 1250,
    nextLevelXP: 500,
    title: 'Money Manager'
  });
  
  const [gameStats, setGameStats] = useState({
    totalPoints: 1850,
    achievementsUnlocked: 12,
    totalAchievements: 50,
    longestStreak: 14,
    challengesCompleted: 8
  });
  
  const [showLevelUp, setShowLevelUp] = useState(false);

  const addXP = async (amount: number) => {
    const newCurrentXP = userLevel.currentXP + amount;
    const newTotalXP = userLevel.totalXP + amount;
    
    let newLevel = userLevel.currentLevel;
    let newNextLevelXP = userLevel.nextLevelXP;
    let leveledUp = false;

    // Check for level up
    if (newCurrentXP >= userLevel.nextLevelXP) {
      newLevel += 1;
      newNextLevelXP = newLevel * 100 + 50; // Progressive XP requirement
      leveledUp = true;
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }

    setUserLevel({
      ...userLevel,
      currentLevel: newLevel,
      currentXP: leveledUp ? newCurrentXP - userLevel.nextLevelXP : newCurrentXP,
      totalXP: newTotalXP,
      nextLevelXP: newNextLevelXP,
      title: getLevelTitle(newLevel)
    });
  };

  const getLevelTitle = (level: number) => {
    const titles = [
      'Budget Beginner', 'Penny Pincher', 'Savings Starter', 'Money Manager',
      'Budget Boss', 'Financial Guru', 'Wealth Wizard', 'Money Master',
      'Financial Legend', 'Budget Deity'
    ];
    return titles[Math.min(level - 1, titles.length - 1)] || 'Budget Master';
  };

  const xpProgress = (userLevel.currentXP / userLevel.nextLevelXP) * 100;
  const activeStreak = 7; // Mock data

  return (
    <>
      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-500">
          <Card className="p-8 text-center space-y-4 animate-in zoom-in duration-700">
            <div className="text-6xl animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-primary">Level Up!</h2>
            <p className="text-xl">You've reached Level {userLevel.currentLevel}!</p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {userLevel.title}
            </Badge>
          </Card>
        </div>
      )}

      {/* Gamification Header */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Level & XP */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {userLevel.currentLevel}
              </div>
              <div className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                <Star className="w-3 h-3" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{userLevel.title}</h3>
              <div className="flex items-center gap-2">
                <Progress value={xpProgress} className="w-32 h-2" />
                <span className="text-sm text-gray-600">
                  {userLevel.currentXP}/{userLevel.nextLevelXP} XP
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{gameStats.totalPoints} pts</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">
                {gameStats.achievementsUnlocked}/{gameStats.totalAchievements}
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">{activeStreak} day streak</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/50 rounded-lg px-3 py-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{gameStats.challengesCompleted} challenges</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => addXP(10)}
              className="flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              +10 XP
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}