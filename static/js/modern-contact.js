/* Modern Contact Form JavaScript - Simplified and Robust */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Hide loading overlay
    hideLoadingOverlay();
    
    // Initialize form features
    initializeFormFeatures();
    
    // Add form validation
    initializeFormValidation();
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
            setTimeout(function() {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 800);
    }
}

function initializeFormFeatures() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    // Add input animations
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(function(input, index) {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            input.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
    
    // Add focus effects
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Format investment amount
    const investmentField = document.getElementById('investment_amount');
    if (investmentField) {
        investmentField.addEventListener('blur', function() {
            formatCurrency(this);
        });
    }
    
    // Format phone number
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            formatPhone(this);
        });
    }
}

function initializeFormValidation() {
    const form = document.getElementById('consultationForm');
    if (!form) return;
    
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    
    // Email validation
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidEmail(value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // Phone validation
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidPhone(value)) {
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            return false;
        }
        
        setSubmitButtonLoading(true);
        return true;
    });
}

function validateForm() {
    const form = document.getElementById('consultationForm');
    if (!form) return true;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let firstErrorField = null;
    
    requiredFields.forEach(function(field) {
        const value = field.value.trim();
        clearFieldError(field);
        
        if (!value) {
            showFieldError(field, 'This field is required');
            isValid = false;
            if (!firstErrorField) firstErrorField = field;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
            if (!firstErrorField) firstErrorField = field;
        } else if (field.name === 'phone' && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
            if (!firstErrorField) firstErrorField = field;
        }
    });
    
    if (!isValid && firstErrorField) {
        scrollToField(firstErrorField);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElements = field.parentElement.querySelectorAll('.error-message');
    errorElements.forEach(function(el) {
        if (!el.classList.contains('server-error')) {
            el.remove();
        }
    });
}

function scrollToField(field) {
    field.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    setTimeout(function() {
        field.focus();
    }, 500);
}

function setSubmitButtonLoading(loading) {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;
    
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>Submitting...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Book Free Consultation</span><span class="btn-icon">📅</span>';
    }
}

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    if (value) {
        value = parseInt(value).toLocaleString('en-IN');
        input.value = value;
    }
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        if (value.startsWith('91') && value.length === 12) {
            value = '+91 ' + value.substring(2, 7) + ' ' + value.substring(7);
        } else if (value.length === 10) {
            value = value.substring(0, 5) + ' ' + value.substring(5);
        }
        input.value = value;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
    return phoneRegex.test(phone);
}

// Handle form submission success
window.addEventListener('load', function() {
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        setTimeout(function() {
            resultContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }
});

// CSS injection for error states and animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.form-group.focused .form-label {
    color: var(--primary-color);
    transform: translateY(-2px);
    transition: all 0.2s ease;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(additionalStyles);