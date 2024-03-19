import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit  {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  //Guarda el termino de busqueda que se pone en el searchbox de su pagina
  public initialValue: string = '';

  constructor ( private countriesService: CountriesService ) {}


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }


  searchByCountry( term: string ): void {

    console.log( 'Desde ByCountryPage' );
    console.log( {term} );

    this.isLoading = true;

    this.countriesService.searchCountry( term )
    .subscribe( countries =>  {
        this.countries = countries;
        this.isLoading = false;
    });

  }

}
