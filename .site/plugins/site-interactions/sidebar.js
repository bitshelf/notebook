/*bs-sidebar-toggle-v17*/
;function bsSidebarInit() {
  try {
    if (typeof window === "undefined" || typeof document === "undefined") return
    var LEFT_KEY = "bs-sidebar-collapsed"
    var RIGHT_KEY = "bs-sidebar-right-collapsed"
    var GRAPH_KEY = "bs-graph-collapsed"
    var savedLeft = false
    var savedRight = false
    var graphCollapsed = false
    try {
      savedLeft = window.localStorage.getItem(LEFT_KEY) === "1"
    } catch (e) {}
    try {
      savedRight = window.localStorage.getItem(RIGHT_KEY) === "1"
    } catch (e) {}
    try {
      graphCollapsed = window.localStorage.getItem(GRAPH_KEY) === "1"
    } catch (e) {}
    var isDesktop = function () {
      try {
        return window.matchMedia("(min-width: 800px)").matches
      } catch (e) {
        return window.innerWidth >= 800
      }
    }
    var store = function (key, v) {
      try {
        window.localStorage.setItem(key, v ? "1" : "0")
      } catch (e) {}
    }
    var hasLeft = function () {
      return !!document.querySelector(".sidebar.left")
    }
    var hasRight = function () {
      return !!document.querySelector(".sidebar.right")
    }
    var apply = function () {
      var desktop = isDesktop()
      var onLeft = savedLeft && desktop && hasLeft()
      var onRight = savedRight && desktop && hasRight()
      document.body.classList.toggle("bs-sidebar-collapsed", onLeft)
      document.body.classList.toggle("bs-sidebar-right-collapsed", onRight)
      document.body.classList.toggle("bs-graph-collapsed", graphCollapsed)
      document.body.classList.toggle("bs-has-right-sidebar", hasRight())
      if (!onLeft) document.body.classList.remove("bs-sidebar-drawer")
      if (!onRight) document.body.classList.remove("bs-sidebar-right-drawer")
    }
    var closeLeftDrawer = function () {
      document.body.classList.remove("bs-sidebar-drawer")
    }
    var closeRightDrawer = function () {
      document.body.classList.remove("bs-sidebar-right-drawer")
    }
    var closeDrawers = function () {
      closeLeftDrawer()
      closeRightDrawer()
    }
    var openLeftDrawer = function () {
      if (!isDesktop() || !hasLeft()) return
      closeRightDrawer()
      document.body.classList.add("bs-sidebar-drawer")
    }
    var openRightDrawer = function () {
      if (!isDesktop() || !hasRight()) return
      closeLeftDrawer()
      document.body.classList.add("bs-sidebar-right-drawer")
    }
    var toggleLeftDrawer = function () {
      if (document.body.classList.contains("bs-sidebar-drawer")) closeLeftDrawer()
      else openLeftDrawer()
    }
    var toggleRightDrawer = function () {
      if (document.body.classList.contains("bs-sidebar-right-drawer")) closeRightDrawer()
      else openRightDrawer()
    }
    var setLeftCollapsed = function (v) {
      savedLeft = !!v
      store(LEFT_KEY, savedLeft)
      apply()
    }
    var setRightCollapsed = function (v) {
      savedRight = !!v
      store(RIGHT_KEY, savedRight)
      apply()
    }
    var svg = function (inner) {
      return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        inner +
        "</svg>"
      )
    }
    var MENU_SVG = svg(
      '<line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line>',
    )
    var CLOSE_SVG = svg(
      '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
    )
    var PANEL_RIGHT_SVG =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>'
    var PANEL_ICON_ATTRS =
      'xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
    var PANEL_RECT = '<rect x="3" y="3" width="18" height="18" rx="2"></rect>'
    var HIDE_LEFT_SVG =
      '<svg ' + PANEL_ICON_ATTRS + '>' + PANEL_RECT + '<path d="M9 3v18"></path><path d="m16 15-3-3 3-3"></path></svg>'
    var HIDE_RIGHT_SVG =
      '<svg ' + PANEL_ICON_ATTRS + '>' + PANEL_RECT + '<path d="M15 3v18"></path><path d="m8 9 3 3-3 3"></path></svg>'
    var PIN_SVG =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"></path><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"></path></svg>'

    var makeToggle = function (id, label, iconHtml) {
      var btn = document.createElement("button")
      btn.id = id
      btn.type = "button"
      btn.setAttribute("aria-label", label)
      btn.innerHTML =
        '<span class="bs-ico-menu">' + iconHtml + '</span><span class="bs-ico-close">' + CLOSE_SVG + "</span>"
      return btn
    }

    var ensureLeft = function () {
      if (!document.getElementById("bs-sidebar-toggle")) {
        var btn = makeToggle("bs-sidebar-toggle", "展开目录", MENU_SVG)
        btn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          toggleLeftDrawer()
        })
        document.body.appendChild(btn)
      }
      var sidebar = document.querySelector(".sidebar.left")
      if (sidebar && !sidebar.querySelector(".bs-sidebar-hide")) {
        var hideBtn = document.createElement("button")
        hideBtn.type = "button"
        hideBtn.className = "bs-sidebar-hide"
        hideBtn.setAttribute("aria-label", "隐藏目录")
        hideBtn.innerHTML = HIDE_LEFT_SVG
        hideBtn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          setLeftCollapsed(true)
          closeLeftDrawer()
        })
        var pinBtn = document.createElement("button")
        pinBtn.type = "button"
        pinBtn.className = "bs-sidebar-pin"
        pinBtn.setAttribute("aria-label", "固定为侧栏")
        pinBtn.title = "固定为侧栏"
        pinBtn.innerHTML =
          '<span class="bs-pin-ico">' + PIN_SVG + '</span><span class="bs-pin-label">固定</span>'
        pinBtn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          setLeftCollapsed(false)
          closeLeftDrawer()
        })
        sidebar.appendChild(hideBtn)
        sidebar.appendChild(pinBtn)
      }
    }

    var ensureRight = function () {
      if (!document.getElementById("bs-sidebar-right-toggle")) {
        var btn = makeToggle("bs-sidebar-right-toggle", "展开关系图谱侧栏", PANEL_RIGHT_SVG)
        btn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          toggleRightDrawer()
        })
        document.body.appendChild(btn)
      }
      var sidebar = document.querySelector(".sidebar.right")
      if (sidebar && !sidebar.querySelector(".bs-sidebar-hide-right")) {
        var hideBtn = document.createElement("button")
        hideBtn.type = "button"
        hideBtn.className = "bs-sidebar-hide-right"
        hideBtn.setAttribute("aria-label", "隐藏关系图谱侧栏")
        hideBtn.innerHTML = HIDE_RIGHT_SVG
        hideBtn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          setRightCollapsed(true)
          closeRightDrawer()
        })
        var pinBtn = document.createElement("button")
        pinBtn.type = "button"
        pinBtn.className = "bs-sidebar-pin-right"
        pinBtn.setAttribute("aria-label", "固定为侧栏")
        pinBtn.title = "固定为侧栏"
        pinBtn.innerHTML =
          '<span class="bs-pin-ico">' + PIN_SVG + '</span><span class="bs-pin-label">固定</span>'
        pinBtn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          setRightCollapsed(false)
          closeRightDrawer()
        })
        sidebar.appendChild(hideBtn)
        sidebar.appendChild(pinBtn)
      }
    }

    // 手机端画布会吞掉触摸手势，快捷按钮补 touchend 兜底
    var bindTap = function (btn, handler) {
      if (!btn || btn.dataset.bsTap === "1") return
      btn.dataset.bsTap = "1"
      btn.addEventListener(
        "touchend",
        function (ev) {
          if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
          }
          handler()
        },
        { passive: false },
      )
    }

    // 右上角快捷栏：主题切换 + 搜索（放在窗口右侧）
    var ensureQuickbar = function () {
      var bar = document.getElementById("bs-quickbar")
      if (!bar) {
        bar = document.createElement("div")
        bar.id = "bs-quickbar"
        document.body.appendChild(bar)
      }
      var toggle = document.querySelector("button.darkmode")
      if (toggle && toggle.parentNode !== bar) {
        bar.appendChild(toggle)
      }
      if (toggle && toggle.parentNode === bar) {
        bindTap(toggle, function () {
          toggle.click()
        })
      }
      var search = bar.querySelector(".bs-quickbar-search")
      if (!search) {
        search = document.createElement("button")
        search.type = "button"
        search.className = "bs-quickbar-search"
        search.setAttribute("aria-label", "搜索")
        search.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><span>搜索</span>'
        search.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          var searchBtn = document.querySelector(".search-button")
          if (!searchBtn) {
            try {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
              )
            } catch (e) {}
            return
          }
          // 左侧栏收起时搜索弹层会跟着隐藏：先打开左侧抽屉再触发搜索，
          // 搜索关闭后自动收回抽屉（避免抽屉一直挡着）。
          if (document.body.classList.contains("bs-sidebar-collapsed") && hasLeft()) {
            document.body.classList.add("bs-search-open")
            openLeftDrawer()
            setTimeout(function () {
              try {
                searchBtn.click()
              } catch (e) {}
            }, 40)
            var tries = 0
            var timer = setInterval(function () {
              var sc = document.querySelector(".search-container")
              tries += 1
              if (!sc || getComputedStyle(sc).display === "none" || tries > 240) {
                clearInterval(timer)
                document.body.classList.remove("bs-search-open")
                closeLeftDrawer()
              }
            }, 250)
            return
          }
          searchBtn.click()
        })
        bar.appendChild(search)
        bindTap(search, function () {
          search.click()
        })
      }
    }

    // Excalidraw / Canvas 全屏页：左上角加「返回」按钮，避免误点浏览器返回
    var ensureBackButton = function () {
      var root = document.getElementById("quartz-root")
      var frame = root ? root.getAttribute("data-frame") : ""
      if (frame !== "excalidraw" && frame !== "canvas") return
      if (document.getElementById("bs-back-btn")) return
      var btn = document.createElement("button")
      btn.id = "bs-back-btn"
      btn.type = "button"
      btn.setAttribute("aria-label", "返回")
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg><span>返回</span>'
      btn.addEventListener("click", function (ev) {
        if (ev && ev.stopPropagation) ev.stopPropagation()
        var base = document.body.getAttribute("data-basepath") || ""
        while (base.length > 0 && base.charAt(base.length - 1) === "/") {
          base = base.slice(0, -1)
        }
        var target = base + "/home"
        var sameOrigin = false
        try {
          sameOrigin = !!document.referrer && new URL(document.referrer).origin === location.origin
        } catch (e) {}
        if (sameOrigin && window.history.length > 1) {
          window.history.back()
          return
        }
        location.href = target || "/home"
      })
      var bar = document.getElementById("bs-quickbar")
      if (bar) {
        bar.insertBefore(btn, bar.firstChild)
      } else {
        document.body.appendChild(btn)
      }
      bindTap(btn, function () {
        btn.click()
      })
    }

    // 关系图谱可以单独收起/展开，不影响目录（TOC）等其他面板
    var ensureGraphToggle = function () {
      var graph = document.querySelector(".sidebar.right .graph")
      if (!graph) return
      var btn = graph.querySelector(".bs-graph-toggle")
      if (!btn) {
        btn = document.createElement("button")
        btn.type = "button"
        btn.className = "bs-graph-toggle"
        btn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
        btn.addEventListener("click", function (ev) {
          if (ev && ev.stopPropagation) ev.stopPropagation()
          graphCollapsed = !graphCollapsed
          store(GRAPH_KEY, graphCollapsed)
          apply()
          if (!graphCollapsed) {
            setTimeout(function () {
              try {
                document.dispatchEvent(new Event("render"))
              } catch (e) {}
            }, 60)
          }
        })
        graph.appendChild(btn)
      }
      var label = graphCollapsed ? "展开关系图谱" : "收起关系图谱"
      btn.setAttribute("aria-label", label)
      btn.title = label
    }

    var HOME_SVG =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3L12 3z"></path></svg>'

    // 点击面包屑里的「Home」（显示为房子图标）或左上角站点标题时，跳到首页总览「Home」
    var ensureHomeTarget = function () {
      var suffix = "home"
      var toNav = function (el) {
        if (!el) return
        var href = el.getAttribute("href")
        if (!href || href.charAt(0) === "#") return
        if (href.indexOf(suffix) !== -1) return
        if (href.charAt(href.length - 1) !== "/") {
          if (href === ".") href = "./"
          else if (href.slice(-10) === "index.html") href = href.slice(0, -10)
          else href = href + "/"
        }
        el.setAttribute("href", href + suffix)
      }
      toNav(document.querySelector(".page-title a"))
      var crumb = document.querySelector(".breadcrumb-container .breadcrumb-element a")
      if (crumb) {
        toNav(crumb)
        if (!crumb.querySelector(".bs-home-icon")) {
          crumb.innerHTML = '<span class="bs-home-icon">' + HOME_SVG + "</span>"
          crumb.setAttribute("aria-label", "Home")
          crumb.title = "Home"
        }
      }
    }

    var ensureButtons = function () {
      ensureLeft()
      ensureRight()
      ensureQuickbar()
      ensureBackButton()
      ensureGraphToggle()
      ensureHomeTarget()
    }
    var init = function () {
      ensureButtons()
      apply()
    }
    var scheduleInit = function () {
      init()
      setTimeout(init, 80)
      setTimeout(init, 400)
    }
    var navInit = function () {
      closeDrawers()
      scheduleInit()
    }
    document.addEventListener("nav", navInit)
    document.addEventListener("render", init)
    document.addEventListener("prenav", closeDrawers)
    document.addEventListener("click", function (ev) {
      if (document.body.classList.contains("bs-search-open")) return
      var t = ev.target
      if (document.body.classList.contains("bs-sidebar-drawer")) {
        if (!(t && t.closest && (t.closest(".sidebar.left") || t.closest("#bs-sidebar-toggle")))) {
          closeLeftDrawer()
        }
      }
      if (document.body.classList.contains("bs-sidebar-right-drawer")) {
        if (
          !(t && t.closest && (t.closest(".sidebar.right") || t.closest("#bs-sidebar-right-toggle")))
        ) {
          closeRightDrawer()
        }
      }
    })
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeDrawers()
    })
    if (window.matchMedia) {
      try {
        window.matchMedia("(min-width: 800px)").addEventListener("change", function () {
          apply()
          closeDrawers()
        })
      } catch (e) {}
    }
    // SPA 导航会重建侧栏/按钮，监听 DOM 变化把按钮补回来
    try {
      if (window.MutationObserver) {
        var obs = new window.MutationObserver(function () {
          ensureButtons()
          apply()
        })
        obs.observe(document.body, { childList: true, subtree: true })
      }
    } catch (e) {}
    init()
  } catch (e) {
    try {
      console.warn("[bs-sidebar]", e)
    } catch (e2) {}
  }
}
bsSidebarInit();
