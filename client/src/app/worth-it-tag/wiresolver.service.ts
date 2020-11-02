import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnnonceLBC } from '../Models/annonceLB';
import { WorthItService } from './worth-it-service.service';

@Injectable({
  providedIn: 'root',
})
export class WIResolverService implements Resolve<AnnonceLBC> {
  constructor(private router: Router, private wiService: WorthItService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.wiService.getAnnonceLBCById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY;
      })
    );
  }
}
