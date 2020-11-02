import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Annonce } from '../annonces';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css'],
})
export class AnnonceCreateComponent implements OnInit {
  showModal = false;
  annonce: Annonce;

  constructor(
    private annoncesService: AnnoncesService,
    private router: Router
  ) {
    this.annonce = {
      title: '',
      description: '',
      image: '',
      phone: '',
      adress: '',
      price: 0,
      shippingFee: 0,
      voteCount: 0,
    };
  }

  ngOnInit(): void {}

  onSubmit(annonce: Annonce) {
    this.annoncesService.createAnnonce(annonce).subscribe(() => {
      this.showModal = false;
      console.log(this.annonce);
      this.router.navigateByUrl('/myAdverts');
    });
  }
}
