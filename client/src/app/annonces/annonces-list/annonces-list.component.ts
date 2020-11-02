import { Component, OnInit } from '@angular/core';

import { AnnonceResponse } from '../annonces';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-annonces-list',
  templateUrl: './annonces-list.component.html',
  styleUrls: ['./annonces-list.component.scss'],
})
export class AnnoncesListComponent implements OnInit {
  annonces: AnnonceResponse[] = [];
  loading = false;

  constructor(private annoncesService: AnnoncesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.annoncesService.getAnnonces().subscribe((annonces) => {
      this.loading = false;
      this.annonces = annonces;
    });
  }
}
