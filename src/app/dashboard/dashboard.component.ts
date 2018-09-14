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
     
    if(DataService.dataSort[1] != null)
    {
      this.data =  DataService.dataSort;
    }
    if(DashboardComponent.dataObj == 0){
     this.router.navigateByUrl('login');
    }
     });
         
  }

  
}

