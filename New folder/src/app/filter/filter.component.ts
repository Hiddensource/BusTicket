import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

source=DataService.JSONObj.source;
destination=DataService.JSONObj.destination;
date=DataService.JSONObj.date;
 

  constructor() { }

  ngOnInit() {
  }

}
