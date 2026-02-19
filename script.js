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
  [...navLinks, ...mobileLinks].forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
};

window.addEventListener("scroll", () => {
  let current = "inicio";
  sections.forEach((section) => {
    // La sección activa es la que supera el umbral de scroll
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
   CAMBIO DE PESTAÑAS (Experiencia / Educación / Certificaciones)
   Se llama desde el atributo onclick de cada botón .exp-tab.
============================================================ */
function switchTab(event, tabId) {
  // Quita la clase activa de todos los botones y paneles
  document
    .querySelectorAll(".exp-tab")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-panel")
    .forEach((panel) => panel.classList.remove("active"));

  // Activa el botón pulsado y el panel correspondiente
  event.target.classList.add("active");
  document.getElementById("tab-" + tabId).classList.add("active");
}

/* ============================================================
   ANIMACIONES DE ENTRADA AL HACER SCROLL
   Los elementos se revelan con un fade + desplazamiento vertical
   cuando entran en el viewport (IntersectionObserver).
============================================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

// Elementos que se animan al aparecer en pantalla
const animatedElements = document.querySelectorAll(
  ".timeline-item, .cert-card, .skill-tag, .about-avatar, .project-card",
);

animatedElements.forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  // Escalonado para que no aparezcan todos a la vez
  el.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`;
  observer.observe(el);
});
