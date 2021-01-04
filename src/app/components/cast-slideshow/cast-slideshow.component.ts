import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/creditsMovie';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.scss'],
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {
  @Input() cast: Cast[];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      freeMode: true,
      spaceBetween: 15,
    });
  }
}
