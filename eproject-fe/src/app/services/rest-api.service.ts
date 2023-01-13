import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  get(link: string) {
    return this.http.get(link).toPromise();
  }

  getOne(link: string, id: string) {
    return this.http.get(link + '/' + id).toPromise();
  }
  post(link: string, body: any) {
    return this.http.post(link, body).toPromise();
  }
  put(link: string, id: string, body: any) {
    return this.http.put(link + '/' + id, body).toPromise();
  }
  delete(link: string, id: string) {
    return this.http.delete(link + '/' + id).toPromise();
  }
}
