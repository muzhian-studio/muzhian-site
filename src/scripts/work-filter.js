(() => {
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const projects = Array.from(document.querySelectorAll("[data-project]"));
  const grid = document.querySelector("#work-grid");
  const count = document.querySelector("#work-count");
  const empty = document.querySelector("#work-filter-empty");
  if (!buttons.length || !projects.length) return;

  const apply = (filter) => {
    let visible = 0;
    projects.forEach((project) => {
      const show = filter === "全部" || project.getAttribute("data-category") === filter;
      project.hidden = !show;
      if (show) visible += 1;
    });

    if (grid) grid.hidden = visible === 0;
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${String(visible).padStart(2, "0")} PROJECTS`;
    buttons.forEach((button) => button.classList.toggle("is-active", button.getAttribute("data-filter") === filter));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.getAttribute("data-filter") || "全部"));
  });
})();
