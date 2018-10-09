'use strict';

import {DataService} from 'src/app/services/data.service'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
//import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {DataTableModule} from "angular-6-datatable";




import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular5-social-login";
import { SortingComponent } from './sorting/sorting.component';
import { FilterComponent } from './filter/filter.component';
import { NomanslandComponent } from './nomansland/nomansland.component';
import { ProfileComponent } from './profile/profile.component';
import { SeatBookComponent } from './seat-book/seat-book.component';



// Configs 
export function getAuthServiceConfigs() {
let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("725788246595-gl8aa9vmtk34svar9tk04hubmql72mff.apps.googleusercontent.com")
      },
    ]
);
return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SortingComponent,
    FilterComponent,
    NomanslandComponent,
    ProfileComponent,
    SeatBookComponent
  ],
  imports: [
    //MatTableModule,
   // MatSortModule,
   SocialLoginModule,
   BrowserModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    DataTableModule,
   
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
   // Ng2OrderModule,
    GooglePlaceModule,
    RouterModule.forRoot([
      {
        path: 'login/dashboard/filter',
        component:FilterComponent,
        canActivate: [AuthGuard]
            },
       {
         path: 'login/dashboard/sorting',
       component:SortingComponent,
       canActivate: [AuthGuard]
            },
            {
              path: 'login/nomansland',
              component:NomanslandComponent,
                canActivate: [AuthGuard]
            
                  },
             {
  path: 'login/dashboard',
  component:DashboardComponent,
    canActivate: [AuthGuard]

      },
     
      {
        path: 'login',
        component:LoginComponent
      
            },
     
      {
        path: '',
        component:AppComponent
      
            },
            {
              path:'login/profile',
              component : ProfileComponent
            },
            {
              path:'login/seat-book',
              component : SeatBookComponent
            }


    ],{useHash :true})
    
  ],
providers: [
             DataService,AuthGuard,
             {
  provide: AuthServiceConfig,
  useFactory: getAuthServiceConfigs
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
