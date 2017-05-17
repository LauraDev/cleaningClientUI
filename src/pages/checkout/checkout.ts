import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { AuthService } from '../../providers/authservice';
import { BackendWs } from '../../providers/backend-ws'
import { ClientClass } from '../../providers/dto/clientClass';
import { FormValidation } from "../../providers/util/formValidation";

import { Services} from '../services/services'
import { Confirm} from '../confirm/confirm'

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
  
  // RegisterCredentials = {email: '', password: ''};
  registerCredentials = {user: 'Admin', password: 'Password'}; 

  // selected infos
  public package: {cleaningDate: any , pack: any}
  public surfaceValue: any;
         surface: any;
  //Client's infos
  public Clients: FormGroup;
  public client: any;
  public uuid = UUID.UUID();
  public date = new Date;
  public infos : any;

  // Replace registration div by login
  public value = 0;
  public color = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              private auth: AuthService,
              public backendWs: BackendWs,
              private alertCtrl: AlertController,
              public clientClass: ClientClass,
              public formValidation: FormValidation) {
  }
   
  ngOnInit() {
    //Set class and validation 
    this.Clients = this.formValidation.newClient; 
    this.client = this.clientClass.allInfos;      
    //this.clientClass.allInfos.uuid = this.uuid;   //1
    this.clientClass.allInfos.date = this.date;   //2
    
    // Get the selected pack infos  
    this.package = this.navParams.data;
      this.clientClass.allInfos.cleaningDate = this.package.cleaningDate;  //3
      this.clientClass.allInfos.pack = this.package.pack.type;             //4
      //console.log(JSON.stringify(this.package.pack.type));
      this.clientClass.allInfos.price = this.package.pack.price;  //5
    this.storage.get('address').then((address) => {
      this.clientClass.allInfos.address = address;           //6
    });
    this.storage.get('surface').then((surface) => {
      this.surfaceValue = surface;
        this.clientClass.allInfos.surface = this.surfaceValue;  //7
   
     if ( this.surfaceValue == 0) {
       this.surface = 'Studio';
     }
     else if ( this.surfaceValue == 1) {
       this.surface = '1 Bedroom Apartment / House';
     }
     else if ( this.surfaceValue == 2) {
       this.surface = '2 Bedroom Apartment / House';
     }
     else if ( this.surfaceValue == 3) {
       this.surface = '3 Bedroom Apartment / House';
     }
     else if ( this.surfaceValue == 4) {
       this.surface = 'Over XXX m2';
     }
    });
  }

  // Check if infis are correct
   isValid(field: string) {
    let formField = this.Clients.get(field);
    return formField.valid || formField.pristine;
  }

  // Modify the order
  goToServices() {
    this.navCtrl.push(Services)
  }
  
  // Div Registration
  blockRegistration() {
    this.value = 0;
    this.color = 0;
  }
  register() {
    // 1- Save Credentials => Login module
    // this.registerCredentials
    
    //2 -Push infos to the next page (without password)
    //console.log(JSON.stringify(this.clientClass.allInfos));
    this.navCtrl.push(Confirm, this.clientClass.allInfos);
  }


  // Div Login
  blockLogin() {
    this.value = 1;
    this.color = 1;
  }
  login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        // 1- Get firstname/lastname from database
        // this.backendWs.ReqData(this.registerCredentials.user).then( // chercher en prenant l'e-mail
        //    data => {
        //      for (let contact of data) {
        //           this.infos = contact;
        //           this.clientClass.allInfos.firstName = this.infos.firstName;
        //           this.clientClass.allInfos.lastName = this.infos.lasttName;
        //      }
             // 2- Set infos in clientClass
             this.clientClass.allInfos.email = this.registerCredentials.user,  
             // 3- Push infos to the next page (without password)
            //console.log(JSON.stringify(this.clientClass.allInfos));
            this.navCtrl.push(Confirm, this.clientClass.allInfos);
      //     },
      //  )
        
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