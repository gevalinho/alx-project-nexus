import { Product } from "../types/Product";

export const PRODUCTS: Product[] = [
   
  // --------------------------------------------------------------------
  // EXISTING FAKESTORE PRODUCTS (1–20)
  // --------------------------------------------------------------------
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description: "Slim-fitting style...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "Women's Leggings",
    price: 29.99,
    description: "Soft, stretchy leggings...",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 150 }
  },
  {
    id: 6,
    title: "Women's Jacket",
    price: 49.99,
    description: "Warm and lightweight...",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81qiatYk-ML._AC_UX679_.jpg",
    rating: { rate: 4.9, count: 200 }
  },
  {
    id: 7,
    title: "Kids Hoodie",
    price: 19.99,
    description: "Comfortable hoodie for kids.",
    category: "kids",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 4.3, count: 99 }
  },
  {
    id: 8,
    title: "Kids Sneakers",
    price: 29.99,
    description: "Soft interior and durable outer soles.",
    category: "kids",
    image: "https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg",
    rating: { rate: 4.7, count: 131 }
  },

  // --------------------------------------------------------------------
  // SHOES CATEGORY (IDs 201–210)
  // --------------------------------------------------------------------
  {
    id: 201,
    title: "Nike AirMax Runner",
    price: 129.99,
    description: "Lightweight running shoe with breathable mesh.",
    category: "shoes",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    rating: { rate: 4.7, count: 210 }
  },
  {
    id: 202,
    title: "Adidas Ultraboost 23",
    price: 149.99,
    description: "Premium comfort sneaker for daily running.",
    category: "shoes",
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
    rating: { rate: 4.8, count: 320 }
  },
  {
    id: 203,
    title: "New Balance Lifestyle 574",
    price: 109.99,
    description: "Classic suede and mesh combination.",
    category: "shoes",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    rating: { rate: 4.5, count: 180 }
  },
  {
    id: 204,
    title: "Puma Street Flex",
    price: 89.99,
    description: "Urban style sneaker with anti-slip grip.",
    category: "shoes",
    image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg",
    rating: { rate: 4.3, count: 140 }
  },
  {
    id: 205,
    title: "Converse Chuck Taylor Classic",
    price: 79.99,
    description: "Iconic canvas sneaker.",
    category: "shoes",
    image: "https://images.pexels.com/photos/430207/pexels-photo-430207.jpeg",
    rating: { rate: 4.6, count: 500 }
  },
  {
    id: 206,
    title: "Reebok Training Pro",
    price: 119.99,
    description: "High-performance workout shoes.",
    category: "shoes",
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
    rating: { rate: 4.4, count: 160 }
  },
  {
    id: 207,
    title: "Timberland CityBoots",
    price: 159.99,
    description: "Waterproof rugged boots.",
    category: "shoes",
    image: "https://images.pexels.com/photos/428120/pexels-photo-428120.jpeg",
    rating: { rate: 4.8, count: 310 }
  },
  {
    id: 208,
    title: "Vans Old Skool",
    price: 69.99,
    description: "Durable skate shoe.",
    category: "shoes",
    image: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg",
    rating: { rate: 4.5, count: 420 }
  },
  {
    id: 209,
    title: "Jordan Retro High",
    price: 199.99,
    description: "Premium leather high-top sneaker.",
    category: "shoes",
    image: "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg",
    rating: { rate: 4.9, count: 600 }
  },
  {
    id: 210,
    title: "Asics Gel Nimbus 25",
    price: 139.99,
    description: "Advanced cushioning for marathon runners.",
    category: "shoes",
    image: "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg",
    rating: { rate: 4.7, count: 250 }
  },

  // --------------------------------------------------------------------
  // BAGS CATEGORY (IDs 301–310)
  // --------------------------------------------------------------------
  {
    id: 301,
    title: "Leather Crossbody Bag",
    price: 89.99,
    description: "Premium crossbody bag with adjustable strap.",
    category: "bags",
    image: "https://images.pexels.com/photos/230627/pexels-photo-230627.jpeg",
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: 302,
    title: "Women’s Fashion Handbag",
    price: 119.99,
    description: "Elegant handbag for outings and work.",
    category: "bags",
    image: "https://images.pexels.com/photos/1609824/pexels-photo-1609824.jpeg",
    rating: { rate: 4.8, count: 250 }
  },
  {
    id: 303,
    title: "Men's Leather Messenger Bag",
    price: 139.99,
    description: "Durable leather laptop messenger bag.",
    category: "bags",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    rating: { rate: 4.7, count: 190 }
  },
  {
    id: 304,
    title: "Canvas Travel Backpack",
    price: 79.99,
    description: "Water-resistant multi-purpose backpack.",
    category: "bags",
    image: "https://images.pexels.com/photos/414645/pexels-photo-414645.jpeg",
    rating: { rate: 4.4, count: 160 }
  },
  {
    id: 305,
    title: "Luxury Designer Tote",
    price: 159.99,
    description: "Premium polished leather tote bag.",
    category: "bags",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    rating: { rate: 4.9, count: 300 }
  },
  {
    id: 306,
    title: "Mini Shoulder Bag",
    price: 69.99,
    description: "Compact shoulder bag for essentials.",
    category: "bags",
    image: "https://images.pexels.com/photos/1609823/pexels-photo-1609823.jpeg",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 307,
    title: "Office Laptop Bag",
    price: 109.99,
    description: "Shock-resistant business laptop bag.",
    category: "bags",
    image: "https://images.pexels.com/photos/267297/pexels-photo-267297.jpeg",
    rating: { rate: 4.6, count: 210 }
  },
  {
    id: 308,
    title: "Vintage Leather Backpack",
    price: 149.99,
    description: "Rustic handcrafted leather backpack.",
    category: "bags",
    image: "https://images.pexels.com/photos/422202/pexels-photo-422202.jpeg",
    rating: { rate: 4.7, count: 175 }
  },
  {
    id: 309,
    title: "Travel Duffel Bag",
    price: 129.99,
    description: "Perfect weekend or gym travel duffel.",
    category: "bags",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
    rating: { rate: 4.8, count: 260 }
  },
  {
    id: 310,
    title: "Women’s Luxury Evening Bag",
    price: 199.99,
    description: "Elegant crystal-detailed evening bag.",
    category: "bags",
    image: "https://images.pexels.com/photos/3608013/pexels-photo-3608013.jpeg",
    rating: { rate: 4.9, count: 145 }
  }
];

