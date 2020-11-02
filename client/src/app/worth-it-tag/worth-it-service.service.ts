import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../shared/rootUrl';

import { AnnonceLBC } from '../Models/annonceLB';
import { OfferAPI } from '../Models/offersApi';
import { environment } from 'src/environments/environment';

interface CreateJobResponse {
  jobId: string;
}

@Injectable({
  providedIn: 'root',
})
export class WorthItService {
  rootUrl = environment.API_URL;
  values = '';

  constructor(private http: HttpClient) {}

  getAnnonceLB(url: string) {
    return this.http.post<AnnonceLBC>(
      `${this.rootUrl}/api/wi/annonceleboncoin`,
      { annonceUrl: url }
    );
  }

  getAnnonceLBCById(id: string) {
    return this.http.get<AnnonceLBC>(`${this.rootUrl}/api/wi/annonceslb/${id}`);
  }

  getOffersApiBySearchTerm(searchTerm: string) {
    return this.http.get<OfferAPI[]>(
      `${this.rootUrl}/api/wi/tag/${searchTerm}`
    );
  }

  createJob(searchTerm: string) {
    return this.http.post<CreateJobResponse>(`${this.rootUrl}/api/wi/offers`, {
      values: searchTerm,
    });
  }

  getOffersByJobId(jobid: string) {
    return this.http.get(`${this.rootUrl}/api/wi/offers/${jobid}`);
  }
}
