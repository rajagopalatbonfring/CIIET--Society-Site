// CIET Engineering Consortium - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Animated Counters
    initAnimatedCounters();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Fade-in Animations
    initFadeInAnimations();
    
    // Header Scroll Effect
    initHeaderScrollEffect();
    
    // Innovation Card Interactions
    initInnovationCardInteractions();
    
    // Partnership Logo Hover Effects
    initPartnershipEffects();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
            });
        });
    }
}

// Animated Counter for Metrics Dashboard
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.metric-card__number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const increment = target / 200; // Animation speed
    let current = 0;
    
    element.classList.add('counting');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.classList.remove('counting');
        }
        
        // Format the number based on its value
        if (target >= 1000) {
            element.textContent = formatNumber(current);
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 10);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    } else {
        return Math.round(num).toString();
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade-in Animations on Scroll
function initFadeInAnimations() {
    const elements = document.querySelectorAll('.innovation-card, .metric-card, .program-card, .benefit-item, .membership-card');
    
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Innovation Card Interactions
function initInnovationCardInteractions() {
    const innovationCards = document.querySelectorAll('.innovation-card');
    
    innovationCards.forEach(card => {
        // Add hover effect with subtle animation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Button click handlers
        const buttons = card.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add ripple effect
                createRippleEffect(this, e);
                
                // Handle button actions based on text
                const buttonText = this.textContent.trim();
                handleButtonAction(buttonText, card);
            });
        });
    });
}

// Partnership Logo Effects
function initPartnershipEffects() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create Ripple Effect for Buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    // Add ripple keyframes if not already added
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Handle Button Actions
function handleButtonAction(buttonText, context) {
    switch(buttonText) {
        case 'Learn More':
            showInnovationDetails(context);
            break;
        case 'Collaborate':
            showCollaborationForm(context);
            break;
        case 'View Technical Specifications':
            showTechnicalSpecs(context);
            break;
        case 'Join Development Team':
            showJoinTeamForm(context);
            break;
        case 'Submit Innovation':
            showSubmissionForm();
            break;
        case 'Explore Innovation Hub':
            scrollToSection('innovation');
            break;
        case 'Join Engineering Network':
            scrollToSection('membership');
            break;
        case 'Become a Member':
        case 'Join Now':
        case 'Get Started':
        case 'Contact Sales':
            showMembershipModal(buttonText);
            break;
        case 'Apply to Accelerator':
            showAcceleratorApplication();
            break;
        case 'Register Now':
            showEventRegistration();
            break;
        default:
            console.log('Button action:', buttonText);
    }
}

// Innovation Details Modal
function showInnovationDetails(card) {
    const title = card.querySelector('.innovation-card__title').textContent;
    const breakthrough = card.querySelector('.innovation-card__breakthrough').textContent;
    
    showModal({
        title: title,
        content: `
            <div class="modal-innovation">
                <h4>Breakthrough Technology</h4>
                <p>${breakthrough}</p>
                <h4>Technical Details</h4>
                <p>Detailed technical specifications and research data would be available to consortium members and approved partners.</p>
                <h4>Collaboration Opportunities</h4>
                <p>We are actively seeking partnerships in manufacturing, clinical trials, and commercial deployment.</p>
                <div class="modal-actions">
                    <button class="btn btn--primary" onclick="closeModal()">Request Access</button>
                    <button class="btn btn--outline" onclick="closeModal()">Download Fact Sheet</button>
                </div>
            </div>
        `
    });
}

// Collaboration Form
function showCollaborationForm(card) {
    const title = card.querySelector('.innovation-card__title').textContent;
    
    showModal({
        title: 'Collaboration Interest: ' + title,
        content: `
            <form class="collaboration-form">
                <div class="form-group">
                    <label class="form-label">Organization Name</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Contact Person</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Type of Collaboration</label>
                    <select class="form-control" required>
                        <option>Research Partnership</option>
                        <option>Manufacturing</option>
                        <option>Funding</option>
                        <option>Clinical Trials</option>
                        <option>Technology Licensing</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="4" placeholder="Describe your collaboration proposal..."></textarea>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn--primary">Submit Proposal</button>
                    <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        `
    });
}

