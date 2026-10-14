/**
 * STACKLY - JavaScript Core Functionality & Interactive Engine
 * Handles Navigation, Sliders, Counters, Tabs, Shop Cart, Modals, 3D Flip & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initHeaderAuth();
  initMobileDrawer();
  initHeroSlider();
  initTestimonialsSlider();
  initStrategyTabs();
  initCounters();
  initFaqAccordion();
  initBillingSwitch();
  initShopEngine();
  initBlogEngine();
  initFormsAndModals();
  initAuthHelpers();
  initDashboardControls();
  initScrollAnimations();
  initTeamFlipCards();
  initInteractiveJourneyTimeline();
  initInteractiveTeamTabs();
  initInteractiveCardTilt();
  initInteractiveProcessSteps();
  initInteractiveVerticalTabs();
  initFaqCategoryTabs();
});

/* ==========================================================================
   HEADER AUTHENTICATION STATE & LOGIN BUTTON SYNC
   ========================================================================== */
function initHeaderAuth() {
  document.querySelectorAll('.header-login-btn').forEach(btn => {
    btn.href = 'login.html';
    btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span>Login</span>`;
    btn.title = 'Account Login';
  });
  document.querySelectorAll('.header-login-btn-mobile').forEach(btn => {
    btn.href = 'login.html';
    btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span>Login</span>`;
    btn.title = 'Account Login';
  });
}

/* ==========================================================================
   STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-close-btn');

  if (!openBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   HERO BANNER CAROUSEL
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length <= 1) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 7000);
  }

  function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  let touchStartX = 0;
  let touchEndX = 0;
  const sliderSection = document.querySelector('.hero-slider-section');
  if (sliderSection) {
    sliderSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        resetAutoPlay();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        resetAutoPlay();
      }
    }, { passive: true });
  }

  startAutoPlay();
}

/* ==========================================================================
   3D TEAM FLIP CARDS (MOBILE TOUCH FRIENDLY)
   ========================================================================== */
function initTeamFlipCards() {
  const cards = document.querySelectorAll('.team-member-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

/* ==========================================================================
   TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialTrack') || document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide-item');
  const dots = document.querySelectorAll('.testimonial-nav-dot');
  const prevBtn = document.getElementById('testPrevBtn');
  const nextBtn = document.getElementById('testNextBtn');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let timer;

  function showTestimonial(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, idx) => {
      if (idx === currentIndex) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  function nextTestimonial() {
    showTestimonial(currentIndex + 1);
  }

  function prevTestimonial() {
    showTestimonial(currentIndex - 1);
  }

  function startTimer() {
    timer = setInterval(nextTestimonial, 6000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showTestimonial(idx);
      resetTimer();
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => { nextTestimonial(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevTestimonial(); resetTimer(); });

  // Touch Swipe Support for Mobile View
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      nextTestimonial();
      resetTimer();
    } else if (touchEndX - touchStartX > 45) {
      prevTestimonial();
      resetTimer();
    }
  }, { passive: true });

  startTimer();
}

/* ==========================================================================
   STRATEGY TABS
   ========================================================================== */
function initStrategyTabs() {
  const tabBtns = document.querySelectorAll('.strategy-tab-btn');
  const contents = document.querySelectorAll('.strategy-tab-content');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10) || 0;
        const suffix = target.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = countTo / totalSteps;

        const interval = setInterval(() => {
          start += increment;
          if (start >= countTo) {
            target.textContent = countTo + suffix;
            clearInterval(interval);
          } else {
            target.textContent = Math.floor(start) + suffix;
          }
        }, stepTime);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.theme-service-box, .team-member-item, .blog-card, .feature-strip-card, .contact-info-card, .pricing-card, .animate-fade-up, .animate-fade-left, .animate-fade-right, .who-feature-item, .journey-card, .team-card, .global-stat-card, .compliance-card, .cta-banner-advanced'
  );
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   BILLING SWITCH (MONTHLY / ANNUAL)
   ========================================================================== */
function initBillingSwitch() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  const priceEls = document.querySelectorAll('.pricing-val');

  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    priceEls.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      el.textContent = isAnnual ? annual : monthly;
    });

    const periodEls = document.querySelectorAll('.pricing-period');
    periodEls.forEach(p => {
      p.textContent = isAnnual ? '/ year' : '/ month';
    });
  });
}

