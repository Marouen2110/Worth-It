import { Component, Input, OnInit } from '@angular/core';
import { OfferAPI } from 'src/app/Models/offersApi';

@Component({
  selector: 'app-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.scss'],
})
export class OfferListItemComponent implements OnInit {
  @Input() offer: OfferAPI;

  constructor() {}

  ngOnInit(): void {}
}
