import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {DetailsComponent} from './details/details.component';


const routes: Routes = [{path:'',component:SidenavComponent},
{path:'details/:id/:date',component:DetailsComponent},{path:'**',component:DetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
