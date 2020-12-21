import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceHolder {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
