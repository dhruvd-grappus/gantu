export interface Trip {
  id: string;
  title: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  pricePerPerson: number;
  tags: string[];
  idealFor: string;
  features: string[];
}

// Keep TripCard as an alias for backward compatibility
export type TripCard = Trip;