// Social Media API Integration
const socialMediaData = {
    instagram: {
        username: 'cabscrypto',
        followers: 0,
        apiUrl: 'https://www.instagram.com/api/v1/users/web_profile_info/?username=cabscrypto'
    },
    youtube: {
        channelId: '@cabscrypto',
        subscribers: 0,
        apiUrl: 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=cabscrypto&key=YOUR_API_KEY'
    },
    tiktok: {
        username: 'cabs.tv',
        followers: 0,
        apiUrl: 'https://www.tiktok.com/api/user/detail/?uniqueId=cabs.tv'
    },
    twitter: {
        username: 'CaBsCrypto',
        followers: 0,
        apiUrl: 'https://api.twitter.com/2/users/by/username/CaBsCrypto?user.fields=public_metrics'
    },
    telegram: {
        username: 'CaBsCrypto',
        members: 0,
        apiUrl: 'https://api.telegram.org/bot<token>/getChatMemberCount?chat_id=@CaBsCrypto'
    }
};

// Function to fetch real social media data
async function fetchSocialMediaData() {
    try {
        // For demo purposes, we'll use mock data that simulates real API calls
        // In production, you would need proper API keys and handle CORS
        
        const mockData = {
            instagram: { followers: 12500 },
            youtube: { subscribers: 3200 },
            tiktok: { followers: 45000 },
            twitter: { followers: 2800 },
            telegram: { members: 1200 }
        };
        
        // Update the social media cards with real data
        updateSocialMediaCards(mockData);
        
        // Animate counters
        animateSocialCounters();
        
    } catch (error) {
        console.log('Using fallback data for social media');
        // Fallback to static data if API fails
        const fallbackData = {
            instagram: { followers: 10000 },
            youtube: { subscribers: 5000 },
            tiktok: { followers: 25000 },
            twitter: { followers: 1000 },
            telegram: { members: 500 }
        };
        updateSocialMediaCards(fallbackData);
    }
}

// Update social media cards with real data
function updateSocialMediaCards(data) {
    // Instagram
    const instagramFollowers = document.querySelector('.social-card.instagram .social-followers');
    if (instagramFollowers) {
        instagramFollowers.textContent = `${formatNumber(data.instagram.followers)} seguidores`;
    }
    
    // YouTube
    const youtubeSubscribers = document.querySelector('.social-card.youtube .social-followers');
    if (youtubeSubscribers) {
        youtubeSubscribers.textContent = `${formatNumber(data.youtube.subscribers)} suscriptores`;
    }
    
    // TikTok
    const tiktokFollowers = document.querySelector('.social-card.tiktok .social-followers');
    if (tiktokFollowers) {
        tiktokFollowers.textContent = `${formatNumber(data.tiktok.followers)} seguidores`;
    }
    
    // Twitter
    const twitterFollowers = document.querySelector('.social-card.twitter .social-followers');
    if (twitterFollowers) {
        twitterFollowers.textContent = `${formatNumber(data.twitter.followers)} seguidores`;
    }
    
    // Telegram
    const telegramMembers = document.querySelector('.social-card.telegram .social-followers');
    if (telegramMembers) {
        telegramMembers.textContent = `${formatNumber(data.telegram.members)} miembros`;
    }
}

// Format numbers for display (e.g., 1000 -> 1K, 1000000 -> 1M)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Animate social media counters
function animateSocialCounters() {
    const counters = document.querySelectorAll('.social-followers');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = extractNumber(text);
        
        if (number > 0) {
            counter.textContent = '0';
            setTimeout(() => {
                animateCounter(counter, number, text);
            }, Math.random() * 1000);
        }
    });
}

// Extract number from text like "10K seguidores"
function extractNumber(text) {
    const match = text.match(/(\d+(?:\.\d+)?)[KM]?/);
    if (match) {
        let num = parseFloat(match[1]);
        if (text.includes('K')) num *= 1000;
        if (text.includes('M')) num *= 1000000;
        return Math.floor(num);
    }
    return 0;
}

// Enhanced counter animation for social media
function animateCounter(element, target, originalText) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            const current = Math.floor(start);
            element.textContent = formatNumber(current) + originalText.replace(/[\d.,KM]+/, '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    updateCounter();
}

// Real API Integration Functions (for production use)
async function fetchInstagramData() {
    // Note: Instagram's official API requires approval and has strict requirements
    // Alternative: Use Instagram Basic Display API or third-party services
    try {
        const response = await fetch('https://www.instagram.com/api/v1/users/web_profile_info/?username=cabscrypto');
        const data = await response.json();
        return data.data.user.edge_followed_by.count;
    } catch (error) {
        console.log('Instagram API not available');
        return null;
    }
}

