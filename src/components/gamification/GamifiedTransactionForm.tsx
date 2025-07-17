import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Minus,
  Star,
  Zap,
  Trophy,
  Target,
  Sparkles,
  Gift
} from 'lucide-react';
import { blink } from '@/blink/client';

interface GamifiedTransactionFormProps {
  onTransactionAdded?: () => void;
}

export function GamifiedTransactionForm({ onTransactionAdded }: GamifiedTransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [rewardInfo, setRewardInfo] = useState<any>(null);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    setIsSubmitting(true);
    
    try {
      const user = await blink.auth.me();
      if (!user) return;

      // Simulate transaction creation (in real app, this would save to database)
      console.log('Creating transaction:', {
        userId: user.id,
        amount: parseFloat(amount),
        description,
        category,
        type,
        date: new Date().toISOString(),
        accountId: 'default',
        cleared: true
      });

      // Calculate rewards
      const reward = calculateReward(parseFloat(amount), type, category);
      setRewardInfo(reward);
      setShowReward(true);
      
      // Hide reward after 3 seconds
      setTimeout(() => setShowReward(false), 3000);

      // Reset form
      setAmount('');
      setDescription('');
      setCategory('');
      
      // Notify parent
      onTransactionAdded?.();
      
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateReward = (amount: number, type: string, category: string) => {
    let baseXP = 5;
    let bonus = 0;
    let badges = [];
    
    // Base XP for logging transaction
    if (type === 'expense') {
      baseXP = 10;
      if (amount < 10) {
        bonus += 5;
        badges.push('💰 Small Spender');
      } else if (amount > 100) {
        bonus += 15;
        badges.push('🎯 Big Purchase Tracked');
      }
    } else {
      baseXP = 15;
      badges.push('💸 Income Logged');
    }
    
    // Category bonuses
    if (category === 'Food & Dining' && amount < 20) {
      bonus += 5;
      badges.push('🍽️ Mindful Dining');
    }
    
    if (category === 'Transportation' && amount < 50) {
      bonus += 5;
      badges.push('🚗 Smart Commuter');
    }
    
    return {
      xp: baseXP + bonus,
      badges,
      message: `Great job tracking your ${type}!`
    };
  };

  return (
    <>
      {/* Reward Animation */}
      {showReward && rewardInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-500">
          <Card className="p-6 text-center space-y-4 animate-in zoom-in duration-700 max-w-sm mx-4">
            <div className="text-4xl animate-bounce">🎉</div>
            <h3 className="text-xl font-bold text-primary">Transaction Logged!</h3>
            <p className="text-gray-600">{rewardInfo.message}</p>
            
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">+{rewardInfo.xp} XP</span>
            </div>
            
            {rewardInfo.badges.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Badges Earned:</p>
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

      {/* Transaction Form */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Add Transaction
            <Badge variant="secondary" className="ml-auto">
              +5-20 XP
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === 'expense' ? 'default' : 'outline'}
                onClick={() => setType('expense')}
                className="flex-1 flex items-center gap-2"
              >
                <Minus className="w-4 h-4" />
                Expense
              </Button>
              <Button
                type="button"
                variant={type === 'income' ? 'default' : 'outline'}
                onClick={() => setType('income')}
                className="flex-1 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Income
              </Button>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full flex items-center gap-2"
              disabled={isSubmitting || !amount || !description || !category}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Add Transaction & Earn XP
                </>
              )}
            </Button>

            {/* Gamification Hints */}
            <div className="mt-4 p-3 bg-white/50 rounded-lg border border-primary/10">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                <Gift className="w-4 h-4 text-purple-500" />
                Earning Tips
              </h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>Log expenses: +10 XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-green-500" />
                  <span>Log income: +15 XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-purple-500" />
                  <span>Small purchases (&lt;$10): +5 bonus XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-blue-500" />
                  <span>Track daily for streak bonuses!</span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}