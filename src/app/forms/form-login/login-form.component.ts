import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router para la redirección
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ChangePasswordModalComponent } from '../../modals/modal-pass-change/pass.change.component'; // Importa el modal
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NotificationService  } from '../../services/user.notification.service/user.notification'; // Importa el servicio de notificaciones


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ChangePasswordModalComponent,
    NzModalComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  userList: any[] = [];
  isChangePasswordModalVisible = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService 

  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any[]>('assets/user.json').subscribe({
      next: (users) => {
        this.userList = users;
      },
      error: () => {
        this.notificationService.error(
          'Error',
          'No se pudo cargar la lista de usuarios'
        );
      },
    });
  }

  passwordValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSymbol) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user = this.userList.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem('authToken', 'yourAuthToken');
        this.notificationService.success(
          'Login Exitoso',
          'Has iniciado sesión correctamente.'
        );
        this.router.navigate(['/carousel']);
      } else {
        this.notificationService.error(
          'Error de Login',
          'Usuario o contraseña inválidos.'
        );
      }
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.notificationService.warning(
        'Formulario Incompleto',
        'Por favor, completa todos los campos requeridos.'
      );
    }
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
    this.closeChangePasswordModal();
  }
}