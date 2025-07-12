// NYQE Wealth Management - Financial Calculators

// Global calculator utilities
const CalculatorUtils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    formatNumber: (num) => {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(2) + ' Cr';
        } else if (num >= 100000) {
            return (num / 100000).toFixed(2) + ' L';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString('en-IN');
    },
    
    showLoading: (buttonId) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = true;
            button.innerHTML = '<span class="loading"></span> Calculating...';
        }
    },
    
    hideLoading: (buttonId, originalText) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    },
    
    updateResults: (containerId, data) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = 'block';
            container.classList.add('fade-in');
        }
    }
};

// SIP Calculator
class SIPCalculator {
    constructor() {
        this.monthlyInvestment = 5000;
        this.annualReturn = 12;
        this.timePeriod = 10;
        this.chart = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        const monthlyInput = document.getElementById('monthly-investment');
        const returnInput = document.getElementById('annual-return');
        const timeInput = document.getElementById('time-period');
        
        if (monthlyInput) {
            monthlyInput.addEventListener('input', (e) => {
                this.monthlyInvestment = parseFloat(e.target.value);
                document.getElementById('monthly-investment-value').textContent = 
                    CalculatorUtils.formatCurrency(this.monthlyInvestment);
                this.calculate();
            });
        }
        
        if (returnInput) {
            returnInput.addEventListener('input', (e) => {
                this.annualReturn = parseFloat(e.target.value);
                document.getElementById('annual-return-value').textContent = this.annualReturn + '%';
                this.calculate();
            });
        }
        
        if (timeInput) {
            timeInput.addEventListener('input', (e) => {
                this.timePeriod = parseInt(e.target.value);
                document.getElementById('time-period-value').textContent = this.timePeriod + ' years';
                this.calculate();
            });
        }
    }
    
