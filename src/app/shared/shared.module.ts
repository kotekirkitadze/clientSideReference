import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { SpinnerComponent } from './loading/spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
// import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LoadingComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, TranslateModule]
})
export class SharedModule { }