// Membership Modal
function showMembershipModal(buttonType) {
    let content = '';
    
    if (buttonType === 'Contact Sales') {
        content = `
            <div class="membership-contact">
                <p>Our institutional membership program is designed for universities, research institutions, and large organizations.</p>
                <form class="contact-form">
                    <div class="form-group">
                        <label class="form-label">Institution Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Person</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" required>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Schedule Consultation</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
    } else {
        content = `
            <div class="membership-signup">
                <p>Join the world's most innovative engineering community and gain access to breakthrough technologies, funding opportunities, and global partnerships.</p>
                <form class="signup-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Organization</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Engineering Discipline</label>
                        <select class="form-control" required>
                            <option>Aerospace Engineering</option>
                            <option>Biomedical Engineering</option>
                            <option>Civil Engineering</option>
                            <option>Computer Engineering</option>
                            <option>Electrical Engineering</option>
                            <option>Environmental Engineering</option>
                            <option>Mechanical Engineering</option>
                            <option>Software Engineering</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Complete Registration</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
    }
    
    showModal({
        title: 'CIET Membership Registration',
        content: content
    });
}

// Generic Modal Function
function showModal(options) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-container" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3 class="modal-title">${options.title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-content">
                    ${options.content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Add modal styles if not already added
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: var(--space-16);
            }
            
            .modal-container {
                background: white;
                border-radius: var(--radius-lg);
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            
            .modal-title {
                margin: 0;
                color: var(--ciet-dark-slate);
                font-size: var(--font-size-xl);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--ciet-silver-gray);
                padding: var(--space-4);
                border-radius: var(--radius-sm);
                transition: background-color var(--duration-fast) ease;
            }
            
            .modal-close:hover {
                background: var(--color-secondary);
            }
            
            .modal-content {
                padding: var(--space-24);
            }
            
            .modal-actions {
                display: flex;
                gap: var(--space-12);
                margin-top: var(--space-24);
                justify-content: flex-end;
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Handle form submissions
    const forms = document.querySelectorAll('.modal-container form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

// Close Modal Function
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Handle Form Submissions
function handleFormSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        closeModal();
    }, 2000);
}

