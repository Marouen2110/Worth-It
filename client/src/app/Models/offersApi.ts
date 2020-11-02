export interface OfferAPI {
  id?: string;
  name: string;
  description: string;
  url: string;
  image: string;
  review_rating: number;
  review_count: number;
  offers_count: number;
  currency: string;
  min_price: number;
}
