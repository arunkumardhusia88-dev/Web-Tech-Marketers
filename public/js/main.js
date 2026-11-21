/**
 * Veltrix Growth — Shared UI Engine, Navigation, Forms, SEO & Homepage Hydration
 */
(function (global) {
  'use strict';

  var ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="2" y="5" rx="2"/><path d="m22 7-6 5 6 5V7Z"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.141 5.266-1.375c1.469.797 3.125 1.219 4.766 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.344-5.141-4.547-.141-.203-1.234-1.641-1.234-3.125s.781-2.219 1.063-2.516c.281-.297.609-.375.813-.375.203 0 .406.016.578.016.188 0 .438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.141-.313.297-.141.594.172.297.781 1.281 1.672 2.078 1.156 1.031 2.125 1.344 2.422 1.5.297.141.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.672-.156.266.094 1.703.797 2 .953.297.156.484.219.563.344.078.125.078.719-.172 1.422z"/></svg>',
    star: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
  };

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getIcon(name) {
    return ICONS[name] || ICONS.chart;
  }

  function renderImage(src, alt, className) {
    var safeSrc = escHtml(src || '');
    var safeAlt = escHtml(alt || 'Webluxe');
    var cls = className ? ' class="' + escHtml(className) + '"' : '';
    return '<img src="' + safeSrc + '" alt="' + safeAlt + '"' + cls + ' loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display=\'none\';if(this.nextElementSibling)this.nextElementSibling.style.display=\'flex\';">' +
      '<div class="img-fallback" style="display:none;">' + safeAlt + '</div>';
  }

  function toast(message, type) {
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    var item = document.createElement('div');
    item.className = 'toast ' + (type === 'error' ? 'toast--error' : 'toast--success');
    item.innerHTML = '<span>' + escHtml(message) + '</span><button type="button" aria-label="Dismiss notification" style="opacity:0.7;font-weight:700;">✕</button>';
    item.querySelector('button').addEventListener('click', function () {
      item.remove();
    });
    container.appendChild(item);
    setTimeout(function () {
      if (item.parentNode) item.remove();
    }, 4500);
  }

  function buildWhatsAppUrl(customMessage) {
    var state = global.VeltrixStorage.getState();
    var phone = String(state.settings.whatsappNumber || '919115277587').replace(/[^0-9]/g, '');
    var msg = customMessage || ('Hello ' + state.settings.websiteName + ', I would like to book a free Digital Marketing & AI Automation consultation.');
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
  }

  function applyThemeSettings(settings) {
    if (!settings) return;
    var root = document.documentElement;
    if (settings.primaryColor) {
      root.style.setProperty('--color-primary', settings.primaryColor);
    }
    if (settings.secondaryColor) {
      root.style.setProperty('--color-secondary', settings.secondaryColor);
      root.style.setProperty('--color-pink', settings.secondaryColor);
    }
    if (settings.cyanColor) {
      root.style.setProperty('--color-accent', settings.cyanColor);
    }
  }

  function renderBrandMarkup(settings) {
    var rawText = String(settings.logoText || settings.websiteName || 'Webluxe').trim();
    var mark = escHtml(settings.logoMark || 'W');
    var labelHtml;
    if (rawText.toLowerCase() === 'webluxe') {
      labelHtml = '<span class="logo-text-group"><span class="logo-web">WEB</span><span class="logo-luxe">LUXE</span></span>';
    } else {
      labelHtml = '<span>' + escHtml(rawText) + '</span>';
    }
    return '<span class="brand-mark-icon" aria-hidden="true">' + mark + '</span>' + labelHtml;
  }

  function renderHeroHeadline(headline, highlight) {
    var full = String(headline || '');
    var hl = String(highlight || '').trim();
    if (!hl) return escHtml(full);
    var idx = full.toLowerCase().indexOf(hl.toLowerCase());
    if (idx === -1) {
      return escHtml(full) + ' <span class="hero-highlight">' + escHtml(hl) + '</span>';
    }
    var before = full.slice(0, idx);
    var matched = full.slice(idx, idx + hl.length);
    var after = full.slice(idx + hl.length);
    return escHtml(before) + '<span class="hero-highlight">' + escHtml(matched) + '</span>' + escHtml(after);
  }

  function updateSeoMeta(meta) {
    var state = global.VeltrixStorage.getState();
    var title = meta.title || state.settings.defaultSeoTitle;
    var desc = meta.description || state.settings.defaultSeoDescription;
    var keywords = meta.keywords || state.settings.defaultSeoKeywords;
    var image = meta.image || (global.location.origin + '/images/banners/hero-agency.jpg');
    var canonical = meta.canonical || (global.location.origin + global.location.pathname + global.location.search);

    document.title = title;

    function setMeta(attr, key, val) {
      var el = document.querySelector('meta[' + attr + '="' + key + '"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    }

    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);

    var linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    if (meta.schema) {
      var existingLd = document.getElementById('dynamic-json-ld');
      if (existingLd) existingLd.remove();
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'dynamic-json-ld';
      script.textContent = JSON.stringify(meta.schema);
      document.head.appendChild(script);
    }
  }

  function renderHeaderAndFooter() {
    var state = global.VeltrixStorage.getState();
    var settings = state.settings;
    var navbar = state.navbar;
    var services = (state.services || []).filter(function (s) { return s.status !== 'draft'; }).sort(function (a, b) { return (a.order || 0) - (b.order || 0); });

    var dmServices = services.filter(function (s) { return s.category === 'Digital Marketing'; });
    var aiServices = services.filter(function (s) { return s.category === 'AI Automation'; });
    var webServices = services.filter(function (s) { return s.category === 'Web Development'; });

    var headerEl = document.getElementById('site-header');
    if (headerEl) {
      var currentPath = global.location.pathname;
      var navLinksHtml = (navbar.links || []).map(function (lnk) {
        if (lnk.label.toLowerCase() === 'about') {
          return '<a href="' + escHtml(lnk.url) + '" class="nav-link' + (currentPath.indexOf('about') >= 0 ? ' is-active' : '') + '">' + escHtml(lnk.label) + '</a>';
        }
        return '<a href="' + escHtml(lnk.url) + '" class="nav-link' + (currentPath === lnk.url ? ' is-active' : '') + '">' + escHtml(lnk.label) + '</a>';
      });

      // Insert Services Dropdown right after About (index 2)
      var servicesDropdownHtml =
        '<div class="nav-dropdown" id="services-dropdown">' +
          '<button type="button" class="nav-dropdown-trigger" aria-expanded="false" aria-controls="services-mega-menu">' +
            '<span>Services</span>' + ICONS.chevronDown +
          '</button>' +
          '<div class="mega-menu" id="services-mega-menu" role="menu">' +
            '<div class="mega-menu-grid">' +
              '<div>' +
                '<div class="mega-col-title">Digital Marketing (' + dmServices.length + ')</div>' +
                '<div class="mega-links">' + dmServices.map(function (s) { return '<a class="mega-link" href="/services/service.html?slug=' + escHtml(s.slug) + '">' + escHtml(s.title) + '</a>'; }).join('') + '</div>' +
              '</div>' +
              '<div>' +
                '<div class="mega-col-title">AI Automation (' + aiServices.length + ')</div>' +
                '<div class="mega-links">' + aiServices.map(function (s) { return '<a class="mega-link" href="/services/service.html?slug=' + escHtml(s.slug) + '">' + escHtml(s.title) + '</a>'; }).join('') + '</div>' +
              '</div>' +
              '<div>' +
                '<div class="mega-col-title">Web Development (' + webServices.length + ')</div>' +
                '<div class="mega-links">' + webServices.map(function (s) { return '<a class="mega-link" href="/services/service.html?slug=' + escHtml(s.slug) + '">' + escHtml(s.title) + '</a>'; }).join('') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      var assembledNav = [];
      navLinksHtml.forEach(function (html, idx) {
        assembledNav.push(html);
        if (idx === 1) assembledNav.push(servicesDropdownHtml);
      });
      if (navLinksHtml.length < 2) assembledNav.push(servicesDropdownHtml);

      var currentTheme = global.VeltrixTheme ? global.VeltrixTheme.getTheme() : 'light';
      function getThemeBtnInner(mode) {
        return mode === 'light'
          ? (ICONS.moon + '<span>Dark</span>')
          : (ICONS.sun + '<span>Light</span>');
      }

      headerEl.innerHTML =
        '<div class="container header-inner">' +
          '<a href="/index.html" class="brand-wordmark">' +
            renderBrandMarkup(settings) +
          '</a>' +
          '<nav class="main-nav" aria-label="Main navigation">' + assembledNav.join('') + '</nav>' +
          '<div class="header-actions">' +
            '<button type="button" class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Switch color theme" title="Toggle Light / Dark Mode">' + getThemeBtnInner(currentTheme) + '</button>' +
            '<a href="' + escHtml(navbar.ctaUrl || '/contact.html') + '" class="btn btn-primary btn-sm">' + escHtml(navbar.ctaLabel || 'Get Free Consultation') + '</a>' +
            '<button type="button" class="mobile-toggle" id="mobile-menu-toggle" aria-label="Open navigation menu" aria-expanded="false">' +
              '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">' +
          (navbar.links || []).map(function (l) {
            return '<a class="mobile-nav-link" href="' + escHtml(l.url) + '">' + escHtml(l.label) + '</a>';
          }).join('') +
          '<div class="mobile-nav-link" style="border-bottom:none;">Services</div>' +
          '<div class="mobile-services-group">' +
            services.slice(0, 12).map(function (s) {
              return '<a href="/services/service.html?slug=' + escHtml(s.slug) + '">' + escHtml(s.title) + '</a>';
            }).join('') +
            '<a href="/index.html#services" style="color:var(--color-kicker);font-weight:600;">View All ' + services.length + ' Services →</a>' +
          '</div>' +
          '<a href="' + escHtml(navbar.ctaUrl || '/contact.html') + '" class="btn btn-primary" style="margin-top:8px;">' + escHtml(navbar.ctaLabel || 'Get Free Consultation') + '</a>' +
        '</div>';

      // Theme toggle click handler
      var themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn && global.VeltrixTheme) {
        themeBtn.addEventListener('click', function () {
          var nextMode = global.VeltrixTheme.toggleTheme();
          themeBtn.innerHTML = getThemeBtnInner(nextMode);
        });
      }

      // Dropdown interaction
      var dropdown = document.getElementById('services-dropdown');
      var trigger = dropdown ? dropdown.querySelector('.nav-dropdown-trigger') : null;
      if (dropdown && trigger) {
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var open = dropdown.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('click', function (e) {
          if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Mobile drawer toggle
      var mobBtn = document.getElementById('mobile-menu-toggle');
      var mobDrawer = document.getElementById('mobile-drawer');
      if (mobBtn && mobDrawer) {
        mobBtn.addEventListener('click', function () {
          var isOpen = mobDrawer.classList.toggle('is-open');
          mobBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          mobDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        });
      }

      // Sticky scroll class
      global.addEventListener('scroll', function () {
        if (global.scrollY > 24) headerEl.classList.add('is-scrolled');
        else headerEl.classList.remove('is-scrolled');
      }, { passive: true });
    }

    // Footer
    var footerEl = document.getElementById('site-footer');
    if (footerEl) {
      var featuredSlugs = state.footer.featuredServiceSlugs || [];
      var footerServices = featuredSlugs.map(function (slug) {
        return services.find(function (s) { return s.slug === slug; });
      }).filter(Boolean);
      if (footerServices.length === 0) footerServices = services.slice(0, 6);

      footerEl.innerHTML =
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div>' +
              '<a href="/index.html" class="brand-wordmark">' +
                renderBrandMarkup(settings) +
              '</a>' +
              '<p class="footer-desc">' + escHtml(state.footer.description) + '</p>' +
              '<div class="footer-socials">' +
                (state.socialLinks || []).map(function (soc) {
                  return '<a href="' + escHtml(soc.url) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">' + escHtml(soc.platform) + '</a>';
                }).join('') +
              '</div>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-heading">Quick Links</h4>' +
              '<ul class="footer-links">' +
                (state.footer.quickLinks || []).map(function (ql) {
                  return '<li><a href="' + escHtml(ql.url) + '">' + escHtml(ql.label) + '</a></li>';
                }).join('') +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-heading">Core Services</h4>' +
              '<ul class="footer-links">' +
                footerServices.map(function (fs) {
                  return '<li><a href="/services/service.html?slug=' + escHtml(fs.slug) + '">' + escHtml(fs.title) + '</a></li>';
                }).join('') +
              '</ul>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-heading">Contact & Updates</h4>' +
              '<ul class="footer-links" style="margin-bottom:16px;">' +
                '<li><a href="mailto:' + escHtml(settings.contactEmail) + '">' + escHtml(settings.contactEmail) + '</a></li>' +
                '<li><a href="tel:' + escHtml(settings.phoneNumber.replace(/[^0-9+]/g, '')) + '">' + escHtml(settings.phoneNumber) + '</a></li>' +
                '<li style="color:var(--text-secondary);font-size:0.875rem;">' + escHtml(settings.businessAddress) + '</li>' +
              '</ul>' +
              '<form class="newsletter-form" data-newsletter-form="footer">' +
                '<label class="sr-only" for="footer-nl-email">Email address</label>' +
                '<input id="footer-nl-email" type="email" required placeholder="Work email..." class="input-control" style="min-height:40px;">' +
                '<button type="submit" class="btn btn-primary btn-sm">Join</button>' +
              '</form>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p>' + escHtml(settings.footerCopyright) + '</p>' +
            '<div class="footer-legal">' +
              '<a href="#privacy" data-legal-modal="privacy">Privacy Policy</a>' +
              '<a href="#terms" data-legal-modal="terms">Terms & Conditions</a>' +
              '<a href="/sitemap.xml" target="_blank">XML Sitemap</a>' +
            '</div>' +
          '</div>' +
        '</div>';

      footerEl.querySelectorAll('[data-legal-modal]').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          openLegalModal(link.getAttribute('data-legal-modal'), settings);
        });
      });
    }

    // Floating WhatsApp CTA
    if (!document.getElementById('floating-whatsapp-btn')) {
      var waBtn = document.createElement('a');
      waBtn.id = 'floating-whatsapp-btn';
      waBtn.className = 'whatsapp-float';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
      waBtn.href = buildWhatsAppUrl();
      waBtn.innerHTML = ICONS.whatsapp + '<span>WhatsApp Consultation</span>';
      document.body.appendChild(waBtn);
    }
  }

  function openLegalModal(type, settings) {
    var modal = document.getElementById('legal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'legal-modal';
      modal.className = 'modal-backdrop';
      modal.innerHTML =
        '<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">' +
          '<div class="modal-header">' +
            '<h3 id="legal-modal-title"></h3>' +
            '<button type="button" class="icon-btn" id="close-legal-modal" aria-label="Close modal">✕</button>' +
          '</div>' +
          '<div id="legal-modal-body" class="prose" style="font-size:0.95rem;"></div>' +
        '</div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.id === 'close-legal-modal') modal.classList.remove('is-open');
      });
    }
    var titleEl = modal.querySelector('#legal-modal-title');
    var bodyEl = modal.querySelector('#legal-modal-body');
    if (type === 'privacy') {
      titleEl.textContent = 'Privacy Policy — ' + settings.websiteName;
      bodyEl.innerHTML = '<p>' + escHtml(settings.websiteName) + ' collects only the contact information you voluntarily submit through our consultation and newsletter forms to respond to business inquiries.</p><p>In this frontend demonstration environment, form submissions and content updates are stored locally in your browser via LocalStorage. For inquiries, contact ' + escHtml(settings.contactEmail) + '.</p>';
    } else {
      titleEl.textContent = 'Terms & Conditions — ' + settings.websiteName;
      bodyEl.innerHTML = '<p>All consulting retainers, AI workflow implementations, and web engineering sprints are governed by mutually executed Statements of Work (SOW). Clients retain full intellectual property ownership of custom codebases, ad accounts, and workflows upon milestone completion.</p>';
    }
    modal.classList.add('is-open');
  }

  function bindNewsletterForms() {
    document.querySelectorAll('[data-newsletter-form]').forEach(function (form) {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast('Please enter a valid email address.', 'error');
          return;
        }
        var subs = global.VeltrixStorage.getCollection('subscribers');
        var exists = subs.some(function (s) { return s.email.toLowerCase() === email.toLowerCase(); });
        if (!exists) {
          global.VeltrixStorage.upsertItem('subscribers', {
            id: 'sub-' + Date.now(),
            email: email,
            date: new Date().toISOString().slice(0, 10)
          });
        }
        if (input) input.value = '';
        var msgEl = form.parentElement.querySelector('[data-newsletter-status]');
        if (msgEl) {
          msgEl.textContent = 'Subscribed! Check your inbox for our next growth & AI briefing.';
          msgEl.style.color = 'var(--color-success-text)';
        }
        toast('Thank you for subscribing to ' + global.VeltrixStorage.getState().settings.websiteName + ' updates.');
      });
    });
  }

  function bindLeadForm(formId, defaultService) {
    var form = document.getElementById(formId);
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';

    var state = global.VeltrixStorage.getState();
    var serviceSelect = form.querySelector('[name="service"]');
    if (serviceSelect && serviceSelect.options.length <= 1) {
      var services = (state.services || []).filter(function (s) { return s.status !== 'draft'; });
      services.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s.title;
        opt.textContent = s.title + ' (' + s.category + ')';
        if (defaultService && defaultService === s.title) opt.selected = true;
        serviceSelect.appendChild(opt);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var service = form.querySelector('[name="service"]').value;
      var budget = form.querySelector('[name="budget"]') ? form.querySelector('[name="budget"]').value : 'Custom Quote';
      var message = form.querySelector('[name="message"]').value.trim();

      var errorEl = form.querySelector('[data-form-feedback]');
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 7 || !message) {
        if (errorEl) {
          errorEl.textContent = 'Please complete your name, valid email, phone number, and project summary.';
          errorEl.style.color = 'var(--color-danger-text)';
        }
        toast('Please fill in all required inquiry fields accurately.', 'error');
        return;
      }

      global.VeltrixStorage.upsertItem('leads', {
        id: 'lead-' + Date.now(),
        name: name,
        email: email,
        phone: phone,
        service: service || 'General Consultation',
        budget: budget,
        message: message,
        date: new Date().toISOString().slice(0, 10),
        status: 'New'
      });

      form.reset();
      if (errorEl) {
        errorEl.textContent = 'Inquiry received! Our strategist will respond within 1 business hour.';
        errorEl.style.color = 'var(--color-success-text)';
      }
      toast('Consultation request saved! View it inside the Admin Lead Manager.');
    });
  }

  function animateCounters() {
    var els = document.querySelectorAll('[data-count-target]');
    els.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count-target'));
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var isDecimal = el.getAttribute('data-count-decimal') === 'true';
      var padLen = parseInt(el.getAttribute('data-count-pad') || '0', 10);
      if (isNaN(target)) return;

      var startTime = null;
      var duration = 900;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var current = target * (1 - Math.pow(1 - progress, 3));
        var displayVal = isDecimal ? (current / 10).toFixed(1) : String(Math.round(current));
        if (!isDecimal && padLen > 1) {
          displayVal = displayVal.padStart(padLen, '0');
        }
        el.textContent = prefix + displayVal + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ========================================================================
     Homepage Renderer
     ======================================================================== */
  function renderHomepage() {
    var root = document.getElementById('home-page');
    if (!root) return;

    var state = global.VeltrixStorage.getState();
    var settings = state.settings;
    var hero = state.hero;
    var services = (state.services || []).filter(function (s) { return s.status !== 'draft'; }).sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    var portfolio = (state.portfolio || []).filter(function (p) { return p.status !== 'draft'; });

    updateSeoMeta({
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      keywords: settings.defaultSeoKeywords,
      image: global.location.origin + hero.heroImage,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': settings.websiteName,
        'description': settings.defaultSeoDescription,
        'telephone': settings.phoneNumber,
        'email': settings.contactEmail,
        'address': { '@type': 'PostalAddress', 'streetAddress': settings.businessAddress }
      }
    });

    // 1. Hero Section
    var heroEl = document.getElementById('hero-section');
    if (heroEl) {
      heroEl.innerHTML =
        '<div class="container">' +
          '<div class="hero-grid">' +
            '<div class="hero-content">' +
              '<span class="hero-eyebrow">' + escHtml(hero.eyebrow) + '</span>' +
              '<h1 class="display-title">' + renderHeroHeadline(hero.headline, hero.headlineHighlight) + '</h1>' +
              '<p class="hero-description">' + escHtml(hero.description) + '</p>' +
              '<div class="hero-ctas">' +
                '<a href="' + escHtml(hero.primaryCtaUrl) + '" class="btn btn-primary">' + escHtml(hero.primaryCtaText) + ICONS.arrowRight + '</a>' +
                '<a href="' + escHtml(hero.secondaryCtaUrl) + '" class="btn btn-secondary">' + escHtml(hero.secondaryCtaText) + '</a>' +
              '</div>' +
              '<div class="hero-trust">' +
                (hero.trustItems || []).map(function (item, idx) {
                  return (idx > 0 ? '<span class="hero-trust-sep" aria-hidden="true">·</span>' : '') + '<span>' + escHtml(item) + '</span>';
                }).join('') +
              '</div>' +
            '</div>' +
            '<div class="hero-media">' +
              renderImage(hero.heroImage, hero.heroImageAlt) +
              '<div class="hero-media-scrim"></div>' +
              '<div class="hero-media-caption">' +
                '<div>' +
                  '<p>Integrated Acquisition &amp; AI Operations</p>' +
                  '<span>Paid Media · Search · AI Chatbots &amp; Voice · CRM Pipelines</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="stats-strip">' +
            (hero.stats || []).map(function (st) {
              return '<div class="stat-cell">' +
                '<div class="stat-value tabular-nums" data-count-target="' + escHtml(st.numericTarget) + '" data-count-prefix="' + escHtml(st.prefix || '') + '" data-count-suffix="' + escHtml(st.suffix || '') + '" data-count-decimal="' + (st.decimal ? 'true' : 'false') + '" data-count-pad="' + escHtml(st.padLength || 0) + '">' + escHtml(st.value) + '</div>' +
                '<div class="stat-label">' + escHtml(st.label) + '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>';
      animateCounters();
    }

    // 2. Highlights Section
    var hlEl = document.getElementById('highlights-grid');
    if (hlEl) {
      hlEl.innerHTML = (state.highlights || []).map(function (h) {
        return '<article class="glass-card highlight-card">' +
          '<div class="card-icon-box" aria-hidden="true">' + getIcon(h.icon) + '</div>' +
          '<h3>' + escHtml(h.title) + '</h3>' +
          '<p>' + escHtml(h.description) + '</p>' +
        '</article>';
      }).join('');
    }

    // 3. About Section
    var aboutEl = document.getElementById('about-section-content');
    if (aboutEl) {
      var ab = state.about;
      aboutEl.innerHTML =
        '<div class="about-grid">' +
          '<div class="about-media">' + renderImage(ab.image, ab.imageAlt) + '</div>' +
          '<div class="about-body">' +
            '<span class="section-kicker">' + escHtml(ab.kicker) + '</span>' +
            '<h2 class="section-title">' + escHtml(ab.headline) + '</h2>' +
            '<p style="color:var(--text-secondary);">' + escHtml(ab.intro) + '</p>' +
            '<p style="color:var(--text-secondary);">' + escHtml(ab.experience) + '</p>' +
            (ab.closing ? '<p style="color:var(--text-secondary);">' + escHtml(ab.closing) + '</p>' : '') +
            '<div class="about-pillars">' +
              '<div class="about-pillar"><h4>Our Mission</h4><p>' + escHtml(ab.mission) + '</p></div>' +
              '<div class="about-pillar"><h4>Our Vision</h4><p>' + escHtml(ab.vision) + '</p></div>' +
            '</div>' +
            '<div class="about-checklist">' +
              (ab.whyChooseUs || []).map(function (pt) {
                return '<div class="about-check-item">' + ICONS.check + '<span>' + escHtml(pt) + '</span></div>';
              }).join('') +
            '</div>' +
            '<div class="about-metrics-grid">' +
              (ab.metrics || []).map(function (m) {
                return '<div class="about-metric-card">' +
                  '<div class="about-metric-value mono-num">' + escHtml(m.value) + '</div>' +
                  '<div class="about-metric-label">' + escHtml(m.label) + '</div>' +
                  (m.sublabel ? '<div class="about-metric-sub">' + escHtml(m.sublabel) + '</div>' : '') +
                '</div>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>';
    }

    // 4. Services Section (All 22 Services + Category Tabs + Search)
    var srvGrid = document.getElementById('services-grid');
    var srvTabs = document.getElementById('services-tabs');
    var srvSearch = document.getElementById('services-search');
    var activeSrvCat = 'All';

    function drawServices() {
      var q = srvSearch ? srvSearch.value.trim().toLowerCase() : '';
      var filtered = services.filter(function (s) {
        var catMatch = activeSrvCat === 'All' || s.category === activeSrvCat;
        var textMatch = !q || s.title.toLowerCase().indexOf(q) >= 0 || s.shortDescription.toLowerCase().indexOf(q) >= 0;
        return catMatch && textMatch;
      });
      if (filtered.length === 0) {
        srvGrid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">No matching services found. Try clearing your filter.</div>';
        return;
      }
      srvGrid.innerHTML = filtered.map(function (s, idx) {
        var num = String(idx + 1).padStart(2, '0');
        return '<article class="service-card">' +
          '<div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">' +
              '<div class="card-icon-box" style="margin-bottom:0;" aria-hidden="true">' + getIcon(s.icon) + '</div>' +
              '<span class="mono-num" style="font-size:0.8125rem;color:var(--text-muted);">' + num + '</span>' +
            '</div>' +
            '<div class="service-meta">' + escHtml(s.category) + '</div>' +
            '<h3>' + escHtml(s.title) + '</h3>' +
            '<p>' + escHtml(s.shortDescription) + '</p>' +
          '</div>' +
          '<a href="/services/service.html?slug=' + escHtml(s.slug) + '" class="card-link-row">Learn More ' + ICONS.arrowRight + '</a>' +
        '</article>';
      }).join('');
    }

    if (srvGrid && srvTabs) {
      srvTabs.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          srvTabs.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          activeSrvCat = btn.getAttribute('data-category');
          drawServices();
        });
      });
      if (srvSearch) srvSearch.addEventListener('input', drawServices);
      drawServices();
    }

    // 5. Promotional Banner
    var promoEl = document.getElementById('promo-banner');
    if (promoEl) {
      var pb = state.promoBanner;
      promoEl.innerHTML =
        '<img src="' + escHtml(pb.image) + '" alt="' + escHtml(pb.imageAlt) + '" class="promo-banner-bg" loading="lazy">' +
        '<div class="promo-banner-scrim"></div>' +
        '<div class="promo-banner-content">' +
          '<span class="section-kicker" style="margin-bottom:0;">Limited Monthly Audit Slots</span>' +
          '<h2>' + escHtml(pb.headline) + '</h2>' +
          '<p>' + escHtml(pb.description) + '</p>' +
          '<div class="promo-actions">' +
            '<a href="' + escHtml(pb.ctaUrl) + '" class="btn btn-primary">' + escHtml(pb.ctaText) + '</a>' +
            '<a href="' + buildWhatsAppUrl('Hi, I want to claim the free 30-minute Growth & AI Automation Audit.') + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">' + ICONS.whatsapp + '<span>' + escHtml(pb.whatsappText || 'Chat on WhatsApp') + '</span></a>' +
          '</div>' +
        '</div>';
    }

    // 6. Portfolio Section (6 Case Studies + Category Filter + Search)
    var prjGrid = document.getElementById('portfolio-grid');
    var prjTabs = document.getElementById('portfolio-tabs');
    var prjSearch = document.getElementById('portfolio-search');
    var activePrjCat = 'All';

    function drawPortfolio() {
      var q = prjSearch ? prjSearch.value.trim().toLowerCase() : '';
      var filtered = portfolio.filter(function (p) {
        var catMatch = activePrjCat === 'All' || p.category === activePrjCat;
        var textMatch = !q || p.title.toLowerCase().indexOf(q) >= 0 || p.industry.toLowerCase().indexOf(q) >= 0 || p.shortDescription.toLowerCase().indexOf(q) >= 0;
        return catMatch && textMatch;
      });
      if (filtered.length === 0) {
        prjGrid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">No case studies match your filter criteria.</div>';
        return;
      }
      prjGrid.innerHTML = filtered.map(function (p) {
        return '<article class="portfolio-card">' +
          '<div class="portfolio-thumb">' + renderImage(p.coverImage, p.title) + '</div>' +
          '<div class="portfolio-body">' +
            '<div class="meta-line"><span>' + escHtml(p.industry) + '</span><span aria-hidden="true">·</span><span>' + escHtml(p.category) + '</span></div>' +
            '<h3>' + escHtml(p.title) + '</h3>' +
            '<p>' + escHtml(p.shortDescription) + '</p>' +
            '<div class="portfolio-result-row">' +
              '<span class="result-highlight">' + escHtml(p.result) + '</span>' +
              '<a href="/portfolio/project.html?slug=' + escHtml(p.slug) + '" class="btn btn-secondary btn-sm">View Case Study</a>' +
            '</div>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    if (prjGrid && prjTabs) {
      prjTabs.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          prjTabs.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          activePrjCat = btn.getAttribute('data-category');
          drawPortfolio();
        });
      });
      if (prjSearch) prjSearch.addEventListener('input', drawPortfolio);
      drawPortfolio();
    }

    // 7. Pricing Section (Monthly / One-Time Toggle)
    renderPricingSection('pricing-grid', 'billing-toggle-group');

    // 8. Work Process Section
    var procGrid = document.getElementById('process-grid');
    if (procGrid) {
      procGrid.innerHTML = (state.workProcess || []).map(function (wp) {
        return '<article class="process-step">' +
          '<div class="step-number">' + escHtml(wp.step) + '.</div>' +
          '<h3>' + escHtml(wp.title) + '</h3>' +
          '<p>' + escHtml(wp.description) + '</p>' +
        '</article>';
      }).join('');
    }

    // 9. Testimonials Slider
    var tstShell = document.getElementById('testimonials-shell');
    if (tstShell) {
      var list = state.testimonials || [];
      var currentIdx = 0;
      if (list.length === 0) {
        tstShell.innerHTML = '<div class="empty-state">No testimonials published yet.</div>';
      } else {
        tstShell.innerHTML =
          '<div class="testimonial-track">' +
            list.map(function (t, i) {
              var stars = '';
              for (var s = 0; s < (t.rating || 5); s++) stars += ICONS.star;
              return '<article class="testimonial-slide' + (i === 0 ? ' is-active' : '') + '">' +
                '<img src="' + escHtml(t.photo) + '" alt="' + escHtml(t.displayName || t.name) + '" class="testimonial-avatar" loading="lazy">' +
                '<div>' +
                  '<div class="testimonial-stars" aria-label="' + (t.rating || 5) + ' out of 5 stars">' + stars + '</div>' +
                  '<blockquote class="testimonial-quote">"' + escHtml(t.quote) + '"</blockquote>' +
                  '<div class="testimonial-author">' + escHtml(t.displayName || t.name) + '</div>' +
                  '<div class="testimonial-role">' + escHtml(t.role) + ' · ' + escHtml(t.company) + '</div>' +
                '</div>' +
              '</article>';
            }).join('') +
          '</div>' +
          '<div class="slider-controls">' +
            '<div class="slider-dots">' +
              list.map(function (_, i) {
                return '<button type="button" class="slider-dot' + (i === 0 ? ' is-active' : '') + '" data-slide-dot="' + i + '" aria-label="Go to testimonial ' + (i + 1) + '"></button>';
              }).join('') +
            '</div>' +
            '<div class="slider-arrows">' +
              '<button type="button" class="icon-btn" id="tst-prev" aria-label="Previous testimonial">' + ICONS.chevronLeft + '</button>' +
              '<button type="button" class="icon-btn" id="tst-next" aria-label="Next testimonial">' + ICONS.chevronRight + '</button>' +
            '</div>' +
          '</div>';

        var slides = tstShell.querySelectorAll('.testimonial-slide');
        var dots = tstShell.querySelectorAll('.slider-dot');
        function showSlide(next) {
          currentIdx = (next + list.length) % list.length;
          slides.forEach(function (sl, i) { sl.classList.toggle('is-active', i === currentIdx); });
          dots.forEach(function (dt, i) { dt.classList.toggle('is-active', i === currentIdx); });
        }
        tstShell.querySelector('#tst-prev').addEventListener('click', function () { showSlide(currentIdx - 1); });
        tstShell.querySelector('#tst-next').addEventListener('click', function () { showSlide(currentIdx + 1); });
        dots.forEach(function (dt) {
          dt.addEventListener('click', function () { showSlide(Number(dt.getAttribute('data-slide-dot'))); });
        });
      }
    }

    // 10. FAQ Accordion (10+ FAQs)
    var faqList = document.getElementById('faq-list');
    if (faqList) {
      faqList.innerHTML = (state.faqs || []).map(function (f, i) {
        return '<div class="faq-item' + (i === 0 ? ' is-open' : '') + '">' +
          '<button type="button" class="faq-question" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
            '<span>' + escHtml(f.question) + '</span>' + ICONS.chevronDown +
          '</button>' +
          '<div class="faq-answer">' + escHtml(f.answer) + '</div>' +
        '</div>';
      }).join('');

      faqList.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = btn.parentElement;
          var isOpen = item.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      });
    }

    // 11. Contact Info & Form
    renderContactDetails('contact-info-panel');
    bindLeadForm('home-contact-form');
  }

  function renderPricingSection(gridId, toggleId) {
    var grid = document.getElementById(gridId);
    var toggleWrap = document.getElementById(toggleId);
    if (!grid) return;

    var state = global.VeltrixStorage.getState();
    var currency = state.settings.currency || '₹';
    var billingMode = 'monthly';

    function formatAmount(val) {
      var num = Number(val);
      return currency === '₹' ? num.toLocaleString('en-IN') : num.toLocaleString();
    }

    function draw() {
      grid.innerHTML = (state.pricing || []).map(function (plan) {
        var price = billingMode === 'monthly' ? plan.monthlyPrice : plan.oneTimePrice;
        var isCustom = !!plan.customPricing || Number(price) === 0 || isNaN(Number(price));
        var cadence = billingMode === 'monthly' ? '/ month' : 'one-time sprint';
        var labelText = plan.tierLabel || (plan.recommended ? (plan.badgeText || 'MOST POPULAR') : '');
        return '<article class="pricing-card' + (plan.recommended ? ' is-recommended' : '') + '">' +
          '<div>' +
            '<div class="pricing-header">' +
              (labelText ? '<div class="' + (plan.recommended ? 'recommended-label' : 'tier-kicker') + '">' + escHtml(labelText) + '</div>' : '') +
              '<h3>' + escHtml(plan.name) + '</h3>' +
              '<p class="pricing-audience">' + escHtml(plan.audience) + '</p>' +
            '</div>' +
            '<div class="price-row">' +
              (isCustom
                ? '<span class="price-amount price-amount--custom">' + escHtml(plan.customPriceLabel || 'Custom Pricing') + '</span>'
                : '<span class="price-amount tabular-nums">' + escHtml(currency) + formatAmount(price) + '</span><span class="price-cadence">' + cadence + '</span>') +
            '</div>' +
            '<ul class="pricing-features" style="margin-top:20px;">' +
              (plan.features || []).map(function (feat) {
                return '<li class="pricing-feature-item">' + ICONS.check + '<span>' + escHtml(feat) + '</span></li>';
              }).join('') +
            '</ul>' +
            (plan.includedServices ? '<p class="pricing-included" style="margin-top:18px;"><strong>Includes:</strong> ' + escHtml(plan.includedServices) + '</p>' : '') +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:10px;">' +
            '<a href="/contact.html?plan=' + encodeURIComponent(plan.name) + '" class="btn ' + (plan.recommended ? 'btn-primary' : 'btn-secondary') + '" style="width:100%;">' + escHtml(plan.ctaText) + '</a>' +
            '<a href="' + buildWhatsAppUrl('Hi, I am interested in the ' + plan.name + (isCustom ? ' (Custom Pricing).' : ' (' + billingMode + ' billing).')) + '" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" style="width:100%;">Ask About ' + escHtml(plan.name) + ' on WhatsApp</a>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    if (toggleWrap) {
      toggleWrap.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          toggleWrap.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          billingMode = btn.getAttribute('data-billing');
          draw();
        });
      });
    }
    draw();
  }

  function renderContactDetails(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var s = global.VeltrixStorage.getState().settings;
    el.innerHTML =
      '<div class="contact-detail-list">' +
        '<div class="contact-detail-item">' + ICONS.mail + '<div><div class="contact-detail-label">Email Us</div><div class="contact-detail-val"><a href="mailto:' + escHtml(s.contactEmail) + '">' + escHtml(s.contactEmail) + '</a></div></div></div>' +
        '<div class="contact-detail-item">' + ICONS.phone + '<div><div class="contact-detail-label">Call Strategy Desk</div><div class="contact-detail-val"><a href="tel:' + escHtml(s.phoneNumber.replace(/[^0-9+]/g, '')) + '">' + escHtml(s.phoneNumber) + '</a></div></div></div>' +
        '<div class="contact-detail-item">' + ICONS.map + '<div><div class="contact-detail-label">Headquarters</div><div class="contact-detail-val">' + escHtml(s.businessAddress) + '</div></div></div>' +
      '</div>' +
      '<a href="' + buildWhatsAppUrl() + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%;">' + ICONS.whatsapp + '<span>Start Instant WhatsApp Chat</span></a>' +
      '<iframe class="map-frame" title="Agency Location Map" loading="lazy" src="' + escHtml(s.mapsEmbedUrl) + '"></iframe>';
  }

  /* ========================================================================
     Subpage Hydrators (About, Pricing, Contact)
     ======================================================================== */
  function renderStandalonePages() {
    var state = global.VeltrixStorage.getState();

    // About Page
    var aboutRoot = document.getElementById('about-page');
    if (aboutRoot) {
      updateSeoMeta({
        title: 'About ' + state.settings.websiteName + ' — Digital Marketing & AI Agency',
        description: state.about.intro
      });
      var abTarget = document.getElementById('about-page-body');
      if (abTarget) {
        var ab = state.about;
        abTarget.innerHTML =
          '<div class="about-grid">' +
            '<div class="about-media">' + renderImage(ab.image, ab.imageAlt) + '</div>' +
            '<div class="about-body">' +
              '<span class="section-kicker">' + escHtml(ab.kicker) + '</span>' +
              '<h2 class="section-title">' + escHtml(ab.headline) + '</h2>' +
              '<p style="color:var(--text-secondary);">' + escHtml(ab.intro) + '</p>' +
              '<p style="color:var(--text-secondary);">' + escHtml(ab.experience) + '</p>' +
              (ab.closing ? '<p style="color:var(--text-secondary);">' + escHtml(ab.closing) + '</p>' : '') +
              '<div class="about-pillars">' +
                '<div class="about-pillar"><h4>Our Mission</h4><p>' + escHtml(ab.mission) + '</p></div>' +
                '<div class="about-pillar"><h4>Our Vision</h4><p>' + escHtml(ab.vision) + '</p></div>' +
              '</div>' +
              '<div class="about-checklist">' +
                (ab.whyChooseUs || []).map(function (pt) {
                  return '<div class="about-check-item">' + ICONS.check + '<span>' + escHtml(pt) + '</span></div>';
                }).join('') +
              '</div>' +
              '<div class="about-metrics-grid">' +
                (ab.metrics || []).map(function (m) {
                  return '<div class="about-metric-card">' +
                    '<div class="about-metric-value mono-num">' + escHtml(m.value) + '</div>' +
                    '<div class="about-metric-label">' + escHtml(m.label) + '</div>' +
                    (m.sublabel ? '<div class="about-metric-sub">' + escHtml(m.sublabel) + '</div>' : '') +
                  '</div>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>';
      }
      var procEl = document.getElementById('about-process-grid');
      if (procEl) {
        procEl.innerHTML = (state.workProcess || []).map(function (wp) {
          return '<article class="process-step"><div class="step-number">' + escHtml(wp.step) + '.</div><h3>' + escHtml(wp.title) + '</h3><p>' + escHtml(wp.description) + '</p></article>';
        }).join('');
      }
    }

    // Pricing Page
    var pricingRoot = document.getElementById('pricing-page');
    if (pricingRoot) {
      updateSeoMeta({
        title: 'Pricing Plans — ' + state.settings.websiteName,
        description: 'Transparent monthly retainer and one-time sprint pricing for Digital Marketing, AI Automation, and Web Development.'
      });
      renderPricingSection('pricing-page-grid', 'pricing-page-toggle');
    }

    // Contact Page
    var contactRoot = document.getElementById('contact-page');
    if (contactRoot) {
      updateSeoMeta({
        title: 'Contact Us — ' + state.settings.websiteName,
        description: 'Schedule your free 30-minute Digital Marketing and AI Automation consultation with ' + state.settings.websiteName + '.'
      });
      renderContactDetails('contact-page-info');
      var params = new URLSearchParams(global.location.search);
      var planParam = params.get('plan');
      if (planParam) {
        var msgInput = document.querySelector('#contact-page-form [name="message"]');
        if (msgInput) msgInput.value = 'Interested in discussing the ' + planParam + '.';
      }
      bindLeadForm('contact-page-form');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!global.VeltrixStorage) return;
    global.VeltrixStorage.recordVisit();
    var state = global.VeltrixStorage.getState();
    applyThemeSettings(state.settings);
    renderHeaderAndFooter();
    renderHomepage();
    renderStandalonePages();
    bindNewsletterForms();
  });

  global.VeltrixUI = {
    escHtml: escHtml,
    getIcon: getIcon,
    renderImage: renderImage,
    toast: toast,
    buildWhatsAppUrl: buildWhatsAppUrl,
    updateSeoMeta: updateSeoMeta,
    bindLeadForm: bindLeadForm,
    bindNewsletterForms: bindNewsletterForms
  };
})(window);
