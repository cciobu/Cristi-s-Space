document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");
  const mobileBreakpoint = window.matchMedia("(max-width: 860px)");

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.classList.remove("is-active");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileBreakpoint.matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    mobileBreakpoint.addEventListener("change", (event) => {
      if (!event.matches) {
        closeMenu();
      }
    });
  }

  const targets = document.querySelectorAll(
    ".hero > .container > *, .section .section-head, .section .card, .hero-image, .page-banner, .gallery figure"
  );

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));

  if (faqItems.length) {
    const closeFaqItem = (item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;
      item.classList.remove("is-open");
      question.setAttribute("aria-expanded", "false");
      answer.setAttribute("aria-hidden", "true");
      answer.style.maxHeight = "0px";
    };

    const openFaqItem = (item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;
      item.classList.add("is-open");
      question.setAttribute("aria-expanded", "true");
      answer.setAttribute("aria-hidden", "false");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    };

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      closeFaqItem(item);

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        faqItems.forEach((entry) => closeFaqItem(entry));
        if (!isOpen) {
          openFaqItem(item);
        }
      });
    });

    window.addEventListener("resize", () => {
      faqItems.forEach((item) => {
        if (item.classList.contains("is-open")) {
          const answer = item.querySelector(".faq-answer");
          if (answer) {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
          }
        }
      });
    });
  }
});
