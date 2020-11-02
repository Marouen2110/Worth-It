import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ShowOrderComponent } from './show-order/show-order.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { CdTimerModule } from 'angular-cd-timer';
import { SharedModule } from '../shared/shared.module';
import { PayementModule } from '../payement/payement.module';
import { CardFormComponent } from '../payement/card-form/card-form.component';

@NgModule({
  declarations: [ShowOrderComponent, OrderItemComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule, PayementModule],
})
export class OrdersModule {}
