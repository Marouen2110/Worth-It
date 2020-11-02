import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnonceShowComponent } from './annonce-show/annonce-show.component';
import { AnnonceHomeComponent } from './home/home.component';
import { AnnonceResolverService } from './annonce-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AnnonceHomeComponent,
  },
  {
    path: 'annonce/:id',
    component: AnnonceShowComponent,
    resolve: {
      annonce: AnnonceResolverService,
    },
    children: [
      // {
      //   path: 'not-found',
      //   component: NotFoundComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnoncesRoutingModule {}
