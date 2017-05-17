import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable()
export class FormValidation { 

newClient: any;
public constructor(public formBuilder: FormBuilder)
                    {
this.newClient = this.formBuilder.group({
  'firstName': ['', Validators.compose(
               [Validators.maxLength(30), 
               Validators.pattern('[a-zA-Z -]*'), 
               Validators.required])],

  'lastName': ['', Validators.compose(
              [Validators.maxLength(30), 
              Validators.pattern('[a-zA-Z -]*'), 
              Validators.required])],

  'email': ['', Validators.compose(
           [Validators.maxLength(50), 
           Validators.required])],

  'password': ['', Validators.compose(
           [Validators.minLength(6), 
           Validators.required])],
     });
  }
}