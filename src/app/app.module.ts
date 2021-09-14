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
import { ToastrModule } from 'ngx-toastr';
// import { ClientListComponent } from './components/client-list/client-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailComponent } from './components/client-detail/account-detail/account-detail.component';

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
    ClientDetailComponent,
    AccountDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
