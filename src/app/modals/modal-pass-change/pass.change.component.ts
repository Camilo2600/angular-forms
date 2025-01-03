import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/user.notification.service/user.notification';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, NzButtonModule, ReactiveFormsModule, NzModalModule],
  templateUrl: './pass.change.component.html',
  styleUrls: ['./pass.change.component.css']
})
export class ChangePasswordModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<{ oldPassword: string; newPassword: string }>();

  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
    ) 

    {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
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

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const { newPassword, confirmPassword } = formGroup.controls;
    if (newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  handleClose(): void {
    this.close.emit();
  }

  handleSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword } = this.changePasswordForm.value;
      this.changePassword.emit({ oldPassword, newPassword }); // Emitir los datos
      
      this.notificationService.success(
        'Cambio de contraseña exitoso',
        'La contraseña se ha actualizado correctamente.'
      );

      this.handleClose(); // Cerrar el modal
    } else {
      Object.values(this.changePasswordForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });

      this.notificationService.error(
        'Error al Cambiar la Contraseña',
        'Por favor, verifica los campos y asegúrate de que las contraseñas coincidan.'
      );
      
    }
  }
  
  
}
