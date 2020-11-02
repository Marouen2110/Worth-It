import { Component, OnInit } from '@angular/core';
import { AnnonceResponse } from '../annonces';
import { AnnoncesService } from '../annonces.service';
import { tap, map, switchMap, pluck } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-annonce-list',
  templateUrl: './my-annonce-list.component.html',
  styleUrls: ['./my-annonce-list.component.css'],
})
export class MyAnnonceListComponent implements OnInit {
  annonces: AnnonceResponse[] = [];

  constructor(
    private annoncesService: AnnoncesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.annoncesService
      .getAnnonces()
      .pipe(
        map((annonces) =>
          annonces.filter(
            (annonce) => annonce.userId === this.authService.user.id
          )
        )
      )
      .subscribe((annonces) => {
        this.annonces = annonces;
      });
  }
}
