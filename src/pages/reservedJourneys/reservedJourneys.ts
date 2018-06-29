import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

import { map } from 'rxjs/operators';
import { TrajetDetail } from '../journey/trajet-detail';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from "firebase";
import { User } from "../../app/model/user";
import { Timestamp } from "rxjs/internal/operators/timestamp";


@Component({
    selector: 'page-reservedJourneys',
    templateUrl: 'reservedJourneys.html'
  })

  
  export class ReservedJourneys  {

    journeys: Journey[] = [];
    //private itemsCollection: AngularFirestoreCollection<Journey>;  
    private itemsCollection: AngularFirestoreCollection<User>;  
    private itemsJourneys: AngularFirestoreCollection<Journey>;  

    constructor(public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth) {
      
        this.afs
                .collection<User>("Users", 
                    u => u.where('uuID','==',this.fire.auth.currentUser.uid))
                .valueChanges()
                .subscribe(u => {
                    if (u[0].listReservedJourneys != null) {
                        u[0].listReservedJourneys.forEach(docRef => this.afs.doc<Journey>(docRef).valueChanges().subscribe(j => this.journeys.push(j)));
                    }
                });
      }
  }