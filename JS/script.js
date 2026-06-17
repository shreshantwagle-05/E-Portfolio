// ── SCROLL FADE ANIMATIONS ──
const fades = document.querySelectorAll(".fade-up");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 100);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
fades.forEach((el) => obs.observe(el));

// ── ACTIVE NAV HIGHLIGHT (portfolio page) ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((l) => {
    l.classList.remove("active-nav");
    if (l.getAttribute("href") === "#" + current) l.classList.add("active-nav");
  });
});

// ── SIMPLE QUIZ (portfolio page only) ──
const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");
const feedback = document.getElementById("quiz-feedback");
const resetBtn = document.getElementById("quiz-reset-btn");

if (correctBtn) {
  function lockButtons() {
    [correctBtn, wrongBtn].forEach((b) => (b.style.pointerEvents = "none"));
    resetBtn.style.display = "inline-block";
  }

  correctBtn.addEventListener("click", function () {
    feedback.textContent = "✓ Correct! Well done.";
    feedback.className = "quiz-feedback-box correct-fb show";
    correctBtn.classList.add("correct");
    lockButtons();
  });

  wrongBtn.addEventListener("click", function () {
    feedback.textContent = "✗ Not quite. Try again!";
    feedback.className = "quiz-feedback-box wrong-fb show";
    wrongBtn.classList.add("wrong");
    correctBtn.classList.add("correct");
    lockButtons();
  });
}

function resetQuiz() {
  feedback.textContent = "";
  feedback.className = "quiz-feedback-box";
  [correctBtn, wrongBtn].forEach((b) => {
    b.classList.remove("correct", "wrong");
    b.style.pointerEvents = "";
  });
  resetBtn.style.display = "none";
}
