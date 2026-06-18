const fadeElements = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);
fadeElements.forEach((element) => observer.observe(element));

const sectionLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll("section[id]");
function updateActiveNav() {
  const scrollPosition = window.scrollY + 120;
  let activeId = "";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });
  sectionLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${activeId}`,
    );
  });
}
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

/* Navigation style toggle: toggles body.nav-alt and persists choice */
function initNavStyleToggle() {
  const buttons = document.querySelectorAll("#nav-style-toggle");
  if (!buttons || buttons.length === 0) return;

  const applyState = (on) => {
    document.body.classList.toggle("nav-alt", on);
    buttons.forEach((b) => {
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "Nav: Alt" : "Nav: Default";
    });
  };

  const saved = window.localStorage.getItem("navStyleAlt");
  const initial = saved === "1";
  applyState(initial);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOn = document.body.classList.toggle("nav-alt");
      window.localStorage.setItem("navStyleAlt", isOn ? "1" : "0");
      applyState(isOn);
    });
  });
}

initNavStyleToggle();

const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");
const feedback = document.getElementById("quiz-feedback");
const resetBtn = document.getElementById("quiz-reset-btn");

if (correctBtn && wrongBtn && feedback && resetBtn) {
  const lockButtons = () => {
    [correctBtn, wrongBtn].forEach((button) => {
      button.disabled = true;
    });
    resetBtn.style.display = "inline-flex";
  };

  correctBtn.addEventListener("click", () => {
    feedback.textContent = "✓ Correct! Well done.";
    feedback.className = "quiz-feedback-box correct-fb show";
    correctBtn.classList.add("correct");
    lockButtons();
  });

  wrongBtn.addEventListener("click", () => {
    feedback.textContent = "✗ Not quite. Try again!";
    feedback.className = "quiz-feedback-box wrong-fb show";
    wrongBtn.classList.add("wrong");
    lockButtons();
  });

  resetBtn.addEventListener("click", () => {
    feedback.textContent = "";
    feedback.className = "quiz-feedback-box";
    [correctBtn, wrongBtn].forEach((button) => {
      button.disabled = false;
      button.classList.remove("correct", "wrong");
    });
    resetBtn.style.display = "none";
  });
}
