import { Injectable } from '@angular/core';
import { IAuthData } from '../interfaces/auth-data-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getAuthData (): IAuthData {
    const authStringData: string = localStorage.getItem('authData') || '';
    let parseAuthData: IAuthData = {
      token: ''
    };
    if (authStringData) {
      parseAuthData = JSON.parse(authStringData);
    }
    return parseAuthData;
  }

  setAuthData (token: string): void {
    const stringifyData: string = JSON.stringify({
      token
    });
    localStorage.setItem('authData', stringifyData);
  }
}
