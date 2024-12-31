import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table'; // Ya está importado en tu módulo
import { NzButtonModule } from 'ng-zorro-antd/button'; // Si usas botones de ng-zorro
import { NzDividerModule } from 'ng-zorro-antd/divider'; // Si usas dividers de ng-zorro
import { NzModalModule } from 'ng-zorro-antd/modal'; // modal nz-zorro
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';


interface Client {
  cedula: string;
  nombre: string;
  apellido: string;
  sexo: string;
  cargo: string;
  estado: string;
  key: string;
}

@Component({
  selector: 'app-table-user-manage',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, NzDividerModule, CommonModule, NzFormModule,
    ReactiveFormsModule, NzModalModule, FormsModule, NzOptionComponent,NzSelectModule], // Asegúrate de que estos módulos estén aquí
  templateUrl: './table-user-manage.component.html',
  styleUrls: ['./table-user-manage.component.css'],
})
export class TableUserManageComponent {
  // Lista de datos de clientes
  listOfData: Client[] = [
    { cedula: '1234567890', nombre: 'Juan', apellido: 'Pérez', sexo: 'Masculino', cargo: 'Gerente', estado: 'activo', key: '1' },
    { cedula: '0987654321', nombre: 'Ana', apellido: 'García', sexo: 'Femenino', cargo: 'Secretaria', estado: 'activo', key: '2' }
  ];

  // Lista de cargos disponibles
  cargos: string[] = ['Gerente', 'Secretaria', 'Vendedor'];
  selectedCargo: string = ''; // Variable para almacenar el cargo seleccionado en el modal

  // Formulario reactivo para los clientes
  clientForm: FormGroup;
  isEditing = false; // Bandera para saber si estamos editando o añadiendo un cliente
  isModalVisible = false; // Bandera para el modal de añadir cargo
  newCargo: string = ''; // Nuevo cargo a añadir
  clientToEdit: Client | null = null; // Cliente que estamos editando


  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef  // Inyectamos ChangeDetectorRef
  )  {
    // Inicialización del formulario con los controles y validaciones
    this.clientForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      cargo: ['', [Validators.required]]
    });
  }

  

  
  onSubmit(): void {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;
  
      if (this.isEditing && this.clientToEdit) { // Verifica que clientToEdit no sea null
        Object.assign(this.clientToEdit, formData);
        this.message.success('Cliente editado exitosamente');
      } else {
        this.listOfData.push({ ...formData, estado: 'activo', key: (this.listOfData.length + 1).toString() });
        this.message.success('Cliente añadido exitosamente');
      }
  
      this.clientForm.reset();
      this.isEditing = false;
    }
  }

  // Método para editar un cliente
  editClient(client: Client): void {
    this.clientToEdit = client;
    this.clientForm.patchValue(client); // Cargamos los valores del cliente en el formulario
    this.isEditing = true; // Establecemos que estamos editando
  }

  // Método para eliminar un cliente
  deleteClient(client: Client): void {
    this.listOfData = this.listOfData.filter((data) => data.key !== client.key);
    this.message.success('Cliente eliminado');
  }

  // Método para activar o desactivar el estado de un cliente
  toggleStatus(client: Client): void {
    client.estado = client.estado === 'activo' ? 'inactivo' : 'activo';
    this.message.success(`Cliente ${client.estado}`);
  }

  
  showModal(client: Client): void {
    if (this.cargos.length === 0) {
      console.log("Cargos no cargados");
      return; // Espera a que los cargos estén disponibles
    }
    
    this.isModalVisible = true;
    this.clientToEdit = client;
    this.selectedCargo = client.cargo || this.cargos[0];
    
    console.log('Lista de Cargos:', this.cargos);
    console.log('Cargo seleccionado:', this.selectedCargo);
    console.log('Modal Visible:', this.isModalVisible);
  }
  
  

  
  
  // Método para cancelar el modal de añadir cargo
  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.selectedCargo && this.clientToEdit) {
      this.clientToEdit.cargo = this.selectedCargo; // Actualizamos el cargo del cliente
      this.message.success('Cargo actualizado exitosamente');
      this.isModalVisible = false;
    } else {
      this.message.error('Por favor seleccione un cargo');
    }
  }
  

  onCargoChange(cargo: string): void {
    // Realiza cualquier acción cuando el cargo cambie
    console.log('Nuevo cargo seleccionado:', cargo);
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      cedula: ['', [Validators.required, this.idValidator]],
      nombre: ['', [Validators.required, this.nameValidator]],
      apellido: ['', [Validators.required, this.nameValidator]],
      sexo: ['', [Validators.required]]
    });
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

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,15}$/.test(value)) {
      return { invalidName: true };
    }
    return null;
  }
  
  
}
