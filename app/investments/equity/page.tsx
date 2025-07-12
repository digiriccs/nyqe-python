'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Coins,
  Building,
  Zap,
  Shield,
  Calendar,
  Star,
  ArrowRight,
  Info,
  DollarSign,
  PieChart
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

export default function EquityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const equityCategories = [
    {
      name: "Large Cap Stocks",
      icon: Building,
      marketCap: "₹20,000+ Cr",
      riskLevel: "Low to Medium",
      expectedReturn: "10-14%",
      characteristics: [
        "Established companies with strong fundamentals",
        "Lower volatility compared to mid and small caps",
        "Regular dividend payments",
        "High liquidity and easy exit"
      ],
      examples: ["Reliance Industries", "TCS", "HDFC Bank", "Infosys"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Mid Cap Stocks",
      icon: TrendingUp,
      marketCap: "₹5,000-20,000 Cr",
      riskLevel: "Medium to High",
      expectedReturn: "12-18%",
      characteristics: [
        "Companies with growth potential",
        "Moderate volatility with higher returns",
        "Emerging market leaders",
        "Good liquidity in most cases"
      ],
      examples: ["Bajaj Finance", "SBI Life", "Godrej Consumer", "Pidilite"],
      color: "bg-green-50 border-green-200"
    },
    {
      name: "Small Cap Stocks",
      icon: Zap,
      marketCap: "Below ₹5,000 Cr",
      riskLevel: "High",
      expectedReturn: "15-25%",
      characteristics: [
        "High growth potential companies",
        "Higher volatility and risk",
        "Early-stage growth stories",
        "Limited liquidity"
      ],
      examples: ["DMart", "Page Industries", "Astral Poly", "Relaxo Footwear"],
      color: "bg-purple-50 border-purple-200"
    }
  ]

  const investmentApproaches = [
    {
      title: "Value Investing",
      description: "Buying undervalued stocks with strong fundamentals",
      icon: Target,
      timeHorizon: "Long-term (5+ years)",
      riskLevel: "Medium",
      suitableFor: "Patient investors seeking steady growth",
      keyMetrics: ["P/E Ratio", "P/B Ratio", "Debt-to-Equity", "ROE"]
    },
    {
      title: "Growth Investing", 
      description: "Investing in companies with high growth potential",
      icon: TrendingUp,
      timeHorizon: "Medium to Long-term (3-7 years)",
      riskLevel: "High",
      suitableFor: "Investors seeking higher returns",
      keyMetrics: ["Revenue Growth", "Earnings Growth", "Market Share", "Innovation"]
    },
    {
      title: "Dividend Investing",
      description: "Focus on stocks that pay regular dividends",
      icon: DollarSign,
      timeHorizon: "Long-term (5+ years)",
      riskLevel: "Low to Medium", 
      suitableFor: "Income-seeking investors",
      keyMetrics: ["Dividend Yield", "Payout Ratio", "Dividend Growth", "Stability"]
    }
  ]

  const sectors = [
    { name: "Technology", weight: "18%", examples: "TCS, Infosys, HCL Tech", performance: "+15.2%" },
    { name: "Financial Services", weight: "16%", examples: "HDFC Bank, ICICI Bank", performance: "+12.8%" },
    { name: "Consumer Goods", weight: "14%", examples: "HUL, Nestle, ITC", performance: "+10.5%" },
    { name: "Healthcare", weight: "12%", examples: "Sun Pharma, Dr. Reddy's", performance: "+18.3%" },
    { name: "Energy", weight: "10%", examples: "Reliance, ONGC, BPCL", performance: "+8.7%" },
    { name: "Others", weight: "30%", examples: "Infrastructure, Metals", performance: "+11.2%" }
  ]

  const riskFactors = [
    {
      title: "Market Risk",
      description: "Overall market movements affecting stock prices",
      mitigation: "Diversification across sectors and market caps"
    },
    {
      title: "Company-Specific Risk",
      description: "Individual company performance and management decisions",
      mitigation: "Fundamental analysis and regular monitoring"
    },
    {
      title: "Liquidity Risk",
      description: "Difficulty in buying or selling stocks quickly",
      mitigation: "Focus on large and mid-cap stocks with good volumes"
    },
    {
      title: "Volatility Risk",
      description: "Short-term price fluctuations",
      mitigation: "Long-term investment horizon and SIP approach"
    }
  ]

  const investmentProcess = [
    {
      step: "1",
      title: "Research & Analysis",
      description: "Fundamental and technical analysis of companies and sectors"
    },
    {
      step: "2",
      title: "Portfolio Construction", 
      description: "Diversified portfolio creation based on risk tolerance"
    },
    {
      step: "3",
      title: "Execution",
      description: "Systematic investment through lumpsum or SIP"
    },
    {
      step: "4",
      title: "Monitoring",
      description: "Regular review and rebalancing of the portfolio"
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
                Direct Equity
              </motion.h1>
              <motion.p 
                className="text-xl mb-6 opacity-90"
                variants={fadeInUp}
              >
                Build long-term wealth through carefully selected individual stocks and 
                equity portfolios designed for maximum growth potential.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={fadeInUp}
              >
                <Badge className="bg-white/20 text-white">12-20% Expected Returns</Badge>
                <Badge className="bg-white/20 text-white">₹5,000 Minimum</Badge>
                <Badge className="bg-white/20 text-white">High Growth Potential</Badge>
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
                  <Link href="/calculators/lumpsum">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Calculate Returns
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
                <h3 className="text-2xl font-semibold mb-6">Market Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Nifty 50</span>
                    <span className="text-accent font-bold">+12.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nifty Midcap 100</span>
                    <span className="text-accent font-bold">+18.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nifty Smallcap 100</span>
                    <span className="text-accent font-bold">+24.1%</span>
                  </div>
                  <div className="text-xs opacity-75 mt-4">
                    *1-year returns as of latest data
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equity Categories */}
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
              Equity Investment Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from different market capitalizations based on your risk appetite and return expectations
            </p>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {equityCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`${category.color} border-2 overflow-hidden`}>
                    <div className="grid lg:grid-cols-4 gap-0">
                      <div className="lg:col-span-3 p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-secondary font-bold text-primary">
                              {category.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline">Market Cap: {category.marketCap}</Badge>
                              <Badge variant="outline">{category.riskLevel} Risk</Badge>
                              <Badge variant="outline">{category.expectedReturn} Returns</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-primary mb-3">Characteristics</h4>
                            <ul className="space-y-2">
                              {category.characteristics.map((char, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {char}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-primary mb-3">Example Companies</h4>
                            <div className="flex flex-wrap gap-2">
                              {category.examples.map((example, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
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

      {/* Investment Approaches */}
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
              Investment Approaches
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different strategies to invest in equity markets based on your investment philosophy
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {investmentApproaches.map((approach, index) => {
              const Icon = approach.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-secondary">
                        {approach.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{approach.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Time Horizon:</span>
                          <span className="font-medium">{approach.timeHorizon}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Risk Level:</span>
                          <Badge variant="outline" className="text-xs">{approach.riskLevel}</Badge>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-semibold text-sm mb-2">Suitable For:</h5>
                        <p className="text-sm text-gray-600">{approach.suitableFor}</p>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-semibold text-sm mb-2">Key Metrics:</h5>
                        <div className="flex flex-wrap gap-1">
                          {approach.keyMetrics.map((metric, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Sector Allocation */}
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
              Sector-wise Market Composition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding market composition helps in building a diversified equity portfolio
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {sectors.map((sector, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-primary">{sector.name}</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary">{sector.weight}</div>
                        <div className={`text-sm font-medium ${sector.performance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {sector.performance}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{sector.examples}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Risk Management */}
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
              Risk Management in Equity Investing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding and managing risks is crucial for successful equity investing
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {riskFactors.map((risk, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-red-500" />
                      <span>{risk.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{risk.description}</p>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                      <h5 className="font-semibold text-green-800 mb-2">Mitigation Strategy:</h5>
                      <p className="text-green-700 text-sm">{risk.mitigation}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investment Process */}
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
              Our Equity Investment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to equity investing for optimal results
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {investmentProcess.map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 font-secondary">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
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
              Start Your Equity Investment Journey
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Build long-term wealth through carefully selected equity investments
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Investing
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/calculators">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Investment Calculators
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
              <strong>Disclaimer:</strong> Equity investments are subject to market risks and volatility. 
              Past performance is not indicative of future returns. Stock prices can go up or down 
              significantly. Please consider your risk tolerance and consult with a qualified financial 
              advisor before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
