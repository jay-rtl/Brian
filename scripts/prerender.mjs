import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { resolve,join } from 'node:path';
import { render,routes,siteUrl,publicPageUrl } from '../.ssr/entry-server.js';
const template=await readFile('dist/index.html','utf8');
for(const route of [...routes,'/404']){const {html,seo}=render(route);const file=route==='/404'?'dist/404.html':join('dist',route.slice(1),'index.html');await mkdir(resolve(file,'..'),{recursive:true});const output=template.replace('<!--seo-->',seo).replace('<!--app-->',html);await writeFile(file,output);if(route!=='/'&&route!=='/404')await writeFile(`dist${route}.html`,output);}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${siteUrl?`Sitemap: ${siteUrl}/sitemap.xml\n`:''}`);
if(siteUrl){await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${publicPageUrl(r)}</loc></url>`).join('')}</urlset>`);}else{console.warn('PRELAUNCH: Set VITE_SITE_URL to generate verified canonical URLs and sitemap.xml.');}
console.log(`Prerendered ${routes.length} public routes and 404.html.`);

await writeFile('dist/.nojekyll','');
