import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import IGenre from '../../models/genre.model';
import IPhoto from '../../models/photo.model';
import { IPhotoUpload } from '../photos/photo-upload.model';
import * as authActions from './auth/actions';
import * as genresActions from './genres/actions';
import {
  isLoaded,
  selectAuthError,
  selectGenres,
  selectGenresError,
  selectPhotos,
  selectPhotosError,
  selectPhotoUploadCompleted,
  selectPhotoUploadFail,
  selectPhotoUploadInProgress,
  selectPhotoUploadProgress,
  selectPhotoUploadReady,
  selectPhotoUploadRequested,
  selectPhotoUploadStarted,
  State
} from './index';
import * as photosActions from './photos/actions';

@Injectable()
export class AdminStateFacade {
  constructor(private store$: Store<State>) {
  }

  isLoaded$: Observable<boolean> = this.store$.select(isLoaded);

  // GENRE
  getGenres$: Observable<IGenre[]> = this.store$.select(selectGenres);

  loadGenres(): void {
    this.store$.dispatch(genresActions.loadAllGenres());
  }

  createGenre$(params: string) {
    return this.store$.dispatch(genresActions.createGenre({ params }));
  }

  updateGenre$(params: IGenre) {
    return this.store$.dispatch(genresActions.updateGenre({ params }));
  }

  deleteGenre$(id: string) {
    return this.store$.dispatch(genresActions.deleteGenre({ id }));
  }

  getGenresError$ = this.store$.select(selectGenresError);

  // PHOTO
  getPhotos$: Observable<IPhoto[]> = this.store$.select(selectPhotos);
  getPhotosError$ = this.store$.select(selectPhotosError);

  getPhotoUploadReady$ = this.store$.select(selectPhotoUploadReady);
  getPhotoUploadRequested$ = this.store$.select(selectPhotoUploadRequested);
  getPhotoUploadStarted$ = this.store$.select(selectPhotoUploadStarted);
  getPhotoUploadProgress$ = this.store$.select(selectPhotoUploadProgress);
  getPhotoUploadInProgress$ = this.store$.select(selectPhotoUploadInProgress);
  getPhotoUploadCompleted$ = this.store$.select(selectPhotoUploadCompleted);
  getPhotoUploadError$ = this.store$.select(selectPhotoUploadFail);

  loadPhotosByGenre(id: string): void {
    this.store$.dispatch(photosActions.loadPhotosByGenre({ id: id }));
  }

  uploadPhoto$(params: IPhotoUpload) {
    return this.store$.dispatch(photosActions.uploadRequest({ params }));
  }

  resetPhotoUpload(): void {
    this.store$.dispatch(photosActions.uploadReset());
  }

  cancelPhotoUpload(): void {
    this.store$.dispatch(photosActions.uploadCancel());
  }

  updatePhoto$(params: Partial<IPhoto>) {
    return this.store$.dispatch(photosActions.updatePhoto({ params }))
  }

  deletePhoto$(id: string) {
    return this.store$.dispatch(photosActions.deletePhoto({ id }));
  }

  // AUTH
  login$(email: string, password: string) {
    return this.store$.dispatch(authActions.login({ email, password }));
  }

  logout$() {
    return this.store$.dispatch(authActions.logout())
  }

  getAuthError$ = this.store$.select(selectAuthError);

}
