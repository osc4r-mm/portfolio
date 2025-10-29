const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = mobileNav.querySelectorAll("a");

const updateActiveLink = (current) => {
  [...navLinks, ...mobileLinks].forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", () => {
  let current = "inicio";
  sections.forEach((s) => {
    if (scrollY >= s.offsetTop - 300) current = s.id;
  });
  updateActiveLink(current);
});

const toggleMobileNav = () =>
  mobileNav.classList.toggle("hidden", innerWidth > 768);

toggleMobileNav();
addEventListener("resize", toggleMobileNav);
