document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const casinosContainer = document.getElementById('casinos-container');
    const modal = document.getElementById('casino-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
  
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  
    // Close navigation when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  
    // Prevent scrolling when modal is open
    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Случайный заголовок для hero-title
const heroTitles = [
  'ВХОД ТОЛЬКО ПО ЗОЛОТОЙ КАРТЕ',
  'ДОСТУП ТОЛЬКО ИЗБРАННЫМ',
  'ТОЛЬКО ДЛЯ VIP ГОСТЕЙ',
  'ПРИВЕТСТВУЕМ ЭЛИТУ КАЗИНО',
  'ВХОД ПО ПРИГЛАШЕНИЮ'
];
const heroTitleEl = document.querySelector('.hero-title');
if (heroTitleEl) {
  const randomTitle = heroTitles[Math.floor(Math.random() * heroTitles.length)];
  heroTitleEl.textContent = randomTitle;
}
  
    // Generate casino cards
    function renderCasinoCards() {
      casinos.forEach(casino => {
        const card = document.createElement('div');
        card.className = 'casino-card';
        card.setAttribute('data-id', casino.id);
        
        card.innerHTML = `
          <div class="casino-logo">
            <img src="${casino.logo}" alt="${casino.name} Logo">
          </div>
          <h3 class="casino-name">${casino.name}</h3>
          <p class="casino-description">${casino.description}</p>
          <div class="promo-code">
            <div class="promo-title">Промокод:</div>
            <div class="promo-value">
              <span>${casino.promo && casino.promo.code ? casino.promo.code : '-'}</span>
              <button class="copy-btn" data-code="${casino.promo && casino.promo.code ? casino.promo.code : ''}">
                <i class="copy-icon">📋</i>
              </button>
            </div>
          </div>
          <div class="casino-footer">
            <a href="${casino.link}" class="btn-link" target="_blank">Перейти</a>
            <button class="btn-details" data-id="${casino.id}">Подробнее</button>
          </div>
        `;
        
        casinosContainer.appendChild(card);
      });
    }
  
    // Show casino details in modal
    function showCasinoDetails(id) {
      const casino = casinos.find(c => c.id === parseInt(id));
      if (!casino) return;
      
      modalBody.innerHTML = `
        <div class="modal-casino">
          <div class="modal-header">
            <div class="modal-logo">
              <img src="${casino.logo}" alt="${casino.name} Logo">
            </div>
            <div class="modal-title">
              <h2 class="modal-name">${casino.name}</h2>
              <div class="modal-rating">
                <div class="stars">
                  ${renderStars(casino.rating)}
                </div>
                <span class="rating-value">${casino.rating}/5</span>
              </div>
              <div class="modal-actions">
                <a href="${casino.link}" class="btn-link" target="_blank">Перейти в казино</a>
              </div>
            </div>
          </div>
          
          <div class="modal-divider"></div>
          
          <div class="modal-section">
            <h3 class="section-title">О казино</h3>
            <div class="casino-description-full">${casino.description}</div>
          </div>
          
          <div class="modal-divider"></div>
          
          <div class="modal-section">
            <h3 class="section-title">Особенности</h3>
            <div class="features-list">
              ${casino.features.map(feature => `
                <div class="feature-item">
                  <div class="feature-icon">✓</div>
                  <div class="feature-text">${feature}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="modal-divider"></div>
          
          <div class="modal-section">
            <div class="modal-promo">
              <div class="promo-header">
                <h3>Эксклюзивное предложение</h3>
              </div>
              <div class="promo-details">
                <div class="promo-item">
                  <div class="promo-label-sm">${casino.promo && casino.promo.title ? casino.promo.title : 'Бонус'}</div>
                  <div class="promo-value-big">${casino.promo && casino.promo.value ? casino.promo.value : '-'}</div>
                </div>
                <div class="promo-item">
                  <div class="promo-label-sm">Детали</div>
                  <div class="promo-value-big">${casino.promo && casino.promo.details ? casino.promo.details : '-'}</div>
                </div>
              </div>
              <div class="promo-code-big">
                <div class="promo-code-text">${casino.promo && casino.promo.code ? casino.promo.code : '-'}</div>
                <button class="copy-btn-big" data-code="${casino.promo && casino.promo.code ? casino.promo.code : ''}">Копировать</button>
              </div>
            </div>
          </div>
          
          <div class="modal-divider"></div>

          <div class="modal-footer">
            <p class="disclaimer-text">Играйте ответственно. Азартные игры доступны только для лиц старше 18 лет.</p>
          </div>
        </div>
      `;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    // Render star rating
    function renderStars(rating) {
      let stars = '';
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      
      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          stars += '<span class="star">★</span>';
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars += '<span class="star">☆</span>';
        } else {
          stars += '<span class="star">☆</span>';
        }
      }
      
      return stars;
    }
  
    // Copy to clipboard
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Промокод скопирован в буфер обмена');
      }).catch(() => {
        showNotification('Не удалось скопировать промокод');
      });
    }
  
    // Show notification
    function showNotification(message) {
      // Remove existing notification if any
      const existingNotification = document.querySelector('.copy-notification');
      if (existingNotification) {
        existingNotification.remove();
      }
      
      // Create and show new notification
      const notification = document.createElement('div');
      notification.className = 'copy-notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 2000);
    }
  
    // Generate particles
    function createParticles() {
      const particles = document.querySelector('.particles');
      if (!particles) return;
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        particles.appendChild(particle);
      }
    }
  
    // === SCROLL ANIMATION ===
    function scrollAnimationInit() {
      const animatedEls = document.querySelectorAll('.scroll-animate');
      if (!animatedEls.length) return;
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      animatedEls.forEach(el => observer.observe(el));
    }
  
    // Initialize the application
    function init() {
      renderCasinoCards();
      createParticles();
      
      // Event delegation for casino buttons
      document.addEventListener('click', function(e) {
        // Details button click
        if (e.target.classList.contains('btn-details')) {
          const id = e.target.getAttribute('data-id');
          showCasinoDetails(id);
        }
        
        // Card click for details
        if (e.target.closest('.casino-card') && !e.target.closest('.btn-link') && !e.target.closest('.copy-btn')) {
          const card = e.target.closest('.casino-card');
          const id = card.getAttribute('data-id');
          showCasinoDetails(id);
        }
        
        // Copy button click
        if (e.target.classList.contains('copy-btn') || e.target.classList.contains('copy-icon') || e.target.classList.contains('copy-btn-big')) {
          const button = e.target.classList.contains('copy-btn') || e.target.classList.contains('copy-btn-big') 
            ? e.target 
            : e.target.closest('.copy-btn');
          const code = button.getAttribute('data-code');
          copyToClipboard(code);
        }
      });
  
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Offset for header height
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
  
      // Add animation to elements when they come into view
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.casino-card, .promo-card, .section-header, .about-content');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
  
      // Initialize animation on scroll
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Run once on page load
  
      scrollAnimationInit();
    }
  
    init();
  });