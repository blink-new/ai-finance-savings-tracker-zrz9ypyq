import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BudgetView } from '@/components/budget/BudgetView';
import { AccountsView } from '@/components/accounts/AccountsView';
import { AllAccountsView } from '@/components/accounts/AllAccountsView';
import { ReportsView } from '@/components/reports/ReportsView';
import { GamificationView } from '@/components/gamification/GamificationView';
import { AIChat } from '@/components/chat/AIChat';
import { blink } from '@/blink/client';

function App() {
  const [activeTab, setActiveTab] = useState('budget');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setIsLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">$</span>
          </div>
          <div className="text-xl font-semibold text-gray-900">YNAB-Style Budget</div>
          <div className="text-gray-600">Loading your budget dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">$</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">YNAB-Style Budget</h1>
            <p className="text-gray-600">
              Take control of your finances with envelope budgeting. Give every dollar a job 
              and break the paycheck-to-paycheck cycle.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Envelope-style category budgeting
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Real-time transaction tracking
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              AI-powered financial insights
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Please sign in to access your budget
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <BudgetView />;
      case 'accounts':
        return <AccountsView />;
      case 'all-accounts':
        return <AllAccountsView />;
      case 'reports':
        return <ReportsView />;
      case 'gamification':
        return <GamificationView />;
      case 'ai-assistant':
        return <AIChat />;
      default:
        return <BudgetView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={handleMenuToggle} 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;