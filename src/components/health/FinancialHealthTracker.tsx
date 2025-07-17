import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  Briefcase,
  Shield,
  Target,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { blink } from '@/blink/client';
import { FinancialHealthAssessment, HealthQuestion } from '@/types';

const healthQuestions: HealthQuestion[] = [
  // Income & Employment
  {
    id: 'monthly_income',
    category: 'Income & Employment',
    question: 'What is your monthly take-home income?',
    type: 'number',
    required: true,
    weight: 15
  },
  {
    id: 'income_stability',
    category: 'Income & Employment',
    question: 'How stable is your income?',
    type: 'select',
    options: ['Very stable (salary)', 'Mostly stable (regular freelance)', 'Somewhat variable', 'Very variable'],
    required: true,
    weight: 10
  },
  {
    id: 'employment_status',
    category: 'Income & Employment',
    question: 'What is your employment status?',
    type: 'select',
    options: ['Full-time employed', 'Part-time employed', 'Self-employed', 'Unemployed', 'Retired', 'Student'],
    required: true,
    weight: 8
  },

  // Expenses & Budgeting
  {
    id: 'monthly_expenses',
    category: 'Expenses & Budgeting',
    question: 'What are your total monthly expenses?',
    type: 'number',
    required: true,
    weight: 15
  },
  {
    id: 'budget_tracking',
    category: 'Expenses & Budgeting',
    question: 'Do you track your expenses and follow a budget?',
    type: 'select',
    options: ['Yes, religiously', 'Yes, most of the time', 'Sometimes', 'Rarely', 'Never'],
    required: true,
    weight: 8
  },
  {
    id: 'housing_cost_ratio',
    category: 'Expenses & Budgeting',
    question: 'What percentage of your income goes to housing (rent/mortgage)?',
    type: 'select',
    options: ['Less than 25%', '25-30%', '30-40%', '40-50%', 'More than 50%'],
    required: true,
    weight: 12
  },

  // Savings & Emergency Fund
  {
    id: 'emergency_fund',
    category: 'Savings & Emergency Fund',
    question: 'How many months of expenses can your emergency fund cover?',
    type: 'select',
    options: ['6+ months', '3-6 months', '1-3 months', 'Less than 1 month', 'No emergency fund'],
    required: true,
    weight: 20
  },
  {
    id: 'savings_rate',
    category: 'Savings & Emergency Fund',
    question: 'What percentage of your income do you save each month?',
    type: 'select',
    options: ['20% or more', '15-20%', '10-15%', '5-10%', 'Less than 5%', 'I don\'t save'],
    required: true,
    weight: 15
  },

  // Debt Management
  {
    id: 'total_debt',
    category: 'Debt Management',
    question: 'What is your total debt amount (excluding mortgage)?',
    type: 'number',
    required: true,
    weight: 12
  },
  {
    id: 'credit_card_debt',
    category: 'Debt Management',
    question: 'Do you carry credit card debt month to month?',
    type: 'select',
    options: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Always'],
    required: true,
    weight: 10
  },
  {
    id: 'debt_to_income',
    category: 'Debt Management',
    question: 'What percentage of your income goes to debt payments?',
    type: 'select',
    options: ['Less than 10%', '10-20%', '20-30%', '30-40%', 'More than 40%'],
    required: true,
    weight: 12
  },

  // Assets & Net Worth
  {
    id: 'net_worth',
    category: 'Assets & Net Worth',
    question: 'What is your estimated net worth?',
    type: 'number',
    required: true,
    weight: 10
  },
  {
    id: 'retirement_savings',
    category: 'Assets & Net Worth',
    question: 'Are you contributing to retirement savings?',
    type: 'select',
    options: ['Yes, maximizing contributions', 'Yes, contributing regularly', 'Yes, but irregularly', 'Planning to start soon', 'Not contributing'],
    required: true,
    weight: 15
  },
  {
    id: 'investment_portfolio',
    category: 'Assets & Net Worth',
    question: 'Do you have investments outside of retirement accounts?',
    type: 'select',
    options: ['Yes, diversified portfolio', 'Yes, some investments', 'Planning to start', 'No investments'],
    required: true,
    weight: 8
  },

  // Insurance & Protection
  {
    id: 'health_insurance',
    category: 'Insurance & Protection',
    question: 'Do you have adequate health insurance?',
    type: 'boolean',
    required: true,
    weight: 8
  },
  {
    id: 'life_insurance',
    category: 'Insurance & Protection',
    question: 'Do you have life insurance (if you have dependents)?',
    type: 'select',
    options: ['Yes, adequate coverage', 'Yes, some coverage', 'No, but planning to get', 'No, don\'t need it', 'Not applicable'],
    required: true,
    weight: 6
  },

  // Financial Goals & Planning
  {
    id: 'financial_goals',
    category: 'Financial Goals & Planning',
    question: 'Do you have clear financial goals and a plan to achieve them?',
    type: 'select',
    options: ['Yes, detailed plan', 'Yes, general goals', 'Some goals, no plan', 'No clear goals'],
    required: true,
    weight: 8
  },
  {
    id: 'financial_knowledge',
    category: 'Financial Goals & Planning',
    question: 'How would you rate your financial knowledge?',
    type: 'select',
    options: ['Expert', 'Good', 'Average', 'Below average', 'Poor'],
    required: true,
    weight: 5
  }
];

