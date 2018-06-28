import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Login } from '../login/login';
import { User } from '../../app/model/user';
import { HomePage } from '../home/home';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  
    @ViewChild('username') username;
    @ViewChild('password') password;

    private newUser: User;

    constructor(
          private afs: AngularFirestore,
          private fire: AngularFireAuth,
          public navCtrl: NavController,
          public navParams: NavParams,
          private toastCtrl: ToastController) { 
            this.newUser = new User();
            
          }

    alert(message: string) {

      this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top',
        showCloseButton: true
      }).present();
    }

  registerUser() {

    this.fire.auth.createUserWithEmailAndPassword(this.username.value, this.password.value)
    .then(data => {
      this.alert('Inscription réussie');
      let newJourney:any = {
          name: this.newUser.name,
          email: this.username.value, 
          uuID: data.user['uid'],
        };

      this.afs.collection('Users').add(newJourney).then( u => {
              this.newUser.ref = u;
      });
      //this.navigateToHomePage();
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  }
  navigateToHomePage(){
    this.navCtrl.push(HomePage);
  }

  navigateToLogin() {
    this.navCtrl.push(Login);
  }
}
