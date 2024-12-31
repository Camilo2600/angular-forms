import { Component, OnDestroy, OnInit, inject, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-form-cedula',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './form-cedula.component.html',
  styleUrls: ['./form-cedula.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class FormCedulaComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      lastName: ['', [Validators.required, this.uppercaseValidator]],
      firstName: ['', [Validators.required, this.uppercaseValidator]],
      id: ['', [Validators.required, this.idValidator]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
      gender: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = {
        ...this.validateForm.value,
        phoneNumber: this.applyPhoneMask(this.validateForm.value.phoneNumber)
      };
      console.log('Submitted Data:', formData);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
  
    // Validar si el valor está en mayúsculas
    const isUppercase = value === value?.toUpperCase();
  
    // Validar si el valor contiene solo letras
    const isAlpha = /^[A-Z]+$/.test(value);
  
    if (!isUppercase) {
      return { notUppercase: true };
    }
  
    if (!isAlpha) {
      return { notAlpha: true };
    }
  
    return null;
  }

  idValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/^\d{10}$|^\d{13}$/.test(value)) {
      return { invalidId: true };
    }
    if (value.length === 13 && !value.endsWith('001')) {
      return { invalidRuc: true };
    }
    return null;
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (!/^\d{9}$/.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  applyPhoneMask(phoneNumber: string): string {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
}