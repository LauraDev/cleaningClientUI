import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';

import { BackendWs } from '../../providers/backend-ws'

import { Services } from '../services/services';
import { Registration } from '../registration/registration';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //Address suggestions
  autocompleteItems;
  address;
  service = new google.maps.places.AutocompleteService();
  
  //Cleaners within 10k
  public number;
  public cleaners = new Array();
  //Disable Next button
  public location: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage,
              public formBuilder: FormBuilder,
              public backendWs: BackendWs,
              private zone: NgZone) {

    this.autocompleteItems = [];
    this.address = {query: ''};
    this.location = this.formBuilder.group( { 'address': ['', Validators.required]})
 }
  //Disable the Next button when there is no provided address 
  isValid(field: string) {
    let formField = this.location.get(field);
    return formField.valid || formField.pristine;
  }
  
  //List of possible addresses (from google)
  updateSearch() {
    if (this.address.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let list = this;
    this.service.getPlacePredictions({ input: this.address.query, 
                                       componentRestrictions: {country: 'CA'} }, 
                                       function (predictions, status) {
      list.autocompleteItems = []; 
      list.zone.run(function () {
        predictions.forEach(function (prediction) {
          list.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
  //Client's address selection
  chooseItem(item: any) {
    this.address.query = item; 
    this.autocompleteItems = [];
    
  } 
  goToServices() {
  //Get infos of available cleaners
    this.backendWs.goecReq(JSON.stringify(this.address)).then(
               data => {
                 if (data.length > 0){
                   for (let info of data) {
                        let infos = info; 
                        this.cleaners.push(infos);
                        this.number = this.cleaners[0].length;
                        this.storage.set('number', this.number);
  //Push the next page with the number of available cleaners  
                        this.navCtrl.push(Services, this.number); 
                   }
                 }
                 else {
                   let alert = this.alertCtrl.create({
                     title: 'ERROR',
                     subTitle: 'Invalid Address',
                     buttons: ['OK']
                     });
                     alert.present(prompt);
                 }
               },
             );
  //Set data in storage
    this.storage.set('address', this.address.query);
  }
}