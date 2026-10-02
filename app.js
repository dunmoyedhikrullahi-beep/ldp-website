const DESTINATION_EMAIL = "REPLACE_WITH_LDP_OFFICIAL_EMAIL@example.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".property-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

const modal = document.querySelector("#propertyModal");
const modalTitle = document.querySelector("#modalTitle");
const modalContact = document.querySelector("#modalContact");

document.querySelectorAll(".view-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.property;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
});

modalContact.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const email = form.get("email");
  const interest = form.get("interest");
  const message = form.get("message");
  const subject = encodeURIComponent(`LDP Nigeria Website Enquiry — ${interest}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
  );

  if (DESTINATION_EMAIL.includes("REPLACE_WITH")) {
    document.querySelector("#formSuccess").textContent =
      "Demo mode: replace DESTINATION_EMAIL in app.js with LDP's official email before publishing.";
    return;
  }

  window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
