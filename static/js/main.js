// NYQE Wealth Management - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initFormValidation();
    
    // Initialize walkthrough on homepage
    if (document.querySelector('.hero')) {
        initWalkthrough();
    }
    
    // Initialize calculators if on calculator page
    if (document.querySelector('.calculator-container')) {
        initCalculators();
    }
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        // Update toggle button text
        updateThemeToggleText(themeToggle, currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleText(themeToggle, newTheme);
        });
    }
}

function updateThemeToggleText(toggle, theme) {
    toggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i> Light' 
        : '<i class="fas fa-moon"></i> Dark';
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .card, .fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    field.classList.remove('is-valid', 'is-invalid');
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    // Show/hide custom error messages
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.style.display = isValid ? 'none' : 'block';
    }
}

// Walkthrough initialization
function initWalkthrough() {
    // Check if user has seen walkthrough before
    const hasSeenWalkthrough = localStorage.getItem('hasSeenWalkthrough');
    const dontShowAgain = localStorage.getItem('dontShowWalkthrough');
    
    if (!hasSeenWalkthrough && !dontShowAgain) {
        // Show walkthrough after a short delay
        setTimeout(() => {
            if (typeof showWalkthrough === 'function') {
                showWalkthrough();
            }
        }, 1000);
    }
}

// Calculator initialization
function initCalculators() {
    // Initialize range sliders
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const output = document.getElementById(input.id + '-value');
        if (output) {
            output.textContent = formatNumber(input.value);
            
            input.addEventListener('input', function() {
                output.textContent = formatNumber(this.value);
                if (typeof calculateResults === 'function') {
                    calculateResults();
                }
            });
        }
    });
    
    // Initialize form inputs
    const formInputs = document.querySelectorAll('.calculator-form input, .calculator-form select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (typeof calculateResults === 'function') {
                calculateResults();
            }
        });
    });
}

// Utility Functions
function formatNumber(num, options = {}) {
    const defaults = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };
    
    const config = { ...defaults, ...options };
    
    if (num >= 10000000) { // 1 crore
        return (num / 10000000).toLocaleString('en-IN', config) + ' Cr';
    } else if (num >= 100000) { // 1 lakh
        return (num / 100000).toLocaleString('en-IN', config) + ' L';
    } else if (num >= 1000) { // 1 thousand
        return (num / 1000).toLocaleString('en-IN', config) + 'K';
    } else {
        return num.toLocaleString('en-IN', config);
    }
}

function formatCurrency(amount) {
    return '₹' + formatNumber(amount, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Loading state management
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = '<span class="loading"></span> Loading...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}

// API call helper
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Export functions for use in other scripts
window.NYQEUtils = {
    formatNumber,
    formatCurrency,
    showToast,
    showLoading,
    hideLoading,
    apiCall
};
