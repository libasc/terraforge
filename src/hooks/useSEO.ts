import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

const BASE_URL = 'https://www.terraforgeengineering.com';
const DEFAULT_OG_IMAGE = '/images/hero.jpg';
const SITE_NAME = 'Terraforge Engineering';

function setMeta(name: string, content: string, prop = false) {
  const attr = prop ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO({ title, description, canonicalPath = '', ogImage, type = 'website', keywords }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;
    const absoluteImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

    document.title = fullTitle;

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', absoluteImage, true);
    setMeta('og:site_name', SITE_NAME, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', absoluteImage);

    // Canonical
    setLink('canonical', canonicalUrl);
  }, [title, description, canonicalPath, ogImage, type, keywords]);
}
