import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './shell/header/header.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditInfoFormComponent } from './components/edit-client/edit-info-form/edit-info-form.component';
import { AccountRequisitesComponent } from './components/edit-client/account-requisites/account-requisites.component';
import { WelcomeComponent } from './shell/header/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
// import { ClientListComponent } from './components/client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientListComponent,
    EditClientComponent,
    EditInfoFormComponent,
    AccountRequisitesComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
