import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';
import { Confirm} from '../confirm/confirm'

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {

  // registerCredentials = {email: '', password: ''};
  registerCredentials = {user: 'Admin', password: 'Password'}; 
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private auth: AuthService) {
  }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.push(Confirm, this.registerCredentials.user);
        
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }


  showError(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
