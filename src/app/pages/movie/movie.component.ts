import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
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

    combineLatest([
      this.moviesService.getMovieDetails(id),
      this.moviesService.getCreditsDetails(id),
    ]).subscribe(
      ([movieData, castData]) => {
        if (!movieData) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movieData;

        if (!castData) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.cast = castData.filter((data) => data.profile_path);
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
