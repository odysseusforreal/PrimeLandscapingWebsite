document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const hero = document.querySelector(".hero");
const year = document.querySelector("[data-year]");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) {
    return;
  }
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-wash-demo]").forEach((demo) => {
  const range = demo.querySelector("[data-wash-range]");
  const update = () => demo.style.setProperty("--reveal", `${range.value}%`);
  if (range) {
    range.addEventListener("input", update);
    update();
  }
});

if ("IntersectionObserver" in window && !motionQuery.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

if (hero && !motionQuery.matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    hero.style.setProperty("--pan-x", `${x}px`);
    hero.style.setProperty("--pan-y", `${y}px`);
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--pan-x", "0px");
    hero.style.setProperty("--pan-y", "0px");
  });
}
