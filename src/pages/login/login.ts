import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';

import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  
    @ViewChild('username') username;
    @ViewChild('password') password;

    constructor(
        private fire:AngularFireAuth,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private toastCtrl: ToastController) { }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad Login');
      if (this.fire.auth.currentUser != null) {
        this.navCtrl.setRoot( HomePage );
      }

    }
  
    alert(message: string) {

      this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top',
        showCloseButton: true
      }).present();
    }
  
    signInUser() {      
      this.fire.auth.signInWithEmailAndPassword(this.username.value , this.password.value)
      .then( data => {
        this.alert('Connexion réussie :)');
        this.navCtrl.setRoot( HomePage );
        // user is logged in
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
    }
    navigateToSignup(){
      this.navCtrl.push(Signup)
    }

}
