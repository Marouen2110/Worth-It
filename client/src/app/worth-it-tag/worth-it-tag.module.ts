import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorthItTagRoutingModule } from './worth-it-tag-routing.module';
import { AnnonceLBComponent } from './annonce-lb/annonce-lb.component';
import { OffresApiIdealoComponent } from './offres-api-idealo/offres-api-idealo.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import {
  RedirectDirective,
  RedirectWithHrefDirective,
} from '../shared/redirect/redirect.directive';

@NgModule({
  declarations: [
    AnnonceLBComponent,
    OffresApiIdealoComponent,
    HomeComponent,
    OfferListItemComponent,
  ],
  imports: [
    CommonModule,
    WorthItTagRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    // RedirectDirective,
    // RedirectWithHrefDirective,
  ],
  exports: [HomeComponent],
})
export class WorthItTagModule {}
