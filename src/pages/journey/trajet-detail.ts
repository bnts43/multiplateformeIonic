import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

@Component({
  selector: 'page-trajet',
  templateUrl: 'trajet.html'
})
export class TrajetDetail {
  private journeyDoc: AngularFirestoreDocument<Journey>;
  private oJourney: Observable<Journey>;
  private docRef: DocumentReference;
  journey: Journey = new Journey();

  constructor(
          private afs: AngularFirestore,
          public navCtrl: NavController,
          public navParams: NavParams  ) {
      this.docRef = this.navParams.get("docJourney");

      this.journeyDoc = this.afs.doc<Journey>(this.docRef);
      this.oJourney = this.journeyDoc.valueChanges();
      this.oJourney.subscribe((res) => 
      {
        console.log(res);
        this.journey = res;
      });
  } 
  update() {
    this.journeyDoc.update(this.journey);
  }

  delete() {
    this.journeyDoc.delete();
  }

}
