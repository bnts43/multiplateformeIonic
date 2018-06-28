import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';
import { HomePage } from '../home/home';

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "../../app/model/user";

@Component({
  selector: 'page-trajet',
  templateUrl: 'trajet.html'
})
export class TrajetDetail {

  maxDate: string = moment('31/12/2019', 'DD/MM/YYYY').toISOString();
  private journeyDoc: AngularFirestoreDocument<Journey>;
  private oJourney: Observable<Journey>;
  private docRef: DocumentReference;
  journey: Journey = new Journey();
  journeyDate: Timestamp ;
  currentJourney: Journey;
  date: string;
  private currentUser : User;

  constructor(
          private afs: AngularFirestore,
          public navCtrl: NavController,
          public navParams: NavParams,
          private toastCtrl: ToastController ,
          private fire: AngularFireAuth) {
      this.journeyDate = this.navParams.get("dateJourney");
      if (this.journeyDate != null) 
      {
        this.date = moment(this.journeyDate.toDate(),"DD MMMM YYYY H:mm", 'fr').toISOString();
      } else {
        this.date = "";
      }
   
      this.docRef = this.navParams.get("docJourney");
      this.journeyDoc = this.afs.doc<Journey>(this.docRef);
      this.oJourney = this.journeyDoc.valueChanges();
      this.oJourney.subscribe((res) => this.journey = res);
      this.afs.collection<User>('Users', u => u.where('uuID','==',this.fire.auth.currentUser.uid))
            .valueChanges().subscribe(u => this.currentUser = u[0]);

  }
  reserve(){
    this.afs.collection<User>('Users', u => u.where('uuID','==',this.fire.auth.currentUser.uid))
        .valueChanges().subscribe(u => {
          this.currentUser = u[0];
          let listJ = this.currentUser.listReservedJourneys;
          if (listJ != null) {
              if (listJ.indexOf(this.docRef) < -1) {

                listJ.push(this.docRef);
              }
          } else {
            let newList : DocumentReference[] = [];
            newList.push(this.docRef);
            listJ = newList;
          }
          this.currentUser.listReservedJourneys = listJ;
          this.afs.doc<User>(this.currentUser.ref).update(this.currentUser);
        });
  }

  update() {

    this.journey.Date = Timestamp.fromDate(new Date(this.date));
    this.journeyDoc.update(this.journey);
  }

  delete() {
    this.navCtrl.push(HomePage).then(()=> this.journeyDoc.delete());
  }

}
