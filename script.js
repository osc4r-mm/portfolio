/* ============================================================
   NAVEGACIÓN ACTIVA AL HACER SCROLL
   Detecta qué sección está visible y marca el punto del menú
   lateral (escritorio) y del menú inferior (móvil).
============================================================ */
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = mobileNav.querySelectorAll("a");

const updateActiveLink = (currentId) => {
  // Para desktop: active en .nav-dot
  document.querySelectorAll(".nav-dot").forEach((dot) => {
    const link = dot.querySelector(".nav-link");
    dot.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
  // Para mobile: active en los <a>
  mobileLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
};

window.addEventListener("scroll", () => {
  let current = "inicio";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 300) {
      current = section.id;
    }
  });
  updateActiveLink(current);
});

/* ============================================================
   MOSTRAR / OCULTAR NAVEGACIÓN MÓVIL
   La barra inferior solo aparece en pantallas ≤ 768px.
============================================================ */
const toggleMobileNav = () => {
  mobileNav.classList.toggle("hidden", window.innerWidth > 768);
};

toggleMobileNav();
window.addEventListener("resize", toggleMobileNav);

/* ============================================================
   ANIMACIONES DE ENTRADA POR SECCIÓN
   Los elementos se revelan en cascada cuando su sección
   entra en el viewport. Se observa la sección completa,
   no cada elemento por separado, evitando que se quede
   encallada la animación a mitad de página.
============================================================ */
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Recoge todos los elementos animables dentro de la sección
      const children = entry.target.querySelectorAll(
        ".timeline-item, .cert-card, .skill-tag, .project-card, .about-avatar",
      );

      children.forEach((child, i) => {
        // Escalonado: cada hijo aparece 70ms después del anterior
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, i * 70);
      });

      // Una vez animada la sección, dejamos de observarla
      animObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.05 },
);

// Estado inicial: todos los elementos animables invisibles
document
  .querySelectorAll(
    ".timeline-item, .cert-card, .skill-tag, .about-avatar, .project-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Observamos las secciones, no los elementos individuales
document.querySelectorAll("section, header").forEach((section) => {
  animObserver.observe(section);
});
