/**
 * Veltrix Growth — Reusable Portfolio Case Study Detail Page Renderer
 * Reads ?slug=<project-slug> and renders full case study sections + SEO tags.
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('portfolio-detail-root');
    if (!root || !global.VeltrixStorage || !global.VeltrixUI) return;

    var UI = global.VeltrixUI;
    var state = global.VeltrixStorage.getState();
    var projects = (state.portfolio || []).filter(function (p) { return p.status !== 'draft'; });
    var params = new URLSearchParams(global.location.search);
    var slug = params.get('slug') || (projects[0] && projects[0].slug);

    var project = projects.find(function (p) { return p.slug === slug; }) || projects[0];

    if (!project) {
      root.innerHTML = '<div class="container section"><div class="empty-state"><h2>Case Study Not Found</h2><a href="/index.html#portfolio" class="btn btn-primary" style="margin-top:14px;">Back to Portfolio</a></div></div>';
      return;
    }

    UI.updateSeoMeta({
      title: project.seoTitle || (project.title + ' | ' + state.settings.websiteName),
      description: project.seoDescription || project.shortDescription,
      image: global.location.origin + project.coverImage,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        'name': project.title,
        'description': project.shortDescription,
        'genre': project.category
      }
    });

    var waProjectUrl = UI.buildWhatsAppUrl('Hi ' + state.settings.websiteName + ', I saw your "' + project.title + '" case study and want similar results for our company.');
    var floatWa = document.getElementById('floating-whatsapp-btn');
    if (floatWa) floatWa.href = waProjectUrl;

    var related = projects.filter(function (p) { return p.slug !== project.slug; }).slice(0, 3);

    root.innerHTML =
      '<section class="page-hero">' +
        '<div class="container">' +
          '<nav class="breadcrumbs" aria-label="Breadcrumb">' +
            '<a href="/index.html">Home</a> <span aria-hidden="true">/</span> ' +
            '<a href="/index.html#portfolio">Portfolio</a> <span aria-hidden="true">/</span> ' +
            '<strong style="color:var(--text-primary);">' + UI.escHtml(project.title) + '</strong>' +
          '</nav>' +
          '<div class="hero-grid">' +
            '<div class="hero-content">' +
              '<span class="hero-eyebrow">' + UI.escHtml(project.industry) + ' · ' + UI.escHtml(project.category) + '</span>' +
              '<h1 class="display-title">' + UI.escHtml(project.title) + '</h1>' +
              '<p class="hero-description">' + UI.escHtml(project.shortDescription) + '</p>' +
              '<div class="mono-num" style="font-size:1.35rem;font-weight:700;color:var(--color-kicker);">Outcome: ' + UI.escHtml(project.result) + '</div>' +
              '<div class="hero-ctas">' +
                '<a href="/contact.html" class="btn btn-primary">Start a Similar Project</a>' +
                '<a href="' + waProjectUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">' + UI.getIcon('whatsapp') + '<span>Discuss This Case Study</span></a>' +
              '</div>' +
            '</div>' +
            '<div class="hero-media">' + UI.renderImage(project.coverImage, project.title) + '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="container detail-layout">' +
          '<div>' +
            '<div class="detail-block" style="padding-top:0;">' +
              '<h2>Client Overview &amp; Introduction</h2>' +
              '<p class="prose" style="margin-bottom:14px;">' + UI.escHtml(project.clientOverview) + '</p>' +
              '<p class="prose">' + UI.escHtml(project.introduction) + '</p>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Challenges &amp; Objectives</h2>' +
              '<div class="two-col-list">' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;color:var(--color-danger-text);">Key Challenges</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (project.challenges || []).map(function (c) { return '<li>• ' + UI.escHtml(c) + '</li>'; }).join('') +
                  '</ul>' +
                '</div>' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;color:var(--color-kicker);">Project Objectives</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (project.objectives || []).map(function (o) { return '<li>✓ ' + UI.escHtml(o) + '</li>'; }).join('') +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Marketing &amp; Automation Strategy</h2>' +
              '<p class="prose">' + UI.escHtml(project.strategy) + '</p>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Execution Process</h2>' +
              '<div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">' +
                (project.executionProcess || []).map(function (step, i) {
                  return '<div class="simple-card"><span class="mono-num" style="color:var(--color-kicker);font-weight:600;">Phase ' + (i + 1) + ':</span> <span style="color:var(--text-primary);">' + UI.escHtml(step) + '</span></div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Measured Results &amp; Achievements</h2>' +
              '<div class="two-col-list">' +
                (project.results || []).map(function (r) {
                  return '<div class="simple-card" style="display:flex;gap:10px;align-items:flex-start;">' + UI.getIcon('trending') + '<strong style="color:var(--text-primary);">' + UI.escHtml(r) + '</strong></div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Project Gallery</h2>' +
              '<div class="gallery-grid">' +
                (project.gallery || [project.coverImage]).map(function (imgUrl, i) {
                  return UI.renderImage(imgUrl, project.title + ' gallery view ' + (i + 1));
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +

          '<aside class="detail-sidebar">' +
            '<div class="simple-card">' +
              '<h3 style="font-size:1.15rem;margin-bottom:14px;">Services Delivered</h3>' +
              '<ul style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">' +
                (project.servicesDelivered || []).map(function (srvName) {
                  var matched = (state.services || []).find(function (s) { return s.title === srvName; });
                  if (matched) {
                    return '<li><a href="/services/service.html?slug=' + UI.escHtml(matched.slug) + '" class="card-link-row" style="padding-top:0;border-top:none;">' + UI.escHtml(srvName) + ' ' + UI.getIcon('arrowRight') + '</a></li>';
                  }
                  return '<li style="color:var(--text-secondary);">• ' + UI.escHtml(srvName) + '</li>';
                }).join('') +
              '</ul>' +
              '<a href="/contact.html" class="btn btn-primary" style="width:100%;">Request Similar Build</a>' +
              '<a href="' + waProjectUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%;margin-top:10px;">' + UI.getIcon('whatsapp') + '<span>WhatsApp Strategy Team</span></a>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</section>' +

      '<section class="section section--alt">' +
        '<div class="container">' +
          '<div class="section-header">' +
            '<span class="section-kicker">More Client Outcomes</span>' +
            '<h2 class="section-title">Related Case Studies</h2>' +
          '</div>' +
          '<div class="portfolio-grid">' +
            related.map(function (p) {
              return '<article class="portfolio-card">' +
                '<div class="portfolio-thumb">' + UI.renderImage(p.coverImage, p.title) + '</div>' +
                '<div class="portfolio-body">' +
                  '<div class="meta-line"><span>' + UI.escHtml(p.industry) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(p.category) + '</span></div>' +
                  '<h3>' + UI.escHtml(p.title) + '</h3>' +
                  '<div class="portfolio-result-row">' +
                    '<span class="result-highlight">' + UI.escHtml(p.result) + '</span>' +
                    '<a href="/portfolio/project.html?slug=' + UI.escHtml(p.slug) + '" class="btn btn-secondary btn-sm">View Case Study</a>' +
                  '</div>' +
                '</div>' +
              '</article>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>';
  });
})(window);
