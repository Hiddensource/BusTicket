'use strict'

import { Component, OnInit } from '@angular/core';
import {Routes, RouterLink, RouterLinkWithHref} from '@angular/router';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {DataService} from 'src/app/services/data.service'

import { Subscriber } from 'rxjs';


import { HttpClientModule } from '@angular/common/http';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { busDetails } from 'src/app/data';
var x = {};
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


  constructor(private router: Router ,
              private route: ActivatedRoute,
              private http: HttpClient,
              private dataService : DataService) { }

  ngOnInit(){

    this.dataService.postData()
    .subscribe(data => {
      
     console.log("object", data['Detail']);
     DashboardComponent.dataObj = data['Detail'];
     this.data =  DashboardComponent.dataObj;
     
    if(DataService.dataSort[1] != null)
    {
      this.data =  DataService.dataSort;
    }
    if(DashboardComponent.dataObj == 0){
     this.router.navigateByUrl('login');
    }
     });
         
  }

  redirect_bta(){
    // var bus_obj = Object;
    // var bus_json = {
    //   "origin": bus_obj.origin,
    //   "destination":bus_obj.destination,
    //   "onwRouteId":"redbusnew@"+bus_obj.RouteID,
    //   "retRouteId":"",
    //   "onwDate":bus_obj,
    //   "retDate":"",
    //   "src_vid":bus_obj.src_vid,
    //   "dest_vid":bus_obj.dest_vid,
    //   "src_id":bus_obj.src_id,
    //   "dest_id":bus_obj.dest_id,
    //   "bid":"Delhi/Dehradun/2215/UttarPradeshStateRoadTransportCorporationUPSRTC/JANRATHAC2+2-redbusnew@1001653428290860336-11044-2018/09/30",
    //   "op":bus_obj.Operator_id,
    //   "tripType":"onw"
    // }

  //   var uri = 
    
  // }
}
}
