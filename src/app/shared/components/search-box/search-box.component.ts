import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    //Cuando deja de recibir valores en un segundo, continua y ya manda el valor para la busqueda
    .subscribe ( value => {
        console.log('debouncer value',value);
        this.onDebounce.emit(value);

    });
  }


  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log('destruido');
    this.debouncerSuscription?.unsubscribe();
  }


  emitValue( value: string ): void {
    this.onValue.emit (value );
  }


  onKeyPress ( searchTerm: string) {
    console.log(searchTerm);
    this.debouncer.next ( searchTerm );

  }


}
