import { GamificationDashboard } from './GamificationDashboard';
import { GamifiedTransactionForm } from './GamifiedTransactionForm';

export function GamificationView() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🎮 Gamification Hub
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Level up your financial journey! Complete challenges, earn achievements, 
          maintain streaks, and compete with others while building better money habits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GamificationDashboard />
        </div>
        
        <div className="space-y-6">
          <GamifiedTransactionForm />
          
          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <span className="text-sm">Check Budget</span>
                </div>
                <span className="text-xs text-gray-500">+25 XP</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <span className="text-sm">Add to Savings</span>
                </div>
                <span className="text-xs text-gray-500">+35 XP</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <span className="text-sm">Update Goal</span>
                </div>
                <span className="text-xs text-gray-500">+20 XP</span>
              </div>
            </div>
          </div>
          
          {/* Daily Challenge Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Today's Challenge
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <h4 className="font-medium text-sm mb-1">Log 3 Transactions</h4>
                <p className="text-xs text-gray-600 mb-2">Record at least 3 transactions today</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Progress: 1/3</div>
                  <div className="text-xs font-medium text-blue-600">+30 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}