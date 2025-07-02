import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenSignal = signal<string | null>(null);

  readonly token = this.tokenSignal.asReadonly();

  setToken(token: string): void {
    this.tokenSignal.set(token);
  }

  clearToken(): void {
    this.tokenSignal.set(null);
  }

  get isAuthenticated(): boolean {
    return this.tokenSignal() !== null;
  }
}
