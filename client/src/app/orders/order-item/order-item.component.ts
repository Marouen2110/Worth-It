import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';

import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  timerId: number;
  showModal = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.findTimeLeft();
    this.timerId = setInterval(this.findTimeLeft, 1000);
    clearInterval(this.timerId);
  }

  findTimeLeft = () => {
    const msLeft =
      new Date(this.order.expiresAt).getTime() - new Date().getTime();
    this.setTimeLeft(msLeft);
  };

  setTimeLeft(msLeft) {
    return Math.round(msLeft / 1000);
  }

  onSubmit() {
    this.paymentService.createPayment(this.order.id).subscribe((res) => {
      console.log(res);
      this.showModal = false;
    });
  }
}
