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

// Initialize Twitter widgets when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Twitter embeds
    if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
    }
    
    // Load all Twitter embeds
    loadTwitterEmbeds();
    
    // Initialize other animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .social-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to load Twitter embeds
function loadTwitterEmbeds() {
    const embeds = document.querySelectorAll('.twitter-embed');
    
    embeds.forEach((embed, index) => {
        const tweetId = embed.getAttribute('data-tweet-id');
        if (tweetId) {
            // Create a proper Twitter embed
            embed.innerHTML = `
                <blockquote class="twitter-tweet" data-theme="dark" data-conversation="none">
                    <p lang="es" dir="ltr">Video ${index + 1} - CaBsCrypto</p>&mdash; CaBsCrypto (@CaBsCrypto) 
                    <a href="https://x.com/CaBsCrypto/status/${tweetId}">Ver Tweet</a>
                </blockquote>
            `;
        }
    });
    
    // Reload Twitter widgets
    if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
    }
}

// Video player functionality
let currentVideoIndex = 0;
const videoEmbeds = document.querySelectorAll('.twitter-embed');

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
}

// Add video navigation controls
function addVideoControls() {
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

// Initialize video controls when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addVideoControls();
        playVideo(0); // Start with first video
    }, 1000);
});

// Video preview click handlers
document.querySelectorAll('.video-preview').forEach(preview => {
    preview.addEventListener('click', (event) => {
        // Don't prevent default for Twitter embeds
        if (!preview.querySelector('.twitter-embed')) {
            event.preventDefault();
            console.log('Video preview clicked');
        }
    });
});

// Add hover effects to video cards
document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .social-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Counter animation for social followers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
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

// Initialize counter animations when elements come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const followers = entry.target.querySelector('.social-followers');
            if (followers) {
                const text = followers.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number) {
                    followers.textContent = '0 seguidores';
                    setTimeout(() => {
                        animateCounter(followers, number);
                        followers.textContent = number.toLocaleString() + ' seguidores';
                    }, 500);
                }
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        counterObserver.observe(card);
    });
});

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

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
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
