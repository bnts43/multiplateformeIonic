import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import { map } from 'rxjs/operators';

import { User } from "../../app/model/user";
import { HomePage } from "../home/home";
import { TrajetDetail } from "../journey/trajet-detail";


@Component({
    selector: 'page-reservedJourneys',
    templateUrl: 'reservedJourneys.html'
  })

  
  export class ReservedJourneys  {

    journeys: Journey[] = [];
    currentUser: User;

    constructor(public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth) {
        this.afs
        .collection<User>("Users", 
            u => u.where('uuID','==',this.fire.auth.currentUser.uid))
        .valueChanges()
        .subscribe(u => {
            this.currentUser = u[0];
            this.updateJourneyList();
        });
      }

      displayAllJourneys() {
        this.navCtrl.push(HomePage);
      }

      navigateToJourney(journeyDocRef?: DocumentReference, journeyDate?: Timestamp) {
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
    
      updateJourneyList() {
        if (this.currentUser.listReservedJourneys != null) {
            this.currentUser.listReservedJourneys
                    .forEach(docRef => 
                        this.afs.doc<Journey>(docRef)
                                .snapshotChanges()
                                    .pipe(
                                        map(actions => {
                                            const data = actions.payload.data() as Journey;
                                            const docRef = actions.payload.ref;
                                            let dateION: string;
                                            if (data.Date != null) {
                                              dateION = moment(data.Date.toDate()).format("DD/MM/YY H:mm");
                                            } else {
                                              dateION = '';
                                            }
                                    
                                            return { docRef, dateION, ...data };
                                        })
                                    )
                                    .subscribe(j => this.journeys.push(j))
                    );
        }
    }
}
