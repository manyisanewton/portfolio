const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  try {
    await page.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Check if root has content
    const rootContent = await page.evaluate(() => document.getElementById('root').innerHTML);
    console.log('Root content length:', rootContent.length);
    console.log('Root content preview:', rootContent.substring(0, 500));
    
    if (errors.length > 0) {
      console.log('\n=== CONSOLE ERRORS ===');
      errors.forEach(e => console.log(e));
    } else {
      console.log('\n=== NO ERRORS ===');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
  
  await browser.close();
})();
