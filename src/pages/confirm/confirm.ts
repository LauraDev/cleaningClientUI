import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BackendWs } from '../../providers/backend-ws'


@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class Confirm {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public backendWs: BackendWs,) {

                console.log(JSON.stringify(this.navParams.data))
                //console.log('DONE !')
  // 1- Send Booking to db
                 this.backendWs.write(this.navParams.data).then(
                   data => {
        
                   }
                 );
  }
    
  // 2- Send SMS to cleaners

}