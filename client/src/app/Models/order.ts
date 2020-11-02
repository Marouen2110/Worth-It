export interface Order {
  id: string;
  userId: string;
  status: string;
  expiresAt: Date;
  version: number;
  annonce: {
    id: string;
    title: string;
    price: number;
    shippingFee: number;
    version: number;
  };
}
