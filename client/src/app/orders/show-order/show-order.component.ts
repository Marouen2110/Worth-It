import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css'],
})
export class ShowOrderComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe((orders) => {
      this.loading = false;
      console.log(orders);
      this.orders = orders;
    });
  }
}
