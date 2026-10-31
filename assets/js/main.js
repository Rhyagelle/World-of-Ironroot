/* Hollowmere theme scripts. No dependencies. */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ─── Light / dark toggle ─────────────────────────────────── */
  var themeBtn = doc.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ─── Mobile navigation ───────────────────────────────────── */
  var header = doc.querySelector("[data-header]");
  var navBtn = doc.querySelector("[data-nav-toggle]");
  if (header && navBtn) {
    navBtn.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        header.classList.remove("is-open");
        navBtn.setAttribute("aria-expanded", "false");
        navBtn.focus();
      }
    });
  }

  /* ─── Copy buttons: <button data-copy="text"> ─────────────── */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = doc.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      doc.body.appendChild(area);
      area.select();
      try { doc.execCommand("copy") ? resolve() : reject(); }
      catch (err) { reject(err); }
      doc.body.removeChild(area);
    });
  }

  doc.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var label = btn.querySelector(".copy-label");
    var original = label ? label.getAttribute("data-original") || label.textContent : "";
    if (label && !label.getAttribute("data-original")) label.setAttribute("data-original", original);

    copyText(btn.getAttribute("data-copy")).then(function () {
      if (label) label.textContent = "Copied";
    }, function () {
      if (label) label.textContent = "Press Ctrl+C to copy";
    }).then(function () {
      if (!label) return;
      window.setTimeout(function () { label.textContent = original; }, 1800);
    });
  });

  /* ─── Mod filters ─────────────────────────────────────────── */
  var filters = doc.querySelector("[data-mod-filters]");
  if (filters) {
    var search = filters.querySelector("[data-mod-search]");
    var chips = filters.querySelectorAll("button[data-cat]");
    var count = filters.querySelector("[data-mod-count]");
    var rows = doc.querySelectorAll("[data-mod]");
    var groups = doc.querySelectorAll("[data-group]");
    var empty = doc.querySelector("[data-mod-empty]");
    var category = "all";

    var apply = function () {
      var q = (search.value || "").trim().toLowerCase();
      var shown = 0;

      Array.prototype.forEach.call(rows, function (row) {
        var catOk = category === "all" || row.getAttribute("data-cat") === category;
        var textOk = !q || row.getAttribute("data-search").indexOf(q) > -1;
        var show = catOk && textOk;
        row.hidden = !show;
        if (show) shown++;
      });

      Array.prototype.forEach.call(groups, function (g) {
        g.hidden = !g.querySelector("[data-mod]:not([hidden])");
      });

      count.textContent = shown === rows.length
        ? rows.length + (rows.length === 1 ? " mod" : " mods")
        : shown + " of " + rows.length + " mods";
      if (empty) empty.hidden = shown !== 0;
    };

    search.addEventListener("input", apply);
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        category = chip.getAttribute("data-cat");
        Array.prototype.forEach.call(chips, function (c) {
          c.setAttribute("aria-pressed", c === chip ? "true" : "false");
        });
        apply();
      });
    });
    apply();
  }

  /* ─── Lore: collapse chapter list on small screens ────────── */
  var loreNav = doc.querySelector("[data-lore-nav]");
  if (loreNav && window.matchMedia("(max-width: 900px)").matches) {
    loreNav.removeAttribute("open");
  }

  /* ─── Lore: "On this page" built from h2/h3 ───────────────── */
  var toc = doc.querySelector("[data-toc]");
  var source = doc.querySelector("[data-toc-source]");
  if (toc && source) {
    var heads = source.querySelectorAll("h2[id], h3[id]");
    if (heads.length > 1) {
      var list = toc.querySelector("ul");
      var links = [];
      Array.prototype.forEach.call(heads, function (h) {
        var li = doc.createElement("li");
        if (h.tagName === "H3") li.className = "toc__sub";
        var a = doc.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
        links.push({ el: h, link: a });
      });
      toc.hidden = false;

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (item) {
              item.link.classList.toggle("is-active", item.el === entry.target);
            });
          });
        }, { rootMargin: "0px 0px -70% 0px" });
        links.forEach(function (item) { io.observe(item.el); });
      }
    }
  }
})();
