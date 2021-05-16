import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { catchError, tap } from 'rxjs/operators';
import { Mock } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://localhost:3000/movies'

  constructor(private http: HttpClient) {}

  /*
  //zwykle zwrocenie JSONA, tylko samo body requestu

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url + '/movies').pipe(tap(console.log));
  }
  */


  // otrzymanie pelnej odpowiedzi z naglowkami statusem itp. w postaci obiektu HttpResponse
  getMovies(): Observable<HttpResponse<Movie[]>>{
    return this.http.get<HttpResponse<Movie[]>>(this.url, {observe: 'response'})
      .pipe(tap(console.log));
  }

  postMovie(movie: Movie): Observable<Movie>{
    return this.http.post(this.url, movie)
      .pipe(tap(console.log));
  }

  putMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log));
  }

  patchMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.patch<Movie>(this.url + '/' + movie.id, movie)
      .pipe(tap(console.log));
  }

  deleteMovie(id: string): Observable<{}>{
    return this.http.delete<{}>(this.url + '/'+id)
      .pipe(tap(console.log));
  }

  makeError(): Observable<HttpErrorResponse>{
    return this.http.delete(this.url +'/'+ 999)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    console.error(
      `Name: ${error.name} \n`+
      `Message: ${error.message} \n` +
      `Returned code: ${error.status}`
    );

    return throwError("Something went wrong!");

  }



  headers(): Observable<HttpResponse<Movie[]>> {

    // wyslanie wlasnych naglowkow ale trzeba je dolaczyc !
    const myHeaders = new HttpHeaders({
      Authorizations: 'my_token',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'wlasny naglowek',
    });

    // odebranie naglowkow z serwera
    return this.http
      .get<Movie[]>(this.url, {observe: 'response', headers: myHeaders})
      .pipe(
        // wyswietli naglowki ktore zwraca serwer
        tap((res: HttpResponse<Movie[]>) => {

          console.log(res.headers.keys());
          // kazdy z tych naglowkow mozna tak wyswietlic
          console.log(res.headers.get('Cache-Control'));
          console.log(res.headers.get('Content-Type'));
          console.log(res.headers.get('Expires'));
          console.log(res.headers.get('Pragma'));

        })
      );
  }


  // przyklad dodania parametrow do zapytania http
  params(): Observable<Movie> {
    const myParams = new HttpParams()
      .set('_sort','title')
      .set('_order','desc');
    return this.http
      .get<Movie[]>(this.url, {params: myParams})
      .pipe(tap(console.log));
  }


}
