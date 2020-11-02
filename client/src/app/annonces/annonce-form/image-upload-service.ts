import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<any> {
    const rootUrl = environment.API_URL;

    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(`${rootUrl}/api/annonces/imageupload`, formData);
  }
}
