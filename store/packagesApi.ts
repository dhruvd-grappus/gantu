import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Trip } from '../types';

// Mock data with 30+ packages
const MOCK_PACKAGES: Trip[] = [
  {
    id: "1",
    title: "La Tomatina Extravaganza",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&h=300&fit=crop",
    rating: 7.5,
    originalPrice: 322500,
    discountedPrice: 273688,
    discount: 20,
    pricePerPerson: 273688,
    tags: ["Spain", "Festival", "Adventure"],
    idealFor: "Ideal for families",
    features: ["Round Trip Flights", "Airport Transfers", "Selected Meals", "3 Star Hotels", "7 Activities", "EuRail Pass"]
  },
  {
    id: "2",
    title: "Bali Beach Paradise",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&fit=crop",
    rating: 8.2,
    originalPrice: 185000,
    discountedPrice: 148000,
    discount: 20,
    pricePerPerson: 148000,
    tags: ["Bali", "Beach", "Relaxation"],
    idealFor: "Ideal for couples",
    features: ["Round Trip Flights", "Private Pool Villa", "All Meals Included", "5 Star Resort", "Spa Sessions", "Water Sports"]
  },
  {
    id: "3",
    title: "Tokyo Tech & Culture",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
    rating: 9.0,
    originalPrice: 425000,
    discountedPrice: 361250,
    discount: 15,
    pricePerPerson: 361250,
    tags: ["Japan", "Culture", "Technology"],
    idealFor: "Ideal for solo",
    features: ["Round Trip Flights", "JR Pass Included", "Breakfast Included", "4 Star Hotels", "10 Experiences", "City Tours"]
  },
  {
    id: "4",
    title: "Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=300&fit=crop",
    rating: 8.8,
    originalPrice: 550000,
    discountedPrice: 440000,
    discount: 20,
    pricePerPerson: 440000,
    tags: ["Switzerland", "Mountains", "Skiing"],
    idealFor: "Ideal for groups",
    features: ["Round Trip Flights", "Swiss Travel Pass", "All Meals", "Alpine Resort", "Ski Equipment", "Mountain Tours"]
  },
  {
    id: "5",
    title: "Dubai Luxury Experience",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop",
    rating: 8.5,
    originalPrice: 280000,
    discountedPrice: 224000,
    discount: 20,
    pricePerPerson: 224000,
    tags: ["Dubai", "Luxury", "Shopping"],
    idealFor: "Ideal for families",
    features: ["Round Trip Flights", "Luxury Transfers", "Breakfast & Dinner", "5 Star Hotels", "Desert Safari", "City Tours"]
  },
  {
    id: "6",
    title: "Maldives Island Escape",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=300&fit=crop",
    rating: 9.2,
    originalPrice: 450000,
    discountedPrice: 360000,
    discount: 20,
    pricePerPerson: 360000,
    tags: ["Maldives", "Beach", "Honeymoon"],
    idealFor: "Ideal for couples",
    features: ["Round Trip Flights", "Seaplane Transfer", "All Inclusive", "Water Villa", "Diving Sessions", "Sunset Cruise"]
  },
  {
    id: "7",
    title: "Thailand Island Hopping",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    rating: 8.7,
    originalPrice: 195000,
    discountedPrice: 156000,
    discount: 20,
    pricePerPerson: 156000,
    tags: ["Thailand", "Islands", "Adventure"],
    idealFor: "Perfect for couples",
    features: ["Round Trip Flights", "Island Transfers", "Beach Resort", "Snorkeling Gear", "Local Tours", "Thai Cooking Class"]
  },
  {
    id: "8",
    title: "Taste of Tuscany",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&h=300&fit=crop",
    rating: 8.0,
    originalPrice: 450000,
    discountedPrice: 382500,
    discount: 15,
    pricePerPerson: 382500,
    tags: ["Italy", "Wine", "Culture"],
    idealFor: "Perfect for couples",
    features: ["One-Way Flights", "Luxury Transfers", "Gourmet Dining", "4 Star Hotels", "5 Activities", "Rail Pass Included"]
  },
  {
    id: "9",
    title: "Wild Safari Experience",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
    rating: 9.0,
    originalPrice: 675000,
    discountedPrice: 607500,
    discount: 10,
    pricePerPerson: 607500,
    tags: ["Kenya", "Safari", "Wildlife"],
    idealFor: "Adventure seekers",
    features: ["Direct Flights", "Safari Transfers", "Authentic Meals", "5 Star Lodges", "10 Activities", "National Park Pass"]
  },
  {
    id: "10",
    title: "Cultural Immersion Tour",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=300&fit=crop",
    rating: 8.5,
    originalPrice: 245000,
    discountedPrice: 183750,
    discount: 25,
    pricePerPerson: 183750,
    tags: ["India", "Culture", "Heritage"],
    idealFor: "Solo travelers welcome",
    features: ["Multi-City Flights", "Local Transfers", "Cultural Experiences", "8 Activities", "3 Star Accommodations", "Heritage Tours"]
  },
  {
    id: "11",
    title: "Team Building Retreat",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=300&fit=crop",
    rating: 8.8,
    originalPrice: 500000,
    discountedPrice: 440000,
    discount: 12,
    pricePerPerson: 440000,
    tags: ["Corporate", "Team Building", "Resort"],
    idealFor: "Corporate Groups",
    features: ["Chartered Flights", "Private Transfers", "Group Meals", "4 Star Resorts", "6 Activities", "Team Coaching"]
  },
  {
    id: "12",
    title: "Patagonia Wilderness Trek",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    rating: 9.1,
    originalPrice: 620000,
    discountedPrice: 527000,
    discount: 15,
    pricePerPerson: 527000,
    tags: ["Argentina", "Trekking", "Nature"],
    idealFor: "Adventure enthusiasts",
    features: ["International Flights", "Local Guides", "Camping Equipment", "Mountain Lodges", "Glacier Tours", "Wildlife Spotting"]
  },
  {
    id: "13",
    title: "Northern Lights Quest",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=300&fit=crop",
    rating: 8.9,
    originalPrice: 475000,
    discountedPrice: 380000,
    discount: 20,
    pricePerPerson: 380000,
    tags: ["Norway", "Aurora", "Winter"],
    idealFor: "Nature lovers",
    features: ["Round Trip Flights", "Arctic Transfers", "Thermal Clothing", "Glass Igloos", "Aurora Hunting", "Husky Sledding"]
  },
  {
    id: "14",
    title: "Mediterranean Cruise",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    rating: 8.6,
    originalPrice: 390000,
    discountedPrice: 312000,
    discount: 20,
    pricePerPerson: 312000,
    tags: ["Cruise", "Mediterranean", "Luxury"],
    idealFor: "Ideal for families",
    features: ["Cruise Ship", "Shore Excursions", "All Meals", "Entertainment", "Multiple Ports", "Ocean Views"]
  },
  {
    id: "15",
    title: "Amazon Rainforest Explorer",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    rating: 8.4,
    originalPrice: 340000,
    discountedPrice: 272000,
    discount: 20,
    pricePerPerson: 272000,
    tags: ["Brazil", "Rainforest", "Wildlife"],
    idealFor: "Eco-conscious travelers",
    features: ["Internal Flights", "Boat Transfers", "Jungle Lodges", "Wildlife Tours", "Canopy Walks", "Indigenous Culture"]
  },
  {
    id: "16",
    title: "Iceland Fire & Ice",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    rating: 9.3,
    originalPrice: 520000,
    discountedPrice: 416000,
    discount: 20,
    pricePerPerson: 416000,
    tags: ["Iceland", "Geysers", "Glaciers"],
    idealFor: "Nature photographers",
    features: ["Round Trip Flights", "4WD Vehicle", "Hot Springs", "Glacier Walks", "Volcano Tours", "Blue Lagoon"]
  },
  {
    id: "17",
    title: "Morocco Desert Adventure",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
    rating: 8.3,
    originalPrice: 285000,
    discountedPrice: 228000,
    discount: 20,
    pricePerPerson: 228000,
    tags: ["Morocco", "Desert", "Camels"],
    idealFor: "Adventure seekers",
    features: ["Round Trip Flights", "Desert Camp", "Camel Trekking", "Local Guides", "Traditional Meals", "Berber Culture"]
  },
  {
    id: "18",
    title: "New Zealand Thrill Seeker",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&fit=crop",
    rating: 9.4,
    originalPrice: 680000,
    discountedPrice: 544000,
    discount: 20,
    pricePerPerson: 544000,
    tags: ["New Zealand", "Adventure", "Bungee"],
    idealFor: "Thrill seekers",
    features: ["Round Trip Flights", "Adventure Activities", "Scenic Flights", "Luxury Lodges", "Extreme Sports", "Milford Sound"]
  },
  {
    id: "19",
    title: "Greek Island Paradise",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=300&fit=crop",
    rating: 8.7,
    originalPrice: 315000,
    discountedPrice: 252000,
    discount: 20,
    pricePerPerson: 252000,
    tags: ["Greece", "Islands", "History"],
    idealFor: "History buffs",
    features: ["Ferry Passes", "Island Hopping", "Archaeological Sites", "Beach Resorts", "Greek Cuisine", "Sunset Views"]
  },
  {
    id: "20",
    title: "Vietnam Culinary Journey",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
    rating: 8.9,
    originalPrice: 195000,
    discountedPrice: 156000,
    discount: 20,
    pricePerPerson: 156000,
    tags: ["Vietnam", "Food", "Culture"],
    idealFor: "Food enthusiasts",
    features: ["Round Trip Flights", "Food Tours", "Cooking Classes", "Street Food", "Market Visits", "Local Guides"]
  },
  {
    id: "21",
    title: "Canadian Rocky Mountains",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=300&fit=crop",
    rating: 9.0,
    originalPrice: 575000,
    discountedPrice: 460000,
    discount: 20,
    pricePerPerson: 460000,
    tags: ["Canada", "Mountains", "Wildlife"],
    idealFor: "Nature lovers",
    features: ["Round Trip Flights", "National Parks", "Wildlife Viewing", "Mountain Lodges", "Hiking Trails", "Lake Cruises"]
  },
  {
    id: "22",
    title: "Peru Machu Picchu Trek",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    rating: 9.2,
    originalPrice: 385000,
    discountedPrice: 308000,
    discount: 20,
    pricePerPerson: 308000,
    tags: ["Peru", "History", "Trekking"],
    idealFor: "History enthusiasts",
    features: ["Round Trip Flights", "Inca Trail", "Professional Guides", "Mountain Camps", "Ancient Ruins", "Cultural Tours"]
  },
  {
    id: "23",
    title: "South African Wine Safari",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
    rating: 8.6,
    originalPrice: 465000,
    discountedPrice: 372000,
    discount: 20,
    pricePerPerson: 372000,
    tags: ["South Africa", "Wine", "Safari"],
    idealFor: "Wine connoisseurs",
    features: ["Round Trip Flights", "Wine Estates", "Game Drives", "Luxury Lodges", "Wine Tastings", "Cape Town Tours"]
  },
  {
    id: "24",
    title: "Egypt Ancient Wonders",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=300&fit=crop",
    rating: 8.4,
    originalPrice: 295000,
    discountedPrice: 236000,
    discount: 20,
    pricePerPerson: 236000,
    tags: ["Egypt", "History", "Pyramids"],
    idealFor: "History buffs",
    features: ["Round Trip Flights", "Pyramid Tours", "Nile Cruise", "Expert Guides", "Museums", "Ancient Temples"]
  },
  {
    id: "25",
    title: "Australian Outback Adventure",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&fit=crop",
    rating: 8.8,
    originalPrice: 635000,
    discountedPrice: 508000,
    discount: 20,
    pricePerPerson: 508000,
    tags: ["Australia", "Outback", "Wildlife"],
    idealFor: "Adventure seekers",
    features: ["Round Trip Flights", "Uluru Tours", "Bush Camping", "Aboriginal Culture", "Unique Wildlife", "Desert Experiences"]
  },
  {
    id: "26",
    title: "Scandinavian Fjords Cruise",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    rating: 9.1,
    originalPrice: 525000,
    discountedPrice: 420000,
    discount: 20,
    pricePerPerson: 420000,
    tags: ["Norway", "Fjords", "Cruise"],
    idealFor: "Scenic seekers",
    features: ["Luxury Cruise", "Fjord Views", "All Meals", "Shore Excursions", "Northern Cities", "Wildlife Watching"]
  },
  {
    id: "27",
    title: "Costa Rica Eco Adventure",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    rating: 8.5,
    originalPrice: 345000,
    discountedPrice: 276000,
    discount: 20,
    pricePerPerson: 276000,
    tags: ["Costa Rica", "Eco", "Adventure"],
    idealFor: "Eco warriors",
    features: ["Round Trip Flights", "Rainforest Lodges", "Wildlife Tours", "Zip Lining", "Volcano Hikes", "Beach Time"]
  },
  {
    id: "28",
    title: "Jordan Petra Discovery",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=300&fit=crop",
    rating: 8.7,
    originalPrice: 365000,
    discountedPrice: 292000,
    discount: 20,
    pricePerPerson: 292000,
    tags: ["Jordan", "History", "Desert"],
    idealFor: "History lovers",
    features: ["Round Trip Flights", "Petra Tours", "Wadi Rum", "Desert Camps", "Dead Sea", "Historical Sites"]
  },
  {
    id: "29",
    title: "Turkish Delight Cultural Tour",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&h=300&fit=crop",
    rating: 8.2,
    originalPrice: 255000,
    discountedPrice: 204000,
    discount: 20,
    pricePerPerson: 204000,
    tags: ["Turkey", "Culture", "History"],
    idealFor: "Culture enthusiasts",
    features: ["Round Trip Flights", "Istanbul Tours", "Cappadocia", "Turkish Baths", "Local Cuisine", "Historical Sites"]
  },
  {
    id: "30",
    title: "Madagascar Wildlife Expedition",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
    rating: 9.0,
    originalPrice: 495000,
    discountedPrice: 396000,
    discount: 20,
    pricePerPerson: 396000,
    tags: ["Madagascar", "Wildlife", "Unique"],
    idealFor: "Nature photographers",
    features: ["Round Trip Flights", "Endemic Species", "National Parks", "Local Guides", "Unique Ecosystems", "Photography Tours"]
  },
  {
    id: "31",
    title: "Chile Atacama Desert Stars",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
    rating: 8.9,
    originalPrice: 425000,
    discountedPrice: 340000,
    discount: 20,
    pricePerPerson: 340000,
    tags: ["Chile", "Desert", "Astronomy"],
    idealFor: "Astronomy lovers",
    features: ["Round Trip Flights", "Desert Tours", "Star Gazing", "Observatory Visits", "Salt Flats", "Unique Landscapes"]
  },
  {
    id: "32",
    title: "Philippines Island Paradise",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&h=300&fit=crop",
    rating: 8.8,
    originalPrice: 225000,
    discountedPrice: 180000,
    discount: 20,
    pricePerPerson: 180000,
    tags: ["Philippines", "Islands", "Beaches"],
    idealFor: "Beach lovers",
    features: ["Round Trip Flights", "Island Hopping", "Pristine Beaches", "Snorkeling", "Local Culture", "Fresh Seafood"]
  }
];

