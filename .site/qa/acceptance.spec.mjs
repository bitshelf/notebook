import { test, expect } from "@playwright/test";
const phone = (project) => project.name.startsWith("phone");
async function open(page, path) {
  await page.goto(path);
  await expect(page.locator("#bs-quickbar")).toBeVisible();
}
async function themeButton(page, info) {
  if (phone(info.project)) await page.locator(".bs-mobile-menu").click();
  return page
    .getByRole("button", { name: "切换明暗主题", exact: true })
    .filter({ visible: true });
}
test("reading spacing, hidden footer, table borders and resizable columns", async ({
  page,
}, info) => {
  await open(page, "home");
  await expect(page.locator(".page-title")).toHaveCount(0);
  await expect(page.locator(".bs-mobile-brand")).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize().width);
  await expect(page.locator("footer")).toBeHidden();
  if (phone(info.project)) {
    const bar = await page.locator("#bs-quickbar").boundingBox();
    const crumbs = await page.locator(".breadcrumb-container").boundingBox();
    expect(crumbs.y - bar.y - bar.height).toBeLessThanOrEqual(24);
    await expect(page.locator("#bs-quickbar .bs-theme-toggle")).toBeHidden();
  }
  const tables = page.locator("table.bs-resizable-table");
  await expect(tables).toHaveCount(3);
  for (const table of await tables.all()) {
    const border = await table
      .locator("tbody td")
      .first()
      .evaluate((e) => ({
        width: parseFloat(getComputedStyle(e).borderRightWidth),
        style: getComputedStyle(e).borderRightStyle,
      }));
    expect(border.width).toBeGreaterThanOrEqual(1);
    expect(border.style).toBe("solid");
  }
  const handle = tables.first().locator(".bs-column-resizer").first();
  const cell = tables.first().locator("th").first();
  const old = (await cell.boundingBox()).width;
  await handle.press("ArrowRight");
  expect((await cell.boundingBox()).width).toBeGreaterThan(old);
  const area = await handle.boundingBox();
  const start = (await cell.boundingBox()).width;
  await page.mouse.move(area.x + area.width / 2, area.y + area.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    area.x + area.width / 2 + 40,
    area.y + area.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  expect((await cell.boundingBox()).width).toBeGreaterThan(start + 25);
});
test("phone directory, right outline, graph and repeated theme changes", async ({
  page,
}, info) => {
  await open(page, "home");
  if (phone(info.project)) {
    await page.locator(".bs-mobile-menu").click();
    await expect(page.locator(".sidebar.left .explorer-content")).toBeVisible();
    await page.locator(".bs-mobile-menu").click();
    await expect(page.locator(".sidebar.left .explorer-content")).toBeHidden();
    await page.locator("#bs-sidebar-right-toggle").click();
    await expect(page.locator(".sidebar.right .graph-outer")).toBeVisible();
    await page.locator("#bs-sidebar-right-toggle").click();
  }
  if (phone(info.project)) {
    await expect(page.locator("#bs-quickbar .bs-theme-toggle")).toBeHidden();
  } else {
    // 桌面端主题切换固定在左侧栏右缘，侧栏展开时直接可见。
    await expect(
      page.locator(".sidebar.left > .bs-theme-toggle"),
    ).toBeVisible();
  }
  const toggle = await themeButton(page, info);
  await expect(toggle).toBeVisible();
  if (phone(info.project)) {
    const menu = await page.locator("#bs-quickbar .bs-mobile-menu").boundingBox();
    const theme = await page
      .locator("#bs-quickbar .bs-theme-toggle")
      .boundingBox();
    const drawer = page.locator(".sidebar.left .explorer-content");
    const drawerBounds = await drawer.boundingBox();
    expect(theme.y).toBe(menu.y);
    expect(theme.x + theme.width).toBeCloseTo(drawerBounds.x + drawerBounds.width, 0);
    await expect(drawer).toHaveCSS("overflow-y", "hidden");
    await expect(drawer.locator(".explorer-ul")).toHaveCSS("overflow-y", "auto");
    await expect(drawer.getByText("外观", { exact: true })).toHaveCount(0);
  }
  for (let i = 0; i < 3; i++) {
    const before = await page.locator("html").getAttribute("saved-theme");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute(
      "saved-theme",
      before === "dark" ? "light" : "dark",
    );
    await expect(toggle.locator("svg:visible")).toHaveCount(1);
  }
  if (phone(info.project)) {
    await expect(page.locator(".sidebar.left .explorer-content")).toBeVisible();
  } else {
    await expect(page.locator(".sidebar.left .bs-theme-toggle")).toBeVisible();
    // 隐藏目录后主题切换随侧栏一起消失，再次展开重新出现。
    await page.locator(".sidebar.left .bs-sidebar-hide").click();
    await expect(page.locator(".bs-theme-toggle")).toBeHidden();
    await page.locator("#bs-sidebar-toggle").click();
    const drawer = await page.locator(".sidebar.left").boundingBox();
    const button = await toggle.boundingBox();
    expect(button.x - drawer.x - drawer.width).toBeCloseTo(8, 0);
    await toggle.click();
    await page.locator("#bs-sidebar-toggle").click();
    await expect(page.locator(".sidebar.left > .bs-theme-toggle")).toBeHidden();
  }
});
test("search input, IME completion, full results and SPA return", async ({
  page,
}) => {
  await open(page, "home");
  await page.locator(".bs-quickbar-search").click();
  const input = page.getByRole("textbox", { name: "搜索笔记", exact: true });
  await expect(input).toBeFocused();
  const panel = page.locator(".bs-search-layer .search-space");
  await expect(panel).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(panel).toHaveCSS("border-top-width", "1px");
  await expect(page.locator(".bs-search-layer .search-container")).toHaveCSS("backdrop-filter", "none");
  const usable = await input.evaluate((e) => {
    const r = e.getBoundingClientRect();
    return document.elementFromPoint(r.x + 20, r.y + r.height / 2) === e;
  });
  expect(usable).toBe(true);
  await input.evaluate((element) => {
    element.dispatchEvent(
      new CompositionEvent("compositionstart", { bubbles: true }),
    );
    element.value = "屏";
    element.dispatchEvent(
      new InputEvent("input", { bubbles: true, isComposing: true, data: "屏" }),
    );
  });
  await expect(page.locator(".result-card")).toHaveCount(0);
  await input.evaluate((element) => {
    element.value = "屏幕";
    element.dispatchEvent(
      new CompositionEvent("compositionend", { bubbles: true, data: "屏幕" }),
    );
  });
  await expect(page.locator(".bs-search-count")).toHaveText(
    /显示 [1-9]\d* \/ [1-9]\d* 条/,
  );
  await page.locator(".result-card").first().click();
  await expect(page.locator(".bs-search-layer .search-container")).toBeHidden();
  await page.locator(".bs-quickbar-search").click();
  await page
    .getByRole("textbox", { name: "搜索笔记", exact: true })
    .fill("linux");
  await expect(page.locator(".bs-search-count")).toHaveText(
    /显示 [1-9]\d* \/ [1-9]\d* 条/,
  );
  const total = Number(
    (await page.locator(".bs-search-count").textContent()).match(/\/ (\d+)/)[1],
  );
  if (total > 50) {
    await page
      .locator(".results-container")
      .evaluate((e) => (e.scrollTop = e.scrollHeight));
    await expect(page.locator(".bs-search-count")).toContainText(
      `${Math.min(100, total)} / ${total}`,
    );
  }
});
test("folder entries have distinct kinds, no duplicates and compact dates", async ({
  page,
}) => {
  await open(page, "allwinner/");
  await expect(page.locator(".page-listing")).toHaveCount(1);
  expect(
    await page.locator('[data-entry-kind="folder"]').count(),
  ).toBeGreaterThan(0);
  expect(
    await page.locator('[data-entry-kind="note"]').count(),
  ).toBeGreaterThan(0);
  await expect(page.locator(".page-listing time").first()).toHaveText(
    /\d{4}-\d{2}-\d{2}/,
  );
  await open(page, "areas/usb/");
  expect(await page.locator(".page-listing .tags .tag-link").count()).toBeGreaterThan(0);
  await expect(page.locator(".page-listing .tags:visible")).toHaveCount(0);
});
test("callout log stays complete, without empty code or stray paragraph", async ({
  page,
}) => {
  await open(page, "allwinner/编译/编译报错");
  const pre = page.locator("article pre");
  await expect(pre).toHaveCount(1);
  await expect(pre).toContainText("update:unable to open sboot file");
  await expect(pre).toContainText("Build android failed!");
  expect((await pre.boundingBox()).height).toBeGreaterThan(200);
});
test("Excalidraw viewport, icon-only back, zoom and search", async ({
  page,
}, info) => {
  await open(page, "areas/media/drm/drm代码调用.excalidraw");
  const svg = page.locator(".excalidraw-container > svg");
  await expect(svg).toBeVisible();
  const rect = await page.locator(".excalidraw-container").boundingBox();
  expect(rect.width).toBeGreaterThan(page.viewportSize().width * 0.8);
  await expect(page.locator("#bs-back-btn")).toHaveText("");
  if (!phone(info.project)) {
    const back = await page.locator("#bs-back-btn").boundingBox();
    const menu = await page.locator(".excalidraw-sidebar-toggle").boundingBox();
    expect(back.height).toBe(menu.height);
    expect(back.y).toBe(menu.y);
  }

  await page.locator(".excalidraw-zoom-in").click();
  await expect(svg).toHaveAttribute("style", /scale\(1\.15\)/);
  await page.locator(".excalidraw-reset").click();
  await expect(svg).toHaveAttribute("style", /scale\(1\)/);
  await page.locator(".bs-quickbar-search").click();
  await page
    .getByRole("textbox", { name: "搜索笔记", exact: true })
    .fill("屏幕");
  await expect(page.locator(".bs-search-count")).toHaveText(
    /显示 [1-9]\d* \/ [1-9]\d* 条/,
  );
});
test("Canvas fits viewport, zoom controls do not overlap tools", async ({
  page,
}) => {
  await open(page, "linux/linux-api/定时器-api.canvas");
  await expect(page.locator("#bs-back-btn")).toHaveText("");
  await expect(page.locator(".canvas-node").first()).toBeVisible();
  const stage = await page.locator(".canvas-stage").boundingBox();
  expect(stage.width).toBeGreaterThan(page.viewportSize().width * 0.8);
  const controls = await page.locator(".canvas-controls").boundingBox();
  const tools = await page.locator("#bs-quickbar").boundingBox();
  expect(controls.y).toBeGreaterThanOrEqual(tools.y + tools.height);
  await page.locator(".canvas-controls button").first().click();
});
test("Mermaid via Pele renders and zooms", async ({ page }) => {
  await open(page, "areas/网络通信/移动通信/4g-休眠唤醒");
  const figure = page.locator(".bs-diagram").first();
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.locator("svg.pele")).toBeVisible();
  await figure.getByRole("button", { name: "放大图表", exact: true }).click();
  await figure.getByRole("button", { name: "还原图表", exact: true }).click();
  await figure.locator("summary").click();
  await expect(figure.locator("details pre")).toBeVisible();
});

