// Multi-language System
const translations = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.services': 'Servicios',
        'nav.featured': 'Destacados',
        'nav.contact': 'Contacto',
        
        // Hero Section
        'hero.greeting': 'Hola, soy',
        'hero.subtitle': 'Creador de Contenido Crypto | Especialista en Trading | Educador Blockchain',
        'hero.description': 'Transformo el mundo crypto en contenido educativo accesible. Especializado en análisis de mercado, trading educativo y creación de comunidad alrededor de la tecnología blockchain.',
        'hero.work': 'Ver Mi Trabajo',
        'hero.collaborate': 'Trabajemos Juntos',
        
        // Services Section
        'services.title': 'Mis Servicios',
        'services.subtitle': 'Servicios especializados en crypto y contenido educativo',
        
        // Service Cards
        'service.gamenight.title': 'Game Night',
        'service.gamenight.desc': 'Sesiones de gaming en vivo con análisis de mercado crypto y entretenimiento educativo.',
        'service.gamenight.features.0': 'Streams de gaming',
        'service.gamenight.features.1': 'Análisis de crypto en tiempo real',
        'service.gamenight.features.2': 'Interacción con la comunidad',
        'service.gamenight.features.3': 'Educación financiera',
        
        'service.videos.features.0': 'Análisis de mercado',
        'service.videos.features.1': 'Tutoriales de trading',
        'service.videos.features.2': 'Noticias crypto',
        'service.videos.features.3': 'Contenido educativo',
        
        'service.streams.features.0': 'Trading en vivo',
        'service.streams.features.1': 'Análisis técnico',
        'service.streams.features.2': 'Q&A con la comunidad',
        'service.streams.features.3': 'Educación interactiva',
        
        'service.shorts.features.0': 'Tips rápidos de crypto',
        'service.shorts.features.1': 'Contenido viral',
        'service.shorts.features.2': 'Educación condensada',
        'service.shorts.features.3': 'Trending topics',
        
        'service.packs.features.0': 'Análisis mensuales',
        'service.packs.features.1': 'Estrategias exclusivas',
        'service.packs.features.2': 'Reportes detallados',
        'service.packs.features.3': 'Acceso prioritario',
        
        'service.events.features.0': 'Conferencias crypto',
        'service.events.features.1': 'Meetups de comunidad',
        'service.events.features.2': 'Workshops educativos',
        'service.events.features.3': 'Networking profesional',
        
        // Featured Section
        'featured.title': 'Trabajos Destacados',
        'featured.subtitle': 'Videos virales y contenido que generó impacto',
        
        // Contact Section
        'contact.title': 'Conectemos',
        'contact.subtitle': 'Sígueme en mis redes sociales',
        
        // Footer
        'footer.text': '© 2025 CaBsCrypto. Todos los derechos reservados.',
        'footer.made': 'Hecho con ❤️ para la comunidad crypto'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.featured': 'Featured',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.greeting': 'Hello, I\'m',
        'hero.subtitle': 'Crypto Content Creator | Trading Specialist | Blockchain Educator',
        'hero.description': 'I transform the crypto world into accessible educational content. Specialized in market analysis, educational trading, and community building around blockchain technology.',
        'hero.work': 'View My Work',
        'hero.collaborate': 'Let\'s Work Together',
        
        // Services Section
        'services.title': 'My Services',
        'services.subtitle': 'Specialized services in crypto and educational content',
        
        // Service Cards
        'service.gamenight.title': 'Game Night',
        'service.gamenight.desc': 'Live gaming sessions with crypto market analysis and educational entertainment.',
        'service.gamenight.features.0': 'Gaming streams',
        'service.gamenight.features.1': 'Real-time crypto analysis',
        'service.gamenight.features.2': 'Community interaction',
        'service.gamenight.features.3': 'Financial education',
        
        'service.videos.features.0': 'Market analysis',
        'service.videos.features.1': 'Trading tutorials',
        'service.videos.features.2': 'Crypto news',
        'service.videos.features.3': 'Educational content',
        
        'service.streams.features.0': 'Live trading',
        'service.streams.features.1': 'Technical analysis',
        'service.streams.features.2': 'Community Q&A',
        'service.streams.features.3': 'Interactive education',
        
        'service.shorts.features.0': 'Quick crypto tips',
        'service.shorts.features.1': 'Viral content',
        'service.shorts.features.2': 'Condensed education',
        'service.shorts.features.3': 'Trending topics',
        
        'service.packs.features.0': 'Monthly analysis',
        'service.packs.features.1': 'Exclusive strategies',
        'service.packs.features.2': 'Detailed reports',
        'service.packs.features.3': 'Priority access',
        
        'service.events.features.0': 'Crypto conferences',
        'service.events.features.1': 'Community meetups',
        'service.events.features.2': 'Educational workshops',
        'service.events.features.3': 'Professional networking',
        
        // Featured Section
        'featured.title': 'Featured Work',
        'featured.subtitle': 'Viral videos and content that made an impact',
        
        // Contact Section
        'contact.title': 'Let\'s Connect',
        'contact.subtitle': 'Follow me on my social networks',
        
        // Footer
        'footer.text': '© 2025 CaBsCrypto. All rights reserved.',
        'footer.made': 'Made with ❤️ for the crypto community'
    }
};

