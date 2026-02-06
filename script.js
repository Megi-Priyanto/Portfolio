// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Active Navigation Link =====
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Skill Bar Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Scroll Animations =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .tool-category, .achievement-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== Contact Form - WhatsApp Integration =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // GANTI nomor WA di bawah ini dengan nomor Anda (format: 62812xxxxxxxx)
    // Nomor WA Megi: 081220651433 -> 6281220651433
    const phoneNumber = '6281220651433';

    // Format pesan WhatsApp
    const whatsappMessage = `*Pesan dari Website Portfolio*

👤 *Nama:* ${name}
📧 *Email:* ${email}

💬 *Pesan:*
${message}`;

    // Encode URL untuk WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Buka WhatsApp dengan pesan
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Buka di tab baru
    window.open(whatsappURL, '_blank');

    // Reset form setelah kirim
    contactForm.reset();

    // Tampilkan notifikasi
    alert('Anda akan dialihkan ke WhatsApp. Klik "Send" untuk mengirim pesan.');
});

// ===== Smooth Scroll Offset for Fixed Navbar =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    const scrolled = window.scrollY;
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Form Input Focus Effect =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== Cursor Effect (Optional - Desktop Only) =====
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(74, 158, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(cursorStyle);

    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'rgba(74, 158, 255, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(74, 158, 255, 0.5)';
        });
    });
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateOnScroll();
    setActiveLink();
});

// ===== Project Card Tilt Effect (Desktop Only) =====
if (window.innerWidth > 968) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const projectImage = card.querySelector('.project-image');
        
        card.addEventListener('mousemove', (e) => {
            // Skip tilt effect if hovering over project-image (to allow click)
            if (e.target.closest('.project-image')) {
                return;
            }
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Add Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4a9eff 0%, #2d7fd9 100%);
    z-index: 9999;
    transition: width 0.2s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== Image Modal/Lightbox Functionality =====
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.modal-close');

// Get all project images that have img element
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(projectImage => {
    const img = projectImage.querySelector('.project-img');

    if (img) {
        // Click event on the project-image container
        projectImage.addEventListener('click', function (e) {
            console.log('🖱️ Project image clicked!'); // Debug
            // Open modal when clicking anywhere on project-image
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.textContent = this.getAttribute('data-title') || img.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            console.log('✅ Modal opened:', this.getAttribute('data-title')); // Debug
        });
    }
});

// Close modal when clicking X
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside image
if (modal) {
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== Console Message =====
console.log('%c🚀 Portfolio Website', 'color: #4a9eff; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Designed & Developed by Megi Priyanto', 'color: #6eb6ff; font-size: 14px;');
console.log('%c📧 megipriyanto180508@gmail.com', 'color: #7a8ca0; font-size: 12px;');