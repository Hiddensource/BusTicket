'use strict'

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DataService} from 'src/app/services/data.service'
import{Event, NavigationStart} from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  buscondition= DataService.busCondition;
  seattype = DataService.seatType;
  bustype = DataService.busType;
  busDepartureTimeMin =DataService.departureTimeMin;
  busDepartureTimeMax =DataService.departureTimeMax;
  
  counter1 = 0;
  
  static dataObj = { };
  showLoadingIndicator = true;


  constructor(private router: Router ,
              private route: ActivatedRoute,
              private http: HttpClient,
              private dataService : DataService) 
              { 
                this.router.events.subscribe((routerEvent: Event) => {

                  if(routerEvent instanceof NavigationStart){
                    this.showLoadingIndicator = true;  
                  }

                });
              }            

  ngOnInit(){
    this.counter1=0;
  
    if(DataService.flag == 0)
    {
      this.dataService.postData()
      .subscribe(data => {
      
      //console.log("object", data['Detail']);
      DashboardComponent.dataObj = data['Detail'];
      this.data =  DashboardComponent.dataObj;
      DataService.dataFilter = this.data;
      this.showLoadingIndicator = false;
      DataService.flag = 1;
      if(DashboardComponent.dataObj[0] == null)
        {
          
          this.router.navigateByUrl('login/nomansland');
          this.showLoadingIndicator = false;
        }
      });
    }
    else{
      if(DashboardComponent.dataObj[0] == null){
        
        this.router.navigateByUrl('login/nomansland');
        this.showLoadingIndicator = false;
      }
        this.data = DataService.dataFilter;
        this.showLoadingIndicator = false;
    }
    if(DataService.dataSort[0] != null)
    {
      if(DashboardComponent.dataObj[0] == null){
 
        this.router.navigateByUrl('login/nomansland');
        this.showLoadingIndicator = false;
      }
      this.data =  DataService.dataSort;
      this.showLoadingIndicator = false;
    }        
  }

  redirectAggregator(user){
    
    var time = user.departureTime;
    time = time.replace(":","");
    var ddate = this.date;
    ddate = ddate.replace("-","");
    ddate = ddate.replace("-","");

	
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
    var url1 = "https://www.goibibo.com/bus/seatlayout?query="+res1;
    // window.location.href = url1;
    DataService.url = url1;
    this.router.navigateByUrl("login/seat-book");
  }

  count12(){
    
    this.counter1 = this.counter1 +1;
  };
  navigate  = function(){
    this.router.navigateByUrl("/login/nomansland");
  }

}

