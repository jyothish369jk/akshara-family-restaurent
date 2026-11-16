export type MenuCategory =
  | 'Akshara Specials'
  | 'Veg Starters'
  | 'Non-Veg Starters'
  | 'Prawns & Fish Starters'
  | 'Veg Fried Rice'
  | 'Non-Veg Fried Rice'
  | 'Veg Biryanis'
  | 'Non-Veg Biryanis';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
}

export interface ShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  targetCategory: MenuCategory;
}

export interface CustomerReview {
  id: string;
  author: string;
  neighborhood: string;
  dishPraised: string;
  rating: number;
  quote: string;
  visitContext: string;
}

export const RESTAURANT_INFO = {
  name: 'Akshara Family Restaurant',
  shortName: 'Akshara',
  address: '4, Balaji Junction, Vizianagaram, Andhra Pradesh 535002',
  phoneDisplay: '+91 85001 88835',
  phoneHref: 'tel:+918500188835',
  whatsappDigits: '918500188835',
  upiId: '8500188835@upi',
  hours: '11:30 AM – 11:00 PM, Open All Days',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=4,%20Balaji%20Junction,%20Vizianagaram,%20Andhra%20Pradesh%20535002&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=4+Balaji+Junction+Vizianagaram+Andhra+Pradesh+535002',
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'Akshara Specials',
  'Veg Starters',
  'Non-Veg Starters',
  'Prawns & Fish Starters',
  'Veg Fried Rice',
  'Non-Veg Fried Rice',
  'Veg Biryanis',
  'Non-Veg Biryanis',
];

