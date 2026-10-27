import { assetUrl } from '../urls';
import { lazy, Suspense, useRef, useState } from 'react';
import { Rotate3D } from 'lucide-react';
import { books, type BookId } from '../data';
const BookScene = lazy(() => import('./BookScene'));
export default function Book({ id, interactive = false, priority = false }: { id: BookId; interactive?: boolean; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  function toggle() {
    if(active){setActive(false);return;}
    const probe=document.createElement('canvas');
    const context=probe.getContext('webgl2');
    if(!context){setError(true);return;}
    context.getExtension('WEBGL_lose_context')?.loseContext();
    setError(false);setActive(true);
  }
  function move(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--tilt-x', `${-(e.clientY - rect.top - rect.height / 2) / 45}deg`);
    ref.current?.style.setProperty('--tilt-y', `${(e.clientX - rect.left - rect.width / 2) / 35}deg`);
  }
  return <div className={`book-presentation ${id}`} onPointerMove={move} onPointerLeave={() => { ref.current?.style.setProperty('--tilt-x', '0deg'); ref.current?.style.setProperty('--tilt-y', '0deg'); }}>
    <div className={`physical-book ${active && !error ? 'canvas-active' : ''}`} ref={ref}>
      <img className="book-front" src={assetUrl(`assets/${id}-front.webp`)} alt={`${books[id].title} — original front cover by Brian Palmieri`} width={id === 'observer' ? 479 : 483} height={id === 'observer' ? 654 : 655} fetchPriority={priority ? 'high' : undefined} loading={priority ? 'eager' : 'lazy'} />
      <img className="book-spine" src={assetUrl(`assets/${id}-spine.webp`)} alt="" aria-hidden="true" />
      <span className="book-pages" aria-hidden="true" />
    </div>
    {active && !error && <div className="book-webgl"><Suspense fallback={<span className="scene-loading">Preparing 3D view…</span>}><BookScene id={id} onError={() => {setError(true); setActive(false);}} /></Suspense></div>}
    {interactive && <button className="book-control" onClick={toggle} aria-pressed={active}>{<Rotate3D size={16}/>} {active ? 'Return to cover' : 'Explore in 3D'}</button>}
    {error && <small className="scene-error" role="status">3D is unavailable. The original cover is shown.</small>}
  </div>;
}