// Mock API simulation with delays
const mockApiRequest = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const packagesApi = createApi({
  reducerPath: 'packagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    // Mock base query since we're using mock data
    fetchFn: () => Promise.resolve(new Response()),
  }),
  tagTypes: ['Package', 'Category', 'Search'],
  keepUnusedDataFor: 300, // Keep cached data for 5 minutes
  refetchOnFocus: false,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 900, // Refetch if last fetch was more than 15 minutes ago
  endpoints: (builder) => ({
    getPackages: builder.query<Trip[], { category?: string; limit?: number; offset?: number }>({
      queryFn: async ({ category, limit = 10, offset = 0 }) => {
        let filteredPackages = MOCK_PACKAGES;
        
        // Filter by category if provided
        if (category) {
          filteredPackages = MOCK_PACKAGES.filter(pkg => 
            pkg.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase())) ||
            pkg.title.toLowerCase().includes(category.toLowerCase())
          );
        }
        
        // Apply pagination
        const paginatedPackages = filteredPackages.slice(offset, offset + limit);
        
        // Simulate API delay
        await mockApiRequest(null, 800);
        
        return { data: paginatedPackages };
      },
      providesTags: (result, error, { category }) => [
        'Package',
        { type: 'Category', id: category || 'all' },
        ...((result ?? []).map((pkg) => ({ type: 'Package' as const, id: pkg.id }))),
      ],
      keepUnusedDataFor: 600, // Keep packages data for 10 minutes
    }),
    
    getPackageById: builder.query<Trip, string>({
      queryFn: async (id) => {
        const pkg = MOCK_PACKAGES.find(p => p.id === id);
        
        if (!pkg) {
          return { error: { status: 404, data: 'Package not found' } };
        }
        
        // Simulate API delay
        await mockApiRequest(null, 600);
        
        return { data: pkg };
      },
      providesTags: (result, error, id) => [{ type: 'Package', id }],
      keepUnusedDataFor: 1800, // Keep individual package data for 30 minutes
    }),
    
    getPackagesByCategory: builder.query<Trip[], string>({
      queryFn: async (category) => {
        const categoryPackages = MOCK_PACKAGES.filter(pkg => 
          pkg.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
        );
        
        // Simulate API delay
        await mockApiRequest(null, 700);
        
        return { data: categoryPackages.slice(0, 8) }; // Limit to 8 per category
      },
      providesTags: (result, error, category) => [
        { type: 'Category', id: category },
        'Package',
        ...((result ?? []).map((pkg) => ({ type: 'Package' as const, id: pkg.id }))),
      ],
      keepUnusedDataFor: 900, // Keep category data for 15 minutes
    }),
    
    searchPackages: builder.query<Trip[], { query: string; limit?: number }>({
      queryFn: async ({ query, limit = 20 }) => {
        const searchResults = MOCK_PACKAGES.filter(pkg =>
          pkg.title.toLowerCase().includes(query.toLowerCase()) ||
          pkg.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          pkg.idealFor.toLowerCase().includes(query.toLowerCase())
        );
        
        // Simulate API delay
        await mockApiRequest(null, 900);
        
        return { data: searchResults.slice(0, limit) };
      },
      providesTags: (result, error, { query }) => [
        { type: 'Search', id: query },
        'Package',
        ...((result ?? []).map((pkg) => ({ type: 'Package' as const, id: pkg.id }))),
      ],
      keepUnusedDataFor: 300, // Keep search results for 5 minutes
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useGetPackagesByCategoryQuery,
  useSearchPackagesQuery,
} = packagesApi;