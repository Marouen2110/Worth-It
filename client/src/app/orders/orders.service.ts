import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  rootUrl = environment.API_URL;
  annonceId: string;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(`${this.rootUrl}/api/orders`);
  }

  getOrderById(id: string) {
    return this.http.get<Order>(`${this.rootUrl}/api/orders/${id}`);
  }

  createOrder(annonceId: string) {
    return this.http.post<Order>(`${this.rootUrl}/api/orders`, { annonceId });
  }

  deleteOrder(orderId: string) {
    return this.http.delete<Order>(`${this.rootUrl}/api/orders/${orderId}`);
  }
}
