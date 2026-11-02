(function () {
  const { author, course, theme, posts } = window.SITE;
  const page = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  const slug = (post) => post.href.replace(/\.html$/, "");
  const current = posts.findIndex((post) => slug(post) === page);

  const el = (tag, props = {}, ...children) => {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
  };

  function renderHeader() {
    const list = el("ul", { className: "nav-list", id: "nav-list" });
    const links = [...posts, { href: "references.html", title: "References" }];
    links.forEach((post) => {
      const link = el("a", { href: post.href, textContent: post.title });
      if (slug(post) === page) link.setAttribute("aria-current", "page");
      list.append(el("li", {}, link));
    });

    const toggle = el("button", { className: "nav-toggle", type: "button", textContent: "Menu" });
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "nav-list");
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    const brand = el("a", { className: "brand", href: "index.html", textContent: author });
    const nav = el("nav", { className: "nav" }, brand, toggle, list);
    nav.setAttribute("aria-label", "Posts");
    document.getElementById("site-header").append(nav);
  }

  function renderPostHeading() {
    if (current < 0) return;
    const post = posts[current];
    document.title = `${post.title} · ${author}`;
    document.querySelectorAll("[data-post-title]").forEach((node) => (node.textContent = post.title));
    document.querySelectorAll("[data-post-ages]").forEach((node) => (node.textContent = post.ages));
    const storyCount = posts.length - 2;
    const label = current === 0 ? "Introduction" : current === posts.length - 1 ? "Conclusion" : `Story ${current} of ${storyCount}`;
    document.querySelectorAll("[data-post-number]").forEach((node) => (node.textContent = label));
  }

  function renderTheme() {
    document.querySelectorAll("[data-theme-name]").forEach((node) => {
      node.textContent = theme || "your guiding theme";
      node.classList.toggle("theme-missing", !theme);
    });
  }

  function renderRoadmap() {
    const roadmap = document.getElementById("roadmap");
    if (!roadmap) return;
    posts.slice(1, -1).forEach((post) => {
      const link = el("a", { href: post.href },
        el("span", { className: "road-ages", textContent: post.ages }),
        el("span", { className: "road-title", textContent: post.title }));
      roadmap.append(el("li", {}, link));
    });
  }

  function renderPager() {
    const pager = document.getElementById("pager");
    if (!pager || current < 0) return;
    const prev = posts[current - 1];
    const next = posts[current + 1];
    if (prev) pager.append(el("a", { className: "prev", href: prev.href }, el("small", { textContent: "Previous" }), prev.title));
    if (next) pager.append(el("a", { className: "next", href: next.href }, el("small", { textContent: "Next" }), next.title));
  }

  function renderFooter() {
    document.getElementById("site-footer").append(el("p", { textContent: `${author} · ${course}` }));
  }

  // Shows how much is left on this page. Disappears once every slot is replaced.
  function renderDraftNotice() {
    const slots = document.querySelectorAll(".todo");
    const themeMissing = document.querySelector(".theme-missing") ? 1 : 0;
    const count = slots.length + themeMissing;
    if (!count) return;
    const label = `Draft: ${count} ${count === 1 ? "item" : "items"} left to fill in on this page`;
    const notice = el("div", { className: "draft-notice" }, el("span", { textContent: label }));
    notice.setAttribute("role", "status");
    if (slots.length) {
      slots[0].id = slots[0].id || "next-todo";
      notice.append(el("a", { href: `#${slots[0].id}`, textContent: "Jump to the next one" }));
    } else {
      notice.append(el("span", { textContent: "Set your theme in site-config.js" }));
    }
    document.body.prepend(notice);
  }

  function enableLightbox() {
    const image = el("img", { alt: "" });
    const caption = el("p");
    const close = el("button", { type: "button", className: "lightbox-close", textContent: "Close" });
    const dialog = el("dialog", { className: "lightbox" }, close, image, caption);
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    document.body.append(dialog);

    document.querySelectorAll("figure img").forEach((photo) => {
      photo.tabIndex = 0;
      const open = () => {
        image.src = photo.src;
        image.alt = photo.alt;
        caption.textContent = photo.closest("figure").querySelector("figcaption")?.textContent || "";
        dialog.showModal();
      };
      photo.addEventListener("click", open);
      photo.addEventListener("keydown", (event) => {
        if (event.key === "Enter") open();
      });
    });
  }

  renderHeader();
  renderPostHeading();
  renderTheme();
  renderRoadmap();
  renderPager();
  renderFooter();
  renderDraftNotice();
  enableLightbox();
})();
