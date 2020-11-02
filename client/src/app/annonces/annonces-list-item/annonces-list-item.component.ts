import { Component, Input, OnInit } from '@angular/core';
import { AnnonceResponse } from '../annonces';

@Component({
  selector: 'app-annonces-list-item',
  templateUrl: './annonces-list-item.component.html',
  styleUrls: ['./annonces-list-item.component.scss'],
})
export class AnnoncesListItemComponent implements OnInit {
  @Input() annonce: AnnonceResponse;

  constructor() {}

  ngOnInit(): void {}
}
