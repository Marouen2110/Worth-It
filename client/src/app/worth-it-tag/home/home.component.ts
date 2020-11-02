import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceLBC } from 'src/app/Models/annonceLB';
import { WorthItService } from '../worth-it-service.service';

@Component({
  selector: 'app-home-wi',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // urlLBCForm: FormGroup;
  annonceLBC: AnnonceLBC;
  urlLBC = '';
  constructor(private wiService: WorthItService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.urlLBC);
    this.wiService.getAnnonceLB(this.urlLBC).subscribe({
      next: (annonceLBC) => {
        // console.log(annonceLBC);
        this.annonceLBC = annonceLBC;
        console.log(this.annonceLBC);
        setTimeout(() => {
          this.navigateToAnnonceLBC(this.annonceLBC.id);
        }, 1500);
      },
    });
  }

  navigateToAnnonceLBC(id: number) {
    this.router.navigateByUrl(`/annoncelbc/${id}`);
  }
}
