'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  Lock,
  Award,
  ShieldQuestion,
  ArrowUp
} from 'lucide-react'
import { useEffect, useState } from 'react'

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

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const serviceLinks = [
    { href: '/services/investment-advisory', label: 'Investment Advisory' },
    { href: '/services/retirement-planning', label: 'Retirement Planning' },
    { href: '/services/tax-optimization', label: 'Tax Optimization' },
    { href: '/services/portfolio-management', label: 'Portfolio Management' }
  ]

  const investmentLinks = [
    { href: '/investments/mutual-funds', label: 'Mutual Funds' },
    { href: '/investments/fixed-income', label: 'Fixed Income' },
    { href: '/investments/equity', label: 'Direct Equity' },
    { href: '/investments/alternatives', label: 'Alternatives' }
  ]

  const toolLinks = [
    { href: '/calculators/sip', label: 'SIP Calculator' },
    { href: '/calculators/emi', label: 'EMI Calculator' },
    { href: '/calculators/retirement', label: 'Retirement Calculator' },
    { href: '/tools/comparison', label: 'Investment Comparison' }
  ]

  const socialLinks = [
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Youtube, label: 'YouTube' }
  ]

  const securityBadges = [
    { icon: Shield, label: 'SEBI Registered' },
    { icon: Lock, label: 'SSL Secured' },
    { icon: Award, label: 'ISO Certified' },
    { icon: ShieldQuestion, label: 'Privacy Protected' }
  ]

  return (
    <footer className="bg-gradient-to-br from-primary-dark to-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <motion.div
            className="grid lg:grid-cols-5 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Company Info */}
            <motion.div className="lg:col-span-2" variants={fadeInUp}>
              <div className="mb-6">
                <Link href="/" className="inline-block mb-4">
                  <img 
                    src="/static/images/nyqe-logo.svg" 
                    alt="NYQE Wealth Management" 
                    className="h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <p className="text-gray-300 mb-6 max-w-md">
                  Empowering your financial future, one decision at a time. Expert wealth management 
                  and investment advisory services designed to help you achieve your financial goals.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-accent font-semibold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Investment Solutions */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-accent font-semibold text-lg mb-6">Investment Solutions</h4>
              <ul className="space-y-3">
                {investmentLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools & Resources */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-accent font-semibold text-lg mb-6">Tools & Resources</h4>
              <ul className="space-y-3">
                {toolLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <Link 
                  href="tel:+919876543210" 
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  +91 98765 43210
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <Link 
                  href="mailto:info@nyqewealth.com" 
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  info@nyqewealth.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Security Badges */}
          <motion.div
            className="mt-8 pt-8 border-t border-white/10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {securityBadges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {badge.label}
                  </Badge>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                &copy; 2024 NYQE Wealth Management. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* SEBI Disclaimer */}
        <motion.div
          className="bg-red-500/10 border-l-4 border-red-500 p-4 mt-8 rounded-r-lg"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="mb-2">
            <p className="text-sm">
              <strong>SEBI Registration Number:</strong> INA000000000 | 
              <strong className="ml-2">Validity:</strong> Valid till March 2025
            </p>
          </div>
          <p className="text-sm text-gray-300">
            <strong>Important Disclaimer:</strong> Mutual fund investments are subject to market risks. 
            Please read all scheme related documents carefully before investing. Past performance is not 
            indicative of future returns. Investment in securities market are subject to market risks, 
            read all the related documents carefully before investing.
          </p>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        className={`fixed bottom-6 right-6 w-12 h-12 bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
