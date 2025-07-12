// NYQE Wealth Management - Chart Configurations

// Chart.js default configuration
Chart.defaults.font.family = "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#718096';

// Default chart options
const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    weight: '600'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(26, 54, 93, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#00d4aa',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12,
            titleFont: {
                weight: '600'
            },
            bodyFont: {
                weight: '500'
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(226, 232, 240, 0.5)',
                drawBorder: false
            },
            ticks: {
                font: {
                    weight: '500'
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(226, 232, 240, 0.5)',
                drawBorder: false
            },
            ticks: {
                font: {
                    weight: '500'
                }
            }
        }
    },
    elements: {
        line: {
            tension: 0.4,
            borderWidth: 3,
            fill: false
        },
        point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
            backgroundColor: '#ffffff'
        },
        bar: {
            borderRadius: 4,
            borderSkipped: false
        }
    }
};

// Color schemes
const colorSchemes = {
    primary: {
        main: '#1a365d',
        light: '#2d5a87',
        gradient: 'linear-gradient(135deg, #1a365d, #2d5a87)'
    },
    secondary: {
        main: '#00d4aa',
        light: '#33ddb8',
        gradient: 'linear-gradient(135deg, #00d4aa, #33ddb8)'
    },
    accent: {
        main: '#ffd700',
        light: '#ffed4e',
        gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    },
    success: {
        main: '#059669',
        light: '#34d399',
        gradient: 'linear-gradient(135deg, #059669, #34d399)'
    },
    warning: {
        main: '#d97706',
        light: '#fbbf24',
        gradient: 'linear-gradient(135deg, #d97706, #fbbf24)'
    },
    danger: {
        main: '#dc2626',
        light: '#f87171',
        gradient: 'linear-gradient(135deg, #dc2626, #f87171)'
    }
};

// Chart creation utilities
const ChartUtils = {
    createGradient: (ctx, colorScheme, direction = 'vertical') => {
        const gradient = direction === 'vertical' 
            ? ctx.createLinearGradient(0, 0, 0, 400)
            : ctx.createLinearGradient(0, 0, 400, 0);
        
        gradient.addColorStop(0, colorScheme.main);
        gradient.addColorStop(1, colorScheme.light);
        return gradient;
    },
    
    formatCurrency: (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    },
    
    formatNumber: (num) => {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1) + 'Cr';
        } else if (num >= 100000) {
            return (num / 100000).toFixed(1) + 'L';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString('en-IN');
    },
    
    createSIPChart: (ctx, data) => {
        const gradient1 = ChartUtils.createGradient(ctx, colorSchemes.primary);
        const gradient2 = ChartUtils.createGradient(ctx, colorSchemes.secondary);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Total Investment',
                    data: data.investmentData,
                    borderColor: colorSchemes.primary.main,
                    backgroundColor: gradient1,
                    fill: true
                }, {
                    label: 'Investment Value',
                    data: data.valueData,
                    borderColor: colorSchemes.secondary.main,
                    backgroundColor: gradient2,
                    fill: true
                }]
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        ...defaultChartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       ChartUtils.formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    ...defaultChartOptions.scales,
                    y: {
                        ...defaultChartOptions.scales.y,
                        ticks: {
                            ...defaultChartOptions.scales.y.ticks,
                            callback: function(value) {
                                return ChartUtils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    },
    
    createPieChart: (ctx, data, title) => {
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        colorSchemes.primary.main,
                        colorSchemes.secondary.main,
                        colorSchemes.accent.main,
                        colorSchemes.success.main,
                        colorSchemes.warning.main
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                ...defaultChartOptions,
                cutout: '60%',
                plugins: {
                    ...defaultChartOptions.plugins,
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        ...defaultChartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const percentage = ((context.raw / data.total) * 100).toFixed(1);
                                return context.label + ': ' + 
                                       ChartUtils.formatCurrency(context.raw) + 
                                       ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    },
    
    createBarChart: (ctx, data, stacked = false) => {
        const datasets = data.datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: Object.values(colorSchemes)[index % Object.keys(colorSchemes).length].main,
            borderColor: Object.values(colorSchemes)[index % Object.keys(colorSchemes).length].light,
            borderWidth: 1
        }));
        
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: datasets
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        ...defaultChartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + 
                                       ChartUtils.formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    ...defaultChartOptions.scales,
                    x: {
                        ...defaultChartOptions.scales.x,
                        stacked: stacked
                    },
                    y: {
                        ...defaultChartOptions.scales.y,
                        stacked: stacked,
                        ticks: {
                            ...defaultChartOptions.scales.y.ticks,
                            callback: function(value) {
                                return ChartUtils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    },
    
    createComparisonChart: (ctx, investments) => {
        const labels = investments.map(inv => inv.name);
        const returns = investments.map(inv => parseFloat(inv.expected_returns));
        const risks = investments.map(inv => {
            const riskMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
            return riskMap[inv.risk_level] || 2;
        });
        
        return new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Investment Options',
                    data: investments.map((inv, index) => ({
                        x: risks[index],
                        y: returns[index],
                        label: inv.name
                    })),
                    backgroundColor: colorSchemes.secondary.main,
                    borderColor: colorSchemes.primary.main,
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                ...defaultChartOptions,
                scales: {
                    x: {
                        ...defaultChartOptions.scales.x,
                        title: {
                            display: true,
                            text: 'Risk Level',
                            font: {
                                weight: '600'
                            }
                        },
                        ticks: {
                            callback: function(value) {
                                const riskLabels = ['', 'Low', 'Medium', 'High'];
                                return riskLabels[value] || '';
                            }
                        },
                        min: 0.5,
                        max: 3.5
                    },
                    y: {
                        ...defaultChartOptions.scales.y,
                        title: {
                            display: true,
                            text: 'Expected Returns (%)',
                            font: {
                                weight: '600'
                            }
                        }
                    }
                },
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        ...defaultChartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.raw.label + 
                                       ' - Returns: ' + context.raw.y + '%';
                            }
                        }
                    }
                }
            }
        });
    }
};

// Animation configurations
const animationConfigs = {
    fadeIn: {
        duration: 800,
        easing: 'easeOutQuart'
    },
    slideUp: {
        duration: 1000,
        easing: 'easeOutQuart',
        from: {
            y: 100,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        }
    },
    countUp: {
        duration: 1500,
        easing: 'easeOutExpo'
    }
};

// Export utilities
window.ChartUtils = ChartUtils;
window.colorSchemes = colorSchemes;
window.defaultChartOptions = defaultChartOptions;
window.animationConfigs = animationConfigs;
