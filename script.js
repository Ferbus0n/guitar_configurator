const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const langSwitch = document.querySelector("[data-lang-switch]");
const revealItems = document.querySelectorAll(".reveal");
const tiltItems = document.querySelectorAll("[data-tilt]");
const contactForms = document.querySelectorAll("[data-contact-form]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const closeMenu = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

if (langSwitch) {
  langSwitch.addEventListener("change", (event) => {
    window.location.href = event.target.value;
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px 110px 0px", threshold: 0.04 }
);

revealItems.forEach((item) => revealObserver.observe(item));

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    item.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    item.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    item.style.setProperty("--tz", "8px");
  });

  item.addEventListener("pointerleave", () => {
    item.style.setProperty("--rx", "0deg");
    item.style.setProperty("--ry", "0deg");
    item.style.setProperty("--tz", "0px");
  });
});

document.querySelectorAll("[data-configurator]").forEach((panel) => {
  const img = panel.querySelector("[data-configurator-image]");
  const depth = panel.querySelector("[data-depth]");
  const rotate = panel.querySelector("[data-rotate]");
  const update = () => {
    img?.style.setProperty("--depth", `${depth?.value || 0}deg`);
    img?.style.setProperty("--rotate", `${rotate?.value || 0}deg`);
  };
  depth?.addEventListener("input", update);
  rotate?.addEventListener("input", update);
  update();
});

document.querySelectorAll("[data-gallery-thumb]").forEach((button) => {
  button.addEventListener("click", () => {
    const main = document.querySelector("[data-main-gallery-image]");
    if (main) {
      main.src = button.dataset.galleryThumb;
      main.alt = button.querySelector("img")?.alt || "";
    }
  });
});

const openLightbox = (src, alt = "") => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
};

document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    openLightbox(button.dataset.lightboxSrc, img?.alt || "");
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const configuratorQuery = new URLSearchParams(window.location.search).get("config");
const savedConfigurator = configuratorQuery === "3d" ? localStorage.getItem("ramosGuitarConfiguration") : null;

contactForms.forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  if (savedConfigurator) {
    const message = form.elements.message;
    const interest = form.elements.interest;
    if (interest) interest.value = "Custom guitar";
    if (message && !message.value) {
      message.value = `Configuración 3D guardada:\n\n${savedConfigurator}`;
    }
    if (status) status.textContent = "Configuración 3D cargada en el formulario.";
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Revisa los campos obligatorios antes de enviar.";
      form.reportValidity();
      return;
    }
    status.textContent = "Consulta preparada. En la versión final conectaremos el envío real.";
    form.reset();
  });
});
