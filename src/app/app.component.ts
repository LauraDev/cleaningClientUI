import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http} from '@angular/http';

import { BackendWs } from '../providers/backend-ws';
import { AuthService } from "../providers/authservice";
import { ClientClass } from "../providers/dto/clientClass";
import { FormValidation } from "../providers/util/formValidation";
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              authService: AuthService,
              clientClass: ClientClass,
              formValidation: FormValidation,
              backendWs: BackendWs,
              http: Http,
             ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}