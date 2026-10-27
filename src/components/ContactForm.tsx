import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '';
export default function ContactForm() {
  const [state,setState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form=e.currentTarget; if(!form.reportValidity())return;
    if(!endpoint){setState('error');return;}
    const values=Object.fromEntries(new FormData(form)); if(values.website)return;
    setState('sending');
    try {const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});if(!response.ok)throw new Error('Delivery failed');const body=await response.json();if(body.sent!==true)throw new Error('Delivery not confirmed');setState('sent');form.reset();}catch{setState('error');}
  }
  return <form className="contact-form" onSubmit={submit}>
    <p className="form-notice">{endpoint ? 'Use this form for book, press, and rights enquiries. Please avoid sensitive personal information.' : 'Contact delivery is awaiting configuration. Messages cannot be sent yet.'}</p>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120}/></label><label>Email address<input type="email" name="email" autoComplete="email" required maxLength={254}/></label></div>
    <label>What would you like to discuss?<select name="subject" required defaultValue=""><option value="" disabled>Select an enquiry</option><option>Books & readership</option><option>Press & media</option><option>Rights & representation</option><option>General enquiry</option></select></label>
    <label>Your message<textarea name="message" rows={5} required minLength={10} maxLength={5000}/></label>
    <div className="honeypot" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="button solid" disabled={!endpoint||state==='sending'||state==='sent'} type="submit">{state==='sent'?<><Check size={18}/>Message sent</>:state==='sending'?'Sending…':<>Send your message<ArrowUpRight size={17}/></>}</button>
    <p role="status" className="form-status">{state==='error'?'Your message was not sent. Please try again once contact delivery is available.':state==='sent'?'Your message has been sent. Thank you for getting in touch.':''}</p>
    <small>Before this form opens, the site owner must publish a privacy notice covering the delivery provider, access, storage, and retention of enquiries.</small>
  </form>;
}
