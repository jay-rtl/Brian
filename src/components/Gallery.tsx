import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { books } from '../data';
const photos = Object.values(books);
export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);
  useEffect(() => {if (index !== null && !dialog.current?.open) dialog.current?.showModal();}, [index]);
  function close() { dialog.current?.close(); setIndex(null); }
  function next(delta: number) {setIndex(i => i === null ? null : (i + delta + photos.length) % photos.length);}
  return <><div className="photo-gallery">{photos.map((book,i) => <figure className="reveal" key={book.id}>
    <button className="gallery-image" onClick={() => setIndex(i)} aria-label={`Enlarge ${book.caption}`}><img src={book.photo} alt={book.caption} width="619" height="823" loading="lazy"/><span><Expand size={19}/> View photograph</span></button>
    <figcaption><span>0{i+1}</span>{book.caption}</figcaption>
  </figure>)}</div>
  <dialog ref={dialog} className="lightbox" onCancel={close} onClose={() => setIndex(null)} onClick={e=>{if(e.target === e.currentTarget)close();}} onKeyDown={e=>{if(e.key==='ArrowRight')next(1);if(e.key==='ArrowLeft')next(-1);}} onTouchStart={e=>{touchX.current=e.changedTouches[0].clientX;}} onTouchEnd={e=>{const delta=e.changedTouches[0].clientX-touchX.current;if(Math.abs(delta)>50)next(delta<0?1:-1);}}>
    {index !== null && <div className="lightbox-inner"><button className="lightbox-close icon-button" onClick={close} aria-label="Close photograph"><X/></button><button className="lightbox-prev icon-button" onClick={()=>next(-1)} aria-label="Previous photograph"><ArrowLeft/></button><figure><img src={photos[index].photo} alt={photos[index].caption}/><figcaption>{photos[index].caption}<span>{index+1} / 2</span></figcaption></figure><button className="lightbox-next icon-button" onClick={()=>next(1)} aria-label="Next photograph"><ArrowRight/></button></div>}
  </dialog></>;
}
