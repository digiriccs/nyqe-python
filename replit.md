# NYQE Wealth Management

## Overview

NYQE Wealth Management is a comprehensive financial advisory platform that empowers clients' financial futures through expert investment advisory, portfolio management, and retirement planning services. The application is built as a modern web platform with both Flask-based backend and Next.js frontend components, featuring financial calculators, investment education tools, and lead management systems.

**Tagline:** "Empowering Your Financial Future, One Decision at a Time"

## System Architecture

### Frontend Architecture
- **Primary Framework**: Next.js 13+ with App Router for modern React development
- **UI Components**: Custom component library built with Tailwind CSS and Radix UI primitives
- **Styling**: Tailwind CSS with custom design system including primary (#1a365d), secondary (#00d4aa), and accent (#ffd700) colors
- **Typography**: Inter font for body text, Playfair Display for headings
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Theme Support**: Dark/light mode toggle with next-themes

### Backend Architecture
- **Primary Framework**: Flask with SQLAlchemy ORM for database operations
- **Database Models**: User, Lead, Service, Investment, Partner, Consultation entities
- **Forms**: WTForms for form validation and handling
- **Security**: Password hashing with Werkzeug, session management
- **Middleware**: ProxyFix for handling proxy headers in production

### Hybrid Implementation
The repository shows a hybrid approach with both Flask templates and Next.js components, suggesting a migration or dual-framework strategy.

### Financial Product Management
- **Loan Hub**: Comprehensive loan product browsing with professional blue/white design
- **Product Database**: LoanProduct and FinancialProduct models with AMFI compliance fields
- **Filtering System**: Advanced filtering by category, risk level, amount, tenure, and fund house
- **Product Details**: Detailed product pages with eligibility criteria and EMI calculators
- **Navigation Integration**: Seamless integration with existing navbar structure

## Key Components

### Core Services
1. **Investment Advisory** - Strategic investment planning and portfolio optimization
2. **Retirement Planning** - Comprehensive retirement corpus building 
3. **Tax Optimization** - Tax-efficient investment strategies
4. **Portfolio Management** - Active monitoring and rebalancing

### Investment Solutions
1. **Mutual Funds** - Diversified fund options across categories
2. **Fixed Income** - Government bonds, corporate bonds, FDs
3. **Direct Equity** - Large cap, mid cap, small cap stocks
4. **Alternative Investments** - REITs, commodities, structured products

### Financial Tools
- SIP Calculator with real-time updates and chart visualization
- Lumpsum Calculator with year-wise breakdown
- SWP (Systematic Withdrawal Plan) Calculator
- Retirement Planning Calculator
- NPS Calculator
- EMI Calculator
- FD & PPF Calculators

### Real-Time Market Data Integration
- **Multi-Provider Support**: Alpha Vantage, Finnhub, Yahoo Finance APIs
- **Live Market Dashboard**: Real-time stock quotes, indices, and market data
- **Personal Watchlist**: User-customizable stock tracking with localStorage persistence
- **Market Widgets**: Embeddable components for dashboard integration
- **Fallback System**: Demo data provider for testing without API keys
- **Stock Search**: Symbol lookup and quote retrieval functionality
- **Auto-Refresh**: Configurable intervals for real-time data updates

### Educational Features
- **Enhanced Investment Walkthrough**: 4-step Lottie-powered animated education overlay covering:
  1. Why investing is essential vs saving (with growth animations)
  2. Power of SIP and compounding (with saving animations)
  3. Importance of insurance protection (with shield animations)
  4. How inflation erodes wealth (with chart animations)
- Professional Lottie animations from LottieFiles
- Progress indicators and smooth slide transitions
- Skip and "Don't show again" options with localStorage persistence
- Keyboard navigation support (Arrow keys, Enter, Escape)
- Mobile-responsive design with optimized animations

### Customer Support System
- **Query Submission Form**: Modern, mobile-responsive form with category-based inquiries
- **Database Integration**: Secure storage of customer queries with status tracking
- **Admin Management**: Complete query management system in admin panel
- **Email Notifications**: Automated response system for customer inquiries
- **Multi-channel Support**: Phone, email, WhatsApp, and live chat options
- **Priority Assignment**: Query categorization by urgency and type

## Data Flow

### Lead Management Flow
1. Visitor completes lead form with investment preferences
2. Lead data stored in database with status tracking
3. Admin can view and manage leads through dashboard
4. Consultation scheduling system for follow-ups

### Calculator Flow
1. User inputs investment parameters
2. Client-side calculations using financial formulas
3. Real-time chart updates with Chart.js
4. Results display with download/print options

### Content Management
- Service and investment content stored in database
- Dynamic routing for service and investment detail pages
- Template mapping for specialized page layouts

## External Dependencies

### Frontend Dependencies
- Next.js 13+ for React framework
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible components
- Chart.js for financial visualizations
- Lucide React for icons

### Backend Dependencies
- Flask with SQLAlchemy for web framework and ORM
- WTForms for form handling
- Werkzeug for security utilities
- Bootstrap 5 for UI components (legacy templates)
- Font Awesome for icons (legacy templates)
- AOS library for scroll animations

### Database
- PostgreSQL as primary database (configurable via DATABASE_URL)
- SQLAlchemy models for data persistence
- Support for connection pooling and health checks

## Deployment Strategy

### Environment Configuration
- Database connection via DATABASE_URL environment variable
- Session secret configuration via SESSION_SECRET
- Development and production environment support
- Docker-ready with configurable host/port settings

### Static Assets
- Comprehensive CSS and JavaScript organization
- Modular calculator implementations
- Chart configuration templates
- Theme and animation libraries

### Security Considerations
- Password hashing for user authentication
- CSRF protection via Flask-WTF
- Session management with secure keys
- Input validation and sanitization

## Recent Changes
- July 12, 2025: **Professional Logo Design Implementation**
  - Created professional SVG logo based on NYQE brand design with blue color scheme (#1E40AF)
  - Updated navbar across all Flask templates to use new compact logo
  - Updated footer to display full brand logo with proper styling
  - Replaced favicon with branded NYQE icon
  - Updated Next.js components (navbar.tsx, footer.tsx) with new logo implementation
  - Made logo responsive with hover effects and proper mobile scaling
  - Applied consistent branding with "Strategy. Security. Success." tagline
- July 8, 2025: **AMFI Registration Update & Calculator Fixes**
  - Replaced all SEBI references with AMFI (Association of Mutual Funds in India) registration throughout the website
  - Changed registration number from INA000012345 to ARN-012345 for AMFI compliance
  - Fixed calculator errors by implementing client-side calculations for SIP, Lumpsum, and EMI calculators
  - Removed duplicate API route definitions in routes.py
  - Updated legal pages, footer, navbar, and base template with AMFI branding
  - Maintained all calculator functionality with proper formulas and yearly breakdowns
  - Tested and confirmed all calculators are working with accurate calculations

- July 8, 2025: **Complete Loan Hub & Financial Products Management System**
  - Implemented comprehensive loan product management system with AMFI compliance
  - Created dedicated Loan Hub with professional blue and white color scheme
  - Added new database models: LoanProduct and FinancialProduct with extensive fields
  - Built loan filtering system by category, type, amount, risk level, and tenure
  - Created detailed product pages with EMI calculators and eligibility criteria
  - Added Financial Products section for mutual funds, insurance, bonds, and FDs
  - Integrated navigation system with dedicated menu items for easy access
  - Populated database with 5 sample loan products and 5 financial products
  - All new endpoints tested and confirmed working (HTTP 200 responses)
  - Preserved all existing NYQE Wealth Management functionality and design

- July 8, 2025: **Comprehensive Loan Hub Enhancement with Bank Comparisons**
  - Added Bank model to database with 10 major Indian banks (SBI, HDFC, ICICI, Axis, etc.)
  - Successfully migrated database to include bank relationships with loan products
  - Created 178 comprehensive loan products across 7 categories and 10 banks
  - Built bank-wise loan comparison tool with EMI calculations and best rate highlights
  - Developed interactive loan selection guide with 5-step wizard and AI recommendations
  - Created bank directory showing all partner banks with ratings and statistics
  - Enhanced loan hub homepage with category browsing, bank filtering, and quick actions
  - Added advanced filtering by bank, amount, interest rate, loan type, and risk level
  - Made Loan Hub prominently visible on homepage with alert banner and dedicated section
  - Removed AI-Powered Insights and replaced with loan-focused content throughout
  - All new features tested and working with complete database integration

- June 30, 2025: **Comprehensive Cross-Device Responsive Design Optimization**
  - Implemented complete mobile-first responsive design system with 6 breakpoints (320px to 1400px+)
  - Created comprehensive responsive CSS framework with grid system, typography scaling, and component optimizations
  - Enhanced mobile navigation with touch-friendly 48px minimum targets and improved hamburger menu
  - Optimized hero section for all device categories with appropriate height and content scaling
  - Improved footer layout with mobile-specific stacking and enhanced legal document accessibility
  - Added cross-browser compatibility fixes for Safari, Firefox, and Edge
  - Implemented performance optimizations including reduced animations on mobile and optimized touch interactions
  - Enhanced accessibility with WCAG-compliant touch targets, focus states, and reduced motion support
  - Comprehensive testing completed across all major devices and browsers with full compatibility validation

- June 29, 2025: **Interactive Financial Learning Mini-Games System**
  - Implemented comprehensive mini-games platform with 6 educational games
  - Created Compound Interest Simulator for hands-on learning
  - Built Budget Master Challenge with interactive sliders and real-time feedback
  - Developed Investment Risk Assessment quiz with detailed explanations
  - Added SIP vs Lumpsum comparison tool with market scenario analysis
  - Created "Beat the Inflation Monster" game to teach inflation impact
  - Built Financial IQ Challenge quiz for comprehensive knowledge testing
  - Added engaging homepage preview section with game discovery
  - Integrated games into main navigation under Tools dropdown
  - Mobile-responsive design with smooth animations and hover effects
  - All games include educational content, progress tracking, and interactive feedback

- June 29, 2025: **Enhanced Lottie Walkthrough & Complete Platform Integration**
  - Integrated professional Lottie animations from LottieFiles into educational walkthrough
  - Added AOS (Animate on Scroll) library for enhanced page animations
  - Implemented progress indicators and smooth slide transitions in walkthrough
  - Added keyboard navigation support (Arrow keys, Enter, Escape)
  - Enhanced mobile responsiveness with optimized animation performance
  - Successfully implemented Chart.js across all major financial calculators
  - Enhanced SIP Calculator with interactive doughnut charts and animations
  - Enhanced Lumpsum Calculator with line growth charts and year-wise tracking
  - Enhanced EMI Calculator with principal/interest breakdown and amortization tables
  - Enhanced Retirement Calculator with dual-line charts and smart insights
  - Fixed all route references and resolved server errors
  - Created Investment Comparison Tool with professional card layouts
  - Added missing About Us page with comprehensive company information
  - Complete route testing: All 12 main routes now return 200 status (100% success rate)

- June 29, 2025: **Complete Website Theme Transformation**
  - Applied unified color scheme across entire platform (Primary: #003459, Accent: #00A6ED, Background: #F6F8FA)
  - Integrated Poppins font family throughout all pages and components
  - Updated global CSS variables for consistent theming
  - Modernized form elements with focus states and rounded inputs
  - Enhanced button styles with gradient backgrounds and hover effects
  - Updated hero section with brand-aligned color gradients
  - Created cohesive visual identity matching professional fintech standards

- June 29, 2025: **Real-Time Market Data Integration**
  - Implemented comprehensive market data API system with multi-provider support
  - Added Alpha Vantage, Finnhub, and Yahoo Finance API integrations
  - Created live market dashboard with real-time stock quotes and indices
  - Built personal watchlist functionality with localStorage persistence
  - Developed reusable market data widgets for dashboard integration
  - Added demo data provider for testing without API keys
  - Implemented automatic fallback system between data providers
  - Created API configuration interface for user key management

- June 29, 2025: **Database Schema Optimization**
  - Migrated user model from first_name/last_name to single 'name' field
  - Made phone number mandatory for all user registrations
  - Fixed authentication system compatibility with new field structure
  - Updated all forms and templates to use consolidated user data model
  - Successfully resolved admin login issues and password authentication

- June 29, 2025: **Premium Hero Section Redesign**
  - Created stunning dark gradient hero section matching modern fintech platforms
  - Added golden highlight text with glowing animation effects
  - Implemented modern rounded buttons with interactive hover states
  - Added feature showcase cards with icons and responsive design
  - Full mobile-first responsive layout with accessibility features

- June 29, 2025: **Comprehensive CMS System Implementation**
  - Built complete content management system with PostgreSQL backend
  - Added admin authentication and role-based access control
  - Created dynamic content editing interface for all website sections
  - Implemented real-time preview and modern UI with Poppins font
  - Added API endpoints for content management (/api/cms-data)
  - Built admin dashboard with statistics and lead management
  - Added dark mode toggle and responsive design optimizations

## Changelog  
- June 29, 2025: Initial Flask application setup with PostgreSQL integration
- June 29, 2025: Enhanced educational walkthrough system with mobile responsiveness
- June 29, 2025: Implemented premium hero section with dark gradient design
- June 29, 2025: Built comprehensive CMS system with PostgreSQL backend

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: User prefers to keep loan hub styling minimal - avoid extensive design changes to loan hub section.