export function FinancialHealthTracker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [assessment, setAssessment] = useState<FinancialHealthAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadPreviousAssessment();
    }
  }, [user]);

  const loadPreviousAssessment = async () => {
    try {
      const savedAssessment = localStorage.getItem(`financial_health_${user.id}`);
      if (savedAssessment) {
        const assessment = JSON.parse(savedAssessment);
        setAssessment(assessment);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error loading previous assessment:', error);
    }
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let totalWeight = 0;

    healthQuestions.forEach(question => {
      const response = responses[question.id];
      if (response !== undefined && response !== '') {
        let questionScore = 0;
        
        switch (question.id) {
          case 'monthly_income':
            questionScore = Math.min(100, (parseFloat(response) / 5000) * 100);
            break;
          case 'income_stability':
            const stabilityScores = { 'Very stable (salary)': 100, 'Mostly stable (regular freelance)': 80, 'Somewhat variable': 60, 'Very variable': 30 };
            questionScore = stabilityScores[response as keyof typeof stabilityScores] || 0;
            break;
          case 'employment_status':
            const employmentScores = { 'Full-time employed': 100, 'Part-time employed': 70, 'Self-employed': 80, 'Unemployed': 20, 'Retired': 90, 'Student': 60 };
            questionScore = employmentScores[response as keyof typeof employmentScores] || 0;
            break;
          case 'monthly_expenses':
            const income = parseFloat(responses.monthly_income) || 0;
            const expenses = parseFloat(response) || 0;
            if (income > 0) {
              const ratio = expenses / income;
              questionScore = Math.max(0, 100 - (ratio * 100));
            }
            break;
          case 'budget_tracking':
            const budgetScores = { 'Yes, religiously': 100, 'Yes, most of the time': 80, 'Sometimes': 60, 'Rarely': 30, 'Never': 0 };
            questionScore = budgetScores[response as keyof typeof budgetScores] || 0;
            break;
          case 'housing_cost_ratio':
            const housingScores = { 'Less than 25%': 100, '25-30%': 80, '30-40%': 60, '40-50%': 30, 'More than 50%': 10 };
            questionScore = housingScores[response as keyof typeof housingScores] || 0;
            break;
          case 'emergency_fund':
            const emergencyScores = { '6+ months': 100, '3-6 months': 80, '1-3 months': 60, 'Less than 1 month': 30, 'No emergency fund': 0 };
            questionScore = emergencyScores[response as keyof typeof emergencyScores] || 0;
            break;
          case 'savings_rate':
            const savingsScores = { '20% or more': 100, '15-20%': 85, '10-15%': 70, '5-10%': 50, 'Less than 5%': 25, 'I don\'t save': 0 };
            questionScore = savingsScores[response as keyof typeof savingsScores] || 0;
            break;
          case 'total_debt':
            const income2 = parseFloat(responses.monthly_income) || 0;
            const debt = parseFloat(response) || 0;
            if (income2 > 0) {
              const debtToIncomeRatio = debt / (income2 * 12);
              questionScore = Math.max(0, 100 - (debtToIncomeRatio * 50));
            }
            break;
          case 'credit_card_debt':
            const ccScores = { 'Never': 100, 'Rarely': 80, 'Sometimes': 60, 'Usually': 30, 'Always': 0 };
            questionScore = ccScores[response as keyof typeof ccScores] || 0;
            break;
          case 'debt_to_income':
            const dtiScores = { 'Less than 10%': 100, '10-20%': 80, '20-30%': 60, '30-40%': 30, 'More than 40%': 10 };
            questionScore = dtiScores[response as keyof typeof dtiScores] || 0;
            break;
          case 'net_worth':
            const netWorth = parseFloat(response) || 0;
            questionScore = Math.min(100, Math.max(0, (netWorth + 50000) / 1000));
            break;
          case 'retirement_savings':
            const retirementScores = { 'Yes, maximizing contributions': 100, 'Yes, contributing regularly': 80, 'Yes, but irregularly': 60, 'Planning to start soon': 30, 'Not contributing': 0 };
            questionScore = retirementScores[response as keyof typeof retirementScores] || 0;
            break;
          case 'investment_portfolio':
            const investmentScores = { 'Yes, diversified portfolio': 100, 'Yes, some investments': 70, 'Planning to start': 40, 'No investments': 0 };
            questionScore = investmentScores[response as keyof typeof investmentScores] || 0;
            break;
          case 'health_insurance':
            questionScore = response === true ? 100 : 0;
            break;
          case 'life_insurance':
            const lifeScores = { 'Yes, adequate coverage': 100, 'Yes, some coverage': 70, 'No, but planning to get': 40, 'No, don\'t need it': 80, 'Not applicable': 80 };
            questionScore = lifeScores[response as keyof typeof lifeScores] || 0;
            break;
          case 'financial_goals':
            const goalsScores = { 'Yes, detailed plan': 100, 'Yes, general goals': 70, 'Some goals, no plan': 40, 'No clear goals': 0 };
            questionScore = goalsScores[response as keyof typeof goalsScores] || 0;
            break;
          case 'financial_knowledge':
            const knowledgeScores = { 'Expert': 100, 'Good': 80, 'Average': 60, 'Below average': 40, 'Poor': 20 };
            questionScore = knowledgeScores[response as keyof typeof knowledgeScores] || 0;
            break;
          default:
            questionScore = 50;
        }

        totalScore += questionScore * question.weight;
        totalWeight += question.weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  };

  const getHealthStatus = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (score >= 80) return 'excellent';
    if (score >= 65) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  };

  const generateRecommendations = (score: number, responses: Record<string, any>): string[] => {
    const recommendations: string[] = [];

    // Emergency fund recommendations
    if (responses.emergency_fund === 'No emergency fund' || responses.emergency_fund === 'Less than 1 month') {
      recommendations.push('Build an emergency fund covering 3-6 months of expenses as your top priority.');
    }

    // Savings rate recommendations
    if (responses.savings_rate === 'Less than 5%' || responses.savings_rate === 'I don\'t save') {
      recommendations.push('Increase your savings rate to at least 10-15% of your income.');
    }

    // Debt recommendations
    if (responses.credit_card_debt === 'Always' || responses.credit_card_debt === 'Usually') {
      recommendations.push('Focus on paying off high-interest credit card debt immediately.');
    }

    // Housing cost recommendations
    if (responses.housing_cost_ratio === 'More than 50%' || responses.housing_cost_ratio === '40-50%') {
      recommendations.push('Consider reducing housing costs - they should ideally be under 30% of income.');
    }

    // Budget tracking recommendations
    if (responses.budget_tracking === 'Never' || responses.budget_tracking === 'Rarely') {
      recommendations.push('Start tracking your expenses and create a monthly budget.');
    }

    // Retirement savings recommendations
    if (responses.retirement_savings === 'Not contributing' || responses.retirement_savings === 'Planning to start soon') {
      recommendations.push('Begin contributing to retirement accounts immediately - time is your biggest asset.');
    }

    // Insurance recommendations
    if (responses.health_insurance === false) {
      recommendations.push('Obtain adequate health insurance coverage to protect against medical expenses.');
    }

    // Investment recommendations
    if (responses.investment_portfolio === 'No investments' && score > 50) {
      recommendations.push('Consider starting an investment portfolio for long-term wealth building.');
    }

    // Financial education recommendations
    if (responses.financial_knowledge === 'Poor' || responses.financial_knowledge === 'Below average') {
      recommendations.push('Invest time in improving your financial literacy through books, courses, or advisors.');
    }

    // Goals recommendations
    if (responses.financial_goals === 'No clear goals') {
      recommendations.push('Set specific, measurable financial goals with deadlines.');
    }

    // General recommendations based on score
    if (score < 50) {
      recommendations.push('Focus on the basics: emergency fund, debt reduction, and expense tracking.');
    } else if (score < 70) {
      recommendations.push('You\'re on the right track! Focus on optimizing your savings and investment strategy.');
    } else {
      recommendations.push('Great job! Consider advanced strategies like tax optimization and estate planning.');
    }

    return recommendations.slice(0, 6); // Limit to top 6 recommendations
  };

  const submitAssessment = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const score = calculateScore();
      const status = getHealthStatus(score);
      const recommendations = generateRecommendations(score, responses);

      const newAssessment: FinancialHealthAssessment = {
        id: `assessment_${Date.now()}`,
        userId: user.id,
        score,
        status,
        responses,
        recommendations,
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for now
      localStorage.setItem(`financial_health_${user.id}`, JSON.stringify(newAssessment));

      setAssessment(newAssessment);
      setShowResults(true);
    } catch (error) {
      console.error('Error saving assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewAssessment = () => {
    setCurrentStep(0);
    setResponses({});
    setAssessment(null);
    setShowResults(false);
  };

  const nextStep = () => {
    if (currentStep < healthQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAssessment();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = healthQuestions[currentStep];
  const progress = ((currentStep + 1) / healthQuestions.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Income & Employment': return <Briefcase className="h-5 w-5" />;
      case 'Expenses & Budgeting': return <CreditCard className="h-5 w-5" />;
      case 'Savings & Emergency Fund': return <PiggyBank className="h-5 w-5" />;
      case 'Debt Management': return <TrendingDown className="h-5 w-5" />;
      case 'Assets & Net Worth': return <TrendingUp className="h-5 w-5" />;
      case 'Insurance & Protection': return <Shield className="h-5 w-5" />;
      case 'Financial Goals & Planning': return <Target className="h-5 w-5" />;
      default: return <DollarSign className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'good': return <TrendingUp className="h-6 w-6 text-blue-600" />;
      case 'fair': return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'poor': return <TrendingDown className="h-6 w-6 text-red-600" />;
      default: return <Heart className="h-6 w-6 text-gray-600" />;
    }
  };

  if (showResults && assessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Health Assessment</h1>
            <p className="text-gray-600 mt-2">Your comprehensive financial wellness report</p>
          </div>
          <Button onClick={startNewAssessment} variant="outline">
            Retake Assessment
          </Button>
        </div>

        {/* Health Score Card */}
        <Card className="border-2">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getStatusIcon(assessment.status)}
              <CardTitle className="text-2xl">Financial Health Score</CardTitle>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">{assessment.score}</div>
              <Badge className={`text-lg px-4 py-2 ${getStatusColor(assessment.status)}`}>
                {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)} Health
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={assessment.score} className="h-3 mb-4" />
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <div className="space-y-1">
                <div className="text-red-600 font-medium">Poor</div>
                <div className="text-gray-500">0-49</div>
              </div>
              <div className="space-y-1">
                <div className="text-yellow-600 font-medium">Fair</div>
                <div className="text-gray-500">50-64</div>
              </div>
              <div className="space-y-1">
                <div className="text-blue-600 font-medium">Good</div>
                <div className="text-gray-500">65-79</div>
              </div>
              <div className="space-y-1">
                <div className="text-green-600 font-medium">Excellent</div>
                <div className="text-gray-500">80-100</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Action items to improve your financial health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessment.recommendations.map((recommendation, index) => (
                <Alert key={index}>
                  <ArrowRight className="h-4 w-4" />
                  <AlertDescription className="font-medium">
                    {recommendation}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Assessment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Completed:</span>
                <div>{new Date(assessment.completedAt).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Questions Answered:</span>
                <div>{Object.keys(assessment.responses).length} of {healthQuestions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financial Health Assessment</h1>
        <p className="text-gray-600 mt-2">
          Answer questions about your financial situation to get personalized insights and recommendations
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span>{currentStep + 1} of {healthQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {getCategoryIcon(currentQuestion.category)}
            <Badge variant="secondary">{currentQuestion.category}</Badge>
          </div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          {currentQuestion.required && (
            <CardDescription className="text-red-600">* Required</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Input */}
          <div className="space-y-4">
            {currentQuestion.type === 'number' && (
              <div>
                <Label htmlFor="response">Amount ($)</Label>
                <Input
                  id="response"
                  type="number"
                  placeholder="Enter amount"
                  value={responses[currentQuestion.id] || ''}
                  onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                />
              </div>
            )}

            {currentQuestion.type === 'select' && (
              <div>
                <Label>Select an option</Label>
                <Select
                  value={responses[currentQuestion.id] || ''}
                  onValueChange={(value) => handleResponse(currentQuestion.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentQuestion.type === 'boolean' && (
              <div>
                <Label>Choose an option</Label>
                <RadioGroup
                  value={responses[currentQuestion.id]?.toString() || ''}
                  onValueChange={(value) => handleResponse(currentQuestion.id, value === 'true')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          <Separator />

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={
                currentQuestion.required && 
                (responses[currentQuestion.id] === undefined || responses[currentQuestion.id] === '')
              }
              className="min-w-24"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : currentStep === healthQuestions.length - 1 ? (
                'Complete Assessment'
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assessment Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(new Set(healthQuestions.map(q => q.category))).map((category) => {
              const categoryQuestions = healthQuestions.filter(q => q.category === category);
              const answeredCount = categoryQuestions.filter(q => 
                responses[q.id] !== undefined && responses[q.id] !== ''
              ).length;
              
              return (
                <div key={category} className="flex items-center gap-3 p-3 rounded-lg border">
                  {getCategoryIcon(category)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{category}</div>
                    <div className="text-xs text-gray-500">
                      {answeredCount}/{categoryQuestions.length} completed
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}