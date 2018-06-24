import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

import { map } from 'rxjs/operators';
import { TrajetDetail } from '../journey/trajet-detail';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection<Journey>;
  email: string;
  
  journeys: Observable<Journey[]>;
 
  constructor(public navCtrl: NavController, afDB: AngularFirestore, private fire: AngularFireAuth) {
    this.itemsCollection = afDB.collection<Journey>('Journeys');
    this.journeys = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Journey;
        const id = a.payload.doc.id;
        const ref = a.payload.doc.ref;

        return { id, ref, ...data };
      }))
    );
    //this.journeys.subscribe( (j : Journey[] ) => j.forEach((i : any) => console.log(i)));
    this.email = this.fire.auth.currentUser.email;
  }

  navigateToJourney(journeyDocRef?: DocumentReference) {
    if (journeyDocRef == null) {
      let newJourney:any = {Depart:'Adresse de départ',Destination:'Adresse de destination'};
      
      this.itemsCollection.add(newJourney).then((newJourneyRef) => 
      { 
        journeyDocRef=newJourneyRef;
        this.navCtrl.push(TrajetDetail,{'docJourney': journeyDocRef})
      });
    } else {
      this.navCtrl.push(TrajetDetail,{'docJourney': journeyDocRef})
    }
  }
}
