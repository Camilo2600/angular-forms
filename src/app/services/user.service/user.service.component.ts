import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Se inyecta globalmente
})
export class UserService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  fetchData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${endpoint}`);
  }
  
  fetchPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`);
  }
  
  fetchPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon/${name}`);
  }
  
}
