import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PlaceholderComponent } from './inbox/placeholder/placeholder.component';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';
import { AnnoncesModule } from './annonces/annonces.module';
import { WorthItTagModule } from './worth-it-tag/worth-it-tag.module';
import { HomePageModule } from './home-page/home-page.module';
import { PayementModule } from './payement/payement.module';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [AppComponent, PlaceholderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AnnoncesModule,
    WorthItTagModule,
    HomePageModule,
    NotificationsModule,
    SharedModule,
    PayementModule,
    OrdersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
