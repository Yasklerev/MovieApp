import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/allObjects';
import Swiper from 'swiper';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];
  public mySwiper: Swiper;

  constructor() {}

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {}

  prev(): void {
    this.mySwiper.slidePrev();
  }

  next(): void {
    this.mySwiper.slideNext();
  }
}
