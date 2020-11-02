import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  rootUrl = environment.API_URL;
  token = 'tok_visa';

  constructor(private http: HttpClient) {}

  createPayment(orderId: string) {
    return this.http.post(`${this.rootUrl}/api/payments`, {
      token: this.token,
      orderId,
    });
  }
}
