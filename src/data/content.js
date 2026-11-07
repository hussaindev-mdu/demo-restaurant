// All site content lives here so it is easy to edit.
// NOTE: Every name, address, phone number and review is FICTIONAL demo content.

export const BRAND = {
  name: 'Saffron & Spice',
  tagline: 'South & North Indian Fusion',
}

export const CONTACT = {
  address: ['42 Spice Market Lane', 'Indiranagar, Bengaluru 560038', 'Karnataka, India'],
  addressLine: '42 Spice Market Lane, Indiranagar, Bengaluru 560038 (fictional)',
  phoneDisplay: '+91 90000 00000',
  phoneTel: '+919000000000',
  // Replace with a real number (digits only, with country code) before going live.
  whatsappNumber: '919000000000',
  email: 'hello@saffronandspice.example',
}

export const HOURS = [
  { days: 'Monday – Friday', time: '12:00 – 15:30  ·  18:30 – 23:00' },
  { days: 'Saturday – Sunday', time: '12:00 – 23:00' },
]

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'YouTube', href: 'https://www.youtube.com/' },
]

// Unsplash photo IDs (verified). Sized via query string in <SmartImage />.
export const PHOTOS = {
  hero: '1517248135467-4c7edcad34c4',
  interior: '1555396273-367ea4eb4db5',
  plating: '1414235077428-338989a2e8c0',
  terrace: '1559339352-11d035aa65de',
  spread: '1424847651672-bf20a4b0982b',
  chickenBiryani: '1631515243349-e0cb75fb8d3a',
  muttonBiryani: '1589302168068-964664d93dc0',
  dosa: '1668236543090-82eba5ee5976',
  butterChicken: '1565557623262-b51c2513a641',
  paneerTikka: '1567188040759-fb8a883dc6d8',
  meals: '1742281258189-3b933879867a',
  biryaniBowls: '1563379091339-03b21ab4a4f8',
  familyTray: '1546833999-b9f581a1996d',
  skewers: '1599487488170-d11ec9c172f0',
  curryPan: '1596797038530-2c107229654b',
  samosa: '1601050690597-df0568f70950',
  idli: '1630383249896-424e482df921',
  pavBhaji: '1606491956689-2ea866880c84',
}

export const MENU_CATEGORIES = ['All', 'Biryani', 'South Indian', 'North Indian']

export const MENU_ITEMS = [
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    category: 'Biryani',
    price: 349,
    photo: PHOTOS.chickenBiryani,
    description: 'Long-grain basmati slow-cooked dum style with tender chicken, saffron and fried onions.',
    alt: 'Plate of chicken biryani with a roasted chicken leg',
  },
  {
    id: 'mutton-biryani',
    name: 'Mutton Biryani',
    category: 'Biryani',
    price: 449,
    photo: PHOTOS.muttonBiryani,
    description: 'Slow-braised mutton layered with aromatic rice, mint and whole spices, sealed and steamed.',
    alt: 'Mutton biryani served on a white plate with raita',
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 189,
    photo: PHOTOS.dosa,
    description: 'Crisp golden dosa filled with spiced potato, served with coconut chutney and sambar.',
    alt: 'Crispy masala dosa with chutneys and sambar',
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    category: 'North Indian',
    price: 389,
    photo: PHOTOS.butterChicken,
    description: 'Tandoor-roasted chicken in a silky tomato and butter gravy, finished with cream and kasuri methi.',
    alt: 'Butter chicken curry served with naan bread',
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    category: 'North Indian',
    price: 319,
    photo: PHOTOS.paneerTikka,
    description: 'Cottage cheese marinated in hung curd and spices, charred in the tandoor with peppers.',
    alt: 'Grilled paneer tikka on a sizzling skillet',
  },
  {
    id: 'south-indian-meals',
    name: 'South Indian Meals',
    category: 'South Indian',
    price: 279,
    photo: PHOTOS.meals,
    description: 'A traditional thali with rice, sambar, rasam, poriyal, kootu, curd and payasam.',
    alt: 'South Indian thali with assorted curries in small bowls',
  },
]

export const OFFERS = [
  {
    id: 'family-feast',
    tag: 'Family Dining',
    title: 'The Family Feast',
    description:
      'A generous sharing spread for four: a biryani, two curries, tandoor starters, breads, dessert and soft drinks.',
    price: 2499,
    priceNote: 'for 4 guests',
    badge: 'Save 15%',
    detail: 'Daily, dinner service',
    photo: PHOTOS.familyTray,
    alt: 'Family-style sharing platter with several dishes',
    request: 'I am interested in the Family Feast offer.',
  },
  {
    id: 'weekend-brunch',
    tag: 'Weekend Special',
    title: 'Dum Biryani Weekend',
    description:
      'Saturdays and Sundays: a live dum biryani opening at your table, with kebabs, raita and a sweet to finish.',
    price: 799,
    priceNote: 'per guest',
    badge: 'Sat & Sun',
    detail: '12:00 – 16:00',
    photo: PHOTOS.biryaniBowls,
    alt: 'Biryani served in a brass handi with a golden spoon',
    request: 'I am interested in the Dum Biryani Weekend offer.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Ananya R.',
    role: 'Sample guest · Family dinner',
    quote:
      'A warm welcome, a biryani that arrives with theatre, and a menu the whole family could agree on. We’ll be back.',
  },
  {
    name: 'Karthik M.',
    role: 'Sample guest · Business lunch',
    quote:
      'Quiet corners for conversation, prompt service and dosas that are properly crisp. Perfect for a working lunch.',
  },
  {
    name: 'Meera & Rohan',
    role: 'Sample guests · Weekend out',
    quote:
      'We loved how North and South Indian flavours shared one table. Butter chicken alongside a masala dosa was a surprise hit.',
  },
]

export const GALLERY = [
  { id: 'g1', photo: PHOTOS.interior, alt: 'Restaurant dining hall with warm pendant lighting', className: 'col-span-2 row-span-2' },
  { id: 'g2', photo: PHOTOS.samosa, alt: 'Golden crisp samosas with green chilli', className: '' },
  { id: 'g3', photo: PHOTOS.terrace, alt: 'Open terrace dining area with sea views', className: 'row-span-2' },
  { id: 'g4', photo: PHOTOS.idli, alt: 'Soft idlis served with sambar and chutneys', className: '' },
  { id: 'g5', photo: PHOTOS.pavBhaji, alt: 'Buttery pav with bhaji', className: '' },
  { id: 'g6', photo: PHOTOS.spread, alt: 'A table laid with a shared spread of dishes', className: 'col-span-2' },
  { id: 'g7', photo: PHOTOS.skewers, alt: 'Chargrilled tikka skewers', className: '' },
]

export const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

export const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`

export const formatTime = (t) => {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`
}
