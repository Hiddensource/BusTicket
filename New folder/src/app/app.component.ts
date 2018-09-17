'use strict'
import {DataService} from 'src/app/services/data.service'
import { Component, OnInit } from '@angular/core';

import {
  AuthService,
  GoogleLoginProvider
} from 'angular5-social-login';

import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'bta';


  constructor( private socialAuthService: AuthService,private router:Router, private dataService : DataService) {}
  
  ngOnInit() {
    this.router.navigateByUrl('login');
  }

  public socialSignIn(socialPlatform : string) {
  let socialPlatformProvider;

      if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        var btn=<HTMLBodyElement>document.getElementById("btn");
        btn.innerText=userData.name;
        var logout=<HTMLAnchorElement>document.getElementById("Log-out");
        logout.hidden=false;
               
      }
    );
  }
 

}


