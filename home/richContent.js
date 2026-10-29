/**
 * Wix Rich Content (Ricos) -> HTML
 * -----------------------------------------------------------
 * Converts Wix "Rich content" CMS fields (Ricos JSON documents) into clean,
 * semantic HTML while inheriting author formatting (text alignment, indentation,
 * line spacing, font size, text colors, background highlights, image sizing/wrapping,
 * captions, video, galleries, dividers, and tables).
 *
 * Accepts:
 *   - Ricos document object: { nodes: [...], documentStyle?: {...} }
 *   - JSON string of a Ricos document
 *   - Plain HTML string (legacy or fallback content)
 */

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** Safe URL validation for links and media sources. */
function safeUrl(url = '') {
  const u = String(url).trim();
  if (!u) return '';
  if (/^(https?:|mailto:|tel:|#|\/|\.\/)/i.test(u)) return u;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) return u; // relative path
  return '';
}

/** Resolve Wix media ({ url } | { id } | string) to a public static URL. */
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

/** Format block-level styles (alignment, line spacing, indentation). */
function blockStyle(data) {
  if (!data) return '';
  const styles = [];

  const align = data.textStyle?.textAlignment;
  if (align && align !== 'AUTO') {
    styles.push(`text-align: ${align.toLowerCase()}`);
  }

  const lineSpacing = data.textStyle?.lineSpacing?.value ?? data.textStyle?.lineSpacing;
  if (lineSpacing && Number.isFinite(Number(lineSpacing))) {
    styles.push(`line-height: ${Number(lineSpacing)}`);
  }

  const indent = data.indentation?.level ?? data.indentation;
  if (indent && Number.isFinite(Number(indent)) && Number(indent) > 0) {
    styles.push(`padding-left: calc(${Number(indent)} * 1.5rem)`);
  }

  return styles.length ? ` style="${styles.join('; ')}"` : '';
}

/** Format container styles (alignment, text-wrap float, custom widths). */
function containerDataStyles(containerData, defaultAlign = 'CENTER') {
  const styles = [];
  const classes = [];
  const align = String(containerData?.alignment || defaultAlign).toUpperCase();
  const textWrap = containerData?.textWrap === true;
  const widthObj = containerData?.width || {};

  classes.push(`post-align-${align.toLowerCase()}`);
  if (textWrap) classes.push('is-wrapped');

  if (widthObj.custom && Number.isFinite(Number(widthObj.custom))) {
    styles.push(`max-width: ${Number(widthObj.custom)}px`);
    styles.push('width: 100%');
  } else if (widthObj.size === 'FULL_WIDTH') {
    styles.push('width: 100%');
    styles.push('max-width: 100%');
  }

  if (align === 'LEFT') {
    if (textWrap) {
      styles.push('float: left');
      styles.push('margin: 0.5rem 1.75rem 1.25rem 0');
    } else {
      styles.push('margin: 1.75rem auto 1.75rem 0');
      styles.push('clear: both');
    }
  } else if (align === 'RIGHT') {
    if (textWrap) {
      styles.push('float: right');
      styles.push('margin: 0.5rem 0 1.25rem 1.75rem');
    } else {
      styles.push('margin: 1.75rem 0 1.75rem auto');
      styles.push('clear: both');
    }
  } else if (align === 'CENTER') {
    styles.push('margin: 2rem auto');
    styles.push('text-align: center');
    styles.push('clear: both');
  }

  return {
    styleAttr: styles.length ? ` style="${styles.join('; ')}"` : '',
    className: classes.join(' '),
    align,
  };
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
      case 'BOLD':
        if (d.fontWeightValue === undefined || d.fontWeightValue >= 600) {
          html = `<strong>${html}</strong>`;
        }
        break;
      case 'ITALIC':
        if (d.italicData !== false) html = `<em>${html}</em>`;
        break;
      case 'UNDERLINE':
        if (d.underlineData !== false) html = `<u>${html}</u>`;
        break;
      case 'STRIKETHROUGH':
        html = `<s>${html}</s>`;
        break;
      case 'SUPERSCRIPT':
        html = `<sup>${html}</sup>`;
        break;
      case 'SUBSCRIPT':
        html = `<sub>${html}</sub>`;
        break;
      case 'COLOR': {
        const fg = d.colorData?.foreground;
        const bg = d.colorData?.background;
        if (fg && CSS_COLOR.test(fg)) styles.push(`color: ${fg}`);
        if (bg && CSS_COLOR.test(bg)) styles.push(`background-color: ${bg}; padding: 0.1em 0.25em; border-radius: 3px`);
        break;
      }
      case 'FONT_SIZE': {
        const f = d.fontSizeData;
        if (f?.value && Number.isFinite(Number(f.value))) {
          const unit = String(f.unit || 'px').toLowerCase() === 'em' ? 'em' : 'px';
          styles.push(`font-size: ${Number(f.value)}${unit}`);
        }
        break;
      }
      case 'FONT_FAMILY': {
        const family = d.fontFamilyData?.family || d.fontData?.family || d.fontFamily;
        if (family && typeof family === 'string') {
          styles.push(`font-family: ${esc(family)}`);
        }
        break;
      }
      case 'LINK':
        link = linkAttrs(d.linkData);
        break;
      case 'ANCHOR':
        html = `<span id="${esc(d.anchorData?.anchor || '')}">${html}</span>`;
        break;
      default:
        break;
    }
  }

  if (styles.length) html = `<span style="${styles.join('; ')}">${html}</span>`;
  if (link) html = `<a${link}>${html}</a>`;
  return html;
}

