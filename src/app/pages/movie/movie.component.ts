import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/models/creditsMovie';
import { MovieDetails } from 'src/app/models/movieResponse';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  public movie: MovieDetails;
  public cast: Cast[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.moviesService.getMovieDetails(id).subscribe((data) => {
      if (!data) {
        console.log('El objeto no existe!');
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = data;
    });
    this.moviesService.getCreditsDetails(id).subscribe((data) => {
      if (!data) {
        console.log('El objeto no existe!');
        this.router.navigateByUrl('/home');
        return;
      }
      this.cast = data;
      console.log(data);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
