import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://simple-products-register.onrender.com/login';
  private tokenKey = 'jwtToken';
  private roleKey = 'userRole';

  constructor(private http: HttpClient, private router: Router) { }

  setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getUserRole(): string {
    return localStorage.getItem(this.roleKey) || 'user';
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'text/plain',
      'Accept': 'text/plain'
    });
    return this.http.post<any>(this.loginUrl, {}, { headers, responseType: 'text' as any }).pipe(
      tap(token => {
        if (this.isValidToken(token)) 
          localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.roleKey, username)
      }),
      map(token => {
        return token;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/');
  }

  private isValidToken(token: string): boolean {
    if (!token)
      return false

    try {
      const decodedToken: any = jwt_decode.jwtDecode(token);

      let json = JSON.stringify(decodedToken)
      
      if (!decodedToken || !decodedToken.iss || !decodedToken.sub || !decodedToken.scope)
          return false;

      return true;
    } catch (error) {
      console.error('Error decoding token:', error)
      return false;
    }
  }

}