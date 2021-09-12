import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { SpinnerComponent } from './loading/spinner/spinner.component';



@NgModule({
  declarations: [
    LoadingComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent]
})
export class SharedModule { }
