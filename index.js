document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    initSmoothScrolling();
    initHeaderShrink();
    initToggleSections();
    initProgressBarAnimation();
    initTypeWriterEffect();
    initScrollEffects();
    initProgressBars();
    highlightVisibleSection();
    initBurgerMenu();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Header shrink effect on scroll
 */
function initHeaderShrink() {
    const header = document.querySelector('header');
    const profileImage = document.querySelector('.profile-image img');
    
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 80;
        header.style.padding = isScrolled ? '0.5em 0' : '1em 0';
        profileImage.style.width = profileImage.style.height = isScrolled ? '80px' : '120px';
    });
}

/**
 * Toggle visibility of content sections
 */
function initToggleSections() {
    const toggleButtons = document.querySelectorAll('.toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.parentElement.nextElementSibling;
            const isActive = content.classList.toggle('show');
            button.classList.toggle('toggle-active', isActive);
        });
    });
}

/**
 * Animate progress bar circles
 */
function initProgressBarAnimation() {
    const animateProgressCircles = () => {
        document.querySelectorAll('.circle').forEach(circle => {
            const valueElement = circle.querySelector('.value');
            const progressValue = parseInt(valueElement.textContent.replace('%', ''), 10);
            const [leftBar, rightBar] = [circle.querySelector('.bar.left'), circle.querySelector('.bar')];
            let currentProgress = 0;

            // Reset bar styles
            rightBar.style.transform = leftBar.style.transform = 'rotate(0deg)';
            valueElement.textContent = '0%';

            const updateProgress = () => {
                if (currentProgress < progressValue) {
                    currentProgress++;
                    const rotationValue = (currentProgress / 100) * 360;
                    if (rotationValue <= 180) {
                        rightBar.style.transform = `rotate(${rotationValue}deg)`;
                    } else {
                        rightBar.style.transform = 'rotate(180deg)';
                        leftBar.style.transform = `rotate(${rotationValue - 180}deg)`;
                    }
                    valueElement.textContent = `${currentProgress}%`;
                    requestAnimationFrame(updateProgress);
                }
            };

            requestAnimationFrame(updateProgress);
        });
    };

    animateProgressCircles();
    setInterval(animateProgressCircles, 5000);
}

/**
 * Typewriter effect for headline text
 */
function initTypeWriterEffect() {
    const dataText = ["Recherche de stage en développement informatique Du 16 Décembre 2024 au 30 Février 2025"];

    const typeWriter = (text, index, callback) => {
        if (index < text.length) {
            document.querySelector("h2").innerHTML = `${text.substring(0, index + 1)}<span aria-hidden="true"></span>`;
            setTimeout(() => typeWriter(text, index + 1, callback), 120);
        } else if (typeof callback === 'function') {
            setTimeout(callback, 700);
        }
    };

    const startTextAnimation = (i = 0) => {
        if (dataText[i]) {
            typeWriter(dataText[i], 0, () => startTextAnimation(i + 1));
        } else {
            setTimeout(() => startTextAnimation(0), 200);
        }
    };

    startTextAnimation();
}

/**
 * Scroll effect for animating sections in viewport
 */
function initScrollEffects() {
    const educationSection = document.querySelector('.education');
    const educationHeading = document.querySelector('.education .heading');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    };

    const addScrollEffect = () => {
        if (isInViewport(educationSection)) {
            educationHeading.classList.add('animate-heading');
        }
    };

    window.addEventListener('scroll', addScrollEffect);
    addScrollEffect();
}

/**
 * Initialize progress bars with their respective values
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = `${percentage}%`;
    });
}

/**
 * Highlight the active section based on the scroll position
 */
function highlightVisibleSection() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        sections.forEach(section => {
            const { top, height } = section.getBoundingClientRect();
            const offset = section.offsetTop - 150;
            const id = section.getAttribute('id');

            if (window.scrollY >= offset && window.scrollY < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Toggle burger menu for mobile navigation
 */
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}
