import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const siteUrl = 'https://newton-momanyi-manyisa.vercel.app';
const socialImage = `${siteUrl}/newton-manyisa-social-preview-v2.jpg`;

const projects = [
  {
    slug: 'ai-powered-water-treatment-quotation-generator',
    title: 'AI-Powered Water Treatment Quotation Generator',
    description: 'AI-assisted water-treatment quotation workflow built with Python, Flask, OCR, Ollama, and Hugging Face. Preparation time fell from about five hours to under ten minutes.',
    tech: ['Python', 'Flask', 'OCR', 'Ollama', 'Hugging Face', 'Docker'],
    repository: 'https://github.com/manyisanewton/ai-quotation-generator',
    liveUrl: 'https://www.wari.norwawater.com/',
  },
  {
    slug: 'vortexus-industrial-marketplace',
    title: 'Vortexus Industrial Marketplace',
    description: 'Industrial e-commerce marketplace built with Blazor, ASP.NET Core, C#, SQL Server, and Safaricom M-Pesa Daraja STK Push payments.',
    tech: ['Blazor', 'ASP.NET Core', 'C#', 'SQL Server', 'M-Pesa Daraja API'],
    repository: 'https://github.com/manyisanewton/vortexus-marketplace',
    liveUrl: 'https://reesolmart.com/',
  },
  {
    slug: 'nelda-engineering-water-treatment-website',
    title: 'Nelda Engineering — Water Treatment Website',
    description: 'React water-treatment product catalog with ERPNext API integration, React Query, debounced search, pagination, and responsive interface design.',
    tech: ['React', 'Tailwind CSS', 'ERPNext API', 'React Query', 'React Router'],
    repository: 'https://github.com/manyisanewton/nelda-engineering',
  },
  {
    slug: 'erpnext-customization-workflow-automation',
    title: 'ERPNext Customization & Workflow Automation',
    description: 'ERPNext and Frappe customization with Zoho and n8n integrations for sales, HR, inventory, reporting, and operational automation.',
    tech: ['ERPNext', 'Frappe Framework', 'Zoho', 'n8n', 'Python', 'REST APIs'],
    repository: 'https://github.com/manyisanewton/erpnext-customization',
  },
  {
    slug: 'norwa-africa-website',
    title: 'Norwa Africa Website',
    description: 'React and Flask company website with PostgreSQL, customer-support chatbot integration, Docker, Nginx, and cPanel deployment.',
    tech: ['React', 'Flask', 'PostgreSQL', 'Dialogflow', 'Docker', 'Nginx'],
    repository: 'https://github.com/manyisanewton/norwa-africa-website',
    liveUrl: 'https://norwaafrica.com/',
  },
];

const escapeAttribute = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const replaceMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*>`, 'i');
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`);
};

const personSchema = JSON.parse(fs.readFileSync(path.join(rootDir, 'public', 'newton-manyisa-schema.json'), 'utf8'));
const template = fs.readFileSync(templatePath, 'utf8').replace(
  /<script id=["']seo-json-ld["'] type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
  `<script id="seo-json-ld" type="application/ld+json">${JSON.stringify(personSchema).replaceAll('<', '\\u003c')}</script>`,
);

fs.writeFileSync(templatePath, template);

for (const project of projects) {
  const route = `/project/${project.slug}`;
  const canonical = `${siteUrl}${route}`;
  const title = `${project.title} | Newton Manyisa`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/#projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
        ],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        headline: project.title,
        description: project.description,
        url: canonical,
        image: socialImage,
        codeRepository: project.repository,
        programmingLanguage: project.tech,
        keywords: project.tech.join(', '),
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'Newton Manyisa',
        },
        inLanguage: 'en',
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      },
    ],
  };

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(title)}</title>`);
  html = replaceMeta(html, 'name', 'description', project.description);
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', project.description);
  html = replaceMeta(html, 'property', 'og:type', 'article');
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:image:alt', `${project.title} case study by Newton Manyisa`);
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', project.description);
  html = replaceMeta(html, 'name', 'twitter:image:alt', `${project.title} case study by Newton Manyisa`);
  html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(
    /<script id=["']seo-json-ld["'] type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
    `<script id="seo-json-ld" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
  );
  html = html.replace(
    /<noscript>[\s\S]*?<\/noscript>/i,
    `<noscript><style>.app-loading { display: none !important; }</style><main class="seo-fallback"><p><a href="/#projects">Back to projects</a></p><h1>${escapeAttribute(project.title)}</h1><p>${escapeAttribute(project.description)}</p><h2>Technologies</h2><p>${escapeAttribute(project.tech.join(', '))}</p><p><a href="${escapeAttribute(project.repository)}">Source code</a>${project.liveUrl ? ` · <a href="${escapeAttribute(project.liveUrl)}">Live project</a>` : ''}</p><p>Created by <a href="${siteUrl}/">Newton Manyisa</a>, full-stack software developer in Nairobi, Kenya.</p></main></noscript>`,
  );

  const outputDir = path.join(distDir, 'project', project.slug);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
}

console.log(`Generated ${projects.length} SEO-ready project pages.`);
