import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnoncesRoutingModule } from './annonces-routing.module';
import { AnnoncesListComponent } from './annonces-list/annonces-list.component';
import { AnnoncesListItemComponent } from './annonces-list-item/annonces-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { AnnonceShowComponent } from './annonce-show/annonce-show.component';
import { AnnonceHomeComponent } from './home/home.component';
import { AnnonceCreateComponent } from './annonce-create/annonce-create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAnnonceHomeComponent } from './my-annonce-home/my-annonce-home.component';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { MyAnnonceListComponent } from './my-annonce-list/my-annonce-list.component';
import { AnnonceUpdateComponent } from './annonce-update/annonce-update.component';

@NgModule({
  declarations: [
    AnnoncesListComponent,
    AnnoncesListItemComponent,
    AnnonceShowComponent,
    AnnonceHomeComponent,
    AnnonceCreateComponent,
    NotFoundComponent,
    MyAnnonceHomeComponent,
    AnnonceFormComponent,
    MyAnnonceListComponent,
    AnnonceUpdateComponent,
  ],
  imports: [
    CommonModule,
    AnnoncesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AnnonceHomeComponent, AnnonceCreateComponent],
})
export class AnnoncesModule {}
