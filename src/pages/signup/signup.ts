import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  
    @ViewChild('username') username;
    @ViewChild('password') password;

    constructor(
          private alertCtrl: AlertController,
          private fire: AngularFireAuth,
          public navCtrl: NavController,
          public navParams: NavParams) { }

    alert(message: string) {
      this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
    }

  registerUser() {

    this.fire.auth.createUserWithEmailAndPassword(this.username.value, this.password.value)
    .then(data => {
      this.alert('Registered!');
      this.navigateToLogin();
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  }
  navigateToLogin(){
    this.navCtrl.push(Login)
  }
}
