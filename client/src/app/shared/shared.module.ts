import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { InputImageComponent } from './input-image/input-image.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {
  RedirectDirective,
  RedirectWithHrefDirective,
} from './redirect/redirect.directive';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    PaginatorComponent,
    InputImageComponent,
    NotFoundComponent,
    RedirectDirective,
    RedirectWithHrefDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    InputImageComponent,
    NotFoundComponent,
    ModalComponent,
    PaginatorComponent,
    RedirectDirective,
    RedirectWithHrefDirective,
  ],
})
export class SharedModule {}
