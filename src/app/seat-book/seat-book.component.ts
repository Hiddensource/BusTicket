import { Component, OnInit } from '@angular/core';
import { resolveDirective } from '@angular/core/src/render3/instructions';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-seat-book',
  templateUrl: './seat-book.component.html',
  styleUrls: ['./seat-book.component.css']
})
export class SeatBookComponent implements OnInit {
  url;
  constructor() { }

  ngOnInit() {

    this.url = DataService.url;
    let redirect_url = <HTMLIFrameElement>document.getElementById("frame");
    redirect_url.src = this.url;
  }
 

}
