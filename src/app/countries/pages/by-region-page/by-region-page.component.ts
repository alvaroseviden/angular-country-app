import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor ( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    // Uso la variable selectedRegion que ya tenia creada para marcar la seleccionada, para recargar
    // el valor en el searchbox
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }


  searchByRegion( term: Region ): void {

    this.selectedRegion = term;

    console.log( 'Desde ByRegionPage' );
    console.log( {term} );

    this.countriesService.searchRegion( term )
    .subscribe( countries =>  {
        this.countries = countries;
    });

  }

}
