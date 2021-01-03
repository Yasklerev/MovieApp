import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';

import { tap, map } from 'rxjs/operators';
import { Data, Movie } from '../models/allObjects';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private billboard = 1;
  public loading = false;

  constructor(private httpClient: HttpClient) {}

  get params(): Params {
    return {
      api_key: '92b0294f1ba213a2bd3bac55f8810b6b',
      language: 'es-ES',
      page: this.billboard.toString(),
    };
  }

  resetBillboardPage(): void {
    console.log('Se ejecuta ngOnDestroy desde el servicio');
    this.billboard = 1;
  }

  getMovie(): Observable<Movie[]> {
    if (this.loading) {
      return of([]);
      // Propiedad off de rxjs. Off nos permite transformar en un Observable
      // lo que sea que nosotros le colquemos dentro. En este caso, un arreglo de tipo Observable.
    }
    this.loading = true;
    return this.httpClient
      .get<Data>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((data) => data.results),
        tap(() => {
          this.billboard += 1;
          this.loading = false;
        })
      );
  }

  searchMovies(search: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: search };
    return this.httpClient
      .get<Data>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((data) => data.results));
  }
}
