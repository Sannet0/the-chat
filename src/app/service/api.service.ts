import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService, private authHttpService: AuthHttpService) { }

  login(login: string, password: string): Observable<{ jwt: string }> {
    return this.authHttpService.post('user/login', { login, password });
  }

  registration(login: string, password: string, repPassword: string): Observable<{ jwt: string }> {
    return this.authHttpService.post('user/registration', { login, password, repPassword });
  }

  getUserInfo() {
    return this.authHttpService.get('user');
  }

  getMessages(chat_name: string) {
    return this.httpService.get(`message/${ chat_name }`);
  }

  getAllChats() {
    return this.httpService.get('chat');
  }

}
