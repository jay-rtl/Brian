import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function ExploreCursor(){
  const cursor=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches)return;
    const el=cursor.current!;const x=gsap.quickTo(el,'x',{duration:.25,ease:'power2.out'});const y=gsap.quickTo(el,'y',{duration:.25,ease:'power2.out'});
    function move(event:PointerEvent){const target=event.target instanceof Element?event.target.closest('.world-panel, .gallery-image'):null;el.classList.toggle('is-active',Boolean(target));x(event.clientX);y(event.clientY);}
    function leave(){el.classList.remove('is-active');}
    window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);
    return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);x.tween.kill();y.tween.kill();};
  },[]);
  return <div className="explore-cursor" ref={cursor} aria-hidden="true"><span>EXPLORE</span></div>;
}
