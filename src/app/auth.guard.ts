import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Simulación de autenticación
    if (!isAuthenticated) {
      this.router.navigate(['/form-login']); // Redirigir al login si no está autenticado
      return false;
    }
    return true;
  }
}
