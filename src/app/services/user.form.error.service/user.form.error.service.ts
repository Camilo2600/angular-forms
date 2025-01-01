import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root', // Servicio global
})
export class FormErrorService {
  logFormErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control && control.invalid) {
        console.error(`Error en el campo "${field}":`, control.errors);
      }
      if (control && control instanceof FormGroup) {
        this.logFormErrors(control); // Recursivo para controles anidados
      }
    });
  }
}
