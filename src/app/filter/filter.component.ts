import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service'
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
import {DashboardComponent} from 'src/app/dashboard/dashboard.component';
var time_filter;
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

source=DataService.JSONObj.source;
destination=DataService.JSONObj.destination;
date=DataService.JSONObj.date;


  constructor(private router: Router) { }
 
 
  ngOnInit() {
    if(DataService.busCondition!=  null || DataService.busType!=null || DataService.seatType!=null || DataService.departureTime!=null){
      if(DataService.busCondition!=  null){
        document.getElementById(DataService.busCondition).style.background = "rgb(253, 152, 0)";
      }
      if(DataService.busType!=  null){
        document.getElementById(DataService.busType).style.background = "rgb(253, 152, 0)";
      }
      if(DataService.seatType!=  null){
        document.getElementById(DataService.seatType).style.background = "rgb(253, 152, 0)";
      }
      if(DataService.departureTime!=  null){
        document.getElementById(DataService.departureTime).style.background = "rgb(253, 152, 0)";
      }
    }
  }
  
      
  time_filter_function(bus_time,filter_class){
    this.color_reset(filter_class);
    DataService.departureTime = bus_time;
    DataService.departureTimeMin = parseInt(bus_time.split("-")[0]);
    DataService.departureTimeMax = parseInt(bus_time.split("-")[1]);      
 
    document.getElementById(bus_time).style.background = "rgb(253, 152, 0)";
        }
   busType_filter(bus_category,filter_class){
    this.color_reset(filter_class);
    DataService.busType = bus_category;
    document.getElementById(bus_category).style.background = "rgb(253, 152, 0)";
  }

  busCondition_filter(bus_condition,filter_class){
    this.color_reset(filter_class);
    DataService.busCondition = bus_condition;
    document.getElementById(bus_condition).style.background = "rgb(253, 152, 0)";
  }

  seatType_filter(seat_type,filter_class){
    this.color_reset(filter_class);
    DataService.seatType = seat_type;
    document.getElementById(seat_type).style.background = "rgb(253, 152, 0)";
  }
 
  submit(){
    this.router.navigateByUrl('login/dashboard');
  }
  reset(){
    DataService.departureTimeMin=null;
    DataService.departureTimeMax=null;
    DataService.departureTime=null;
    DataService.busType=null;
    DataService.busCondition=null;
    DataService.seatType=null;
    //this.router.navigateByUrl('login/dashboard');
    this.color_reset('btn-light');

  }
  
  color_reset(option_reset){
    time_filter = document.getElementsByClassName(option_reset);
    for (var i=0; i<time_filter.length ;i++)
    (<HTMLButtonElement>time_filter[i]).style.background='white';
  }

}

