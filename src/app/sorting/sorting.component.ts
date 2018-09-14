import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {DashboardComponent} from 'src/app/dashboard/dashboard.component';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
var sort_data;

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent implements OnInit {

 
source=DataService.JSONObj.source;
destination=DataService.JSONObj.destination;
date=DataService.JSONObj.date;
 
  constructor(private router: Router) { }

  ngOnInit() {
    sort_data = DashboardComponent.dataObj;
    console.log(sort_data);
  }
 
  sort_ascending(sort_element){
    
  sort_data.sort(this.sortByPropertyAsc(sort_element));
  DataService.dataSort = sort_data;
  this.router.navigateByUrl('login/dashboard');
  
}

sort_descending(sort_element){
    
  sort_data.sort(this.sortByPropertyDesc(sort_element));
  DataService.dataSort = sort_data;
  this.router.navigateByUrl('login/dashboard');
  
}








sortByPropertyAsc = function (property) {

  return function (x, y) {
    var x_element = x[property];
    var y_element = y[property];
    if( property == "duration"){
     
      x_element = x_element.replace('m',''); 
      y_element = y_element.replace('m',''); 
   
      var res_x = x_element.split("h");
      var res_y = y_element.split("h");

      x_element = (parseInt(res_x[0])*60)+parseInt(res_x[1]);
      y_element = (parseInt(res_y[0])*60)+parseInt(res_y[1]);
    }
    x_element = x_element.toString().replace(':',''); 
    y_element = y_element.toString().replace(':',''); 
   
      return ((parseFloat(x_element) === parseFloat(y_element)) ? 0 : ((parseFloat(x_element) > parseFloat(y_element)) ? 1 : -1));

  }
}  





sortByPropertyDesc = function (property) {

  return function (x, y) {
    var x_element = x[property];
    var y_element = y[property];
    if( property == "duration"){
     
      x_element = x_element.replace('m',''); 
      y_element = y_element.replace('m',''); 
   
      var res_x = x_element.split("h");
      var res_y = y_element.split("h");

      x_element = (parseInt(res_x[0])*60)+parseInt(res_x[1]);
      y_element = (parseInt(res_y[0])*60)+parseInt(res_y[1]);
    }
    x_element = x_element.toString().replace(':',''); 
    y_element = y_element.toString().replace(':',''); 

      return ((parseFloat(x[property]) === parseFloat(y[property])) ? 0 : ((parseFloat(x[property]) < parseFloat(y[property])) ? 1 : -1));

  }
}






}
