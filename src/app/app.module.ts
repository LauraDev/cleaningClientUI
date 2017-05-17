import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { BackendWs } from '../providers/backend-ws';
import { AuthService } from "../providers/authservice";
import { PriceClass } from "../providers/dto/priceClass";
import { ClientClass } from "../providers/dto/clientClass";
import { FormValidation } from "../providers/util/formValidation";

import { MyAccount } from '../pages/myAccount/myAccount';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Services } from '../pages/services/services';
import { Checkout } from '../pages/checkout/checkout';
import { Confirm } from '../pages/confirm/confirm';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MyAccount,
    ContactPage,
    HomePage,
    TabsPage,
    Services,
    Checkout,
    Confirm,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyAccount,
    ContactPage,
    HomePage,
    TabsPage,
    Services,
    Checkout,
    Confirm
  ],
  providers: [
    BackendWs,
    AuthService,
    PriceClass,
    ClientClass,
    FormValidation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}