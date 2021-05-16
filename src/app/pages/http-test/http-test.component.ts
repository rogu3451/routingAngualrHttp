import { Component, OnInit } from '@angular/core';
import { HttpMoviesService } from '../../services/http-movies.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styles: [
  ],
})
export class HttpTestComponent implements OnInit {

  errorMessage: string;

  constructor(private http: HttpMoviesService) { }

  ngOnInit(): void {
  }

  get() {
    this.http.getMovies().subscribe();
  }

  post(){
    const movie: Movie = {
      country: 'Poland',
      director: 'Marek Nowak',
      category: 'Fantasy',
      plot: 'Zabójca potworów musi xd',
      poster: null,
      year: '2001',
      title: 'Wiedźmin',
      imdbRating: '10.0',
    };

    this.http.postMovie(movie).subscribe();

  }

  put(){
    const movie: Movie = {
      id: '58',
      country: 'Germany',
      director: 'Muchael Fobs',
      category: 'Fantasy',
      plot: 'Zabójca potworów musi xd',
      poster: null,
      year: '2001',
      title: 'Wiedźmin',
      imdbRating: '10.0',
    };

    this.http.putMovie(movie).subscribe();
  }

  patch(){
    const movie: Partial<Movie> = {
      id: '58',
      country: 'Norway',
    };

    this.http.patchMovie(movie).subscribe();
  }

  delete(){
    this.http.deleteMovie('58').subscribe();
  }

  error(){
    this.http.makeError().subscribe({error: (err: string) => (this.errorMessage = err) });
  }

  headers(){
    this.http.headers().subscribe();
  }

  params(){
    this.http.params().subscribe();
  }

}
