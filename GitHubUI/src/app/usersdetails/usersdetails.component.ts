import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usersdetails',
  templateUrl: './usersdetails.component.html',
  styleUrls: ['./usersdetails.component.css']
})
export class UsersdetailsComponent implements OnInit {
  data: any;
  personDetails: any;
  personRepos: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.userName.subscribe(res => {
      console.log(res)
      this.data = res
    })

    this.apiService.getUserRepos(this.data).subscribe(res => {
      console.log('final response Repo', res)
      this.personRepos = res
    })
    this.apiService.getUserDetails(this.data).subscribe(res => {
      console.log('final response Details', res)
      this.personDetails = res
    })
  }

}
