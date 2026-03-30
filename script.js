// AI Workshop: Skills in Motion - Script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("AI Workshop loaded. Ready to empower!");

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".feature-card, .step-item, .integration-card, .tour-text, .tour-visual, .timeline-item, .module-card, .tutorial-step, .lab-task, .instructor-card, .programme-item, .stat-item, .challenge-card"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-on-scroll");
    observer.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // Reading progress bar for tutorial/lab pages
  const tutorialContent = document.querySelector('.tutorial-content, .lab-content');
  if (tutorialContent) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);

    const style = document.createElement('style');
    style.textContent = `
      .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1001;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #38bdf8, #818cf8, #a855f7);
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
    });
  }

  // Stat counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));
  }

  // Typewriter effect for terminal in hero card (multi-phrase)
  const typewriterElement = document.getElementById('terminal-typewriter');
  if (typewriterElement) {
    const phrases = [
      "AI for Women in Aerospace",
      "From Prompter to Orchestrator",
      "Direct. Don't just ask.",
      "Build agentic workflows",
      "Skills in Motion, 2026"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseEnd = 2500;
    const pauseStart = 400;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, pauseEnd);
          return;
        }
        setTimeout(type, typeSpeed);
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, pauseStart);
          return;
        }
        setTimeout(type, deleteSpeed);
      }
    }

    setTimeout(type, 1000);
  }

  // === STICKY LAB PROGRESS TRACKER ===
  const labProgressSticky = document.getElementById('labProgressSticky');
  if (labProgressSticky) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        labProgressSticky.classList.add('scrolled');
      } else {
        labProgressSticky.classList.remove('scrolled');
      }
    });

    // Auto-highlight active lab section on scroll
    const labSections = document.querySelectorAll('.lab-task[id]');
    const progressSteps = document.querySelectorAll('.progress-step');

    if (labSections.length > 0 && progressSteps.length > 0) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            progressSteps.forEach(step => {
              step.classList.remove('active');
              if (step.dataset.target === targetId) {
                step.classList.add('active');
              }
            });
          }
        });
      }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

      labSections.forEach(section => sectionObserver.observe(section));
    }
  }

  // === LAZY LOADING FOR IMAGES ===
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // === SMOOTH PAGE TRANSITIONS ===
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    // Only apply to internal navigation links
    if (link.hostname === window.location.hostname || !link.hostname) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('http') && !this.target) {
          e.preventDefault();
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.25s ease';
          setTimeout(() => {
            window.location.href = href;
          }, 250);
        }
      });
    }
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});

// Copy code functionality
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('.code-content').textContent;
  navigator.clipboard.writeText(code.trim()).then(() => {
    const original = button.textContent;
    button.textContent = '✓ Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.textContent = original;
      button.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = code.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    button.textContent = '✓ Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  });
}

