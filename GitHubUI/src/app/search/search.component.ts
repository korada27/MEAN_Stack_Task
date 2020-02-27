import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myForm: FormGroup;
  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('')
    });
  }

  searchUser(user){


    user = user.value.name;
    console.log(user)
    this.apiService.userName.next(user);
    this.router.navigate(["/userdetails"]);

  }
}