    calculate() {
        try {
            // Calculate SIP returns using compound interest formula
            const monthlyRate = this.annualReturn / 12 / 100;
            const months = this.timePeriod * 12;
            
            let futureValue = 0;
            if (monthlyRate > 0) {
                futureValue = this.monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
            } else {
                futureValue = this.monthlyInvestment * months;
            }
            
            const totalInvestment = this.monthlyInvestment * months;
            const totalReturns = futureValue - totalInvestment;
            
            // Generate yearly breakdown
            const yearlyBreakdown = [];
            for (let year = 1; year <= this.timePeriod; year++) {
                const monthsCompleted = year * 12;
                const investmentTillNow = this.monthlyInvestment * monthsCompleted;
                
                let valueTillNow = 0;
                if (monthlyRate > 0) {
                    valueTillNow = this.monthlyInvestment * (((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) * (1 + monthlyRate));
                } else {
                    valueTillNow = investmentTillNow;
                }
                
                yearlyBreakdown.push({
                    year: year,
                    investment: investmentTillNow,
                    value: Math.round(valueTillNow),
                    gains: Math.round(valueTillNow - investmentTillNow)
                });
            }
            
            const data = {
                future_value: Math.round(futureValue),
                total_investment: totalInvestment,
                total_returns: Math.round(totalReturns),
                yearly_breakdown: yearlyBreakdown
            };
            
            this.displayResults(data);
            this.createChart(data.yearly_breakdown);
            
        } catch (error) {
            console.error('SIP calculation error:', error);
            this.showError(error.message);
        }
    }
    
    displayResults(data) {
        document.getElementById('future-value').textContent = CalculatorUtils.formatCurrency(data.future_value);
        document.getElementById('total-investment').textContent = CalculatorUtils.formatCurrency(data.total_investment);
        document.getElementById('total-returns').textContent = CalculatorUtils.formatCurrency(data.total_returns);
        
        const returnsPercentage = ((data.total_returns / data.total_investment) * 100).toFixed(1);
        document.getElementById('returns-percentage').textContent = returnsPercentage + '%';
        
        document.getElementById('sip-results').style.display = 'block';
    }
    
    createChart(yearlyData) {
        const ctx = document.getElementById('sip-chart');
        if (!ctx) return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const labels = yearlyData.map(item => 'Year ' + item.year);
        const investmentData = yearlyData.map(item => item.investment);
        const valueData = yearlyData.map(item => item.value);
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Investment',
                    data: investmentData,
                    borderColor: '#1a365d',
                    backgroundColor: 'rgba(26, 54, 93, 0.1)',
                    fill: false,
                    tension: 0.4
                }, {
                    label: 'Investment Value',
                    data: valueData,
                    borderColor: '#00d4aa',
                    backgroundColor: 'rgba(0, 212, 170, 0.1)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       CalculatorUtils.formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return CalculatorUtils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    showError(message) {
        const errorDiv = document.getElementById('calculation-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
}

// Lumpsum Calculator
class LumpsumCalculator {
    constructor() {
        this.investmentAmount = 100000;
        this.annualReturn = 12;
        this.timePeriod = 10;
        this.chart = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        const amountInput = document.getElementById('investment-amount');
        const returnInput = document.getElementById('annual-return');
        const timeInput = document.getElementById('time-period');
        
        if (amountInput) {
            amountInput.addEventListener('input', (e) => {
                this.investmentAmount = parseFloat(e.target.value);
                document.getElementById('investment-amount-value').textContent = 
                    CalculatorUtils.formatCurrency(this.investmentAmount);
                this.calculate();
            });
        }
        
        if (returnInput) {
            returnInput.addEventListener('input', (e) => {
                this.annualReturn = parseFloat(e.target.value);
                document.getElementById('annual-return-value').textContent = this.annualReturn + '%';
                this.calculate();
            });
        }
        
        if (timeInput) {
            timeInput.addEventListener('input', (e) => {
                this.timePeriod = parseInt(e.target.value);
                document.getElementById('time-period-value').textContent = this.timePeriod + ' years';
                this.calculate();
            });
        }
    }
    
    calculate() {
        try {
            // Calculate lumpsum returns using compound interest formula
            const rate = this.annualReturn / 100;
            const futureValue = this.investmentAmount * Math.pow(1 + rate, this.timePeriod);
            const totalReturns = futureValue - this.investmentAmount;
            
            // Generate yearly breakdown
            const yearlyBreakdown = [];
            for (let year = 1; year <= this.timePeriod; year++) {
                const value = this.investmentAmount * Math.pow(1 + rate, year);
                const gains = value - this.investmentAmount;
                
                yearlyBreakdown.push({
                    year: year,
                    investment: this.investmentAmount,
                    value: Math.round(value),
                    gains: Math.round(gains)
                });
            }
            
            const data = {
                future_value: Math.round(futureValue),
                total_investment: this.investmentAmount,
                total_returns: Math.round(totalReturns),
                yearly_breakdown: yearlyBreakdown
            };
            
            this.displayResults(data);
            this.createChart(data.yearly_breakdown);
            
        } catch (error) {
            console.error('Lumpsum calculation error:', error);
            this.showError(error.message);
        }
    }
    
    displayResults(data) {
        document.getElementById('future-value').textContent = CalculatorUtils.formatCurrency(data.future_value);
        document.getElementById('total-investment').textContent = CalculatorUtils.formatCurrency(data.total_investment);
        document.getElementById('total-returns').textContent = CalculatorUtils.formatCurrency(data.total_returns);
        
        const returnsPercentage = ((data.total_returns / data.total_investment) * 100).toFixed(1);
        document.getElementById('returns-percentage').textContent = returnsPercentage + '%';
        
        document.getElementById('lumpsum-results').style.display = 'block';
    }
    
    createChart(yearlyData) {
        const ctx = document.getElementById('lumpsum-chart');
        if (!ctx) return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const labels = yearlyData.map(item => 'Year ' + item.year);
        const valueData = yearlyData.map(item => item.value);
        const returnsData = yearlyData.map(item => item.returns);
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Investment Value',
                    data: valueData,
                    backgroundColor: 'rgba(0, 212, 170, 0.8)',
                    borderColor: '#00d4aa',
                    borderWidth: 1
                }, {
                    label: 'Returns',
                    data: returnsData,
                    backgroundColor: 'rgba(255, 215, 0, 0.8)',
                    borderColor: '#ffd700',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       CalculatorUtils.formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: false
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return CalculatorUtils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    showError(message) {
        const errorDiv = document.getElementById('calculation-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
}

// EMI Calculator
class EMICalculator {
    constructor() {
        this.loanAmount = 1000000;
        this.annualRate = 9;
        this.tenureYears = 20;
        this.chart = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        const amountInput = document.getElementById('loan-amount');
        const rateInput = document.getElementById('annual-rate');
        const tenureInput = document.getElementById('tenure-years');
        
        if (amountInput) {
            amountInput.addEventListener('input', (e) => {
                this.loanAmount = parseFloat(e.target.value);
                document.getElementById('loan-amount-value').textContent = 
                    CalculatorUtils.formatCurrency(this.loanAmount);
                this.calculate();
            });
        }
        
        if (rateInput) {
            rateInput.addEventListener('input', (e) => {
                this.annualRate = parseFloat(e.target.value);
                document.getElementById('annual-rate-value').textContent = this.annualRate + '%';
                this.calculate();
            });
        }
        
        if (tenureInput) {
            tenureInput.addEventListener('input', (e) => {
                this.tenureYears = parseInt(e.target.value);
                document.getElementById('tenure-years-value').textContent = this.tenureYears + ' years';
                this.calculate();
            });
        }
    }
    
    calculate() {
        try {
            // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
            const monthlyRate = this.annualRate / 12 / 100;
            const months = this.tenureYears * 12;
            
            let emi = 0;
            if (monthlyRate > 0) {
                emi = this.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                      (Math.pow(1 + monthlyRate, months) - 1);
            } else {
                emi = this.loanAmount / months;
            }
            
            const totalPayment = emi * months;
            const totalInterest = totalPayment - this.loanAmount;
            
            // Generate yearly breakdown
            const yearlyBreakdown = [];
            let balance = this.loanAmount;
            
            for (let year = 1; year <= this.tenureYears; year++) {
                let yearlyPrincipal = 0;
                let yearlyInterest = 0;
                
                for (let month = 1; month <= 12 && balance > 0; month++) {
                    const monthlyInterest = balance * monthlyRate;
                    const monthlyPrincipal = emi - monthlyInterest;
                    
                    yearlyPrincipal += monthlyPrincipal;
                    yearlyInterest += monthlyInterest;
                    balance -= monthlyPrincipal;
                }
                
                yearlyBreakdown.push({
                    year: year,
                    principal: Math.round(yearlyPrincipal),
                    interest: Math.round(yearlyInterest),
                    balance: Math.max(0, Math.round(balance))
                });
            }
            
            const data = {
                emi: Math.round(emi),
                total_payment: Math.round(totalPayment),
                total_interest: Math.round(totalInterest),
                loan_amount: this.loanAmount,
                yearly_breakdown: yearlyBreakdown
            };
            
            this.displayResults(data);
            this.createChart(data.yearly_breakdown);
            
        } catch (error) {
            console.error('EMI calculation error:', error);
            this.showError(error.message);
        }
    }
    
    displayResults(data) {
        document.getElementById('monthly-emi').textContent = CalculatorUtils.formatCurrency(data.emi);
        document.getElementById('total-payment').textContent = CalculatorUtils.formatCurrency(data.total_payment);
        document.getElementById('total-interest').textContent = CalculatorUtils.formatCurrency(data.total_interest);
        
        const interestPercentage = ((data.total_interest / data.loan_amount) * 100).toFixed(1);
        document.getElementById('interest-percentage').textContent = interestPercentage + '%';
        
        document.getElementById('emi-results').style.display = 'block';
    }
    
    createChart(yearlyData) {
        const ctx = document.getElementById('emi-chart');
        if (!ctx) return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const labels = yearlyData.map(item => 'Year ' + item.year);
        const principalData = yearlyData.map(item => item.principal);
        const interestData = yearlyData.map(item => item.interest);
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: 'rgba(0, 212, 170, 0.8)',
                    borderColor: '#00d4aa',
                    borderWidth: 1
                }, {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: 'rgba(220, 38, 38, 0.8)',
                    borderColor: '#dc2626',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       CalculatorUtils.formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return CalculatorUtils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    showError(message) {
        const errorDiv = document.getElementById('calculation-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
}

// Initialize calculators based on page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('/calculators/sip')) {
        new SIPCalculator();
    } else if (path.includes('/calculators/lumpsum')) {
        new LumpsumCalculator();
    } else if (path.includes('/calculators/emi')) {
        new EMICalculator();
    }
    
    // Add print functionality
    const printBtn = document.getElementById('print-results');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Add download functionality
    const downloadBtn = document.getElementById('download-results');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Implement PDF download functionality
            alert('Download functionality will be implemented');
        });
    }
});

// Export utilities
window.CalculatorUtils = CalculatorUtils;
