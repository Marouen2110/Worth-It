export interface Annonce {
  title: string;
  description: string;
  image: string;
  adress: string;
  phone: string;
  price: number;
  shippingFee: number;
  voteCount: number;
  dimensions?: ProductDimensions;
}

export interface ProductDimensions {
  weight: number;
  height?: number;
  length?: number;
  width?: number;
}

export interface AnnonceResponse {
  id: string;
  voters: string[];
  userId: string;
  version: number;
  title: string;
  description: string;
  image: string;
  adress: string;
  phone: string;
  price: number;
  shippingFee: number;
  voteCount: number;
}
