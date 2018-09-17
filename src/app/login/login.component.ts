'use strict'

import { Component, OnInit } from '@angular/core';
import {Routes, RouterLink, RouterLinkWithHref} from '@angular/router';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {DataService} from 'src/app/services/data.service'
import { Subscriber } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { busDetails } from 'src/app/data';
import {DashboardComponent} from  'src/app/dashboard/dashboard.component';


@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
 
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


 constructor(private router: Router ,
              private route: ActivatedRoute,
              private http: HttpClient,
              private dataService : DataService) { }

 ngOnInit() {
 
     this.router.navigateByUrl('login');
  
  

   var radio_button1=document.getElementById("radio1");
   var radio_button2=document.getElementById("radio2");
   var arrival=<HTMLInputElement>document.getElementById("arrival");
   
   radio_button1.addEventListener("click",function(){
   arrival.disabled=true;
   arrival.value="dd/mm/yyyy";
   });

    radio_button2.addEventListener("click",function(){
       arrival.disabled=false; 
    });   
  if(localStorage.getItem("source")&&localStorage.getItem("destination")){
    var s=<HTMLInputElement>document.getElementById("source");
    var d=<HTMLInputElement>document.getElementById("destination");
    s.value = localStorage.getItem("source");
    d.value = localStorage.getItem("destination");

  }

 }
  validation(){
    var s=<HTMLInputElement>document.getElementById("source");
    var d=<HTMLInputElement>document.getElementById("destination");
    var t=<HTMLInputElement>document.getElementById("departure");

    var auto_source = s.value.split(",");
    s.value = auto_source[0];

    var auto_destination = d.value.split(",");
    d.value = auto_destination[0];

    DataService.JSONObj.source = s.value.toLowerCase();
    DataService.JSONObj.destination = d.value.toLowerCase();
    DataService.JSONObj.date = t.value;
    localStorage.setItem("source",s.value);
    localStorage.setItem("destination",d.value);
  
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var cdd = String(dd);
    var cmm = String(mm);
    var today_date;

    if(dd<10) {
      cdd = '0'+dd;
    } 
    
    if(mm<10) {
      cmm = '0'+mm;
    } 
    
    today_date = yyyy + '-' + cmm + '-' + cdd;


    if((DataService.JSONObj.source == "") || (DataService.JSONObj.destination =="") || (DataService.JSONObj.date =="")){
    
      var h=<HTMLBodyElement>document.getElementById("h");
      h.innerText="* Please fill all the fields";
      this.router.navigateByUrl('login');
    
    }
    else{

      if((DataService.JSONObj.source ) == (DataService.JSONObj.destination )){

        var h=<HTMLBodyElement>document.getElementById("h");
        h.innerText="* Destination cannot be same as source";
        this.router.navigateByUrl('login');
  }
  
  else{
    if(today_date > DataService.JSONObj.date){
      console.log("aaaa");
      var h=<HTMLBodyElement>document.getElementById("h");
      h.innerText="* Departure date can not be past date";
      this.router.navigateByUrl('login');
  }

    else{
      DataService.guarding = true;
      this.router.navigateByUrl('login/dashboard');
      DataService.flag=0;
    }
  }

    
  
    }
  }
}