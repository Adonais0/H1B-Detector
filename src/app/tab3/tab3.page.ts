import { Component, OnInit } from '@angular/core';
import {
   AuthService,
   GoogleLoginProvider
} from 'angular-6-social-login';
import { AuthAPIService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public responseData: any;
  isAuthed: Boolean = false;
  isAuthedUpdate: Subscription;

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
    private router: Router,
    private authService: AuthAPIService) {

      this.isAuthed = this.authService.getIsAuth();
      this.isAuthedUpdate = this.authService.getAuthStatusListener().subscribe(
        status => {
          this.isAuthed = status;
          console.log('status changed');
          console.log(this.isAuthed);
        }
      );
    }

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

  // public logOut() {
  //   const provider = GoogleLoginProvider.PROVIDER_ID;
  //   this.socialAuthService.signOut().then(
  //     this.authAPIService.isAuthenticated = false;
  //   );
  // }

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
