// === Smooth scroll navigation ===
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    var navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('open');
  });
});

// === Navigation scroll effect ===
var nav = document.getElementById('main-nav');
window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// === Mobile menu toggle ===
var toggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
}

// === Scroll animations (Intersection Observer) ===
var animatedElements = document.querySelectorAll('[data-animate], .timeline-item, .address-card, .info-item');

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

animatedElements.forEach(function(el) {
  observer.observe(el);
});

// === Parallax effect for hero and section backgrounds ===
var heroBg = document.querySelector('.hero-bg');
var dividerBg = document.querySelector('.image-divider-bg');
var sectionParallax = document.querySelector('.section-parallax');

window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;
  
  if (heroBg) {
    heroBg.style.transform = 'scale(1.1) translateY(' + (scrollY * 0.3) + 'px)';
  }
  
  if (dividerBg) {
    var dividerSection = dividerBg.closest('.image-divider');
    if (dividerSection) {
      var rect = dividerSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var offset = (rect.top / window.innerHeight - 0.5) * 60;
        dividerBg.style.transform = 'translateY(' + offset + 'px)';
      }
    }
  }
  
  if (sectionParallax) {
    var sec = sectionParallax.closest('.section--image');
    if (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var offset = (rect.top / window.innerHeight - 0.5) * 50;
        sectionParallax.style.transform = 'translateY(' + offset + 'px)';
      }
    }
  }
});

// Trigger once on load
window.dispatchEvent(new Event('scroll'));