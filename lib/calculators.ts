export interface SIPResult {
  futureValue: number
  totalInvestment: number
  totalReturns: number
  yearlyBreakdown: Array<{
    year: number
    investment: number
    value: number
    returns: number
  }>
}

export interface LumpsumResult {
  futureValue: number
  totalInvestment: number
  totalReturns: number
  yearlyBreakdown: Array<{
    year: number
    investment: number
    value: number
    returns: number
  }>
}

export interface EMIResult {
  emi: number
  totalPayment: number
  totalInterest: number
  loanAmount: number
  yearlyBreakdown: Array<{
    year: number
    emi: number
    principal: number
    interest: number
    remainingBalance: number
  }>
}

export interface RetirementResult {
  corpusNeeded: number
  monthlySipNeeded: number
  futureMonthlyExpenses: number
  yearsToRetirement: number
  yearsInRetirement: number
}

export function calculateSIP(
  monthlyInvestment: number,
  annualReturn: number,
  timePeriod: number
): SIPResult {
  const monthlyRate = annualReturn / 100 / 12
  const totalMonths = timePeriod * 12
  
  let futureValue: number
  if (monthlyRate === 0) {
    futureValue = monthlyInvestment * totalMonths
  } else {
    futureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate)
  }
  
  const totalInvestment = monthlyInvestment * totalMonths
  const totalReturns = futureValue - totalInvestment
  
  // Calculate year-wise breakdown
  const yearlyBreakdown = []
  for (let year = 1; year <= timePeriod; year++) {
    const months = year * 12
    let yearValue: number
    if (monthlyRate === 0) {
      yearValue = monthlyInvestment * months
    } else {
      yearValue = monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
    }
    yearlyBreakdown.push({
      year,
      investment: monthlyInvestment * months,
      value: Math.round(yearValue * 100) / 100,
      returns: Math.round((yearValue - (monthlyInvestment * months)) * 100) / 100
    })
  }
  
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalInvestment: Math.round(totalInvestment * 100) / 100,
    totalReturns: Math.round(totalReturns * 100) / 100,
    yearlyBreakdown
  }
}

export function calculateLumpsum(
  investmentAmount: number,
  annualReturn: number,
  timePeriod: number
): LumpsumResult {
  const futureValue = investmentAmount * ((1 + annualReturn / 100) ** timePeriod)
  const totalReturns = futureValue - investmentAmount
  
  // Calculate year-wise breakdown
  const yearlyBreakdown = []
  for (let year = 1; year <= timePeriod; year++) {
    const yearValue = investmentAmount * ((1 + annualReturn / 100) ** year)
    yearlyBreakdown.push({
      year,
      investment: investmentAmount,
      value: Math.round(yearValue * 100) / 100,
      returns: Math.round((yearValue - investmentAmount) * 100) / 100
    })
  }
  
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalInvestment: Math.round(investmentAmount * 100) / 100,
    totalReturns: Math.round(totalReturns * 100) / 100,
    yearlyBreakdown
  }
}

export function calculateEMI(
  loanAmount: number,
  annualRate: number,
  tenureYears: number
): EMIResult {
  const monthlyRate = annualRate / 100 / 12
  const totalMonths = tenureYears * 12
  
  let emi: number
  if (monthlyRate === 0) {
    emi = loanAmount / totalMonths
  } else {
    emi = loanAmount * monthlyRate * ((1 + monthlyRate) ** totalMonths) / (((1 + monthlyRate) ** totalMonths) - 1)
  }
  
  const totalPayment = emi * totalMonths
  const totalInterest = totalPayment - loanAmount
  
  // Calculate year-wise breakdown
  const yearlyBreakdown = []
  let remainingPrincipal = loanAmount
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearInterest = 0
    let yearPrincipal = 0
    
    for (let month = 0; month < 12; month++) {
      if (remainingPrincipal <= 0) break
      
      const monthlyInterest = remainingPrincipal * monthlyRate
      const monthlyPrincipal = emi - monthlyInterest
      
      yearInterest += monthlyInterest
      yearPrincipal += monthlyPrincipal
      remainingPrincipal -= monthlyPrincipal
    }
    
    yearlyBreakdown.push({
      year,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(yearPrincipal * 100) / 100,
      interest: Math.round(yearInterest * 100) / 100,
      remainingBalance: Math.round(Math.max(0, remainingPrincipal) * 100) / 100
    })
  }
  
  return {
    emi: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    yearlyBreakdown
  }
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentExpenses: number,
  inflationRate: number,
  expectedReturn: number,
  lifeExpectancy: number = 85
): RetirementResult {
  const yearsToRetirement = retirementAge - currentAge
  const yearsInRetirement = lifeExpectancy - retirementAge
  
  // Future monthly expenses at retirement
  const futureMonthlyExpenses = currentExpenses * ((1 + inflationRate / 100) ** yearsToRetirement)
  
  // Annual expenses in retirement
  const annualExpensesRetirement = futureMonthlyExpenses * 12
  
  // Corpus needed at retirement (considering inflation during retirement)
  const realReturn = (expectedReturn - inflationRate) / 100
  let corpusNeeded: number
  if (realReturn <= 0) {
    corpusNeeded = annualExpensesRetirement * yearsInRetirement
  } else {
    corpusNeeded = annualExpensesRetirement * ((1 - (1 + realReturn) ** (-yearsInRetirement)) / realReturn)
  }
  
  // Monthly SIP needed
  const monthlyRate = expectedReturn / 100 / 12
  const monthsToRetirement = yearsToRetirement * 12
  
  let monthlySipNeeded: number
  if (monthlyRate === 0) {
    monthlySipNeeded = corpusNeeded / monthsToRetirement
  } else {
    monthlySipNeeded = corpusNeeded / (((1 + monthlyRate) ** monthsToRetirement - 1) / monthlyRate * (1 + monthlyRate))
  }
  
  return {
    corpusNeeded: Math.round(corpusNeeded * 100) / 100,
    monthlySipNeeded: Math.round(monthlySipNeeded * 100) / 100,
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses * 100) / 100,
    yearsToRetirement,
    yearsInRetirement
  }
}