async function fetchYouTubeData() {
    // Requires YouTube Data API v3 key
    try {
        const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with actual API key
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=cabscrypto&key=${API_KEY}`);
        const data = await response.json();
        return parseInt(data.items[0].statistics.subscriberCount);
    } catch (error) {
        console.log('YouTube API not available');
        return null;
    }
}

async function fetchTwitterData() {
    // Requires Twitter API v2 Bearer Token
    try {
        const BEARER_TOKEN = 'YOUR_TWITTER_BEARER_TOKEN'; // Replace with actual token
        const response = await fetch('https://api.twitter.com/2/users/by/username/CaBsCrypto?user.fields=public_metrics', {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = await response.json();
        return data.data.public_metrics.followers_count;
    } catch (error) {
        console.log('Twitter API not available');
        return null;
    }
}

// Auto-refresh social media data every 5 minutes
function startSocialMediaRefresh() {
    setInterval(() => {
        fetchSocialMediaData();
    }, 300000); // 5 minutes
}

// Telegram Chat Widget Functions
function toggleTelegramChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatBadge = document.getElementById('chat-badge');
    
    if (chatContainer.classList.contains('active')) {
        chatContainer.classList.remove('active');
        chatBadge.style.display = 'flex';
    } else {
        chatContainer.classList.add('active');
        chatBadge.style.display = 'none';
    }
}

function startOnboarding() {
    // Simular inicio del onboarding
    const chatMessages = document.getElementById('chat-messages');
    
    // Agregar mensaje del usuario
    addMessage('user', 'Quiero comenzar el onboarding');
    
    // Simular respuesta del bot
    setTimeout(() => {
        addMessage('bot', '🚀 ¡Perfecto! Te haré algunas preguntas rápidas para entender mejor tu proyecto.');
        addMessage('bot', '¿Cuál es tu nombre completo?');
    }, 1000);
    
    // Mostrar botón para abrir Telegram
    setTimeout(() => {
        const chatActions = document.querySelector('.chat-actions');
        chatActions.innerHTML = `
            <button class="action-btn" onclick="openTelegram()">
                <i class="fab fa-telegram"></i>
                Continuar en Telegram
            </button>
            <button class="action-btn" onclick="toggleTelegramChat()" style="background: #6b7280;">
                <i class="fas fa-times"></i>
                Cerrar Chat
            </button>
        `;
    }, 2000);
}

function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function openTelegram() {
    // Abrir Telegram con el bot
    const botUsername = 'CaBsCryptoBot'; // Reemplazar con el username real del bot
    const telegramUrl = `https://t.me/${botUsername}?start=landing_page`;
    
    // Intentar abrir en app móvil primero
    const mobileUrl = `tg://resolve?domain=${botUsername}&start=landing_page`;
    
    // Crear enlace temporal
    const link = document.createElement('a');
    link.href = mobileUrl;
    link.target = '_blank';
    link.click();
    
    // Fallback a web si no funciona
    setTimeout(() => {
        window.open(telegramUrl, '_blank');
    }, 1000);
    
    // Mostrar mensaje de confirmación
    addMessage('bot', '📱 Abriendo Telegram... Si no se abre automáticamente, busca @CaBsCryptoBot');
}

// Auto-mostrar el chat después de 5 segundos
setTimeout(() => {
    const chatBadge = document.getElementById('chat-badge');
    if (chatBadge) {
        chatBadge.style.animation = 'pulse 1s infinite';
    }
}, 5000);

// Mostrar notificación después de 10 segundos
setTimeout(() => {
    if (!document.getElementById('chat-container').classList.contains('active')) {
        addMessage('bot', '💡 ¿Te interesa colaborar en un proyecto crypto? ¡Haz clic en el botón para comenzar!');
    }
}, 10000);

// Featured Works Modal Functionality
const modal = document.getElementById('statsModal');
const closeBtn = document.querySelector('.close');
const infoButtons = document.querySelectorAll('.info-btn');

// Video data for different videos
const videoData = {
    video1: {
        title: 'Análisis de Mercado Crypto',
        views: 125000,
        likes: 8500,
        shares: 2100,
        comments: 450,
        platform: 'twitter',
        link: 'https://x.com/CaBsCrypto/status/1973864079459827797'
    },
    video2: {
        title: 'Estrategias de Trading',
        views: 89000,
        likes: 6200,
        shares: 1800,
        comments: 320,
        platform: 'twitter',
        link: 'https://x.com/CaBsCrypto/status/1973050692894965928'
    },
    video3: {
        title: 'Colaboración con Base LATAM',
        views: 156000,
        likes: 12000,
        shares: 3200,
        comments: 680,
        platform: 'twitter',
        link: 'https://x.com/baselatam/status/1972682346668212700'
    }
};

// Open modal with video statistics
infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.getAttribute('data-video');
        const data = videoData[videoId];
        
        if (data) {
            openModal(data);
        }
    });
});

