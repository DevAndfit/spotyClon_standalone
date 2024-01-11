import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';


@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    FavoritesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class FavoritesModule { }
