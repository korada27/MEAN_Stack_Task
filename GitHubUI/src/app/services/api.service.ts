import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  userName = new BehaviorSubject('');
  currentUser = this.userName.asObservable();


  constructor(public http:HttpClient) { }
  client_id="3279408a4074a92a470f"
  client_secret="c0081e183c0b20142a43151e6122999524d04e22"

  getUsersList(){

    return this.http.get(`https://api.github.com/users?per_page=100&client_id=${this.client_id}&client_secret=${this.client_secret}`).pipe();

  }

  

  getUserRepos(data){
    console.log('in service class',data)

    return this.http.get(`https://api.github.com/users/${data}/repos`).pipe();
  }

  getUserDetails(data){
    console.log('in service class',data)

    return this.http.get(`https://api.github.com/users/${data}`).pipe();
  }

}
