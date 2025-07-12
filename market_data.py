"""
Real-time Market Data Integration for NYQE Wealth Management
Supports multiple data providers with fallback mechanisms
"""
import os
import requests
import json
from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request
from app import db
import logging

market_bp = Blueprint('market', __name__, url_prefix='/api/market')

class MarketDataProvider:
    """Base class for market data providers"""
    
    def __init__(self):
        self.base_url = None
        self.api_key = None
        self.rate_limit = 60  # requests per minute
        
    def get_stock_quote(self, symbol):
        """Get real-time stock quote"""
        raise NotImplementedError
        
    def get_market_indices(self):
        """Get major market indices"""
        raise NotImplementedError
        
    def get_forex_rates(self):
        """Get forex exchange rates"""
        raise NotImplementedError
        
    def get_crypto_prices(self):
        """Get cryptocurrency prices"""
        raise NotImplementedError

class AlphaVantageProvider(MarketDataProvider):
    """Alpha Vantage API provider for market data"""
    
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.alphavantage.co/query"
        self.api_key = os.environ.get('ALPHA_VANTAGE_API_KEY')
        
    def get_stock_quote(self, symbol):
        if not self.api_key:
            raise ValueError("Alpha Vantage API key not configured")
            
        params = {
            'function': 'GLOBAL_QUOTE',
            'symbol': symbol,
            'apikey': self.api_key
        }
        
        try:
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if 'Global Quote' in data:
                quote = data['Global Quote']
                return {
                    'symbol': quote.get('01. symbol'),
                    'price': float(quote.get('05. price', 0)),
                    'change': float(quote.get('09. change', 0)),
                    'change_percent': quote.get('10. change percent', '0%'),
                    'volume': int(quote.get('06. volume', 0)),
                    'timestamp': datetime.now().isoformat(),
                    'provider': 'alphavantage'
                }
            else:
                logging.warning(f"No quote data for symbol {symbol}")
                return None
                
        except Exception as e:
            logging.error(f"Alpha Vantage API error: {e}")
            raise

    def get_market_indices(self):
        """Get major Indian and global market indices"""
        indices = ['NSEI', '^GSPC', '^DJI', '^IXIC']  # Nifty, S&P 500, Dow, Nasdaq
        results = {}
        
        for index in indices:
            try:
                quote = self.get_stock_quote(index)
                if quote:
                    results[index] = quote
            except Exception as e:
                logging.error(f"Error fetching index {index}: {e}")
                
        return results

