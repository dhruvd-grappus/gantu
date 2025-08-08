import type { TripCard } from '../types';

export const SAMPLE_TRIPS: TripCard[] = [
  {
    id: "1",
    title: "La Tomatina Extravaganza",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&h=300&fit=crop",
    rating: 7.5,
    originalPrice: 322500,
    discountedPrice: 273688,
    discount: 20,
    pricePerPerson: 273688,
    tags: [],
    idealFor: "Ideal for families",
    features: [
      "Round Trip Flights",
      "Airport Transfers", 
      "Selected Meals",
      "3 Star Hotels",
      "7 Activities",
      "EuRail Pass"
    ]
  }
];