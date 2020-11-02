import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnonceCreateComponent } from './annonces/annonce-create/annonce-create.component';
import { AnnoncesListComponent } from './annonces/annonces-list/annonces-list.component';
import { AnnonceHomeComponent } from './annonces/home/home.component';
import { MyAnnonceHomeComponent } from './annonces/my-annonce-home/my-annonce-home.component';
import { HomeComponent } from './worth-it-tag/home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { LandingPageComponent } from './home-page/landing-page/landing-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RedirectService } from './shared/redirect/redirect.service';
import { ShowOrderComponent } from './orders/show-order/show-order.component';

const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((mod) => mod.InboxModule),
  },
  {
    path: 'notifications',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (mod) => mod.NotificationsModule
      ),
  },
  {
    path: 'myadverts',
    canLoad: [AuthGuard],
    component: MyAnnonceHomeComponent,
  },
  {
    path: 'orders',
    canLoad: [AuthGuard],
    component: ShowOrderComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  // // Not Found page with external link redirection
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent,
  //   canActivate: [RedirectService],
  // },
  // { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
