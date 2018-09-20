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
  }
      
  time_filter_function(bus_time,filter_class){
    this.color_reset(filter_class);
    DataService.time = bus_time;   
    document.getElementById(bus_time).style.background = "rgb(253, 152, 0)";
        }
  busType_filter(bus_category){
    DataService.busType = bus_category;
        }
  busCondition_filter(bus_condition){
    DataService.busCondition = bus_condition;
  }
  seatType_filter(seat_type){
    DataService.seatType = seat_type;
  }
  busQuality_filter(bus_quality){
    
    
  }
  submit(){
    this.router.navigateByUrl('login/dashboard');
  }
  reset(){
    DataService.time=null;
    DataService.busType=null;
    DataService.busCondition=null;
    DataService.seatType=null;
    this.router.navigateByUrl('login/dashboard');
  }
  
  color_reset(option_reset){
    time_filter = document.getElementsByClassName(option_reset);
    console.log(time_filter.length,typeof(time_filter));
    for (var i=0; i<time_filter.length ;i++)
    (<HTMLButtonElement>time_filter[i]).style.background='black';
  }

}

