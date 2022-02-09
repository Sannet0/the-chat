import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { IAuthData } from '../interfaces/auth-data-interface';
import { StorageService } from '../service/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    const authData: IAuthData = this.storageService.getAuthData();
    const authReq = request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${ authData.token }`)
    });

    return next.handle(authReq).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse  && this.storageService.getAuthData().token) {
          if(this.router.url === '/login' || this.router.url === '/registration') {
            this.router.navigate(['chat']).then();
          }
        }
      }),
      catchError((error) => {
        if (error.status === 400) {
          console.log("ERROR", String(error.error.message));
        }
        return next.handle(request);
      })
    );
  }
}
