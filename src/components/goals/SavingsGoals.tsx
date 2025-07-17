import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const savingsGoals = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6800,
    targetDate: '2024-12-31',
    category: 'Emergency',
    color: 'bg-red-500'
  },
  {
    id: '2',
    title: 'Vacation to Japan',
    targetAmount: 5000,
    currentAmount: 2100,
    targetDate: '2024-08-15',
    category: 'Travel',
    color: 'bg-blue-500'
  },
  {
    id: '3',
    title: 'New Car Down Payment',
    targetAmount: 8000,
    currentAmount: 3200,
    targetDate: '2024-10-01',
    category: 'Transportation',
    color: 'bg-green-500'
  },
  {
    id: '4',
    title: 'Home Renovation',
    targetAmount: 15000,
    currentAmount: 4500,
    targetDate: '2025-03-01',
    category: 'Home',
    color: 'bg-purple-500'
  }
];

export function SavingsGoals() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    category: ''
  });

  const handleCreateGoal = () => {
    // Here you would typically save to database
    console.log('Creating goal:', newGoal);
    setIsDialogOpen(false);
    setNewGoal({ title: '', targetAmount: '', targetDate: '', category: '' });
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Savings Goals</h2>
          <p className="text-gray-600 mt-1">Track your progress towards financial milestones</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Emergency Fund"
                />
              </div>
              <div>
                <Label htmlFor="amount">Target Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label htmlFor="date">Target Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateGoal} className="w-full">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsGoals.map((goal) => {
          const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const monthlyRequired = Math.ceil((goal.targetAmount - goal.currentAmount) / Math.max(daysRemaining / 30, 1));

          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${goal.color}`} />
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">{goal.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {goal.category}
                    </Badge>
                  </div>
                  <Target className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Saved</span>
                  </div>
                  <span className="font-semibold">
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Target Date</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Days Remaining */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Days Remaining</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    daysRemaining < 30 ? 'text-red-600' : daysRemaining < 90 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {daysRemaining} days
                  </span>
                </div>

                {/* Monthly Required */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-1">Monthly savings needed</div>
                  <div className="text-lg font-bold text-primary">
                    ${monthlyRequired.toLocaleString()}/month
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Add Money
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Goals Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{savingsGoals.length}</div>
              <div className="text-sm text-gray-600">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {((savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0) / 
                   savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}