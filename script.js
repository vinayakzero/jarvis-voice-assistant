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
  const totalSeconds = 49; // 00:49 exact duration of Tata Sierra EV

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
      openVideoModal('sierra_ev');
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
     3. VIDEO MODAL PLAYER SETUP (MP4 & YouTube Hybrid)
  ------------------------------------------------------------- */
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoFrame = document.getElementById('modalVideoFrame');
  const modalHtml5Video = document.getElementById('modalHtml5Video');

  const videoData = {
    'doc': {
      title: 'The Prime Documentary - एक नाम जिससे पूरा बिहार का सिस्टम कांप उठा - ब्रह्मेश्वर मुखिया! | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/n7q2PGTjLJk?autoplay=1'
    },
    'saas': {
      title: 'B2B SaaS Product Demo & UI Motion Design Edit',
      type: 'mp4',
      url: 'assets/videos/Basic composition.mp4'
    },
    'bmw': {
      title: 'BMW M4 Underground Landscape - AI Cinematic Video & VFX',
      type: 'mp4',
      url: 'assets/videos/BMW M4 underground landscape.mp4'
    },
    'ugc_canada': {
      title: 'Canada Client UGC Viral Ad Campaign (Yellow Gas Station 9:16)',
      type: 'mp4',
      url: 'assets/videos/yellow gas station .mp4'
    },
    'brahmeshwar': {
      title: 'एक नाम जिससे पूरा बिहार का सिस्टम कांप उठा - ब्रह्मेश्वर मुखिया! | 2D Animation | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/n7q2PGTjLJk?autoplay=1'
    },
    'muhnochwa': {
      title: 'मुँहनोचवा: 2002 का वो रहस्यमयी साया जिसने पूरे उत्तर प्रदेश को दहला दिया | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/EJCvdtasEKY?autoplay=1'
    },
    'bharat': {
      title: 'क्या सच बोलने की सजा मौत है? भरत तिवारी की दर्दनाक कहानी | 2D Animation | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/5SQomrgnVao?autoplay=1'
    },
    'sukesh': {
      title: 'एक नाम जिससे पूरा बिहार का सिस्टम कांप उठा - ब्रह्मेश्वर मुखिया! | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/n7q2PGTjLJk?autoplay=1'
    },
    'ivf': {
      title: 'मुँहनोचवा: 2002 का वो रहस्यमयी साया जिसने पूरे उत्तर प्रदेश को दहला दिया | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/EJCvdtasEKY?autoplay=1'
    },
    'rana': {
      title: 'क्या सच बोलने की सजा मौत है? भरत तिवारी की दर्दनाक कहानी | The Prime Doc',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/5SQomrgnVao?autoplay=1'
    },
    'watch': {
      title: 'B2B SaaS Product Demo & UI Motion Design Edit',
      type: 'mp4',
      url: 'assets/videos/Basic composition.mp4'
    },
    'sierra_ev': {
      title: 'Tata Sierra EV — Cinematic Commercial & VFX Edit (00:49)',
      type: 'mp4',
      url: 'assets/videos/Tata Sierra EV.mp4'
    },
    'showreel': {
      title: 'Tata Sierra EV — Cinematic Commercial & VFX Edit (00:49)',
      type: 'mp4',
      url: 'assets/videos/Tata Sierra EV.mp4'
    },
    'trailer': {
      title: 'Tata Sierra EV — Cinematic Commercial & VFX Edit (00:49)',
      type: 'mp4',
      url: 'assets/videos/Tata Sierra EV.mp4'
    },
    'ai': {
      title: 'Canada Client UGC Viral Ad Campaign (Yellow Gas Station 9:16)',
      type: 'mp4',
      url: 'assets/videos/yellow gas station .mp4'
    }
  };

  window.openVideoModal = function(key) {
    const data = videoData[key] || {
      title: 'Project Showcase Video',
      type: 'youtube',
      url: 'https://www.youtube.com/embed/n7q2PGTjLJk?autoplay=1'
    };

    const vModal = document.getElementById('videoModal');
    const vTitle = document.getElementById('modalVideoTitle');
    let vFrame = document.getElementById('modalVideoFrame');
    let vHtml5 = document.getElementById('modalHtml5Video');
    const pContent = document.getElementById('modalPlayerContent') || (vModal ? vModal.querySelector('.modal-container > div') : null);

    if (vTitle) vTitle.textContent = data.title;

    if (data.type === 'mp4' || data.url.endsWith('.mp4')) {
      if (vFrame) {
        vFrame.src = '';
        vFrame.style.display = 'none';
      }
      if (!vHtml5 && pContent) {
        vHtml5 = document.createElement('video');
        vHtml5.id = 'modalHtml5Video';
        vHtml5.controls = true;
        vHtml5.style.width = '100%';
        vHtml5.style.maxHeight = '75vh';
        vHtml5.style.borderRadius = '12px';
        vHtml5.setAttribute('playsinline', '');
        pContent.appendChild(vHtml5);
      }
      if (vHtml5) {
        vHtml5.src = data.url;
        vHtml5.style.display = 'block';
        vHtml5.load();
        vHtml5.play().catch(e => console.log('Autoplay policy caught:', e));
      }
    } else {
      if (vHtml5) {
        vHtml5.pause();
        vHtml5.src = '';
        vHtml5.style.display = 'none';
      }
      if (vFrame) {
        vFrame.src = data.url;
        vFrame.style.display = 'block';
      }
    }

    if (vModal) vModal.classList.add('active');
  };

  window.closeVideoModal = function() {
    const vModal = document.getElementById('videoModal');
    const vFrame = document.getElementById('modalVideoFrame');
    const vHtml5 = document.getElementById('modalHtml5Video');

    if (vModal) vModal.classList.remove('active');
    if (vFrame) vFrame.src = '';
    if (vHtml5) {
      vHtml5.pause();
      vHtml5.src = '';
      vHtml5.style.display = 'none';
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'modalClose' || e.target.closest('#modalClose'))) {
      closeVideoModal();
    }
    if (e.target && e.target.id === 'videoModal') {
      closeVideoModal();
    }
  });

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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const serviceSelect = contactForm.querySelector('select');
      const messageInput = contactForm.querySelector('textarea');

      const name = nameInput ? nameInput.value : 'Client';
      const email = emailInput ? emailInput.value : '';
      const service = serviceSelect ? serviceSelect.value : 'General Inquiry';
      const message = messageInput ? messageInput.value : '';

      closeContactModal();
      showToast("Sending your inquiry to Vinayak's Gmail...");

      try {
        await fetch('https://formsubmit.co/ajax/mail2vinayakvallabhrai@gmail.com', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Quick Inquiry from ${name} [VisualNexa Studio Modal]`,
            _template: 'table',
            Name: name,
            Email: email,
            Service: service,
            Message: message
          })
        });
      } catch (err) {
        console.log('Modal delivery error:', err);
      }

      showToast("Inquiry Delivered! Vinayak will email you within 24 hours.");
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
