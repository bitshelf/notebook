(() => {
  let enginePromise;
  let filesPromise;
  let cleanup = () => {};
  let boundRoot;
  let boundLayer;
  const engine = () => {
    const base = document.body.dataset.basepath || "";
    return (enginePromise ||= import(base + "/pagefind/pagefind.js")
      .then(async (module) => {
        await module.options({ baseUrl: base + "/" });
        await module.init();
        return module;
      })
      .catch((error) => {
        enginePromise = undefined;
        throw error;
      }));
  };
  const init = () => {
    const root = document.querySelector(".search:not(.bs-search-layer)");
    // SPA navigation can retain the root while replacing its children/body layer.
    if (
      root === boundRoot &&
      boundLayer?.isConnected &&
      !root.querySelector(".search-container")
    )
      return;
    cleanup();
    if (!root) return;
    boundRoot = root;
    const container = root.querySelector(".search-container");
    const trigger = root.querySelector(".search-button");
    const input = root.querySelector(".search-bar");
    const space = root.querySelector(".search-space");
    const layout = root.querySelector(".search-layout");
    // The modal stays usable even when either responsive sidebar is hidden.
    const layer = document.createElement("div");
    layer.className = "bs-search-layer";
    boundLayer = layer;
    layer.append(container);
    document.body.append(layer);
    const events = new AbortController();
    const on = (target, event, handler) =>
      target.addEventListener(event, handler, { signal: events.signal });
    let request = 0,
      results = [],
      shown = 0,
      focused = -1,
      previewRequest;
    let opener;
    let mode = "all";
    trigger.setAttribute("aria-label", "查找文件");
    const launcherText = trigger.querySelector("p");
    if (launcherText) launcherText.textContent = "查找文件";
    layout.replaceChildren();
    const list = document.createElement("div");
    list.className = "results-container";
    list.setAttribute("aria-label", "搜索结果");
    const preview = document.createElement("div");
    preview.className = "preview-container";
    layout.append(list, preview);
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "bs-search-close";
    closeButton.setAttribute("aria-label", "关闭搜索");
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    const icon = document.createElement("span");
    icon.className = "bs-search-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>';
    space.querySelector(".bs-search-icon")?.remove();
    space.querySelector(".bs-search-close")?.remove();
    space.append(icon, closeButton);
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    container.setAttribute("aria-label", "搜索笔记");
    input.placeholder = "搜索标题、正文、标签或路径…";
    input.setAttribute("aria-label", "搜索笔记");
    const status = document.createElement("p");
    status.className = "bs-search-count";
    status.setAttribute("role", "status");
    const showStatus = (text) => {
      status.textContent = text;
      list.prepend(status);
    };
    const close = () => {
      container.classList.remove("active");
      document.body.classList.remove("bs-search-open");
      trigger.setAttribute("aria-expanded", "false");
      request++;
      previewRequest?.abort();
      input.value = "";
      list.replaceChildren();
      preview.replaceChildren();
      layout.classList.remove("display-results");
      (opener?.isConnected ? opener : trigger).focus();
    };
    const open = (kind = "all") => {
      mode = kind;
      input.placeholder = mode === "files" ? "输入文件名，显示匹配的文件…" : "搜索标题、正文、标签或路径…";
      container.setAttribute("aria-label", mode === "files" ? "查找文件（不搜索正文）" : "搜索笔记");
      opener = document.activeElement;
      container.classList.add("active");
      document.body.classList.add("bs-search-open");
      trigger.setAttribute("aria-expanded", "true");
      input.focus();
      if (mode === "all") engine().catch(() => showStatus("搜索加载失败，请检查网络后重试。"));
    };
    const cards = () => [...list.querySelectorAll("a.result-card")];
    const focus = async (position) => {
      const all = cards();
      focused = Math.max(0, Math.min(position, all.length - 1));
      all.forEach((card, i) => card.classList.toggle("focus", i === focused));
      const card = all[focused];
      if (!card) return;
      card.scrollIntoView({ block: "nearest" });
      if (!matchMedia("(min-width: 800px)").matches) return;
      previewRequest?.abort();
      previewRequest = new AbortController();
      const signal = previewRequest.signal;
      try {
        const response = await fetch(card.href, { signal });
        if (!response.ok) return;
        const html = new DOMParser().parseFromString(
          await response.text(),
          "text/html",
        );
        if (signal.aborted) return;
        const article = html.querySelector("article");
        if (article) {
          for (const el of article.querySelectorAll("[href], [src]")) {
            for (const attr of ["href", "src"]) {
              const value = el.getAttribute(attr);
              if (value) el.setAttribute(attr, new URL(value, card.href).href);
            }
          }
          preview.replaceChildren(article);
          preview.scrollTop = 0;
        }
      } catch (error) {
        if (error.name !== "AbortError") preview.replaceChildren();
      }
    };
    const appendBatch = async (token) => {
      const next = await Promise.all(
        results.slice(shown, shown + 50).map((result) => result.data()),
      );
      if (token !== request) return;
      list.querySelector(".bs-search-more")?.remove();
      for (const data of next) {
        const card = document.createElement("a");
        card.className = "result-card";
        card.href = data.url;
        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = data.meta.title;
        const path = document.createElement("p");
        path.className = "bs-search-path";
        path.textContent = data.meta.path;
        const excerpt = document.createElement("p");
        excerpt.className = "card-description";
        // Pagefind escapes source HTML and adds only its own <mark> elements.
        excerpt.innerHTML = data.excerpt;
        card.append(title, path, excerpt);
        list.append(card);
      }
      shown += next.length;
      showStatus(
        results.length
          ? `显示 ${shown} / ${results.length} 条`
          : "没有找到结果，请尝试其他关键词。",
      );
      if (shown < results.length) {
        const more = document.createElement("button");
        more.type = "button";
        more.className = "bs-search-more";
        more.textContent = "加载更多结果";
        more.addEventListener(
          "click",
          async () => {
            more.disabled = true;
            try {
              await appendBatch(token);
            } catch {
              more.disabled = false;
              showStatus("加载失败，请重试。");
            }
          },
          { signal: events.signal },
        );
        list.append(more);
      }
    };
    const search = async (event) => {
      if (event.isComposing) return;
      const query = input.value.trim();
      const token = ++request;
      if (!query) {
        list.replaceChildren();
        preview.replaceChildren();
        layout.classList.remove("display-results");
        return;
      }
      layout.classList.add("display-results");
      showStatus("正在搜索…");
      try {
        let found;
        if (mode === "files") {
          const base = document.body.dataset.basepath || "";
          filesPromise ||= fetch(base + "/pagefind/files.json").then(response => {
            if (!response.ok) throw new Error("File index unavailable");
            return response.json();
          }).catch(error => { filesPromise = undefined; throw error; });
          const files = await filesPromise;
          const words = query.normalize("NFKC").toLocaleLowerCase().split(/\s+/);
          found = { results: files.filter(file => words.every(word =>
            (file.title + " " + file.path.split("/").pop()).normalize("NFKC").toLocaleLowerCase().includes(word)
          )).map(file => ({ data: async () => ({ url: base + "/" + file.path.replace(/\/index$/, "/"), meta: {title:file.title,path:file.path},excerpt:"" }) })) };
        } else {
        const pagefind = await engine();
        const tags = query
          .split(/\s+/)
          .filter((term) => term.startsWith("#"))
          .map((term) => term.slice(1))
          .filter(Boolean);
        const text = query
          .split(/\s+/)
          .filter((term) => !term.startsWith("#"))
          .join(" ");
        found = await pagefind.debouncedSearch(
          text || null,
          tags.length ? { filters: { tags } } : {},
          120,
        );
        }
        if (!found || token !== request) return;
        results = found.results;
        shown = 0;
        focused = -1;
        list.replaceChildren();
        preview.replaceChildren();
        await appendBatch(token);
        if (token === request) await focus(0);
      } catch (error) {
        if (token === request) {
          list.replaceChildren();
          showStatus("搜索暂时不可用，请稍后重试。");
        }
        console.warn("[site-search]", error);
      }
    };
    on(list, "scroll", () => {
      const more = list.querySelector(".bs-search-more");
      if (more && !more.disabled && list.scrollHeight - list.scrollTop - list.clientHeight < 240)
        more.click();
    });
    on(trigger, "click", () => open("files"));
    on(document, "bs-search-open", () => open("all"));
    on(closeButton, "click", close);
    on(input, "input", search);
    on(input, "compositionend", search);
    on(container, "click", (event) => {
      if (event.target === container) close();
    });
    on(list, "click", (event) => {
      if (event.target.closest("a.result-card")) close();
    });
    on(list, "mouseover", (event) => {
      const card = event.target.closest("a.result-card");
      if (card && cards().indexOf(card) !== focused)
        focus(cards().indexOf(card));
    });
    on(document, "keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        container.classList.contains("active") ? close() : open();
      }
      if (!container.classList.contains("active")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.isComposing) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        focus(focused + (event.key === "ArrowDown" ? 1 : -1));
      }
      if (event.key === "Enter" && document.activeElement === input) {
        event.preventDefault();
        cards()[focused]?.click();
      }
      if (event.key === "Tab") {
        const controls = [
          input,
          ...cards(),
          list.querySelector(".bs-search-more"),
          closeButton,
        ].filter(Boolean);
        const pos = controls.indexOf(document.activeElement);
        event.preventDefault();
        controls[
          (pos + (event.shiftKey ? -1 : 1) + controls.length) % controls.length
        ].focus();
      }
    });
    cleanup = () => {
      request++;
      events.abort();
      previewRequest?.abort();
      document.body.classList.remove("bs-search-open");
      layer.remove();
    };
  };
  document.addEventListener("nav", init);
  document.addEventListener("render", init);
})();
