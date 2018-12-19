// USED FOR STORING USER DATA
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public router: Router) { }

  async storeData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
    const newData = await this.getData();
    return this.router.navigate(['home'], newData);
  }

  getData() {
     return JSON.parse(localStorage.getItem('userData'));
  }

  sessionIn() {
     let session;
     if (this.getData()) {
         session = this.router.navigate(['tab1'], this.getData());
     }
     return session;
  }

  sessionOut() {
     let session;
     if (!this.getData()) {
       session = this.router.navigate(['']);
     }
     return session;
  }

  logOut() {
     localStorage.setItem('userData', '');
     localStorage.clear();
     return this.router.navigate(['']);
  }
}
