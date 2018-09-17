'use strict'

import { Component, OnInit } from '@angular/core';
import {Routes, RouterLink, RouterLinkWithHref} from '@angular/router';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {DataService} from 'src/app/services/data.service'
import{Event, NavigationStart, NavigationEnd} from '@angular/router';
import { Subscriber } from 'rxjs';


import { HttpClientModule } from '@angular/common/http';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { busDetails } from 'src/app/data';
var x = {};
var bus_json ={};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  public data : any

source=DataService.JSONObj.source;
destination=DataService.JSONObj.destination;
date=DataService.JSONObj.date;

 
  static dataObj = { };
  showLoadingIndicator = true;


  constructor(private router: Router ,
              private route: ActivatedRoute,
              private http: HttpClient,
              private dataService : DataService) { 
                this.router.events.subscribe((routerEvent: Event) => {
                  if(routerEvent instanceof NavigationStart){
                    this.showLoadingIndicator = true;
                    
                  }
                   });
              }

  ngOnInit(){

    this.dataService.postData()
    .subscribe(data => {
      
     console.log("object", data['Detail']);
     DashboardComponent.dataObj = data['Detail'];
     this.data =  DashboardComponent.dataObj;
     this.showLoadingIndicator = false;
    if(DataService.dataSort[1] != null)
    {
      this.data =  DataService.dataSort;
    }
    if(DashboardComponent.dataObj == 0){
     this.router.navigateByUrl('login');
    }
     });
         
  }

  redirectAggregator(user){
    
    var time = user.departureTime;
    time = time.replace(":","");
    var ddate = this.date;
    ddate = ddate.replace("-","");
    ddate = ddate.replace("-","");

	  console.log(user.origin);
	  var bid = user.origin+"/"+user.destination+"/"+time+"/"+user.TravelsName+"/"+user.BusType+"-redbusnew@"+user.RouteID+"-"+user.Operator_id+"-"+ddate;
	     
     bus_json["origin"] = user.origin,
     bus_json["destination"] =user.destination,
     bus_json["onwRouteId"] = "redbusnew@"+user.RouteID,
     bus_json["retRouteId"] ="",
     bus_json["onwDate"] =ddate,
     bus_json["retDate"] ="",
     bus_json["src_vid"] =user.src_vid,
     bus_json["dest_vid"] =user.dest_vid,
     bus_json["src_id"] =user.src_id,
     bus_json["dest_id"] =user.dest_id,
     bus_json["bid"] =bid,
     bus_json["op"] =user.Operator_id,
     bus_json["tripType"] ="onw"
    
    
    var res1 = encodeURI(JSON.stringify(bus_json));
    //uri = encodeURIComponent(bus_json).replace(/'/g,"%27").replace(/"/g,"%22");
    console.log(JSON.stringify(bus_json));
    var url1 = "https://www.goibibo.com/bus/seatlayout?query="+res1;
    window.location.href = url1;
  }


}

