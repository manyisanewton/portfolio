const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    console.log(`Console [${msg.type()}]:`, msg.text());
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
    errors.push(error.message);
  });
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(8000);
    
    // Check window.location
    const location = await page.evaluate(() => {
      return {
        href: window.location.href,
        pathname: window.location.pathname,
        hash: window.location.hash,
      };
    });
    console.log('Location:', location);
    
    // Check React Router state
    const routerState = await page.evaluate(() => {
      // Try to access React Router internals
      const root = document.getElementById('root');
      for (const key of Object.keys(root)) {
        if (key.startsWith('__reactFiber') || key.startsWith('__reactContainer')) {
          const fiber = root[key];
          if (fiber && fiber.memoizedState) {
            return {
              hasMemoizedState: true,
              stateKeys: Object.keys(fiber.memoizedState),
            };
          }
        }
      }
      return { found: false };
    });
    console.log('Router state:', routerState);
    
    // Check if any components have error boundaries catching errors
    const reactErrors = await page.evaluate(() => {
      // Check for React error boundary state
      const root = document.getElementById('root');
      for (const key of Object.keys(root)) {
        if (key.startsWith('__reactFiber') || key.startsWith('__reactContainer')) {
          const fiber = root[key];
          if (fiber) {
            let node = fiber;
            while (node) {
              if (node.memoizedState && node.memoizedState.hasOwnProperty('componentStack')) {
                return { hasError: true, componentStack: node.memoizedState.componentStack };
              }
              if (node.child) {
                node = node.child;
              } else if (node.sibling) {
                node = node.sibling;
              } else {
                while (node && !node.sibling) {
                  node = node.return;
                }
                if (node) node = node.sibling;
              }
            }
          }
        }
      }
      return { checked: true };
    });
    console.log('React errors:', reactErrors);
    
    // Check if components are rendering but invisible
    const elementTree = await page.evaluate(() => {
      const getTree = (el, depth = 0) => {
        if (depth > 10) return '...';
        const style = getComputedStyle(el);
        const children = Array.from(el.children).map(c => getTree(c, depth + 1));
        return {
          tag: el.tagName,
          id: el.id,
          class: el.className,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          height: style.height,
          width: style.width,
          children: children.length ? children : undefined,
        };
      };
      return getTree(document.getElementById('root'));
    });
    console.log('Element tree:', JSON.stringify(elementTree, null, 2).substring(0, 10000));
    
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
