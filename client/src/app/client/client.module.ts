import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LightboxModule } from 'ngx-lightbox';
import { ClientRoutingModule } from './client-routing.module';
import { AboutComponent } from './about/components/about.component';
import { ContactComponent } from './contact/components/contact.component';
import { HomeComponent } from './home/components/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './portfolio/components/gallery.component';
import { PortfolioComponent } from './portfolio/components/portfolio.component';
import { PortfolioContainerComponent } from './portfolio/containers/portfolio-container.component';
import { GenreService } from './services/genre.service';
import { PhotoService } from './services/photo.service';
import { PageNotFoundComponent } from './shared/PageNotFound.component';
import { FEATURE_NAME, reducers } from './state';
import { GenresEffects } from './state/genres/effects';
import { PhotosEffects } from './state/photos/effects';
import { ClientStateFacade } from './state/state.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([GenresEffects, PhotosEffects]),
    ClientRoutingModule,
    CommonModule,
    LightboxModule
  ],
  declarations: [
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    PortfolioContainerComponent,
    GalleryComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  providers: [
    GenreService,
    PhotoService,
    ClientStateFacade
  ]
})
export class ClientModule {
}



