import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// import { environment } from '../../environments/environment';
const BACKEND_URL = 'http://localhost:8000/auth/';
@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  postData(credentials, type) {
    return new Promise(
     (resolve, reject) => {
       this.httpClient.post<any>(BACKEND_URL + type, JSON.stringify(credentials)).subscribe(
         res => {
           console.log(res);
           resolve(res.json());
         }, (err) => {
           console.log('error');
           reject(err);
         }
       );
     }
    );
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
}
