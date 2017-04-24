import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BackendWs } from '../../providers/backend-ws'

import { Services } from '../services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //Address suggestions
  autocompleteItems;
  address;
  service = new google.maps.places.AutocompleteService();
  //Coordinates fron google
  public geocode: any; 
  //user Infos
  public currentUser: { address:string, lat:string, lng:string } 
                    = { address:'', lat:'', lng:'' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public storage: Storage,
              public backendWs: BackendWs,
              private zone: NgZone) {

    this.autocompleteItems = [];
    this.address = {query: ''};
 }
  //List of possible addresses
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
    this.currentUser.address = this.address.query 
    this.autocompleteItems = [];
    
  }
  goToServices() {
  //Get Geocodes && number of available cleaners
    this.backendWs.goecReq(JSON.stringify(this.address)).then(
               data => {
                 if (data.length > 0){
                   for (let infoAddr of data) {
                        this.geocode = infoAddr; 
                        this.currentUser.lat = this.geocode.latitude; 
                        this.currentUser.lng = this.geocode.longitude;
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
    this.storage.set('address', this.currentUser.address);
  
  //Push the next page  
    console.log(JSON.stringify(this.currentUser))
    this.navCtrl.push(Services, this.currentUser); 
  }
}