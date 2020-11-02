import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnonceLBComponent } from './annonce-lb/annonce-lb.component';
import { HomeComponent } from './home/home.component';
import { OffresApiIdealoComponent } from './offres-api-idealo/offres-api-idealo.component';
import { WIResolverService } from './wiresolver.service';
import { OfferResolverService } from './offer-resolver.service';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { RedirectService } from '../shared/redirect/redirect.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'annoncelbc/:id',
    component: AnnonceLBComponent,
    resolve: {
      annonceLBC: WIResolverService,
    },
  },
  {
    path: 'offers/:searchTerm',
    component: OffresApiIdealoComponent,
    resolve: {
      offers: OfferResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorthItTagRoutingModule {}
