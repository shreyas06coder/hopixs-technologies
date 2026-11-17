// Hospics Technologies Sample Dataset

export const VENUE_PROFILES = {
  restaurant: {
    id: 'restaurant',
    name: "L'Ambroisie Fine Dining",
    tagline: 'Modern French & Mediterranean Haute Cuisine',
    rating: 4.9,
    reviewsCount: 348,
    michelinStars: 2,
    location: 'Atrium Level, Grand Azure Resort',
    hours: '12:00 PM – 11:30 PM',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    curatedCategories: ['All', "Chef's Signature", 'Appetizers & Crudo', 'Artisan Mains', 'Cellar & Cocktails', 'Patisserie']
  },
  cafe: {
    id: 'cafe',
    name: 'Café Valois Artisan Coffee & Roastery',
    tagline: 'Single-Origin Reserve Brews & Viennoiserie',
    rating: 4.8,
    reviewsCount: 520,
    michelinStars: null,
    location: 'Sunken Garden Courtyard',
    hours: '06:30 AM – 08:00 PM',
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    curatedCategories: ['All', 'Espresso & Hand Pour', 'Cold & Nitro', 'Artisan Pastries', 'Brunch Tartines', 'Tea & Botanicals']
  }
};

export const MENU_ITEMS = [
  // Fine Dining Items
  {
    id: 'fd-1',
    venue: 'restaurant',
    category: "Chef's Signature",
    name: 'A5 Miyazaki Wagyu Tenderloin',
    frenchName: 'Filet de Bœuf Wagyu A5',
    price: 115,
    calories: '680 kcal',
    prepTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Black winter truffle demi-glace, confit bone marrow pomme purée, smoked baby leeks, and fleur de sel.',
    tags: ["Chef's Pick", 'Gluten-Free'],
    pairing: 'Château Margaux Premier Grand Cru 2015',
    options: {
      type: 'doneness',
      choices: ['Rare', 'Medium-Rare (Recommended)', 'Medium', 'Medium-Well']
    }
  },
  {
    id: 'fd-2',
    venue: 'restaurant',
    category: "Chef's Signature",
    name: 'Pan-Roasted Chilean Sea Bass',
    frenchName: 'Bar du Chili Rôti au Four',
    price: 88,
    calories: '520 kcal',
    prepTime: '18-22 min',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80',
    description: 'Miso sake glaze, saffron dashi broth, braised baby bok choy, pickled beech mushrooms, and oscietra caviar.',
    tags: ["Chef's Pick", 'Pescatarian'],
    pairing: 'Domaine Leflaive Puligny-Montrachet 2020',
    options: {
      type: 'sauce',
      choices: ['Classic Saffron Dashi', 'Yuzu Brown Butter', 'Truffle Emulsion']
    }
  },
  {
    id: 'fd-3',
    venue: 'restaurant',
    category: 'Appetizers & Crudo',
    name: 'Pugliese Burrata & Heirloom Tartare',
    frenchName: 'Burrata Crémeuse aux Tomates Anciennes',
    price: 36,
    calories: '410 kcal',
    prepTime: '10-12 min',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh 250g burrata heart, cold-pressed Ligurian olive oil, 25-year aged balsamic reduction, roasted pine nuts, and micro basil.',
    tags: ['Vegetarian'],
    pairing: 'Vermentino di Sardegna DOC',
    options: null
  },
  {
    id: 'fd-4',
    venue: 'restaurant',
    category: 'Artisan Mains',
    name: 'Acquerello Risotto al Tartufo Nero',
    frenchName: 'Risotto Vieilli à la Truffe Noire du Périgord',
    price: 64,
    calories: '590 kcal',
    prepTime: '15-18 min',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    description: 'Aged 7-year carnaroli rice, 36-month Parmigiano Reggiano, white wine emulsion, shaved fresh Périgord black truffles tableside.',
    tags: ['Vegetarian', "Chef's Pick"],
    pairing: 'Barolo Monfortino Riserva',
    options: {
      type: 'truffle',
      choices: ['Standard Shaved (5g)', 'Extra Black Truffle (+ $18)', 'White Alba Truffle Infusion (+ $32)']
    }
  },
  {
    id: 'fd-5',
    venue: 'restaurant',
    category: 'Cellar & Cocktails',
    name: 'The Hospics Signature Old Fashioned',
    frenchName: 'Cocktail Signature Réserve Fumé',
    price: 28,
    calories: '190 kcal',
    prepTime: '5 min',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    description: 'Pappy Van Winkle 12yr bourbon, torched Madagascar vanilla bean syrup, smoked French oak chips, and 24-karat gold leaf flake.',
    tags: ['Signature Drink'],
    pairing: 'Handmade Cuban Cigar Pairing Available',
    options: null
  },
  {
    id: 'fd-6',
    venue: 'restaurant',
    category: 'Patisserie',
    name: 'Valrhona Guanaja 70% Chocolate Soufflé',
    frenchName: 'Soufflé Chaud au Chocolat Grand Cru',
    price: 32,
    calories: '450 kcal',
    prepTime: '20 min baked to order',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Baked à la minute, Tahitian vanilla bean anglaise poured tableside, accompanied by house-churned pistachio gelato.',
    tags: ['Vegetarian', "Chef's Pick"],
    pairing: 'Château d’Yquem Sauternes 2010',
    options: null
  },

  // Café & Bakery Items
  {
    id: 'cf-1',
    venue: 'cafe',
    category: 'Espresso & Hand Pour',
    name: 'Ethiopian Yirgacheffe G1 Geisha Pour-Over',
    frenchName: 'Café Filtre Dégustation Origine Pure',
    price: 14,
    calories: '5 kcal',
    prepTime: '4-6 min',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'V60 slow pour. Tasting notes of jasmine blossom, bergamot citrus, and wild honey nectar. Roasted in-house weekly.',
    tags: ['Direct Trade', 'Single Origin'],
    pairing: 'Almond Frangipane Tart',
    options: {
      type: 'brew',
      choices: ['Hario V60 Clean Finish', 'Chemex Crisp Clarity', 'Aeropress Bold Extraction']
    }
  },
  {
    id: 'cf-2',
    venue: 'cafe',
    category: 'Cold & Nitro',
    name: 'Bourbon Barrel Cold Brew Nitro Float',
    frenchName: 'Café Infusion Froide Gazéifiée',
    price: 16,
    calories: '180 kcal',
    prepTime: '3 min',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    description: '24-hour steeped Colombian Huila beans aged in oak bourbon barrels, micro-nitrogen velvet head, crowned with salted caramel cream.',
    tags: ['Signature Cold', "Barista's Pick"],
    pairing: 'Valrhona Chocolate Babka',
    options: {
      type: 'sweetness',
      choices: ['Unsweetened (Pure Oak & Caramel Cream)', 'Light Organic Agave', 'Vanilla Infused']
    }
  },
  {
    id: 'cf-3',
    venue: 'cafe',
    category: 'Artisan Pastries',
    name: 'Isigny Ste Mère Almond Croissant',
    frenchName: 'Croissant aux Amandes Pur Beurre AOP',
    price: 12,
    calories: '420 kcal',
    prepTime: 'Ready',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: '72-layer laminated dough with Normandy butter, filled with velvety almond frangipane cream and topped with toasted slivered almonds.',
    tags: ['Freshly Baked', 'Vegetarian'],
    pairing: 'Velvet Flat White',
    options: {
      type: 'temp',
      choices: ['Warm & Crisped', 'Room Temperature']
    }
  },
  {
    id: 'cf-4',
    venue: 'cafe',
    category: 'Brunch Tartines',
    name: 'Smoked King Salmon & Hass Avocado Tartine',
    frenchName: 'Tartine au Saumon Fumé et Avocat Hass',
    price: 24,
    calories: '480 kcal',
    prepTime: '8-10 min',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    description: 'Organic naturally leavened country sourdough, whipped lemon-herb labneh, organic poached pasture eggs, and Aleppo chili flakes.',
    tags: ['Brunch Favorite', 'Pescatarian'],
    pairing: 'Ceremonial Grade Matcha Latte',
    options: {
      type: 'egg',
      choices: ['Poached Runny (Default)', 'Well Done Egg', 'Scrambled Soft']
    }
  },
  {
    id: 'cf-5',
    venue: 'cafe',
    category: 'Tea & Botanicals',
    name: 'Ceremonial Uji Matcha Cloud Latte',
    frenchName: 'Latte au Thé Vert Matcha Impérial',
    price: 15,
    calories: '160 kcal',
    prepTime: '5 min',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    description: 'First harvest stone-ground Kyoto matcha, steamed oat milk, lightly sweetened with Japanese raw wasanbon sugar.',
    tags: ['Antioxidant Rich', 'Vegan'],
    pairing: 'Cardamom Morning Bun',
    options: {
      type: 'milk',
      choices: ['Organic Oat Milk', 'Whole Jersey Milk', 'House Almond Milk']
    }
  }
];

