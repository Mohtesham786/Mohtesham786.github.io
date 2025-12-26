// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Active nav highlighting on scroll
const navLinks = Array.from(document.querySelectorAll(".navlinks a"));
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach((sec) => {
    if (sec.offsetTop <= y) current = sec.id;
  });

  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActive);
setActive();

// Reveal on scroll (IntersectionObserver)
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// Project filters
const filterBtns = document.querySelectorAll(".fbtn");
const projects = document.querySelectorAll("[data-tags]");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    projects.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = f === "all" ? true : tags.includes(f);
      card.style.display = show ? "" : "none";
    });
  });
});
