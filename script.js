/* VINAYAK VALLABH RAI - INTERACTIVE 3D JAVASCRIPT LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  console.log("3D Interactive Portfolio Initialized for Vinayak Vallabh Rai");

  /* -------------------------------------------------------------
     1. NAVIGATION ACTIVE LINK HIGHLIGHT & GLASS NAVBAR SCROLL
  ------------------------------------------------------------- */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------
     2. 3D CARD TILT & GLARE EFFECT ENGINE
  ------------------------------------------------------------- */
  function init3DTiltCards() {
    const tiltElements = document.querySelectorAll('.project-card, .skill-card, .info-box, .photo-wrapper, .info-card-floating, .stat-card');

    tiltElements.forEach(card => {
      // Ensure glare overlay element
      if (!card.querySelector('.tilt-glare')) {
        const glareEl = document.createElement('div');
        glareEl.className = 'tilt-glare';
        card.appendChild(glareEl);
      }

      const glare = card.querySelector('.tilt-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation angles (max 18 degrees)
        const rotateX = ((mouseY / cardHeight) - 0.5) * -24;
        const rotateY = ((mouseX / cardWidth) - 0.5) * 24;

        // Glare calculation
        const glareX = (mouseX / cardWidth) * 100;
        const glareY = (mouseY / cardHeight) * 100;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03) translateZ(10px)`;
        card.style.transition = 'transform 0.1s ease-out';

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(190, 242, 100, 0.08) 40%, rgba(0, 0, 0, 0) 80%)`;
          glare.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

        if (glare) {
          glare.style.opacity = '0';
          glare.style.transition = 'opacity 0.5s ease-out';
        }
      });
    });
  }

  init3DTiltCards();

  /* -------------------------------------------------------------
     3. HERO FLOATING BADGES 3D PARALLAX EFFECT
  ------------------------------------------------------------- */
  const heroVisual = document.querySelector('.hero-visual');
  const floatingBadges = document.querySelectorAll('.floating-badge');

  if (heroVisual && floatingBadges.length > 0) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      floatingBadges.forEach((badge, idx) => {
        const factor = (idx + 1) * 20;
        const moveX = relX * factor;
        const moveY = relY * factor;
        badge.style.transform = `translate3d(${moveX}px, ${moveY}px, 30px) rotate(${moveX * 0.2}deg)`;
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      floatingBadges.forEach((badge) => {
        badge.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        badge.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      });
    });
  }

  /* -------------------------------------------------------------
     4. FUTURISTIC 3D CYBER CURSOR FOLLOWER
  ------------------------------------------------------------- */
  function initCyberCursor() {
    // Only create cursor for fine pointing devices (desktops)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cyber-cursor-dot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cyber-cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover Scaling for Interactive Elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-card, .info-box, .btn-primary, .btn-secondary, .btn-work-together');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hovering');
        cursorDot.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hovering');
        cursorDot.classList.remove('hovering');
      });
    });
  }

  initCyberCursor();

  /* -------------------------------------------------------------
     5. VIDEO MODAL PLAYER SETUP
  ------------------------------------------------------------- */
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoFrame = document.getElementById('modalVideoFrame');

  const videoData = {
    'doc': {
      title: 'The Prime Documentary - Editing Breakdown',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'watch': {
      title: 'Product Ads Video - Luxury Watch Commercial',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'trailer': {
      title: 'Cinematic Trailer - Visual Effects Showcase',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'ai': {
      title: 'Future is AI - AI UGC Video Creation',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt1': {
      title: 'The Dark Reality of AI - Documentary',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt2': {
      title: 'India in 2030 - A Vision of Tomorrow',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt3': {
      title: 'Documentary Making Process - Behind The Scenes',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    }
  };

  window.openVideoModal = function(key) {
    const data = videoData[key] || { title: 'Project Preview Video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' };
    if (modalVideoTitle) modalVideoTitle.textContent = data.title;
    if (modalVideoFrame) modalVideoFrame.src = data.url;
    if (videoModal) videoModal.classList.add('active');
  };

  window.closeVideoModal = function() {
    if (videoModal) videoModal.classList.remove('active');
    if (modalVideoFrame) modalVideoFrame.src = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }

  /* -------------------------------------------------------------
     6. CONTACT FORM MODAL
  ------------------------------------------------------------- */
  const contactModal = document.getElementById('contactModal');
  const contactClose = document.getElementById('contactClose');
  const contactForm = document.getElementById('contactForm');

  window.openContactModal = function() {
    if (contactModal) contactModal.classList.add('active');
  };

  window.closeContactModal = function() {
    if (contactModal) contactModal.classList.remove('active');
  };

  if (contactClose) {
    contactClose.addEventListener('click', closeContactModal);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeContactModal();
      showToast("Message Sent Successfully! Vinayak will contact you soon.");
      contactForm.reset();
    });
  }

  /* -------------------------------------------------------------
     7. RESUME DOWNLOAD HANDLER
  ------------------------------------------------------------- */
  window.downloadResume = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    showToast("Downloading Vinayak Vallabh Rai's Resume...");
    
    const link = document.createElement('a');
    link.href = 'assets/Vinayak_Vallabh_Rai_Resume.jpg';
    link.download = 'Vinayak_Vallabh_Rai_Resume.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* -------------------------------------------------------------
     8. TOAST NOTIFICATION SYSTEM
  ------------------------------------------------------------- */
  window.showToast = function(message) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };
});
