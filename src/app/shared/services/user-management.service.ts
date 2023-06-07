import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  #url: string = environment.apiHostUrl;

  constructor(private _http: HttpClient, private router: Router) { }


  public login(login: {userName: string, password: string}): Observable<any> {
    return this._http.post<{isSuccess: boolean, accessToken: string}>(this.#url +'/Auth/Login', login).pipe(
      tap((_) => {
        if(_.isSuccess) {
            localStorage.setItem('token', _.accessToken)
        }
      })
    )
  }

  public currentRoute(): string {
    console.log(this.router.url)
    return this.router.url;
  }

  public register(login: {userName: string, password: string}): Observable<any> {
    return this._http.post<{id: string, username: string}>(this.#url +'/Auth/Register', login).pipe(
      tap((_) => {
        console.log('migebuli response');
        console.log(_);
        this.router.navigate(['login']);
        if(_.id != null && _.username != null) {
          alert('sssssssssss')
          this.router.navigate(['main-page']);
        }
      })
    )
  }

  public get isLoggedIn():boolean {
    const token = localStorage.getItem('token');
    if(!token || token.length == 0) {
      return false
    }
    const decodedToken =(jwt_decode.default(token) as {Role: string})
    return decodedToken.Role != undefined && decodedToken != null;
  }
}
