(() => {
  const initialized = new WeakSet();
  const minWidth = 64;
  let finishDrag = null;
  function initialize() {
    document.querySelectorAll("table.bases-table").forEach((table, ordinal) => {
      if (initialized.has(table)) return;
      const headers = Array.from(
        table.querySelectorAll("thead tr:first-child th"),
      );
      if (headers.length < 2) return;
      initialized.add(table);
      const defaults =
        headers.length === 3
          ? [45, 30, 25]
          : headers.map(() => 100 / headers.length);
      const key =
        "bs-table-widths:v1:" +
        location.pathname +
        ":" +
        ordinal +
        ":" +
        headers.map((h) => h.dataset.column || h.textContent.trim()).join("|");
      let widths = defaults.slice();
      try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (
          Array.isArray(saved) &&
          saved.length === headers.length &&
          saved.every((n) => Number.isFinite(n) && n > 0) &&
          Math.abs(saved.reduce((a, b) => a + b, 0) - 100) < 0.1
        )
          widths = saved;
      } catch {}
      const group = document.createElement("colgroup");
      const columns = headers.map(() =>
        group.appendChild(document.createElement("col")),
      );
      table.prepend(group);
      table.classList.add("bs-resizable-table");
      const apply = () =>
        columns.forEach((column, i) => {
          column.style.width = widths[i] + "%";
        });
      const save = () => {
        try {
          localStorage.setItem(key, JSON.stringify(widths));
        } catch {}
      };
      const reset = () => {
        widths = defaults.slice();
        apply();
        try {
          localStorage.removeItem(key);
        } catch {}
      };
      headers.forEach((header, i) => {
        header.style.removeProperty("width");
        header.style.removeProperty("min-width");
        if (i === headers.length - 1) return;
        const handle = document.createElement("span");
        handle.className = "bs-column-resizer";
        handle.tabIndex = 0;
        handle.role = "separator";
        handle.setAttribute("aria-orientation", "vertical");
        handle.setAttribute(
          "aria-label",
          "调整列宽，左右方向键微调，双击恢复默认",
        );
        handle.title = "拖动调整列宽；双击恢复默认";
        handle.addEventListener("click", (event) => {
          event.stopPropagation();
          event.preventDefault();
        });
        handle.addEventListener("dblclick", (event) => {
          event.stopPropagation();
          event.preventDefault();
          reset();
        });
        handle.addEventListener("keydown", (event) => {
          if (!["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.key === "Home") return reset();
          const pair = widths[i] + widths[i + 1];
          const minimum = Math.min(
            (minWidth / table.getBoundingClientRect().width) * 100,
            pair / 2,
          );
          const value = Math.max(
            minimum,
            Math.min(
              pair - minimum,
              widths[i] +
                (event.key === "ArrowRight" ? 1 : -1) *
                  (event.shiftKey ? 5 : 1),
            ),
          );
          widths[i] = value;
          widths[i + 1] = pair - value;
          apply();
          save();
        });
        handle.addEventListener("pointerdown", (event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          event.stopPropagation();
          if (finishDrag) finishDrag();
          const start = widths.slice(),
            startX = event.clientX;
          const total = table.getBoundingClientRect().width,
            pair = start[i] + start[i + 1];
          const minimum = Math.min((minWidth / total) * 100, pair / 2);
          document.body.classList.add("bs-column-dragging");
          handle.setPointerCapture(event.pointerId);
          const move = (e) => {
            if (e.pointerId !== event.pointerId) return;
            const value = Math.max(
              minimum,
              Math.min(
                pair - minimum,
                start[i] + ((e.clientX - startX) / total) * 100,
              ),
            );
            widths[i] = value;
            widths[i + 1] = pair - value;
            apply();
          };
          const end = (e) => {
            if (e && e.pointerId !== event.pointerId) return;
            if (e?.type === "pointercancel") {
              widths = start;
              apply();
            } else save();
            handle.removeEventListener("pointermove", move);
            handle.removeEventListener("pointerup", end);
            handle.removeEventListener("pointercancel", end);
            handle.removeEventListener("lostpointercapture", end);
            document.body.classList.remove("bs-column-dragging");
            if (handle.hasPointerCapture(event.pointerId))
              handle.releasePointerCapture(event.pointerId);
            finishDrag = null;
          };
          finishDrag = end;
          handle.addEventListener("pointermove", move);
          handle.addEventListener("pointerup", end);
          handle.addEventListener("pointercancel", end);
          handle.addEventListener("lostpointercapture", end);
        });
        header.appendChild(handle);
      });
      apply();
    });
  }
  document.addEventListener("nav", initialize);
  document.addEventListener("render", initialize);
  document.addEventListener("prenav", () => {
    if (finishDrag) finishDrag();
  });
  initialize();
})();
