

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { region: '', countries: [] },

  }


  private saveToLocalStorage() {
    //Guardamos en localStorage de Angular el objeto cacheStore como un string
    localStorage.setItem ('cacheStore', JSON.stringify( this.cacheStore ));

  }


  private loadFromLocalStorage() {

    if (!localStorage.getItem('cacheStore')) return;
    //Le pongo al final lo de ! porque si no da error de asignar string | null
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)


  }

  constructor(private http: HttpClient) {
    console.log('CountriesService init');
    this.loadFromLocalStorage();
   }


  private getCountriesRequest ( url: string ): Observable<Country[]> {
      return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        //delay ( 4000 ),
      );
  }


  searchcountryByAlphaCode (code: string): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( () => of(null) )
    );
  }


  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
   /* return this.http.get<Country[]>( url )
    .pipe(
      //tap( countries => console.log('Paso por el tap', countries) )
      //catchError( error => of([]) )
       //catchError( error => {
        //console.log(error);
        //return of([]);
      } )
      catchError( () => of([]) )
      );*/
      return this.getCountriesRequest( url )
      .pipe (
        tap( countries => this.cacheStore.byCapital = {term, countries }),
        // Cada vez que cambie el cacheStore, llamo a grabar en el localStorage
        //En este punto es donde tenemos almacenado el termino y el resultado
        tap( () => this.saveToLocalStorage()),
      );

  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    /* return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]) )
    ); */
    return this.getCountriesRequest( url )
    .pipe (
      tap( countries => this.cacheStore.byCountry = {term, countries }),
      tap( () => this.saveToLocalStorage()),
    );
  }

  //searchRegion( region: string ): Observable<Country[]> {
    //Ahora, para hacer la persistencia dedatos, cambiamos el region:string
    // por region: Region para mantener el tipo
  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    /* return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]) )
    ); */
    return this.getCountriesRequest( url )
    .pipe (
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage()),
    );
  }


}
