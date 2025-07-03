import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token'; // Key for localStorage
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());

  readonly token = this.tokenSignal.asReadonly();

  constructor() {
    // Optional: Sync tokenSignal with localStorage on initialization
    this.tokenSignal.set(this.getTokenFromStorage());
  }

  setToken(token: string): void {
    this.tokenSignal.set(token);
    localStorage.setItem(this.TOKEN_KEY, token); // Save to localStorage
  }

  clearToken(): void {
    this.tokenSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY); // Remove from localStorage
  }

  get isAuthenticated(): boolean {
    return this.tokenSignal() !== null;
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
