import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from '../service/token-storage.service';
import {Observable} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authReq = request;
    const token = this.token.getToken();
    if (token != null && !request.url.includes('google')) {
      authReq = request.clone(
        {
          headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
        }
        );
    }
    return next.handle(authReq);
  }
}