// Current language
let currentLanguage = 'es';

// Language switching function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateLanguage();
    localStorage.setItem('preferred-language', currentLanguage);
}

// Update all text elements
function updateLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = translations[currentLanguage][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update language button
    const langButton = document.getElementById('current-lang');
    if (langButton) {
        langButton.textContent = currentLanguage.toUpperCase();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update page title
    document.title = currentLanguage === 'es' ? 'CaBsCrypto - Creador de Contenido Crypto' : 'CaBsCrypto - Crypto Content Creator';
}

// Detect user's preferred language
function detectLanguage() {
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else if (browserLanguage === 'en') {
        currentLanguage = 'en';
    } else {
        currentLanguage = 'es';
    }
    
    updateLanguage();
}

// Crypto Prices Widget
const cryptoPrices = {
    btc: { price: 0, change: 0 },
    eth: { price: 0, change: 0 },
    sol: { price: 0, change: 0 },
    ton: { price: 0, change: 0 },
    matic: { price: 0, change: 0 },
    avax: { price: 0, change: 0 }
};

// Alternative API for crypto prices (backup)
async function fetchCryptoPricesAlternative() {
    try {
        console.log('Trying alternative API...');
        
        // Using CoinCap API as alternative
        const response = await fetch('https://api.coincap.io/v2/assets?limit=6', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Alternative API Response:', data);
        
        if (data.data && data.data.length > 0) {
            // Map CoinCap data to our structure
            const assets = data.data;
            
            // Find specific cryptocurrencies
            const btc = assets.find(asset => asset.symbol === 'BTC');
            const eth = assets.find(asset => asset.symbol === 'ETH');
            const sol = assets.find(asset => asset.symbol === 'SOL');
            const ton = assets.find(asset => asset.symbol === 'TON');
            const matic = assets.find(asset => asset.symbol === 'MATIC');
            const avax = assets.find(asset => asset.symbol === 'AVAX');
            
            if (btc) {
                cryptoPrices.btc = { 
                    price: parseFloat(btc.priceUsd), 
                    change: parseFloat(btc.changePercent24Hr) || 0 
                };
            }
            if (eth) {
                cryptoPrices.eth = { 
                    price: parseFloat(eth.priceUsd), 
                    change: parseFloat(eth.changePercent24Hr) || 0 
                };
            }
            if (sol) {
                cryptoPrices.sol = { 
                    price: parseFloat(sol.priceUsd), 
                    change: parseFloat(sol.changePercent24Hr) || 0 
                };
            }
            if (ton) {
                cryptoPrices.ton = { 
                    price: parseFloat(ton.priceUsd), 
                    change: parseFloat(ton.changePercent24Hr) || 0 
                };
            }
            if (matic) {
                cryptoPrices.matic = { 
                    price: parseFloat(matic.priceUsd), 
                    change: parseFloat(matic.changePercent24Hr) || 0 
                };
            }
            if (avax) {
                cryptoPrices.avax = { 
                    price: parseFloat(avax.priceUsd), 
                    change: parseFloat(avax.changePercent24Hr) || 0 
                };
            }
            
            console.log('Updated crypto prices from alternative API:', cryptoPrices);
            updateCryptoDisplay();
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error('Error with alternative API:', error);
        return false;
    }
}

// Update price status indicator
function updatePriceStatus(status, message) {
    const statusElement = document.getElementById('price-status');
    const indicatorElement = document.getElementById('status-indicator');
    const textElement = document.getElementById('status-text');
    
    if (statusElement && indicatorElement && textElement) {
        // Remove all status classes
        statusElement.className = 'price-status';
        
        // Add new status class
        statusElement.classList.add(status);
        
        // Update text
        textElement.textContent = message;
        
        console.log(`Price status updated: ${status} - ${message}`);
    }
}

// Enhanced fetch function with fallbacks
async function fetchCryptoPrices() {
    updatePriceStatus('loading', 'Loading...');
    
    try {
        console.log('Fetching crypto prices from CoinGecko...');
        
        // Test API endpoint first
        const testResponse = await fetch('https://api.coingecko.com/api/v3/ping');
        const testData = await testResponse.json();
        console.log('CoinGecko API Status:', testData);
        
        // Fetch prices with proper error handling
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,toncoin,matic-network,avalanche-2&vs_currencies=usd&include_24hr_change=true', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CoinGecko API Response:', data);
        
        // Update prices with null checks
        if (data.bitcoin) {
            cryptoPrices.btc = { price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change || 0 };
        }
        if (data.ethereum) {
            cryptoPrices.eth = { price: data.ethereum.usd, change: data.ethereum.usd_24h_change || 0 };
        }
        if (data.solana) {
            cryptoPrices.sol = { price: data.solana.usd, change: data.solana.usd_24h_change || 0 };
        }
        if (data.toncoin && data.toncoin.usd) {
            cryptoPrices.ton = { price: data.toncoin.usd, change: data.toncoin.usd_24h_change || 0 };
        } else {
            // Fallback for TON if not available
            cryptoPrices.ton = { price: 6.5, change: 3.2 };
            console.log('TON not available in CoinGecko, using fallback price');
        }
        if (data['matic-network']) {
            cryptoPrices.matic = { price: data['matic-network'].usd, change: data['matic-network'].usd_24h_change || 0 };
        }
        if (data['avalanche-2']) {
            cryptoPrices.avax = { price: data['avalanche-2'].usd, change: data['avalanche-2'].usd_24h_change || 0 };
        }
        
        console.log('Updated crypto prices from CoinGecko:', cryptoPrices);
        updateCryptoDisplay();
        updatePriceStatus('success', 'Live');
        
    } catch (error) {
        console.error('Error fetching crypto prices from CoinGecko:', error);
        console.log('Trying alternative API...');
        
        // Try alternative API
        const alternativeSuccess = await fetchCryptoPricesAlternative();
        
        if (alternativeSuccess) {
            updatePriceStatus('success', 'Live (Alt)');
        } else {
            console.log('All APIs failed, using fallback prices...');
            setFallbackPrices();
            updatePriceStatus('offline', 'Offline');
        }
    }
}

// Set fallback prices when API fails
function setFallbackPrices() {
    cryptoPrices.btc = { price: 65000, change: 2.5 };
    cryptoPrices.eth = { price: 3200, change: -1.2 };
    cryptoPrices.sol = { price: 180, change: 5.8 };
    cryptoPrices.ton = { price: 6.5, change: 3.2 };
    cryptoPrices.matic = { price: 0.85, change: -0.8 };
    cryptoPrices.avax = { price: 35, change: 4.1 };
    
    updateCryptoDisplay();
}

// Update crypto prices display
function updateCryptoDisplay() {
    const cryptos = ['btc', 'eth', 'sol', 'ton', 'matic', 'avax'];
    
    console.log('=== UPDATING CRYPTO DISPLAY ===');
    
    cryptos.forEach(crypto => {
        const priceElement = document.getElementById(`${crypto}-price`);
        const changeElement = document.getElementById(`${crypto}-change`);
        
        console.log(`Looking for ${crypto}-price:`, priceElement);
        console.log(`Looking for ${crypto}-change:`, changeElement);
        
        if (priceElement && changeElement) {
            const price = cryptoPrices[crypto].price;
            const change = cryptoPrices[crypto].change;
            
            console.log(`Updating ${crypto}: $${price}, ${change}%`);
            
            // Format price
            if (price >= 1000) {
                priceElement.textContent = `$${(price / 1000).toFixed(1)}K`;
            } else if (price >= 1) {
                priceElement.textContent = `$${price.toFixed(2)}`;
            } else {
                priceElement.textContent = `$${price.toFixed(4)}`;
            }
            
            // Format change
            const changeText = change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
            changeElement.textContent = changeText;
            
            // Update change color
            changeElement.className = 'crypto-change';
            if (change >= 0) {
                changeElement.classList.add('positive');
            } else {
                changeElement.classList.add('negative');
            }
            
            // Add loading animation
            priceElement.style.opacity = '0.7';
            setTimeout(() => {
                priceElement.style.opacity = '1';
            }, 300);
            
            // Add debugging styles
            priceElement.style.border = '2px solid lime';
            changeElement.style.border = '2px solid cyan';
            
        } else {
            console.warn(`Elements not found for ${crypto}`);
        }
    });
    
    console.log('=== CRYPTO DISPLAY UPDATE COMPLETE ===');
}

// Refresh crypto prices
function refreshCryptoPrices() {
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.classList.add('spinning');
    
    fetchCryptoPrices().finally(() => {
        setTimeout(() => {
            refreshBtn.classList.remove('spinning');
        }, 1000);
    });
}

// Toggle crypto widget (expand/collapse)
function toggleCryptoWidget() {
    const pricesBar = document.querySelector('.crypto-prices-bar');
    const expandBtn = document.querySelector('.expand-btn i');
    
    if (pricesBar.classList.contains('expanded')) {
        pricesBar.classList.remove('expanded');
        expandBtn.className = 'fas fa-expand';
    } else {
        pricesBar.classList.add('expanded');
        expandBtn.className = 'fas fa-compress';
    }
}

// Test function to verify HTML elements exist
function testCryptoElements() {
    console.log('Testing crypto elements...');
    const cryptos = ['btc', 'eth', 'sol', 'ton', 'matic', 'avax'];
    
    // Check if the main widget exists
    const widgetElement = document.querySelector('.crypto-prices-bar');
    console.log('Widget element:', widgetElement);
    
    if (widgetElement) {
        console.log('Widget is visible:', widgetElement.offsetHeight > 0);
        console.log('Widget display style:', window.getComputedStyle(widgetElement).display);
        console.log('Widget visibility:', window.getComputedStyle(widgetElement).visibility);
    }
    
    cryptos.forEach(crypto => {
        const priceElement = document.getElementById(`${crypto}-price`);
        const changeElement = document.getElementById(`${crypto}-change`);
        
        console.log(`${crypto}-price:`, priceElement ? 'Found' : 'NOT FOUND');
        console.log(`${crypto}-change:`, changeElement ? 'Found' : 'NOT FOUND');
        
        if (priceElement) {
            console.log(`${crypto}-price visible:`, priceElement.offsetHeight > 0);
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Test elements first
    testCryptoElements();
    
    // Force widget visibility
    setTimeout(() => {
        forceWidgetVisibility();
    }, 500);
    
    // Initialize language system
    detectLanguage();
    
    // Initialize crypto prices with delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Fetching crypto prices...');
        fetchCryptoPrices();
    }, 1000);
    
    // Refresh prices every 30 seconds
    setInterval(fetchCryptoPrices, 30000);
    
    // Initialize other existing functionality
    if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
    }
    
    setTimeout(() => {
        initializeVideoPlayer();
    }, 2000);
    
    setTimeout(() => {
        fetchSocialMediaData();
        startSocialMediaRefresh();
    }, 3000);
    
    const animatedElements = document.querySelectorAll('.service-card, .social-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Force widget visibility for debugging
function forceWidgetVisibility() {
    const widget = document.querySelector('.crypto-prices-bar');
    if (widget) {
        widget.style.display = 'block !important';
        widget.style.visibility = 'visible !important';
        widget.style.opacity = '1 !important';
        widget.style.height = 'auto !important';
        widget.style.minHeight = '50px !important';
        widget.style.position = 'relative !important';
        widget.style.zIndex = '9999 !important';
        console.log('Widget visibility forced');
    } else {
        console.log('Widget not found');
    }
}

// Export functions for global use
window.toggleLanguage = toggleLanguage;
window.refreshCryptoPrices = refreshCryptoPrices;
window.toggleCryptoWidget = toggleCryptoWidget;
window.testCryptoElements = testCryptoElements;
window.forceWidgetVisibility = forceWidgetVisibility;
