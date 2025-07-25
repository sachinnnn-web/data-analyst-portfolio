// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing animation
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

// Initialize typing animation
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    typeWriter(typingElement, 'Data Analyst');
});

// Animated counters
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.dataset.width;
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-number, .skill-progress, .project-card, .tool-item').forEach(el => {
    observer.observe(el);
});

// Hero chart animation
function createHeroChart() {
    const ctx = document.getElementById('heroChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Data Insights',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: 'rgba(245, 158, 11, 1)',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(245, 158, 11, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // Animate chart on load
    setTimeout(() => {
        chart.update();
    }, 500);
}

// Initialize chart when page loads
window.addEventListener('load', createHeroChart);

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-icon');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = '#10b981';
        
        // Reset form
        this.reset();
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    }, 2000);
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.section-title, .about-description, .project-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
window.addEventListener('load', createParticles);

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        animation: particleFloat 8s linear infinite;
    }
    
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
/* ===== Reveal animation for project cards ===== */
const projectCards   = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      projectObserver.unobserve(entry.target);   // run once
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => projectObserver.observe(card));
