import { Component, Input, OnInit } from '@angular/core';
import { Annonce, AnnonceResponse } from '../annonces';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-annonce-update',
  templateUrl: './annonce-update.component.html',
  styleUrls: ['./annonce-update.component.css'],
})
export class AnnonceUpdateComponent implements OnInit {
  @Input() annonce: AnnonceResponse;

  showModal = false;

  constructor(private annoncesService: AnnoncesService) {}

  ngOnInit(): void {
    this.annonce = {
      ...this.annonce,
      title: this.annonce.title,
      description: this.annonce.description,
      image: this.annonce.image,
      phone: this.annonce.phone,
      adress: this.annonce.adress,
      price: this.annonce.price,
      shippingFee: this.annonce.shippingFee,
      voteCount: this.annonce.voteCount,
    };
  }

  onSubmit(ann: Annonce) {
    ann.voteCount = this.annonce.voteCount;
    this.annoncesService.updateAnnonce(this.annonce.id, ann).subscribe(() => {
      this.showModal = false;
      console.log(this.annonce);
    });
  }
}
