import { assetUrl } from './urls';
export type BookId = 'observer' | 'dreamwind';
export const books = {
  observer: {
    id: 'observer' as BookId, title: 'The Observer', short: 'The Observer', route: '/books/the-observer', genre: 'Supernatural fiction', eyebrow: 'FAITH. CONFLICT. TRUTH.', tagline: 'Some battles are beyond what we see.',
    intro: 'A world caught between darkness and light. A witness bound to the truth. An unseen conflict with eternal consequences.',
    synopsis: [
      'You are in a battle, but most people do not even recognize that it is not the wars they read about in the news taking place in many corners of the world that are important. The wars and battles that rage throughout the world between countries, political and religious ideologies, the seeking of power, are not the battles that have eternal values as a core objective. It is the battle for the souls of man that has eternal consequences, and it is where one will spend eternity that counts.',
      'I am an Observer. I do not take sides. I watch. I record. I obey oneness higher than all. But when a violation occurs that threatens to blind three chosen individuals to a truth they must know, I am instructed to act. This is the story of that violation, the unseen battles it reveals, and the message meant for three.'
    ],
    themes: ['The unseen conflict', 'Faith & free will', 'Truth & consequence'],
    photo: assetUrl('assets/frankfurt-observer.webp'), caption: 'The Observer — Promotional Display, Frankfurt Book Fair 2026',
    quote: 'I am an Observer. I do not take sides. I watch. I record.',
    description: 'Discover The Observer by Brian Palmieri, a supernatural story of faith, truth, and the unseen conflict between darkness and light.'
  },
  dreamwind: {
    id: 'dreamwind' as BookId, title: 'Dreamwind and the Sisters of the Sky', short: 'Dreamwind', route: '/books/dreamwind', genre: 'Middle-grade fantasy · Book 1', eyebrow: 'WHERE DREAMS TAKE FLIGHT.', tagline: 'Two sisters. One magical pony. An extraordinary adventure.',
    intro: 'Beyond the stars, a hidden kingdom awaits. For Alessa and Eva, a wish for a pony becomes a journey into a world they never imagined.',
    synopsis: [
      'Alessa and Eva are two sisters with a dream—to have a pony of their very own. One night, a glowing saddle appears in Eva’s room, and with it comes Dreamwind, a shimmering, talking pony who can fly.',
      'Together, they soar beyond the stars to Dreamland, a hidden kingdom above the clouds where animals speak, magic is real, and an ancient prophecy has chosen them for a purpose only they can fulfill.',
      'But Dreamland is in danger. Darkness is rising, and only the Sisters of the Sky can restore the light. With courage, friendship, and the power of believing, Alessa and Eva embark on an unforgettable journey that will test their hearts and change their world forever.'
    ], themes: ['Courage & friendship', 'The bond of family', 'The power of believing'],
    photo: assetUrl('assets/frankfurt-dreamwind.webp'), caption: 'Dreamwind and the Sisters of the Sky — Promotional Display, Frankfurt Book Fair 2026',
    quote: 'Two sisters. A magical pony. An adventure that will change their world forever.',
    description: 'Enter Dreamwind and the Sisters of the Sky, Book 1 by Brian Palmieri. A magical middle-grade adventure about courage, family, and imagination.'
  }
};
export const routes = ['/', '/about', '/books', '/books/the-observer', '/books/dreamwind', '/news', '/contact', '/frankfurt-book-fair-2026'];
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
export const publicPageUrl = (path:string) => `${siteUrl}${path.replace(/\/+$/, '')}/`;
export function metadata(path: string) {
  path = path.replace(/\/+$/, '') || '/';
  const book = Object.values(books).find(b => b.route === path);
  const titles: Record<string,string> = {'/': 'Brian Palmieri | Stories Beyond the Ordinary', '/about': 'About Brian Palmieri | A World of Stories', '/books': 'Books by Brian Palmieri | The Observer & Dreamwind', '/news': 'News & Updates | Brian Palmieri', '/contact': 'Contact | Brian Palmieri', '/frankfurt-book-fair-2026': 'Brian Palmieri | Featured at Frankfurt Book Fair 2026'};
  const descriptions: Record<string,string> = {'/': 'Explore the worlds of Brian Palmieri: the supernatural conflict of The Observer and the magical skies of Dreamwind and the Sisters of the Sky.', '/about': 'Meet the stories of Brian Palmieri, author of The Observer and Dreamwind and the Sisters of the Sky.', '/books': 'Discover two distinct story worlds from Brian Palmieri. Explore The Observer and Dreamwind and the Sisters of the Sky, Book 1.', '/news': 'Book news and updates from Brian Palmieri, including a photographic showcase of the promotional displays at Frankfurt Book Fair 2026.', '/contact': 'Contact information and inquiry options for Brian Palmieri’s books, press, and rights enquiries.', '/frankfurt-book-fair-2026': "Explore Brian Palmieri's The Observer and Dreamwind and the Sisters of the Sky, featured through promotional displays at Frankfurt Book Fair 2026."};
  return {title: book ? `${book.title} | Brian Palmieri` : titles[path] || 'Page not found | Brian Palmieri', description: book?.description || descriptions[path] || 'Explore Brian Palmieri’s books.', image: path.includes('frankfurt') ? assetUrl('assets/frankfurt-observer.webp') : assetUrl(`assets/${book?.id || 'observer'}-front.webp`)};
}
