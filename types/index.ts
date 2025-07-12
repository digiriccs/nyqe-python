export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  serviceInterest?: string
  message?: string
  investmentAmount?: number
  investmentTimeline?: string
  riskTolerance?: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  slug: string
  title?: string
  description?: string
  content?: string
  features?: any
  benefits?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Investment {
  id: string
  name: string
  slug: string
  category?: string
  riskLevel?: string
  minInvestment?: number
  expectedReturns?: string
  lockInPeriod?: string
  liquidity?: string
  taxBenefits: boolean
  description?: string
  features?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Partner {
  id: string
  name: string
  logoUrl?: string
  website?: string
  category?: string
  isFeatured: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CalculatorInputs {
  monthlyInvestment?: number
  investmentAmount?: number
  annualReturn?: number
  timePeriod?: number
  loanAmount?: number
  annualRate?: number
  tenureYears?: number
  currentAge?: number
  retirementAge?: number
  currentExpenses?: number
  inflationRate?: number
  expectedReturn?: number
}
