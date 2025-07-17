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
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  account: string;
  payee: string;
  category: string;
  outflow: number;
  inflow: number;
  cleared: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-15',
    account: 'Chase Checking',
    payee: 'Grocery Store',
    category: 'Groceries',
    outflow: 85.50,
    inflow: 0,
    cleared: true
  },
  {
    id: '2',
    date: '2025-01-15',
    account: 'Credit Card',
    payee: 'Amazon',
    category: 'Shopping',
    outflow: 129.99,
    inflow: 0,
    cleared: false
  },
  {
    id: '3',
    date: '2025-01-14',
    account: 'Chase Checking',
    payee: 'Gas Station',
    category: 'Transportation',
    outflow: 45.00,
    inflow: 0,
    cleared: true
  },
  {
    id: '4',
    date: '2025-01-14',
    account: 'Savings Account',
    payee: 'Transfer from Checking',
    category: 'Transfer',
    outflow: 0,
    inflow: 500.00,
    cleared: true
  },
  {
    id: '5',
    date: '2025-01-13',
    account: 'Chase Checking',
    payee: 'Salary Deposit',
    category: 'Income',
    outflow: 0,
    inflow: 3200.00,
    cleared: false
  },
  {
    id: '6',
    date: '2025-01-12',
    account: 'Chase Checking',
    payee: 'Electric Company',
    category: 'Electric',
    outflow: 95.00,
    inflow: 0,
    cleared: true
  },
  {
    id: '7',
    date: '2025-01-12',
    account: 'Credit Card',
    payee: 'Restaurant',
    category: 'Restaurants',
    outflow: 67.50,
    inflow: 0,
    cleared: true
  },
  {
    id: '8',
    date: '2025-01-11',
    account: 'Cash',
    payee: 'Coffee Shop',
    category: 'Entertainment',
    outflow: 12.00,
    inflow: 0,
    cleared: true
  }
];

export function AllAccountsView() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAccountIcon = (accountName: string) => {
    if (accountName.includes('Credit')) return <CreditCard className="h-4 w-4" />;
    if (accountName.includes('Savings')) return <PiggyBank className="h-4 w-4" />;
    if (accountName.includes('Cash')) return <Wallet className="h-4 w-4" />;
    return <CreditCard className="h-4 w-4" />;
  };

  const getAccountColor = (accountName: string) => {
    if (accountName.includes('Credit')) return 'text-red-600 bg-red-100';
    if (accountName.includes('Savings')) return 'text-green-600 bg-green-100';
    if (accountName.includes('Cash')) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalInflow = transactions.reduce((sum, t) => sum + t.inflow, 0);
  const totalOutflow = transactions.reduce((sum, t) => sum + t.outflow, 0);
  const netFlow = totalInflow - totalOutflow;

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Accounts</h1>
          <p className="text-gray-600">View all transactions across your accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Inflow</p>
                <p className="text-xl font-bold text-green-600">
                  +{formatCurrency(totalInflow)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Outflow</p>
                <p className="text-xl font-bold text-red-600">
                  -{formatCurrency(totalOutflow)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                netFlow >= 0 ? "bg-green-100" : "bg-red-100"
              )}>
                <DollarSign className={cn(
                  "h-5 w-5",
                  netFlow >= 0 ? "text-green-600" : "text-red-600"
                )} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Flow</p>
                <p className={cn(
                  "text-xl font-bold",
                  netFlow >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Transactions</CardTitle>
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
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
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
                  <th className="text-left p-4 font-medium text-gray-600">Account</th>
                  <th className="text-left p-4 font-medium text-gray-600">Payee</th>
                  <th className="text-left p-4 font-medium text-gray-600">Category</th>
                  <th className="text-right p-4 font-medium text-gray-600">Outflow</th>
                  <th className="text-right p-4 font-medium text-gray-600">Inflow</th>
                  <th className="text-center p-4 font-medium text-gray-600">Status</th>
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
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-6 h-6 rounded flex items-center justify-center",
                          getAccountColor(transaction.account)
                        )}>
                          {getAccountIcon(transaction.account)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {transaction.account}
                        </span>
                      </div>
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
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}