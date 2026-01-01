import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '..', 'public', 'lighthouse.json');
const targetUrl = process.env.LIGHTHOUSE_URL || 'http://localhost:5173/';

const run = async () => {
  const chrome = await launch({
    chromeFlags: [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
    chromePath: process.env.CHROME_PATH || undefined,
  });
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(targetUrl, options);
    const categories = runnerResult.lhr.categories;
    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    const payload = {
      date: new Date().toISOString().slice(0, 10),
      scores,
    };

    await fs.writeFile(outputPath, JSON.stringify(payload, null, 2));
    console.log(`Saved Lighthouse scores to ${outputPath}`);
  } finally {
    await chrome.kill();
  }
};

run().catch((error) => {
  console.error('Failed to generate Lighthouse report:', error);
  process.exit(1);
});
