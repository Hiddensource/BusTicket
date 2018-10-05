'use strict' ;
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
 

  constructor( private socialAuthService: AuthService,private router:Router, private dataService : DataService) {
 
  }
  
  ngOnInit() {
    this.router.navigateByUrl('login');
    if(sessionStorage.getItem('username')!= null){
      var btn1=<HTMLBodyElement>document.getElementById("btn1");
      btn1.hidden =false;
      btn1.innerHTML=sessionStorage.getItem('username'); 
      var logout=<HTMLButtonElement>document.getElementById("Log-out");
      logout.hidden=false;
    }
  }

  public socialSignIn(socialPlatform : string) {
  let socialPlatformProvider;

      if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        var btn=<HTMLBodyElement>document.getElementById("btn");
        btn.hidden=true;
        var btn1=<HTMLBodyElement>document.getElementById("btn1");
        btn1.hidden =false;
        btn1.innerHTML=userData.name;
        var logout=<HTMLAnchorElement>document.getElementById("Log-out");
        logout.hidden=false;
      
        sessionStorage.setItem('username',userData.name);     
      }
    );
  }
  logout(){
    var btn=<HTMLBodyElement>document.getElementById("btn");
    btn.hidden=false;
    var btn1=<HTMLBodyElement>document.getElementById("btn1");
    btn1.innerText =null;
    btn1.hidden =true;
    var logout=<HTMLAnchorElement>document.getElementById("Log-out");
    logout.hidden=true;
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    
  } 

}


