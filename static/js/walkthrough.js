/* NYQE Wealth Management - Mobile-First Responsive Walkthrough */

class InvestmentWalkthrough {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.overlay = null;
    }

    init() {
        this.overlay = this.createOverlay();
        this.bindEvents();
        document.body.appendChild(this.overlay);
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'walkthrough-overlay';
        
        overlay.innerHTML = `
            <div class="walkthrough-backdrop"></div>
            <div class="walkthrough-modal">
                <div class="walkthrough-header">
                    <button class="walkthrough-close" onclick="window.investmentWalkthrough.close()">
                        ×
                    </button>
                    <h2>Your Investment Journey</h2>
                    <div class="walkthrough-progress">
                        <div class="progress-dot active"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                    </div>
                    <div class="step-counter">
                        Step <span class="current-step">1</span> of 4
                    </div>
                </div>
                
                <div class="walkthrough-content">
                    ${this.createStep1()}
                    ${this.createStep2()}
                    ${this.createStep3()}
                    ${this.createStep4()}
                </div>
                
                <div class="walkthrough-nav">
                    <button class="nav-button secondary" onclick="window.investmentWalkthrough.previousStep()" disabled>
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                    <button class="nav-button primary" onclick="window.investmentWalkthrough.nextStep()">
                        Next <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                
                <div class="walkthrough-skip">
                    <a href="#" class="skip-link" onclick="window.investmentWalkthrough.skip(); return false;">
                        Skip walkthrough
                    </a>
                    <span style="color: #6c757d; margin: 0 0.5rem;"> • </span>
                    <a href="#" class="skip-link" onclick="window.investmentWalkthrough.close(); localStorage.setItem('dontShowWalkthrough', 'true'); return false;">
                        Don't show again
                    </a>
                </div>
            </div>
        `;
        
        return overlay;
    }

    createStep1() {
        return `
            <div class="walkthrough-step active" data-step="1">
                <div class="step-visual">
                    <div class="wealth-journey">
                        <div class="step-icon">📈</div>
                        <div class="wealth-path"></div>
                    </div>
                </div>
                <h3>Why Investing Is Important</h3>
                <p>Your money loses value over time due to inflation. Start investing today to build wealth and secure your financial future.</p>
            </div>
        `;
    }

    createStep2() {
        return `
            <div class="walkthrough-step" data-step="2">
                <div class="step-visual">
                    <div class="sip-plant step-icon">🌱</div>
                </div>
                <h3>Why SIPs Matter</h3>
                <p>SIPs help you invest small amounts monthly and grow wealth steadily through the power of compounding and rupee-cost averaging.</p>
            </div>
        `;
    }

    createStep3() {
        return `
            <div class="walkthrough-step" data-step="3">
                <div class="step-visual">
                    <div class="inflation-basket step-icon">🛒</div>
                </div>
                <h3>Understanding Inflation Is Critical</h3>
                <p>₹100 today won't buy the same things in 10 years. Beat inflation with smart investing to preserve and grow your purchasing power.</p>
            </div>
        `;
    }

    createStep4() {
        return `
            <div class="walkthrough-step" data-step="4">
                <div class="step-visual">
                    <div class="aif-treasure step-icon">💎</div>
                </div>
                <h3>Why AIFs Are Underrated</h3>
                <p>Alternative Investment Funds offer high-growth potential and diversification. Most retail investors miss this opportunity for superior returns.</p>
            </div>
        `;
    }

    bindEvents() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextStep();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousStep();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
            }
        });

        // Close on backdrop click
        this.overlay.querySelector('.walkthrough-backdrop').addEventListener('click', () => {
            this.close();
        });

        // Touch swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        this.overlay.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.overlay.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.nextStep(); // Swipe left - next
                } else {
                    this.previousStep(); // Swipe right - previous  
                }
            }
        });
    }

    show() {
        if (!this.overlay) {
            this.init();
        }
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Mark as seen
        localStorage.setItem('hasSeenWalkthrough', 'true');
    }

    skip() {
        this.close();
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        } else {
            this.close();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }

    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        // Hide current step
        const currentStepElement = this.overlay.querySelector(`.walkthrough-step[data-step="${this.currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add('exit');
        }
        
        // Update progress dots
        this.overlay.querySelectorAll('.progress-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index < stepNumber);
        });
        
        // Show new step after animation
        setTimeout(() => {
            if (currentStepElement) {
                currentStepElement.classList.remove('exit');
            }
            
            const newStepElement = this.overlay.querySelector(`.walkthrough-step[data-step="${stepNumber}"]`);
            if (newStepElement) {
                newStepElement.classList.add('active');
            }
            
            this.currentStep = stepNumber;
            this.updateNavigation();
        }, 250);
    }

    updateNavigation() {
        const prevButton = this.overlay.querySelector('.nav-button.secondary');
        const nextButton = this.overlay.querySelector('.nav-button.primary');
        const currentStepSpan = this.overlay.querySelector('.current-step');
        
        if (prevButton) {
            prevButton.disabled = this.currentStep === 1;
        }
        
        if (nextButton) {
            nextButton.innerHTML = this.currentStep === this.totalSteps 
                ? 'Explore Investments <i class="fas fa-arrow-right"></i>' 
                : 'Next <i class="fas fa-arrow-right"></i>';
        }
        
        if (currentStepSpan) {
            currentStepSpan.textContent = this.currentStep;
        }
    }
}

// Auto-initialize walkthrough on first visit
function initializeWalkthrough() {
    // Check if user has seen the walkthrough before
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough');
    const dontShowWalkthrough = localStorage.getItem('dontShowWalkthrough');
    
    // Only show if user hasn't seen it and hasn't opted out
    if (!hasSeenWalkthrough && !dontShowWalkthrough) {
        // Delay show for better UX after page load
        setTimeout(() => {
            showWalkthrough();
        }, 2000);
    }
}

function showWalkthrough() {
    if (!window.investmentWalkthrough) {
        window.investmentWalkthrough = new InvestmentWalkthrough();
    }
    window.investmentWalkthrough.show();
}

// Reset walkthrough (for testing/admin purposes)
function resetWalkthrough() {
    localStorage.removeItem('hasSeenWalkthrough');
    localStorage.removeItem('dontShowWalkthrough');
    showWalkthrough();
}

// Export for global access
window.showWalkthrough = showWalkthrough;
window.resetWalkthrough = resetWalkthrough;

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWalkthrough);
} else {
    initializeWalkthrough();
}