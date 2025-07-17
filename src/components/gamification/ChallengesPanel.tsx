import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Clock, 
  Trophy,
  Star,
  Calendar,
  CheckCircle,
  Play,
  Gift
} from 'lucide-react';
import { blink } from '@/blink/client';
import { Challenge } from '@/types/gamification';

export function ChallengesPanel() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'available'>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const user = await blink.auth.me();
      if (!user) return;

      // For demo purposes, create mock challenges
      const mockChallenges = [
        {
          id: '1',
          userId: user.id,
          title: 'Daily Budget Check',
          description: 'Review your budget categories and spending',
          type: 'daily' as const,
          category: 'budgeting',
          target: 1,
          progress: 0,
          reward: { xp: 25, points: 10 },
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          isCompleted: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          userId: user.id,
          title: 'Log 3 Transactions',
          description: 'Record at least 3 transactions today',
          type: 'daily' as const,
          category: 'spending',
          target: 3,
          progress: 1,
          reward: { xp: 30, points: 15 },
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          isCompleted: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          userId: user.id,
          title: 'Weekly Spending Review',
          description: 'Stay within budget in at least 5 categories this week',
          type: 'weekly' as const,
          category: 'budgeting',
          target: 5,
          progress: 3,
          reward: { xp: 100, points: 50, badge: 'Budget Master' },
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isCompleted: false,
          createdAt: new Date().toISOString()
        }
      ];
      
      setChallenges(mockChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeChallenge = async (challengeId: string) => {
    try {
      setChallenges(prev => prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, isCompleted: true, completedAt: new Date().toISOString() }
          : challenge
      ));
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  const updateProgress = async (challengeId: string, newProgress: number) => {
    try {
      setChallenges(prev => prev.map(challenge => {
        if (challenge.id === challengeId) {
          const isCompleted = newProgress >= challenge.target;
          return {
            ...challenge,
            progress: newProgress,
            isCompleted,
            completedAt: isCompleted ? new Date().toISOString() : challenge.completedAt
          };
        }
        return challenge;
      }));
    } catch (error) {
      console.error('Error updating challenge progress:', error);
    }
  };

  const getFilteredChallenges = () => {
    const now = new Date();
    
    switch (activeTab) {
      case 'active':
        return challenges.filter(c => !c.isCompleted && new Date(c.endDate) > now);
      case 'completed':
        return challenges.filter(c => c.isCompleted);
      case 'available':
        return challenges.filter(c => !c.isCompleted && new Date(c.startDate) <= now);
      default:
        return challenges;
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      case 'monthly': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Challenges...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const filteredChallenges = getFilteredChallenges();
  const activeChallenges = challenges.filter(c => !c.isCompleted && new Date(c.endDate) > new Date());
  const completedChallenges = challenges.filter(c => c.isCompleted);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Challenges ({activeChallenges.length} active, {completedChallenges.length} completed)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredChallenges.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeTab} challenges found</p>
                </div>
              ) : (
                filteredChallenges.map((challenge) => (
                  <Card key={challenge.id} className={`transition-all duration-200 hover:shadow-md ${
                    challenge.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{challenge.title}</h4>
                            {challenge.isCompleted && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          
                          <p className="text-gray-600">{challenge.description}</p>
                          
                          <div className="flex items-center gap-4">
                            <Badge className={getChallengeTypeColor(challenge.type)}>
                              {challenge.type}
                            </Badge>
                            
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {getTimeRemaining(challenge.endDate)}
                            </div>
                          </div>
                          
                          {!challenge.isCompleted && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span>{challenge.progress}/{challenge.target}</span>
                              </div>
                              <Progress 
                                value={(challenge.progress / challenge.target) * 100} 
                                className="h-2"
                              />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {challenge.reward.xp} XP
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Trophy className="w-4 h-4 text-purple-500" />
                              {challenge.reward.points} points
                            </div>
                            {challenge.reward.badge && (
                              <div className="flex items-center gap-1 text-sm">
                                <Gift className="w-4 h-4 text-pink-500" />
                                {challenge.reward.badge}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {!challenge.isCompleted && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => updateProgress(challenge.id, challenge.progress + 1)}
                                disabled={challenge.progress >= challenge.target}
                              >
                                +1 Progress
                              </Button>
                              {challenge.progress >= challenge.target && (
                                <Button 
                                  size="sm" 
                                  variant="default"
                                  onClick={() => completeChallenge(challenge.id)}
                                >
                                  Complete
                                </Button>
                              )}
                            </>
                          )}
                          
                          {challenge.isCompleted && challenge.completedAt && (
                            <div className="text-xs text-green-600 text-center">
                              Completed<br/>
                              {new Date(challenge.completedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}