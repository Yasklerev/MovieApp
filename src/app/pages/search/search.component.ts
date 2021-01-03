import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/allObjects';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public movies: Movie[] = [];
  public search = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getearch();
  }

  getearch(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.search = data.id;
      this.moviesService
        .searchMovies(data.id)
        .subscribe((dataMovies: Movie[]) => {
          this.movies = dataMovies;
        });
    });
  }
}
