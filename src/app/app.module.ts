import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
   SocialLoginModule,
   AuthServiceConfig,
   GoogleLoginProvider,
} from 'angular-6-social-login';
import { AuthAPIService} from './auth.service';
import { AppService} from './app.service';

import { HttpClientModule } from '@angular/common/http';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('218606464263-ah2grqe3bdpvp30i1trhgch5jue78d2g.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    AppService,
    AuthAPIService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
