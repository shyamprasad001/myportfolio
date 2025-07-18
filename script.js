document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initSmoothScrolling();
  initBackToTopButton();
  initContactForm();
  initSkillsAnimation();
  initNavbarScroll();
  initScrollSpy();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const smoothScrollLinks = document.querySelectorAll(
    '.smooth-scroll, .nav-link[href^="#"]'
  );

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
      }
    });
  });
}

// Back to Top Button Functionality
function initBackToTopButton() {
  const backToTopButton = document.getElementById("backToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          backToTopButton.style.display = "none";
        }
      }, 300);
    }
  });

  // Smooth scroll to top
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Simulate form submission
    showFormSubmissionMessage();

    // Reset form
    contactForm.reset();

    console.log("Form submitted:", formData);
  });
}

// Show success message for form submission
function showFormSubmissionMessage() {
  // Create success alert
  const alertDiv = document.createElement("div");
  alertDiv.className = "alert alert-success alert-dismissible fade show mt-3";
  alertDiv.innerHTML = `
        <strong>Thank you!</strong> Your message has been sent successfully. I'll get back to you soon!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Insert after the form
  const form = document.getElementById("contactForm");
  form.parentNode.insertBefore(alertDiv, form.nextSibling);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Animate Skills Progress Bars
function initSkillsAnimation() {
  const skillsSection = document.getElementById("skills");
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    const progressBars = skillsSection.querySelectorAll(".progress-bar");

    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.style.width;
        bar.style.width = "0%";

        setTimeout(() => {
          bar.style.width = width;
          bar.style.transition = "width 1.5s ease-in-out";
        }, 100);
      }, index * 200);
    });

    skillsAnimated = true;
  }

  // Intersection Observer for skills animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          animateSkills();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(skillsSection);
}

// Navbar Background on Scroll
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Custom ScrollSpy Implementation
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink(); // Initial call
}

// Intersection Observer for Fade-in Animations
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  const fadeElements = document.querySelectorAll(
    ".card, .skill-item, .project-card"
  );
  fadeElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Initialize fade-in animations
setTimeout(initFadeInAnimations, 100);

// Typing Effect for Hero Section (Optional Enhancement)
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const texts = [
    "Frontend Developer",
    "Web Designer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(typeText, typeSpeed);
  }

  typeText();
}

// Parallax Effect for Hero Section (Optional)
function initParallaxEffect() {
  const hero = document.getElementById("hero");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Console welcome message
console.log(
  "%c🚀 Welcome to Jane Doe's Portfolio! ",
  "color: #0d6efd; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cThanks for checking out the code! Feel free to reach out if you have any questions.",
  "color: #6c757d; font-size: 14px;"
);
