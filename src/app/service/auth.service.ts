import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private storageService: StorageService) { }

  login(login: string, password: string): Observable<{ jwt: string; }> {
    return this.apiService.login(login, password);
  }

  registration(login: string, password: string, repPassword: string): void {
    this.apiService.registration(login, password, repPassword).subscribe(token => {
      this.storageService.setAuthData(token.jwt);
    });
  }

}
