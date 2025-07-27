// Animations for the portfolio website

// Intersection Observer for fade-in animations with staggered delay
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create the observer options
    const observerOptions = {
        root: null, // relative to viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };
    
    // Create the observer with staggered animation
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element's position in the section
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 150 * (index % 5)); // Stagger by 150ms, reset after 5 elements
                
                observer.unobserve(entry.target); // stop observing once it's visible
            }
        });
    }, observerOptions);
    
    // Observe each element
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) { // Only apply effect near the top
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });
    }
    
    // Typing animation for hero section with cursor effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        // Update phrases to match resume
        const phrases = ['Software Engineer', 'Web Developer', 'Data Analyst', 'Python Developer', 'React Developer'];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        // Add cursor element
        typingElement.innerHTML = '<span class="typing-content"></span><span class="cursor">|</span>';
        const typingContent = typingElement.querySelector('.typing-content');
        const cursor = typingElement.querySelector('.cursor');
        
        // Add blinking cursor animation
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
        
        function typeText() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typingContent.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // faster when deleting
            } else {
                // Typing text
                typingContent.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150; // slower when typing
            }
            
            // Check if word is complete
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at the end of typing
                isDeleting = true;
                typingSpeed = 1000; // pause before deleting
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // pause before typing new word
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start the typing animation
        setTimeout(typeText, 1000);
    }
    
    // Add smooth scroll effect for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Enhanced skill bar animation with data-percentage attribute
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const skillObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                
                // Add staggered delay for each skill bar
                setTimeout(() => {
                    // Set the width based on the data-percentage attribute
                    bar.style.width = percentage + '%';
                    bar.classList.add('animate');
                    
                    // Add counter animation to show percentage
                    const percentText = bar.parentElement.querySelector('.skill-percentage');
                    if (percentText) {
                        let count = 0;
                        const target = parseInt(percentage);
                        const duration = 1500; // ms
                        const interval = Math.floor(duration / target);
                        
                        const counter = setInterval(() => {
                            count++;
                            percentText.textContent = count + '%';
                            
                            if (count >= target) {
                                clearInterval(counter);
                            }
                        }, interval);
                    }
                }, 200 * index); // Stagger by 200ms
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
            this.querySelector('.project-img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
            this.querySelector('.project-img').style.transform = 'scale(1)';
        });
    });
    
    // Add active section highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});