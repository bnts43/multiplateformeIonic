import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../app/model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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
      console.log('ionViewDidLoad LoginPage');
    }
  
    alert(message: string) {
      this.alertCtrl.create({
        title: 'Info!',
        subTitle: message,
        buttons: ['OK']
      }).present();
    }
  
    signInUser() {
      this.fire.auth.signInWithEmailAndPassword(this.username.value + '@domian.xta', this.password.value)
      .then( data => {
        console.log('got some data', this.fire.auth.currentUser);
        this.alert('Success! You\'re logged in');
        this.navCtrl.setRoot( HomePage );
        // user is logged in
      })
      .catch( error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
      console.log('Would sign in with ', this.username.value, this.password.value);
    }

}
