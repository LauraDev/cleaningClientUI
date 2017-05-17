import { Injectable } from '@angular/core';

@Injectable()

export class ClientClass {
    
  allInfos: { //uuid: string,
           firstName: string, 
           lastName: string, 
           email: string,
           address: any,
           surface: string,
           pack: string, 
           price: string, 
           date: any,
           cleaningDate: any;
           } = {
    //uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    surface: '',
    pack: '',
    price: '',
    date: '',
    cleaningDate: '',
    };
}