export const HOTEL_GUEST_PROFILE = {
  roomNumber: '704',
  roomType: 'Presidential Ocean Vista Suite',
  guestName: 'Lord & Lady Sterling',
  checkIn: 'Nov 14, 2026',
  checkOut: 'Nov 21, 2026',
  vipTier: 'VIP Guest (Black Diamond)',
  assignedButler: 'Marco Valerius',
  roomTemperature: 68,
  lightingPreset: 'Sunset Glow'
};

export const HOTEL_SERVICE_CATEGORIES = [
  {
    id: 'housekeeping',
    name: 'Housekeeping & Turndown',
    subtitle: 'Linens, amenities, pillow concierge & freshening',
    icon: 'sparkle',
    tag: 'Est. 12-15 min',
    popularItems: [
      { id: 'hk-1', name: 'Fresh Egyptian Cotton Towels & Robes', category: 'housekeeping' },
      { id: 'hk-2', name: 'Pillow Concierge (Memory Foam & Silk)', category: 'housekeeping' },
      { id: 'hk-3', name: 'Evening Turndown with Lavender Mist', category: 'housekeeping' },
      { id: 'hk-4', name: 'Extra Acqua di Parma Bath Set', category: 'housekeeping' }
    ]
  },
  {
    id: 'dining',
    name: 'In-Suite Fine Dining',
    subtitle: 'Silver platter service curated from our Michelin kitchen',
    icon: 'utensils',
    tag: '24/7 Available',
    popularItems: [
      { id: 'din-1', name: 'Midnight Beluga Caviar & Blinis Service', category: 'dining' },
      { id: 'din-2', name: 'Grand Breakfast Tray for Two (Eggs Benedict & Mimosa)', category: 'dining' },
      { id: 'din-3', name: 'Artisan Cheese & Charcuterie Board with Truffle Honey', category: 'dining' },
      { id: 'din-4', name: 'Chilled Bottle of Dom Pérignon Brut', category: 'dining' }
    ]
  },
  {
    id: 'valet',
    name: 'Valet & Chauffeur Services',
    subtitle: 'Vehicle staging, Rolls-Royce transfer & airport escort',
    icon: 'car',
    tag: 'Est. 10 min lead time',
    popularItems: [
      { id: 'val-1', name: 'Retrieve Vehicle to Main Portico (Porsche 911 GT3)', category: 'valet' },
      { id: 'val-2', name: 'House Rolls-Royce Ghost Chauffeured Transfer', category: 'valet' },
      { id: 'val-3', name: 'Complete Vehicle Exterior Detailing', category: 'valet' },
      { id: 'val-4', name: 'Luggage Express to Departure Staging', category: 'valet' }
    ]
  },
  {
    id: 'wellness',
    name: 'Spa & Vitality Appointments',
    subtitle: 'Private in-suite therapists and hydrotherapy access',
    icon: 'lotus',
    tag: 'Book In-Suite / Spa',
    popularItems: [
      { id: 'spa-1', name: '90-min In-Suite Hot Stone Deep Tissue Massage', category: 'wellness' },
      { id: 'spa-2', name: 'Valmont Cellular Radiance Facial Therapy', category: 'wellness' },
      { id: 'spa-3', name: 'Private Sunrise Yoga & Pranayama on the Terrace', category: 'wellness' },
      { id: 'spa-4', name: 'Aromatherapy Herbal Bath Preparation', category: 'wellness' }
    ]
  },
  {
    id: 'concierge',
    name: 'Concierge Desk',
    subtitle: 'Yacht charters, transportation, theater & bespoke requests',
    icon: 'compass',
    tag: 'Guest Services Desk',
    popularItems: [
      { id: 'con-1', name: 'Private Riva Yacht Sunset Charter Reservation', category: 'concierge' },
      { id: 'con-2', name: 'Exclusive Table for 4 at Le Jules Verne', category: 'concierge' },
      { id: 'con-3', name: 'Helicopter Transfer to Saint-Tropez Helipad', category: 'concierge' },
      { id: 'con-4', name: 'Private Wine Tasting in Suite', category: 'concierge' }
    ]
  }
];

