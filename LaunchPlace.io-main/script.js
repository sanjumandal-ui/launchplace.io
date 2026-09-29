/* ===============================
   MOBILE NAV
================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow =
    navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ===============================
   FAQ ACCORDION
================================ */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (!question) return;

  question.addEventListener('click', () => {
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});


/* ===============================
   SMOOTH ANCHOR SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const offset =
      target.getBoundingClientRect().top + window.pageYOffset - 90;

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
});


/* ===============================
   SCROLL REVEAL ANIMATION
================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ===============================
   STAT COUNTER ANIMATION
================================ */
function animateCounter(element, target, duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;

    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counters = entry.target.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      animateCounter(counter, target);
      counter.classList.add('glow-pop');
    });

    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats-grid').forEach(grid => {
  counterObserver.observe(grid);
});


/* ===============================
   HERO PARALLAX SCROLL EFFECT
================================ */
const hero = document.querySelector('.hero, .portfolio-hero, .contact-hero');

window.addEventListener('scroll', () => {
  if (!hero) return;

  const scrolled = window.scrollY;
  hero.style.transform = `translateY(${scrolled * 0.08}px)`;
});


/* ===============================
   FORM HANDLING
================================ */
function handleFormSubmission(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    } catch (err) {
      alert('Error sending message. Try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}


/* ===============================
   LAZY LOAD IMAGES
================================ */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}


/* ===============================
   PARTICLE FLOAT EFFECT
================================ */
function addParticleEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(180,140,255,0.8);
      box-shadow:0 0 8px rgba(180,140,255,0.9);
      border-radius: 50%;
      animation: floatParticle ${Math.random() * 4 + 3}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 3}s;
    `;
    hero.appendChild(particle);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translateY(-140px) translateX(40px); opacity: 0; }
  }
`;
document.head.appendChild(style);


/* ===============================
   DOM READY INIT
================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(handleFormSubmission);

  addParticleEffect();

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 120);

  console.log('🚀 LaunchPlace.io Cyber UI Loaded');
});
