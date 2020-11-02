import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnnonceResponse } from './annonces';
import { AnnoncesService } from './annonces.service';

@Injectable({
  providedIn: 'root',
})
export class AnnonceResolverService implements Resolve<AnnonceResponse[]> {
  constructor(
    private annoncesService: AnnoncesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.annoncesService.getAnnonceById(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/annonce/not-found');

        return EMPTY;
      })
    );
  }
}
