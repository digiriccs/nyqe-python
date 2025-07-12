'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { X, ArrowLeft, ArrowRight, Star } from 'lucide-react'

interface WalkthroughProps {
  onClose: () => void
}

const steps = [
  {
    id: 1,
    title: "Why Investing Is Essential",
    description: "Saving alone isn't enough. While savings keep your money safe, investing helps it grow and beat inflation over time.",
    icon: "💰",
    content: {
      type: "comparison",
      data: {
        left: {
          title: "Savings Account",
          icon: "🏦", 
          returns: "3-4% returns per year",
          inflation: "Inflation: ~6% per year",
          realReturn: "Real Return: -2% to -3%",
          note: "Your money loses value over time",
          color: "bg-red-50 border-red-200"
        },
        right: {
          title: "Smart Investing",
          icon: "📊",
          returns: "10-12% average returns", 
          inflation: "Inflation: ~6% per year",
          realReturn: "Real Return: 4% to 6%",
          note: "Your money grows ahead of inflation",
          color: "bg-green-50 border-green-200"
        }
      }
    }
  },
  {
    id: 2,
    title: "The Power of SIP",
    description: "Systematic Investment Plans (SIP) turn small, regular investments into significant wealth through the power of compounding.",
    icon: "📈",
    content: {
      type: "sip_example",
      data: {
        monthly: 5000,
        years: 20,
        totalInvestment: 1200000,
        expectedValue: 4600000,
        wealthCreated: 3400000
      }
    }
  },
  {
    id: 3,
    title: "Why Insurance Matters",
    description: "Protect your wealth before you grow it. Insurance ensures your financial goals remain on track even during unexpected events.",
    icon: "🛡️",
    content: {
      type: "pyramid",
      data: {
        levels: [
          {
            title: "🎯 Wealth Creation",
            subtitle: "Mutual Funds, Stocks, Real Estate",
            level: 3
          },
          {
            title: "💰 Emergency Fund", 
            subtitle: "6-12 months expenses",
            level: 2
          },
          {
            title: "🛡️ Insurance Foundation",
            subtitle: "Life & Health Insurance", 
            level: 1
          }
        ]
      }
    }
  },
  {
    id: 4,
    title: "How Inflation Erodes Wealth",
    description: "₹100 today won't have the same purchasing power tomorrow. Understand how inflation affects your money and why investing is crucial.",
    icon: "⚠️",
    content: {
      type: "inflation_chart",
      data: {
        timeline: [
          { year: "Today", value: 100000, label: "₹1,00,000" },
          { year: "10 Years", value: 79000, label: "₹79,000" },
          { year: "20 Years", value: 62000, label: "₹62,000" },
          { year: "30 Years", value: 49000, label: "₹49,000" }
        ]
      }
    }
  }
]

export function Walkthrough({ onClose }: WalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowWalkthrough', 'true')
    } else {
      localStorage.setItem('hasSeenWalkthrough', 'true')
    }
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleClose()
  }

  const currentStepData = steps.find(step => step.id === currentStep)

  const renderStepContent = (step: typeof steps[0]) => {
    switch (step.content.type) {
      case "comparison":
        const { left, right } = step.content.data
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className={`${left.color} border-2`}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{left.icon}</div>
                <h4 className="font-semibold mb-2 text-red-700">{left.title}</h4>
                <div className="space-y-1 text-sm">
                  <p>{left.returns}</p>
                  <p>{left.inflation}</p>
                  <p className="font-semibold">{left.realReturn}</p>
                  <p className="text-xs italic">{left.note}</p>
                </div>
              </CardContent>
            </Card>
            <Card className={`${right.color} border-2`}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{right.icon}</div>
                <h4 className="font-semibold mb-2 text-green-700">{right.title}</h4>
                <div className="space-y-1 text-sm">
                  <p>{right.returns}</p>
                  <p>{right.inflation}</p>
                  <p className="font-semibold">{right.realReturn}</p>
                  <p className="text-xs italic">{right.note}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "sip_example":
        const sipData = step.content.data
        return (
          <div className="space-y-4">
            <h5 className="text-center font-semibold">
              SIP Example: ₹{sipData.monthly.toLocaleString()}/month for {sipData.years} years
            </h5>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h6 className="font-semibold mb-2">Total Investment</h6>
                  <div className="text-2xl font-bold text-primary">
                    ₹{(sipData.totalInvestment / 100000).toFixed(1)}L
                  </div>
                  <small className="text-gray-600">
                    ₹{sipData.monthly.toLocaleString()} × 12 months × {sipData.years} years
                  </small>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <h6 className="font-semibold mb-2">Expected Value</h6>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{(sipData.expectedValue / 100000).toFixed(1)}L
                  </div>
                  <small className="text-gray-600">At 12% annual return</small>
                </CardContent>
              </Card>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <p className="font-semibold">
                Wealth created: ₹{(sipData.wealthCreated / 100000).toFixed(1)}L
              </p>
              <small>This is the power of compounding and regular investing!</small>
            </div>
          </div>
        )

      case "pyramid":
        const pyramidData = step.content.data
        return (
          <div className="space-y-4">
            <h5 className="text-center font-semibold">Financial Planning Pyramid</h5>
            <div className="space-y-2">
              {pyramidData.levels.reverse().map((level, index) => (
                <Card 
                  key={index}
                  className={`${
                    level.level === 1 ? 'bg-red-50 border-red-200' :
                    level.level === 2 ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}
                >
                  <CardContent className="p-3 text-center">
                    <div className="font-semibold">{level.title}</div>
                    <small className="text-gray-600">{level.subtitle}</small>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="font-semibold">Secure your base before building wealth</p>
            </div>
          </div>
        )

      case "inflation_chart":
        const chartData = step.content.data
        return (
          <div className="space-y-4">
            <h5 className="text-center font-semibold">
              Impact of 6% Inflation on ₹1,00,000
            </h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-end justify-between h-32 mb-4">
                {chartData.timeline.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-gradient-to-t from-primary to-secondary w-8 rounded-t transition-all duration-1000 ease-out"
                      style={{ 
                        height: `${(item.value / 100000) * 100}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                {chartData.timeline.map((item, index) => (
                  <div key={index}>
                    <div className="font-semibold">{item.year}</div>
                    <div className="text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-700">
                Your ₹1 lakh loses half its purchasing power in 30 years!
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!currentStepData) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="text-center">
                <h3 className="text-xl font-secondary font-bold mb-2">
                  Financial Education Journey
                </h3>
                <p className="text-white/90 text-sm">
                  Learn the fundamentals of smart investing
                </p>
                
                {/* Progress Dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        step.id === currentStep
                          ? 'bg-accent scale-125'
                          : step.id < currentStep
                          ? 'bg-white'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4 animate-pulse">
                    {currentStepData.icon}
                  </div>
                  <h4 className="text-2xl font-secondary font-bold text-primary mb-4">
                    {currentStepData.title}
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {currentStepData.description}
                  </p>
                  
                  <div className="mb-6">
                    {renderStepContent(currentStepData)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 p-6 flex items-center justify-between border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-gray-600">
                <span className="font-semibold">{currentStep}</span> of {steps.length}
              </div>

              <Button
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentStep === steps.length ? 'Get Started' : 'Next'}
                </span>
                {currentStep === steps.length ? (
                  <Star className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Skip Options */}
            <div className="px-6 pb-4 text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Checkbox
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                />
                <label
                  htmlFor="dont-show-again"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Don't show this again
                </label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip Introduction
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
