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

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ChangePasswordModalComponent
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
    private router: Router
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
        console.error('Error loading user.json');
      }
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
        // Simulación de autenticación: guarda un token en localStorage
        localStorage.setItem('authToken', 'yourAuthToken');
        alert('Login successful!');
        this.router.navigate(['/carousel']); // Redirige al menú principal
      } else {
        alert('Invalid username or password.');
      }
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  openChangePasswordModal(): void {
    this.isChangePasswordModalVisible = true;
  }

  closeChangePasswordModal(): void {
    this.isChangePasswordModalVisible = false;
  }

  onPasswordChange({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }): void {
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    // Aquí puedes agregar la lógica para actualizar la contraseña.
    this.closeChangePasswordModal();
  }
}
