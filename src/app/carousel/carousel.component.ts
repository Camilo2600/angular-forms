import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ModalComponent } from '../modals/modal/modal.component';
import { UserService } from '../user.service/user.service.component';

@Component({
  selector: 'app-pokemon-carousel',
  standalone: true,
  imports: [CommonModule, NzCarouselModule, ModalComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  pokemons: { name: string; id: number; image: string }[] = [];
  selectedPokemon: { name: string; id: number; details?: any } | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.userService.fetchPokemons(20, 0).subscribe((response) => {
      this.pokemons = response.results.map((pokemon: any, index: number) => ({
        name: pokemon.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      }));
    });
  }

  openModal(pokemon: { name: string; id: number }) {
    this.userService.fetchPokemonDetails(pokemon.name).subscribe((details) => {
      this.selectedPokemon = { ...pokemon, details };
    });
  }

  closeModal() {
    this.selectedPokemon = null; // Ocultar el modal
  }
}
