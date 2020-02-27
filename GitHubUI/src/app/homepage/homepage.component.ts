import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users: any;
  constructor(private apiService: ApiService,private router: Router,) { }

  ngOnInit() {
    this.apiService.getUsersList().subscribe(users => {
      // console.log("Github Users API : ", users)
      this.users = users;
    });
  }
  gotoUser(userdata){
    // console.log(userdata);
    this.apiService.userName.next(userdata)
    this.router.navigate(["/userdetails"]);
  }

}
