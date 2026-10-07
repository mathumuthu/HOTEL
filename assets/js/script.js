/* ==========================================================================
   STACKLY — main script
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Header: transparent -> solid on scroll (home page only) ---------- */
  var header = document.getElementById("siteHeader");
  if (header && header.classList.contains("site-header--transparent")) {
    var onScroll = function () {
      header.classList.toggle("site-header--scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile hamburger menu ---------- */
  var burger = document.getElementById("hamburger");
  var nav = document.getElementById("mainNav");
  if (burger && nav) {
    var setMenuOpen = function (isOpen) {
      burger.classList.toggle("open", isOpen);
      nav.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    };

    burger.setAttribute("aria-expanded", String(nav.classList.contains("open")));
    burger.addEventListener("click", function () {
      setMenuOpen(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenuOpen(false);
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) setMenuOpen(false);
    });
  }

  /* ---------- Hero slider (arrows on home hero) ---------- */
  var heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 1) {
    var current = 0;
    var showSlide = function (i) {
      heroSlides[current].classList.remove("active");
      current = (i + heroSlides.length) % heroSlides.length;
      heroSlides[current].classList.add("active");
    };
    var prev = document.querySelector(".hero-arrow--prev");
    var next = document.querySelector(".hero-arrow--next");
    if (prev) prev.addEventListener("click", function (e) { e.preventDefault(); showSlide(current - 1); });
    if (next) next.addEventListener("click", function (e) { e.preventDefault(); showSlide(current + 1); });
  }

  /* ---------- Testimonial slider ---------- */
  var tSlides = document.querySelectorAll(".testimonial-slide");
  if (tSlides.length > 1) {
    var tCurrent = 0;
    var showT = function (i) {
      tSlides[tCurrent].classList.remove("active");
      tCurrent = (i + tSlides.length) % tSlides.length;
      tSlides[tCurrent].classList.add("active");
    };
    var tPrev = document.querySelector(".testimonial-arrow--prev");
    var tNext = document.querySelector(".testimonial-arrow--next");
    if (tPrev) tPrev.addEventListener("click", function (e) { e.preventDefault(); showT(tCurrent - 1); });
    if (tNext) tNext.addEventListener("click", function (e) { e.preventDefault(); showT(tCurrent + 1); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 404 page: previous page via browser history ---------- */
  var prevBtn = document.getElementById("goBack");
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "index.html";
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
