import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './LandingPage/home/home-page.component';
import { DashboardComponent } from './DashboardAdmin/dashboard/dashboard.component';
import { EditFoodComponent } from './DashboardAdmin/update/edit-food.component';



const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'updateFood/:id',component:EditFoodComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
