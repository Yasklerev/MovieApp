import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/allObjects';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position =
      document.documentElement.scrollTop + 700 || document.body.scrollTop + 700;
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
}
