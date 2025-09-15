import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { LoginData, RegisterData } from './auth.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loginUrl = environment.apiBaseUrl + environment.loginApiUrl;
  registerUrl = environment.apiBaseUrl + environment.registerApiUrl;
  isLoggedInUrl = environment.apiBaseUrl + environment.isLoggedInUrl;
  public redirectUrl = "";


  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
  }


  login(loginData: LoginData): void {
    this.http.post(this.loginUrl, loginData, {observe: "response"}).subscribe(resp => {
      if (resp.status === 200) {
        // redirect on successful login
        if (this.redirectUrl == "") {
          this.router.navigate(["task-list"]);
        }
        this.router.navigate([this.redirectUrl]);
      }
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return firstValueFrom(this.http.get<boolean>(this.isLoggedInUrl));
  }

  register(registerData: RegisterData): void {
    this.http.post(this.registerUrl, registerData, {observe: "response"}).subscribe(resp => {
      if (resp.status === 200) {
        // redirect on successful register
        this.router.navigate(["task-list"]);
      }
    });
  }
}

