/**
 * Blog management front end (Wix CMS `blog_posts` collection)
 * -----------------------------------------------------------
 * One module drives both pages:
 *   - blog.html  → featured story, search, category filter, paginated grid
 *   - post.html  → single article (?slug=...), related stories, share
 *
 * Posts are authored in the Wix Content Manager — no code needed to publish.
 */
import { media } from '@wix/sdk';
import { wixClient } from './wixClient.js';
import { FALLBACK_POSTS } from './blog-data.js';

const COLLECTION = 'blog_posts';
const PAGE_SIZE = 6;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const $ = (id) => document.getElementById(id);

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/** Resolve any Wix image field shape (or plain URL) to a public URL. */
function resolveImage(value) {
  if (!value) return '';
  if (typeof value === 'object') return resolveImage(value.url || value.src || value.id || '');
  if (typeof value !== 'string') return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('/') || value.startsWith('./') || value.startsWith('data:')) {
    return value;
  }
  const m = value.match(/^(?:wix:)?image:\/\/v1\/([^/#]+)/);
  if (m) return `https://static.wixstatic.com/media/${m[1]}`;
  try {
    return media.getImageUrl(value)?.url || '';
  } catch {
    return '';
  }
}

/** Strip scripts, iframes, inline handlers and javascript: URLs from CMS HTML. */
function sanitizeHtml(html = '') {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  doc.querySelectorAll('script, style, iframe, object, embed, link, meta, form').forEach((n) => n.remove());
  doc.body.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const val = attr.value.trim().toLowerCase();
      if (name.startsWith('on') || ((name === 'href' || name === 'src') && val.startsWith('javascript:'))) {
        el.removeAttribute(attr.name);
      }
    });
    if (el.tagName === 'A' && el.getAttribute('target') === '_blank') {
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });
  return doc.body.firstElementChild.innerHTML;
}

function stripTags(html = '') {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
}

function toDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
}