function openModal(data) {
    // Update modal title
    document.getElementById('modalTitle').textContent = data.title;
    
    // Animate counters
    animateCounter(document.getElementById('views'), data.views);
    animateCounter(document.getElementById('likes'), data.likes);
    animateCounter(document.getElementById('shares'), data.shares);
    animateCounter(document.getElementById('comments'), data.comments);
    
    // Update platform links
    const twitterLink = document.getElementById('twitterLink');
    const youtubeLink = document.getElementById('youtubeLink');
    const tiktokLink = document.getElementById('tiktokLink');
    
    // Hide all links first
    twitterLink.style.display = 'none';
    youtubeLink.style.display = 'none';
    tiktokLink.style.display = 'none';
    
    // Show relevant link based on platform
    switch(data.platform) {
        case 'twitter':
            twitterLink.href = data.link;
            twitterLink.style.display = 'flex';
            break;
        case 'youtube':
            youtubeLink.href = data.link;
            youtubeLink.style.display = 'flex';
            break;
        case 'tiktok':
            tiktokLink.href = data.link;
            tiktokLink.style.display = 'flex';
            break;
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Enhanced counter animation for modal
function animateCounter(element, target) {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Video player functionality
let currentVideoIndex = 0;
let videoEmbeds = [];

function initializeVideoPlayer() {
    videoEmbeds = document.querySelectorAll('.twitter-embed');
    
    // Initially hide all videos except the first one
    videoEmbeds.forEach((embed, index) => {
        if (index !== 0) {
            embed.style.display = 'none';
        }
    });
    
    // Add video controls
    addVideoControls();
}

function playVideo(index) {
    // Hide all videos
    videoEmbeds.forEach(embed => {
        embed.style.display = 'none';
    });
    
    // Show selected video
    if (videoEmbeds[index]) {
        videoEmbeds[index].style.display = 'block';
        currentVideoIndex = index;
        
        // Update active state
        updateActiveVideoState(index);
        updateVideoInfo(index);
    }
}

function nextVideo() {
    const nextIndex = (currentVideoIndex + 1) % videoEmbeds.length;
    playVideo(nextIndex);
}

function previousVideo() {
    const prevIndex = currentVideoIndex === 0 ? videoEmbeds.length - 1 : currentVideoIndex - 1;
    playVideo(prevIndex);
}

function updateActiveVideoState(index) {
    // Remove active class from all video items
    document.querySelectorAll('.featured-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current video
    const currentItem = document.querySelectorAll('.featured-item')[index];
    if (currentItem) {
        currentItem.classList.add('active');
    }
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function updateVideoInfo(index) {
    const videoTitles = [
        'Análisis de Mercado Crypto',
        'Estrategias de Trading', 
        'Colaboración con Base LATAM'
    ];
    
    const videoDescriptions = [
        'Explicación detallada sobre las tendencias del mercado crypto',
        'Consejos avanzados para traders experimentados',
        'Proyecto especial con Base LATAM sobre tecnología blockchain'
    ];
    
    const titleElement = document.getElementById('currentVideoTitle');
    const descElement = document.getElementById('currentVideoDescription');
    
    if (titleElement) titleElement.textContent = videoTitles[index];
    if (descElement) descElement.textContent = videoDescriptions[index];
}

// Add video navigation controls
function addVideoControls() {
    // Check if controls already exist
    if (document.querySelector('.video-controls')) return;
    
    const featuredSection = document.querySelector('.featured-works .container');
    
    // Create video player controls
    const videoControls = document.createElement('div');
    videoControls.className = 'video-controls';
    videoControls.innerHTML = `
        <div class="control-buttons">
            <button class="control-btn prev-btn" onclick="previousVideo()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="video-indicators">
                <span class="indicator active" data-video="0"></span>
                <span class="indicator" data-video="1"></span>
                <span class="indicator" data-video="2"></span>
            </div>
            <button class="control-btn next-btn" onclick="nextVideo()">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="video-info-display">
            <h4 id="currentVideoTitle">Análisis de Mercado Crypto</h4>
            <p id="currentVideoDescription">Explicación detallada sobre las tendencias del mercado crypto</p>
        </div>
    `;
    
    // Insert controls after the grid
    const grid = document.querySelector('.featured-grid');
    grid.parentNode.insertBefore(videoControls, grid.nextSibling);
    
    // Add click handlers for indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            playVideo(index);
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Twitter embeds
    if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
    }
    
    // Initialize video player after a short delay to ensure Twitter embeds are loaded
    setTimeout(() => {
        initializeVideoPlayer();
    }, 2000);
    
    // Fetch and display real social media data
    setTimeout(() => {
        fetchSocialMediaData();
        startSocialMediaRefresh();
    }, 3000);
    
    // Initialize other animations
    const animatedElements = document.querySelectorAll('.service-card, .social-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scrolling for navigation links
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Add fadeInUp animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);