export const INITIAL_GUEST_REQUESTS = [
  {
    id: 'REQ-704-01',
    room: '704 (Presidential Suite)',
    guest: 'Lord & Lady Sterling',
    type: 'Wellness & Spa',
    title: '90-min In-Suite Hot Stone Deep Tissue Massage',
    time: '18 mins ago',
    urgency: 'VIP High',
    assignedStaff: 'Elena Rostova (Lead Therapist)',
    status: 'in_progress',
    notes: 'Requested lavender essential oil and organic green tea post-treatment.'
  },
  {
    id: 'REQ-704-02',
    room: '704 (Presidential Suite)',
    guest: 'Lord & Lady Sterling',
    type: 'Housekeeping',
    title: 'Pillow Concierge & Evening Turndown',
    time: '45 mins ago',
    urgency: 'Medium',
    assignedStaff: 'Marco Valerius (Butler)',
    status: 'completed',
    notes: 'Silk pillowcases and chamomile night infusion delivered.'
  },
  {
    id: 'REQ-412-01',
    room: '412 (Azure Sea View)',
    guest: 'Dr. Alistair Thorne',
    type: 'Valet & Chauffeur',
    title: 'Vehicle Retrieval (Aston Martin DB12)',
    time: '8 mins ago',
    urgency: 'High',
    assignedStaff: 'David K. (Senior Valet)',
    status: 'open',
    notes: 'Departure planned for 7:30 PM fine dining gala.'
  },
  {
    id: 'REQ-Pent-03',
    room: 'Penthouse B',
    guest: 'Countess Beatrice Von Berg',
    type: 'In-Suite Dining',
    title: 'Midnight Beluga Caviar & Dom Pérignon',
    time: '2 mins ago',
    urgency: 'VIP Urgent',
    assignedStaff: 'Jean-Luc (Maitre d)',
    status: 'open',
    notes: 'Serve on iced crystal platter with silver spoons.'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9081',
    type: 'Dine-In Restaurant',
    location: 'Table 14 (Terrace Vista)',
    guest: 'Baroness Caroline de Rothschild',
    time: '19:42 (4m ago)',
    items: [
      { name: 'A5 Miyazaki Wagyu Tenderloin', qty: 2, price: 115, note: 'Medium-Rare, Truffle Jus' },
      { name: 'Acquerello Risotto al Tartufo Nero', qty: 1, price: 64, note: 'Extra Truffle' },
      { name: 'The Hospics Signature Old Fashioned', qty: 2, price: 28, note: 'Single large hand-carved ice sphere' }
    ],
    subtotal: 350,
    taxAndService: 52.5,
    total: 402.5,
    status: 'preparing',
    server: 'François M.'
  },
  {
    id: 'ORD-9080',
    type: 'In-Room Dining',
    location: 'Suite 704 (Lord Sterling)',
    guest: 'Lord & Lady Sterling',
    time: '19:35 (11m ago)',
    items: [
      { name: 'Pan-Roasted Chilean Sea Bass', qty: 2, price: 88, note: 'Saffron Dashi broth' },
      { name: 'Pugliese Burrata & Heirloom Tartare', qty: 1, price: 36, note: 'Warm grilled sourdough' },
      { name: 'Valrhona Guanaja 70% Chocolate Soufflé', qty: 2, price: 32, note: 'Baked fresh à la minute' }
    ],
    subtotal: 276,
    taxAndService: 41.4,
    total: 317.4,
    status: 'ready',
    server: 'Butler Marco'
  },
  {
    id: 'ORD-9079',
    type: 'Artisan Café',
    location: 'Courtyard Counter #4',
    guest: 'Alexander Wright',
    time: '19:22 (24m ago)',
    items: [
      { name: 'Ethiopian Yirgacheffe G1 Geisha Pour-Over', qty: 2, price: 14, note: 'V60 Pour' },
      { name: 'Isigny Ste Mère Almond Croissant', qty: 2, price: 12, note: 'Warmed crisp' }
    ],
    subtotal: 52,
    taxAndService: 7.8,
    total: 59.8,
    status: 'served',
    server: 'Clara Z.'
  },
  {
    id: 'ORD-9078',
    type: 'Artisan Café',
    location: 'Garden Pavilion Table 8',
    guest: 'Sophia Tanaka',
    time: '19:10 (36m ago)',
    items: [
      { name: 'Bourbon Barrel Cold Brew Nitro Float', qty: 1, price: 16, note: 'Agave sweet' },
      { name: 'Smoked King Salmon Tartine', qty: 1, price: 24, note: 'Poached runny egg' }
    ],
    subtotal: 40,
    taxAndService: 6.0,
    total: 46.0,
    status: 'served',
    server: 'Lucas H.'
  }
];