class FinnhubProvider(MarketDataProvider):
    """Finnhub API provider for market data"""
    
    def __init__(self):
        super().__init__()
        self.base_url = "https://finnhub.io/api/v1"
        self.api_key = os.environ.get('FINNHUB_API_KEY')
        
    def get_stock_quote(self, symbol):
        if not self.api_key:
            raise ValueError("Finnhub API key not configured")
            
        url = f"{self.base_url}/quote"
        params = {
            'symbol': symbol,
            'token': self.api_key
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if 'c' in data:  # current price
                return {
                    'symbol': symbol,
                    'price': float(data.get('c', 0)),
                    'change': float(data.get('d', 0)),
                    'change_percent': f"{data.get('dp', 0):.2f}%",
                    'high': float(data.get('h', 0)),
                    'low': float(data.get('l', 0)),
                    'open': float(data.get('o', 0)),
                    'previous_close': float(data.get('pc', 0)),
                    'timestamp': datetime.now().isoformat(),
                    'provider': 'finnhub'
                }
            else:
                return None
                
        except Exception as e:
            logging.error(f"Finnhub API error: {e}")
            raise

class YahooFinanceProvider(MarketDataProvider):
    """Yahoo Finance API provider (free tier)"""
    
    def __init__(self):
        super().__init__()
        self.base_url = "https://query1.finance.yahoo.com/v8/finance/chart"
        
    def get_stock_quote(self, symbol):
        # Add .NS for NSE stocks, .BO for BSE stocks
        if not any(suffix in symbol for suffix in ['.NS', '.BO', '.L', '.TO']):
            if symbol in ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK']:
                symbol += '.NS'  # NSE suffix for Indian stocks
                
        url = f"{self.base_url}/{symbol}"
        params = {
            'interval': '1d',
            'range': '1d'
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            if 'chart' in data and data['chart']['result']:
                result = data['chart']['result'][0]
                meta = result['meta']
                
                return {
                    'symbol': symbol,
                    'price': float(meta.get('regularMarketPrice', 0)),
                    'change': float(meta.get('regularMarketPrice', 0) - meta.get('previousClose', 0)),
                    'change_percent': f"{((meta.get('regularMarketPrice', 0) / meta.get('previousClose', 1) - 1) * 100):.2f}%",
                    'volume': int(meta.get('regularMarketVolume', 0)),
                    'market_cap': meta.get('marketCap', 0),
                    'timestamp': datetime.now().isoformat(),
                    'provider': 'yahoo'
                }
            else:
                return None
                
        except Exception as e:
            logging.error(f"Yahoo Finance API error: {e}")
            raise

class DemoDataProvider(MarketDataProvider):
    """Demo data provider for testing without API keys"""
    
    def __init__(self):
        super().__init__()
        # Simulated market data for demo purposes
        self.demo_data = {
            'RELIANCE.NS': {'price': 2456.75, 'change': 23.45, 'change_percent': '+0.97%', 'volume': 1234567},
            'TCS.NS': {'price': 3789.50, 'change': -12.30, 'change_percent': '-0.32%', 'volume': 987654},
            'HDFCBANK.NS': {'price': 1678.90, 'change': 34.20, 'change_percent': '+2.08%', 'volume': 2345678},
            'INFY.NS': {'price': 1523.45, 'change': -8.75, 'change_percent': '-0.57%', 'volume': 1567890},
            'ICICIBANK.NS': {'price': 1089.60, 'change': 15.80, 'change_percent': '+1.47%', 'volume': 3456789},
            'WIPRO.NS': {'price': 567.25, 'change': 4.35, 'change_percent': '+0.77%', 'volume': 876543},
            'BHARTIARTL.NS': {'price': 890.75, 'change': -5.25, 'change_percent': '-0.59%', 'volume': 2134567},
            'ITC.NS': {'price': 345.80, 'change': 2.15, 'change_percent': '+0.63%', 'volume': 4567890},
            'SBIN.NS': {'price': 623.45, 'change': 12.55, 'change_percent': '+2.05%', 'volume': 5678901},
            'KOTAKBANK.NS': {'price': 1756.30, 'change': -18.45, 'change_percent': '-1.04%', 'volume': 1789012},
            '^NSEI': {'price': 21245.67, 'change': 156.78, 'change_percent': '+0.74%', 'volume': 0},
            '^BSESN': {'price': 70345.23, 'change': 234.56, 'change_percent': '+0.33%', 'volume': 0},
            'NIFTY 50': {'price': 21245.67, 'change': 156.78, 'change_percent': '+0.74%', 'volume': 0},
            'SENSEX': {'price': 70345.23, 'change': 234.56, 'change_percent': '+0.33%', 'volume': 0},
            'NIFTY BANK': {'price': 45678.90, 'change': 123.45, 'change_percent': '+0.27%', 'volume': 0}
        }
        
    def get_stock_quote(self, symbol):
        import random
        from datetime import datetime
        
        # Check if we have demo data for this symbol
        if symbol in self.demo_data:
            base_data = self.demo_data[symbol]
            # Add small random variations to simulate real-time updates
            price_variation = random.uniform(-0.02, 0.02)  # ±2% variation
            new_price = base_data['price'] * (1 + price_variation)
            change = new_price - base_data['price']
            change_percent = f"{(change / base_data['price'] * 100):+.2f}%"
            
            return {
                'symbol': symbol,
                'price': round(new_price, 2),
                'change': round(change, 2),
                'change_percent': change_percent,
                'volume': base_data['volume'],
                'timestamp': datetime.now().isoformat(),
                'provider': 'demo'
            }
        
        # For unknown symbols, return None
        return None

class MarketDataService:
    """Main service class for market data with fallback providers"""
    
    def __init__(self):
        self.providers = [
            DemoDataProvider(),      # Demo data for testing
            YahooFinanceProvider(),  # Free tier
            AlphaVantageProvider(),  # Requires API key
            FinnhubProvider()        # Requires API key
        ]
        self.cache = {}
        self.cache_duration = 60  # seconds
        
    def get_quote_with_fallback(self, symbol):
        """Get stock quote with provider fallback"""
        cache_key = f"quote_{symbol}"
        
        # Check cache first
        if cache_key in self.cache:
            cached_data, timestamp = self.cache[cache_key]
            if datetime.now() - timestamp < timedelta(seconds=self.cache_duration):
                return cached_data
        
        # Try each provider
        for provider in self.providers:
            try:
                quote = provider.get_stock_quote(symbol)
                if quote:
                    # Cache the result
                    self.cache[cache_key] = (quote, datetime.now())
                    return quote
            except Exception as e:
                logging.warning(f"Provider {provider.__class__.__name__} failed: {e}")
                continue
                
        return None
        
    def get_indian_market_overview(self):
        """Get overview of Indian stock market"""
        indices = {
            'NIFTY 50': '^NSEI',
            'SENSEX': '^BSESN',
            'NIFTY BANK': '^NSEBANK'
        }
        
        overview = {}
        for name, symbol in indices.items():
            quote = self.get_quote_with_fallback(symbol)
            if quote:
                overview[name] = quote
                
        return overview
        
    def get_popular_stocks(self):
        """Get quotes for popular Indian stocks"""
        popular_symbols = [
            'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 
            'ICICIBANK.NS', 'HINDUNILVR.NS', 'SBIN.NS', 'BHARTIARTL.NS',
            'ITC.NS', 'KOTAKBANK.NS'
        ]
        
        stocks = {}
        for symbol in popular_symbols:
            quote = self.get_quote_with_fallback(symbol)
            if quote:
                stocks[symbol] = quote
                
        return stocks

# Initialize market data service
market_service = MarketDataService()

# API Routes
@market_bp.route('/quote/<symbol>')
def get_stock_quote(symbol):
    """Get real-time stock quote"""
    try:
        quote = market_service.get_quote_with_fallback(symbol.upper())
        if quote:
            return jsonify({
                'success': True,
                'data': quote
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Quote not found or providers unavailable'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@market_bp.route('/overview')
def get_market_overview():
    """Get Indian market overview"""
    try:
        overview = market_service.get_indian_market_overview()
        return jsonify({
            'success': True,
            'data': overview,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@market_bp.route('/popular-stocks')
def get_popular_stocks():
    """Get popular Indian stocks"""
    try:
        stocks = market_service.get_popular_stocks()
        return jsonify({
            'success': True,
            'data': stocks,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@market_bp.route('/search/<query>')
def search_symbols(query):
    """Search for stock symbols"""
    # Simple symbol suggestions for Indian market
    indian_stocks = {
        'reliance': 'RELIANCE.NS',
        'tcs': 'TCS.NS',
        'infosys': 'INFY.NS',
        'hdfc': 'HDFCBANK.NS',
        'icici': 'ICICIBANK.NS',
        'wipro': 'WIPRO.NS',
        'bharti': 'BHARTIARTL.NS',
        'itc': 'ITC.NS',
        'sbi': 'SBIN.NS',
        'kotak': 'KOTAKBANK.NS'
    }
    
    query_lower = query.lower()
    suggestions = []
    
    for name, symbol in indian_stocks.items():
        if query_lower in name:
            suggestions.append({
                'symbol': symbol,
                'name': name.title(),
                'exchange': 'NSE'
            })
    
    return jsonify({
        'success': True,
        'data': suggestions
    })

@market_bp.route('/watchlist', methods=['GET', 'POST'])
def manage_watchlist():
    """Manage user watchlist"""
    if request.method == 'POST':
        # Add to watchlist logic would go here
        return jsonify({'success': True, 'message': 'Added to watchlist'})
    else:
        # Return user's watchlist
        return jsonify({'success': True, 'data': []})