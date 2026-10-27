import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export function NotFound() {return <section className="not-found section page-width"><p className="eyebrow">404 · AN UNWRITTEN PAGE</p><h1>This story<br/><em>is elsewhere.</em></h1><p>The page you’re looking for could not be found.</p><Link to="/" className="button solid">Return home<ArrowRight size={17}/></Link></section>;}
export default NotFound;
