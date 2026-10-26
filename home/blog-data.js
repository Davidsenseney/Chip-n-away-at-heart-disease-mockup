/**
 * Fallback blog posts
 * -----------------------------------------------------------
 * Shown ONLY when Wix isn't configured, the `blog_posts` collection is
 * empty, or the request fails — so the page never looks broken.
 * Once real posts exist in the Wix CMS this file is ignored.
 *
 * Shape matches the Wix `blog_posts` collection fields (see README).
 */
import blog1 from './images/blog1.png';
import blog2 from './images/blog2.png';
import blog3 from './images/blog3.png';
import blog4 from './images/blog4.png';

export const FALLBACK_POSTS = [
  {
    slug: 'honoring-the-professionals-behind-coach-malones-heart-journey',
    title: 'Honoring the Professionals Behind Coach Malone’s Heart Journey',
    excerpt:
      'A life-saving heart transplant becomes a story of resilience, innovation, and unwavering care.',
    coverImage: blog1,
    coverAlt: 'Coach Malone with the care team who supported his heart journey',
    author: 'Cynthia Malone',
    publishDate: '2026-04-20',
    category: 'Stories',
    isFeatured: true,
    content:
      '<p>A life-saving heart transplant becomes a story of resilience, innovation, and unwavering care.</p>' +
      '<p>This is sample content. Add the full article in the Wix CMS <strong>blog_posts</strong> collection and it will replace this text automatically.</p>',
  },
  {
    slug: 'a-new-season-of-showing-up',
    title: 'A New Season of Showing Up',
    excerpt:
      'As life shifts into a new season of caregiving, this reflection highlights a renewed commitment to heart-health awareness and community impact.',
    coverImage: blog2,
    coverAlt: 'Illustration for A New Season of Showing Up',
    author: 'Cynthia Malone',
    publishDate: '2026-01-01',
    category: 'Stories',
    content:
      '<p>As life shifts into a new season of caregiving, this reflection highlights a renewed commitment to heart-health awareness and community impact.</p>' +
      '<p>This is sample content. Publish the full article from the Wix CMS to replace it.</p>',
  },
  {
    slug: 'the-ripple-legacy',
    title: 'The Ripple Legacy',
    excerpt: 'A celebration of the CARDIAC Car Show and the lasting impact.',
    coverImage: blog3,
    coverAlt: 'Cars at the CARDIAC Car Show',
    author: 'Cynthia Malone',
    publishDate: '2025-12-10',
    category: 'Events',
    content:
      '<p>A celebration of the CARDIAC Car Show and the lasting impact.</p>' +
      '<p>This is sample content. Publish the full article from the Wix CMS to replace it.</p>',
  },
  {
    slug: 'ah-man-im-not-that-old',
    title: 'Ah Man - I’m Not THAT Old',
    excerpt: 'Simple habits that can reduce heart disease risk.',
    coverImage: blog4,
    coverAlt: 'Illustration for heart-healthy habits',
    author: 'Cynthia Malone',
    publishDate: '2026-04-16',
    category: 'Health Tips',
    content:
      '<p>Simple habits that can reduce heart disease risk.</p>' +
      '<p>This is sample content. Publish the full article from the Wix CMS to replace it.</p>',
  },
];
