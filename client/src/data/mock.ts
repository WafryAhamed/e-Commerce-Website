import { Product, Brand, Testimonial, Banner } from '../types';

export const mockProducts: Product[] = [
// LAPTOPS
{
  id: 'l1',
  name: 'MacBook Pro 16" M3 Max',
  slug: 'macbook-pro-16-m3-max',
  sku: 'MBP16-M3M',
  brand: 'Apple',
  category: 'Laptops',
  price: 3499,
  stock: 15,
  shortDescription: 'The most advanced Mac ever built for pros.',
  fullDescription:
  'Experience mind-blowing performance with the M3 Max chip. Featuring a stunning Liquid Retina XDR display, all-day battery life, and an array of pro ports.',
 images: [
  '/laptopimg/MacBook Pro 16 M3 Max.jpeg'],
  

  specifications: {
    Processor: 'Apple M3 Max',
    RAM: '64GB Unified Memory',
    Storage: '2TB SSD',
    Display: '16.2-inch Liquid Retina XDR',
    Graphics: '40-core GPU',
    OS: 'macOS Sonoma',
    Battery: 'Up to 22 hours',
    Weight: '4.8 lbs (2.16 kg)'
  },
  featured: true,
  rating: 4.9,
  reviewsCount: 128
},
{
  id: 'l2',
  name: 'Dell XPS 15 OLED',
  slug: 'dell-xps-15-oled',
  sku: 'XPS15-9530',
  brand: 'Dell',
  category: 'Laptops',
  price: 2299,
  discountPrice: 1999,
  stock: 24,
  shortDescription: 'Stunning OLED display meets powerful performance.',
  fullDescription:
  'The XPS 15 is the perfect balance of power and portability. Featuring a gorgeous 3.5K OLED touch display and 13th Gen Intel Core processors.',
images: [
  '/laptopimg/Dell XPS 15 OLED.jpeg'],

  specifications: {
    Processor: 'Intel Core i9-13900H',
    RAM: '32GB DDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '15.6" 3.5K OLED Touch',
    Graphics: 'NVIDIA GeForce RTX 4070',
    OS: 'Windows 11 Pro',
    Battery: '86Whr',
    Weight: '4.23 lbs (1.92 kg)'
  },
  featured: true,
  rating: 4.7,
  reviewsCount: 85
},
{
  id: 'l3',
  name: 'ThinkPad X1 Carbon Gen 11',
  slug: 'thinkpad-x1-carbon-gen-11',
  sku: 'TP-X1C-G11',
  brand: 'Lenovo',
  category: 'Laptops',
  price: 1849,
  stock: 30,
  shortDescription: 'The ultimate business ultrabook.',
  fullDescription:
  'Ultralight and ultra-powerful, the ThinkPad X1 Carbon Gen 11 delivers premium performance, legendary keyboard comfort, and enterprise-grade security.',
 images: [
  '/laptopimg/ThinkPad X1 Carbon Gen 11.jpeg'],

  specifications: {
    Processor: 'Intel Core i7-1355U',
    RAM: '16GB LPDDR5',
    Storage: '512GB PCIe 4.0 SSD',
    Display: '14" WUXGA (1920x1200) IPS',
    Graphics: 'Intel Iris Xe',
    OS: 'Windows 11 Pro',
    Battery: '57Whr',
    Weight: '2.48 lbs (1.12 kg)'
  },
  featured: true,
  rating: 4.8,
  reviewsCount: 210
},
{
  id: 'l4',
  name: 'ASUS ROG Strix G16',
  slug: 'asus-rog-strix-g16',
  sku: 'ROG-STRIX-G16',
  brand: 'ASUS',
  category: 'Laptops',
  price: 1799,
  discountPrice: 1599,
  stock: 12,
  shortDescription: 'Dominate the game with cutting-edge power.',
  fullDescription:
  'Built for gamers and creators, the ROG Strix G16 features a blazing-fast 240Hz display, advanced cooling, and top-tier NVIDIA graphics.',
 images: [
  '/laptopimg/ASUS ROG Strix G1.jpeg'],

  specifications: {
    Processor: 'Intel Core i9-13980HX',
    RAM: '16GB DDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '16" QHD+ 240Hz',
    Graphics: 'NVIDIA GeForce RTX 4060',
    OS: 'Windows 11 Home',
    Battery: '90Whr',
    Weight: '5.51 lbs (2.5 kg)'
  },
  featured: true,
  rating: 4.6,
  reviewsCount: 94
},
{
  id: 'l5',
  name: 'HP Spectre x360 16',
  slug: 'hp-spectre-x360-16',
  sku: 'HP-SPEC-16',
  brand: 'HP',
  category: 'Laptops',
  price: 1699,
  stock: 18,
  shortDescription: 'Versatile 2-in-1 design with premium craftsmanship.',
  fullDescription:
  'The HP Spectre x360 adapts to your needs with its 360-degree hinge, stunning touch display, and powerful internals wrapped in a gem-cut chassis.',
  images: [
  'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i7-13700H',
    RAM: '16GB DDR4',
    Storage: '1TB SSD',
    Display: '16" 3K+ OLED Touch',
    Graphics: 'Intel Arc A370M',
    OS: 'Windows 11 Home',
    Battery: '83Whr',
    Weight: '4.45 lbs (2.01 kg)'
  },
  rating: 4.5,
  reviewsCount: 67
},
{
  id: 'l6',
  name: 'Razer Blade 15',
  slug: 'razer-blade-15',
  sku: 'RZ-BLADE-15',
  brand: 'Razer',
  category: 'Laptops',
  price: 2799,
  discountPrice: 2499,
  stock: 8,
  shortDescription:
  'The ultimate gaming laptop in a sleek CNC aluminum body.',
  fullDescription:
  'Experience desktop-level performance in a laptop that is just 0.67 inches thin. The Razer Blade 15 is the pinnacle of portable gaming.',
  images: [
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i7-13800H',
    RAM: '32GB DDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '15.6" QHD 240Hz',
    Graphics: 'NVIDIA GeForce RTX 4080',
    OS: 'Windows 11 Home',
    Battery: '80Whr',
    Weight: '4.4 lbs (2.01 kg)'
  },
  rating: 4.7,
  reviewsCount: 112
},
{
  id: 'l7',
  name: 'Surface Laptop 5',
  slug: 'surface-laptop-5',
  sku: 'MS-SURF-5',
  brand: 'Microsoft',
  category: 'Laptops',
  price: 1299,
  stock: 40,
  shortDescription: 'Sleek, elegant, and quiet performance.',
  fullDescription:
  'Multitask with ease on the Surface Laptop 5. Featuring a vibrant PixelSense touchscreen and a comfortable keyboard for all-day productivity.',
  images: [
  'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i5-1235U',
    RAM: '8GB LPDDR5x',
    Storage: '512GB SSD',
    Display: '13.5" PixelSense Touch',
    Graphics: 'Intel Iris Xe',
    OS: 'Windows 11 Home',
    Battery: 'Up to 18 hours',
    Weight: '2.86 lbs (1.29 kg)'
  },
  rating: 4.4,
  reviewsCount: 156
},
{
  id: 'l8',
  name: 'Acer Swift 5',
  slug: 'acer-swift-5',
  sku: 'ACER-SW5',
  brand: 'Acer',
  category: 'Laptops',
  price: 1099,
  discountPrice: 949,
  stock: 25,
  shortDescription: 'Antimicrobial design meets lightweight portability.',
  fullDescription:
  'The Acer Swift 5 is a premium thin-and-light laptop featuring aerospace-grade aluminum and an antimicrobial Corning Gorilla Glass display.',
  images: [
  'https://images.unsplash.com/photo-1588702545922-e6ca51f3f0f4?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i7-1260P',
    RAM: '16GB LPDDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '14" WQXGA Touch',
    Graphics: 'Intel Iris Xe',
    OS: 'Windows 11 Home',
    Battery: '56Whr',
    Weight: '2.65 lbs (1.2 kg)'
  },
  rating: 4.3,
  reviewsCount: 42
},
{
  id: 'l9',
  name: 'MSI Creator Z16',
  slug: 'msi-creator-z16',
  sku: 'MSI-CR-Z16',
  brand: 'MSI',
  category: 'Laptops',
  price: 2499,
  stock: 10,
  shortDescription: 'Tech meets aesthetic for creators.',
  fullDescription:
  'Crafted in a CNC unibody chassis, the Creator Z16 offers a 16:10 Golden Ratio display and powerful NVIDIA Studio graphics for seamless content creation.',
  images: [
  'https://images.unsplash.com/photo-1593642702821-c823b285f829?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i9-12900H',
    RAM: '32GB DDR5',
    Storage: '2TB NVMe SSD',
    Display: '16" QHD+ 120Hz Touch',
    Graphics: 'NVIDIA GeForce RTX 3060',
    OS: 'Windows 11 Pro',
    Battery: '90Whr',
    Weight: '4.85 lbs (2.2 kg)'
  },
  rating: 4.6,
  reviewsCount: 58
},
{
  id: 'l10',
  name: 'Lenovo Yoga 9i',
  slug: 'lenovo-yoga-9i',
  sku: 'LEN-YOGA-9I',
  brand: 'Lenovo',
  category: 'Laptops',
  price: 1549,
  stock: 22,
  shortDescription: 'Premium 2-in-1 with a rotating soundbar.',
  fullDescription:
  'The Yoga 9i redefines entertainment with a 4K OLED display and a unique rotating soundbar engineered by Bowers & Wilkins.',
  images: [
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1588872657578-7df560d6c40b?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i7-1360P',
    RAM: '16GB LPDDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '14" 4K OLED Touch',
    Graphics: 'Intel Iris Xe',
    OS: 'Windows 11 Home',
    Battery: '75Whr',
    Weight: '3.09 lbs (1.4 kg)'
  },
  rating: 4.5,
  reviewsCount: 89
},
{
  id: 'l11',
  name: 'Samsung Galaxy Book3 Ultra',
  slug: 'samsung-galaxy-book3-ultra',
  sku: 'SAM-GB3-ULT',
  brand: 'Samsung',
  category: 'Laptops',
  price: 2399,
  discountPrice: 2199,
  stock: 14,
  shortDescription: 'Ultra-powerful. Ultra-connected.',
  fullDescription:
  'Experience seamless ecosystem integration with Galaxy devices, powered by top-tier Intel processors and NVIDIA RTX graphics in a sleek profile.',
  images: [
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'Intel Core i9-13900H',
    RAM: '32GB LPDDR5',
    Storage: '1TB PCIe 4.0 SSD',
    Display: '16" 3K AMOLED 120Hz',
    Graphics: 'NVIDIA GeForce RTX 4070',
    OS: 'Windows 11 Home',
    Battery: '76Whr',
    Weight: '3.95 lbs (1.79 kg)'
  },
  rating: 4.4,
  reviewsCount: 73
},
{
  id: 'l12',
  name: 'Framework Laptop 16',
  slug: 'framework-laptop-16',
  sku: 'FW-LAP-16',
  brand: 'Framework',
  category: 'Laptops',
  price: 1399,
  stock: 35,
  shortDescription: 'Fully upgradeable, repairable, and customizable.',
  fullDescription:
  'The Framework Laptop 16 is designed to last. Swap ports, upgrade memory, and even change the graphics module whenever you need.',
  images: [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Processor: 'AMD Ryzen 7 7840HS',
    RAM: '16GB DDR5 (Upgradeable)',
    Storage: '512GB NVMe SSD (Upgradeable)',
    Display: '16" WQXGA 165Hz',
    Graphics: 'Radeon RX 7700S (Modular)',
    OS: 'Windows 11 Pro / Linux',
    Battery: '85Whr',
    Weight: '4.6 lbs (2.1 kg)'
  },
  rating: 4.8,
  reviewsCount: 205
},

// ACCESSORIES
{
  id: 'a1',
  name: 'Logitech MX Master 3S',
  slug: 'logitech-mx-master-3s',
  sku: 'LOGI-MX3S',
  brand: 'Logitech',
  category: 'Accessories',
  subcategory: 'Mouse',
  price: 99,
  stock: 150,
  shortDescription: 'The ultimate precision mouse for creators.',
  fullDescription:
  'Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.',
  images: [
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Sensor: 'Darkfield high precision',
    DPI: '200 to 8000',
    Battery: 'Rechargeable Li-Po (500 mAh)',
    Connectivity: 'Bluetooth / Logi Bolt USB'
  },
  featured: true,
  rating: 4.8,
  reviewsCount: 342
},
{
  id: 'a2',
  name: 'Keychron Q1 Pro',
  slug: 'keychron-q1-pro',
  sku: 'KEYC-Q1P',
  brand: 'Keychron',
  category: 'Accessories',
  subcategory: 'Keyboard',
  price: 199,
  stock: 45,
  shortDescription: 'Premium custom mechanical keyboard.',
  fullDescription:
  'A fully customizable 75% layout mechanical keyboard with QMK/VIA support, full aluminum CNC machined body, and double-gasket design.',
  images: [
  'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1605436247078-f0ef43ee8d5c?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Layout: '75%',
    Switches: 'Keychron K Pro Red/Brown/Banana',
    'Body Material': 'Full CNC Aluminum',
    Connectivity: 'Bluetooth 5.1 / Type-C Wired'
  },
  rating: 4.9,
  reviewsCount: 156
},
{
  id: 'a3',
  name: 'Sony WH-1000XM5',
  slug: 'sony-wh-1000xm5',
  sku: 'SONY-XM5',
  brand: 'Sony',
  category: 'Accessories',
  subcategory: 'Headset',
  price: 349,
  discountPrice: 299,
  stock: 60,
  shortDescription: 'Industry-leading noise canceling headphones.',
  fullDescription:
  'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation.',
  images: [
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Type: 'Over-ear, Closed-back',
    'Noise Canceling': 'Active Noise Cancellation (ANC)',
    Battery: 'Up to 30 hours',
    Connectivity: 'Bluetooth 5.2 / 3.5mm Jack'
  },
  featured: true,
  rating: 4.8,
  reviewsCount: 512
},
{
  id: 'a4',
  name: 'Peak Design Everyday Backpack',
  slug: 'peak-design-everyday-backpack',
  sku: 'PD-EDBP-20L',
  brand: 'Peak Design',
  category: 'Accessories',
  subcategory: 'Laptop Bag',
  price: 289,
  stock: 20,
  shortDescription: 'The iconic award-winning everyday and photo backpack.',
  fullDescription:
  'Built around access, organization, expansion, and protection. Features MagLatch hardware and custom FlexFold dividers.',
  images: [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Capacity: '20L',
    'Laptop Sleeve': 'Up to 16-inch laptops',
    Material: '400D double poly-coated DWR-impregnated nylon canvas',
    Weight: '4.43 lbs (2.01 kg)'
  },
  rating: 4.7,
  reviewsCount: 230
},
{
  id: 'a5',
  name: 'IETS GT500 Cooling Pad',
  slug: 'iets-gt500-cooling-pad',
  sku: 'IETS-GT500',
  brand: 'IETS',
  category: 'Accessories',
  subcategory: 'Cooling Pad',
  price: 59,
  discountPrice: 45,
  stock: 85,
  shortDescription: 'Powerful turbo-fan cooling for gaming laptops.',
  fullDescription:
  'Industrial-grade turbofan cooling pad with sealed foam ring to force air into your laptop, dramatically reducing temperatures during heavy gaming.',
  images: [
  'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1588872657578-7df560d6c40b?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    'Fan Speed': 'Up to 5000 RPM',
    Compatibility: '13 to 17.3 inch laptops',
    Power: 'AC Adapter included',
    Features: 'Dust filter, RGB lighting (optional)'
  },
  rating: 4.3,
  reviewsCount: 115
},
{
  id: 'a6',
  name: 'Anker 100W USB-C Charger',
  slug: 'anker-100w-usb-c-charger',
  sku: 'ANK-100W-PD',
  brand: 'Anker',
  category: 'Accessories',
  subcategory: 'Charger',
  price: 79,
  stock: 120,
  shortDescription: 'Compact GaN fast charger for all your devices.',
  fullDescription:
  'Charge your laptop, phone, and tablet simultaneously with this ultra-compact GaN II charger featuring two USB-C ports and one USB-A port.',
  images: [
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1615563821162-42173167b511?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    'Total Output': '100W Max',
    Ports: '2x USB-C, 1x USB-A',
    Technology: 'GaN II',
    Compatibility: 'Universal USB-C PD'
  },
  rating: 4.6,
  reviewsCount: 420
},
{
  id: 'a7',
  name: 'Dell UltraSharp U2723QE',
  slug: 'dell-ultrasharp-u2723qe',
  sku: 'DELL-U2723QE',
  brand: 'Dell',
  category: 'Accessories',
  subcategory: 'Monitor',
  price: 619,
  discountPrice: 549,
  stock: 35,
  shortDescription: 'Brilliant 27" 4K monitor with IPS Black technology.',
  fullDescription:
  'Experience incredible color and superior black performance with a contrast ratio of 2000:1 on this 27-inch 4K monitor featuring IPS Black technology.',
  images: [
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Resolution: '4K UHD (3840 x 2160)',
    'Panel Type': 'IPS Black',
    'Refresh Rate': '60Hz',
    Connectivity: 'USB-C (90W PD), DisplayPort, HDMI'
  },
  featured: true,
  rating: 4.7,
  reviewsCount: 185
},
{
  id: 'a8',
  name: 'Logitech Brio 4K',
  slug: 'logitech-brio-4k',
  sku: 'LOGI-BRIO',
  brand: 'Logitech',
  category: 'Accessories',
  subcategory: 'Webcam',
  price: 199,
  discountPrice: 169,
  stock: 65,
  shortDescription: 'Ultra HD webcam for video conferencing and streaming.',
  fullDescription:
  'Step up to the world’s most technologically advanced webcam and get professional-quality video for video conferencing, streaming, or recording.',
  images: [
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Resolution: '4K/30fps or 1080p/60fps',
    'Field of View': 'Adjustable 65°, 78°, 90°',
    Microphone: 'Dual omni-directional mics',
    Features: 'Windows Hello support, HDR'
  },
  rating: 4.5,
  reviewsCount: 275
},
{
  id: 'a9',
  name: 'CalDigit TS4',
  slug: 'caldigit-ts4',
  sku: 'CAL-TS4',
  brand: 'CalDigit',
  category: 'Accessories',
  subcategory: 'USB Hub',
  price: 399,
  stock: 15,
  shortDescription: 'The ultimate Thunderbolt 4 dock.',
  fullDescription:
  'With 18 ports, the TS4 offers the most connectivity of any Thunderbolt 4 dock. Features 98W power delivery and 2.5GbE.',
  images: [
  'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Interface: 'Thunderbolt 4',
    Ports: '18 total (USB-A, USB-C, DP, SD, Audio, Ethernet)',
    'Power Delivery': '98W to host',
    Network: '2.5 Gigabit Ethernet'
  },
  rating: 4.9,
  reviewsCount: 92
},
{
  id: 'a10',
  name: 'Samsung T7 Shield 2TB',
  slug: 'samsung-t7-shield-2tb',
  sku: 'SAM-T7-2TB',
  brand: 'Samsung',
  category: 'Accessories',
  subcategory: 'External Storage',
  price: 179,
  discountPrice: 149,
  stock: 90,
  shortDescription: 'Rugged, fast, and compact portable SSD.',
  fullDescription:
  'Tough, fast, and compact, the rugged PSSD T7 Shield is built to endure with an IP65 rating for dust and water resistance.',
  images: [
  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Capacity: '2TB',
    Interface: 'USB 3.2 Gen 2',
    'Read/Write Speed': 'Up to 1050/1000 MB/s',
    Durability: 'IP65 rated, 3-meter drop resistant'
  },
  rating: 4.6,
  reviewsCount: 310
},
{
  id: 'a11',
  name: 'Apple Magic Keyboard',
  slug: 'apple-magic-keyboard',
  sku: 'APP-MK-NUM',
  brand: 'Apple',
  category: 'Accessories',
  subcategory: 'Keyboard',
  price: 299,
  stock: 55,
  shortDescription: 'Wireless keyboard with Touch ID and Numeric Keypad.',
  fullDescription:
  'Magic Keyboard is available with Touch ID, providing fast, easy, and secure authentication for logins and purchases.',
  images: [
  'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Layout: 'Full size with numeric keypad',
    Connectivity: 'Bluetooth, Lightning port',
    Features: 'Touch ID sensor',
    Battery: 'Rechargeable (lasts about a month)'
  },
  rating: 4.4,
  reviewsCount: 180
},
{
  id: 'a12',
  name: 'Razer DeathAdder V3',
  slug: 'razer-deathadder-v3',
  sku: 'RZ-DA-V3',
  brand: 'Razer',
  category: 'Accessories',
  subcategory: 'Mouse',
  price: 89,
  stock: 75,
  shortDescription: 'Ultra-lightweight ergonomic esports mouse.',
  fullDescription:
  'Victory takes on a new shape with the Razer DeathAdder V3. Refined and reforged with the aid of top esports pros.',
  images: [
  'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Sensor: 'Focus Pro 30K Optical',
    Weight: '59g',
    Connectivity: 'Wired (Speedflex Cable)',
    Switches: 'Optical Mouse Switches Gen-3'
  },
  rating: 4.7,
  reviewsCount: 215
},
{
  id: 'a13',
  name: 'Corsair HS80 RGB',
  slug: 'corsair-hs80-rgb',
  sku: 'COR-HS80',
  brand: 'Corsair',
  category: 'Accessories',
  subcategory: 'Headset',
  price: 149,
  stock: 40,
  shortDescription: 'Premium wireless gaming headset with spatial audio.',
  fullDescription:
  'The CORSAIR HS80 RGB WIRELESS Gaming Headset connects with hyper-fast SLIPSTREAM WIRELESS, delivering incredibly detailed sound through custom-tuned 50mm neodymium audio drivers.',
  images: [
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Audio: 'Dolby Atmos Spatial Audio',
    Microphone: 'Broadcast-grade omni-directional',
    Connectivity: 'Slipstream Wireless / USB Wired',
    Battery: 'Up to 20 hours'
  },
  rating: 4.5,
  reviewsCount: 145
},
{
  id: 'a14',
  name: 'Tomtoc Laptop Sleeve',
  slug: 'tomtoc-laptop-sleeve',
  sku: 'TOM-SLV-16',
  brand: 'Tomtoc',
  category: 'Accessories',
  subcategory: 'Laptop Bag',
  price: 35,
  stock: 200,
  shortDescription: '360° protective laptop sleeve.',
  fullDescription:
  'Features CornerArmor patent design at the bottom of the corners to protect your laptop from drops and bumps during potential accidents.',
  images: [
  'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Compatibility: 'Up to 16-inch laptops',
    Protection: 'CornerArmor technology',
    Material: 'Spill-resistant recycled fabrics',
    Pockets: 'Front pocket for accessories'
  },
  rating: 4.4,
  reviewsCount: 560
},
{
  id: 'a15',
  name: 'LG 27UK850-W',
  slug: 'lg-27uk850-w',
  sku: 'LG-27UK850',
  brand: 'LG',
  category: 'Accessories',
  subcategory: 'Monitor',
  price: 449,
  stock: 25,
  shortDescription: '27" 4K UHD IPS Monitor with HDR10.',
  fullDescription:
  'Enjoy flawless visuals and the true vibrancy of color with this LG 4K monitor. Features USB-C connectivity for video, data, and power delivery.',
  images: [
  'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Resolution: '4K UHD (3840 x 2160)',
    'Panel Type': 'IPS',
    Features: 'HDR10, AMD FreeSync',
    Connectivity: 'USB-C (60W PD), 2x HDMI, DisplayPort'
  },
  rating: 4.3,
  reviewsCount: 210
},
{
  id: 'a16',
  name: 'Anker PowerExpand+',
  slug: 'anker-powerexpand-plus',
  sku: 'ANK-PEXP-7',
  brand: 'Anker',
  category: 'Accessories',
  subcategory: 'USB Hub',
  price: 49,
  discountPrice: 39,
  stock: 110,
  shortDescription: '7-in-1 USB-C PD Media Hub.',
  fullDescription:
  "Get more out of your laptop's USB-C port, with 4K HDMI, SD card connectivity, USB-A / USB-C data ports, and high-speed pass-through charging.",
  images: [
  'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1000'],

  specifications: {
    Ports: 'HDMI, 2x USB-A, USB-C Data, USB-C PD, SD/microSD',
    'Power Delivery': 'Pass-through up to 85W',
    Video: '4K @ 30Hz HDMI',
    Material: 'Aluminum exterior'
  },
  rating: 4.2,
  reviewsCount: 385
}];


