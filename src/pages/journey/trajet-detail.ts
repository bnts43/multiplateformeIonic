import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
 ) {
      this.journeyDate = this.navParams.get("dateJourney");
      if (this.journeyDate != null) 
      {
        this.date = moment(new Date(this.journeyDate.toDate.apply(this.journeyDate))).format("DD MMMM YYYY H:mm");
      } else {
        this.date = "";
      }
   
      this.docRef = this.navParams.get("docJourney");
      this.journeyDoc = this.afs.doc<Journey>(this.docRef);
      this.oJourney = this.journeyDoc.valueChanges();
      this.oJourney.subscribe((res) => this.journey = res);
  }


  update() {
    this.journey.Date = Timestamp.fromDate(new Date(this.date));
    this.journeyDoc.update(this.journey);
  }

  delete() {
    this.navCtrl.push(HomePage).then(()=> this.journeyDoc.delete());
  }

}