/* ==========================================================================
   SHOPPING CART & PRODUCT CATALOG
   ========================================================================== */
let cart = [];
try {
  const stored = localStorage.getItem('stackly_cart');
  cart = stored ? JSON.parse(stored) : [];
  if (!Array.isArray(cart)) cart = [];
} catch (e) {
  cart = [];
}

function initShopEngine() {
  renderCartCount();
  renderCartDrawerItems();

  const catBtns = document.querySelectorAll('.shop-cat-btn');
  const productCards = document.querySelectorAll('.product-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  const cartTriggerBtns = document.querySelectorAll('.header-cart-btn, .open-cart-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeCartBtn = document.querySelector('.close-cart-btn');

  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  cartTriggerBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  const addBtns = document.querySelectorAll('.add-to-cart-btn');
  addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price')) || 0;
      const image = btn.getAttribute('data-image');

      addToCart({ id, title, price, image, qty: 1 });
      showToast(`Added "${title}" to your cart!`);
    });
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is currently empty!');
        return;
      }
      showToast('Processing order simulation... Thank you!');
      cart = [];
      saveCart();
      renderCartCount();
      renderCartDrawerItems();
      setTimeout(closeCart, 1500);
    });
  }
}

function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty = (parseInt(existing.qty, 10) || 1) + 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCartCount();
  renderCartDrawerItems();
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = (parseInt(item.qty, 10) || 1) + delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCartCount();
    renderCartDrawerItems();
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCartCount();
  renderCartDrawerItems();
  showToast('Item removed from cart.');
}

function saveCart() {
  localStorage.setItem('stackly_cart', JSON.stringify(cart));
}

function renderCartCount() {
  const countEls = document.querySelectorAll('.header-cart-count');
  let totalItems = 0;
  if (Array.isArray(cart)) {
    totalItems = cart.reduce((sum, i) => sum + (parseInt(i.qty, 10) || 1), 0);
  }
  if (isNaN(totalItems)) totalItems = 0;

  countEls.forEach(el => {
    el.textContent = totalItems;
  });
}

function renderCartDrawerItems() {
  const list = document.querySelector('.cart-items-list');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  if (!list) return;

  if (!Array.isArray(cart) || cart.length === 0) {
    list.innerHTML = '<div style="text-align: center; color: #888b9e; padding: 40px 0;"><i class="fas fa-shopping-basket" style="font-size: 2.5rem; margin-bottom: 12px; color: #c12ede;"></i><p>Your shopping basket is empty.</p></div>';
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  list.innerHTML = '';

  cart.forEach(item => {
    const qty = parseInt(item.qty, 10) || 1;
    const price = parseFloat(item.price) || 0;
    const itemTotal = price * qty;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${price.toFixed(2)}</div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span style="font-weight: 600; font-size: 0.85rem;">${qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Remove item">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    list.appendChild(div);
  });

  if (subtotalEl) {
    subtotalEl.textContent = `$${total.toFixed(2)}`;
  }
}

/* ==========================================================================
   FORMS & TOAST NOTIFICATIONS
   ========================================================================== */
function initFormsAndModals() {
  const forms = document.querySelectorAll('form:not([action]):not(.footer-newsletter-form):not(.whitepaper-form):not(#contactMainForm):not(#callbackForm)');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your request has been received successfully.');
      form.reset();
    });
  });

  // Footer Newsletter Form - Validates email and redirects to 404 error page only
  initFooterNewsletter();
  // Whitepaper Download Form - Validates business email with JS and redirects to 404 error page
  initWhitepaperForm();
  // Contact Inquiry Main Form - Custom JavaScript validation
  initContactMainForm();
  // Instant Queue Callback Form - Custom JavaScript validation
  initCallbackForm();
}

