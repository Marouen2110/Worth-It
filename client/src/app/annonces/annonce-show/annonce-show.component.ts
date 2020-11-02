import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/orders/orders.service';
import { AnnonceResponse } from '../annonces';
import { AnnoncesService } from '../annonces.service';

@Component({
  selector: 'app-annonce-show',
  templateUrl: './annonce-show.component.html',
  styleUrls: ['./annonce-show.component.css'],
})
export class AnnonceShowComponent implements OnInit {
  annonce: AnnonceResponse;

  constructor(
    private route: ActivatedRoute,
    private annoncesService: AnnoncesService,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.annonce = route.snapshot.data.annonce;
    this.route.data.subscribe(({ annonce }) => {
      this.annonce = annonce;
    });
  }

  ngOnInit(): void {}

  onSubmit(annonceId: string) {
    console.log(annonceId);
    this.orderService.createOrder(annonceId).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/orders');
      },
    });
  }
}
