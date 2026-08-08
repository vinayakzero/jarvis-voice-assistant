/* VINAYAK VALLABH RAI - INTERACTIVE JAVASCRIPT LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Portfolio Script initialized for Vinayak Vallabh Rai");

  // 1. Navigation Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
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

  // 2. Video Modal Player Setup
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

  // 3. Contact Form Modal
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

  // 4. Resume Automatic Download Handler
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

  // 5. Toast Notification System
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
