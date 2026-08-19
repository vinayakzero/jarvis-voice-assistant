/* =========================================================================
   VINAYAK VALLABH RAI - CINEMATIC PORTFOLIO CORE INTERACTIONS
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  console.log("The Editing Machine initialized for Vinayak Vallabh Rai");

  /* -------------------------------------------------------------
     1. NAVIGATION SCROLL CLASS
  ------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  /* -------------------------------------------------------------
     2. CUSTOM CINEMATIC SHOWREEL PLAYER
  ------------------------------------------------------------- */
  const showreelOverlay = document.getElementById('showreelOverlay');
  const btnShowreelPlay = document.getElementById('btnShowreelPlay');
  const btnCtrlPlay = document.getElementById('btnCtrlPlay');
  const scrubFill = document.getElementById('playerScrubFill');
  const timeReadout = document.getElementById('playerTimeReadout');
  const btnFullscreen = document.getElementById('btnFullscreen');
  const showreelWrapper = document.getElementById('showreelWrapper');

  let isPlaying = false;
  let playInterval = null;
  let currentSeconds = 0;
  const totalSeconds = 165; // 02:45 total duration

  function formatTime(s) {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(Math.floor(s % 60)).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function toggleShowreelPlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      if (showreelOverlay) showreelOverlay.style.display = 'none';
      if (btnCtrlPlay) btnCtrlPlay.innerHTML = '<i data-lucide="pause"></i>';
      lucide.createIcons();

      playInterval = setInterval(() => {
        currentSeconds++;
        if (currentSeconds > totalSeconds) {
          currentSeconds = 0;
          toggleShowreelPlay();
        }
        const pct = (currentSeconds / totalSeconds) * 100;
        if (scrubFill) scrubFill.style.width = `${pct}%`;
        if (timeReadout) timeReadout.textContent = `${formatTime(currentSeconds)} / ${formatTime(totalSeconds)}`;
      }, 1000);

      // Trigger video modal for full preview if clicked main play button
      openVideoModal('trailer');
    } else {
      clearInterval(playInterval);
      if (btnCtrlPlay) btnCtrlPlay.innerHTML = '<i data-lucide="play"></i>';
      lucide.createIcons();
    }
  }

  if (showreelOverlay) {
    showreelOverlay.addEventListener('click', toggleShowreelPlay);
  }
  if (btnCtrlPlay) {
    btnCtrlPlay.addEventListener('click', toggleShowreelPlay);
  }

  if (btnFullscreen && showreelWrapper) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        showreelWrapper.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  /* -------------------------------------------------------------
     3. VIDEO MODAL PLAYER SETUP
  ------------------------------------------------------------- */
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoFrame = document.getElementById('modalVideoFrame');

  const videoData = {
    'doc': {
      title: 'The Prime Documentary - Editing Breakdown & Color Grade',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'watch': {
      title: 'Product Commercial - Luxury Watch Commercial Edit',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'trailer': {
      title: 'Cinematic VFX Trailer - Master Showreel Cut',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'ai': {
      title: 'Future of AI - AI UGC Video Production',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt1': {
      title: 'The Dark Reality of AI - Full Documentary',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt2': {
      title: 'India in 2030 - A Vision of Tomorrow',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    'yt3': {
      title: 'Documentary Making Process - Behind The Scenes Breakdown',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    }
  };

  window.openVideoModal = function(key) {
    const data = videoData[key] || {
      title: 'Project Showcase Video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    };
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
     4. CONTACT FORM MODAL
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
      showToast("Message Sent! Vinayak will connect with you within 24 hours.");
      contactForm.reset();
    });
  }

  /* -------------------------------------------------------------
     5. RESUME DOWNLOAD HANDLER
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
     6. TOAST NOTIFICATION SYSTEM
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
