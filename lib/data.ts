export interface ProductVariant {
  size: string;
  price: number;
  originalPrice: number; // <-- NEW FIELD
  image: string;
}

export interface Product {
  id: string;
  slug: string; 
  name: string;
  headline: string; 
  description: string; 
  character: string;
  bestFor: string;
  longevity: string;
  inspiration: string;
  gender: string; 
  variants: ProductVariant[]; 
}

export const products: Product[] = [
  {
    id: "1",
    slug: "neosil",
    name: "Neosil",
    headline: "A fresh, vibrant and irresistibly masculine fragrance.",
    description: "A fresh, vibrant and irresistibly masculine fragrance crafted for those who love to stand out. Neosil opens with a refreshing burst of citrus and aromatic notes, developing into a smooth, slightly sweet heart with a warm and woody finish.\n\nIts energetic and confident character makes it perfect for everyday wear, casual outings and evening occasions.",
    character: "Fresh • Sweet • Aromatic • Woody • Masculine",
    bestFor: "Everyday Wear • Casual Outings • Dates • Evening • Parties",
    longevity: "5–6 Hours",
    inspiration: "Versace Eros",
    gender: "UNISEX",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/neosil-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/neosil-20.jpg" }
    ]
  },
  {
    id: "2",
    slug: "black-knot",
    name: "Black Knot",
    headline: "A bold, fresh and masculine fragrance crafted to leave a lasting impression.",
    description: "A bold, fresh and masculine fragrance crafted for the man who likes to leave a lasting impression. Black Knot opens with a burst of fresh, vibrant citrus and aromatic notes, followed by a clean, spicy heart and a warm, woody base. The result is a versatile fragrance that feels fresh, confident and effortlessly sophisticated.\n\nDesigned for everyday wear as well as special occasions, Black Knot balances freshness with depth, making it an easy choice from day to night.",
    character: "Fresh • Spicy • Woody • Masculine",
    bestFor: "Everyday Wear • Office • Dates • Evening • Special Occasions",
    longevity: "6–8 Hours of Strong Lasting",
    inspiration: "Dior Sauvage EDT",
    gender: "MALE",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/black-knot-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/black-knot-20.jpg" }
    ]
  },
  {
    id: "3",
    slug: "frose",
    name: "Frose",
    headline: "A bold, addictive and captivating fragrance.",
    description: "A bold, addictive and captivating fragrance created for those who love to make an impression. Frose blends a warm, sweet and spicy character with a smooth, seductive depth, creating a fragrance that feels confident, modern and effortlessly attractive.\n\nPerfect for evenings, parties and special occasions, Frose is designed to add a touch of mystery and confidence to your presence.",
    character: "Sweet • Warm • Spicy • Woody • Seductive",
    bestFor: "Evening Wear • Parties • Dates • Special Occasions",
    longevity: "7–8 Hours",
    inspiration: "Azzaro The Most Wanted",
    gender: "UNISEX",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/frose-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/frose-20.jpg" }
    ]
  },
  {
    id: "4",
    slug: "smoky-knight",
    name: "Smoky Knight",
    headline: "A deep, smoky and luxurious fragrance for a bold presence.",
    description: "A deep, smoky and luxurious fragrance created for those who prefer a bold and mysterious presence. Smoky Knight opens with a rich, warm character and develops into an intense blend of smoky, woody and subtly sweet accords.\n\nPowerful yet refined, its dark and sophisticated profile makes it especially suited for evenings, special occasions and moments when you want your fragrance to stand out.",
    character: "Smoky • Woody • Warm • Rich • Luxurious",
    bestFor: "Evening Wear • Parties • Special Occasions • Date Nights",
    longevity: "Up to 10–12 hours*",
    inspiration: "Louis Vuitton Ombre Nomade",
    gender: "MALE",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/smoky-knight-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/smoky-knight-20.jpg" }
    ]
  },
  {
    id: "5",
    slug: "first-kiss",
    name: "First Kiss",
    headline: "A seductive, elegant and captivating fragrance.",
    description: "A seductive, elegant and captivating fragrance crafted for the woman who embraces her confidence and individuality. First Kiss opens with a beautiful blend of sweet and floral accords, unfolding into a rich, warm heart with a smooth and sensual finish.\n\nPerfect for evenings, dates and special occasions, First Kiss creates an alluring presence that is both feminine and unforgettable.",
    character: "Sweet • Floral • Warm • Sensual • Elegant",
    bestFor: "Evening Wear • Dates • Parties • Special Occasions",
    longevity: "7–8 Hours",
    inspiration: "Carolina Herrera Good Girl",
    gender: "FEMALE",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/first-kiss-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/first-kiss-20.jpg" }
    ]
  },
  {
    id: "6",
    slug: "liyara",
    name: "Liyara",
    headline: "A beautiful, elegant and feminine fragrance.",
    description: "A beautiful, elegant and feminine fragrance created for those who love a soft yet captivating presence. Liyara opens with a delicate floral freshness, unfolding into a smooth, romantic heart with a subtle sweet and sophisticated finish.\n\nPerfect for everyday wear, dates and special occasions, Liyara adds an effortless touch of elegance and charm to your personality.",
    character: "Floral • Fresh • Sweet • Elegant • Feminine",
    bestFor: "Everyday Wear • Dates • Brunch • Parties • Special Occasions",
    longevity: "6–8 Hours",
    inspiration: "Gucci Flora",
    gender: "FEMALE",
    variants: [
      { size: "50 ml", price: 699, originalPrice: 1099, image: "/images/liyara-50.jpg" },
      { size: "20 ml", price: 319, originalPrice: 499, image: "/images/liyara-20.jpg" }
    ]
  }
];