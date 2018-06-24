import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  
    @ViewChild('username') username;
    @ViewChild('password') password;

    constructor(private alertCtrl: AlertController, private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad Login');
    }
  
    alert(message: string) {
      this.alertCtrl.create({
        title: 'Bienvenue !',
        subTitle: message,
        buttons: ['OK']
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
