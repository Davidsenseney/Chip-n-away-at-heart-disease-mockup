/**
 * Wix Rich Content (Ricos) -> HTML
 * -----------------------------------------------------------
 * The CMS `content` field is a Wix "Rich content" field. The Data API returns
 * it as a Ricos document: { nodes: [...], metadata, documentStyle }.
 * (It may also arrive as a JSON string, or - for legacy rows / fallback posts -
 * as a plain HTML string. All three shapes are accepted.)
 *
 * This is a dependency-free renderer (no React) that outputs plain HTML.
 * The result is still passed through sanitizeHtml() in blog.js before it
 * reaches the page, and every value is escaped here as well.
 */

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** Only allow safe URL schemes in href/src. */
function safeUrl(url = '') {
  const u = String(url).trim();
  if (!u) return '';
  if (/^(https?:|mailto:|tel:|#|\/|\.\/)/i.test(u)) return u;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) return u; // relative URL
  return '';
}

/** Resolve a Ricos media source ({ url } | { id } | string) to a public URL. */
export function ricosMediaUrl(src) {
  if (!src) return '';
  if (typeof src === 'string') src = { url: src, id: src };
  if (src.url) return safeUrl(src.url);
  const id = src.id || '';
  if (!id) return '';
  const m = String(id).match(/^(?:wix:)?image:\/\/v1\/([^/#]+)/);
  if (m) return `https://static.wixstatic.com/media/${m[1]}`;
  if (/^https?:\/\//i.test(id)) return id;
  return `https://static.wixstatic.com/media/${id}`;
}

const CSS_COLOR = /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i;

function linkAttrs(linkData) {
  const link = linkData?.link || linkData || {};
  const href = link.url ? safeUrl(link.url) : link.anchor ? `#${esc(link.anchor)}` : '';
  if (!href) return '';
  const rel = [];
  if (link.target === 'BLANK') rel.push('noopener', 'noreferrer');
  if (link.rel?.nofollow) rel.push('nofollow');
  if (link.rel?.sponsored) rel.push('sponsored');
  return ` href="${esc(href)}"` +
    (link.target === 'BLANK' ? ' target="_blank"' : '') +
    (rel.length ? ` rel="${rel.join(' ')}"` : '');
}

/** Wrap text in tags for each decoration. Links go outermost. */
function renderText(node) {
  const data = node.textData || {};
  let html = esc(data.text || '').replace(/\n/g, '<br>');
  const decorations = data.decorations || [];
  const styles = [];
  let link = '';

  for (const d of decorations) {
    switch (d.type) {
      case 'BOLD': if (d.fontWeightValue === undefined || d.fontWeightValue >= 600) html = `<strong>${html}</strong>`; break;
      case 'ITALIC': if (d.italicData !== false) html = `<em>${html}</em>`; break;
      case 'UNDERLINE': if (d.underlineData !== false) html = `<u>${html}</u>`; break;
      case 'STRIKETHROUGH': html = `<s>${html}</s>`; break;
      case 'SUPERSCRIPT': html = `<sup>${html}</sup>`; break;
      case 'SUBSCRIPT': html = `<sub>${html}</sub>`; break;
      case 'COLOR': {
        const fg = d.colorData?.foreground;
        const bg = d.colorData?.background;
        if (fg && CSS_COLOR.test(fg)) styles.push(`color:${fg}`);
        if (bg && CSS_COLOR.test(bg)) styles.push(`background-color:${bg}`);
        break;
      }
      case 'FONT_SIZE': {
        const f = d.fontSizeData;
        if (f?.value && Number.isFinite(Number(f.value))) styles.push(`font-size:${Number(f.value)}${String(f.unit).toUpperCase() === 'EM' ? 'em' : 'px'}`);
        break;
      }
      case 'LINK': link = linkAttrs(d.linkData); break;
      case 'ANCHOR': html = `<span id="${esc(d.anchorData?.anchor || '')}">${html}</span>`; break;
      default: break; // MENTION, SPOILER, EXTERNAL etc. render as plain text
    }
  }

  if (styles.length) html = `<span style="${styles.join(';')}">${html}</span>`;
  if (link) html = `<a${link}>${html}</a>`;
  return html;
}

function alignStyle(data) {
  const a = data?.textStyle?.textAlignment;
  return a && a !== 'AUTO' ? ` style="text-align:${a.toLowerCase()}"` : '';
}

function children(node) {
  return (node.nodes || []).map(renderNode).join('');
}

function renderImage(node) {
  const d = node.imageData || {};
  const src = ricosMediaUrl(d.image?.src);
  if (!src) return '';
  const w = d.image?.width, h = d.image?.height;
  let img = `<img src="${esc(src)}" alt="${esc(d.altText || '')}" loading="lazy"` +
    `${w ? ` width="${Number(w)}"` : ''}${h ? ` height="${Number(h)}"` : ''}>`;
  const href = linkAttrs(d.link);
  if (href) img = `<a${href}>${img}</a>`;
  return `<figure class="post-figure">${img}${d.caption ? `<figcaption>${esc(d.caption)}</figcaption>` : ''}</figure>`;
}

function renderGallery(node) {
  const items = node.galleryData?.items || [];
  const imgs = items.map((it) => {
    const src = ricosMediaUrl(it.image?.media?.src);
    return src ? `<img src="${esc(src)}" alt="${esc(it.image?.title || '')}" loading="lazy">` : '';
  }).join('');
  return imgs ? `<div class="post-gallery">${imgs}</div>` : '';
}

function renderVideo(node) {
  const src = ricosMediaUrl(node.videoData?.video?.src);
  return src ? `<video controls preload="metadata" src="${esc(src)}"></video>` : '';
}

function renderNode(node) {
  switch (node.type) {
    case 'TEXT': return renderText(node);
    case 'PARAGRAPH': {
      const inner = children(node);
      // Empty paragraphs are spacing in the editor; skip them.
      return inner ? `<p${alignStyle(node.paragraphData)}>${inner}</p>` : '';
    }
    case 'HEADING': {
      const lvl = Math.min(6, Math.max(1, Number(node.headingData?.level) || 2));
      return `<h${lvl}${alignStyle(node.headingData)}>${children(node)}</h${lvl}>`;
    }
    case 'BLOCKQUOTE': return `<blockquote>${children(node)}</blockquote>`;
    case 'CODE_BLOCK': return `<pre><code>${(node.nodes || []).map((n) => esc(n.textData?.text || '')).join('')}</code></pre>`;
    case 'BULLETED_LIST': return `<ul>${children(node)}</ul>`;
    case 'ORDERED_LIST': return `<ol>${children(node)}</ol>`;
    case 'LIST_ITEM': return `<li>${children(node)}</li>`;
    case 'DIVIDER': return '<hr>';
    case 'IMAGE': return renderImage(node);
    case 'GALLERY': return renderGallery(node);
    case 'VIDEO': return renderVideo(node);
    case 'BUTTON': {
      const d = node.buttonData || {};
      const href = linkAttrs(d.link);
      return href ? `<p><a class="blog-btn blog-btn-primary"${href}>${esc(d.text || 'Learn more')}</a></p>` : '';
    }
    case 'LINK_PREVIEW': {
      const d = node.linkPreviewData || {};
      const href = linkAttrs(d.link);
      return href ? `<p><a${href}>${esc(d.title || d.link?.url || '')}</a></p>` : '';
    }
    case 'TABLE': return `<table><tbody>${children(node)}</tbody></table>`;
    case 'TABLE_ROW': return `<tr>${children(node)}</tr>`;
    case 'TABLE_CELL': return `<td>${children(node)}</td>`;
    case 'COLLAPSIBLE_LIST': return children(node);
    case 'COLLAPSIBLE_ITEM': return `<details>${children(node)}</details>`;
    case 'COLLAPSIBLE_ITEM_TITLE': return `<summary>${children(node)}</summary>`;
    case 'COLLAPSIBLE_ITEM_BODY': return children(node);
    default: return children(node); // unknown container: keep any text inside
  }
}

/** Is this value a Ricos document? */
export function isRicosDocument(v) {
  return Boolean(v) && typeof v === 'object' && Array.isArray(v.nodes);
}

/**
 * Convert a CMS `content` value to an HTML string.
 * Accepts a Ricos object, a JSON string of one, or an HTML/plain string.
 */
export function contentToHtml(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    const t = value.trim();
    if (t.startsWith('{') && t.includes('"nodes"')) {
      try {
        const parsed = JSON.parse(t);
        if (isRicosDocument(parsed)) return contentToHtml(parsed);
      } catch { /* not JSON, treat as HTML */ }
    }
    return value;
  }
  if (isRicosDocument(value)) return value.nodes.map(renderNode).join('');
  return '';
}
