/**
 * Veltrix Growth — Admin Authentication & Full CMS Dashboard Controller
 */
(function (global) {
  'use strict';

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function adminToast(msg, type) {
    var box = document.getElementById('toast-container');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toast-container';
      box.className = 'toast-container';
      document.body.appendChild(box);
    }
    var el = document.createElement('div');
    el.className = 'toast ' + (type === 'error' ? 'toast--error' : 'toast--success');
    el.innerHTML = '<span>' + esc(msg) + '</span><button type="button" style="font-weight:700;">✕</button>';
    el.querySelector('button').addEventListener('click', function () { el.remove(); });
    box.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 4000);
  }

  function downloadFile(filename, content, mimeType) {
    var blob = new Blob([content], { type: mimeType || 'text/plain;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function splitLines(val) {
    return String(val || '')
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
  }

  function joinLines(arr) {
    return Array.isArray(arr) ? arr.join('\n') : '';
  }

  /* ========================================================================
     1. Login Page Controller
     ======================================================================== */
  function initLoginPage() {
    var form = document.getElementById('admin-login-form');
    if (!form) return;

    if (global.VeltrixStorage.getAdminSession()) {
      global.location.href = '/webluxe-portal/dashboard.html';
      return;
    }

    var fillBtn = document.getElementById('fill-demo-creds');
    if (fillBtn) {
      fillBtn.addEventListener('click', function () {
        document.getElementById('login-email').value = 'webluxeadmin@gmail.com';
        document.getElementById('login-password').value = 'WebluxeAdmin2026!';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value;
      var errEl = document.getElementById('login-error');

      if (!email || !password) {
        errEl.textContent = 'Please enter both email and password.';
        return;
      }

      var result = global.VeltrixStorage.loginDemoAdmin(email, password);
      if (result.ok) {
        global.location.href = '/webluxe-portal/dashboard.html';
      } else {
        errEl.textContent = result.error;
      }
    });
  }

  /* ========================================================================
     2. Dashboard Controller
     ======================================================================== */
  function initDashboardPage() {
    var app = document.getElementById('admin-dashboard-app');
    if (!app) return;

    var session = global.VeltrixStorage.getAdminSession();
    if (!session) {
      global.location.href = '/webluxe-portal/login.html';
      return;
    }

    var activeTab = 'overview';
    var viewport = document.getElementById('admin-viewport');
    var breadcrumbEl = document.getElementById('admin-breadcrumb-current');
    var sidebar = document.getElementById('admin-sidebar');

    // Mobile sidebar toggle
    var mobMenuBtn = document.getElementById('admin-mob-menu-btn');
    if (mobMenuBtn && sidebar) {
      mobMenuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('is-open');
      });
    }

    // Logout
    var logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        global.VeltrixStorage.logoutDemoAdmin();
        global.location.href = '/webluxe-portal/login.html';
      });
    }

    // Reset Demo Data
    var resetBtn = document.getElementById('admin-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (global.confirm('Reset all website content, leads, and settings back to the initial demo dataset?')) {
          global.VeltrixStorage.resetAll();
          adminToast('Demo dataset restored.');
          renderCurrentView();
        }
      });
    }

    // Modal Helper
    var modal = document.getElementById('admin-modal');
    var modalTitle = document.getElementById('admin-modal-title');
    var modalBody = document.getElementById('admin-modal-body');
    var closeModalBtn = document.getElementById('admin-modal-close');

    function openModal(title, bodyHtml, onBind) {
      modalTitle.textContent = title;
      modalBody.innerHTML = bodyHtml;
      modal.classList.add('is-open');
      if (onBind) onBind(modalBody, closeModal);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modalBody.innerHTML = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Sidebar Tab Navigation
    document.querySelectorAll('[data-admin-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeTab = btn.getAttribute('data-admin-tab');
        document.querySelectorAll('[data-admin-tab]').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (sidebar) sidebar.classList.remove('is-open');
        renderCurrentView();
      });
    });

    function updateSidebarCounts() {
      var st = global.VeltrixStorage.getState();
      var map = {
        leads: (st.leads || []).length,
        services: (st.services || []).length,
        portfolio: (st.portfolio || []).length,
        blogs: (st.blogs || []).length,
        testimonials: (st.testimonials || []).length,
        faqs: (st.faqs || []).length,
        subscribers: (st.subscribers || []).length,
        media: (st.mediaLibrary || []).length
      };
      Object.keys(map).forEach(function (k) {
        var el = document.querySelector('[data-count-badge="' + k + '"]');
        if (el) el.textContent = map[k];
      });
    }

    function renderCurrentView() {
      updateSidebarCounts();
      var state = global.VeltrixStorage.getState();
      var labels = {
        overview: 'Dashboard Overview',
        leads: 'Lead Management',
        services: 'Services Management',
        portfolio: 'Portfolio Case Studies',
        blogs: 'Blog & Categories',
        media: 'Image Manager',
        navbar: 'Navbar Management',
        hero: 'Hero Section',
        highlights: 'Highlights Cards',
        about: 'About Section',
        promo: 'Promotional Banner',
        pricing: 'Pricing Packages',
        process: 'Work Process',
        testimonials: 'Testimonials',
        faqs: 'FAQ Management',
        subscribers: 'Newsletter Subscribers',
        seo: 'SEO & Sitemap Tools',
        settings: 'Website-Wide Settings'
      };
      if (breadcrumbEl) breadcrumbEl.textContent = labels[activeTab] || 'Dashboard';

      switch (activeTab) {
        case 'overview': renderOverview(state); break;
        case 'leads': renderLeads(state); break;
        case 'services': renderServices(state); break;
        case 'portfolio': renderPortfolio(state); break;
        case 'blogs': renderBlogs(state); break;
        case 'media': renderMediaManager(state); break;
        case 'navbar': renderNavbarEditor(state); break;
        case 'hero': renderHeroEditor(state); break;
        case 'highlights': renderHighlightsEditor(state); break;
        case 'about': renderAboutEditor(state); break;
        case 'promo': renderPromoEditor(state); break;
        case 'pricing': renderPricingEditor(state); break;
        case 'process': renderProcessEditor(state); break;
        case 'testimonials': renderTestimonialsEditor(state); break;
        case 'faqs': renderFaqsEditor(state); break;
        case 'subscribers': renderSubscribers(state); break;
        case 'seo': renderSeoTools(state); break;
        case 'settings': renderSettingsEditor(state); break;
        default: renderOverview(state);
      }
    }

    /* ---------------- OVERVIEW ---------------- */
    function renderOverview(state) {
      var leads = state.leads || [];
      viewport.innerHTML =
        '<div class="kpi-grid">' +
          '<div class="kpi-card"><span class="kpi-label">Website Visitors (Demo)</span><strong class="kpi-value">' + Number(state.settings.visitorCount || 0).toLocaleString() + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Total Leads</span><strong class="kpi-value">' + leads.length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Total Services</span><strong class="kpi-value">' + (state.services || []).length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Portfolio Projects</span><strong class="kpi-value">' + (state.portfolio || []).length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Testimonials</span><strong class="kpi-value">' + (state.testimonials || []).length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Blog Posts</span><strong class="kpi-value">' + (state.blogs || []).length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Newsletter Subscribers</span><strong class="kpi-value">' + (state.subscribers || []).length + '</strong></div>' +
          '<div class="kpi-card"><span class="kpi-label">Published FAQs</span><strong class="kpi-value">' + (state.faqs || []).length + '</strong></div>' +
        '</div>' +

        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Recent Inbound Leads</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Submissions from homepage, service, and contact forms</p></div>' +
            '<button type="button" class="btn btn-secondary btn-sm" id="goto-leads-btn">Manage All Leads</button>' +
          '</div>' +
          (leads.length === 0 ? '<div class="empty-state">No leads captured yet.</div>' :
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Name</th><th>Service</th><th>Budget</th><th>Date</th><th>Status</th></tr></thead><tbody>' +
            leads.slice().reverse().slice(0, 6).map(function (l) {
              return '<tr><td><strong>' + esc(l.name) + '</strong><div style="font-size:0.8rem;color:var(--text-muted);">' + esc(l.email) + '</div></td><td>' + esc(l.service) + '</td><td class="mono-num">' + esc(l.budget) + '</td><td class="mono-num">' + esc(l.date) + '</td><td><span class="status-label status-label--active">' + esc(l.status) + '</span></td></tr>';
            }).join('') +
          '</tbody></table></div>') +
        '</div>';

      var gotoBtn = document.getElementById('goto-leads-btn');
      if (gotoBtn) {
        gotoBtn.addEventListener('click', function () {
          document.querySelector('[data-admin-tab="leads"]').click();
        });
      }
    }

    /* ---------------- LEADS MANAGEMENT ---------------- */
    function renderLeads(state) {
      var leads = state.leads || [];
      var services = state.services || [];
      var statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Closed'];

      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Lead Management System</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Search, filter by service, update status, or export CSV.</p></div>' +
            '<button type="button" class="btn btn-primary btn-sm" id="export-leads-csv">Export Leads CSV</button>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px;">' +
            '<input type="search" id="lead-search" class="input-control" style="max-width:280px;" placeholder="Search name, email, phone...">' +
            '<select id="lead-service-filter" class="input-control" style="max-width:240px;"><option value="">All Services</option>' +
              services.map(function (s) { return '<option value="' + esc(s.title) + '">' + esc(s.title) + '</option>'; }).join('') +
            '</select>' +
            '<select id="lead-status-filter" class="input-control" style="max-width:180px;"><option value="">All Statuses</option>' +
              statuses.map(function (st) { return '<option value="' + st + '">' + st + '</option>'; }).join('') +
            '</select>' +
          '</div>' +
          '<div id="leads-table-container"></div>' +
        '</div>';

      function drawTable() {
        var q = document.getElementById('lead-search').value.trim().toLowerCase();
        var srvFilter = document.getElementById('lead-service-filter').value;
        var stFilter = document.getElementById('lead-status-filter').value;
        var currentLeads = global.VeltrixStorage.getCollection('leads').slice().reverse();

        var filtered = currentLeads.filter(function (l) {
          var mQ = !q || l.name.toLowerCase().indexOf(q) >= 0 || l.email.toLowerCase().indexOf(q) >= 0 || (l.message || '').toLowerCase().indexOf(q) >= 0;
          var mSrv = !srvFilter || l.service === srvFilter;
          var mSt = !stFilter || l.status === stFilter;
          return mQ && mSrv && mSt;
        });

        var container = document.getElementById('leads-table-container');
        if (filtered.length === 0) {
          container.innerHTML = '<div class="empty-state">No leads match your current search or filter.</div>';
          return;
        }
        container.innerHTML =
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Lead</th><th>Phone</th><th>Service &amp; Budget</th><th>Message</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>' +
            filtered.map(function (l) {
              return '<tr>' +
                '<td><strong>' + esc(l.name) + '</strong><div style="font-size:0.8rem;color:var(--text-secondary);">' + esc(l.email) + '</div></td>' +
                '<td class="mono-num">' + esc(l.phone) + '</td>' +
                '<td><div>' + esc(l.service) + '</div><div class="mono-num" style="font-size:0.8rem;color:var(--text-muted);">' + esc(l.budget) + '</div></td>' +
                '<td style="max-width:240px;font-size:0.8125rem;color:var(--text-secondary);">' + esc(l.message) + '</td>' +
                '<td class="mono-num">' + esc(l.date) + '</td>' +
                '<td><select class="input-control" style="min-height:36px;padding:4px 8px;width:130px;" data-lead-status="' + esc(l.id) + '">' +
                  statuses.map(function (st) { return '<option value="' + st + '"' + (l.status === st ? ' selected' : '') + '>' + st + '</option>'; }).join('') +
                '</select></td>' +
                '<td><button type="button" class="btn btn-secondary btn-sm" data-delete-lead="' + esc(l.id) + '">Delete</button></td>' +
              '</tr>';
            }).join('') +
          '</tbody></table></div>';

        container.querySelectorAll('[data-lead-status]').forEach(function (sel) {
          sel.addEventListener('change', function () {
            global.VeltrixStorage.upsertItem('leads', { id: sel.getAttribute('data-lead-status'), status: sel.value });
            adminToast('Lead status updated to ' + sel.value);
          });
        });

        container.querySelectorAll('[data-delete-lead]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (global.confirm('Delete this lead permanently?')) {
              global.VeltrixStorage.deleteItem('leads', btn.getAttribute('data-delete-lead'));
              adminToast('Lead deleted.');
              updateSidebarCounts();
              drawTable();
            }
          });
        });
      }

      document.getElementById('lead-search').addEventListener('input', drawTable);
      document.getElementById('lead-service-filter').addEventListener('change', drawTable);
      document.getElementById('lead-status-filter').addEventListener('change', drawTable);
      document.getElementById('export-leads-csv').addEventListener('click', function () {
        var rows = global.VeltrixStorage.getCollection('leads');
        var csv = ['Name,Email,Phone,Service,Budget,Message,Date,Status'];
        rows.forEach(function (r) {
          csv.push([r.name, r.email, r.phone, r.service, r.budget, String(r.message || '').replace(/"/g, '""'), r.date, r.status].map(function (c) { return '"' + c + '"'; }).join(','));
        });
        downloadFile('webluxe-leads-' + new Date().toISOString().slice(0, 10) + '.csv', csv.join('\n'), 'text/csv');
        adminToast('Exported ' + rows.length + ' leads to CSV.');
      });
      drawTable();
    }

    /* ---------------- SERVICES CRUD ---------------- */
    function renderServices(state) {
      var list = (state.services || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Services Management (' + list.length + ')</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Add, edit, reorder, or publish services. Every service automatically generates its own landing page.</p></div>' +
            '<button type="button" class="btn btn-primary btn-sm" id="add-service-btn">+ Add Service</button>' +
          '</div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Order</th><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (s) {
              return '<tr>' +
                '<td class="mono-num">' + esc(s.order || 0) + '</td>' +
                '<td><strong>' + esc(s.title) + '</strong><div style="font-size:0.8rem;color:var(--text-muted);">/services/service.html?slug=' + esc(s.slug) + '</div></td>' +
                '<td>' + esc(s.category) + '</td>' +
                '<td><span class="status-label ' + (s.status === 'draft' ? 'status-label--muted' : 'status-label--active') + '">' + esc(s.status || 'published') + '</span></td>' +
                '<td class="table-actions">' +
                  '<a href="/services/service.html?slug=' + esc(s.slug) + '" target="_blank" class="btn btn-ghost btn-sm">View</a>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-edit-srv="' + esc(s.id) + '">Edit</button>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-del-srv="' + esc(s.id) + '">Delete</button>' +
                '</td>' +
              '</tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openServiceModal(existing) {
        var s = existing || {
          title: '', slug: '', category: 'Digital Marketing', icon: 'chart',
          image: '/images/banners/hero-agency.jpg', shortDescription: '', headline: '',
          overview: '', problems: [], solutions: [], benefits: [], features: [],
          pricingNote: '', seoTitle: '', seoDescription: '', status: 'published', order: list.length + 1
        };
        var media = global.VeltrixStorage.getCollection('mediaLibrary');

        openModal(existing ? 'Edit Service: ' + s.title : 'Add New Service',
          '<form id="srv-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Service Title *</label><input name="title" required class="input-control" value="' + esc(s.title) + '"></div>' +
              '<div class="form-group"><label class="form-label">URL Slug (auto if blank)</label><input name="slug" class="input-control" value="' + esc(s.slug) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Category</label><select name="category" class="input-control">' +
                ['Digital Marketing', 'AI Automation', 'Web Development'].map(function (c) { return '<option value="' + c + '"' + (s.category === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') +
              '</select></div>' +
              '<div class="form-group"><label class="form-label">Status &amp; Display Order</label><div style="display:flex;gap:8px;"><select name="status" class="input-control"><option value="published"' + (s.status !== 'draft' ? ' selected' : '') + '>published</option><option value="draft"' + (s.status === 'draft' ? ' selected' : '') + '>draft</option></select><input name="order" type="number" class="input-control" style="width:90px;" value="' + esc(s.order || 1) + '"></div></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Banner Image URL (or pick from Image Manager)</label><input name="image" class="input-control" list="media-urls-list" value="' + esc(s.image) + '">' +
              '<datalist id="media-urls-list">' + media.map(function (m) { return '<option value="' + esc(m.url) + '">' + esc(m.alt) + '</option>'; }).join('') + '</datalist>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Short Description *</label><textarea name="shortDescription" required class="input-control" style="min-height:70px;">' + esc(s.shortDescription) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Hero Headline</label><input name="headline" class="input-control" value="' + esc(s.headline) + '"></div>' +
            '<div class="form-group"><label class="form-label">Overview</label><textarea name="overview" class="input-control" style="min-height:80px;">' + esc(s.overview) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Customer Problems (1 per line)</label><textarea name="problems" class="input-control">' + esc(joinLines(s.problems)) + '</textarea></div>' +
              '<div class="form-group"><label class="form-label">Our Solutions (1 per line)</label><textarea name="solutions" class="input-control">' + esc(joinLines(s.solutions)) + '</textarea></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Key Benefits (1 per line)</label><textarea name="benefits" class="input-control">' + esc(joinLines(s.benefits)) + '</textarea></div>' +
              '<div class="form-group"><label class="form-label">Features (1 per line)</label><textarea name="features" class="input-control">' + esc(joinLines(s.features)) + '</textarea></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Pricing Note</label><input name="pricingNote" class="input-control" value="' + esc(s.pricingNote) + '"></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">SEO Title</label><input name="seoTitle" class="input-control" value="' + esc(s.seoTitle) + '"></div>' +
              '<div class="form-group"><label class="form-label">SEO Meta Description</label><input name="seoDescription" class="input-control" value="' + esc(s.seoDescription) + '"></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Service</button>' +
          '</form>',
          function (container, close) {
            container.querySelector('#srv-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              var title = String(fd.get('title')).trim();
              var slug = String(fd.get('slug')).trim() || global.VeltrixStorage.slugify(title);
              global.VeltrixStorage.upsertItem('services', {
                id: s.id || ('srv-' + Date.now()),
                title: title,
                slug: slug,
                category: fd.get('category'),
                icon: s.icon || 'chart',
                image: String(fd.get('image')).trim() || '/images/banners/hero-agency.jpg',
                shortDescription: String(fd.get('shortDescription')).trim(),
                headline: String(fd.get('headline')).trim() || title,
                overview: String(fd.get('overview')).trim() || String(fd.get('shortDescription')).trim(),
                problems: splitLines(fd.get('problems')),
                solutions: splitLines(fd.get('solutions')),
                benefits: splitLines(fd.get('benefits')),
                features: splitLines(fd.get('features')),
                pricingNote: String(fd.get('pricingNote')).trim(),
                seoTitle: String(fd.get('seoTitle')).trim() || (title + ' | Webluxe'),
                seoDescription: String(fd.get('seoDescription')).trim() || String(fd.get('shortDescription')).trim(),
                faqs: s.faqs || [],
                status: fd.get('status'),
                order: Number(fd.get('order')) || 1
              });
              close();
              adminToast('Service saved and live on frontend.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-service-btn').addEventListener('click', function () { openServiceModal(null); });
      viewport.querySelectorAll('[data-edit-srv]').forEach(function (b) {
        b.addEventListener('click', function () {
          var found = list.find(function (x) { return x.id === b.getAttribute('data-edit-srv'); });
          if (found) openServiceModal(found);
        });
      });
      viewport.querySelectorAll('[data-del-srv]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this service?')) {
            global.VeltrixStorage.deleteItem('services', b.getAttribute('data-del-srv'));
            adminToast('Service removed.');
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- PORTFOLIO CRUD ---------------- */
    function renderPortfolio(state) {
      var list = state.portfolio || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Portfolio Case Studies (' + list.length + ')</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Manage projects, cover &amp; gallery images, results, and SEO.</p></div>' +
            '<button type="button" class="btn btn-primary btn-sm" id="add-prj-btn">+ Add Case Study</button>' +
          '</div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Project</th><th>Industry</th><th>Category</th><th>Result</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (p) {
              return '<tr>' +
                '<td><strong>' + esc(p.title) + '</strong></td>' +
                '<td>' + esc(p.industry) + '</td>' +
                '<td>' + esc(p.category) + '</td>' +
                '<td class="mono-num" style="color:var(--color-kicker);">' + esc(p.result) + '</td>' +
                '<td><span class="status-label ' + (p.status === 'draft' ? 'status-label--muted' : 'status-label--active') + '">' + esc(p.status || 'published') + '</span></td>' +
                '<td class="table-actions">' +
                  '<a href="/portfolio/project.html?slug=' + esc(p.slug) + '" target="_blank" class="btn btn-ghost btn-sm">View</a>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-edit-prj="' + esc(p.id) + '">Edit</button>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-del-prj="' + esc(p.id) + '">Delete</button>' +
                '</td>' +
              '</tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openProjectModal(existing) {
        var p = existing || {
          title: '', slug: '', industry: '', category: 'Digital Marketing',
          coverImage: '/images/portfolio/saas-pipeline.jpg', gallery: [], shortDescription: '',
          result: '', clientOverview: '', introduction: '', challenges: [], objectives: [],
          strategy: '', servicesDelivered: [], executionProcess: [], results: [],
          seoTitle: '', seoDescription: '', status: 'published'
        };
        openModal(existing ? 'Edit Project: ' + p.title : 'Add Case Study',
          '<form id="prj-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Project Title *</label><input name="title" required class="input-control" value="' + esc(p.title) + '"></div>' +
              '<div class="form-group"><label class="form-label">URL Slug</label><input name="slug" class="input-control" value="' + esc(p.slug) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Industry *</label><input name="industry" required class="input-control" value="' + esc(p.industry) + '"></div>' +
              '<div class="form-group"><label class="form-label">Category</label><select name="category" class="input-control">' +
                ['Digital Marketing', 'AI Automation', 'Web Development'].map(function (c) { return '<option value="' + c + '"' + (p.category === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') +
              '</select></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Headline Result *</label><input name="result" required class="input-control" value="' + esc(p.result) + '"></div>' +
              '<div class="form-group"><label class="form-label">Status</label><select name="status" class="input-control"><option value="published"' + (p.status !== 'draft' ? ' selected' : '') + '>published</option><option value="draft"' + (p.status === 'draft' ? ' selected' : '') + '>draft</option></select></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Cover Image URL</label><input name="coverImage" class="input-control" value="' + esc(p.coverImage) + '"></div>' +
            '<div class="form-group"><label class="form-label">Gallery Image URLs (1 per line)</label><textarea name="gallery" class="input-control" style="min-height:70px;">' + esc(joinLines(p.gallery)) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Short Description *</label><textarea name="shortDescription" required class="input-control" style="min-height:70px;">' + esc(p.shortDescription) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Client Overview</label><textarea name="clientOverview" class="input-control" style="min-height:70px;">' + esc(p.clientOverview) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Strategy Summary</label><textarea name="strategy" class="input-control" style="min-height:70px;">' + esc(p.strategy) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Challenges (1 per line)</label><textarea name="challenges" class="input-control">' + esc(joinLines(p.challenges)) + '</textarea></div>' +
              '<div class="form-group"><label class="form-label">Objectives (1 per line)</label><textarea name="objectives" class="input-control">' + esc(joinLines(p.objectives)) + '</textarea></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Services Delivered (1 per line)</label><textarea name="servicesDelivered" class="input-control">' + esc(joinLines(p.servicesDelivered)) + '</textarea></div>' +
              '<div class="form-group"><label class="form-label">Measured Results (1 per line)</label><textarea name="results" class="input-control">' + esc(joinLines(p.results)) + '</textarea></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">SEO Title</label><input name="seoTitle" class="input-control" value="' + esc(p.seoTitle) + '"></div>' +
              '<div class="form-group"><label class="form-label">SEO Meta Description</label><input name="seoDescription" class="input-control" value="' + esc(p.seoDescription) + '"></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Case Study</button>' +
          '</form>',
          function (container, close) {
            container.querySelector('#prj-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              var title = String(fd.get('title')).trim();
              global.VeltrixStorage.upsertItem('portfolio', {
                id: p.id || ('prj-' + Date.now()),
                title: title,
                slug: String(fd.get('slug')).trim() || global.VeltrixStorage.slugify(title),
                industry: String(fd.get('industry')).trim(),
                category: fd.get('category'),
                coverImage: String(fd.get('coverImage')).trim() || '/images/portfolio/saas-pipeline.jpg',
                gallery: splitLines(fd.get('gallery')),
                shortDescription: String(fd.get('shortDescription')).trim(),
                result: String(fd.get('result')).trim(),
                clientOverview: String(fd.get('clientOverview')).trim() || String(fd.get('shortDescription')).trim(),
                introduction: p.introduction || String(fd.get('shortDescription')).trim(),
                strategy: String(fd.get('strategy')).trim(),
                challenges: splitLines(fd.get('challenges')),
                objectives: splitLines(fd.get('objectives')),
                servicesDelivered: splitLines(fd.get('servicesDelivered')),
                executionProcess: p.executionProcess || ['Audit & Discovery', 'Architecture & Implementation', 'Scaling & Reporting'],
                results: splitLines(fd.get('results')),
                seoTitle: String(fd.get('seoTitle')).trim() || (title + ' | Webluxe'),
                seoDescription: String(fd.get('seoDescription')).trim() || String(fd.get('shortDescription')).trim(),
                status: fd.get('status')
              });
              close();
              adminToast('Case study saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-prj-btn').addEventListener('click', function () { openProjectModal(null); });
      viewport.querySelectorAll('[data-edit-prj]').forEach(function (b) {
        b.addEventListener('click', function () {
          var found = list.find(function (x) { return x.id === b.getAttribute('data-edit-prj'); });
          if (found) openProjectModal(found);
        });
      });
      viewport.querySelectorAll('[data-del-prj]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this portfolio project?')) {
            global.VeltrixStorage.deleteItem('portfolio', b.getAttribute('data-del-prj'));
            adminToast('Project deleted.');
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- BLOG & CATEGORIES CRUD ---------------- */
    function renderBlogs(state) {
      var list = state.blogs || [];
      var cats = state.blogCategories || [];

      viewport.innerHTML =
        '<div class="admin-panel" style="margin-bottom:20px;">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Blog Posts (' + list.length + ')</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Create, edit, publish/unpublish, and optimize blog articles.</p></div>' +
            '<button type="button" class="btn btn-primary btn-sm" id="add-blog-btn">+ New Article</button>' +
          '</div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (b) {
              return '<tr>' +
                '<td><strong>' + esc(b.title) + '</strong></td>' +
                '<td>' + esc(b.category) + '</td>' +
                '<td>' + esc(b.author) + '</td>' +
                '<td class="mono-num">' + esc(b.date) + '</td>' +
                '<td><span class="status-label ' + (b.status === 'draft' ? 'status-label--muted' : 'status-label--active') + '">' + esc(b.status || 'published') + '</span></td>' +
                '<td class="table-actions">' +
                  '<a href="/blog/post.html?slug=' + esc(b.slug) + '" target="_blank" class="btn btn-ghost btn-sm">View</a>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-edit-blog="' + esc(b.id) + '">Edit</button>' +
                  '<button type="button" class="btn btn-secondary btn-sm" data-del-blog="' + esc(b.id) + '">Delete</button>' +
                '</td>' +
              '</tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>' +
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Blog Categories</h3></div>' +
          '<form id="add-blog-cat-form" style="display:flex;gap:10px;max-width:460px;margin-bottom:16px;">' +
            '<input type="text" name="catName" required class="input-control" placeholder="New category name...">' +
            '<button type="submit" class="btn btn-secondary btn-sm">Add Category</button>' +
          '</form>' +
          '<div style="display:flex;flex-wrap:wrap;gap:10px;">' +
            cats.map(function (c) {
              return '<div class="simple-card" style="padding:8px 14px;display:flex;align-items:center;gap:10px;"><span>' + esc(c) + '</span><button type="button" data-del-bcat="' + esc(c) + '" style="color:var(--color-danger-text);font-weight:700;">✕</button></div>';
            }).join('') +
          '</div>' +
        '</div>';

      document.getElementById('add-blog-cat-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = e.target.catName.value.trim();
        if (name && cats.indexOf(name) < 0) {
          cats.push(name);
          global.VeltrixStorage.updateSection('blogCategories', cats);
          adminToast('Category added.');
          renderCurrentView();
        }
      });

      viewport.querySelectorAll('[data-del-bcat]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-del-bcat');
          if (global.confirm('Remove category "' + target + '"?')) {
            global.VeltrixStorage.updateSection('blogCategories', cats.filter(function (c) { return c !== target; }));
            renderCurrentView();
          }
        });
      });

      function openBlogModal(existing) {
        var b = existing || {
          title: '', slug: '', category: cats[0] || 'AI Automation', author: 'Marcus Chen',
          date: new Date().toISOString().slice(0, 10), readTime: '5 min read',
          featuredImage: '/images/blog/ai-workflows.jpg', excerpt: '', content: '<p></p>',
          seoTitle: '', seoDescription: '', status: 'published'
        };
        openModal(existing ? 'Edit Article' : 'Publish New Article',
          '<form id="blog-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Article Title *</label><input name="title" required class="input-control" value="' + esc(b.title) + '"></div>' +
              '<div class="form-group"><label class="form-label">URL Slug</label><input name="slug" class="input-control" value="' + esc(b.slug) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Category</label><select name="category" class="input-control">' + cats.map(function (c) { return '<option value="' + esc(c) + '"' + (b.category === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select></div>' +
              '<div class="form-group"><label class="form-label">Author</label><input name="author" class="input-control" value="' + esc(b.author) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Publication Date</label><input name="date" type="date" class="input-control" value="' + esc(b.date) + '"></div>' +
              '<div class="form-group"><label class="form-label">Status</label><select name="status" class="input-control"><option value="published"' + (b.status !== 'draft' ? ' selected' : '') + '>published</option><option value="draft"' + (b.status === 'draft' ? ' selected' : '') + '>draft</option></select></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Featured Image URL</label><input name="featuredImage" class="input-control" value="' + esc(b.featuredImage) + '"></div>' +
            '<div class="form-group"><label class="form-label">Excerpt *</label><textarea name="excerpt" required class="input-control" style="min-height:70px;">' + esc(b.excerpt) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Article Body (HTML supported) *</label><textarea name="content" required class="input-control" style="min-height:140px;">' + esc(b.content) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">SEO Title</label><input name="seoTitle" class="input-control" value="' + esc(b.seoTitle) + '"></div>' +
              '<div class="form-group"><label class="form-label">SEO Description</label><input name="seoDescription" class="input-control" value="' + esc(b.seoDescription) + '"></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Article</button>' +
          '</form>',
          function (container, close) {
            container.querySelector('#blog-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              var title = String(fd.get('title')).trim();
              global.VeltrixStorage.upsertItem('blogs', {
                id: b.id || ('blg-' + Date.now()),
                title: title,
                slug: String(fd.get('slug')).trim() || global.VeltrixStorage.slugify(title),
                category: fd.get('category'),
                author: String(fd.get('author')).trim() || 'Editorial Team',
                date: fd.get('date') || new Date().toISOString().slice(0, 10),
                readTime: b.readTime || '5 min read',
                featuredImage: String(fd.get('featuredImage')).trim() || '/images/blog/ai-workflows.jpg',
                excerpt: String(fd.get('excerpt')).trim(),
                content: String(fd.get('content')).trim(),
                seoTitle: String(fd.get('seoTitle')).trim() || (title + ' | Webluxe'),
                seoDescription: String(fd.get('seoDescription')).trim() || String(fd.get('excerpt')).trim(),
                status: fd.get('status')
              });
              close();
              adminToast('Blog article saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-blog-btn').addEventListener('click', function () { openBlogModal(null); });
      viewport.querySelectorAll('[data-edit-blog]').forEach(function (b) {
        b.addEventListener('click', function () {
          var found = list.find(function (x) { return x.id === b.getAttribute('data-edit-blog'); });
          if (found) openBlogModal(found);
        });
      });
      viewport.querySelectorAll('[data-del-blog]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this blog post?')) {
            global.VeltrixStorage.deleteItem('blogs', b.getAttribute('data-del-blog'));
            adminToast('Article deleted.');
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- IMAGE MANAGER ---------------- */
    function renderMediaManager(state) {
      var media = state.mediaLibrary || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Image &amp; Media Manager (' + media.length + ')</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Upload local image files (saved in demo LocalStorage), edit alt text, replace, or copy asset URLs.</p></div>' +
          '</div>' +
          '<form id="upload-media-form" class="simple-card" style="margin-bottom:24px;">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Upload Image File (PNG/JPG/WebP)</label><input type="file" id="media-file-input" accept="image/*" class="input-control"></div>' +
              '<div class="form-group"><label class="form-label">Or External / Local Asset URL</label><input type="text" name="url" class="input-control" placeholder="/images/banners/hero-agency.jpg"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Image Alt Text *</label><input type="text" name="alt" required class="input-control" placeholder="Descriptive alt text for SEO"></div>' +
              '<div class="form-group"><label class="form-label">Category</label><select name="category" class="input-control"><option value="services">services</option><option value="portfolio">portfolio</option><option value="banners">banners</option><option value="blog">blog</option><option value="team">team</option></select></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary btn-sm">Add Image to Library</button>' +
          '</form>' +
          '<div class="media-grid">' +
            media.map(function (m) {
              return '<div class="media-item">' +
                '<div class="media-thumb"><img src="' + esc(m.url) + '" alt="' + esc(m.alt) + '"></div>' +
                '<div class="media-meta">' +
                  '<div style="color:var(--color-kicker);font-weight:600;">' + esc(m.category) + '</div>' +
                  '<input type="text" class="input-control" style="min-height:34px;font-size:0.8rem;" value="' + esc(m.alt) + '" data-alt-input="' + esc(m.id) + '" aria-label="Alt text">' +
                  '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
                    '<button type="button" class="btn btn-secondary btn-sm" data-save-alt="' + esc(m.id) + '">Save Alt</button>' +
                    '<button type="button" class="btn btn-ghost btn-sm" data-copy-media="' + esc(m.url) + '">Copy URL</button>' +
                    '<button type="button" class="btn btn-secondary btn-sm" data-del-media="' + esc(m.id) + '">Delete</button>' +
                  '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>';

      var uploadedDataUrl = '';
      var fileInput = document.getElementById('media-file-input');
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
          uploadedDataUrl = ev.target.result;
          adminToast('Image file loaded and ready to add.');
        };
        reader.readAsDataURL(file);
      });

      document.getElementById('upload-media-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        var url = uploadedDataUrl || String(fd.get('url')).trim();
        if (!url) {
          adminToast('Select an image file or provide an image URL.', 'error');
          return;
        }
        global.VeltrixStorage.upsertItem('mediaLibrary', {
          id: 'img-' + Date.now(),
          url: url,
          alt: String(fd.get('alt')).trim(),
          category: fd.get('category')
        });
        uploadedDataUrl = '';
        adminToast('Image added to library.');
        renderCurrentView();
      });

      viewport.querySelectorAll('[data-save-alt]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-save-alt');
          var altVal = viewport.querySelector('[data-alt-input="' + id + '"]').value.trim();
          global.VeltrixStorage.upsertItem('mediaLibrary', { id: id, alt: altVal });
          adminToast('Image alt text updated.');
        });
      });

      viewport.querySelectorAll('[data-copy-media]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(btn.getAttribute('data-copy-media'));
            adminToast('Image URL copied to clipboard.');
          }
        });
      });

      viewport.querySelectorAll('[data-del-media]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (global.confirm('Delete this image from the media library?')) {
            global.VeltrixStorage.deleteItem('mediaLibrary', btn.getAttribute('data-del-media'));
            adminToast('Image removed.');
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- NAVBAR EDITOR ---------------- */
    function renderNavbarEditor(state) {
      var nav = state.navbar;
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Navbar Management</h3></div>' +
          '<form id="nav-settings-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Primary Header CTA Text</label><input name="ctaLabel" class="input-control" value="' + esc(nav.ctaLabel) + '"></div>' +
              '<div class="form-group"><label class="form-label">Primary Header CTA URL</label><input name="ctaUrl" class="input-control" value="' + esc(nav.ctaUrl) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Navigation Links (Format: Label | URL per line)</label>' +
              '<textarea name="links" class="input-control" style="min-height:150px;">' + esc((nav.links || []).map(function (l) { return l.label + ' | ' + l.url; }).join('\n')) + '</textarea>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Save Navbar</button>' +
          '</form>' +
        '</div>';

      document.getElementById('nav-settings-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        var links = splitLines(fd.get('links')).map(function (line, i) {
          var parts = line.split('|');
          return { id: 'nav-' + (i + 1), label: (parts[0] || '').trim(), url: (parts[1] || '/index.html').trim() };
        });
        global.VeltrixStorage.updateSection('navbar', {
          ctaLabel: String(fd.get('ctaLabel')).trim(),
          ctaUrl: String(fd.get('ctaUrl')).trim(),
          links: links
        });
        adminToast('Navbar updated.');
      });
    }

    /* ---------------- HERO EDITOR ---------------- */
    function renderHeroEditor(state) {
      var h = state.hero;
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Hero Section Management</h3></div>' +
          '<form id="hero-editor-form">' +
            '<div class="form-group"><label class="form-label">Eyebrow Text</label><input name="eyebrow" class="input-control" value="' + esc(h.eyebrow) + '"></div>' +
            '<div class="form-group"><label class="form-label">Main Headline</label><input name="headline" required class="input-control" value="' + esc(h.headline) + '"></div>' +
            '<div class="form-group"><label class="form-label">Headline Highlight Phrase (Orange → Pink Gradient)</label><input name="headlineHighlight" class="input-control" value="' + esc(h.headlineHighlight || '') + '" placeholder="Precision Marketing &amp; AI Automation"></div>' +
            '<div class="form-group"><label class="form-label">Supporting Description</label><textarea name="description" class="input-control">' + esc(h.description) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Primary CTA Text</label><input name="primaryCtaText" class="input-control" value="' + esc(h.primaryCtaText) + '"></div>' +
              '<div class="form-group"><label class="form-label">Primary CTA URL</label><input name="primaryCtaUrl" class="input-control" value="' + esc(h.primaryCtaUrl) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Secondary CTA Text</label><input name="secondaryCtaText" class="input-control" value="' + esc(h.secondaryCtaText) + '"></div>' +
              '<div class="form-group"><label class="form-label">Secondary CTA URL</label><input name="secondaryCtaUrl" class="input-control" value="' + esc(h.secondaryCtaUrl) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Hero Image URL</label><input name="heroImage" class="input-control" value="' + esc(h.heroImage) + '"></div>' +
              '<div class="form-group"><label class="form-label">Hero Image Alt Text</label><input name="heroImageAlt" class="input-control" value="' + esc(h.heroImageAlt) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Trust Indicators (1 per line)</label><textarea name="trustItems" class="input-control">' + esc(joinLines(h.trustItems)) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary">Save Hero Section</button>' +
          '</form>' +
        '</div>';

      document.getElementById('hero-editor-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        global.VeltrixStorage.updateSection('hero', {
          eyebrow: String(fd.get('eyebrow')).trim(),
          headline: String(fd.get('headline')).trim(),
          headlineHighlight: String(fd.get('headlineHighlight')).trim(),
          description: String(fd.get('description')).trim(),
          primaryCtaText: String(fd.get('primaryCtaText')).trim(),
          primaryCtaUrl: String(fd.get('primaryCtaUrl')).trim(),
          secondaryCtaText: String(fd.get('secondaryCtaText')).trim(),
          secondaryCtaUrl: String(fd.get('secondaryCtaUrl')).trim(),
          heroImage: String(fd.get('heroImage')).trim(),
          heroImageAlt: String(fd.get('heroImageAlt')).trim(),
          trustItems: splitLines(fd.get('trustItems'))
        });
        adminToast('Hero section saved.');
      });
    }

    /* ---------------- HIGHLIGHTS CRUD ---------------- */
    function renderHighlightsEditor(state) {
      var list = state.highlights || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Highlights Cards (' + list.length + ')</h3><button type="button" class="btn btn-primary btn-sm" id="add-hl-btn">+ Add Card</button></div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (h) {
              return '<tr><td><strong>' + esc(h.title) + '</strong></td><td style="color:var(--text-secondary);">' + esc(h.description) + '</td><td class="table-actions"><button type="button" class="btn btn-secondary btn-sm" data-edit-hl="' + esc(h.id) + '">Edit</button><button type="button" class="btn btn-secondary btn-sm" data-del-hl="' + esc(h.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openHlModal(existing) {
        var item = existing || { title: '', description: '', icon: 'target' };
        openModal(existing ? 'Edit Highlight' : 'Add Highlight',
          '<form id="hl-form">' +
            '<div class="form-group"><label class="form-label">Title *</label><input name="title" required class="input-control" value="' + esc(item.title) + '"></div>' +
            '<div class="form-group"><label class="form-label">Icon</label><select name="icon" class="input-control"><option value="target">target</option><option value="cpu">cpu</option><option value="trending">trending</option><option value="shield">shield</option><option value="zap">zap</option></select></div>' +
            '<div class="form-group"><label class="form-label">Description *</label><textarea name="description" required class="input-control">' + esc(item.description) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Highlight</button>' +
          '</form>',
          function (c, close) {
            c.querySelector('[name="icon"]').value = item.icon || 'target';
            c.querySelector('#hl-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              global.VeltrixStorage.upsertItem('highlights', { id: item.id || ('hl-' + Date.now()), title: fd.get('title'), icon: fd.get('icon'), description: fd.get('description') });
              close();
              adminToast('Highlight saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-hl-btn').addEventListener('click', function () { openHlModal(null); });
      viewport.querySelectorAll('[data-edit-hl]').forEach(function (b) {
        b.addEventListener('click', function () { openHlModal(list.find(function (x) { return x.id === b.getAttribute('data-edit-hl'); })); });
      });
      viewport.querySelectorAll('[data-del-hl]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this highlight card?')) {
            global.VeltrixStorage.deleteItem('highlights', b.getAttribute('data-del-hl'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- ABOUT EDITOR ---------------- */
    function renderAboutEditor(state) {
      var ab = state.about;
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>About Section Management</h3></div>' +
          '<form id="about-editor-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Kicker</label><input name="kicker" class="input-control" value="' + esc(ab.kicker) + '"></div>' +
              '<div class="form-group"><label class="form-label">Headline</label><input name="headline" required class="input-control" value="' + esc(ab.headline) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Introduction</label><textarea name="intro" class="input-control">' + esc(ab.intro) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Approach / Strategy Paragraph</label><textarea name="experience" class="input-control">' + esc(ab.experience) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Closing Summary Paragraph</label><textarea name="closing" class="input-control">' + esc(ab.closing || '') + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Mission</label><textarea name="mission" class="input-control">' + esc(ab.mission) + '</textarea></div>' +
              '<div class="form-group"><label class="form-label">Vision</label><textarea name="vision" class="input-control">' + esc(ab.vision) + '</textarea></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Why Choose Us Points (1 per line)</label><textarea name="whyChooseUs" class="input-control">' + esc(joinLines(ab.whyChooseUs)) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Team Image URL</label><input name="image" class="input-control" value="' + esc(ab.image) + '"></div>' +
              '<div class="form-group"><label class="form-label">Image Alt Text</label><input name="imageAlt" class="input-control" value="' + esc(ab.imageAlt) + '"></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Save About Section</button>' +
          '</form>' +
        '</div>';

      document.getElementById('about-editor-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        global.VeltrixStorage.updateSection('about', {
          kicker: fd.get('kicker'), headline: fd.get('headline'), intro: fd.get('intro'),
          experience: fd.get('experience'), closing: fd.get('closing'), mission: fd.get('mission'), vision: fd.get('vision'),
          whyChooseUs: splitLines(fd.get('whyChooseUs')),
          image: fd.get('image'), imageAlt: fd.get('imageAlt')
        });
        adminToast('About section updated.');
      });
    }

    /* ---------------- PROMO BANNER EDITOR ---------------- */
    function renderPromoEditor(state) {
      var pb = state.promoBanner;
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Promotional Banner Management</h3></div>' +
          '<form id="promo-editor-form">' +
            '<div class="form-group"><label class="form-label">Offer Headline *</label><input name="headline" required class="input-control" value="' + esc(pb.headline) + '"></div>' +
            '<div class="form-group"><label class="form-label">Description</label><textarea name="description" class="input-control">' + esc(pb.description) + '</textarea></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">CTA Button Text</label><input name="ctaText" class="input-control" value="' + esc(pb.ctaText) + '"></div>' +
              '<div class="form-group"><label class="form-label">CTA URL</label><input name="ctaUrl" class="input-control" value="' + esc(pb.ctaUrl) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Banner Image URL</label><input name="image" class="input-control" value="' + esc(pb.image) + '"></div>' +
              '<div class="form-group"><label class="form-label">WhatsApp Button Text</label><input name="whatsappText" class="input-control" value="' + esc(pb.whatsappText) + '"></div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Save Promotional Banner</button>' +
          '</form>' +
        '</div>';

      document.getElementById('promo-editor-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        global.VeltrixStorage.updateSection('promoBanner', {
          headline: fd.get('headline'), description: fd.get('description'),
          ctaText: fd.get('ctaText'), ctaUrl: fd.get('ctaUrl'),
          image: fd.get('image'), whatsappText: fd.get('whatsappText')
        });
        adminToast('Promotional banner updated.');
      });
    }

    /* ---------------- PRICING CRUD ---------------- */
    function renderPricingEditor(state) {
      var list = state.pricing || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Pricing Packages (' + list.length + ')</h3><button type="button" class="btn btn-primary btn-sm" id="add-prc-btn">+ Add Plan</button></div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Plan</th><th>Monthly</th><th>One-Time</th><th>Recommended</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (p) {
              var cur = state.settings.currency || '₹';
              var mStr = p.customPricing ? (p.customPriceLabel || 'Custom Pricing') : cur + (cur === '₹' ? Number(p.monthlyPrice).toLocaleString('en-IN') : Number(p.monthlyPrice).toLocaleString());
              var oStr = p.customPricing ? (p.customPriceLabel || 'Custom Pricing') : cur + (cur === '₹' ? Number(p.oneTimePrice).toLocaleString('en-IN') : Number(p.oneTimePrice).toLocaleString());
              return '<tr><td><strong>' + esc(p.name) + '</strong><div style="font-size:0.8rem;color:var(--text-muted);">' + esc(p.tierLabel ? p.tierLabel + ' · ' : '') + esc(p.audience) + '</div></td><td class="mono-num">' + esc(mStr) + '</td><td class="mono-num">' + esc(oStr) + '</td><td>' + (p.recommended ? 'Yes' : 'No') + '</td><td class="table-actions"><button type="button" class="btn btn-secondary btn-sm" data-edit-prc="' + esc(p.id) + '">Edit</button><button type="button" class="btn btn-secondary btn-sm" data-del-prc="' + esc(p.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openPricingModal(existing) {
        var item = existing || { tierLabel: 'STARTER', name: '', audience: '', monthlyPrice: 9999, oneTimePrice: 24999, customPricing: false, customPriceLabel: 'Custom Pricing', recommended: false, badgeText: 'MOST POPULAR', ctaText: 'Get Started', includedServices: '', features: [] };
        openModal(existing ? 'Edit Plan: ' + item.name : 'Add Pricing Plan',
          '<form id="prc-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Plan Name *</label><input name="name" required class="input-control" value="' + esc(item.name) + '"></div>' +
              '<div class="form-group"><label class="form-label">Tier Eyebrow Label</label><input name="tierLabel" class="input-control" placeholder="e.g. STARTER / MOST POPULAR" value="' + esc(item.tierLabel || '') + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">CTA Button Text</label><input name="ctaText" class="input-control" value="' + esc(item.ctaText) + '"></div>' +
              '<div class="form-group"><label class="form-label">Target Audience</label><input name="audience" class="input-control" value="' + esc(item.audience) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Monthly Price (0 for Custom)</label><input name="monthlyPrice" type="number" required class="input-control" value="' + esc(item.monthlyPrice || 0) + '"></div>' +
              '<div class="form-group"><label class="form-label">One-Time Price (0 for Custom)</label><input name="oneTimePrice" type="number" required class="input-control" value="' + esc(item.oneTimePrice || 0) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Included Services Summary</label><input name="includedServices" class="input-control" value="' + esc(item.includedServices || '') + '"></div>' +
            '<div class="form-group"><label class="form-label">Features (1 per line)</label><textarea name="features" class="input-control">' + esc(joinLines(item.features)) + '</textarea></div>' +
            '<div class="form-grid-2" style="margin-bottom:14px;">' +
              '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" name="recommended"' + (item.recommended ? ' checked' : '') + '> <span>Mark as Popular / Recommended</span></label>' +
              '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" name="customPricing"' + (item.customPricing ? ' checked' : '') + '> <span>Custom Pricing (hide fixed amount)</span></label>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Pricing Plan</button>' +
          '</form>',
          function (c, close) {
            c.querySelector('#prc-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              var isCustom = !!fd.get('customPricing');
              global.VeltrixStorage.upsertItem('pricing', {
                id: item.id || ('prc-' + Date.now()),
                tierLabel: fd.get('tierLabel') || (fd.get('recommended') ? 'MOST POPULAR' : ''),
                name: fd.get('name'), audience: fd.get('audience'),
                monthlyPrice: isCustom ? 0 : Number(fd.get('monthlyPrice')),
                oneTimePrice: isCustom ? 0 : Number(fd.get('oneTimePrice')),
                customPricing: isCustom,
                customPriceLabel: 'Custom Pricing',
                includedServices: fd.get('includedServices'), features: splitLines(fd.get('features')),
                ctaText: fd.get('ctaText'), recommended: !!fd.get('recommended'), badgeText: fd.get('tierLabel') || 'MOST POPULAR'
              });
              close();
              adminToast('Pricing plan saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-prc-btn').addEventListener('click', function () { openPricingModal(null); });
      viewport.querySelectorAll('[data-edit-prc]').forEach(function (b) {
        b.addEventListener('click', function () { openPricingModal(list.find(function (x) { return x.id === b.getAttribute('data-edit-prc'); })); });
      });
      viewport.querySelectorAll('[data-del-prc]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this pricing plan?')) {
            global.VeltrixStorage.deleteItem('pricing', b.getAttribute('data-del-prc'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- WORK PROCESS CRUD ---------------- */
    function renderProcessEditor(state) {
      var list = state.workProcess || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Work Process Steps</h3><button type="button" class="btn btn-primary btn-sm" id="add-wp-btn">+ Add Step</button></div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Step</th><th>Title</th><th>Description</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (w) {
              return '<tr><td class="mono-num">' + esc(w.step) + '</td><td><strong>' + esc(w.title) + '</strong></td><td style="color:var(--text-secondary);">' + esc(w.description) + '</td><td class="table-actions"><button type="button" class="btn btn-secondary btn-sm" data-edit-wp="' + esc(w.id) + '">Edit</button><button type="button" class="btn btn-secondary btn-sm" data-del-wp="' + esc(w.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openWpModal(existing) {
        var item = existing || { step: '0' + (list.length + 1), title: '', description: '' };
        openModal(existing ? 'Edit Step' : 'Add Step',
          '<form id="wp-form">' +
            '<div class="form-group"><label class="form-label">Step Number</label><input name="step" class="input-control" value="' + esc(item.step) + '"></div>' +
            '<div class="form-group"><label class="form-label">Title *</label><input name="title" required class="input-control" value="' + esc(item.title) + '"></div>' +
            '<div class="form-group"><label class="form-label">Description *</label><textarea name="description" required class="input-control">' + esc(item.description) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Step</button>' +
          '</form>',
          function (c, close) {
            c.querySelector('#wp-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              global.VeltrixStorage.upsertItem('workProcess', { id: item.id || ('wp-' + Date.now()), step: fd.get('step'), title: fd.get('title'), description: fd.get('description') });
              close();
              adminToast('Work process step saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-wp-btn').addEventListener('click', function () { openWpModal(null); });
      viewport.querySelectorAll('[data-edit-wp]').forEach(function (b) {
        b.addEventListener('click', function () { openWpModal(list.find(function (x) { return x.id === b.getAttribute('data-edit-wp'); })); });
      });
      viewport.querySelectorAll('[data-del-wp]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this process step?')) {
            global.VeltrixStorage.deleteItem('workProcess', b.getAttribute('data-del-wp'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- TESTIMONIALS CRUD ---------------- */
    function renderTestimonialsEditor(state) {
      var list = state.testimonials || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Client Testimonials (' + list.length + ')</h3><button type="button" class="btn btn-primary btn-sm" id="add-tst-btn">+ Add Testimonial</button></div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Client</th><th>Company</th><th>Rating</th><th>Feedback</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (t) {
              return '<tr><td><strong>' + esc(t.displayName || t.name) + '</strong><div style="font-size:0.8rem;color:var(--text-muted);">' + esc(t.role) + '</div></td><td>' + esc(t.company) + '</td><td class="mono-num">' + (t.rating || 5) + '/5</td><td style="max-width:300px;color:var(--text-secondary);">' + esc(t.quote) + '</td><td class="table-actions"><button type="button" class="btn btn-secondary btn-sm" data-edit-tst="' + esc(t.id) + '">Edit</button><button type="button" class="btn btn-secondary btn-sm" data-del-tst="' + esc(t.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openTstModal(existing) {
        var item = existing || { displayName: '', role: '', company: '', photo: '/images/team/client-avatar.jpg', rating: 5, quote: '' };
        openModal(existing ? 'Edit Testimonial' : 'Add Testimonial',
          '<form id="tst-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Client Name *</label><input name="displayName" required class="input-control" value="' + esc(item.displayName || item.name) + '"></div>' +
              '<div class="form-group"><label class="form-label">Role</label><input name="role" class="input-control" value="' + esc(item.role) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Company *</label><input name="company" required class="input-control" value="' + esc(item.company) + '"></div>' +
              '<div class="form-group"><label class="form-label">Rating (1-5)</label><input name="rating" type="number" min="1" max="5" class="input-control" value="' + esc(item.rating || 5) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Photo URL</label><input name="photo" class="input-control" value="' + esc(item.photo) + '"></div>' +
            '<div class="form-group"><label class="form-label">Feedback Quote *</label><textarea name="quote" required class="input-control">' + esc(item.quote) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save Testimonial</button>' +
          '</form>',
          function (c, close) {
            c.querySelector('#tst-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              global.VeltrixStorage.upsertItem('testimonials', {
                id: item.id || ('tst-' + Date.now()),
                name: fd.get('displayName'), displayName: fd.get('displayName'),
                role: fd.get('role'), company: fd.get('company'),
                rating: Number(fd.get('rating')) || 5,
                photo: fd.get('photo') || '/images/team/client-avatar.jpg',
                quote: fd.get('quote')
              });
              close();
              adminToast('Testimonial saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-tst-btn').addEventListener('click', function () { openTstModal(null); });
      viewport.querySelectorAll('[data-edit-tst]').forEach(function (b) {
        b.addEventListener('click', function () { openTstModal(list.find(function (x) { return x.id === b.getAttribute('data-edit-tst'); })); });
      });
      viewport.querySelectorAll('[data-del-tst]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this testimonial?')) {
            global.VeltrixStorage.deleteItem('testimonials', b.getAttribute('data-del-tst'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- FAQ CRUD ---------------- */
    function renderFaqsEditor(state) {
      var list = state.faqs || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>FAQ Management (' + list.length + ')</h3><button type="button" class="btn btn-primary btn-sm" id="add-faq-btn">+ Add FAQ</button></div>' +
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Question</th><th>Answer</th><th>Actions</th></tr></thead><tbody>' +
            list.map(function (f) {
              return '<tr><td><strong>' + esc(f.question) + '</strong></td><td style="color:var(--text-secondary);">' + esc(f.answer) + '</td><td class="table-actions"><button type="button" class="btn btn-secondary btn-sm" data-edit-faq="' + esc(f.id) + '">Edit</button><button type="button" class="btn btn-secondary btn-sm" data-del-faq="' + esc(f.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>' +
        '</div>';

      function openFaqModal(existing) {
        var item = existing || { question: '', answer: '' };
        openModal(existing ? 'Edit FAQ' : 'Add FAQ',
          '<form id="faq-form">' +
            '<div class="form-group"><label class="form-label">Question *</label><input name="question" required class="input-control" value="' + esc(item.question) + '"></div>' +
            '<div class="form-group"><label class="form-label">Answer *</label><textarea name="answer" required class="input-control">' + esc(item.answer) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;">Save FAQ</button>' +
          '</form>',
          function (c, close) {
            c.querySelector('#faq-form').addEventListener('submit', function (e) {
              e.preventDefault();
              var fd = new FormData(e.target);
              global.VeltrixStorage.upsertItem('faqs', { id: item.id || ('faq-' + Date.now()), question: fd.get('question'), answer: fd.get('answer') });
              close();
              adminToast('FAQ saved.');
              renderCurrentView();
            });
          }
        );
      }

      document.getElementById('add-faq-btn').addEventListener('click', function () { openFaqModal(null); });
      viewport.querySelectorAll('[data-edit-faq]').forEach(function (b) {
        b.addEventListener('click', function () { openFaqModal(list.find(function (x) { return x.id === b.getAttribute('data-edit-faq'); })); });
      });
      viewport.querySelectorAll('[data-del-faq]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Delete this FAQ?')) {
            global.VeltrixStorage.deleteItem('faqs', b.getAttribute('data-del-faq'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- SUBSCRIBERS ---------------- */
    function renderSubscribers(state) {
      var subs = state.subscribers || [];
      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header">' +
            '<div><h3>Newsletter Subscribers (' + subs.length + ')</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Manage newsletter audience and export CSV.</p></div>' +
            '<button type="button" class="btn btn-primary btn-sm" id="export-subs-csv">Export Subscribers CSV</button>' +
          '</div>' +
          '<form id="add-sub-form" style="display:flex;gap:10px;max-width:460px;margin-bottom:18px;">' +
            '<input type="email" name="email" required class="input-control" placeholder="Add subscriber email...">' +
            '<button type="submit" class="btn btn-secondary btn-sm">Add</button>' +
          '</form>' +
          (subs.length === 0 ? '<div class="empty-state">No newsletter subscribers yet.</div>' :
          '<div class="table-scroll"><table class="data-table"><thead><tr><th>Email Address</th><th>Subscribed Date</th><th>Action</th></tr></thead><tbody>' +
            subs.map(function (s) {
              return '<tr><td><strong>' + esc(s.email) + '</strong></td><td class="mono-num">' + esc(s.date) + '</td><td><button type="button" class="btn btn-secondary btn-sm" data-del-sub="' + esc(s.id) + '">Delete</button></td></tr>';
            }).join('') +
          '</tbody></table></div>') +
        '</div>';

      document.getElementById('add-sub-form').addEventListener('submit', function (e) {
        e.preventDefault();
        global.VeltrixStorage.upsertItem('subscribers', { id: 'sub-' + Date.now(), email: e.target.email.value.trim(), date: new Date().toISOString().slice(0, 10) });
        adminToast('Subscriber added.');
        renderCurrentView();
      });

      document.getElementById('export-subs-csv').addEventListener('click', function () {
        var csv = ['Email,Date'].concat(subs.map(function (s) { return '"' + s.email + '","' + s.date + '"'; })).join('\n');
        downloadFile('webluxe-subscribers.csv', csv, 'text/csv');
      });

      viewport.querySelectorAll('[data-del-sub]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (global.confirm('Remove this subscriber?')) {
            global.VeltrixStorage.deleteItem('subscribers', b.getAttribute('data-del-sub'));
            renderCurrentView();
          }
        });
      });
    }

    /* ---------------- SEO & SITEMAP GENERATOR ---------------- */
    function renderSeoTools(state) {
      var s = state.settings;
      var origin = global.location.origin;
      var urls = [
        '/index.html', '/about.html', '/pricing.html', '/blog.html', '/contact.html'
      ];
      (state.services || []).filter(function (x) { return x.status !== 'draft'; }).forEach(function (srv) {
        urls.push('/services/service.html?slug=' + srv.slug);
      });
      (state.portfolio || []).filter(function (x) { return x.status !== 'draft'; }).forEach(function (prj) {
        urls.push('/portfolio/project.html?slug=' + prj.slug);
      });
      (state.blogs || []).filter(function (x) { return x.status !== 'draft'; }).forEach(function (blg) {
        urls.push('/blog/post.html?slug=' + blg.slug);
      });

      var sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        urls.map(function (u) { return '  <url><loc>' + origin + u + '</loc><changefreq>weekly</changefreq></url>'; }).join('\n') +
        '\n</urlset>';

      var robotsTxt = 'User-agent: *\nAllow: /\nDisallow: /webluxe-portal/\n\nSitemap: ' + origin + '/sitemap.xml\n# AI Search / LLM Context: ' + origin + '/llms.txt';

      var activeServices = (state.services || []).filter(function (x) { return x.status !== 'draft'; });
      var activeProjects = (state.portfolio || []).filter(function (x) { return x.status !== 'draft'; });
      var activeBlogs = (state.blogs || []).filter(function (x) { return x.status !== 'draft'; });

      var llmsTxt = [
        '# ' + s.websiteName,
        '',
        '> ' + s.defaultSeoDescription,
        '',
        '- Website: ' + origin + '/index.html',
        '- Phone / WhatsApp: ' + s.phoneNumber,
        '- Email: ' + s.contactEmail,
        '- Address: ' + s.businessAddress,
        '',
        '## Services (' + activeServices.length + ')',
        ''
      ].concat(
        activeServices.map(function (srv) {
          return '- [' + srv.title + '](' + origin + '/services/service.html?slug=' + srv.slug + '): ' + srv.shortDescription;
        }),
        ['', '## Case Studies (' + activeProjects.length + ')', ''],
        activeProjects.map(function (prj) {
          return '- [' + prj.title + '](' + origin + '/portfolio/project.html?slug=' + prj.slug + '): ' + prj.result + ' — ' + prj.shortDescription;
        }),
        ['', '## Blog & Insights (' + activeBlogs.length + ')', ''],
        activeBlogs.map(function (blg) {
          return '- [' + blg.title + '](' + origin + '/blog/post.html?slug=' + blg.slug + '): ' + blg.excerpt;
        })
      ).join('\n');

      viewport.innerHTML =
        '<div class="admin-panel" style="margin-bottom:20px;">' +
          '<div class="admin-panel-header"><h3>Default SEO &amp; OpenGraph Metadata</h3></div>' +
          '<form id="seo-defaults-form">' +
            '<div class="form-group"><label class="form-label">Default SEO Title</label><input name="defaultSeoTitle" class="input-control" value="' + esc(s.defaultSeoTitle) + '"></div>' +
            '<div class="form-group"><label class="form-label">Default Meta Description</label><textarea name="defaultSeoDescription" class="input-control">' + esc(s.defaultSeoDescription) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Default Keywords</label><input name="defaultSeoKeywords" class="input-control" value="' + esc(s.defaultSeoKeywords) + '"></div>' +
            '<button type="submit" class="btn btn-primary">Save Default SEO</button>' +
          '</form>' +
        '</div>' +
        '<div class="admin-panel" style="margin-bottom:20px;">' +
          '<div class="admin-panel-header"><div><h3>Dynamic XML Sitemap (' + urls.length + ' URLs) &amp; Robots.txt</h3></div><div style="display:flex;gap:10px;"><button type="button" id="dl-sitemap" class="btn btn-secondary btn-sm">Download sitemap.xml</button><button type="button" id="dl-robots" class="btn btn-secondary btn-sm">Download robots.txt</button></div></div>' +
          '<div class="form-grid-2">' +
            '<div><label class="form-label">Generated sitemap.xml</label><pre class="code-preview">' + esc(sitemapXml) + '</pre></div>' +
            '<div><label class="form-label">robots.txt</label><pre class="code-preview">' + esc(robotsTxt) + '</pre></div>' +
          '</div>' +
        '</div>' +
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><div><h3>AI SEO / AEO Context (llms.txt)</h3><p style="font-size:0.875rem;color:var(--text-secondary);">Machine-readable summary of all active services, case studies, and blog posts for LLM search engines.</p></div><div style="display:flex;gap:10px;"><a href="/llms.txt" target="_blank" class="btn btn-ghost btn-sm">View /llms.txt</a><button type="button" id="dl-llms" class="btn btn-secondary btn-sm">Download llms.txt</button></div></div>' +
          '<pre class="code-preview">' + esc(llmsTxt) + '</pre>' +
        '</div>';

      document.getElementById('seo-defaults-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        global.VeltrixStorage.updateSection('settings', {
          defaultSeoTitle: fd.get('defaultSeoTitle'),
          defaultSeoDescription: fd.get('defaultSeoDescription'),
          defaultSeoKeywords: fd.get('defaultSeoKeywords')
        });
        adminToast('Default SEO settings saved.');
      });
      document.getElementById('dl-sitemap').addEventListener('click', function () { downloadFile('sitemap.xml', sitemapXml, 'application/xml'); });
      document.getElementById('dl-robots').addEventListener('click', function () { downloadFile('robots.txt', robotsTxt, 'text/plain'); });
      document.getElementById('dl-llms').addEventListener('click', function () { downloadFile('llms.txt', llmsTxt, 'text/plain'); });
    }

    /* ---------------- WEBSITE SETTINGS, CONTACT, FOOTER, SOCIALS ---------------- */
    function renderSettingsEditor(state) {
      var s = state.settings;
      var f = state.footer;
      var socials = state.socialLinks || [];

      viewport.innerHTML =
        '<div class="admin-panel">' +
          '<div class="admin-panel-header"><h3>Website-Wide Settings, Contact &amp; Footer</h3></div>' +
          '<form id="site-settings-form">' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Website Name</label><input name="websiteName" class="input-control" value="' + esc(s.websiteName) + '"></div>' +
              '<div class="form-group"><label class="form-label">Header Logo Text</label><input name="logoText" class="input-control" value="' + esc(s.logoText) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Logo Mark Letter</label><input name="logoMark" maxlength="2" class="input-control" value="' + esc(s.logoMark) + '"></div>' +
              '<div class="form-group"><label class="form-label">Currency Symbol</label><input name="currency" maxlength="4" class="input-control" value="' + esc(s.currency) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Primary Purple Color</label><input name="primaryColor" type="color" class="input-control" style="height:44px;padding:4px;" value="' + esc(s.primaryColor || '#6C2BD9') + '"></div>' +
              '<div class="form-group"><label class="form-label">Secondary Coral Pink Color</label><input name="secondaryColor" type="color" class="input-control" style="height:44px;padding:4px;" value="' + esc(s.secondaryColor || '#FF4D6D') + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Accent Yellow Color</label><input name="cyanColor" type="color" class="input-control" style="height:44px;padding:4px;" value="' + esc(s.cyanColor || '#FFC300') + '"></div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">Contact Email</label><input name="contactEmail" type="email" class="input-control" value="' + esc(s.contactEmail) + '"></div>' +
              '<div class="form-group"><label class="form-label">Phone Number</label><input name="phoneNumber" class="input-control" value="' + esc(s.phoneNumber) + '"></div>' +
            '</div>' +
            '<div class="form-grid-2">' +
              '<div class="form-group"><label class="form-label">WhatsApp Number (digits only with country code)</label><input name="whatsappNumber" class="input-control" value="' + esc(s.whatsappNumber) + '"></div>' +
              '<div class="form-group"><label class="form-label">Business Address</label><input name="businessAddress" class="input-control" value="' + esc(s.businessAddress) + '"></div>' +
            '</div>' +
            '<div class="form-group"><label class="form-label">Map Embed URL</label><input name="mapsEmbedUrl" class="input-control" value="' + esc(s.mapsEmbedUrl) + '"></div>' +
            '<div class="form-group"><label class="form-label">Footer Company Description</label><textarea name="footerDescription" class="input-control">' + esc(f.description) + '</textarea></div>' +
            '<div class="form-group"><label class="form-label">Footer Copyright Text</label><input name="footerCopyright" class="input-control" value="' + esc(s.footerCopyright) + '"></div>' +
            '<div class="form-group"><label class="form-label">Social Media Links (Platform | URL per line)</label><textarea name="socialLinks" class="input-control">' + esc(socials.map(function (x) { return x.platform + ' | ' + x.url; }).join('\n')) + '</textarea></div>' +
            '<button type="submit" class="btn btn-primary">Save All Website Settings</button>' +
          '</form>' +
        '</div>';

      document.getElementById('site-settings-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        global.VeltrixStorage.updateSection('settings', {
          websiteName: fd.get('websiteName'),
          logoText: fd.get('logoText'),
          logoMark: fd.get('logoMark'),
          currency: fd.get('currency'),
          primaryColor: fd.get('primaryColor'),
          secondaryColor: fd.get('secondaryColor'),
          cyanColor: fd.get('cyanColor'),
          contactEmail: fd.get('contactEmail'),
          phoneNumber: fd.get('phoneNumber'),
          whatsappNumber: String(fd.get('whatsappNumber')).replace(/[^0-9]/g, ''),
          businessAddress: fd.get('businessAddress'),
          mapsEmbedUrl: fd.get('mapsEmbedUrl'),
          footerCopyright: fd.get('footerCopyright')
        });
        global.VeltrixStorage.updateSection('footer', { description: fd.get('footerDescription') });
        var parsedSocials = splitLines(fd.get('socialLinks')).map(function (line, idx) {
          var parts = line.split('|');
          return { id: 'soc-' + (idx + 1), platform: (parts[0] || '').trim(), url: (parts[1] || 'https://').trim() };
        });
        global.VeltrixStorage.updateSection('socialLinks', parsedSocials);
        adminToast('All website settings updated.');
      });
    }

    renderCurrentView();
  }

  function initAdminThemeToggle() {
    var btn = document.getElementById('admin-theme-toggle');
    if (!btn || !global.VeltrixTheme) return;
    var sunSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    var moonSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    function paint(mode) {
      btn.innerHTML = mode === 'light' ? (moonSvg + '<span>Dark</span>') : (sunSvg + '<span>Light</span>');
    }
    paint(global.VeltrixTheme.getTheme());
    btn.addEventListener('click', function () {
      paint(global.VeltrixTheme.toggleTheme());
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!global.VeltrixStorage) return;
    initAdminThemeToggle();
    initLoginPage();
    initDashboardPage();
  });
})(window);
