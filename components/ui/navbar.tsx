'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Menu, 
  X, 
  ChartLine, 
  PiggyBank, 
  Calculator, 
  Briefcase,
  ChartPie,
  Building,
  Coins,
  Gem,
  BarChart,
  Home,
  Watch,
  Scale,
  Calendar,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const services = [
  {
    href: '/services/investment-advisory',
    title: 'Investment Advisory',
    description: 'Strategic investment planning and portfolio optimization',
    icon: ChartLine
  },
  {
    href: '/services/retirement-planning',
    title: 'Retirement Planning',
    description: 'Secure your golden years with strategic planning',
    icon: PiggyBank
  },
  {
    href: '/services/tax-optimization',
    title: 'Tax Optimization',
    description: 'Minimize tax liability and maximize efficiency',
    icon: Calculator
  },
  {
    href: '/services/portfolio-management',
    title: 'Portfolio Management',
    description: 'Professional portfolio management and monitoring',
    icon: Briefcase
  }
]

const investments = [
  {
    href: '/investments/mutual-funds',
    title: 'Mutual Funds',
    description: 'Diversified equity and debt mutual funds',
    icon: ChartPie
  },
  {
    href: '/investments/fixed-income',
    title: 'Fixed Income',
    description: 'Government bonds, corporate bonds, and FDs',
    icon: Building
  },
  {
    href: '/investments/equity',
    title: 'Direct Equity',
    description: 'Carefully selected stocks and equity portfolios',
    icon: Coins
  },
  {
    href: '/investments/alternatives',
    title: 'Alternatives',
    description: 'REITs, gold, and other alternative investments',
    icon: Gem
  }
]

const tools = [
  {
    href: '/calculators/sip',
    title: 'SIP Calculator',
    description: 'Calculate your SIP returns',
    icon: PiggyBank
  },
  {
    href: '/calculators/emi',
    title: 'EMI Calculator',
    description: 'Plan your home loan EMI',
    icon: Home
  },
  {
    href: '/calculators/retirement',
    title: 'Retirement Calculator',
    description: 'Plan your retirement corpus',
    icon: Watch
  },
  {
    href: '/tools/comparison',
    title: 'Investment Comparison',
    description: 'Compare investment options',
    icon: Scale
  }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavLink = ({ href, children, className, onClick }: {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
  }) => {
    const isActive = pathname === href || pathname.startsWith(href + '/')
    
    return (
      <Link
        href={href}
        className={cn(
          "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/60",
          className
        )}
        onClick={onClick}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            layoutId="navbar-indicator"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    )
  }

  const MobileNavLink = ({ href, children, icon: Icon, onClick }: {
    href: string
    children: React.ReactNode
    icon?: React.ComponentType<{ className?: string }>
    onClick?: () => void
  }) => (
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  )

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        isScrolled && "shadow-md"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/static/images/nyqe-logo-compact.svg" 
            alt="NYQE Wealth Management" 
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink href="/">Home</NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary to-primary/60 p-6 no-underline outline-none focus:shadow-md"
                        href="/services"
                      >
                        <Briefcase className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          All Services
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Comprehensive financial solutions for your needs
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          href={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {service.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Investments</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-secondary to-secondary/60 p-6 no-underline outline-none focus:shadow-md"
                        href="/investments"
                      >
                        <BarChart className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          All Solutions
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Diversified investment options for every goal
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  {investments.map((investment) => {
                    const Icon = investment.icon
                    return (
                      <NavigationMenuLink key={investment.href} asChild>
                        <Link
                          href={investment.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {investment.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {investment.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-accent/80 to-accent/60 p-6 no-underline outline-none focus:shadow-md"
                        href="/calculators"
                      >
                        <Calculator className="h-6 w-6 text-primary" />
                        <div className="mb-2 mt-4 text-lg font-medium text-primary">
                          All Calculators
                        </div>
                        <p className="text-sm leading-tight text-primary/90">
                          Plan your financial journey with our tools
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <NavigationMenuLink key={tool.href} asChild>
                        <Link
                          href={tool.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {tool.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {tool.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink href="/partners">Partners</NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button asChild>
            <Link href="/contact">
              <Calendar className="mr-2 h-4 w-4" />
              Book Consultation
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <MobileNavLink
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>

                <div className="space-y-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Services
                  </div>
                  {services.map((service) => (
                    <MobileNavLink
                      key={service.href}
                      href={service.href}
                      icon={service.icon}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.title}
                    </MobileNavLink>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Investments
                  </div>
                  {investments.map((investment) => (
                    <MobileNavLink
                      key={investment.href}
                      href={investment.href}
                      icon={investment.icon}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {investment.title}
                    </MobileNavLink>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Tools
                  </div>
                  {tools.map((tool) => (
                    <MobileNavLink
                      key={tool.href}
                      href={tool.href}
                      icon={tool.icon}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {tool.title}
                    </MobileNavLink>
                  ))}
                </div>

                <MobileNavLink
                  href="/partners"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Partners
                </MobileNavLink>

                <MobileNavLink
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </MobileNavLink>

                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="w-full justify-start"
                  >
                    {theme === "light" ? (
                      <Moon className="mr-2 h-4 w-4" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" />
                    )}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </Button>

                  <Button
                    asChild
                    className="w-full mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/contact">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
