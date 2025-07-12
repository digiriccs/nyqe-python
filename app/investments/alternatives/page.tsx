'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Gem, 
  Building, 
  Coins, 
  TrendingUp,
  Shield,
  BarChart3,
  Target,
  Calendar,
  Star,
  ArrowRight,
  Info,
  Home,
  Wheat,
  Zap
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

export default function AlternativesPage() {
  const alternativeInvestments = [
    {
      name: "Real Estate Investment Trusts (REITs)",
      icon: Building,
      expectedReturn: "8-12%",
      minInvestment: "₹2,000",
      liquidity: "High",
      description: "Invest in commercial real estate without owning physical property",
      features: [
        "Regular dividend income from rental yields",
        "Professional property management",
        "Lower entry barrier to real estate",
        "Tradeable on stock exchanges"
      ],
      benefits: [
        "Diversification beyond stocks and bonds",
        "Inflation hedge through real assets",
        "Quarterly dividend distributions",
        "Regulated by SEBI"
      ],
      risks: [
        "Interest rate sensitivity",
        "Real estate market volatility",
        "Regulatory changes impact"
      ],
      color: "bg-blue-50 border-blue-200"
    },
    {
      name: "Gold Investments",
      icon: Coins,
      expectedReturn: "6-10%",
      minInvestment: "₹500",
      liquidity: "High",
      description: "Invest in gold through ETFs, mutual funds, or digital gold",
      features: [
        "Digital gold with physical backing",
        "Gold ETFs for easy trading",
        "Gold mutual funds for systematic investing",
        "No storage or security concerns"
      ],
      benefits: [
        "Hedge against inflation and currency devaluation",
        "Portfolio diversification",
        "Crisis protection asset",
        "Cultural affinity in India"
      ],
      risks: [
        "No regular income generation",
        "Price volatility",
        "Currency fluctuation impact"
      ],
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      name: "Infrastructure Investment Trusts (InvITs)",
      icon: Zap,
      expectedReturn: "9-13%",
      minInvestment: "₹10,000",
      liquidity: "Medium",
      description: "Invest in infrastructure assets like power, roads, and telecommunications",
      features: [
        "Investment in operational infrastructure",
        "Regular cash flow from operations",
        "Professional asset management",
        "Regulated investment vehicle"
      ],
      benefits: [
        "Steady cash flows from essential infrastructure",
        "Lower correlation with equity markets",
        "Exposure to India's infrastructure growth",
        "Tax pass-through structure"
      ],
      risks: [
        "Regulatory and policy risks",
        "Long gestation periods",
        "Interest rate sensitivity"
      ],
      color: "bg-green-50 border-green-200"
    },
    {
      name: "Commodity Investments",
      icon: Wheat,
      expectedReturn: "8-14%",
      minInvestment: "₹1,000",
      liquidity: "High",
      description: "Invest in commodities like crude oil, metals, and agricultural products",
      features: [
        "Commodity ETFs and mutual funds",
        "Exposure to global commodity prices",
        "Diversification across commodity types",
        "Professional fund management"
      ],
      benefits: [
        "Inflation protection through real assets",
        "Global diversification",
        "Low correlation with traditional assets",
        "Economic cycle benefits"
      ],
      risks: [
        "High volatility",
        "Storage and transportation costs",
        "Weather and geopolitical risks"
      ],
      color: "bg-orange-50 border-orange-200"
    }
  ]

  const comparisonData = [
    {
      investment: "REITs",
      returns: "8-12%",
      risk: "Medium",
      liquidity: "High",
      minAmount: "₹2,000",
      taxEfficiency: "Good"
    },
    {
      investment: "Gold",
      returns: "6-10%", 
      risk: "Medium",
      liquidity: "High",
      minAmount: "₹500",
      taxEfficiency: "Moderate"
    },
    {
      investment: "InvITs",
      returns: "9-13%",
      risk: "Medium-High",
      liquidity: "Medium", 
      minAmount: "₹10,000",
      taxEfficiency: "Good"
    },
    {
      investment: "Commodities",
      returns: "8-14%",
      risk: "High",
      liquidity: "High",
      minAmount: "₹1,000", 
      taxEfficiency: "Moderate"
    }
  ]

  const allocationStrategies = [
    {
      profile: "Conservative Investor",
      allocation: "5-10%",
      focus: "Gold and REITs",
      description: "Minimal alternative allocation for portfolio stability"
    },
    {
      profile: "Moderate Investor", 
      allocation: "10-15%",
      focus: "REITs, Gold, and InvITs",
      description: "Balanced approach with inflation protection"
    },
    {
      profile: "Aggressive Investor",
      allocation: "15-25%", 
      focus: "All categories",
      description: "Higher allocation for enhanced diversification"
    }
  ]

  const benefits = [
    {
      title: "Portfolio Diversification",
      description: "Low correlation with traditional equity and debt investments",
      icon: Target
    },
    {
      title: "Inflation Hedge",
      description: "Real assets that typically perform well during inflationary periods", 
      icon: Shield
    },
    {
      title: "Income Generation",
      description: "Many alternatives provide regular income through dividends or distributions",
      icon: TrendingUp
    },
    {
      title: "Growth Potential",
      description: "Exposure to India's infrastructure and real estate growth story",
      icon: BarChart3
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
                Alternative Investments
              </motion.h1>
              <motion.p 
                className="text-xl mb-6 opacity-90"
                variants={fadeInUp}
              >
                Diversify your portfolio beyond traditional stocks and bonds with REITs, 
                gold, infrastructure, and commodity investments.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={fadeInUp}
              >
                <Badge className="bg-white/20 text-white">8-14% Expected Returns</Badge>
                <Badge className="bg-white/20 text-white">Portfolio Diversification</Badge>
                <Badge className="bg-white/20 text-white">Inflation Hedge</Badge>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/contact">
                    <Calendar className="mr-2 h-5 w-5" />
                    Explore Alternatives
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/tools/comparison">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Compare Options
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
                <h3 className="text-2xl font-semibold mb-6">Why Alternatives?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <div key={index} className="text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <h4 className="font-medium text-sm">{benefit.title}</h4>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alternative Investment Options */}
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
              Alternative Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse alternative investments to enhance your portfolio's risk-return profile
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {alternativeInvestments.map((investment, index) => {
              const Icon = investment.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`${investment.color} border-2 overflow-hidden`}>
                    <div className="grid lg:grid-cols-3 gap-0">
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-secondary font-bold text-primary">
                              {investment.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline">{investment.expectedReturn} Returns</Badge>
                              <Badge variant="outline">Min: {investment.minInvestment}</Badge>
                              <Badge variant="outline">{investment.liquidity} Liquidity</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6">{investment.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-primary mb-3">Key Features</h4>
                            <ul className="space-y-2">
                              {investment.features.map((feature, idx) => (
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
                              {investment.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/50 p-8 flex flex-col justify-center">
                        <h4 className="font-semibold text-primary mb-4">Risk Factors</h4>
                        <ul className="space-y-2 mb-6">
                          {investment.risks.map((risk, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {risk}
                            </li>
                          ))}
                        </ul>

                        <Button asChild className="w-full">
                          <Link href="/contact">
                            Learn More
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

      {/* Comparison Table */}
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
              Alternative Investments Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare key characteristics of different alternative investment options
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
                  <th className="px-6 py-4 text-left">Investment Type</th>
                  <th className="px-6 py-4 text-center">Expected Returns</th>
                  <th className="px-6 py-4 text-center">Risk Level</th>
                  <th className="px-6 py-4 text-center">Liquidity</th>
                  <th className="px-6 py-4 text-center">Min Investment</th>
                  <th className="px-6 py-4 text-center">Tax Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{item.investment}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      {item.returns}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        variant="outline"
                        className={
                          item.risk === "High" ? "border-red-200 text-red-600" :
                          item.risk === "Medium-High" ? "border-orange-200 text-orange-600" :
                          item.risk === "Medium" ? "border-yellow-200 text-yellow-600" :
                          "border-green-200 text-green-600"
                        }
                      >
                        {item.risk}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">{item.liquidity}</td>
                    <td className="px-6 py-4 text-center font-semibold">{item.minAmount}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        variant="outline"
                        className={
                          item.taxEfficiency === "Good" ? "border-green-200 text-green-600" :
                          "border-yellow-200 text-yellow-600"
                        }
                      >
                        {item.taxEfficiency}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Allocation Strategies */}
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
              Portfolio Allocation Strategies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recommended alternative investment allocation based on your risk profile
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {allocationStrategies.map((strategy, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">
                      {strategy.profile}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-secondary mb-4">
                      {strategy.allocation}
                    </div>
                    <Badge className="mb-4" variant="outline">
                      {strategy.focus}
                    </Badge>
                    <p className="text-gray-600">{strategy.description}</p>
                  </CardContent>
                </Card>
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
              Diversify Your Portfolio Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Add alternative investments to enhance your portfolio's risk-return profile
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Explore Alternatives
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/tools/comparison">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Compare Investments
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
              <strong>Disclaimer:</strong> Alternative investments carry higher risks and may not be suitable 
              for all investors. Past performance is not indicative of future returns. Please consider your 
              risk tolerance and investment objectives before investing. Consult with a qualified financial 
              advisor for personalized advice.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
