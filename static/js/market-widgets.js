/**
 * Market Data Widgets for NYQE Wealth Management
 * Real-time market data components for dashboard integration
 */

class MarketWidget {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            refreshInterval: 60000, // 1 minute
            showChanges: true,
            maxItems: 5,
            ...options
        };
        this.isLoading = false;
        this.data = {};
        this.intervalId = null;
        
        this.init();
    }
    
    init() {
        this.render();
        this.loadData();
        this.startAutoRefresh();
    }
    
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="market-widget">
                <div class="widget-header">
                    <h3 class="widget-title">${this.options.title || 'Market Data'}</h3>
                    <button class="refresh-btn" onclick="window.marketWidgets?.['${this.container.id}']?.refreshData()">
                        ↻
                    </button>
                </div>
                <div class="widget-content" id="${this.container.id}-content">
                    <div class="loading-state">
                        <div class="spinner"></div>
                        <span>Loading market data...</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS if not already added
        if (!document.getElementById('market-widget-styles')) {
            this.addStyles();
        }
    }
    
    addStyles() {
        const styles = `
            <style id="market-widget-styles">
                .market-widget {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    margin-bottom: 1.5rem;
                }
                
                .widget-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 2px solid #f0f0f0;
                }
                
                .widget-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                }
                
                .refresh-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    padding: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .refresh-btn:hover {
                    background: #5a67d8;
                    transform: rotate(180deg);
                }
                
                .market-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f8f9fa;
                }
                
                .market-item:last-child {
                    border-bottom: none;
                }
                
                .stock-info {
                    flex: 1;
                }
                
                .stock-symbol {
                    font-weight: 600;
                    color: #333;
                    font-size: 0.9rem;
                    margin-bottom: 0.25rem;
                }
                
                .stock-name {
                    color: #666;
                    font-size: 0.8rem;
                }
                
                .stock-price {
                    text-align: right;
                }
                
                .price {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #333;
                    margin-bottom: 0.25rem;
                }
                
                .change {
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .positive {
                    color: #10b981;
                }
                
                .negative {
                    color: #ef4444;
                }
                
                .loading-state {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    color: #666;
                    gap: 0.5rem;
                }
                
                .spinner {
                    width: 1.5rem;
                    height: 1.5rem;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .error-state {
                    text-align: center;
                    padding: 1.5rem;
                    color: #dc2626;
                    background: #fef2f2;
                    border-radius: 8px;
                    border: 1px solid #fecaca;
                }
                
                .compact-view .market-item {
                    padding: 0.5rem 0;
                }
                
                .compact-view .stock-symbol {
                    font-size: 0.85rem;
                }
                
                .compact-view .price {
                    font-size: 0.9rem;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    async loadData() {
        this.isLoading = true;
        const contentDiv = document.getElementById(`${this.container.id}-content`);
        
        try {
            const response = await fetch(this.options.endpoint);
            const result = await response.json();
            
            if (result.success) {
                this.data = result.data;
                this.renderData();
            } else {
                this.renderError(result.error || 'Failed to load data');
            }
        } catch (error) {
            this.renderError(`Network error: ${error.message}`);
        } finally {
            this.isLoading = false;
        }
    }
    
    renderData() {
        const contentDiv = document.getElementById(`${this.container.id}-content`);
        if (!contentDiv || !this.data) return;
        
        let html = '';
        let count = 0;
        
        for (const [symbol, data] of Object.entries(this.data)) {
            if (count >= this.options.maxItems) break;
            
            const name = this.formatSymbolName(symbol);
            const price = this.formatPrice(data.price || 0);
            const change = this.formatChange(data.change || 0, data.change_percent || '0%');
            
            html += `
                <div class="market-item">
                    <div class="stock-info">
                        <div class="stock-symbol">${symbol}</div>
                        <div class="stock-name">${name}</div>
                    </div>
                    <div class="stock-price">
                        <div class="price">${price}</div>
                        ${this.options.showChanges ? `<div class="change">${change}</div>` : ''}
                    </div>
                </div>
            `;
            count++;
        }
        
        contentDiv.innerHTML = html || '<div class="error-state">No data available</div>';
    }
    
    renderError(message) {
        const contentDiv = document.getElementById(`${this.container.id}-content`);
        if (contentDiv) {
            contentDiv.innerHTML = `<div class="error-state">${message}</div>`;
        }
    }
    
    formatSymbolName(symbol) {
        const nameMap = {
            'NIFTY 50': 'Nifty 50',
            'SENSEX': 'BSE Sensex',
            'NIFTY BANK': 'Nifty Bank',
            '^NSEI': 'Nifty 50',
            '^BSESN': 'BSE Sensex'
        };
        
        if (nameMap[symbol]) return nameMap[symbol];
        
        return symbol.replace('.NS', '').replace('.BO', '');
    }
    
    formatPrice(price) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    }
    
    formatChange(change, changePercent) {
        const isPositive = change >= 0;
        const symbol = isPositive ? '+' : '';
        const className = isPositive ? 'positive' : 'negative';
        
        return `<span class="${className}">${symbol}${change.toFixed(2)} (${changePercent})</span>`;
    }
    
    refreshData() {
        if (!this.isLoading) {
            this.loadData();
        }
    }
    
    startAutoRefresh() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.refreshData();
        }, this.options.refreshInterval);
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Global widget manager
window.marketWidgets = {};

// Convenience functions
window.createMarketIndicesWidget = function(containerId, options = {}) {
    const widget = new MarketWidget(containerId, {
        title: 'Market Indices',
        endpoint: '/api/market/overview',
        maxItems: 5,
        ...options
    });
    window.marketWidgets[containerId] = widget;
    return widget;
};

window.createPopularStocksWidget = function(containerId, options = {}) {
    const widget = new MarketWidget(containerId, {
        title: 'Popular Stocks',
        endpoint: '/api/market/popular-stocks',
        maxItems: 8,
        ...options
    });
    window.marketWidgets[containerId] = widget;
    return widget;
};

window.createCompactMarketWidget = function(containerId, options = {}) {
    const widget = new MarketWidget(containerId, {
        title: 'Market Overview',
        endpoint: '/api/market/overview',
        maxItems: 3,
        refreshInterval: 30000, // 30 seconds
        ...options
    });
    
    // Add compact styling
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.add('compact-view');
    }
    
    window.marketWidgets[containerId] = widget;
    return widget;
};

// Cleanup function
window.destroyMarketWidgets = function() {
    Object.values(window.marketWidgets).forEach(widget => widget.destroy());
    window.marketWidgets = {};
};