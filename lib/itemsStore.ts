// lib/itemsStore.ts

export interface Product {
  id: string; // for identification of all products uniquely
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string; // ISO String format (Learned from Vionti Health Date validation)
  image?: string; // Optional image (string URL)
}

// Using Array for standard API Handling as backend API will use this array of object as database :)
export let items: Product[] = [
  {
    id: "1",
    title: "Hydration Pro Water Bottle",
    description:
      "1L stainless steel bottle that keeps drinks cold for 24 hours.",
    price: 25,
    category: "Accessories",
    createdAt: "2024-01-10T10:00:00Z",
    image: "/items/water-bottle.jpg",
  },
  {
    id: "2",
    title: "Organic Sourdough Bread",
    description: "Freshly baked daily using traditional fermentation methods.",
    price: 6.5,
    category: "Food",
    createdAt: "2024-01-15T08:30:00Z",
    image: "/items/bread.jpg",
  },
  {
    id: "3",
    title: "Pro-Tech Laptop M3",
    description: "Powerful 14-inch laptop for developers and creators.",
    price: 1299,
    category: "Electronics",
    createdAt: "2023-12-01T14:20:00Z",
    image: "/items/laptop.jpg",
  },
  {
    id: "4",
    title: "Nourish Hair Oil",
    description: "Infused with argan and rosemary for deep conditioning.",
    price: 18,
    category: "Beauty",
    createdAt: "2024-01-05T09:15:00Z",
    image: "/items/hair-oil.jpg",
  },
  {
    id: "5",
    title: "Volume Plus Shampoo",
    description: "Sulfate-free formula for fine to normal hair types.",
    price: 15,
    category: "Beauty",
    createdAt: "2024-01-05T09:20:00Z",
    image: "/items/shampoo.jpg",
  },
  {
    id: "6",
    title: "Ceramic Dinner Plate",
    description: "Matte finish, dishwasher-safe handcrafted stoneware.",
    price: 12,
    category: "Home",
    createdAt: "2024-01-18T16:45:00Z",
    image: "/items/plate.jpg",
  },
  {
    id: "7",
    title: "Sparkling Lemon Soda",
    description: "Low-sugar natural citrus sparkling water.",
    price: 2.5,
    category: "Food",
    createdAt: "2024-01-20T11:00:00Z",
    image: "/items/soda.jpg",
  },
  {
    id: "9",
    title: "Artisan Vanilla Ice Cream",
    description: "Made with real Madagascar vanilla beans and fresh cream.",
    price: 8,
    category: "Food",
    createdAt: "2024-01-22T13:10:00Z",
    image: "/items/ice-cream.jpg",
  },
];