function initFooterNewsletter() {
  const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
  newsletterForms.forEach(form => {
    // Disable native HTML validation popups
    form.setAttribute('novalidate', 'true');
    form.noValidate = true;

    const emailInput = form.querySelector('input[type="email"], input[name="email"], input');
    if (!emailInput) return;

    // Ensure dedicated error message container exists inside the form
    let errorBox = form.querySelector('.newsletter-error-msg');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'newsletter-error-msg';
      errorBox.setAttribute('role', 'alert');
      emailInput.insertAdjacentElement('afterend', errorBox);
    }

    function clearError() {
      emailInput.classList.remove('is-invalid', 'shake');
      emailInput.removeAttribute('aria-invalid');
      if (errorBox) {
        errorBox.classList.remove('visible');
        errorBox.style.display = 'none';
        errorBox.innerHTML = '';
      }
    }

    function showError(message) {
      emailInput.classList.add('is-invalid');
      emailInput.setAttribute('aria-invalid', 'true');

      // Trigger subtle shake animation
      emailInput.classList.remove('shake');
      void emailInput.offsetWidth; // Reflow to re-trigger animation
      emailInput.classList.add('shake');

      if (errorBox) {
        errorBox.innerHTML = `<i class="fas fa-circle-exclamation"></i><span>${message}</span>`;
        errorBox.classList.add('visible');
        errorBox.style.display = 'flex';
      }
      emailInput.focus();
    }

    // Immediately clear validation error when the user starts typing
    emailInput.addEventListener('input', function() {
      if (emailInput.classList.contains('is-invalid')) {
        clearError();
      }
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailVal = emailInput.value.trim();

      // JavaScript Validation 1: Required / Empty Check
      if (!emailVal) {
        showError('Please enter your email address.');
        return;
      }

      // JavaScript Validation 2: Email Format Check
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailVal)) {
        showError('Please enter a valid email address (e.g. name@domain.com).');
        return;
      }

      // Valid email entered -> clear error and redirect to 404 error page only
      clearError();
      window.location.href = '404.html';
    });
  });
}

function initWhitepaperForm() {
  const whitepaperForms = document.querySelectorAll('.whitepaper-form');
  whitepaperForms.forEach(form => {
    // Disable native HTML validation tooltips completely
    form.setAttribute('novalidate', 'true');
    form.noValidate = true;

    const emailInput = form.querySelector('input[type="email"], input[name="email"], input');
    if (!emailInput) return;

    let errorBox = form.querySelector('.whitepaper-error-msg');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'whitepaper-error-msg';
      errorBox.setAttribute('role', 'alert');
      form.appendChild(errorBox);
    }

    function clearError() {
      emailInput.classList.remove('is-invalid', 'shake');
      emailInput.removeAttribute('aria-invalid');
      if (errorBox) {
        errorBox.classList.remove('visible');
        errorBox.style.display = 'none';
        errorBox.innerHTML = '';
      }
    }

    function showError(message) {
      emailInput.classList.add('is-invalid');
      emailInput.setAttribute('aria-invalid', 'true');

      // Trigger subtle shake animation
      emailInput.classList.remove('shake');
      void emailInput.offsetWidth; // Reflow to re-trigger animation
      emailInput.classList.add('shake');

      if (errorBox) {
        errorBox.innerHTML = `<i class="fas fa-circle-exclamation"></i><span>${message}</span>`;
        errorBox.classList.add('visible');
        errorBox.style.display = 'flex';
      }
      emailInput.focus();
    }

    // Immediately clear validation error when the user starts typing
    emailInput.addEventListener('input', function() {
      if (emailInput.classList.contains('is-invalid')) {
        clearError();
      }
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailVal = emailInput.value.trim();

      // JavaScript Validation 1: Required / Empty Check
      if (!emailVal) {
        showError('Please enter your business work email.');
        return;
      }

      // JavaScript Validation 2: Email Format Check
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailVal)) {
        showError('Please enter a valid email address (e.g. name@company.com).');
        return;
      }

      // Valid email entered -> clear error and redirect to 404 error page
      clearError();
      window.location.href = '404.html';
    });
  });
}

/* ==========================================================================
   CONTACT INQUIRY & CALLBACK CUSTOM JAVASCRIPT VALIDATION
   ========================================================================== */
