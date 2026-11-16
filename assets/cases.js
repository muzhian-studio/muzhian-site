(() => {
  const featuredRoot = document.querySelector("#featured-cases");
  const listRoot = document.querySelector("#case-list");
  const homeSection = document.querySelector("#cases");
  const emptyState = document.querySelector("#case-empty");
  const countNode = document.querySelector("#work-count");
  const dialog = document.querySelector("#case-dialog");
  const dialogBody = document.querySelector("#case-dialog-body");

  if (!featuredRoot && !listRoot) return;

  let cases = [];
  const bySlug = new Map();

  const imagePath = (value) => {
    if (!value) return "";
    if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
    return `/${value.replace(/^\.?\//, "")}`;
  };

  const textBlock = (parent, className, text) => {
    if (!text) return;
    const el = document.createElement("p");
    el.className = className;
    el.textContent = text;
    parent.appendChild(el);
  };

  const sectionBlock = (parent, label, text) => {
    if (!text) return;
    const section = document.createElement("section");
    section.className = "case-dialog-section";
    const heading = document.createElement("h3");
    heading.textContent = label;
    section.appendChild(heading);
    textBlock(section, "case-dialog-text", text);
    parent.appendChild(section);
  };

  const normalizeCase = (item, index) => {
    const title = String(item.title || "未命名案例").trim();
    const fallbackSlug = `case-${index + 1}`;
    const slug = String(item.slug || fallbackSlug)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || fallbackSlug;

    return {
      title,
      slug,
      client: String(item.client || "").trim(),
      year: String(item.year || "").trim(),
      services: Array.isArray(item.services) ? item.services.filter(Boolean).map(String) : [],
      summary: String(item.summary || "").trim(),
      cover: imagePath(item.cover),
      challenge: String(item.challenge || "").trim(),
      approach: String(item.approach || "").trim(),
      result: String(item.result || "").trim(),
      gallery: Array.isArray(item.gallery) ? item.gallery.map(imagePath).filter(Boolean) : [],
      featured: item.featured === true,
      published: item.published !== false,
      order: Number.isFinite(Number(item.order)) ? Number(item.order) : 10,
    };
  };

  const sortedCases = () => cases
    .filter((item) => item.published)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return String(b.year).localeCompare(String(a.year));
    });

  const createCard = (item, options = {}) => {
    const card = document.createElement("a");
    card.className = "case-card";
    card.href = `work.html#${encodeURIComponent(item.slug)}`;
    card.setAttribute("aria-label", `查看案例：${item.title}`);

    const media = document.createElement("div");
    media.className = "case-card-media";
    if (item.cover) {
      const image = document.createElement("img");
      image.src = item.cover;
      image.alt = item.title;
      image.loading = "lazy";
      image.decoding = "async";
      media.appendChild(image);
    } else {
      media.classList.add("case-card-media--empty");
      const mark = document.createElement("span");
      mark.textContent = "牧之安";
      media.appendChild(mark);
    }

    const body = document.createElement("div");
    body.className = "case-card-body";

    const meta = document.createElement("div");
    meta.className = "case-card-meta";
    const metaLeft = document.createElement("span");
    metaLeft.textContent = [item.client, item.year].filter(Boolean).join(" / ") || "MUZHIAN";
    const metaRight = document.createElement("span");
    metaRight.textContent = "CASE";
    meta.append(metaLeft, metaRight);

    const title = document.createElement("h3");
    title.textContent = item.title;

    const summary = document.createElement("p");
    summary.textContent = item.summary || "查看项目详情";

    const arrow = document.createElement("span");
    arrow.className = "case-card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    body.append(meta, title, summary, arrow);
    card.append(media, body);

    if (options.modal) {
      card.addEventListener("click", (event) => {
        event.preventDefault();
        openCase(item);
      });
    }

    return card;
  };

  const renderHome = () => {
    if (!featuredRoot || !homeSection) return;
    const selected = sortedCases().filter((item) => item.featured).slice(0, 3);
    if (!selected.length) {
      homeSection.hidden = true;
      return;
    }
    featuredRoot.replaceChildren(...selected.map((item) => createCard(item)));
    homeSection.hidden = false;
  };

  const renderWork = (status = "ok") => {
    if (!listRoot) return;
    const visible = sortedCases();
    listRoot.replaceChildren(...visible.map((item) => createCard(item, { modal: true })));

    if (countNode) {
      countNode.textContent = visible.length ? `${String(visible.length).padStart(2, "0")} PROJECTS` : "";
    }

    if (emptyState) {
      emptyState.hidden = visible.length > 0 || status === "loading";
      if (status === "error") {
        const heading = emptyState.querySelector("h2");
        const copy = emptyState.querySelector("p:not(.eyebrow)");
        if (heading) heading.textContent = "案例暂时没有加载出来。";
        if (copy) copy.textContent = "请刷新页面重试。如果问题持续出现，欢迎直接写信联系我们。";
      }
    }

    if (location.hash.length > 1) {
      const slug = decodeURIComponent(location.hash.slice(1));
      const item = bySlug.get(slug);
      if (item) openCase(item, false);
    }
  };

  const openCase = (item, updateHash = true) => {
    if (!dialog || !dialogBody) return;

    dialogBody.replaceChildren();

    const header = document.createElement("header");
    header.className = "case-dialog-header";
    const kicker = document.createElement("p");
    kicker.className = "eyebrow";
    kicker.textContent = [item.client, item.year].filter(Boolean).join(" / ") || "MUZHIAN PROJECT";
    const title = document.createElement("h2");
    title.id = "case-dialog-title";
    title.textContent = item.title;
    header.append(kicker, title);
    if (item.services.length) {
      const services = document.createElement("p");
      services.className = "case-dialog-services";
      services.textContent = item.services.join(" · ");
      header.appendChild(services);
    }
    dialogBody.appendChild(header);

    if (item.cover) {
      const cover = document.createElement("figure");
      cover.className = "case-dialog-cover";
      const image = document.createElement("img");
      image.src = item.cover;
      image.alt = item.title;
      cover.appendChild(image);
      dialogBody.appendChild(cover);
    }

    if (item.summary) {
      textBlock(dialogBody, "case-dialog-summary", item.summary);
    }

    sectionBlock(dialogBody, "项目背景", item.challenge);
    sectionBlock(dialogBody, "我们做了什么", item.approach);
    sectionBlock(dialogBody, "项目结果", item.result);

    if (item.gallery.length) {
      const gallery = document.createElement("div");
      gallery.className = "case-dialog-gallery";
      item.gallery.forEach((src, index) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${item.title} 项目图片 ${index + 1}`;
        image.loading = "lazy";
        figure.appendChild(image);
        gallery.appendChild(figure);
      });
      dialogBody.appendChild(gallery);
    }

    if (updateHash) {
      history.replaceState(null, "", `#${encodeURIComponent(item.slug)}`);
    }

    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add("dialog-open");
    }
    dialog.scrollTop = 0;
  };

  const closeCase = () => {
    if (!dialog) return;
    dialog.close();
    document.body.classList.remove("dialog-open");
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  };

  if (dialog) {
    dialog.querySelector(".case-dialog-close")?.addEventListener("click", closeCase);
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeCase();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog?.open) closeCase();
  });

  fetch("/content/cases.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load cases");
      return response.json();
    })
    .then((data) => {
      const raw = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
      cases = raw.map(normalizeCase);
      cases.forEach((item) => bySlug.set(item.slug, item));
      renderHome();
      renderWork();
    })
    .catch(() => {
      if (homeSection) homeSection.hidden = true;
      renderWork("error");
    });
})();
