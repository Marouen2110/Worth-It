import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OfferAPI } from '../Models/offersApi';
import { WorthItService } from './worth-it-service.service';

@Injectable({
  providedIn: 'root',
})
export class OfferResolverService implements Resolve<OfferAPI[]> {
  constructor(private router: Router, private wiService: WorthItService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { searchTerm } = route.params;

    return this.wiService.getOffersApiBySearchTerm(searchTerm).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY;
      })
    );
  }
}