// Show Success Message
function showSuccessMessage() {
    const successHTML = `
        <div class="success-toast">
            <div class="success-content">
                <span class="success-icon">✓</span>
                <span class="success-text">Thank you! We'll be in touch soon.</span>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // Add success toast styles
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .success-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--ciet-neon-green);
                color: white;
                padding: var(--space-16) var(--space-24);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                z-index: 10001;
                animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
            }
            
            .success-content {
                display: flex;
                align-items: center;
                gap: var(--space-8);
            }
            
            .success-icon {
                font-weight: bold;
                font-size: var(--font-size-lg);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove success toast after animation
    setTimeout(() => {
        const toast = document.querySelector('.success-toast');
        if (toast) {
            toast.remove();
        }
    }, 3000);
}

// Scroll to Section Helper
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Additional utility functions for other modals
function showTechnicalSpecs(context) {
    showModal({
        title: 'Technical Specifications',
        content: `
            <div class="tech-specs">
                <p>Detailed technical specifications are available to consortium members and approved research partners.</p>
                <h4>Access Requirements:</h4>
                <ul>
                    <li>Current CIET membership (Individual, Corporate, or Institutional)</li>
                    <li>Signed Non-Disclosure Agreement (NDA)</li>
                    <li>Approved research or commercial interest</li>
                </ul>
                <div class="modal-actions">
                    <button class="btn btn--primary" onclick="closeModal()">Request Access</button>
                    <button class="btn btn--outline" onclick="closeModal()">Learn About Membership</button>
                </div>
            </div>
        `
    });
}

function showJoinTeamForm(context) {
    showModal({
        title: 'Join Development Team',
        content: `
            <div class="join-team">
                <p>Join our cutting-edge aviation propulsion development team. We're looking for experienced engineers in fuel cell technology, aerospace systems, and sustainable energy.</p>
                <form class="team-application">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Specialization</label>
                        <select class="form-control" required>
                            <option>Fuel Cell Technology</option>
                            <option>Aerospace Propulsion</option>
                            <option>Hydrogen Systems</option>
                            <option>Aircraft Integration</option>
                            <option>Systems Engineering</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Years of Experience</label>
                        <select class="form-control" required>
                            <option>0-2 years</option>
                            <option>3-5 years</option>
                            <option>6-10 years</option>
                            <option>10+ years</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Resume/CV</label>
                        <input type="file" class="form-control" accept=".pdf,.doc,.docx">
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Submit Application</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `
    });
}

function showSubmissionForm() {
    showModal({
        title: 'Submit Your Innovation',
        content: `
            <div class="innovation-submission">
                <p>Share your breakthrough technology with the global engineering community.</p>
                <form class="submission-form">
                    <div class="form-group">
                        <label class="form-label">Innovation Title</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Technology Category</label>
                        <select class="form-control" required>
                            <option>Artificial Intelligence</option>
                            <option>Biomedical Technology</option>
                            <option>Clean Energy</option>
                            <option>Advanced Materials</option>
                            <option>Aerospace Technology</option>
                            <option>Quantum Computing</option>
                            <option>Robotics & Automation</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Development Stage</label>
                        <select class="form-control" required>
                            <option>Concept/Research</option>
                            <option>Prototype</option>
                            <option>Testing/Validation</option>
                            <option>Pre-Commercial</option>
                            <option>Market Ready</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Brief Description</label>
                        <textarea class="form-control" rows="4" placeholder="Describe your innovation, its applications, and potential impact..."></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Submit for Review</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Save Draft</button>
                    </div>
                </form>
            </div>
        `
    });
}

function showAcceleratorApplication() {
    showModal({
        title: 'CIET Innovation Accelerator Application',
        content: `
            <div class="accelerator-app">
                <p>Apply to our prestigious accelerator program. Applications are reviewed quarterly by our technical advisory board.</p>
                <form class="accelerator-form">
                    <div class="form-group">
                        <label class="form-label">Company/Startup Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Founder Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Technology Focus</label>
                        <select class="form-control" required>
                            <option>Deep Tech</option>
                            <option>Clean Energy</option>
                            <option>Medical Devices</option>
                            <option>Advanced Manufacturing</option>
                            <option>Space Technology</option>
                            <option>AI/Machine Learning</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Funding Sought</label>
                        <select class="form-control" required>
                            <option>$250K Initial</option>
                            <option>$250K + Follow-on</option>
                            <option>Up to $2M Total</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Pitch Deck</label>
                        <input type="file" class="form-control" accept=".pdf,.ppt,.pptx">
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Submit Application</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `
    });
}

function showEventRegistration() {
    showModal({
        title: 'Global Engineering Innovation Summit 2026',
        content: `
            <div class="event-registration">
                <p><strong>March 15-18, 2026 | San Francisco, CA</strong></p>
                <p>Early Bird Special: Save $500 (Offer expires December 31, 2025)</p>
                <form class="registration-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Organization</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Registration Type</label>
                        <select class="form-control" required>
                            <option>Early Bird - CIET Member ($1,299)</option>
                            <option>Early Bird - Non-Member ($1,799)</option>
                            <option>Student Rate ($299)</option>
                            <option>Corporate Group (5+) - Contact Sales</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Special Requirements</label>
                        <textarea class="form-control" rows="2" placeholder="Dietary restrictions, accessibility needs, etc."></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn--primary">Register & Pay</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        `
    });
}

// Initialize keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});