export const ORDER_STATUS_STAGES = [
  { id: 'placed', label: 'Placed', step: 1, desc: 'Order received by Hospics' },
  { id: 'confirmed', label: 'Confirmed', step: 2, desc: 'Kitchen acknowledged ticket' },
  { id: 'preparing', label: 'Preparing', step: 3, desc: 'Chef actively preparing items' },
  { id: 'ready', label: 'Ready to Serve', step: 4, desc: 'Plated; runner dispatched to table' },
  { id: 'served', label: 'Served', step: 5, desc: 'Delivered to table. Bon appétit!' }
];

export const INVENTORY_ITEMS = [
  {
    id: 'INV-101',
    sku: 'WINE-CH-MARG-15',
    name: 'Château Margaux Premier Grand Cru 2015',
    category: 'Fine Wine & Cellar',
    inStock: 14,
    unit: 'Bottles 750ml',
    minThreshold: 10,
    status: 'optimal',
    unitCost: 750,
    supplier: 'Bordeaux Vintners Direct'
  },
  {
    id: 'INV-102',
    sku: 'MEAT-WAG-A5-MIY',
    name: 'Miyazaki Wagyu Striploin Grade A5 BMS 11',
    category: 'Butchery & Steaks',
    inStock: 4.5,
    unit: 'Kilograms',
    minThreshold: 8,
    status: 'warning',
    unitCost: 280,
    supplier: 'Tokyo Fine Meats Global'
  },
  {
    id: 'INV-103',
    sku: 'TRUF-PER-BLK-FR',
    name: 'Fresh Périgord Black Winter Truffles (Tuber melanosporum)',
    category: 'Fresh Gourmet Produce',
    inStock: 0.45,
    unit: 'Kilograms',
    minThreshold: 1.0,
    status: 'critical',
    unitCost: 1800,
    supplier: 'Maison de la Truffe Paris'
  },
  {
    id: 'INV-104',
    sku: 'COF-ETH-GEISHA-G1',
    name: 'Ethiopian Yirgacheffe Geisha Green Coffee',
    category: 'Artisan Coffee Roastery',
    inStock: 48,
    unit: 'Kilograms',
    minThreshold: 25,
    status: 'optimal',
    unitCost: 45,
    supplier: 'Sidama Micro-lot Cooperatives'
  },
  {
    id: 'INV-105',
    sku: 'AMEN-PARMA-75',
    name: 'Acqua di Parma Colonia Luxury Bath Set (100ml)',
    category: 'Guest Suite Amenities',
    inStock: 32,
    unit: 'Box Sets',
    minThreshold: 40,
    status: 'warning',
    unitCost: 48,
    supplier: 'LVMH Hospitality Amenities'
  },
  {
    id: 'INV-106',
    sku: 'CHAMP-DOM-08',
    name: 'Dom Pérignon Vintage Brut Champagne 2008',
    category: 'Fine Wine & Cellar',
    inStock: 26,
    unit: 'Bottles 750ml',
    minThreshold: 15,
    status: 'optimal',
    unitCost: 220,
    supplier: 'Moët Hennessy Private Client'
  }
];

