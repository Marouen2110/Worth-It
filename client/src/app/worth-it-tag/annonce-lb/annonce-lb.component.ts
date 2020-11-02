import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceLBC } from 'src/app/Models/annonceLB';

import { WorthItService } from '../worth-it-service.service';

@Component({
  selector: 'app-annonce-lb',
  templateUrl: './annonce-lb.component.html',
  styleUrls: ['./annonce-lb.component.css'],
})
export class AnnonceLBComponent implements OnInit {
  annonceLBC: AnnonceLBC;
  loading = false;
  @Input() urlLBC;
  searchTerm: string;
  jobid = '';

  constructor(
    private wiService: WorthItService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.annonceLBC = route.snapshot.data.annonceLBC;
    this.route.data.subscribe(({ annonceLBC }) => {
      this.annonceLBC = annonceLBC;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.loading = true;
  }

  onSubmit() {
    console.log(this.searchTerm);
    // this.router.navigateByUrl(`/offers/${this.searchTerm}`);
    this.wiService.createJob(this.searchTerm).subscribe((res) => {
      this.jobid = res.jobId;
      console.log(res);
      this.wiService.getOffersByJobId(this.jobid).subscribe({
        next: () => {
          this.router.navigateByUrl(`/offers/${this.searchTerm}`);
        },
      });
    });
  }
}
