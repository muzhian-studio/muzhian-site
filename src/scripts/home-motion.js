(() => {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  const triggers = Array.from(hero.querySelectorAll("[data-reel-trigger]"));
  const images = Array.from(hero.querySelectorAll("[data-reel-image]"));
  const current = hero.querySelector("[data-reel-current]");
  const category = hero.querySelector("[data-reel-category]");
  const reel = hero.querySelector(".ledger-reel");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;
  let timer = null;
  let paused = false;

  const pad = (value) => String(value + 1).padStart(2, "0");

  const activate = (next) => {
    if (!triggers.length) return;
    index = (next + triggers.length) % triggers.length;

    triggers.forEach((trigger, i) => {
      const active = i === index;
      trigger.classList.toggle("is-active", active);
      if (active) trigger.setAttribute("aria-current", "true");
      else trigger.removeAttribute("aria-current");
    });

    images.forEach((image, i) => {
      image.classList.toggle("is-active", i === index);
    });

    if (current) current.textContent = pad(index);
    if (category) {
      const label = triggers[index]?.querySelector(".ledger-category")?.textContent?.trim() || "";
      category.textContent = label;
    }

    if (reel && !reduce) {
      reel.classList.remove("is-playing");
      // Restart the progress bar without adding a timer of our own.
      void reel.offsetWidth;
      reel.classList.add("is-playing");
    }
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const play = () => {
    stop();
    if (reduce || paused || triggers.length < 2) return;
    timer = window.setInterval(() => activate(index + 1), 5200);
  };

  triggers.forEach((trigger, i) => {
    trigger.addEventListener("mouseenter", () => {
      stop();
      activate(i);
    });
    trigger.addEventListener("focus", () => {
      stop();
      activate(i);
    });
    trigger.addEventListener("mouseleave", () => {
      if (!paused) play();
    });
    trigger.addEventListener("blur", () => {
      if (!paused) play();
    });
  });

  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
    if (paused) stop();
    else play();
  });

  activate(0);
  play();

  // Very small scroll parallax; only on desktop, never under reduced motion.
  if (!reduce && window.matchMedia("(min-width: 881px)").matches) {
    let ticking = false;
    const update = () => {
      const shift = Math.min(window.scrollY, window.innerHeight) * 0.045;
      hero.style.setProperty("--parallax", `${shift.toFixed(2)}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }
})();
