import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { WorthItTagModule } from '../worth-it-tag/worth-it-tag.module';
import { AnnoncesModule } from '../annonces/annonces.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    WorthItTagModule,
    AnnoncesModule,
    HomePageRoutingModule,
  ],
  exports: [LandingPageComponent],
})
export class HomePageModule {}
