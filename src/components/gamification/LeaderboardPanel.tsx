import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal,
  Crown,
  Star,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import { blink } from '@/blink/client';

export function LeaderboardPanel() {
  const [leaderboard, setLeaderboard] = useState([
    { userId: '1', username: 'BudgetMaster2024', level: 15, totalXP: 3250, achievementsCount: 28, rank: 1 },
    { userId: '2', username: 'SavingsGuru', level: 12, totalXP: 2890, achievementsCount: 25, rank: 2 },
    { userId: '3', username: 'MoneyWizard', level: 11, totalXP: 2650, achievementsCount: 22, rank: 3 },
    { userId: '4', username: 'FinanceNinja', level: 10, totalXP: 2400, achievementsCount: 20, rank: 4 },
    { userId: '5', username: 'PennyPincher', level: 9, totalXP: 2150, achievementsCount: 18, rank: 5 },
    { userId: 'current', username: 'You', level: 5, totalXP: 1250, achievementsCount: 12, rank: 6 }
  ]);
  
  const [currentUser, setCurrentUser] = useState({ id: 'current' });
  const [activeTab, setActiveTab] = useState<'level' | 'xp' | 'achievements'>('level');
  const [loading, setLoading] = useState(false);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">👑 Champion</Badge>;
    if (rank <= 3) return <Badge className="bg-gray-500 text-white">🏆 Top 3</Badge>;
    if (rank <= 10) return <Badge variant="secondary">⭐ Top 10</Badge>;
    return null;
  };

  const getStatValue = (entry: any) => {
    switch (activeTab) {
      case 'level':
        return `Level ${entry.level}`;
      case 'xp':
        return `${entry.totalXP.toLocaleString()} XP`;
      case 'achievements':
        return `${entry.achievementsCount} achievements`;
      default:
        return `Level ${entry.level}`;
    }
  };

  const currentUserEntry = leaderboard.find(entry => entry.userId === currentUser?.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
        {currentUserEntry && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            Your rank: #{currentUserEntry.rank} of {leaderboard.length}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="level">Level</TabsTrigger>
            <TabsTrigger value="xp">Experience</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            {/* Current User Highlight */}
            {currentUserEntry && currentUserEntry.rank > 3 && (
              <Card className="mb-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(currentUserEntry.rank)}
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {currentUserEntry.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{currentUserEntry.username}</span>
                        <Badge variant="outline">You</Badge>
                        {getRankBadge(currentUserEntry.rank)}
                      </div>
                      <div className="text-sm text-gray-600">{getStatValue(currentUserEntry)}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">#{currentUserEntry.rank}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top 10 Leaderboard */}
            <div className="space-y-2">
              {leaderboard.slice(0, 10).map((entry, index) => {
                const isCurrentUser = entry.userId === currentUser?.id;
                
                return (
                  <Card 
                    key={entry.userId} 
                    className={`transition-all duration-200 hover:shadow-md ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20' 
                        : entry.rank <= 3 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                          : 'bg-white'
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 min-w-[60px]">
                          {getRankIcon(entry.rank)}
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={`text-sm ${
                              entry.rank === 1 ? 'bg-yellow-500 text-white' :
                              entry.rank === 2 ? 'bg-gray-400 text-white' :
                              entry.rank === 3 ? 'bg-amber-600 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {entry.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${entry.rank <= 3 ? 'text-gray-900' : 'text-gray-700'}`}>
                              {entry.username}
                            </span>
                            {isCurrentUser && <Badge variant="outline">You</Badge>}
                            {getRankBadge(entry.rank)}
                          </div>
                          <div className="text-sm text-gray-600">{getStatValue(entry)}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {activeTab === 'level' && (
                              <div className="text-xs text-gray-500">{entry.totalXP} XP</div>
                            )}
                            {activeTab === 'xp' && (
                              <div className="text-xs text-gray-500">Lvl {entry.level}</div>
                            )}
                            {activeTab === 'achievements' && (
                              <div className="text-xs text-gray-500">Lvl {entry.level}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Leaderboard Stats */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Leaderboard Stats
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-bold text-yellow-600">{leaderboard[0]?.level || 0}</div>
                  <div className="text-xs text-gray-500">Highest Level</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-bold text-purple-600">{leaderboard[0]?.totalXP.toLocaleString() || 0}</div>
                  <div className="text-xs text-gray-500">Most XP</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-bold text-green-600">{leaderboard[0]?.achievementsCount || 0}</div>
                  <div className="text-xs text-gray-500">Most Achievements</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="font-bold text-blue-600">{leaderboard.length}</div>
                  <div className="text-xs text-gray-500">Total Players</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}