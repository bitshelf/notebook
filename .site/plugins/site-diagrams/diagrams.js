(() => {
  let library;
  const mounted = new Set();
  const load = () =>
    (library ||= import(
      (document.body.dataset.basepath || "") + "/static/pele.js"
    ).catch((error) => {
      library = undefined;
      throw error;
    }));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const { canvas, source, details } = entry.target.bsDiagram;
        load()
          .then(({ mount }) => {
            if (!canvas.isConnected) return;
            const diagram = mount(canvas, source, {
              zoom: {
                always: true,
                labels: {
                  zoomIn: "放大图表",
                  zoomOut: "缩小图表",
                  reset: "还原图表",
                },
              },
              onError: () => {
                details.open = true;
              },
            });
            mounted.add(diagram);
          })
          .catch(() => {
            canvas.textContent = "图表加载失败，可展开源码查看。";
            details.open = true;
          });
      }
    },
    { rootMargin: "300px" },
  );
  const init = () => {
    for (const code of document.querySelectorAll(
      "article pre > code:is(.language-mermaid, [data-language=mermaid]):not([data-bs-diagram])",
    )) {
      code.dataset.bsDiagram = "1";
      const source = code.textContent;
      const pre = code.parentElement;
      const figure = document.createElement("figure");
      figure.className = "bs-diagram";
      const canvas = document.createElement("div");
      canvas.className = "bs-diagram-canvas";
      canvas.setAttribute("aria-label", "Mermaid 图表");
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "查看图表源码";
      pre.before(figure);
      details.append(summary, pre);
      figure.append(canvas, details);
      figure.bsDiagram = { canvas, source, details };
      observer.observe(figure);
    }
  };
  document.addEventListener("nav", init);
  document.addEventListener("render", init);
  document.addEventListener("prenav", () => {
    observer.disconnect();
    for (const diagram of mounted) diagram.destroy();
    mounted.clear();
  });
})();
