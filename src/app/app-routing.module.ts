import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { WelcomeComponent } from "./shell/header/welcome/welcome.component";


@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'home', component: WelcomeComponent },
    { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'clients', component: ClientListComponent },
    { path: 'edit', component: EditClientComponent }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
