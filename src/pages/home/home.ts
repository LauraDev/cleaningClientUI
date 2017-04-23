import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Services } from '../services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: FormGroup;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,) {
  }
  
  ngOnInit(): any {
   this.location = this.formBuilder.group({'address': ['', Validators.compose(
            [Validators.pattern('[a-zA-Z0-9 /-]*'), 
            Validators.required])],})
  }

  isValid(field: string) {
    let formField = this.location.get(field);
    return formField.valid || formField.pristine;
  }

  onSubmit() {
    this.navCtrl.push(Services)
}
}
