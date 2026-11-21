/**
 * Veltrix Growth — Reusable Dynamic Service Landing Page Renderer
 * Reads ?slug=<service-slug> and populates all 17 service landing sections
 * plus dynamic SEO metadata, OpenGraph tags, Breadcrumbs, and Schema.org JSON-LD.
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('service-detail-root');
    if (!root || !global.VeltrixStorage || !global.VeltrixUI) return;

    var UI = global.VeltrixUI;
    var state = global.VeltrixStorage.getState();
    var services = (state.services || []).filter(function (s) { return s.status !== 'draft'; });
    var params = new URLSearchParams(global.location.search);
    var slug = params.get('slug') || (services[0] && services[0].slug);

    var service = services.find(function (s) { return s.slug === slug; }) || services[0];

    if (!service) {
      root.innerHTML = '<div class="container section"><div class="empty-state"><h2>Service Not Found</h2><p style="margin-block:12px;">The requested service could not be located.</p><a href="/index.html#services" class="btn btn-primary">Browse All Services</a></div></div>';
      return;
    }

    // Update SEO + Schema.org Service JSON-LD
    UI.updateSeoMeta({
      title: service.seoTitle || (service.title + ' | ' + state.settings.websiteName),
      description: service.seoDescription || service.shortDescription,
      image: global.location.origin + service.image,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.title,
        'serviceType': service.category,
        'description': service.seoDescription || service.shortDescription,
        'provider': {
          '@type': 'Organization',
          'name': state.settings.websiteName
        }
      }
    });

    // Update floating WhatsApp message for this specific service
    var floatWa = document.getElementById('floating-whatsapp-btn');
    if (floatWa) {
      floatWa.href = UI.buildWhatsAppUrl('Hi ' + state.settings.websiteName + ', I want to discuss ' + service.title + ' for my business.');
    }

    // Relevant portfolio projects
    var relevantProjects = (state.portfolio || []).filter(function (p) {
      return p.status !== 'draft' && (p.category === service.category || (p.servicesDelivered || []).indexOf(service.title) >= 0);
    }).slice(0, 3);
    if (relevantProjects.length === 0) {
      relevantProjects = (state.portfolio || []).filter(function (p) { return p.status !== 'draft'; }).slice(0, 2);
    }

    // Related services
    var relatedServices = services.filter(function (s) { return s.category === service.category && s.slug !== service.slug; }).slice(0, 3);

    var waServiceLink = UI.buildWhatsAppUrl('Hello! I would like a custom quote for ' + service.title + '.');

    root.innerHTML =
      '<section class="page-hero">' +
        '<div class="container">' +
          '<nav class="breadcrumbs" aria-label="Breadcrumb">' +
            '<a href="/index.html">Home</a> <span aria-hidden="true">/</span> ' +
            '<a href="/index.html#services">Services</a> <span aria-hidden="true">/</span> ' +
            '<span>' + UI.escHtml(service.category) + '</span> <span aria-hidden="true">/</span> ' +
            '<strong style="color:var(--text-primary);">' + UI.escHtml(service.title) + '</strong>' +
          '</nav>' +
          '<div class="hero-grid">' +
            '<div class="hero-content">' +
              '<span class="hero-eyebrow">' + UI.escHtml(service.category) + '</span>' +
              '<h1 class="display-title">' + UI.escHtml(service.headline || service.title) + '</h1>' +
              '<p class="hero-description">' + UI.escHtml(service.shortDescription) + '</p>' +
              '<div class="hero-ctas">' +
                '<a href="#service-contact" class="btn btn-primary">Get Started With ' + UI.escHtml(service.title) + '</a>' +
                '<a href="' + waServiceLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">' + UI.getIcon('whatsapp') + '<span>WhatsApp Enquiry</span></a>' +
              '</div>' +
            '</div>' +
            '<div class="hero-media">' + UI.renderImage(service.image, service.title) + '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="container detail-layout">' +
          '<div>' +
            '<div class="detail-block" style="padding-top:0;">' +
              '<h2>Service Overview</h2>' +
              '<p class="prose">' + UI.escHtml(service.overview) + '</p>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Problems We Solve &amp; Our Engineered Solution</h2>' +
              '<div class="two-col-list">' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;color:var(--color-danger-text);">Common Bottlenecks</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (service.problems || []).map(function (p) { return '<li>• ' + UI.escHtml(p) + '</li>'; }).join('') +
                  '</ul>' +
                '</div>' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;color:var(--color-kicker);">Our Solutions</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (service.solutions || []).map(function (sol) { return '<li>✓ ' + UI.escHtml(sol) + '</li>'; }).join('') +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Key Business Benefits &amp; Included Features</h2>' +
              '<div class="two-col-list">' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;">Measurable Benefits</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (service.benefits || []).map(function (b) { return '<li style="display:flex;gap:8px;">' + UI.getIcon('check') + '<span>' + UI.escHtml(b) + '</span></li>'; }).join('') +
                  '</ul>' +
                '</div>' +
                '<div class="simple-card">' +
                  '<h3 style="font-size:1.05rem;margin-bottom:12px;">Deliverable Features</h3>' +
                  '<ul style="display:flex;flex-direction:column;gap:10px;font-size:0.9375rem;color:var(--text-secondary);">' +
                    (service.features || []).map(function (f) { return '<li style="display:flex;gap:8px;">' + UI.getIcon('check') + '<span>' + UI.escHtml(f) + '</span></li>'; }).join('') +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Our Working Process</h2>' +
              '<div class="two-col-list">' +
                (state.workProcess || []).map(function (wp) {
                  return '<div class="simple-card"><div class="step-number">' + UI.escHtml(wp.step) + '.</div><h3 style="font-size:1.05rem;margin-block:6px;">' + UI.escHtml(wp.title) + '</h3><p style="font-size:0.9rem;color:var(--text-secondary);">' + UI.escHtml(wp.description) + '</p></div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Why Choose ' + UI.escHtml(state.settings.websiteName) + '</h2>' +
              '<div class="two-col-list">' +
                (state.about.whyChooseUs || []).map(function (reason) {
                  return '<div class="simple-card" style="display:flex;gap:10px;align-items:flex-start;">' + UI.getIcon('shield') + '<span style="font-size:0.9375rem;">' + UI.escHtml(reason) + '</span></div>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Relevant Portfolio Results</h2>' +
              '<div class="two-col-list">' +
                relevantProjects.map(function (p) {
                  return '<article class="portfolio-card">' +
                    '<div class="portfolio-thumb">' + UI.renderImage(p.coverImage, p.title) + '</div>' +
                    '<div class="portfolio-body">' +
                      '<div class="meta-line"><span>' + UI.escHtml(p.industry) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(p.result) + '</span></div>' +
                      '<h3 style="font-size:1.05rem;">' + UI.escHtml(p.title) + '</h3>' +
                      '<a href="/portfolio/project.html?slug=' + UI.escHtml(p.slug) + '" class="card-link-row">View Case Study ' + UI.getIcon('arrowRight') + '</a>' +
                    '</div>' +
                  '</article>';
                }).join('') +
              '</div>' +
            '</div>' +

            '<div class="detail-block">' +
              '<h2>Service FAQs</h2>' +
              '<div class="faq-list" id="service-faq-list">' +
                (service.faqs || []).map(function (f, i) {
                  return '<div class="faq-item' + (i === 0 ? ' is-open' : '') + '">' +
                    '<button type="button" class="faq-question" aria-expanded="' + (i === 0 ? 'true' : 'false') + '"><span>' + UI.escHtml(f.q) + '</span>' + UI.getIcon('chevronDown') + '</button>' +
                    '<div class="faq-answer">' + UI.escHtml(f.a) + '</div>' +
                  '</div>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +

          '<aside class="detail-sidebar" id="service-contact">' +
            '<div class="form-card">' +
              '<span class="section-kicker" style="margin-bottom:4px;">Pricing &amp; Custom Quote</span>' +
              '<h3 style="font-size:1.25rem;margin-bottom:8px;">Request ' + UI.escHtml(service.title) + ' Proposal</h3>' +
              '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:18px;">' + UI.escHtml(service.pricingNote) + '</p>' +
              '<form id="service-lead-form">' +
                '<div class="form-group"><label class="form-label" for="srv-name">Full Name *</label><input id="srv-name" name="name" type="text" required class="input-control" placeholder="Rohan Sharma"></div>' +
                '<div class="form-group"><label class="form-label" for="srv-email">Work Email *</label><input id="srv-email" name="email" type="email" required class="input-control" placeholder="rohan@company.in"></div>' +
                '<div class="form-group"><label class="form-label" for="srv-phone">Phone / WhatsApp *</label><input id="srv-phone" name="phone" type="tel" required class="input-control" placeholder="9115277587"></div>' +
                '<div class="form-group"><label class="form-label" for="srv-service">Service</label><select id="srv-service" name="service" class="input-control"><option value="' + UI.escHtml(service.title) + '" selected>' + UI.escHtml(service.title) + '</option></select></div>' +
                '<div class="form-group"><label class="form-label" for="srv-budget">Monthly Budget</label><select id="srv-budget" name="budget" class="input-control"><option value="Launch Plan (₹9,999/mo)">Launch Plan (₹9,999/mo)</option><option value="Growth Plan (₹19,999/mo)">Growth Plan (₹19,999/mo)</option><option value="Scale Plan (Custom Pricing)">Scale Plan (Custom Pricing)</option></select></div>' +
                '<div class="form-group"><label class="form-label" for="srv-msg">Project Goals *</label><textarea id="srv-msg" name="message" required class="input-control" placeholder="Share your target KPIs and timeline..."></textarea></div>' +
                '<div data-form-feedback style="font-size:0.85rem;margin-bottom:12px;"></div>' +
                '<button type="submit" class="btn btn-primary" style="width:100%;">Request Proposal</button>' +
              '</form>' +
              '<a href="' + waServiceLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%;margin-top:12px;">' + UI.getIcon('whatsapp') + '<span>Discuss on WhatsApp</span></a>' +
            '</div>' +

            '<div class="simple-card">' +
              '<h4 style="font-size:1rem;margin-bottom:14px;">Related Services</h4>' +
              '<div style="display:flex;flex-direction:column;gap:10px;">' +
                relatedServices.map(function (rs) {
                  return '<a href="/services/service.html?slug=' + UI.escHtml(rs.slug) + '" class="card-link-row" style="padding-top:0;border-top:none;">' + UI.escHtml(rs.title) + ' ' + UI.getIcon('arrowRight') + '</a>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</section>';

    // Bind FAQ toggles & Lead Form
    root.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    UI.bindLeadForm('service-lead-form', service.title);
  });
})(window);
