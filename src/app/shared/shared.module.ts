import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceHolder } from './place.holder';



@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent,
    PlaceHolder,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingComponent,
    AlertComponent,
    PlaceHolder,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule { }
