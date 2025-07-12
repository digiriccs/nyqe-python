'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChartPie, 
  TrendingUp, 
  Shield, 
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  Star,
  ArrowRight,
  Info
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

export default function MutualFundsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Funds', count: 150 },
    { id: 'equity', name: 'Equity Funds', count: 60 },
    { id: 'debt', name: 'Debt Funds', count: 40 },
    { id: 'hybrid', name: 'Hybrid Funds', count: 35 },
    { id: 'elss', name: 'ELSS Funds', count: 15 }
  ]

  const features = [
    {
      icon: PieChart,
      title: "Instant Diversification",
      description: "Invest in a diversified portfolio of stocks or bonds with a single investment"
    },
    {
      icon: Target,
      title: "Professional Management", 
      description: "Experienced fund managers make investment decisions on your behalf"
    },
    {
      icon: DollarSign,
      title: "Low Minimum Investment",
      description: "Start investing with as little as ₹500 through SIP"
    },
    {
      icon: Clock,
      title: "High Liquidity",
      description: "Redeem your investments within 1-3 business days"
    }
  ]

  const fundTypes = [
    {
      name: "Large Cap Equity Funds",
      category: "Equity",
      riskLevel: "Moderate",
      expectedReturn: "10-12%",
      minInvestment: "₹500",
      description: "Invest in top 100 companies by market capitalization",
      features: ["Lower volatility", "Stable returns", "Blue-chip companies"],
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      name: "Mid Cap Equity Funds", 
      category: "Equity",
      riskLevel: "High",
      expectedReturn: "12-15%",
      minInvestment: "₹500",
      description: "Invest in companies ranked 101-250 by market cap",
      features: ["Higher growth potential", "Moderate volatility", "Emerging companies"],
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      name: "Small Cap Equity Funds",
      category: "Equity", 
      riskLevel: "Very High",
      expectedReturn: "15-18%",
      minInvestment: "₹500",
      description: "Invest in companies ranked below 250 by market cap",
      features: ["Highest growth potential", "High volatility", "Early-stage companies"],
      color: "bg-purple-50 border-purple-200 text-purple-800"
    },
    {
      name: "Debt Funds",
      category: "Debt",
      riskLevel: "Low",
      expectedReturn: "6-9%",
      minInvestment: "₹500", 
      description: "Invest in government and corporate bonds",
      features: ["Capital preservation", "Regular income", "Lower risk"],
      color: "bg-gray-50 border-gray-200 text-gray-800"
    },
    {
      name: "Hybrid Funds",
      category: "Hybrid",
      riskLevel: "Moderate",
      expectedReturn: "9-12%",
      minInvestment: "₹500",
      description: "Balanced allocation between equity and debt",
      features: ["Balanced approach", "Moderate risk", "Steady returns"],
      color: "bg-yellow-50 border-yellow-200 text-yellow-800"
    },
    {
      name: "ELSS Funds",
      category: "Tax Saving",
      riskLevel: "High", 
      expectedReturn: "12-15%",
      minInvestment: "₹500",
      description: "Equity funds with tax benefits under Section 80C",
      features: ["Tax deduction up to ₹1.5L", "3-year lock-in", "Wealth creation"],
      color: "bg-orange-50 border-orange-200 text-orange-800"
    }
  ]

  const benefits = [
    "Professional fund management by experienced portfolio managers",
    "Diversification across multiple securities reducing individual stock risk", 
    "Regulated by SEBI ensuring transparency and investor protection",
    "High liquidity with T+1 settlement for most equity funds",
    "Systematic Investment Plan (SIP) for disciplined investing",
    "Tax efficiency through equity funds and ELSS options"
  ]

  const process = [
    {
      step: "1",
      title: "KYC Completion",
      description: "Complete your Know Your Customer documentation online"
    },
    {
      step: "2", 
      title: "Fund Selection",
      description: "Choose funds based on your risk profile and goals"
    },
    {
      step: "3",
      title: "Investment",
      description: "Invest lumpsum or start SIP with minimum ₹500"
    },
    {
      step: "4",
      title: "Monitor & Review", 
      description: "Track performance and review portfolio quarterly"
    }
  ]

  const topPerformers = [
    {
      name: "NYQE Large Cap Growth Fund",
      category: "Large Cap",
      oneYear: "14.5%",
      threeYear: "12.8%", 
      fiveYear: "11.2%",
      rating: 5,
      aum: "₹2,500 Cr"
    },
    {
      name: "NYQE Mid Cap Opportunities Fund",
      category: "Mid Cap", 
      oneYear: "18.2%",
      threeYear: "16.1%",
      fiveYear: "14.8%",
      rating: 4,
      aum: "₹1,200 Cr"
    },
    {
      name: "NYQE Balanced Advantage Fund",
      category: "Hybrid",
      oneYear: "12.3%", 
      threeYear: "10.9%",
      fiveYear: "9.8%",
      rating: 4,
      aum: "₹800 Cr"
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
                Mutual Funds
              </motion.h1>
              <motion.p 
                className="text-xl mb-6 opacity-90"
                variants={fadeInUp}
              >
                Professionally managed diversified portfolios designed to help you achieve 
                your financial goals with optimal risk-adjusted returns.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={fadeInUp}
              >
                <Badge className="bg-white/20 text-white">8-15% Expected Returns</Badge>
                <Badge className="bg-white/20 text-white">₹500 Minimum SIP</Badge>
                <Badge className="bg-white/20 text-white">SEBI Regulated</Badge>
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
                  <Link href="/calculators/sip">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    SIP Calculator
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
                <h3 className="text-2xl font-semibold mb-6">Why Choose Mutual Funds?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div key={index} className="text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fund Categories */}
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
              Types of Mutual Funds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a diverse range of mutual fund categories to match your investment objectives
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {fundTypes.map((fund, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={fund.color}>
                        {fund.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {fund.riskLevel} Risk
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{fund.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{fund.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Expected Return</span>
                        <span className="font-semibold text-green-600">{fund.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Min Investment</span>
                        <span className="font-semibold">{fund.minInvestment}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {fund.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full">
                      <Link href="/contact">
                        Invest Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Performing Funds */}
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
              Top Performing Funds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our best-performing mutual funds with consistent track record
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
                  <th className="px-6 py-4 text-left">Fund Name</th>
                  <th className="px-6 py-4 text-center">Category</th>
                  <th className="px-6 py-4 text-center">1 Year</th>
                  <th className="px-6 py-4 text-center">3 Years</th>
                  <th className="px-6 py-4 text-center">5 Years</th>
                  <th className="px-6 py-4 text-center">Rating</th>
                  <th className="px-6 py-4 text-center">AUM</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((fund, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{fund.name}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline">{fund.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      {fund.oneYear}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      {fund.threeYear}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      {fund.fiveYear}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < fund.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {fund.aum}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button asChild size="sm">
                        <Link href="/contact">Invest</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
                Benefits of Mutual Funds
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Why mutual funds are the preferred investment choice for millions of investors
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    variants={fadeInUp}
                    custom={index}
                  >
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="p-8 bg-gradient-to-br from-primary to-primary-light text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    Start Your SIP Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">₹500</div>
                        <div className="text-sm opacity-90">Minimum SIP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">0%</div>
                        <div className="text-sm opacity-90">Entry Load</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <p className="text-sm opacity-90 mb-2">SIP Example: ₹5,000/month for 20 years</p>
                      <div className="text-2xl font-bold text-accent">₹46,00,000</div>
                      <p className="text-xs opacity-75">Expected corpus at 12% returns</p>
                    </div>

                    <Button asChild className="w-full bg-white text-primary hover:bg-gray-100">
                      <Link href="/calculators/sip">
                        Calculate Your SIP
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
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
              How to Invest
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to start your mutual fund investment journey
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {process.map((step, index) => (
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
              Ready to Start Investing?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Begin your wealth creation journey with professionally managed mutual funds
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start SIP Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/calculators">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Calculators
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
              <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. 
              Please read all scheme related documents carefully before investing. Past performance 
              is not indicative of future returns. The NAV of the scheme may go up or down depending 
              upon the factors and forces affecting securities market.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
