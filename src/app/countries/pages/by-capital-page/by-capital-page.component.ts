import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {


  public countries: Country[] = [];
  public isLoading: boolean = false;
  //Guarda el termino de busqueda que se pone en el searchbox de su pagina
  public initialValue: string = '';

  constructor ( private countriesService: CountriesService ) {}


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    //console.log ('ALVARSU: ' + this.countriesService.cacheStore.byCapital.term)
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
    //console.log ('ALVARSU 2: ' + this.countriesService.cacheStore.byCapital.term)
  }


  searchByCapital( term: string ): void {

    this.isLoading = true;

    //console.log( 'Desde ByCapitalPage' );
    //console.log( {term} );

    this.countriesService.searchCapital( term )
    .subscribe( countries =>  {
        this.countries = countries;
        this.isLoading = false;
    });

    //this.isLoading = false;

  }

}
