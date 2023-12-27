import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './materiel/materiel.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './LandingPage/home/home-page.component';
import { HeaderComponent } from './LandingPage/header/header.component';
import { ContentComponent } from './LandingPage/content/content.component';
import { CardComponent } from './LandingPage/card/card.component';
import { ContactComponent } from './LandingPage/contact/contact.component';
import { DashboardComponent } from './DashboardAdmin/dashboard/dashboard.component';
import { NavbarComponent } from './DashboardAdmin/navbar/navbar.component';
import { SideBarComponent } from './DashboardAdmin/sideBar/side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFoodComponent } from './DashboardAdmin/update/edit-food.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    ContentComponent,
    CardComponent,
    ContactComponent,
    DashboardComponent,
    NavbarComponent,
    SideBarComponent,
    EditFoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