export const SHOWCASE_PHOTOS: ShowcaseCard[] = [
  {
    id: 'showcase-biryani',
    title: 'Signature Andhra Dum & Special Biryani',
    subtitle: 'Slow-cooked in copper handis with saffron basmati & stone-ground spice',
    image: '/src/assets/images/andhra_dum_biryani_1794805765271.jpg',
    targetCategory: 'Akshara Specials',
  },
  {
    id: 'showcase-starters',
    title: 'Sizzling Tandoori & Spicy Starters',
    subtitle: 'Crisp curry-leaf Chicken 65, Chicken Majestic & smoky lollypops',
    image: '/src/assets/images/tandoori_spicy_starters_1794805766070.jpg',
    targetCategory: 'Non-Veg Starters',
  },
  {
    id: 'showcase-rice',
    title: 'Aromatic Wok-Tossed Fried Rice',
    subtitle: 'High-flame tossed grains with roasted cashews, sweet corn & herbs',
    image: '/src/assets/images/wok_tossed_fried_rice_1794805766057.jpg',
    targetCategory: 'Veg Fried Rice',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Akshara Specials (7)
  { id: 'as-1', name: 'Akshara Special Biryani', price: 349, category: 'Akshara Specials', isVeg: false },
  { id: 'as-2', name: 'Mutton Biryani', price: 379, category: 'Akshara Specials', isVeg: false },
  { id: 'as-3', name: 'Bhimavaram Royyila Biryani', price: 289, category: 'Akshara Specials', isVeg: false },
  { id: 'as-4', name: 'Naatukodi Biryani', price: 409, category: 'Akshara Specials', isVeg: false },
  { id: 'as-5', name: 'Chicken Tikka Biryani', price: 279, category: 'Akshara Specials', isVeg: false },
  { id: 'as-6', name: 'Chicken Tandoori Biryani', price: 349, category: 'Akshara Specials', isVeg: false },
  { id: 'as-7', name: 'Chicken Kalmi Biryani', price: 279, category: 'Akshara Specials', isVeg: false },

  // Veg Starters (15)
  { id: 'vs-1', name: 'Veg Manchurian', price: 179, category: 'Veg Starters', isVeg: true },
  { id: 'vs-2', name: 'Paneer Manchurian', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-3', name: 'Mushroom Manchurian', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-4', name: 'Paneer 555', price: 229, category: 'Veg Starters', isVeg: true },
  { id: 'vs-5', name: 'Baby Corn Manchurian', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-6', name: 'Chilly Paneer', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-7', name: 'Chilly Mushroom', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-8', name: 'Chilly Baby Corn', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-9', name: 'Paneer 65', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-10', name: 'Mushroom 65', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-11', name: 'Baby Corn 65', price: 199, category: 'Veg Starters', isVeg: true },
  { id: 'vs-12', name: 'Paneer Majestic', price: 229, category: 'Veg Starters', isVeg: true },
  { id: 'vs-13', name: 'Paneer Tikka', price: 249, category: 'Veg Starters', isVeg: true },
  { id: 'vs-14', name: 'Crispy Corn', price: 169, category: 'Veg Starters', isVeg: true },
  { id: 'vs-15', name: 'Kaju Fry', price: 269, category: 'Veg Starters', isVeg: true },

  // Non-Veg Starters (22)
  { id: 'nvs-1', name: 'Chicken 95', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-2', name: 'Chilly Chicken', price: 219, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-3', name: 'Chicken 65', price: 229, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-4', name: 'Chicken Manchurian', price: 229, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-5', name: 'Chilly Wings', price: 219, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-6', name: 'Chicken Lollypop Wet (6pcs)', price: 239, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-7', name: 'Chicken Lollypop Roast (6pcs)', price: 219, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-8', name: 'Stick Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-9', name: 'Kaju Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-10', name: 'Pepper Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-11', name: 'Crispy Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-12', name: 'Basket Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-13', name: 'Chicken Majestic', price: 259, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-14', name: 'Chicken 555', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-15', name: 'Dragon Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-16', name: 'Chicken Guljara', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-17', name: 'Lemon Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-18', name: 'Sezwan Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-19', name: 'Red Hot Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-20', name: 'Chicken Fry', price: 239, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-21', name: 'Coriander Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },
  { id: 'nvs-22', name: 'Ginger Chicken', price: 249, category: 'Non-Veg Starters', isVeg: false },

  // Prawns & Fish Starters (15)
  { id: 'pfs-1', name: 'Prawns Fry', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-2', name: 'Prawns 65', price: 239, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-3', name: 'Chilly Prawns', price: 239, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-4', name: 'Pepper Prawns', price: 239, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-5', name: 'Loose Prawns', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-6', name: 'Sezwan Prawns', price: 259, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-7', name: 'Garlic Prawns', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-8', name: 'Apollo Fish', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-9', name: 'Fish 65', price: 229, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-10', name: 'Fish Fry', price: 229, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-11', name: 'Chilly Fish', price: 229, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-12', name: 'Pepper Fish', price: 229, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-13', name: 'Ginger Fish', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-14', name: 'Garlic Fish', price: 249, category: 'Prawns & Fish Starters', isVeg: false },
  { id: 'pfs-15', name: 'Basket Fish', price: 249, category: 'Prawns & Fish Starters', isVeg: false },

  // Veg Fried Rice (15)
  { id: 'vfr-1', name: 'Veg Fried Rice', price: 169, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-2', name: 'Veg Sweet Corn Fried Rice', price: 169, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-3', name: 'Veg Manchurian Fried Rice', price: 169, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-4', name: 'Veg Sezwan Fried Rice', price: 189, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-5', name: 'Baby Corn Fried Rice', price: 189, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-6', name: 'Paneer Fried Rice', price: 189, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-7', name: 'Mushroom Fried Rice', price: 189, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-8', name: 'Veg Ghee Fried Rice', price: 179, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-9', name: 'Jeera Rice', price: 149, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-10', name: 'Special Veg Fried Rice', price: 199, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-11', name: 'Special Paneer Fried Rice', price: 249, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-12', name: 'Special Mushroom Fried Rice', price: 249, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-13', name: 'Special Babycorn Fried Rice', price: 249, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-14', name: 'Kaju Fried Rice', price: 209, category: 'Veg Fried Rice', isVeg: true },
  { id: 'vfr-15', name: 'Special Kaju Fried Rice', price: 259, category: 'Veg Fried Rice', isVeg: true },

  // Non-Veg Fried Rice (10)
  { id: 'nvfr-1', name: 'Egg Fried Rice', price: 189, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-2', name: 'Chicken Fried Rice', price: 219, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-3', name: 'Prawns Fried Rice', price: 239, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-4', name: 'Mutton Fried Rice', price: 259, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-5', name: 'Non-Veg Mixed Fried Rice', price: 279, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-6', name: 'Special Chicken Fried Rice', price: 249, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-7', name: 'Special Prawns Fried Rice', price: 269, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-8', name: 'Special Mutton Fried Rice', price: 289, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-9', name: 'Egg Sezwan Fried Rice', price: 199, category: 'Non-Veg Fried Rice', isVeg: false },
  { id: 'nvfr-10', name: 'Chicken Sezwan Fried Rice', price: 239, category: 'Non-Veg Fried Rice', isVeg: false },

  // Veg Biryanis (13)
  { id: 'vb-1', name: 'Veg Biryani', price: 179, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-2', name: 'Gongura Veg Biryani', price: 189, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-3', name: 'Ulavacharu Veg Biryani', price: 189, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-4', name: 'Avakai Veg Biryani', price: 189, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-5', name: 'Special Veg Biryani', price: 219, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-6', name: 'Special Paneer Biryani', price: 259, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-7', name: 'Special Mushroom Biryani', price: 259, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-8', name: 'Special Babycorn Biryani', price: 259, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-9', name: 'Special Kaju Biryani', price: 269, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-10', name: 'Paneer Biryani', price: 219, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-11', name: 'Mushroom Biryani', price: 219, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-12', name: 'Babycorn Biryani', price: 219, category: 'Veg Biryanis', isVeg: true },
  { id: 'vb-13', name: 'Sweet Corn Biryani', price: 209, category: 'Veg Biryanis', isVeg: true },

  // Non-Veg Biryanis (15)
  { id: 'nvb-1', name: 'Plain Biryani', price: 139, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-2', name: 'Chicken Dum Biryani', price: 219, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-3', name: 'Chicken Fry Biryani', price: 239, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-4', name: 'Egg Biryani', price: 189, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-5', name: 'Special Fish Biryani', price: 279, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-6', name: 'Chicken Mughlai Biryani', price: 249, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-7', name: 'Wings Biryani', price: 259, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-8', name: 'Lollypop Biryani', price: 269, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-9', name: 'Chicken Avakai Biryani', price: 249, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-10', name: 'Chicken Ulavacharu Biryani', price: 249, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-11', name: 'Special Chicken Biryani', price: 259, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-12', name: 'Chicken Gongura Biryani', price: 259, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-13', name: 'Prawns Biryani', price: 269, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-14', name: 'Special Prawns Biryani', price: 299, category: 'Non-Veg Biryanis', isVeg: false },
  { id: 'nvb-15', name: 'Fish Biryani', price: 249, category: 'Non-Veg Biryanis', isVeg: false },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Srinivasa Rao & Family',
    neighborhood: 'Balaji Nagar, Vizianagaram',
    dishPraised: 'Naatukodi Biryani',
    rating: 5,
    quote:
      'Every Sunday lunch with my parents begins here. The Naatukodi Biryani carries true village-style spice warmth without overpowering oil, and the AC family hall feels calm even at peak hours.',
    visitContext: 'Sunday Family Dine-In',
  },
  {
    id: 'rev-2',
    author: 'Padmavathi & Kiran',
    neighborhood: 'Cantonment, Vizianagaram',
    dishPraised: 'Bhimavaram Royyila Biryani',
    rating: 5,
    quote:
      'The Bhimavaram Royyila Biryani has generous, tender prawns cooked right into fragrant basmati rice. Clean tables, courteous staff, and zero waiting when we reserve via WhatsApp.',
    visitContext: 'Anniversary Dinner',
  },
  {
    id: 'rev-3',
    author: 'Harish Varma',
    neighborhood: 'Phool Bagh, Vizianagaram',
    dishPraised: 'Chicken Majestic',
    rating: 5,
    quote:
      'Best Chicken Majestic and Apollo Fish near Balaji Junction. Crispy on the outside, creamy spiced glaze inside—our whole family orders extra plates every single visit.',
    visitContext: 'Weekend Takeaway',
  },
  {
    id: 'rev-4',
    author: 'Lakshmi Narayana',
    neighborhood: 'Kothagraharam, Vizianagaram',
    dishPraised: 'Gongura Veg Biryani & Paneer 555',
    rating: 5,
    quote:
      'Rare to find a family restaurant where both vegetarian and non-veg dishes get equal care. Their Gongura Veg Biryani and Paneer 555 are remarkably fresh and aromatic.',
    visitContext: 'Family Gathering',
  },
  {
    id: 'rev-5',
    author: 'Divya & Sai Teja',
    neighborhood: 'Dasannapeta, Vizianagaram',
    dishPraised: 'Akshara Special Biryani',
    rating: 5,
    quote:
      'Ordered through their direct WhatsApp & UPI flow for a 10-person home dinner—hot copper-pot quality packing, accurate pricing, and delivered right on time near Balaji Junction.',
    visitContext: 'Home Delivery',
  },
  {
    id: 'rev-6',
    author: 'Venkata Ramana Murthy',
    neighborhood: 'VT Agraharam, Vizianagaram',
    dishPraised: 'Mutton Biryani & Loose Prawns',
    rating: 5,
    quote:
      'Hygienic open-feeling dining room, spotless cutlery, and attentive service for elders and kids alike. Mutton Biryani falls right off the bone.',
    visitContext: 'Evening Family Meal',
  },
];
