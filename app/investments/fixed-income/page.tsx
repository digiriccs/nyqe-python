'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building, 
  Shield, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Info,
  FileText,
  Percent
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function FixedIncomePage() {
  const fixedIncomeOptions = [
    {
      name: "Government Bonds",
      icon: Shield,
      expectedReturn: "6-8%",
      minInvestment: "₹1,000",
      tenure: "1-30 years",
      riskLevel: "Very Low",
      description: "Government securities backed by sovereign guarantee",
      features: [
        "Sovereign guarantee - highest safety",
        "Regular interest payments",
        "Variety of tenures available",
        "Tax benefits on certain bonds"
      ],
      benefits: [
        "Capital preservation with inflation protection",
        "Predictable income stream",
        "High liquidity in secondary market",
        "Tax-efficient options available"
      ],
      examples: ["G-Sec", "Treasury Bills", "Inflation-Indexed Bonds"],
      color: "bg-green-50 border-green-200"
    },
    {
      name: "Corporate Bonds",
      icon: Building,
      expectedReturn: "7-10%",
      minInvestment: "₹10,000",
      tenure: "1-10 years",
      riskLevel: "Low to Medium",
      description: "Debt securities issued by companies to raise capital",
      features: [
        "Higher yields than government bonds",
        "Credit rating based selection",
        "Various tenure options",
        "Regular coupon payments"
      ],
      benefits: [
        "Better returns than traditional FDs",
        "Professional credit analysis",
        "Diversification across sectors",
        "Listed and unlisted options"
      ],
      examples: ["AAA-rated Corporate Bonds", "Banking Bonds", "Infrastructure Bonds"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Fixed Deposits",
      icon: DollarSign,
      expectedReturn: "5-7%",
      minInvestment: "₹1,000",
      tenure: "7 days - 10 years",
      riskLevel: "Very Low",
      description: "Traditional bank deposits with guaranteed returns",
      features: [
        "Guaranteed returns",
        "Deposit insurance up to ₹5 lakh",
        "Flexible tenure options",
        "Premature withdrawal facility"
      ],
      benefits: [
        "Complete capital safety",
        "Easy online booking",
        "Senior citizen benefits",
        "Loan against FD facility"
      ],
      examples: ["Bank FDs", "Corporate FDs", "Tax-Saver FDs"],
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      name: "Debt Mutual Funds",
      icon: FileText,
      expectedReturn: "6-9%",
      minInvestment: "₹500",
      tenure: "Open-ended",
      riskLevel: "Low to Medium",
      description: "Professionally managed debt portfolios",
      features: [
        "Professional fund management",
        "Diversified debt portfolio",
        "Daily liquidity",
        "Various categories available"
      ],
      benefits: [
        "Better tax efficiency than FDs",
        "Professional interest rate management",
        "SIP facility available",
        "Lower expense ratios"
      ],
      examples: ["Liquid Funds", "Short Duration", "Corporate Bond Funds"],
      color: "bg-purple-50 border-purple-200"
    }
  ]

  const interestRateScenarios = [
    {
      scenario: "Rising Interest Rates",
      impact: "Bond prices fall, new bonds offer higher yields",
      strategy: "Invest in shorter duration bonds or wait for higher rates",
      suitability: "Short-term funds, floating rate bonds"
    },
    {
      scenario: "Falling Interest Rates", 
      impact: "Bond prices rise, existing bonds become valuable",
      strategy: "Lock in higher rates with longer duration bonds",
      suitability: "Long-term bonds, gilt funds"
    },
    {
      scenario: "Stable Interest Rates",
      impact: "Steady returns, minimal price volatility",
      strategy: "Balanced approach across durations",
      suitability: "Medium duration funds, accrual strategy"
    }
  ]

  const investmentLadder = [
    { maturity: "1 Year", allocation: "20%", purpose: "Liquidity needs" },
    { maturity: "2-3 Years", allocation: "30%", purpose: "Medium-term goals" },
    { maturity: "3-5 Years", allocation: "25%", purpose: "Long-term stability" },
    { maturity: "5+ Years", allocation: "25%", purpose: "Retirement corpus" }
  ]

  const creditRatings = [
    {
      rating: "AAA",
      description: "Highest Safety",
      riskLevel: "Minimal",
      examples: "Government bonds, top corporates"
    },
    {
      rating: "AA",
      description: "High Safety", 
      riskLevel: "Very Low",
      examples: "Large banks, established corporates"
    },
    {
      rating: "A",
      description: "Adequate Safety",
      riskLevel: "Low",
      examples: "Mid-size corporates with good track record"
    },
    {
      rating: "BBB",
      description: "Moderate Safety",
      riskLevel: "Medium",
      examples: "Investment grade with some risk"
    }
  ]

  const taxImplications = [
    {
      instrument: "Bank FDs",
      taxation: "Interest taxed as per income tax slab",
      tds: "TDS if interest > ₹40,000 (₹50,000 for seniors)",
      indexation: "Not applicable"
    },
    {
      instrument: "Government Bonds",
      taxation: "Interest taxed as income, capital gains on sale",
      tds: "TDS applicable on interest",
      indexation: "Available for LTCG after 3 years"
    },
    {
      instrument: "Corporate Bonds",
      taxation: "Interest as income, capital gains on sale", 
      tds: "TDS on interest payments",
      indexation: "Available for LTCG after 3 years"
    },
    {
      instrument: "Debt Mutual Funds",
      taxation: "Capital gains taxation, dividend taxation",
      tds: "No TDS on redemption",
      indexation: "Available for LTCG after 3 years"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[70vh] flex items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-secondary font-bold mb-6"
                variants={fadeInUp}
              >
                Fixed Income Investments
              </motion.h1>
              <motion.p 
                className="text-xl mb-6 opacity-90"
                variants={fadeInUp}
              >
                Secure your financial future with stable, predictable returns through 
                government bonds, corporate bonds, and other fixed income securities.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={fadeInUp}
              >
                <Badge className="bg-white/20 text-white">6-10% Stable Returns</Badge>
                <Badge className="bg-white/20 text-white">Capital Protection</Badge>
                <Badge className="bg-white/20 text-white">Regular Income</Badge>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/contact">
                    <Calendar className="mr-2 h-5 w-5" />
                    Start Investing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/calculators/fd">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    FD Calculator
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Current Interest Rates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>10-Year G-Sec</span>
                    <span className="text-accent font-bold">7.25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AAA Corporate Bonds</span>
                    <span className="text-accent font-bold">8.50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bank FDs (1 Year)</span>
                    <span className="text-accent font-bold">6.75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Debt Fund Average</span>
                    <span className="text-accent font-bold">7.80%</span>
                  </div>
                  <div className="text-xs opacity-75 mt-4">
                    *Indicative rates, subject to market conditions
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fixed Income Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
              Fixed Income Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a range of fixed income securities to match your risk tolerance and income needs
            </p>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {fixedIncomeOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`${option.color} border-2 overflow-hidden`}>
                    <div className="grid lg:grid-cols-4 gap-0">
                      <div className="lg:col-span-3 p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-secondary font-bold text-primary">
                              {option.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline">{option.expectedReturn} Returns</Badge>
                              <Badge variant="outline">Min: {option.minInvestment}</Badge>
                              <Badge variant="outline">{option.tenure}</Badge>
                              <Badge variant="outline">{option.riskLevel} Risk</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6">{option.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-primary mb-3">Key Features</h4>
                            <ul className="space-y-2">
                              {option.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-primary mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {option.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-semibold text-primary mb-3">Examples</h4>
                          <div className="flex flex-wrap gap-2">
                            {option.examples.map((example, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/50 p-8 flex flex-col justify-center">
                        <Button asChild className="w-full">
                          <Link href="/contact">
                            Invest Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Interest Rate Scenarios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
              Interest Rate Scenarios & Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding different interest rate environments helps optimize fixed income investments
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {interestRateScenarios.map((scenario, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">
                      {scenario.scenario}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Market Impact:</h5>
                        <p className="text-sm text-gray-600">{scenario.impact}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Investment Strategy:</h5>
                        <p className="text-sm text-gray-600">{scenario.strategy}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Best Suited For:</h5>
                        <p className="text-sm text-green-600 font-medium">{scenario.suitability}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investment Ladder Strategy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
                Bond Laddering Strategy
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Spread investments across different maturities to balance liquidity, 
                returns, and interest rate risk.
              </p>

              <div className="space-y-4">
                {investmentLadder.map((ladder, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {ladder.allocation}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{ladder.maturity}</h4>
                      <p className="text-sm text-gray-600">{ladder.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="p-8 bg-gradient-to-br from-secondary to-secondary-light text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    Benefits of Bond Laddering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Regular liquidity as bonds mature</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Reduced interest rate risk</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Reinvestment opportunities</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <BarChart3 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Diversified maturity profile</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credit Ratings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
              Understanding Credit Ratings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Credit ratings help assess the creditworthiness and risk level of fixed income investments
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {creditRatings.map((rating, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className={`text-3xl font-bold mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                      rating.rating === 'AAA' ? 'bg-green-100 text-green-600' :
                      rating.rating === 'AA' ? 'bg-blue-100 text-blue-600' :
                      rating.rating === 'A' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {rating.rating}
                    </div>
                    <CardTitle className="text-lg">
                      {rating.description}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge 
                      variant="outline" 
                      className={`mb-3 ${
                        rating.riskLevel === 'Minimal' ? 'border-green-200 text-green-600' :
                        rating.riskLevel === 'Very Low' ? 'border-blue-200 text-blue-600' :
                        rating.riskLevel === 'Low' ? 'border-yellow-200 text-yellow-600' :
                        'border-orange-200 text-orange-600'
                      }`}
                    >
                      {rating.riskLevel} Risk
                    </Badge>
                    <p className="text-sm text-gray-600">{rating.examples}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tax Implications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
              Tax Implications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding tax treatment helps optimize after-tax returns from fixed income investments
            </p>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Instrument</th>
                  <th className="px-6 py-4 text-left">Taxation</th>
                  <th className="px-6 py-4 text-left">TDS</th>
                  <th className="px-6 py-4 text-left">Indexation Benefit</th>
                </tr>
              </thead>
              <tbody>
                {taxImplications.map((tax, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{tax.instrument}</td>
                    <td className="px-6 py-4 text-sm">{tax.taxation}</td>
                    <td className="px-6 py-4 text-sm">{tax.tds}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={tax.indexation === "Available for LTCG after 3 years" ? "default" : "secondary"}>
                        {tax.indexation}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold mb-6">
              Secure Your Financial Future
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Build a stable income portfolio with carefully selected fixed income securities
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Fixed Income Portfolio
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/calculators/fd">
                  <Percent className="mr-2 h-5 w-5" />
                  Calculate FD Returns
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <Info className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> Fixed income investments are subject to interest rate risk, 
              credit risk, and inflation risk. Past performance is not indicative of future returns. 
              Government securities carry sovereign risk. Corporate bonds carry credit risk of the issuer. 
              Please read all offer documents carefully before investing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
