import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})


export class DataService {
  static guarding=false;

 
static JSONObj = {"source":" ", "destination": " ", "date": " " };

dataObj = {};
  
static dataSort = { };

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


return this.http.post('http://172.16.17.209:4000/getBus', busParameters )
  
}

}
