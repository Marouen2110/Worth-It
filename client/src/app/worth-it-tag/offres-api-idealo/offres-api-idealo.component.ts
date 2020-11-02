import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferAPI } from 'src/app/Models/offersApi';
import { WorthItService } from '../worth-it-service.service';

@Component({
  selector: 'app-offres-api-idealo',
  templateUrl: './offres-api-idealo.component.html',
  styleUrls: ['./offres-api-idealo.component.css'],
})
export class OffresApiIdealoComponent implements OnInit {
  offers: OfferAPI[] = [];
  loading = false;

  constructor(
    private wiService: WorthItService,
    private route: ActivatedRoute
  ) {
    this.offers = route.snapshot.data.offers;
    this.route.data.subscribe(({ offers }) => {
      this.offers = offers;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    // this.loading = true;
  }
}
