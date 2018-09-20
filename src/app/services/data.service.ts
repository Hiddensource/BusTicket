import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardComponent } from 'New folder/src/app/dashboard/dashboard.component';



@Injectable({
  providedIn: 'root'
})


export class DataService {
  static guarding=false;
  static time = null;
  static busType = null; // volvo jan rath scania
  static busCondition = null; //ac non ac
  static seatType = null;// sleeper seater semi-seater
  static flag;
  
  static JSONObj = {"source":" ", "destination": " ", "date": " ", "return_date": " " };

  dataObj = {};
  static splitBusType = [];
  
  static dataSort = { };
  static dataFilter = {};


  private url: string;


  constructor(private http:HttpClient) { 

 
  }

  public postData () {
    
    var mystring = DataService.JSONObj.date;
    mystring = mystring.replace('-',''); 

    var ddate=mystring.replace('-','');

    var busParameters = {
      "source":DataService.JSONObj.source,
      "destination":DataService.JSONObj.destination,
      "ddate": ddate
    };


    return this.http.post('http://172.16.17.179:3000/getBus', busParameters )
  
  }

}
