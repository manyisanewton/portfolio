import { useEffect } from 'react';

export const SITE_URL = 'https://newton-momanyi-manyisa.vercel.app';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/newton-manyisa-social-preview-v2.jpg`;

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const SEO = ({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = 'Newton Manyisa full-stack developer portfolio',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  schema,
}) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:secure_url', image);
    setMeta('property', 'og:image:type', 'image/jpeg');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', imageAlt);
    setMeta('property', 'og:site_name', 'Newton Manyisa');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', imageAlt);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    if (schema) {
      let script = document.getElementById('seo-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, path, type, image, imageAlt, robots, schema]);

  return null;
};

export default SEO;
