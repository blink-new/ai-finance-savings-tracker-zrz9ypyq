import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GamificationHeader } from './GamificationHeader';
import { AchievementsPanel } from './AchievementsPanel';
import { ChallengesPanel } from './ChallengesPanel';
import { StreaksPanel } from './StreaksPanel';
import { LeaderboardPanel } from './LeaderboardPanel';
import { 
  Trophy, 
  Target, 
  Flame, 
  Users,
  Gamepad2
} from 'lucide-react';

export function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Always show the gamification header */}
      <GamificationHeader />
      
      {/* Gamification Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="streaks" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">Streaks</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AchievementsPanel />
            <ChallengesPanel />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StreaksPanel />
            <LeaderboardPanel />
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <AchievementsPanel />
        </TabsContent>
        
        <TabsContent value="challenges">
          <ChallengesPanel />
        </TabsContent>
        
        <TabsContent value="streaks">
          <StreaksPanel />
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <LeaderboardPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}