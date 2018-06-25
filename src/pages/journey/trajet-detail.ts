import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';
import { HomePage } from '../home/home';

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import * as moment from 'moment';


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
  date: string;

  constructor(
          private afs: AngularFirestore,
          public navCtrl: NavController,
          public navParams: NavParams,
          private toastCtrl: ToastController ) {
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
  }


  update() {
    let toastSaving = this.toastCtrl.create({
      message: "sauvegarde en cours",
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });
    toastSaving.present();
    let toastSaved = this.toastCtrl.create({
      message: "sauvegarde réussie",
      duration: 2000,
      position: 'top',
      showCloseButton: true
    });
    this.journey.Date = Timestamp.fromDate(new Date(this.date));
    this.journeyDoc.update(this.journey).then(()=> {
      toastSaving.dismiss();
      toastSaved.present();
    });
  }

  delete() {
    this.navCtrl.push(HomePage).then(()=> this.journeyDoc.delete());
  }

}
