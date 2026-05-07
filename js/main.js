// SOHO Lagos - Main JS

document.addEventListener('DOMContentLoaded', () => {

  // NAVBAR SCROLL BEHAVIOR
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // MOBILE NAV
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close');

  const openMobileNav = () => {
    mobileNav?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });

  // SCROLL ANIMATIONS
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Stagger children
  document.querySelectorAll('.stagger-children > *').forEach((child, i) => {
    child.classList.add('fade-up');
    child.dataset.delay = i * 120;
    observer.observe(child);
  });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });

  // PARALLAX VIDEO BREAK
  const videoBreakBg = document.querySelector('.video-break-bg');
  const videoBreakSection = document.getElementById('video-break');

  if (videoBreakBg && videoBreakSection) {
    window.addEventListener('scroll', () => {
      const rect = videoBreakSection.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      const offset = progress * 60;
      videoBreakBg.style.transform = `scale(1.1) translateY(${offset}px)`;
    }, { passive: true });
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // DISH CARD TOUCH SUPPORT
  document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.querySelector('.dish-overlay')?.style.setProperty('opacity', '1');
    }, { passive: true });
  });

  // NUMBER COUNTER ANIMATION
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

});
