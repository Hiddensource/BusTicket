import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service'
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
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

  time_filter(bus_time){
    DataService.time = bus_time;   
        }
  busCategory_filter(bus_category){
    DataService.busCategory = bus_category;
        }
  busType_filter(bus_type){
    DataService.busType = bus_type;
  }
  seatType_filter(seat_type){
    DataService.seatType = seat_type;
  }
  submit(){
    this.router.navigateByUrl('login/dashboard');
  }
  reset(){
    DataService.time=null;
    DataService.busCategory=null;
    DataService.busType=null;
    DataService.seatType=null;
    this.router.navigateByUrl('login/dashboard');


  }
}

