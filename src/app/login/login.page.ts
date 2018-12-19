import { Component, OnInit } from '@angular/core';
import {
   AuthService,
   GoogleLoginProvider
} from 'angular-6-social-login';
import { AuthAPIService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public responseData: any;

  public postData = {
  email: '',
  name: '',
  provider: '',
  provider_id: '',
  provider_pic: '',
  token: ''
  };
  constructor(
    private socialAuthService: AuthService,
    public authAPIService: AuthAPIService,
    public user: UserService) { }

  ngOnInit() {
  }
  logIn() {}

  public signIn() {
    const provider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(provider).then(
      userData => {
        this.apiConnect(userData);
      }
    );
  }

  public apiConnect(data) {
    this.postData.email = data.email;
    this.postData.name = data.name;
    this.postData.provider = data.provider;
    this.postData.provider_id = data.id;
    this.postData.provider_pic = data.image;
    this.postData.token = data.token;

    this.authAPIService.postData(this.postData, 'signup').then(
      result => {
        this.responseData = result;
        if (this.responseData.userData) {
          this.user.storeData(this.responseData.userData);
        }
      },
      err => {
        console.log('error with posting data');
      }
    );
  }
}
