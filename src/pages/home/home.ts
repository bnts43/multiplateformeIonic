import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

import { map } from 'rxjs/operators';
import { TrajetDetail } from '../journey/trajet-detail';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import * as moment from 'moment';
import { User } from '../../app/model/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private itemsCollection: AngularFirestoreCollection<Journey>;  
  journeys: Observable<Journey[]>;
  currentUser: User;
 
  constructor(public navCtrl: NavController, afDB: AngularFirestore, private fire: AngularFireAuth) {
    if (this.fire.auth.currentUser != null) {
        afDB
            .collection<User>("Users", 
                u => u.where('uuID','==',this.fire.auth.currentUser.uid))
            .valueChanges()
            .subscribe(u => {
                this.currentUser = u[0];
                this.itemsCollection = afDB.collection<Journey>('Journeys', j => j.where('ownerId','==',this.currentUser.uuID));
                this.journeys = this.itemsCollection.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Journey;
                    const id = a.payload.doc.id;
                    const ref = a.payload.doc.ref;
                    let dateION: string;
                    if (data.Date != null) {
                      dateION = moment(data.Date.toDate()).format("DD/MM/YY H:mm");
                    } else {
                      dateION = '';
                    }
            
                    return { id, ref, dateION, ...data };
                  }))
                );
            });
        console.log(this.currentUser);
       
    } else {
      this.itemsCollection = afDB.collection<Journey>('Journeys');
    }
    
  }

  navigateToJourney(journeyDocRef?: DocumentReference, journeyDate?: Timestamp) {
    if (journeyDocRef == null) {
      let newJourney:any = {
          Depart:'',
          Destination:'', 
          ownerId:this.fire.auth.currentUser.uid,
          Date: firebase.firestore.FieldValue.serverTimestamp()
        };
      
      this.itemsCollection.add(newJourney).then((newJourneyRef) => 
      { 
        journeyDocRef=newJourneyRef;
        this.navCtrl
            .push(TrajetDetail,{'docJourney': journeyDocRef})
            .catch(e => this.itemsCollection.doc(newJourneyRef.path).delete())
      });
    } else {
      if (journeyDate != null || (journeyDocRef != null && journeyDate == null))
        {
          if (journeyDate == null)
          {
            journeyDate = Timestamp.fromDate(new Date(Date.now()));
          }
        this.navCtrl.push(TrajetDetail,
            {
                'docJourney': journeyDocRef,
                'dateJourney': journeyDate
            });
        }
    }
  }
}