function formatDate(value) {
  const d = toDate(value);
  if (!d) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function readingTime(html) {
  const words = stripTags(html).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugify(s = '') {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function postUrl(post) {
  return `post.html?slug=${encodeURIComponent(post.slug)}`;
}

/** Normalise a Wix item (or fallback) into a predictable shape. */
function normalise(raw) {
  const content = raw.content || raw.body || '';
  const title = raw.title || 'Untitled post';
  return {
    slug: raw.slug || slugify(title),
    title,
    excerpt: raw.excerpt || raw.summary || stripTags(content).slice(0, 160).trim(),
    coverImage: resolveImage(raw.coverImage || raw.image),
    coverAlt: raw.coverAlt || `Cover image for ${title}`,
    author: raw.author || 'Chip’n Away Team',
    publishDate: raw.publishDate || raw._createdDate || '',
    category: raw.category || 'News',
    isFeatured: raw.isFeatured === true,
    published: raw.published !== false,
    content,
  };
}

/* ------------------------------------------------------------------ */
/* Data layer                                                          */
/* ------------------------------------------------------------------ */

let cache = null;

/** @returns {Promise<{posts: object[], fromCms: boolean, error: boolean}>} */
async function loadPosts() {
  if (cache) return cache;

  let posts = [];
  let fromCms = false;
  let error = false;

  if (wixClient) {
    try {
      const res = await wixClient.items.query(COLLECTION).descending('publishDate').limit(100).find();
      posts = res.items.map(normalise).filter((p) => p.published);
      fromCms = posts.length > 0;
    } catch (err) {
      console.error('[Blog] Could not load posts from Wix:', err);
      error = true;
    }
  }

  if (!posts.length) posts = FALLBACK_POSTS.map(normalise);

  posts.sort((a, b) => (toDate(b.publishDate) || 0) - (toDate(a.publishDate) || 0));
  cache = { posts, fromCms, error };
  return cache;
}

/* ------------------------------------------------------------------ */
/* Blog index (blog.html)                                              */
/* ------------------------------------------------------------------ */

function cardHtml(post) {
  const img = post.coverImage
    ? `<img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}" loading="lazy" width="600" height="400">`
    : '<div class="blog-card-placeholder" aria-hidden="true"><i data-lucide="heart-pulse"></i></div>';
  return `
    <article class="blog-card">
      <a class="blog-card-link" href="${postUrl(post)}" aria-label="Read: ${escapeHtml(post.title)}">
        ${img}
        <span class="blog-tag">${escapeHtml(post.category)}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <span class="blog-meta">${escapeHtml(formatDate(post.publishDate))} • ${escapeHtml(post.author)} • ${readingTime(post.content)} min read</span>
      </a>
    </article>`;
}

function skeletonHtml(n = 3) {
  return Array.from({ length: n }, () => `
    <div class="blog-card blog-skeleton" aria-hidden="true">
      <div class="sk-img"></div><div class="sk-line w60"></div><div class="sk-line"></div><div class="sk-line w40"></div>
    </div>`).join('');
}

function featuredHtml(post) {
  const img = post.coverImage
    ? `<img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}" width="800" height="500">`
    : '';
  return `
    ${img}
    <div class="featured-copy">
      <span class="blog-tag">${escapeHtml(post.category)}</span>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
      <span class="blog-meta">${escapeHtml(formatDate(post.publishDate))} • ${escapeHtml(post.author)} • ${readingTime(post.content)} min read</span>
      <a href="${postUrl(post)}" class="blog-btn blog-btn-primary">Read Full Story</a>
    </div>`;
}

async function initBlogIndex() {
  const grid = $('blog-grid');
  if (!grid) return;

  const featuredMount = $('featured-mount');
  const featuredSection = $('featured-section');
  const search = $('blog-search');
  const chips = $('blog-chips');
  const status = $('blog-status');
  const moreBtn = $('toggle-posts');
  const clearBtn = $('blog-clear');
  const empty = $('blog-empty');

  const state = { q: '', category: 'All', shown: PAGE_SIZE };
  const params = new URLSearchParams(location.search);
  state.q = params.get('q') || '';
  state.category = params.get('category') || 'All';
  if (search) search.value = state.q;

  grid.innerHTML = skeletonHtml();
  grid.setAttribute('aria-busy', 'true');
  if (status) status.textContent = 'Loading articles…';

  const { posts, fromCms, error } = await loadPosts();
  grid.removeAttribute('aria-busy');

  // Featured story: explicit flag, otherwise newest.
  const featured = posts.find((p) => p.isFeatured) || posts[0];
  if (featured && featuredMount) {
    featuredMount.innerHTML = featuredHtml(featured);
  } else if (featuredSection) {
    featuredSection.hidden = true;
  }

  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  if (!categories.includes(state.category)) state.category = 'All';

  const renderChips = () => {
    if (!chips) return;
    chips.innerHTML = categories.map((c) => {
      const count = c === 'All' ? posts.length : posts.filter((p) => p.category === c).length;
      return `<button type="button" class="blog-chip" data-cat="${escapeHtml(c)}" aria-pressed="${c === state.category}">${escapeHtml(c)} <span>${count}</span></button>`;
    }).join('');
  };

  const filtered = () => {
    const q = state.q.trim().toLowerCase();
    return posts.filter((p) =>
      (state.category === 'All' || p.category === state.category) &&
      (!q || `${p.title} ${p.excerpt} ${p.author} ${p.category}`.toLowerCase().includes(q))
    );
  };

  const syncUrl = () => {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.category !== 'All') p.set('category', state.category);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  };

  const render = () => {
    const list = filtered();
    const visible = list.slice(0, state.shown);
    const filtering = Boolean(state.q || state.category !== 'All');

    grid.innerHTML = visible.map(cardHtml).join('');
    if (empty) empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    if (moreBtn) {
      moreBtn.hidden = list.length <= state.shown;
      moreBtn.textContent = `Show More Posts (${list.length - state.shown} left)`;
    }
    if (clearBtn) clearBtn.hidden = !filtering;
    if (featuredSection) featuredSection.hidden = filtering || !featured;

    if (status) {
      const note = error ? ' Showing saved articles — live updates are unavailable right now.' : '';
      status.textContent = list.length === 0
        ? 'No articles match your search.'
        : `Showing ${visible.length} of ${list.length} article${list.length === 1 ? '' : 's'}.${note}`;
    }
    renderChips();
    syncUrl();
    if (window.lucide) window.lucide.createIcons();
  };

  let timer;
  search?.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { state.q = search.value; state.shown = PAGE_SIZE; render(); }, 200);
  });
  search?.closest('form')?.addEventListener('submit', (e) => e.preventDefault());

  chips?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    state.category = btn.dataset.cat;
    state.shown = PAGE_SIZE;
    render();
  });

  const reset = () => {
    state.q = ''; state.category = 'All'; state.shown = PAGE_SIZE;
    if (search) search.value = '';
    render();
    search?.focus();
  };
  clearBtn?.addEventListener('click', reset);
  $('blog-empty-reset')?.addEventListener('click', reset);

  moreBtn?.addEventListener('click', () => {
    const before = state.shown;
    state.shown += PAGE_SIZE;
    render();
    // Keep keyboard users oriented: focus the first newly loaded card.
    grid.querySelectorAll('.blog-card-link')[before]?.focus();
  });

  if (error && !fromCms) console.info('[Blog] Using fallback posts.');
  render();
}