function initContactMainForm() {
  const form = document.getElementById('contactMainForm');
  if (!form) return;

  // Disable native HTML validation completely
  form.setAttribute('novalidate', 'true');
  form.noValidate = true;

  const fullNameInput = document.getElementById('contactFullName') || form.querySelector('input[name="fullName"], input[type="text"]');
  const emailInput = document.getElementById('contactWorkEmail') || form.querySelector('input[name="workEmail"], input[type="email"]');
  const phoneInput = document.getElementById('contactPhone') || form.querySelector('input[name="phone"], input[type="tel"]');
  const messageInput = document.getElementById('contactMessage') || form.querySelector('textarea[name="message"], textarea');

  const fields = [
    {
      input: fullNameInput,
      errorId: 'err-contactFullName',
      validate: (val) => {
        if (!val) return 'Please enter your full name.';
        if (val.length < 2) return 'Full name must be at least 2 characters.';
        return null;
      }
    },
    {
      input: emailInput,
      errorId: 'err-contactWorkEmail',
      validate: (val) => {
        if (!val) return 'Please enter your work email address.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) return 'Please enter a valid work email (e.g. name@company.com).';
        return null;
      }
    },
    {
      input: phoneInput,
      errorId: 'err-contactPhone',
      validate: (val) => {
        if (!val) return 'Please enter your contact phone number.';
        const digits = val.replace(/\D/g, '');
        if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number (7-15 digits, e.g. +91 90909 09090).';
        return null;
      }
    },
    {
      input: messageInput,
      errorId: 'err-contactMessage',
      validate: (val) => {
        if (!val) return 'Please describe how we can help you.';
        if (val.length < 3) return 'Please provide more details (at least 3 characters).';
        return null;
      }
    }
  ];

  function clearFieldError(field) {
    if (!field.input) return;
    field.input.classList.remove('is-invalid', 'shake');
    field.input.removeAttribute('aria-invalid');
    const errBox = document.getElementById(field.errorId) || (field.input.parentElement ? field.input.parentElement.querySelector('.field-error-msg') : null);
    if (errBox) {
      errBox.classList.remove('visible');
      errBox.style.display = 'none';
      const span = errBox.querySelector('span');
      if (span) span.textContent = '';
    }
  }

  function showFieldError(field, message) {
    if (!field.input) return;
    field.input.classList.add('is-invalid');
    field.input.setAttribute('aria-invalid', 'true');

    // Trigger subtle shake animation
    field.input.classList.remove('shake');
    void field.input.offsetWidth;
    field.input.classList.add('shake');

    let errBox = document.getElementById(field.errorId);
    if (!errBox && field.input.parentElement) {
      errBox = field.input.parentElement.querySelector('.field-error-msg');
    }
    if (!errBox && field.input.parentElement) {
      errBox = document.createElement('div');
      errBox.className = 'field-error-msg';
      errBox.id = field.errorId;
      errBox.setAttribute('role', 'alert');
      errBox.innerHTML = '<i class="fas fa-circle-exclamation"></i><span></span>';
      field.input.insertAdjacentElement('afterend', errBox);
    }

    if (errBox) {
      const span = errBox.querySelector('span');
      if (span) span.textContent = message;
      errBox.classList.add('visible');
      errBox.style.display = 'flex';
    }
  }

  // Clear errors in real-time as user types
  fields.forEach(field => {
    if (!field.input) return;
    field.input.addEventListener('input', () => {
      if (field.input.classList.contains('is-invalid')) {
        const err = field.validate(field.input.value.trim());
        if (!err) {
          clearFieldError(field);
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;
    let firstInvalidInput = null;

    fields.forEach(field => {
      if (!field.input) return;
      const errorMsg = field.validate(field.input.value.trim());
      if (errorMsg) {
        showFieldError(field, errorMsg);
        hasError = true;
        if (!firstInvalidInput) {
          firstInvalidInput = field.input;
        }
      } else {
        clearFieldError(field);
      }
    });

    if (hasError) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // All fields valid -> redirect directly into 404 error page only
    window.location.href = '404.html';
  });
}

function initCallbackForm() {
  const form = document.getElementById('callbackForm');
  if (!form) return;

  // Disable native HTML validation completely
  form.setAttribute('novalidate', 'true');
  form.noValidate = true;

  const phoneInput = document.getElementById('callbackPhone') || form.querySelector('input[type="tel"], input');
  const fieldWrap = form.querySelector('.callback-field-wrap');
  let errBox = document.getElementById('err-callbackPhone') || form.querySelector('.field-error-msg');

  function clearError() {
    if (phoneInput) {
      phoneInput.classList.remove('is-invalid', 'shake');
      phoneInput.removeAttribute('aria-invalid');
    }
    if (fieldWrap) {
      fieldWrap.classList.remove('is-invalid', 'shake');
    }
    if (errBox) {
      errBox.classList.remove('visible');
      errBox.style.display = 'none';
      const span = errBox.querySelector('span');
      if (span) span.textContent = '';
    }
  }

  function showError(message) {
    if (phoneInput) {
      phoneInput.classList.add('is-invalid');
      phoneInput.setAttribute('aria-invalid', 'true');
      phoneInput.classList.remove('shake');
      void phoneInput.offsetWidth;
      phoneInput.classList.add('shake');
    }
    if (fieldWrap) {
      fieldWrap.classList.add('is-invalid');
      fieldWrap.classList.remove('shake');
      void fieldWrap.offsetWidth;
      fieldWrap.classList.add('shake');
    }

    if (!errBox) {
      errBox = document.createElement('div');
      errBox.className = 'field-error-msg callback-error-msg';
      errBox.id = 'err-callbackPhone';
      errBox.setAttribute('role', 'alert');
      errBox.innerHTML = '<i class="fas fa-circle-exclamation"></i><span></span>';
      form.appendChild(errBox);
    }

    const span = errBox.querySelector('span');
    if (span) span.textContent = message;
    errBox.classList.add('visible');
    errBox.style.display = 'flex';

    if (phoneInput) phoneInput.focus();
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      if (phoneInput.classList.contains('is-invalid') || (fieldWrap && fieldWrap.classList.contains('is-invalid'))) {
        const val = phoneInput.value.trim();
        const validChars = /^[\d\s\+\-\(\)]+$/.test(val);
        const digits = val.replace(/\D/g, '');
        if (validChars && digits.length >= 7 && digits.length <= 15) {
          clearError();
        }
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = phoneInput ? phoneInput.value.trim() : '';

    if (!val) {
      showError('Please enter your direct phone number for an instant callback.');
      return;
    }

    const validChars = /^[\d\s\+\-\(\)]+$/.test(val);
    const digits = val.replace(/\D/g, '');
    if (!validChars || digits.length < 7 || digits.length > 15) {
      showError('Please enter a valid phone number (7-15 digits, e.g. +91 90909 09090).');
      return;
    }

    clearError();
    // Valid phone number entered -> redirect directly into 404 error page only
    window.location.href = '404.html';
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <i class="fas fa-check-circle" style="color: #00d084; font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ==========================================================================
   AUTH HELPERS (LOGIN / SIGNUP)
   ========================================================================== */
function initAuthHelpers() {
  const toggles = document.querySelectorAll('.password-toggle-icon');
  toggles.forEach(t => {
    t.addEventListener('click', () => {
      const input = t.previousElementSibling;
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        t.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        t.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  const signupPass = document.getElementById('signupPassword');
  const strengthFill = document.querySelector('.password-strength-fill');
  if (signupPass && strengthFill) {
    signupPass.addEventListener('input', (e) => {
      const val = e.target.value;
      let score = 0;
      if (val.length >= 6) score += 25;
      if (/[A-Z]/.test(val)) score += 25;
      if (/[0-9]/.test(val)) score += 25;
      if (/[^A-Za-z0-9]/.test(val)) score += 25;

      strengthFill.style.width = score + '%';
      if (score <= 25) strengthFill.style.backgroundColor = '#ff4d4f';
      else if (score <= 50) strengthFill.style.backgroundColor = '#fa8c16';
      else if (score <= 75) strengthFill.style.backgroundColor = '#faad14';
      else strengthFill.style.backgroundColor = '#52c41a';
    });
  }

  const demoAdminBtn = document.getElementById('demoAdminBtn');
  const demoCustomerBtn = document.getElementById('demoCustomerBtn');
  const loginEmail = document.getElementById('loginEmail');
  const loginPass = document.getElementById('loginPassword');

  if (demoAdminBtn && loginEmail && loginPass) {
    demoAdminBtn.addEventListener('click', () => {
      loginEmail.value = 'admin@stackly.com';
      loginPass.value = 'StacklyAdmin2026!';
      document.querySelectorAll('.demo-tab-btn').forEach(b => b.classList.remove('active'));
      demoAdminBtn.classList.add('active');
    });
  }

  if (demoCustomerBtn && loginEmail && loginPass) {
    demoCustomerBtn.addEventListener('click', () => {
      loginEmail.value = 'customer@acme-corp.com';
      loginPass.value = 'ClientPass2026!';
      document.querySelectorAll('.demo-tab-btn').forEach(b => b.classList.remove('active'));
      demoCustomerBtn.classList.add('active');
    });
  }
}

/* ==========================================================================
   BLOG ENGINE (FILTERING, SEARCH & TAGS)
   ========================================================================== */
function initBlogEngine() {
  const catBtns = document.querySelectorAll('.blog-cat-btn');
  const tagPills = document.querySelectorAll('.tag-pill');
  const blogCards = document.querySelectorAll('#mainBlogGrid .blog-card');
  const searchInput = document.getElementById('blogSearchInput');

  function filterByCategory(cat) {
    blogCards.forEach(card => {
      const itemCat = card.getAttribute('data-category');
      if (cat === 'all' || itemCat === cat) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      filterByCategory(cat);
    });
  });

  tagPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const href = pill.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
        return;
      }
      tagPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterByCategory(filter);

      // sync catBtns
      catBtns.forEach(b => {
        if (b.getAttribute('data-category') === filter) b.classList.add('active');
        else b.classList.remove('active');
      });
    });
  });

  const heroSearchBtn = document.querySelector('.blog-search-box .search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      const href = heroSearchBtn.getAttribute('href') || '404.html';
      window.location.href = href;
    });
  }

  if (searchInput) {
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = '404.html';
      }
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const title = card.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
        if (title.includes(query) || excerpt.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   DASHBOARD CONTROLS
   ========================================================================== */
function initDashboardControls() {
  syncDashboardUserProfile();
  initMobileDashboardDrawer();

  const statusFilterBtns = document.querySelectorAll('.ticket-filter-btn');
  const ticketRows = document.querySelectorAll('.ticket-row');

  statusFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const status = btn.getAttribute('data-status');

      ticketRows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        if (status === 'all' || rowStatus === status) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

function initMobileDashboardDrawer() {
  const openBtn = document.getElementById('sidebarOpenBtn');
  const closeBtn = document.getElementById('sidebarCloseBtn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  const links = sidebar.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });
}

function syncDashboardUserProfile() {
  let user = null;
  try {
    const authData = localStorage.getItem('stackly_auth_user');
    const regData = localStorage.getItem('stackly_registered_user');
    user = authData ? JSON.parse(authData) : (regData ? JSON.parse(regData) : null);
  } catch (e) {
    user = null;
  }

  if (user) {
    const enteredName = user.fullName || user.name || (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username);
    const enteredEmail = user.email;

    if (enteredName) {
      document.querySelectorAll('#dashboardUserName, .sidebar-user-info strong').forEach(el => {
        el.textContent = enteredName;
      });
      const greeting = document.querySelector('#dashboardGreeting, .dashboard-content h1');
      if (greeting) {
        const firstName = user.firstName || enteredName.split(' ')[0] || enteredName;
        greeting.textContent = `Welcome back, ${firstName}!`;
      }
    }

    if (enteredEmail) {
      document.querySelectorAll('#dashboardUserEmail, .sidebar-user-info span').forEach(el => {
        el.textContent = enteredEmail;
      });
    }
  }
}

/* ==========================================================================
   INTERACTIVE JOURNEY TIMELINE
   ========================================================================== */
function initInteractiveJourneyTimeline() {
  const cards = document.querySelectorAll('.journey-card');
  const progressFill = document.querySelector('.status-progress-fill');
  const liveTag = document.querySelector('.status-live-tag');
  if (!cards.length) return;

  const milestones = {
    '2011': { percent: '25%', label: '2011 Genesis' },
    '2016': { percent: '50%', label: '2016 Cloud PBX' },
    '2021': { percent: '75%', label: '2021 Global Hubs' },
    '2026': { percent: '100%', label: '2026 AI Era (Active)' }
  };

  function activateCard(card) {
    cards.forEach(c => {
      c.classList.remove('active-card');
      const badge = c.querySelector('.journey-step-badge');
      if (badge) badge.classList.remove('active-badge');
      const icon = c.querySelector('.journey-card-icon');
      if (icon) icon.classList.remove('active-icon');
      const phase = c.querySelector('.journey-phase-tag');
      if (phase) phase.classList.remove('active-phase');
      const pill = c.querySelector('.journey-highlight-pill');
      if (pill) pill.classList.remove('active-pill');
      const ind = c.querySelector('.journey-interactive-indicator');
      if (ind) {
        ind.classList.remove('active-ind');
        ind.innerHTML = '<i class="fas fa-chevron-right"></i>';
      }
    });

    card.classList.add('active-card');
    const badge = card.querySelector('.journey-step-badge');
    if (badge) badge.classList.add('active-badge');
    const icon = card.querySelector('.journey-card-icon');
    if (icon) icon.classList.add('active-icon');
    const phase = card.querySelector('.journey-phase-tag');
    if (phase) phase.classList.add('active-phase');
    const pill = card.querySelector('.journey-highlight-pill');
    if (pill) pill.classList.add('active-pill');
    const ind = card.querySelector('.journey-interactive-indicator');
    if (ind) {
      ind.classList.add('active-ind');
      ind.innerHTML = '<i class="fas fa-check"></i> Active';
    }

    const year = card.getAttribute('data-year');
    if (milestones[year]) {
      if (progressFill) progressFill.style.width = milestones[year].percent;
      if (liveTag) {
        liveTag.innerHTML = `<span class="live-pulse-dot"></span> ${milestones[year].label}`;
      }
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', () => activateCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCard(card);
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE LEADERSHIP TEAM FILTER TABS
   ========================================================================== */
function initInteractiveTeamTabs() {
  const filterBtns = document.querySelectorAll('.team-filter-btn');
  const teamCards = document.querySelectorAll('.team-card');
  if (!filterBtns.length || !teamCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      teamCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   3D CARD TILT ON MOUSEMOVE (DESKTOP)
   ========================================================================== */
function initInteractiveCardTilt() {
  if (window.innerWidth < 992 || !window.matchMedia('(hover: hover)').matches) return;

  const tiltCards = document.querySelectorAll(
    '.team-card, .journey-card, .global-stat-card, .compliance-card, .service-pillar-card, .sla-metric-card, .vertical-card, .qa-feature-card, .contact-channel-card, .regional-hub-card, .escalation-tier-card, .hq-facility-card'
  );
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   INTERACTIVE ONBOARDING PROCESS STEP CARDS
   ========================================================================== */
function initInteractiveProcessSteps() {
  const stepCards = document.querySelectorAll('.process-step-card');
  const indicatorSteps = document.querySelectorAll('.process-time-indicator .indicator-step');
  const indicatorLines = document.querySelectorAll('.process-time-indicator .indicator-line');
  if (!stepCards.length) return;

  function activateStep(card, stepIndex) {
    stepCards.forEach(c => {
      c.classList.remove('active-process-card');
      const badge = c.querySelector('.step-badge');
      if (badge) badge.classList.remove('active-step-badge');
      const days = c.querySelector('.step-days-tag');
      if (days) days.classList.remove('active-days-tag');
      const icon = c.querySelector('.step-icon-circle');
      if (icon) icon.classList.remove('active-step-icon');
      const pill = c.querySelector('.step-deliverable-pill');
      if (pill) pill.classList.remove('active-pill');
    });

    card.classList.add('active-process-card');
    const badge = card.querySelector('.step-badge');
    if (badge) badge.classList.add('active-step-badge');
    const days = card.querySelector('.step-days-tag');
    if (days) days.classList.add('active-days-tag');
    const icon = card.querySelector('.step-icon-circle');
    if (icon) icon.classList.add('active-step-icon');
    const pill = card.querySelector('.step-deliverable-pill');
    if (pill) pill.classList.add('active-pill');

    indicatorSteps.forEach((step, idx) => {
      if (idx <= stepIndex) {
        step.classList.add('active-step');
      } else {
        step.classList.remove('active-step');
      }
    });

    indicatorLines.forEach((line, idx) => {
      if (idx < stepIndex) {
        line.classList.add('active-line');
      } else {
        line.classList.remove('active-line');
      }
    });
  }

  stepCards.forEach((card, idx) => {
    card.addEventListener('click', () => activateStep(card, idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateStep(card, idx);
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE INDUSTRY VERTICAL FILTER TABS
   ========================================================================== */
function initInteractiveVerticalTabs() {
  const filterBtns = document.querySelectorAll('.vertical-filter-btn');
  const verticalCards = document.querySelectorAll('.vertical-card');
  if (!filterBtns.length || !verticalCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      verticalCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   INTERACTIVE FAQ CATEGORY TABS
   ========================================================================== */
function initFaqCategoryTabs() {
  const filterBtns = document.querySelectorAll('.faq-category-btn');
  const faqItems = document.querySelectorAll('.service-faq-container .accordion-item');
  if (!filterBtns.length || !faqItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-faq-cat');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