test("sidebar file lookup excludes body text; top search includes it", async ({
  page,
}, info) => {
  await open(page, "home");
  if (phone(info.project))
    test.skip(true, "Desktop sidebar has the file lookup launcher");
  await page.getByRole("button", { name: "查找文件", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveAttribute(
    "aria-label",
    "查找文件（不搜索正文）",
  );
  const input = page.getByRole("textbox", { name: "搜索笔记", exact: true });
  await expect(page.locator(".bs-search-layer .search-layout")).toBeHidden();
  await input.fill("编译报错");
  await expect(page.locator(".result-card").first()).toBeVisible();
  expect(
    (await page.locator(".card-title").allTextContents()).every((title) =>
      title.includes("编译报错"),
    ),
  ).toBe(true);
  await input.fill("update_mbr");
  await expect(page.locator(".bs-search-count")).toContainText("没有找到结果");
  await page.getByRole("button", { name: "关闭搜索", exact: true }).click();
  await page.locator(".bs-quickbar-search").click();
  await input.fill("update_mbr");
  await expect(
    page.locator(".result-card").filter({ hasText: "编译报错" }).first(),
  ).toBeVisible();
});
test("outline and graph collapse independently and sidebar entry sits at right edge", async ({
  page,
}, info) => {
  await open(page, "allwinner/全志pinctrl系统");
  if (phone(info.project))
    await page.locator("#bs-sidebar-right-toggle").click();
  const graph = page.locator(".sidebar.right .graph");
  const toc = page.locator(".sidebar.right .toc-header");
  const outline = page.locator(".sidebar.right .toc-content");
  const expandedY = (await toc.boundingBox()).y;
  await graph.locator(".bs-graph-toggle").click();
  await expect(graph.locator(".graph-outer")).toBeHidden();
  expect((await toc.boundingBox()).y).toBeLessThan(expandedY - 100);
  const graphArrow = await graph.locator(".bs-graph-toggle svg").boundingBox();
  const tocArrow = await toc.locator(".fold").boundingBox();
  expect(
    Math.abs(graphArrow.x + graphArrow.width / 2 - tocArrow.x - tocArrow.width / 2),
  ).toBeLessThanOrEqual(1);
  await graph.locator(".bs-graph-toggle").click();
  await expect(graph.locator(".graph-outer")).toBeVisible();
  if ((await toc.getAttribute("aria-expanded")) === "false") await toc.click();
  await expect(outline).toBeVisible();
  const outlineHeight = (await outline.boundingBox()).height;
  await toc.click();
  await expect(toc).toHaveAttribute("aria-expanded", "false");
  await expect(outline).toBeHidden();
  const foldedToc = await toc.locator("..").boundingBox();
  expect(foldedToc.height).toBeGreaterThanOrEqual((await toc.boundingBox()).height);
  await toc.click();
  await expect(toc).toHaveAttribute("aria-expanded", "true");
  await expect(outline).toBeVisible();
  expect((await outline.boundingBox()).height).toBeGreaterThanOrEqual(
    outlineHeight,
  );
  if (!phone(info.project)) {
    const search = page.locator(".bs-quickbar-search");
    const hide = page.locator(".bs-sidebar-hide-right");
    const expectAligned = async (button, nextToSidebar) => {
      const searchBox = await search.boundingBox();
      const box = await button.boundingBox();
      expect(box.y).toBe(searchBox.y);
      expect(box.height).toBe(searchBox.height);
      await expect(button).toHaveCSS("border-radius", "8px");
      const right = nextToSidebar
        ? (await page.locator(".sidebar.right").boundingBox()).x
        : box.x;
      expect(right - searchBox.x - searchBox.width).toBeCloseTo(8, 0);
    };
    await expectAligned(hide, true);
    await hide.click();
    const show = page.locator("#bs-sidebar-right-toggle");
    await expectAligned(show, false);
    const rect = await show.boundingBox();
    expect(page.viewportSize().width - rect.x - rect.width).toBeLessThanOrEqual(
      16,
    );
    await show.click();
    await expectAligned(show, true);
    await expect(toc).toBeVisible();
  }
});

test("SWUpdate outline remains available in a narrow right drawer", async ({
  page,
}, info) => {
  if (!phone(info.project)) await page.setViewportSize({ width: 892, height: 704 });
  await page.addInitScript(() => localStorage.setItem("bs-sidebar-right-collapsed", "1"));
  await open(page, "allwinner/t527/buildroot-swupdate");
  await page.locator("#bs-sidebar-right-toggle").click();
  const sidebar = page.locator(".sidebar.right");
  await expect(sidebar.locator(".graph")).toBeVisible();
  await expect(sidebar.locator(".toc-header")).toBeVisible();
  const links = sidebar.locator(".toc-content a");
  await expect(links).toHaveText(["OTA", "实现方式", "优点和缺点", "Link"]);
  await sidebar.getByRole("link", { name: "优点和缺点", exact: true }).click();
  await expect(page).toHaveURL((url) => decodeURIComponent(url.hash) === "#优点和缺点");
  await expect(sidebar).toBeHidden();
});

test("directory opens nested folders and navigates to the selected note", async ({
  page,
}, info) => {
  await open(page, "home");
  if (phone(info.project)) await page.locator(".bs-mobile-menu").tap();
  const act = async (locator) =>
    phone(info.project) ? locator.tap() : locator.click();
  await act(
    page.locator(
      '.folder-container[data-folderpath="allwinner/index"] .folder-icon',
    ),
  );
  await act(
    page.locator(
      '.folder-container[data-folderpath="allwinner/编译/index"] .folder-icon',
    ),
  );
  await act(
    page
      .locator(".sidebar.left .explorer-content a")
      .filter({ hasText: "编译报错" })
      .first(),
  );
  await expect(page.locator("h1.article-title")).toHaveText("编译报错");
  expect(decodeURIComponent(page.url())).toContain("/allwinner/编译/编译报错");
  if (phone(info.project))
    await expect(page.locator(".sidebar.left .explorer-content")).toBeHidden();
});

test("breadcrumb Home returns to the site home and its mobile directory opens", async ({
  page,
}, info) => {
  await open(page, "areas/网络通信/wifi/wpa_cli");
  const home = page.locator(".breadcrumb-element a:has(.bs-home-icon)");
  if (phone(info.project)) await home.tap();
  else await home.click();
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator("h1.article-title")).toHaveText("Home");

  if (phone(info.project)) {
    const menu = page.locator(".bs-mobile-menu");
    await menu.tap();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    const drawer = page.locator(".sidebar.left .explorer-content");
    await expect(drawer).toBeVisible();
    await expect(page.locator(".sidebar.left")).toHaveCSS("opacity", "1");
    // A real tap confirms that the open panel receives input above its backdrop.
    const folder = drawer.locator(
      '.folder-container[data-folderpath="allwinner/index"] .folder-icon',
    );
    await folder.tap();
    await expect(
      drawer.locator('.folder-container[data-folderpath="allwinner/编译/index"]'),
    ).toBeVisible();
  }
});

test("GPIO note embeds the referenced section and its drawing", async ({
  page,
}) => {
  await open(page, "allwinner/全志dts-gpio");
  const article = page.locator("article.popover-hint");
  const section = article.locator("blockquote.transclude").first();
  await expect(section.getByRole("heading", { name: "GPIO 设备树信息" })).toBeVisible();
  await expect(section.locator(".excalidraw-page svg").first()).toBeVisible();
  await expect(article.locator('img[alt="GPIO 设备树信息"]')).toHaveCount(0);
});

test("u-boot GPIO renders its relative Excalidraw image as a drawing", async ({ page }) => {
  await open(page, "allwinner/t527/uboot--控制-gpio");
  const article = page.locator("article.popover-hint");
  await expect(article.locator("blockquote.transclude .excalidraw-page svg").first()).toBeVisible();
  await expect(article.locator('img[alt="GPIO 说明"]')).toHaveCount(0);
});

test("high contrast keeps borders, drawer and search panel visible", async ({
  page,
}, info) => {
  await page.emulateMedia({ forcedColors: "active" });
  await open(page, "home");
  const border = await page
    .locator("tbody td")
    .first()
    .evaluate((e) => ({
      width: parseFloat(getComputedStyle(e).borderRightWidth),
      color: getComputedStyle(e).borderRightColor,
    }));
  expect(border.width).toBeGreaterThanOrEqual(1);
  expect(border.color).not.toBe("rgba(0, 0, 0, 0)");
  const toggle = await themeButton(page, info);
  await expect(toggle.locator("svg:visible")).toHaveCount(1);
  if (phone(info.project)) {
    expect(
      await page
        .locator(".sidebar.left .explorer-content")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
    ).not.toBe("rgba(0, 0, 0, 0)");
  }
  await page.locator(".bs-quickbar-search").click();
  const panel = page.locator(".bs-search-layer .search-space");
  await expect(panel).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(panel).toHaveCSS("border-top-width", "1px");
  await page.getByRole("button", { name: "关闭搜索" }).click();
  await expect(panel).toBeHidden();
});

test("drawing sidebar theme and back navigation work in both readers", async ({
  page,
}) => {
  for (const [path, selector] of [
    ["areas/media/drm/drm代码调用.excalidraw", ".excalidraw-sidebar-toggle"],
    ["linux/linux-api/定时器-api.canvas", ".canvas-sidebar-toggle"],
  ]) {
    await open(page, path);
    const back = page.getByRole("button", { name: "返回", exact: true });
    await expect(back).toBeVisible();
    await expect(page.locator(".bs-theme-toggle")).toBeHidden();
    await page.locator(selector).click();
    await expect(back).toBeHidden();
    const tools = page.locator(".bs-drawing-sidebar-tools");
    const fileSearch = tools.getByRole("button", { name: "查找文件" });
    await expect(fileSearch).toBeVisible();
    await fileSearch.click();
    await expect(page.locator(".bs-search-layer .search-layout")).toBeHidden();
    await page.getByRole("button", { name: "关闭搜索" }).click();
    const toggle = tools
      .getByRole("button", { name: "切换明暗主题", exact: true })
      .filter({ visible: true });
    await expect(toggle).toBeVisible();
    const themeBounds = await toggle.boundingBox();
    const searchBounds = await fileSearch.boundingBox();
    expect(themeBounds.y + themeBounds.height / 2).toBeCloseTo(searchBounds.y + searchBounds.height / 2, 0);
    const before = await page.locator("html").getAttribute("saved-theme");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute(
      "saved-theme",
      before === "dark" ? "light" : "dark",
    );
    await page.locator(selector).click();
    await expect(back).toBeVisible();
    await back.click();
    await expect(page).toHaveURL(/\/home$/);
  }
});
