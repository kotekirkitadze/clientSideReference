import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './shell/header/header.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditInfoFormComponent } from './components/edit-client/edit-info-form/edit-info-form.component';
import { WelcomeComponent } from './shell/header/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonalAccountComponent } from './components/personal-account/personal-account.component';
import { PageNotFoundComponent } from './shell/header/page-not-found/page-not-found.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { SharedModule } from './shared/shared.module';
// import { ClientListComponent } from './components/client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientListComponent,
    EditClientComponent,
    EditInfoFormComponent,
    WelcomeComponent,
    PersonalAccountComponent,
    PageNotFoundComponent,
    ClientDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
