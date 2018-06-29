import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../app/model/user';

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import { Login } from '../login/login';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
    private userDoc: AngularFirestoreDocument<User>;
    private authUser: firebase.User;
    user: User = new User();
    birthDate: string;
    constructor(
      private afs: AngularFirestore,
      public navCtrl: NavController,
      public navParams: NavParams,
      private toastCtrl: ToastController,  private fireAuth: AngularFireAuth ) {
        this.authUser = this.fireAuth.auth.currentUser;

        if (this.authUser != null) 
        {
          this.afs
                .collection<User>("Users", 
                    u => u.where('uuID','==',this.authUser.uid))
                .valueChanges()
                .subscribe(u => {
                    this.user = u[0];
                    if (this.user.date_naissance) {
                      this.birthDate = moment(this.user.date_naissance.toDate()).toISOString();
                    } else {
                    this.birthDate = '';
                    }
                });
        this.userDoc = this.afs.doc<User>(this.user.ref);
       }
      }

      logout() {
        this.fireAuth.auth.signOut().then(()=> 
          { this.navCtrl.setRoot( Login );
            this.navCtrl.popToRoot();
          });
        ;
      }
      
      alert(message: string) {

        this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top',
          showCloseButton: true
        }).present();
      }

      update() {
        this.user.date_naissance = Timestamp.fromDate(new Date(this.birthDate));
        this.userDoc.update(this.user);
      }
      isCurrentUser() : boolean {
        if (this.authUser.uid == this.user.uuID) {
            return true;
        } else {
          return false;
        }
      }
}
