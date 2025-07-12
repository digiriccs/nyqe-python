'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChartLine, 
  PiggyBank, 
  Calculator, 
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Target,
  ArrowRight,
  Play,
  Calendar,
  Phone
} from 'lucide-react'
import { Walkthrough } from '@/components/ui/walkthrough'

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

export default function HomePage() {
  const [showWalkthrough, setShowWalkthrough] = useState(false)

  useEffect(() => {
    // Check if user has seen walkthrough before
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough')
    const dontShowAgain = localStorage.getItem('dontShowWalkthrough')
    
    if (!hasSeenWalkthrough && !dontShowAgain) {
      const timer = setTimeout(() => {
        setShowWalkthrough(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const services = [
    {
      icon: ChartLine,
      title: "Investment Advisory",
      description: "Strategic investment planning and portfolio optimization to maximize your returns while managing risk effectively.",
      href: "/services/investment-advisory"
    },
    {
      icon: PiggyBank,
      title: "Retirement Planning", 
      description: "Secure your golden years with strategic retirement corpus building and post-retirement income planning.",
      href: "/services/retirement-planning"
    },
    {
      icon: Calculator,
      title: "Tax Optimization",
      description: "Intelligent tax planning strategies to minimize your tax liability while maximizing investment efficiency.",
      href: "/services/tax-optimization"
    },
    {
      icon: Briefcase,
      title: "Portfolio Management",
      description: "Professional portfolio management with active monitoring and rebalancing for optimal performance.",
      href: "/services/portfolio-management"
    }
  ]

  const investments = [
    {
      icon: "📊",
      title: "Mutual Funds",
      description: "Diversified portfolio of equity and debt mutual funds",
      returns: "8-15% Returns",
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: "🏢",
      title: "Fixed Income",
      description: "Government bonds, corporate bonds, and FDs", 
      returns: "6-9% Returns",
      color: "bg-green-100 text-green-800"
    },
    {
      icon: "💰",
      title: "Direct Equity",
      description: "Carefully selected stocks and equity portfolios",
      returns: "12-20% Returns", 
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      icon: "💎",
      title: "Alternatives",
      description: "REITs, gold, and other alternative investments",
      returns: "10-18% Returns",
      color: "bg-purple-100 text-purple-800"
    }
  ]

  const calculators = [
    {
      icon: PiggyBank,
      title: "SIP Calculator",
      description: "Calculate your SIP returns and plan systematic investments",
      href: "/calculators/sip"
    },
    {
      icon: Calculator,
      title: "EMI Calculator", 
      description: "Plan your home loan EMI and compare different options",
      href: "/calculators/emi"
    },
    {
      icon: Users,
      title: "Retirement Calculator",
      description: "Plan your retirement corpus and secure your future", 
      href: "/calculators/retirement"
    }
  ]

  const stats = [
    { label: "Crores Managed", value: "₹500+", icon: "💰" },
    { label: "Happy Clients", value: "1000+", icon: "😊" },
    { label: "Years Experience", value: "15+", icon: "📅" },
    { label: "Average Returns", value: "12%+", icon: "📈" }
  ]

  const features = [
    {
      icon: Shield,
      title: "SEBI Registered",
      description: "Fully regulated and compliant investment advisory services"
    },
    {
      icon: Users,
      title: "Expert Team", 
      description: "Certified financial planners with proven track record"
    },
    {
      icon: TrendingUp,
      title: "Digital First",
      description: "Advanced technology platform for seamless experience"
    },
    {
      icon: Target,
      title: "Transparent Fees",
      description: "No hidden charges, clear fee structure"
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Consultation",
      description: "Free initial consultation to understand your financial goals and current situation"
    },
    {
      number: "2", 
      title: "Analysis",
      description: "Detailed financial analysis and risk profiling to create a personalized strategy"
    },
    {
      number: "3",
      title: "Planning", 
      description: "Comprehensive financial plan with investment recommendations and timelines"
    },
    {
      number: "4",
      title: "Execution",
      description: "Implementation and ongoing monitoring with regular reviews and adjustments"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-secondary font-bold mb-6"
              variants={fadeInUp}
            >
              Empowering Your Financial Future
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-4 font-medium"
              variants={fadeInUp}
            >
              One Decision at a Time
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Expert wealth management and investment advisory services designed to help you achieve 
              your financial goals with confidence and clarity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="#services">
                  <Play className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              variants={staggerChildren}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-secondary font-bold text-primary mb-6">
              Our Expert Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions tailored to your unique needs
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-secondary">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose NYQE Section */}
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
                Why Choose NYQE?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your trusted partner in wealth creation
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      variants={fadeInUp}
                      custom={index}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp}>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <p className="text-gray-600">Years Experience</p>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">₹500Cr+</div>
                  <p className="text-gray-600">Assets Managed</p>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <p className="text-gray-600">Happy Families</p>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="text-center p-6">
                  <div className="text-3xl font-bold text-primary mb-2">12%+</div>
                  <p className="text-gray-600">Avg. Returns</p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Solutions Preview */}
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
              Investment Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diversified investment options for every risk appetite
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {investments.map((investment, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="text-4xl mb-4">{investment.icon}</div>
                    <CardTitle className="text-xl font-secondary">
                      {investment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {investment.description}
                    </p>
                    <Badge className={investment.color}>
                      {investment.returns}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button asChild size="lg">
              <Link href="/investments">
                Explore All Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Financial Calculators Preview */}
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
              Financial Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your financial journey with our advanced calculators
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {calculators.map((calculator, index) => {
              const Icon = calculator.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-secondary">
                        {calculator.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        {calculator.description}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={calculator.href}>
                          Calculate Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/calculators">
                View All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Book a free consultation with our experts and take the first step towards financial freedom
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-dark text-white">
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
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
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to achieve your financial goals
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.number}
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

      {/* Walkthrough Component */}
      {showWalkthrough && (
        <Walkthrough onClose={() => setShowWalkthrough(false)} />
      )}
    </>
  )
}
