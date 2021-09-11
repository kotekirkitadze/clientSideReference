import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClientDetailComponent } from "./components/client-detail/client-detail.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { PersonalAccountComponent } from "./components/personal-account/personal-account.component";
import { PageNotFoundComponent } from "./shell/header/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./shell/header/welcome/welcome.component";


const ROUTES = [
  { path: 'home', component: WelcomeComponent },
  { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/:id', component: ClientDetailComponent },
  { path: 'client/:id/edit', component: EditClientComponent },
  { path: 'edit/account', component: PersonalAccountComponent },
  { path: '**', component: PageNotFoundComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
