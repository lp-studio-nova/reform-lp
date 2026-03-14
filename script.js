/* =========================================================================
   # Lucide Icons
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

/* =========================================================================
   # Mobile Navigation
   ========================================================================= */

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Toggle hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

/* =========================================================================
   # Smooth Scrolling
   ========================================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            
            // Revert hamburger spans
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => s.style.transform = 'none');
            spans[1].style.opacity = '1';

            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* =========================================================================
   # FAQ Accordion
   ========================================================================= */

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

/* =========================================================================
   # Scroll Animations
   ========================================================================= */

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-up').forEach(el => {
    observer.observe(el);
});

/* =========================================================================
   # Form Submission Mock
   ========================================================================= */

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mock loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '送信中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            contactForm.classList.add('hidden');
            const formHeader = document.querySelector('.form-header');
            if (formHeader) formHeader.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Smooth scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}
