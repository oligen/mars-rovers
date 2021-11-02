import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarsComponent } from './components/mars/mars.component';
import { PlateauComponent } from './components/plateau/plateau.component';

const routes: Routes = [
  {path: "mars", component: MarsComponent},
  {path: "plateau", component: PlateauComponent},
  {path: "", component: MarsComponent, pathMatch: "full"},
  {path: "**", redirectTo: "mars"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
