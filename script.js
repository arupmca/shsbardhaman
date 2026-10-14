// Small interactions for the Sadya High School homepage
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Keep the copyright year current.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Hero slider: loops through the hero images automatically.
(function () {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const slides = hero.querySelectorAll(".hero-slide");
  const dots = hero.querySelectorAll(".hero-dots .dot");
  const prevBtn = hero.querySelector(".hero-arrow.prev");
  const nextBtn = hero.querySelector(".hero-arrow.next");
  if (slides.length < 2) return;

  // Make sure every slide image is fully downloaded/decoded before it is needed,
  // so the first click never slides in an empty (not yet loaded) image.
  slides.forEach((img) => {
    img.loading = "eager";
    if (img.decode) img.decode().catch(() => {});
  });

  const DELAY = 5000;
  let current = 0;
  let timer = null;
  let busy = false;
  let queued = null;

  function goTo(index, direction) {
    index = (index + slides.length) % slides.length;
    if (index === current) return;
    if (busy) { queued = [index, direction]; return; } // don't lose a click made mid-animation
    busy = true;
    const outgoing = slides[current];
    const incoming = slides[index];
    const forward = direction !== "prev";

    // Place the incoming slide on the correct side without animating.
    incoming.classList.toggle("from-left", !forward);
    void incoming.offsetWidth; // force reflow
    incoming.classList.remove("from-left");
    incoming.classList.add("active");
    outgoing.classList.remove("active");
    outgoing.classList.add(forward ? "leaving" : "leaving-right");

    dots.forEach((d, i) => d.classList.toggle("selected", i === index));
    current = index;

    setTimeout(() => {
      slides.forEach((sl, i) => { if (i !== current) sl.classList.remove("leaving", "leaving-right"); });
      busy = false;
      if (queued) { const q = queued; queued = null; goTo(q[0], q[1]); }
    }, 850);
  }

  const next = () => goTo(current + 1, "next");
  const prev = () => goTo(current - 1, "prev");
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const start = () => { stop(); timer = setInterval(next, DELAY); };

  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.preventDefault(); next(); start(); });
  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.preventDefault(); prev(); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i, i > current ? "next" : "prev"); start(); }));

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  start();
})();
