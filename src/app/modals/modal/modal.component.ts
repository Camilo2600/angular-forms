import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzModalModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges {
  @Input() pokemonName: string = '';
  @Input() evolutionId: number | null = null;
  @Input() details: any;
  @Output() close = new EventEmitter<void>();

  pokemonTypes: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['details'] && this.details?.types) {
      // Procesar los tipos del Pokémon
      this.pokemonTypes = this.details.types.map((t: any) => t.type.name).join(', ');
    } else {
      this.pokemonTypes = ''; // Reiniciar si no hay detalles
    }
  }

  handleClose(): void {
    this.close.emit();
  }
}
