// =============================
// Utility: Smooth Scroll
// =============================
document.addEventListener("click", (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
  
    const href = target.getAttribute("href");
    if (href.length <= 1) return;
  
    const section = document.querySelector(href);
    if (!section) return;
  
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  
    const nav = document.getElementById("navMenu");
    const toggle = document.getElementById("navToggle");
    if (nav && toggle && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.classList.remove("open");
    }
  });
  
  // Navbar active link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  const onScrollHighlight = () => {
    const scrollPos = window.scrollY + 110;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
  
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });
  };
  
  window.addEventListener("scroll", onScrollHighlight);
  
  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
    });
  }
  
  // Scroll reveal
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  
  revealElements.forEach((el) => revealObserver.observe(el));
  
  // Scroll to top
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  
  if (scrollTopBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    };
  
    window.addEventListener("scroll", toggleScrollBtn);
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  // Project tilt
  const projectCards = document.querySelectorAll(".project-tilt");
  
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const maxTilt = 10;
  
      const tiltX = (y / rect.height) * maxTilt;
      const tiltY = -(x / rect.width) * maxTilt;
  
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
  
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
  
  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  
  const showError = (input, message) => {
    const group = input.closest(".form-group");
    if (!group) return;
    const small = group.querySelector(".error-msg");
    if (small) small.textContent = message || "";
    input.classList.toggle("invalid", !!message);
  };
  
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nameInput = contactForm.querySelector("#name");
      const emailInput = contactForm.querySelector("#email");
      const messageInput = contactForm.querySelector("#message");
  
      let isValid = true;
      formStatus.textContent = "";
  
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name.");
        isValid = false;
      } else showError(nameInput, "");
  
      if (!emailInput.value.trim()) {
        showError(emailInput, "Please enter your email.");
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else showError(emailInput, "");
  
      if (!messageInput.value.trim()) {
        showError(messageInput, "Please enter a message.");
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message should be at least 10 characters.");
        isValid = false;
      } else showError(messageInput, "");
  
      if (!isValid) return;
  
      contactForm.reset();
      formStatus.textContent = "Thank you! Your message has been validated. You can now send it via email.";
    });
  
    contactForm.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("input", () => {
        showError(el, "");
        if (formStatus) formStatus.textContent = "";
      });
    });
  }
  
  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }