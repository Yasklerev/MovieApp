import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/allObjects';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const position =
      document.documentElement.scrollTop + 1100 || document.body.scrollTop + 1100;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    if (position > max) {
      if (this.moviesService.loading) {
        return;
      }
      this.moviesService.getMovie().subscribe(
        (data) => {
          this.movies.push(...data);
        },
        (err) => {
          console.warn('Hubo un error!');
          console.warn(err);
        }
      );
    }
  }

  constructor(private moviesService: MoviesService) {
    this.getMovies();
  }

  ngOnInit(): void {}

  getMovies(): void {
    this.moviesService.getMovie().subscribe(
      (data) => {
        this.movies = data;
        this.moviesSlideshow = data;
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.moviesService.resetBillboardPage();
  }
}
