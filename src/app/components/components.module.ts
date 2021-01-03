import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from '../angular.material.module';
import { RouterModule } from '@angular/router';
import { SwiperComponent } from './swiper/swiper.component';

import { SwiperModule } from 'swiper/angular';
import { MoviesPosterGridComponent } from './movies-poster-grid/movies-poster-grid.component';

import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [HeaderComponent, SwiperComponent, MoviesPosterGridComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    SwiperModule,
    RatingModule,
    PipesModule,
  ],
  exports: [HeaderComponent, SwiperComponent, MoviesPosterGridComponent],
})
export class ComponentsModule {}
