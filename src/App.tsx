import { absoluteAssetUrl, assetUrl } from './urls';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ExploreCursor from './components/ExploreCursor';
import { About as ServerAbout, BookPage as ServerBookPage, Collection as ServerCollection, Contact as ServerContact, Frankfurt as ServerFrankfurt, Home as ServerHome, News as ServerNews, NotFound as ServerNotFound } from './pages';
const About = import.meta.env.SSR ? ServerAbout : lazy(() => import('./pages/About'));
const BookPage = import.meta.env.SSR ? ServerBookPage : lazy(() => import('./pages/BookPage'));
const Collection = import.meta.env.SSR ? ServerCollection : lazy(() => import('./pages/Collection'));
const Contact = import.meta.env.SSR ? ServerContact : lazy(() => import('./pages/Contact'));
const Frankfurt = import.meta.env.SSR ? ServerFrankfurt : lazy(() => import('./pages/Frankfurt'));
const Home = import.meta.env.SSR ? ServerHome : lazy(() => import('./pages/Home'));
const News = import.meta.env.SSR ? ServerNews : lazy(() => import('./pages/News'));
const NotFound = import.meta.env.SSR ? ServerNotFound : lazy(() => import('./pages/NotFound'));
import { metadata, siteUrl, publicPageUrl } from './data';
gsap.registerPlugin(ScrollTrigger,SplitText);
const nav=[['/','Home'],['/about','About'],['/books','Books'],['/frankfurt-book-fair-2026','Frankfurt 2026'],['/news','News'],['/contact','Contact']];
function Brand({footer=false}:{footer?:boolean}){
  return <Link className={`wordmark${footer?' footer-brand':''}`} to="/" aria-label="Brian Palmieri home"><img className="brand-logo" src={assetUrl('assets/brian-palmieri-publications-logo.png')} alt="Brian Palmieri Publications" width="210" height="183" loading={footer?'lazy':'eager'} fetchPriority={footer?undefined:'high'}/>{!footer&&<span>BRIAN PALMIERI<small>STORIES BEYOND THE ORDINARY</small></span>}</Link>;
}
function Header() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);const location=useLocation();const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{setOpen(false);},[location.pathname]);
  useEffect(()=>{const update=()=>setScrolled(window.scrollY>30);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);
  useEffect(()=>{if(open){dialog.current?.showModal();document.body.style.overflow='hidden';}else{dialog.current?.close();document.body.style.overflow='';}return()=>{document.body.style.overflow='';};},[open]);
  return <header className={`site-header ${scrolled?'is-scrolled':''}`}><div className="header-inner page-width"><Brand/><nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([to,label])=><NavLink key={to} to={to} end={to==='/' || to==='/books'} className={to.includes('frankfurt')?'event-nav':''}>{to.includes('frankfurt')&&<span aria-hidden="true">✦</span>}{label}</NavLink>)}</nav><button className="mobile-menu icon-button" onClick={()=>setOpen(true)} aria-label="Open navigation" aria-haspopup="dialog"><Menu/></button></div>
    <dialog ref={dialog} className="nav-dialog" onCancel={()=>setOpen(false)} aria-label="Site navigation"><button className="nav-close icon-button" onClick={()=>setOpen(false)} aria-label="Close navigation"><X/></button><img className="menu-brand-logo" src={assetUrl('assets/brian-palmieri-publications-logo.png')} alt="Brian Palmieri Publications" width="210" height="183"/><nav aria-label="Mobile navigation">{nav.map(([to,label],i)=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)}><span>0{i+1}</span>{label}<ArrowUpRight size={23}/></NavLink>)}</nav><p className="nav-dialog-note">Stories beyond the ordinary.</p></dialog>
  </header>;
}
function Footer(){return <footer className="site-footer"><div className="page-width footer-top"><Brand footer/><p>A world beyond the page.<br/>A story waiting for you.</p><nav aria-label="Footer navigation">{nav.slice(1).map(([to,label])=><Link key={to} to={to}>{label==='Frankfurt 2026'?'Frankfurt Book Fair 2026':label}</Link>)}</nav></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Brian Palmieri. All rights reserved.</span><span>FAITH. WONDER. IMAGINATION.</span><a href="#top">Back to top ↑</a></div></footer>;}
function PageEffects(){
  const location=useLocation();const main=useRef<HTMLElement|null>(null);
  useEffect(()=>{main.current=document.getElementById('main');
    const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const heading=main.current?.querySelector('.hero-copy h1, .book-hero-copy h1');
        if(heading){const split=new SplitText(heading,{type:'words',wordsClass:'title-word'});gsap.from(split.words,{yPercent:45,opacity:0,duration:.9,stagger:.09,ease:'power3.out'});}
        gsap.timeline().from('.hero-enter',{y:26,opacity:0,duration:1,stagger:.13,ease:'power3.out',clearProps:'transform,opacity'});
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>{gsap.from(el,{y:30,opacity:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 93%',once:true},clearProps:'transform,opacity'});});
        gsap.utils.toArray<HTMLElement>('.event-photo img, .exhibition-photo img').forEach(el=>gsap.fromTo(el,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:el,scrub:1,start:'top bottom',end:'bottom top'}}));
        gsap.utils.toArray<HTMLElement>('.gold-rule').forEach(el=>gsap.from(el,{scaleX:0,transformOrigin:'left',duration:1.2,scrollTrigger:{trigger:el,start:'top 90%'}}));
        if(window.matchMedia('(min-width: 1024px) and (min-height: 700px)').matches){
          gsap.utils.toArray<HTMLElement>('.quote-section').forEach(el=>{gsap.timeline({scrollTrigger:{trigger:el,start:'center center',end:'+=220',pin:true,scrub:1}}).to(el.querySelector('.art-backdrop'),{xPercent:5,ease:'none'},0).to(el.querySelector('blockquote'),{y:-12,ease:'none'},0);});
        }
        gsap.utils.toArray<HTMLElement>('.world-art').forEach(el=>gsap.from(el,{clipPath:'inset(0 0 12% 0)',duration:1.1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},clearProps:'clipPath'}));
        gsap.to('.scroll-progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});
      },main);return()=>ctx.revert();
    });return()=>mm.revert();

  },[location.pathname]);return null;
}
export default function App(){
  const location=useLocation();const main=useRef<HTMLElement>(null);const previous=useRef(location.pathname);
  useEffect(()=>{
    const meta=metadata(location.pathname);document.title=meta.title;
    function setMeta(key:string,value:string,property=false){const attr=property?'property':'name';let el=document.head.querySelector(`meta[${attr}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.appendChild(el);}el.setAttribute('content',value);}
    setMeta('description',meta.description);setMeta('og:title',meta.title,true);setMeta('og:description',meta.description,true);setMeta('og:image',absoluteAssetUrl(meta.image),true);setMeta('twitter:card','summary_large_image');setMeta('twitter:title',meta.title);setMeta('twitter:description',meta.description);setMeta('twitter:image',absoluteAssetUrl(meta.image));
    if(siteUrl){let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.setAttribute('rel','canonical');document.head.appendChild(canonical);}canonical.setAttribute('href',publicPageUrl(location.pathname));setMeta('og:url',publicPageUrl(location.pathname),true);}
    if(previous.current!==location.pathname){window.scrollTo(0,0);main.current?.focus({preventScroll:true});previous.current=location.pathname;}
  },[location.pathname]);
  return <><a className="skip-link" href="#main">Skip to content</a><div id="top"/><div className="scroll-progress" aria-hidden="true"/><Header/><main ref={main} id="main" tabIndex={-1} key={location.pathname}><Suspense fallback={<div className="route-loading" role="status">Opening the next chapter…</div>}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/books" element={<Collection/>}/><Route path="/books/the-observer" element={<BookPage id="observer"/>}/><Route path="/books/dreamwind" element={<BookPage id="dreamwind"/>}/><Route path="/news" element={<News/>}/><Route path="/contact" element={<Contact/>}/><Route path="/frankfurt-book-fair-2026" element={<Frankfurt/>}/><Route path="*" element={<NotFound/>}/></Routes><PageEffects/></Suspense></main><Footer/><ExploreCursor/></>;
}