export const GUEST_REVIEWS = [
  {
    id: 'REV-01',
    guest: 'Lady Vivienne St. Claire',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    venue: 'Presidential Suite & Room Service',
    rating: 5,
    date: 'Yesterday, 22:15',
    verified: true,
    title: 'The pinnacle of digital discretion and effortless luxury',
    comment: 'The Hospics in-suite tablet made ordering our midnight supper seamless. The Miyazaki wagyu arrived at the perfect temperature under polished silver domes. Butler Marco addressed every nuance.',
    tags: ['In-Room Dining', 'Speed 10/10', 'Discretion']
  },
  {
    id: 'REV-02',
    guest: 'Lord Julian Sterling',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    venue: "L'Ambroisie Fine Dining",
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'Curated beverage pairings and split-second kitchen coordination',
    comment: 'Browsing vintage verticals with exact tasting notes right at our table was unmatched. Our order was sent to the brigade instantly. An extraordinary technological leap for fine dining.',
    tags: ['Michelin Caliber', 'Wine Cellar', 'Seamless POS']
  },
  {
    id: 'REV-03',
    guest: 'Camilla Valois-Dupont',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    venue: 'Café Valois Roastery',
    rating: 5,
    date: '3 days ago',
    verified: true,
    title: 'Artisan coffee culture meets instant mobile checkout',
    comment: 'The ability to customize my single-origin pour-over and collect it hot from the courtyard bar within 4 minutes is pure genius. No clumsy queues, just pure sensory pleasure.',
    tags: ['Artisan Brew', 'Lightning Speed']
  }
];

