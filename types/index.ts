export interface TripCard {
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