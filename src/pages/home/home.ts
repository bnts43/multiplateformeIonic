import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

import { map } from 'rxjs/operators';
import { TrajetDetail } from '../journey/trajet-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection<Journey>;
  
  journeys: Observable<Journey[]>;
 
  constructor(public navCtrl: NavController, afDB: AngularFirestore) {
    this.itemsCollection = afDB.collection<Journey>('Journeys');
    this.journeys = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Journey;
        const id = a.payload.doc.id;
        const ref = a.payload.doc.ref;

        return { id, ref, ...data };
      }))
    );
    this.journeys.subscribe( (j : Journey[] ) => j.forEach((i : any) => console.log(i)));
  }

  navigateToJourney(docJourney: Journey) {
    this.navCtrl.push(TrajetDetail,{'docJourney': docJourney})
  }

}
