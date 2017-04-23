import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Checkout } from '../checkout/checkout';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class Services {

  public number: any = 3;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

goToOtherPage() {
  this.navCtrl.push(Checkout)
}
}
