import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { WelcomeComponent } from "./shell/header/welcome/welcome.component";


@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'home', component: WelcomeComponent },
    { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'edit', component: EditClientComponent }])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
