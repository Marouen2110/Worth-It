import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayementRoutingModule } from './payement-routing.module';
import { CardFormComponent } from './card-form/card-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { InputComponent } from './input/input.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';

@NgModule({
  declarations: [
    CardFormComponent,
    CardComponent,
    InputComponent,
    CreateTransactionComponent,
  ],
  imports: [CommonModule, PayementRoutingModule, ReactiveFormsModule],
  exports: [CardFormComponent],
})
export class PayementModule {}
