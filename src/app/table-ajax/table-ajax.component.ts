import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-pokeapi',
  standalone: true,
  imports: [NzTableModule, CommonModule],
  templateUrl: './table-ajax.component.html',
  styleUrls: ['./table-ajax.component.css'],
})
export class TablePokeApiComponent implements OnInit {
  pokemonList: any[] = [];
  total = 0; // Total de Pokémon en la API
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    const offset = (pageIndex - 1) * pageSize;

    this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
      .subscribe({
        next: (response: any) => {
          this.total = response.count; // Total Pokémon
          this.fetchPokemonDetails(response.results);
        },
        error: () => (this.loading = false),
      });
  }

  fetchPokemonDetails(pokemonList: any[]): void {
    const requests = pokemonList.map((pokemon) => this.http.get(pokemon.url).toPromise());
  
    Promise.all(requests)
      .then((responses: any[]) => {
        this.pokemonList = responses.map((pokemon) => ({
          name: pokemon?.name || 'N/A',
          stats: pokemon?.stats?.map((stat: any) => ({
            name: stat.stat.name || 'N/A',
            value: stat.base_stat || 0,
          })) || [],
          abilities: pokemon?.abilities?.map((ability: any) => ability.ability.name) || [],
          moves: pokemon?.moves?.slice(0, 5).map((move: any) => move.move.name) || [],
        }));
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching Pokémon details:', error);
        this.loading = false;
      });
  }
  
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }
}
