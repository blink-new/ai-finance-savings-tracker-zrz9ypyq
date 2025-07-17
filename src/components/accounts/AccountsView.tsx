import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  balance: number;
  workingBalance: number;
  clearedBalance: number;
}

interface Transaction {
  id: string;
  date: string;
  payee: string;
  category: string;
  outflow: number;
  inflow: number;
  cleared: boolean;
  balance: number;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Chase Checking',
    type: 'checking',
    balance: 2450.00,
    workingBalance: 2450.00,
    clearedBalance: 2350.00
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 8750.00,
    workingBalance: 8750.00,
    clearedBalance: 8750.00
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1250.00,
    workingBalance: -1250.00,
    clearedBalance: -1150.00
  },
  {
    id: '4',
    name: 'Cash',
    type: 'cash',
    balance: 120.00,
    workingBalance: 120.00,
    clearedBalance: 120.00
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-15',
    payee: 'Grocery Store',
    category: 'Groceries',
    outflow: 85.50,
    inflow: 0,
    cleared: true,
    balance: 2364.50
  },
  {
    id: '2',
    date: '2025-01-14',
    payee: 'Gas Station',
    category: 'Transportation',
    outflow: 45.00,
    inflow: 0,
    cleared: true,
    balance: 2450.00
  },
  {
    id: '3',
    date: '2025-01-13',
    payee: 'Salary Deposit',
    category: 'Income',
    outflow: 0,
    inflow: 3200.00,
    cleared: false,
    balance: 2495.00
  },
  {
    id: '4',
    date: '2025-01-12',
    payee: 'Electric Company',
    category: 'Electric',
    outflow: 95.00,
    inflow: 0,
    cleared: true,
    balance: -705.00
  }
];

export function AccountsView() {
  const [selectedAccount, setSelectedAccount] = useState<Account>(mockAccounts[0]);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <CreditCard className="h-5 w-5" />;
      case 'savings':
        return <PiggyBank className="h-5 w-5" />;
      case 'credit':
        return <CreditCard className="h-5 w-5" />;
      case 'cash':
        return <Wallet className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'text-blue-600 bg-blue-100';
      case 'savings':
        return 'text-green-600 bg-green-100';
      case 'credit':
        return 'text-red-600 bg-red-100';
      case 'cash':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-600">Manage your accounts and transactions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Accounts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {mockAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => setSelectedAccount(account)}
                  className={cn(
                    "w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
                    selectedAccount.id === account.id && "bg-blue-50 border-r-2 border-r-blue-500"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        getAccountTypeColor(account.type)
                      )}>
                        {getAccountIcon(account.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{account.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{account.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-semibold",
                        account.balance >= 0 ? "text-gray-900" : "text-red-600"
                      )}>
                        {account.balance < 0 && "-"}{formatCurrency(account.balance)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Working: {account.workingBalance < 0 && "-"}{formatCurrency(account.workingBalance)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Assets</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(mockAccounts
                      .filter(acc => acc.balance > 0)
                      .reduce((sum, acc) => sum + acc.balance, 0)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Liabilities</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(mockAccounts
                      .filter(acc => acc.balance < 0)
                      .reduce((sum, acc) => sum + Math.abs(acc.balance), 0)
                    )}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Net Worth</span>
                    <span className="font-bold text-lg text-gray-900">
                      {formatCurrency(mockAccounts.reduce((sum, acc) => sum + acc.balance, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Details & Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    getAccountTypeColor(selectedAccount.type)
                  )}>
                    {getAccountIcon(selectedAccount.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedAccount.name}</h2>
                    <p className="text-gray-600 capitalize">{selectedAccount.type} Account</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Working Balance</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    selectedAccount.workingBalance >= 0 ? "text-gray-900" : "text-red-600"
                  )}>
                    {selectedAccount.workingBalance < 0 && "-"}{formatCurrency(selectedAccount.workingBalance)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-gray-600">Cleared Balance</p>
                  <p className="font-semibold text-gray-900">
                    {selectedAccount.clearedBalance < 0 && "-"}{formatCurrency(selectedAccount.clearedBalance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Uncleared</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(selectedAccount.workingBalance - selectedAccount.clearedBalance)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transactions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Date</th>
                      <th className="text-left p-4 font-medium text-gray-600">Payee</th>
                      <th className="text-left p-4 font-medium text-gray-600">Category</th>
                      <th className="text-right p-4 font-medium text-gray-600">Outflow</th>
                      <th className="text-right p-4 font-medium text-gray-600">Inflow</th>
                      <th className="text-center p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Balance</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{transaction.payee}</span>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          {transaction.outflow > 0 && (
                            <span className="text-red-600 font-medium">
                              -{formatCurrency(transaction.outflow)}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {transaction.inflow > 0 && (
                            <span className="text-green-600 font-medium">
                              +{formatCurrency(transaction.inflow)}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {transaction.cleared ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-500 mx-auto" />
                          )}
                        </td>
                        <td className="p-4 text-right font-medium text-gray-900">
                          {transaction.balance < 0 && "-"}{formatCurrency(transaction.balance)}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}