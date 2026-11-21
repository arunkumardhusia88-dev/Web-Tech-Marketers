/**
 * Veltrix Growth — Blog Listing & Article Detail Page Renderer
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (!global.VeltrixStorage || !global.VeltrixUI) return;
    var UI = global.VeltrixUI;
    var state = global.VeltrixStorage.getState();
    var posts = (state.blogs || []).filter(function (b) { return b.status !== 'draft'; });

    // 1. Blog Listing Page (/blog.html)
    var listGrid = document.getElementById('blog-listing-grid');
    if (listGrid) {
      UI.updateSeoMeta({
        title: 'Blog & Growth Insights | ' + state.settings.websiteName,
        description: 'Actionable playbooks on AI workflow automation, conversion rate optimization, paid acquisition, and technical SEO.'
      });

      var tabsWrap = document.getElementById('blog-category-tabs');
      var searchInput = document.getElementById('blog-search-input');
      var activeCat = 'All';

      if (tabsWrap) {
        var cats = ['All'].concat(state.blogCategories || []);
        tabsWrap.innerHTML = cats.map(function (c, i) {
          return '<button type="button" class="tab-btn' + (i === 0 ? ' is-active' : '') + '" data-cat="' + UI.escHtml(c) + '">' + UI.escHtml(c) + '</button>';
        }).join('');

        tabsWrap.querySelectorAll('.tab-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            tabsWrap.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            activeCat = btn.getAttribute('data-cat');
            drawList();
          });
        });
      }

      function drawList() {
        var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
        var filtered = posts.filter(function (p) {
          var catOk = activeCat === 'All' || p.category === activeCat;
          var qOk = !q || p.title.toLowerCase().indexOf(q) >= 0 || p.excerpt.toLowerCase().indexOf(q) >= 0;
          return catOk && qOk;
        });
        if (filtered.length === 0) {
          listGrid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">No articles match your search or category filter.</div>';
          return;
        }
        listGrid.innerHTML = filtered.map(function (post) {
          return '<article class="blog-card">' +
            '<div class="blog-card-thumb">' + UI.renderImage(post.featuredImage, post.title) + '</div>' +
            '<div class="blog-card-body">' +
              '<div class="meta-line"><span>' + UI.escHtml(post.category) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(post.date) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(post.readTime || '5 min read') + '</span></div>' +
              '<h3><a href="/blog/post.html?slug=' + UI.escHtml(post.slug) + '">' + UI.escHtml(post.title) + '</a></h3>' +
              '<p style="color:var(--text-secondary);font-size:0.9375rem;flex:1;">' + UI.escHtml(post.excerpt) + '</p>' +
              '<div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border-subtle);font-size:0.875rem;">' +
                '<span style="color:var(--text-muted);">By ' + UI.escHtml(post.author) + '</span>' +
                '<a href="/blog/post.html?slug=' + UI.escHtml(post.slug) + '" style="color:var(--color-link);font-weight:600;">Read Article →</a>' +
              '</div>' +
            '</div>' +
          '</article>';
        }).join('');
      }

      if (searchInput) searchInput.addEventListener('input', drawList);
      drawList();
    }

    // 2. Blog Detail Page (/blog/post.html)
    var postRoot = document.getElementById('blog-post-root');
    if (postRoot) {
      var params = new URLSearchParams(global.location.search);
      var slug = params.get('slug') || (posts[0] && posts[0].slug);
      var post = posts.find(function (p) { return p.slug === slug; }) || posts[0];

      if (!post) {
        postRoot.innerHTML = '<div class="container section"><div class="empty-state"><h2>Article Not Found</h2><a href="/blog.html" class="btn btn-primary" style="margin-top:14px;">Back to Blog</a></div></div>';
        return;
      }

      UI.updateSeoMeta({
        title: post.seoTitle || (post.title + ' | ' + state.settings.websiteName),
        description: post.seoDescription || post.excerpt,
        image: global.location.origin + post.featuredImage,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': post.title,
          'author': { '@type': 'Person', 'name': post.author },
          'datePublished': post.date,
          'description': post.excerpt
        }
      });

      var shareUrl = encodeURIComponent(global.location.href);
      var shareTitle = encodeURIComponent(post.title);
      var related = posts.filter(function (p) { return p.slug !== post.slug; }).slice(0, 3);

      postRoot.innerHTML =
        '<section class="page-hero">' +
          '<div class="container" style="max-width:920px;">' +
            '<nav class="breadcrumbs" aria-label="Breadcrumb">' +
              '<a href="/index.html">Home</a> <span aria-hidden="true">/</span> ' +
              '<a href="/blog.html">Blog</a> <span aria-hidden="true">/</span> ' +
              '<span>' + UI.escHtml(post.category) + '</span>' +
            '</nav>' +
            '<div class="meta-line" style="margin-bottom:14px;"><span>' + UI.escHtml(post.category) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(post.date) + '</span><span aria-hidden="true">·</span><span>By ' + UI.escHtml(post.author) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(post.readTime || '5 min read') + '</span></div>' +
            '<h1 class="display-title" style="margin-bottom:24px;">' + UI.escHtml(post.title) + '</h1>' +
            '<div style="border-radius:var(--radius-xl);overflow:hidden;border:1px solid var(--border-strong);aspect-ratio:16/9;">' +
              UI.renderImage(post.featuredImage, post.title) +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section class="section">' +
          '<div class="container" style="max-width:920px;">' +
            '<article class="prose">' + post.content + '</article>' +
            '<div style="margin-top:40px;padding-top:24px;border-top:1px solid var(--border-subtle);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;">' +
              '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">' +
                '<span style="font-size:0.9rem;color:var(--text-secondary);font-weight:600;">Share article:</span>' +
                '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">LinkedIn</a>' +
                '<a href="https://twitter.com/intent/tweet?url=' + shareUrl + '&text=' + shareTitle + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">X / Twitter</a>' +
                '<button type="button" id="copy-post-link" class="btn btn-secondary btn-sm">Copy Link</button>' +
              '</div>' +
              '<a href="/contact.html" class="btn btn-primary btn-sm">Book Free Strategy Audit</a>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section class="section section--alt">' +
          '<div class="container">' +
            '<div class="section-header"><span class="section-kicker">Keep Reading</span><h2 class="section-title">Related Articles</h2></div>' +
            '<div class="blog-grid">' +
              related.map(function (r) {
                return '<article class="blog-card">' +
                  '<div class="blog-card-thumb">' + UI.renderImage(r.featuredImage, r.title) + '</div>' +
                  '<div class="blog-card-body">' +
                    '<div class="meta-line"><span>' + UI.escHtml(r.category) + '</span><span aria-hidden="true">·</span><span>' + UI.escHtml(r.date) + '</span></div>' +
                    '<h3><a href="/blog/post.html?slug=' + UI.escHtml(r.slug) + '">' + UI.escHtml(r.title) + '</a></h3>' +
                    '<a href="/blog/post.html?slug=' + UI.escHtml(r.slug) + '" class="card-link-row">Read Article ' + UI.getIcon('arrowRight') + '</a>' +
                  '</div>' +
                '</article>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</section>';

      var copyBtn = document.getElementById('copy-post-link');
      if (copyBtn && navigator.clipboard) {
        copyBtn.addEventListener('click', function () {
          navigator.clipboard.writeText(global.location.href).then(function () {
            UI.toast('Article URL copied to clipboard.');
          });
        });
      }
    }
  });
})(window);