/* ------------------------------------------------------------------ */
/* Single post (post.html)                                             */
/* ------------------------------------------------------------------ */

async function initPost() {
  const mount = $('post-mount');
  if (!mount) return;

  const slug = new URLSearchParams(location.search).get('slug');
  const { posts } = await loadPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    document.title = 'Article not found | Chip\'n Away';
    mount.innerHTML = `
      <div class="blog-empty">
        <h1>We couldn’t find that article</h1>
        <p>It may have been moved or unpublished.</p>
        <a class="blog-btn blog-btn-primary" href="blog.html">Back to all articles</a>
      </div>`;
    return;
  }

  document.title = `${post.title} | Chip'n Away`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', post.excerpt);

  const related = posts.filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  mount.innerHTML = `
    <nav class="post-breadcrumb" aria-label="Breadcrumb">
      <a href="blog.html">Blog</a> <span aria-hidden="true">/</span>
      <a href="blog.html?category=${encodeURIComponent(post.category)}">${escapeHtml(post.category)}</a>
    </nav>
    <header class="post-header">
      <span class="blog-tag">${escapeHtml(post.category)}</span>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="blog-meta">${escapeHtml(post.author)} • ${escapeHtml(formatDate(post.publishDate))} • ${readingTime(post.content)} min read</p>
    </header>
    ${post.coverImage ? `<img class="post-cover" src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt)}">` : ''}
    <div class="post-body">${sanitizeHtml(post.content)}</div>
    <div class="post-actions">
      <a class="blog-btn blog-btn-secondary" href="blog.html">← All articles</a>
      <button type="button" id="post-share" class="blog-btn blog-btn-primary">Copy link</button>
      <span id="post-share-status" class="sr-only" role="status" aria-live="polite"></span>
    </div>
    ${related.length ? `
    <section class="post-related" aria-labelledby="related-title">
      <h2 id="related-title" class="blog-section-title">Keep Reading</h2>
      <div class="blog-grid">${related.map(cardHtml).join('')}</div>
    </section>` : ''}`;

  $('post-share')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const statusEl = $('post-share-status');
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        btn.textContent = 'Link copied ✓';
        if (statusEl) statusEl.textContent = 'Link copied to clipboard';
        setTimeout(() => { btn.textContent = 'Copy link'; }, 2000);
      }
    } catch { /* user cancelled */ }
  });

  if (window.lucide) window.lucide.createIcons();
}

initBlogIndex();
initPost();
