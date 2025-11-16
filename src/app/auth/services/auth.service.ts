import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  doLogin(email: string, password: string): Observable<any> {
    // Implement actual login logic here, e.g., call to backend API
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  logout(): void {
    // Implement actual logout logic here, e.g., clear tokens, session, etc.
  }

  aadLogin(): Observable<any> {
    // Implement actual Azure AD login logic here, e.g., redirect to Azure AD login page
    return this.http.get(`${environment.apiUrl}/auth/aad-login`);
  }

  authorize(email: any): Observable<any> {
    // Implement actual authorization logic here, e.g., call to backend API to get user roles/permissions
    return this.http.post(`${environment.apiUrl}/auth/authorize`, { email });
  }
}
