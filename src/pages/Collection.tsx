import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Book from '../components/Book';
import { books } from '../data';
import { Closing } from './shared';
export function Collection() {return <><section className="page-intro page-width"><p className="eyebrow">THE BOOKS OF BRIAN PALMIERI</p><h1>A shelf of stories.<br/><em>A universe of possibility.</em></h1><p>Choose the world that calls to you.</p></section><div className="collection">{Object.values(books).map((b,i)=><section key={b.id} className={`collection-row ${b.id}`}><div className="page-width collection-inner"><div className="collection-book reveal"><Book id={b.id} interactive/></div><div className="collection-copy reveal"><p className="eyebrow">0{i+1} / {b.genre}</p><h2>{b.title}</h2><p className="serif-lead">{b.tagline}</p><p>{b.intro}</p><Link className="button outline" to={b.route}>Discover the story<ArrowUpRight size={17}/></Link></div></div></section>)}</div><Closing/></>;}
export default Collection;
