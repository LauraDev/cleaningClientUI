import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Checkout } from '../checkout/checkout';
import { PriceClass } from '../../providers/dto/priceClass'

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class Services {

  public number;
         surface;
         value;
         value2;
         value3;
         pack;
         package;
         price;
         cleaner;
         myDate = new Date().toISOString();
         cleaningDate;
         cleaning: { cleaningDate:any , pack: any}
       
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public priceClass: PriceClass) {
                
  }
    //Get the number of available cleaners / if no cleaner: hide the page
    ngOnInit() {
      this.package = this.priceClass.pack0;
        this.storage.get('number').then((number) => {
          this.number = number;
          if ( this.number == 0 ) {
             this.value = 0; //hide the rest of the page
             this.cleaner = 'cleaner' // write 'cleaner'
          } else if ( this.number == 1 ) {
             this.value = 1; 
             this.cleaner = 'cleaner'
          } else if ( this.number > 1 ) {
             this.value = 1; 
             this.cleaner = 'cleaners' // write 'cleanerS'
          }
        });
    }
    // Once the surface is selected: show the packages
    onChange(realSurface){
      this.storage.set('surface', realSurface)      
      if ( !!realSurface ) {
        this.value2 = 1; 
      } else {
        this.value2 = 0; 
      }
      
      if ( realSurface == 0) {
        this.package = this.priceClass.pack0;
      }
      else if ( realSurface == 1) {
        this.package = this.priceClass.pack1;
      }
      else if ( realSurface == 2) {
        this.package = this.priceClass.pack2;
      }
      else if ( realSurface == 3) {
        this.package = this.priceClass.pack3; 
      }
      else if ( realSurface == 4) {
        this.package = this.priceClass.pack4;
      }
      
    }
    // Get the selected pack infos
    showTime(pack) {
      this.value3 = 1;
      this.pack = pack;
      this.price = this.pack.price;
    }
    // Get the time of cleaning & push the next page with the infos
    goToCheckout(myDate) {
      this.cleaningDate = myDate;
      this.cleaning = { 'cleaningDate': this.cleaningDate , 'pack': this.pack }
      this.navCtrl.push(Checkout, this.cleaning)
      //console.log(JSON.stringify(this.cleaning));
    }
  }