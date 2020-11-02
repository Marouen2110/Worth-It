export interface MessagesDiscussion {
  id: string;
  status: string;
  userId: string;
  messageText: string;
  createdAt: Date;
  version: number;
  annonce: {
    id: string;
    title: string;
    userId: string;
    version: number;
    createdAt: Date;
  };
  discussion: {
    id: string;
    annonceId: string;
    buyerId: string;
    sellerId: string;
    status: string;
    createdAt: Date;
    version: number;
  };
}

export interface Message {
  from: string;
  to: string;
  annonceTitle: string;
  messageText: string;
}
