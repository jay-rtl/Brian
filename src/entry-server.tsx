import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { books, metadata, routes, siteUrl, publicPageUrl } from './data';
import { basePath, absoluteAssetUrl } from './urls';
export { routes, siteUrl, publicPageUrl };
function escape(s:string){return s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
export function render(path:string){
  const m=metadata(path);const b=Object.values(books).find(book=>book.route===path);
  const schema=b?{'@context':'https://schema.org','@type':'Book',name:b.title,author:{'@type':'Person',name:'Brian Palmieri'},image:absoluteAssetUrl(m.image),inLanguage:'en',description:m.description}:{'@context':'https://schema.org','@type':'Person',name:'Brian Palmieri',...(siteUrl?{url:siteUrl}:{}),worksFor:undefined};
  const seo=`<title>${escape(m.title)}</title><meta name="description" content="${escape(m.description)}"/><meta property="og:type" content="website"/><meta property="og:title" content="${escape(m.title)}"/><meta property="og:description" content="${escape(m.description)}"/><meta property="og:image" content="${escape(absoluteAssetUrl(m.image))}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(m.title)}"/><meta name="twitter:description" content="${escape(m.description)}"/><meta name="twitter:image" content="${escape(absoluteAssetUrl(m.image))}"/>${siteUrl?`<link rel="canonical" href="${escape(publicPageUrl(path))}"/><meta property="og:url" content="${escape(publicPageUrl(path))}"/>`:''}<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
  return {html:renderToString(<StaticRouter basename={basePath || '/'} location={`${basePath}${path}`}><App/></StaticRouter>),seo};
}
