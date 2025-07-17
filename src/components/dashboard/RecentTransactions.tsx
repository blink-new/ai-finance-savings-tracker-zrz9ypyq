import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';

const recentTransactions = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 5200,
    type: 'income',
    category: 'Salary',
    date: '2024-01-15',
    time: '09:00 AM'
  },
  {
    id: '2',
    description: 'Grocery Shopping',
    amount: -120.50,
    type: 'expense',
    category: 'Food & Dining',
    date: '2024-01-14',
    time: '02:30 PM'
  },
  {
    id: '3',
    description: 'Netflix Subscription',
    amount: -15.99,
    type: 'expense',
    category: 'Entertainment',
    date: '2024-01-14',
    time: '12:00 PM'
  },
  {
    id: '4',
    description: 'Freelance Payment',
    amount: 800,
    type: 'income',
    category: 'Freelance',
    date: '2024-01-13',
    time: '04:15 PM'
  },
  {
    id: '5',
    description: 'Gas Station',
    amount: -45.20,
    type: 'expense',
    category: 'Transportation',
    date: '2024-01-13',
    time: '08:45 AM'
  }
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {transaction.date} • {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
}