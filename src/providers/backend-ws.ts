import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BackendWs {
  
  backendWsUrl=  'http://localhost:3000/clients/db';
  backendWsUrl2= 'http://localhost:3000/clients/geocode';

  constructor(public http: Http,
              public alertCtrl: AlertController,) {
   
  }

  public write(value: string): Promise<string>{
    // return new Promise((resolve, reject) => resolve('ok'));
    return new Promise(resolve => {

      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.backendWsUrl, value, options)
        .subscribe(
          data => {resolve(data);
          },
          err => {
            //console.log('Error 1 reading to Ws')
            let alert = this.alertCtrl.create({
              title: 'ERROR',
              subTitle: 'Failed to connect to Database',
              buttons: ['OK']
            });
            alert.present(prompt);
          }
        );
    });
  }

  public goecReq(value: string): Promise<string>{
    // return new Promise((resolve, reject) => resolve('ok'));
    return new Promise(resolve => {

      let headers = new Headers({
        'Content-Type': 'application/json', 
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.backendWsUrl2 , value , options)
       .map(res => res.json())
        .subscribe(
          data => {resolve(data);
          },
          err => {
            //console.log('Error 1 reading to Ws')
            let alert = this.alertCtrl.create({
              title: 'ERROR',
              subTitle: 'Failed to connect to Database',
              buttons: ['OK']
            });
            alert.present(prompt);
          }
        );
    });
   }

}
