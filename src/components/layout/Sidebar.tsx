import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  CreditCard, 
  BarChart3, 
  MessageCircle,
  Gamepad2,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { id: 'budget', label: 'Budget', icon: Calculator },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
  { id: 'all-accounts', label: 'All Accounts', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'gamification', label: 'Gamification', icon: Gamepad2 },
  { id: 'ai-assistant', label: 'AI Assistant', icon: MessageCircle },
];

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    activeTab === item.id 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600">
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}