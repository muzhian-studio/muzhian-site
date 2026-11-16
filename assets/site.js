(() => {
  const doc = document;
  const body = doc.body;
  const header = doc.querySelector(".site-header");
  const menuToggle = doc.querySelector(".menu-toggle");
  const mobileMenu = doc.querySelector(".mobile-menu");
  const main = doc.querySelector("main");
  const footer = doc.querySelector(".site-footer");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header state ---------------------------------------------------------- */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Mobile menu ----------------------------------------------------------- */
  let menuOpen = false;
  let lastFocused = null;

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu || !header) return;
    menuOpen = open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
    header.classList.toggle("is-open", open);

    if (main) main.inert = open;
    if (footer) footer.inert = open;

    if (open) {
      lastFocused = doc.activeElement;
      const firstLink = mobileMenu.querySelector("a");
      window.setTimeout(() => firstLink && firstLink.focus(), 80);
    } else {
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      lastFocused = null;
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => setMenu(!menuOpen));
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuOpen) setMenu(false);
  });

  /* Close menu if resized to desktop ------------------------------------- */
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  const onDesktop = (event) => {
    if (event.matches && menuOpen) setMenu(false);
  };

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", onDesktop);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(onDesktop);
  }

  /* Scroll reveal --------------------------------------------------------- */
  const revealItems = Array.from(doc.querySelectorAll("[data-reveal]"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* Copy to clipboard ----------------------------------------------------- */
  const toast = doc.querySelector(".toast");
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const area = doc.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    body.appendChild(area);
    area.select();

    try {
      const ok = doc.execCommand("copy");
      body.removeChild(area);
      return ok;
    } catch (error) {
      body.removeChild(area);
      return false;
    }
  };

  doc.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy");
      if (!text) return;

      const original = button.textContent;
      try {
        const ok = await copyText(text);
        if (!ok) throw new Error("copy failed");
        button.textContent = "已复制";
        showToast("邮箱已复制到剪贴板");
        window.setTimeout(() => {
          button.textContent = original;
        }, 1800);
      } catch (error) {
        window.location.href = `mailto:${text}`;
      }
    });
  });

  /* Current year ---------------------------------------------------------- */
  doc.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