export const mockBrands: Brand[] = [
{ id: 'b1', name: 'Apple', logo: '🍎', productCount: 42 },
{ id: 'b2', name: 'Dell', logo: '💻', productCount: 38 },
{ id: 'b3', name: 'Lenovo', logo: '🔴', productCount: 45 },
{ id: 'b4', name: 'ASUS', logo: '🎮', productCount: 31 },
{ id: 'b5', name: 'Logitech', logo: '🖱️', productCount: 56 },
{ id: 'b6', name: 'Samsung', logo: '📱', productCount: 29 },
{ id: 'b7', name: 'Razer', logo: '🐍', productCount: 24 },
{ id: 'b8', name: 'Sony', logo: '🎧', productCount: 18 }];


export const mockTestimonials: Testimonial[] = [
{
  id: 't1',
  name: 'Sarah Jenkins',
  avatar:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  rating: 5,
  comment:
  'The MacBook Pro M3 Max I bought here is an absolute beast. Shipping was incredibly fast and the packaging was premium.',
  product: 'MacBook Pro 16" M3 Max'
},
{
  id: 't2',
  name: 'David Chen',
  avatar:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  rating: 5,
  comment:
  'TechVault has the best selection of custom keyboards. My Keychron arrived in perfect condition.',
  product: 'Keychron Q1 Pro'
},
{
  id: 't3',
  name: 'Emily Rodriguez',
  avatar:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  rating: 4,
  comment:
  'Great prices on Dell monitors. The IPS Black panel is a game changer for my design work.',
  product: 'Dell UltraSharp U2723QE'
},
{
  id: 't4',
  name: 'Marcus Johnson',
  avatar:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  rating: 5,
  comment:
  'Customer service was extremely helpful when I needed to exchange my laptop bag. Highly recommended!',
  product: 'Peak Design Everyday Backpack'
},
{
  id: 't5',
  name: 'Sophia Lee',
  avatar:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  rating: 5,
  comment:
  'The noise cancellation on these Sony headphones is unreal. Perfect for my daily commute.',
  product: 'Sony WH-1000XM5'
},
{
  id: 't6',
  name: 'Alex Mercer',
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  rating: 4,
  comment:
  'Solid gaming laptop for the price. The cooling pad I bought with it keeps temps perfectly low.',
  product: 'ASUS ROG Strix G16'
}];


export const mockBanners: Banner[] = [
{
  id: 'ban1',
  title: 'Power Your Potential',
  subtitle: 'Discover premium laptops engineered for professionals.',
  ctaText: 'Shop Laptops',
  ctaLink: '/shop?category=laptops',
  bgImage:
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=2000'
},
{
  id: 'ban2',
  title: 'Elevate Your Workspace',
  subtitle: 'Premium accessories for the modern creator.',
  ctaText: 'Explore Accessories',
  ctaLink: '/shop?category=accessories',
  bgImage:
  'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2000'
},
{
  id: 'ban3',
  title: 'Next-Gen Gaming',
  subtitle: 'Dominate the competition with RTX 40-series laptops.',
  ctaText: 'Shop Gaming',
  ctaLink: '/shop?category=laptops',
  bgImage:
  'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=2000'
}];