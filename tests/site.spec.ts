import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes=['/','/about','/books','/books/the-observer','/books/dreamwind','/news','/contact','/frankfurt-book-fair-2026'];
test('all public routes render, images resolve, and no runtime errors occur',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const route of routes){await page.goto(route);await expect(page.locator('h1')).toBeVisible();await page.waitForTimeout(1400);expect(await page.title()).toContain('Brian Palmieri');await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));expect(broken).toEqual([]);}
  expect(errors).toEqual([]);
});
test('navigation, news filters, and enquiry availability',async({page})=>{
  await page.goto('/');await page.getByRole('navigation',{name:'Primary navigation',exact:true}).getByRole('link',{name:'News',exact:true}).click();await expect(page).toHaveURL(/\/news$/);await page.getByRole('button',{name:'Book news',exact:true}).click();await expect(page.getByText('The next chapter is on its way.')).toBeVisible();await page.getByRole('button',{name:'Showcases',exact:true}).click();await page.getByRole('link',{name:/SHOWCASE · 2026/}).click();await expect(page).toHaveURL(/frankfurt-book-fair-2026$/);await page.goto('/contact');await expect(page.getByRole('button',{name:'Send your message'})).toBeDisabled();await expect(page.getByText('Contact delivery is awaiting configuration.',{exact:false})).toBeVisible();
});
test('gallery opens, supports arrows and Escape, and restores focus',async({page})=>{
  await page.goto('/frankfurt-book-fair-2026');const opener=page.getByRole('button',{name:'Enlarge The Observer — Promotional Display, Frankfurt Book Fair 2026'});await opener.click();await expect(page.locator('.lightbox')).toBeVisible();await expect(page.locator('.lightbox figcaption')).toContainText('The Observer');await page.keyboard.press('ArrowRight');await expect(page.locator('.lightbox figcaption')).toContainText('Dreamwind');await page.keyboard.press('Escape');await expect(page.locator('.lightbox')).not.toBeVisible();await expect(opener).toBeFocused();
});
test('mobile menu traps focus, routes correctly, closes on Escape',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');const opener=page.getByRole('button',{name:'Open navigation'});await opener.click();await expect(page.getByRole('dialog',{name:'Site navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(opener).toBeFocused();await opener.click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Frankfurt 2026'}).click();await expect(page).toHaveURL(/frankfurt-book-fair-2026$/);await expect(page.getByRole('dialog',{name:'Site navigation'})).not.toBeVisible();
});
test('responsive layouts at mobile, tablet and desktop widths',async({page})=>{
  test.setTimeout(120000);
  for(const width of [390,768,1440]){await page.setViewportSize({width,height:width===390?844:1000});for(const route of routes){await page.goto(route);await page.waitForTimeout(1200);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`${route} at ${width}px`).toBe(true);await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}});await page.waitForTimeout(1000);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);await page.screenshot({path:`test-results/screenshots/${width}-${route==='/'?'home':route.replaceAll('/','-').slice(1)}.png`,fullPage:true});}}
});
test('automated accessibility for all pages in reduced motion',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});for(const route of routes){await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);}
});
test('crawlable content and unique metadata without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();const titles=new Set<string>();for(const route of routes){await page.goto(`http://127.0.0.1:4173${route}`);await expect(page.locator('h1')).toBeVisible();const title=await page.title();expect(titles.has(title)).toBe(false);titles.add(title);await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{50,}/);expect(await page.locator('body').innerText()).not.toContain('Loading…');}await context.close();
});
test('on-demand 3D book loads and returns to static cover',async({page})=>{
  await page.goto('/books/the-observer');await page.getByRole('button',{name:'Explore in 3D'}).click();await expect(page.locator('canvas')).toBeVisible({timeout:20000});await page.waitForTimeout(2000);await page.screenshot({path:'test-results/screenshots/observer-3d.png'});await page.getByRole('button',{name:'Return to cover'}).click();await expect(page.locator('canvas')).toHaveCount(0);await expect(page.locator('.book-hero .book-front')).toBeVisible();
});
