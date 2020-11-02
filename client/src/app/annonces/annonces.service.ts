import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { url } from '../shared/rootUrl';
import { Annonce, AnnonceResponse } from './annonces';

@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  rootUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAnnonces() {
    return this.http.get<AnnonceResponse[]>(`${this.rootUrl}/api/annonces`);
  }

  getAnnonceById(id: string) {
    return this.http.get<AnnonceResponse[]>(
      `${this.rootUrl}/api/annonces/${id}`
    );
  }

  createAnnonce(annonce: Annonce) {
    return this.http.post(`${this.rootUrl}/api/annonces`, annonce);
  }

  updateAnnonce(annonceId: string, annonce: Annonce) {
    return this.http.put(`${this.rootUrl}/api/annonces/${annonceId}`, annonce);
  }
}
