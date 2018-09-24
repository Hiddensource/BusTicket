'use strict'

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {} from '@types/googlemaps';
import {DataService} from 'src/app/services/data.service'
import { HttpClient} from '@angular/common/http';

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
 
    google.maps.event.addDomListener(window, 'click', this.initialize);
    
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


  initialize() {
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: "in"}
    };

    var input = document.getElementById('source');
    var input1 = document.getElementById('destination');
    var autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>input),
    options);
    var autocomplete1 = new google.maps.places.Autocomplete((<HTMLInputElement>input1),
    options);
  }
 
  //on click of submit button
  //validate input fields
  validation(){

    var s=<HTMLInputElement>document.getElementById("source");
    var d=<HTMLInputElement>document.getElementById("destination");
    var t=<HTMLInputElement>document.getElementById("departure");
    var r=<HTMLInputElement>document.getElementById("arrival");
    var auto_source = s.value.split(",");
    s.value = auto_source[0];

    var auto_destination = d.value.split(",");
    d.value = auto_destination[0];

    DataService.JSONObj.source = s.value.toLowerCase();
    DataService.JSONObj.destination = d.value.toLowerCase();
    DataService.JSONObj.date = t.value;
    DataService.JSONObj.return_date = r.value;
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

    //if all fields are filled
    if((DataService.JSONObj.source == "") || (DataService.JSONObj.destination =="") || (DataService.JSONObj.date =="") )
    {
    
      var h=<HTMLBodyElement>document.getElementById("h");
      h.innerText="* Please fill all the fields";
      this.router.navigateByUrl('login');
    
    }




    //if source is same as destination
    else{

      if((DataService.JSONObj.source ) == (DataService.JSONObj.destination ))
      {
        var h=<HTMLBodyElement>document.getElementById("h");
        h.innerText="* Destination cannot be same as source";
        this.router.navigateByUrl('login');
      }

      //if entered date is less than todays date
      else{

        if(today_date > DataService.JSONObj.date)
        {
          var h=<HTMLBodyElement>document.getElementById("h");
          h.innerText="* Departure date can not be past date";
          this.router.navigateByUrl('login');
        }
        //if everything is fine navigate to next page
        else{
          DataService.guarding = true;
          this.router.navigateByUrl('login/dashboard');
          DataService.flag=0;
        }

      } 

    }

  }
  
}