function children(node) {
  return (node.nodes || []).map(renderNode).join('');
}

function extractCaption(node) {
  if (node.imageData?.caption) return node.imageData.caption;
  const captionNode = (node.nodes || []).find((n) => n.type === 'CAPTION');
  if (captionNode) {
    return (captionNode.nodes || [])
      .map((n) => n.textData?.text || '')
      .join('')
      .trim();
  }
  return '';
}

function renderImage(node) {
  const d = node.imageData || {};
  const src = ricosMediaUrl(d.image?.src);
  if (!src) return '';

  const layout = containerDataStyles(d.containerData, 'CENTER');
  const w = d.image?.width;
  const h = d.image?.height;

  let img = `<img src="${esc(src)}" alt="${esc(d.altText || '')}" loading="lazy"` +
    `${w ? ` width="${Number(w)}"` : ''}${h ? ` height="${Number(h)}"` : ''}>`;

  const href = linkAttrs(d.link);
  if (href) img = `<a${href}>${img}</a>`;

  const captionText = extractCaption(node);
  const caption = captionText
    ? `<figcaption>${esc(captionText)}</figcaption>`
    : '';

  return `<figure class="post-figure ${layout.className}"${layout.styleAttr}>${img}${caption}</figure>`;
}

function renderGallery(node) {
  const items = node.galleryData?.items || [];
  const layout = containerDataStyles(node.galleryData?.containerData, 'CENTER');
  const imgs = items.map((it) => {
    const src = ricosMediaUrl(it.image?.media?.src);
    return src ? `<img src="${esc(src)}" alt="${esc(it.image?.title || '')}" loading="lazy">` : '';
  }).join('');
  return imgs ? `<div class="post-gallery ${layout.className}"${layout.styleAttr}>${imgs}</div>` : '';
}

function renderVideo(node) {
  const src = ricosMediaUrl(node.videoData?.video?.src);
  if (!src) return '';
  const layout = containerDataStyles(node.videoData?.containerData, 'CENTER');
  return `<div class="post-video-wrap ${layout.className}"${layout.styleAttr}><video controls preload="metadata" src="${esc(src)}"></video></div>`;
}

function renderDivider(node) {
  const d = node.dividerData || {};
  const styleMap = { SINGLE: 'solid', DOUBLE: 'double', DASHED: 'dashed', DOTTED: 'dotted' };
  const borderStyle = styleMap[d.lineStyle] || 'solid';
  const widthMap = { SMALL: '25%', MEDIUM: '50%', LARGE: '75%', FULL_WIDTH: '100%' };
  const w = widthMap[d.width] || '100%';
  const align = String(d.alignment || 'CENTER').toUpperCase();
  const margin = align === 'LEFT' ? '2rem auto 2rem 0' : align === 'RIGHT' ? '2rem 0 2rem auto' : '2rem auto';
  return `<hr class="post-divider" style="border: none; border-top: 2px ${borderStyle} rgba(26, 46, 5, 0.15); width: ${w}; margin: ${margin};">`;
}

function renderNode(node) {
  switch (node.type) {
    case 'TEXT':
      return renderText(node);
    case 'PARAGRAPH': {
      const inner = children(node);
      // If paragraph is completely empty, it was an explicit blank line in the editor
      if (!inner || !inner.trim()) {
        return '<div class="post-spacer" aria-hidden="true"></div>';
      }
      return `<p${blockStyle(node.paragraphData)}>${inner}</p>`;
    }
    case 'HEADING': {
      const lvl = Math.min(6, Math.max(1, Number(node.headingData?.level) || 2));
      return `<h${lvl}${blockStyle(node.headingData)}>${children(node)}</h${lvl}>`;
    }
    case 'BLOCKQUOTE':
      return `<blockquote${blockStyle(node.blockquoteData)}>${children(node)}</blockquote>`;
    case 'CODE_BLOCK':
      return `<pre class="post-code-block"><code>${(node.nodes || []).map((n) => esc(n.textData?.text || '')).join('')}</code></pre>`;
    case 'BULLETED_LIST':
      return `<ul>${children(node)}</ul>`;
    case 'ORDERED_LIST':
      return `<ol>${children(node)}</ol>`;
    case 'LIST_ITEM':
      return `<li>${children(node)}</li>`;
    case 'DIVIDER':
      return renderDivider(node);
    case 'IMAGE':
      return renderImage(node);
    case 'GALLERY':
      return renderGallery(node);
    case 'VIDEO':
      return renderVideo(node);
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
    case 'TABLE':
      return `<div class="post-table-wrap"><table><tbody>${children(node)}</tbody></table></div>`;
    case 'TABLE_ROW':
      return `<tr>${children(node)}</tr>`;
    case 'TABLE_CELL':
      return `<td>${children(node)}</td>`;
    case 'COLLAPSIBLE_LIST':
      return children(node);
    case 'COLLAPSIBLE_ITEM':
      return `<details class="post-collapsible">${children(node)}</details>`;
    case 'COLLAPSIBLE_ITEM_TITLE':
      return `<summary class="post-collapsible-summary">${children(node)}</summary>`;
    case 'COLLAPSIBLE_ITEM_BODY':
      return `<div class="post-collapsible-body">${children(node)}</div>`;
    default:
      return children(node);
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
