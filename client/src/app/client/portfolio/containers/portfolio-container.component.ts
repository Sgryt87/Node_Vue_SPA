import { Component, NgZone, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum } from 'ngx-lightbox';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import IGenre from '../../../models/genre.model';
import IPhoto from '../../../models/photo.model';
import { ClientStateFacade } from '../../state/state.facade';

@Component({
  selector: 'client-portfolio-container',
  templateUrl: './portfolio-container.component.html',
})
export class PortfolioContainerComponent implements OnInit, OnDestroy {
  public genres$: Observable<IGenre[]>;
  public isLoading$: Observable<boolean>;
  public albums: Array<IAlbum> = [];
  public isActive = true;

  constructor(private clientFacade: ClientStateFacade,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

// TODO separate actions to load photos init & load by selection
  ngOnInit() {
    this.isLoading$ = this.clientFacade.isSpinnerActive$;
    const genreId = this.activatedRoute.snapshot.queryParamMap.get('genre');
    this.clientFacade.loadGenres();
    this.genres$ = this.clientFacade.getGenres$;
    combineLatest([this.genres$])
      .pipe(takeWhile(_ => this.isActive),
        tap(([genres]) => this.onGenreSelected(genreId)))
      .subscribe();
    this.getPhotos();
  }

  private getPhotos(): void {
    this.clientFacade.getPhotos$.pipe(
      takeWhile(_ => this.isActive),
      map((p): IPhoto[] => p),
      tap(res => console.log('PHOTOS', res)),
    ).subscribe((photos: IPhoto[]) => {
      this.albums = [];
      photos.map((p: IPhoto): void => {
        this.albums.push({
          src: `${environment.baseUrl}/${p.file}`,
          caption: p.name,
          thumb: `${environment.baseUrl}/${p.file}`
        });
      });
    });
  }

  public onGenreSelected(id: string): void {
    this.updateQueryParams(id);
    this.clientFacade.loadPhotosByGenre(id);
  }

  private updateQueryParams(id: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams:
        {
          genre: id
        },
      replaceUrl: true,
    });
  }

  ngOnDestroy(): void {
    this.isActive = false;
  }
}