export const ANALYTICS_DATA = {
  dailyRevenue: 34850,
  dailyOrdersCount: 142,
  avgTableTurnaround: '41 min',
  guestSatisfactionScore: '4.94 / 5.0',
  slaCompliance: '98.7%',
  revenueByDepartment: [
    { name: 'Fine Dining Main Room', percentage: 48, amount: '$16,728', color: '#D4AF37' },
    { name: 'In-Suite Guest Service', percentage: 34, amount: '$11,849', color: '#1B4D7E' },
    { name: 'Artisan Café & Terrace', percentage: 18, amount: '$6,273', color: '#8E9AAF' }
  ],
  hourlyTraffic: [
    { hour: '07:00', orders: 12, revenue: 380 },
    { hour: '09:00', orders: 28, revenue: 940 },
    { hour: '11:00', orders: 22, revenue: 1100 },
    { hour: '13:00', orders: 48, revenue: 5400 },
    { hour: '15:00', orders: 24, revenue: 1650 },
    { hour: '18:00', orders: 38, revenue: 7800 },
    { hour: '20:00', orders: 62, revenue: 12400 },
    { hour: '22:00', orders: 32, revenue: 5180 }
  ]
};

export const CORPORATE_DATA = {
  stats: [
    { label: 'Average Check Uplift', value: '+34%' },
    { label: 'Order Turnaround Speed', value: '3.2x Faster' },
    { label: 'Staff Dispatch Optimization', value: 'Real-Time' },
    { label: 'Setup & Onboarding', value: 'Under 24h' }
  ],
  solutions: [
    {
      id: 'qr-ordering',
      title: 'QR Ordering',
      badge: 'Dining & Bar',
      tagline: 'Fast, seamless contactless ordering and table payment for restaurants and cafés.',
      description: 'Enable guests to scan a table QR code, browse visual menus, select custom modifiers, and dispatch orders directly to the kitchen brigade without waiting for printed menus or staff.',
      features: ['Instant Mobile Menu Access', 'Custom Modifiers & Dietary Tags', 'Direct Kitchen Order Routing', 'Split & Contactless Table Settlement']
    },
    {
      id: 'hotel-guest-services',
      title: 'Hotel Guest Services',
      badge: 'In-Room & Concierge',
      tagline: 'Frictionless guest amenity requests, in-room dining, and concierge ticketing.',
      description: 'A responsive digital portal for hotel guests to order in-room dining, request housekeeping linens and toiletries, schedule valet vehicle retrieval, and message the front desk from their personal devices.',
      features: ['In-Room Dining Orders', 'Housekeeping & Amenity Requests', 'Valet & Luggage Retrieval', 'Live Request Status Tracking']
    },
    {
      id: 'feedback-reviews',
      title: 'Digital Feedback & Reviews',
      badge: 'Guest Sentiment',
      tagline: 'Real-time guest ratings, private feedback loops, and reputation insights.',
      description: 'Capture immediate guest satisfaction feedback post-dining or checkout. Identify and address service friction points instantly before they reach external review sites, and monitor departmental performance.',
      features: ['Instant Post-Service Feedback', 'Private Resolution Escalation', 'Verified Rating Breakdown', 'Sentiment Trends by Department']
    },
    {
      id: 'inventory-management',
      title: 'Inventory Management',
      badge: 'Stock Control',
      tagline: 'Accurate ingredient tracking, low-stock alerts, and streamlined supplier reordering.',
      description: 'Track stock levels for kitchen ingredients, wine cellar reserves, and hotel room amenities. Set custom low-stock warning thresholds and initiate expedited supplier reorders to prevent service outages.',
      features: ['Real-Time Stock Depletion', 'Automated Low-Stock Alerts', 'Supplier Catalog & Order History', 'Multi-Department Cellar & Pantry Logs']
    }
  ],
  industries: [
    {
      title: 'Hotels & Resorts',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      description: 'Seamless in-room service requests, digital room service dining, concierge ticketing, and real-time staff dispatch.',
      stats: 'Guest Suites & Room Services'
    },
    {
      title: 'Restaurants & Fine Dining',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Interactive digital menus, tableside QR ordering, kitchen display synchronization, and contactless payments.',
      stats: 'Dine-In & Terrace Dining'
    },
    {
      title: 'Cafés & Artisan Bakeries',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      description: 'Fast mobile order-and-pay, drink modifier choices, counter pickup queues, and live stock tracking.',
      stats: 'Grab-and-Go & Counter Service'
    }
  ]
};
