import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.user);
  
  }
  goBack(){
    let str = sessionStorage.getItem('origin');
    let goback = str.slice(str.indexOf("login"), str.length);
    this.router.navigateByUrl(goback);
  }

}
