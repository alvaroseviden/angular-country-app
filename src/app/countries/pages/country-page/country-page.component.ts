import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { first, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {


  public country?: Country;

  constructor ( private activatedRoute: ActivatedRoute,
                private countriesService: CountriesService,
                private router: Router  ) {}


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    // Desestructuramos params para coger solo id en e lsubscribe.
    // Luego por console log solo mostramos el id de params
    this.activatedRoute.params
    .pipe(
      // Esto regresa un nuevo Observable, es su objetivo. Recibe  de entrada el original
      switchMap( ({id}) => this.countriesService.searchcountryByAlphaCode(id)),
    )
    /* .subscribe ( ({id}) => {
        //console.log ( {params: id} )
      this.countriesService.searchcountryByAlphaCode(id)
      .subscribe( country => {
          console.log ( {country} )
        });

      }); */
      //Tecnicamente esto me puede devolver mas de uno, pero sol oespero que me devuelva uno
      .subscribe (country => {
          //console.log({country});
          if ( !country ) {
            return this.router.navigateByUrl('');
          }

          console.log('Tenemos un país');
          return this.country = country;
          //return;
      });
  }

}
