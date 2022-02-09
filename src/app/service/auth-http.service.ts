import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  baseURL = environment.authApiUrl;

  constructor(private httpClient: HttpClient) { }

  get(url: string, params = {}): Observable<any> {
    return this.httpClient.get(this.baseURL + url, params);
  }

  post(url: string, params = {}): Observable<any> {
    return this.httpClient.post(this.baseURL + url, params);
  }
}
