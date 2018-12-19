import { Component, OnInit } from '@angular/core';
import {
   AuthService,
   GoogleLoginProvider
} from 'angular-6-social-login';
import { AuthAPIService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public responseData: any;

  requestBody = {
    client_id: 'buWgmy7h5kOeZl2FgvW3tzhDQlsmY0P5FwvjbOre',
    client_secret:
    'tdCQ7uQvXaQ8ch18Y0RxiRSHrvTZUH9BX7UVHznA066oxqlx4Fx3qdddgVVp9mm5TiB2DEPeGlCh35yV9IEdIjuDFGy5YcBVZxqSuml9FSHu4Y1TnGAZgRnXcfJSpcbJ',
    grant_type: 'convert_token',
    backend: 'google-oauth2',
    token:
     '',
  };

  public postData = {
  token: '',
  };

  constructor(

    private socialAuthService: AuthService,
    public authAPIService: AuthAPIService,
    public user: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  public signIn() {
    const provider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(provider).then(
      userData => {
        this.apiConnect(userData);
      }
    );
  }

  public apiConnect(data) {
    console.log('userdata: ' + JSON.stringify(data));

    // Get user token from provider
    this.requestBody.token = data.token;

    this.authAPIService.postData(this.requestBody, 'login').then(
      result => {
        this.router.navigate(['/tabs/tab1']);
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
