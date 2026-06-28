import { Product, Category, Review } from './types';
import silkDressImg from './assets/images/silk_dress_1782562968098.jpg';
import leatherBagImg from './assets/images/leather_bag_1782562988220.jpg';
import perfumeImg from './assets/images/perfume_1782563000783.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'Apparel',
    name: 'Apparel',
    description: 'Artisanal tailoring, lightweight linen, and luxurious Grade-A Mongolian cashmere.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    description: 'Sculptured Italian leather bags, hand-polished eyewear, and solid gold accents.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'Fragrance',
    name: 'Fragrance & Self',
    description: 'Sensory journeys captured in hand-blown glass, layered with precious organic extracts.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'aura-silk-dress',
    name: 'Aura Silk Wrap Dress',
    category: 'Apparel',
    price: 320,
    rating: 4.9,
    reviewsCount: 42,
    image: silkDressImg,
    images: [
      silkDressImg,
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Draped meticulously from heavy sand-washed 100% mulberry silk, this fluid wrap dress features a subtle matte luster and is designed to contour naturally to your silhouette. Perfect for warm evenings or upscale daytime affairs.',
    details: [
      '100% Sand-washed Mulberry Silk (22 momme)',
      'Adjustable internal ribbon and external wrap tie closure',
      'Elegant midi length with cascading draped side hem',
      'Dry clean only to maintain premium soft silk texture',
      'Ethically made in small batches in Florence, Italy'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Oatmeal', hex: '#F3EFE9' },
      { name: 'Sienna', hex: '#8F5841' },
      { name: 'Noir', hex: '#1C1C1C' }
    ],
    featured: true,
    isNew: true,
    inStock: true,
    materials: '100% Mulberry Silk'
  },
  {
    id: 'sienna-shoulder-bag',
    name: 'Sienna Shoulder Bag',
    category: 'Accessories',
    price: 480,
    rating: 4.8,
    reviewsCount: 29,
    image: leatherBagImg,
    images: [
      leatherBagImg,
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Handcrafted in Tuscany from full-grain vegetable-tanned calfskin leather, the Sienna Shoulder Bag features a sculptural curved silhouette, adjustable strap, solid brass hardware, and a luxury suede-lined interior. Its minimalism is a masterclass in modern design.',
    details: [
      'Full-grain vegetable-tanned calfskin leather',
      'Velvety soft genuine Italian suede lining',
      'Solid brushed brass magnetic clasp and buckle details',
      'Interior zippered slip pocket and smartphone compartment',
      'Dimensions: 24cm W x 18cm H x 7cm D'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan/Cognac', hex: '#B87D4B' },
      { name: 'Noir', hex: '#1C1C1C' },
      { name: 'Sage Green', hex: '#7A8C7F' }
    ],
    featured: true,
    isNew: false,
    inStock: true,
    materials: 'Vegetable-Tanned Calfskin Leather'
  },
  {
    id: 'l-ether-parfum',
    name: 'L\'Éther Eau de Parfum',
    category: 'Fragrance',
    price: 145,
    rating: 5.0,
    reviewsCount: 56,
    image: perfumeImg,
    images: [
      perfumeImg,
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A delicate yet sophisticated genderless scent profile layering white cedarwood, dry vetiver, and clean morning dew with high notes of crushed cardamom, coriander, and fresh key mandarin. Curated for the sensory connoisseur and poured into a hand-polished heavy glass bottle.',
    details: [
      'Top Notes: Crushed Cardamom, Coriander, Mandarin Peel',
      'Heart Notes: Crisp Iris, Warm Ambergris, Morning Dew Accord',
      'Base Notes: Himalayan Cedarwood, Vetiver Extract, Suede Musk',
      'Concentration: 18% Extrait de Parfum',
      '100% Organic botanical alcohol base, paraben and sulfate-free'
    ],
    sizes: ['50ml', '100ml'],
    colors: [
      { name: 'Amber-Gold Essence', hex: '#EBE0CC' }
    ],
    featured: true,
    isNew: true,
    inStock: true,
    materials: 'Pure botanical essential oils, hand-blown glass'
  },
  {
    id: 'cashmere-mockneck',
    name: 'Cashmere Mock-Neck Knit',
    category: 'Apparel',
    price: 260,
    rating: 4.7,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Woven from rare Grade-A Mongolian cashmere fiber, this incredibly soft mock-neck knit offers optimal insulation with an incredibly lightweight feel. Finished with sophisticated rib-knit sleeve cuffs and seamless collar construction.',
    details: [
      '100% Premium Grade-A Mongolian Cashmere (12 gauge)',
      'Refined 2-ply knit stitch for thermal temperature regulation',
      'Elegant, non-constricting mock-neck collar height',
      'Ribbed seamless detailing at neckline, sleeves, and hemline',
      'Hand wash cold or gentle dry clean only'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#F9F6F0' },
      { name: 'Soft Charcoal', hex: '#4A4A4A' },
      { name: 'Camel', hex: '#C19A6B' }
    ],
    featured: false,
    isNew: false,
    inStock: true,
    materials: '100% Mongolian Cashmere'
  },
  {
    id: 'tailored-blazer',
    name: 'Bespoke Tailored Blazer',
    category: 'Apparel',
    price: 395,
    rating: 4.9,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A structured contemporary blazer tailored with immaculate precision from lightweight Italian worsted wool. Features elegant high-set notched lapels, padded shoulders, welt pockets, and a full inner cupro jacquard liner for silky smooth dressing.',
    details: [
      'Outer shell: 85% Virgin Wool, 15% Mulberry Silk',
      'Lining: 100% Breathable cupro jacquard',
      'Flattering relaxed double-breasted button posture',
      'Dual rear vents and genuine horn button accents',
      'Meticulously tailored by master couturiers'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Oat Sand', hex: '#D8C6B1' },
      { name: 'Noir', hex: '#1C1C1C' }
    ],
    featured: false,
    isNew: true,
    inStock: true,
    materials: '85% Virgin Wool, 15% Mulberry Silk'
  },
  {
    id: 'soleil-sunglasses',
    name: 'Soleil Acetate Glasses',
    category: 'Accessories',
    price: 180,
    rating: 4.6,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Hand-polished thick acetate tortoiseshell sunglasses featuring custom robust metal hinges, and premium scratch-resistant olive green lenses providing total 100% UVA/UVB protection. Timeless resort styling.',
    details: [
      'Custom hand-polished organic plant-based bio-acetate',
      'Seven-bar barrel hinges with robust wire cores',
      'Class 1 scratch-proof CR-39 sun protect lenses',
      'Comes with handcrafted top-grain leather carry envelope',
      'Universal keyhole nose bridge fit for optimal comfort'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tortoiseshell', hex: '#4B3728' },
      { name: 'Sleek Black', hex: '#000000' }
    ],
    featured: false,
    isNew: false,
    inStock: true,
    materials: 'Bio-Acetate, CR-39 Lenses'
  },
  {
    id: 'gold-hoop-earrings',
    name: 'Hammered 14k Gold Hoops',
    category: 'Accessories',
    price: 110,
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Medium-sized, lightweight 14k gold-filled hollow hoops designed for seamless daily wear. Features a delicate, hand-hammered texture that catches sunlight beautifully, adding a subtle luxurious glow to any look.',
    details: [
      '14k Gold-filled (hypoallergenic & tarnish-resistant)',
      'Entirely hand-hammered texture for unique surface reflections',
      'Secure, clicking hinge clasp backing',
      'Diameter: 22mm, Thickness: 2.5mm',
      'Handcrafted by artisan metalworkers in Portland, Oregon'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Polished Gold', hex: '#E5C158' }
    ],
    featured: false,
    isNew: false,
    inStock: true,
    materials: '14k Gold-Filled Alloy'
  },
  {
    id: 'linen-resort-shirt',
    name: 'Linen Resort Shirt',
    category: 'Apparel',
    price: 135,
    rating: 4.7,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Crafted from highly breathable organic European flax linen, this resort shirt features a clean French seamless placket, authentic mother-of-pearl buttons, and a relaxed camp collar designed for leisurely vacation wear.',
    details: [
      '100% Certified organic European flax linen (medium weight)',
      'Authentic shimmering mother-of-pearl closure buttons',
      'Relaxed vintage camp collar layout',
      'Pre-washed and tumbled for incredible immediate softness',
      'Fair-Trade certified apparel manufacturing'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#DFD8CE' },
      { name: 'Sky Blue', hex: '#BED5E5' },
      { name: 'Terracotta', hex: '#C56B51' }
    ],
    featured: false,
    isNew: false,
    inStock: false,
    materials: '100% European Linen'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Clara S.',
    rating: 5,
    date: 'June 18, 2026',
    comment: 'The Aura Silk Wrap Dress is an absolute dream. The silk is dense and weighted beautifully, not flimsy like other dresses. It floats elegantly when I walk.'
  },
  {
    id: 'rev-2',
    author: 'Liam H.',
    rating: 5,
    date: 'May 29, 2026',
    comment: 'Purchased the Sienna bag for my partner. The craftsmanship is flawless—stitching is straight, the leather has that wonderful earthy tannery scent, and it holds its sculptural form perfectly.'
  },
  {
    id: 'rev-3',
    author: 'Meredith K.',
    rating: 5,
    date: 'June 02, 2026',
    comment: 'L\'Éther Parfum is my new signature scent. It starts with a crisp citrus-spice pop and dries down into the most soothing, velvety cedar and iris. Truly unisex and sophisticated.'
  }
];
