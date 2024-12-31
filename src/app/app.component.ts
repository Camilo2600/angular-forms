import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';
import { ChangePasswordModalComponent } from './modals/modal-pass-change/pass.change.component';
import  { NzModalComponent } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, 
    RouterOutlet, NzModalComponent,
    NzIconModule, NzLayoutModule, 
    NzMenuModule, ChangePasswordModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isChangePasswordModalVisible = false;

  constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/form-login';
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    this.router.navigate(['/form-login']); // Redirige al login
  }
  openChangePasswordModal(): void {
    this.isChangePasswordModalVisible = true;
  }

  closeChangePasswordModal(): void {
    this.isChangePasswordModalVisible = false;
  }
  onPasswordChange(data: { oldPassword: string; newPassword: string }): void {
    console.log('Old Password:', data.oldPassword);
    console.log('New Password:', data.newPassword);
    // Implementa aquí la lógica para actualizar la contraseña.
    this.closeChangePasswordModal();
  }
}
