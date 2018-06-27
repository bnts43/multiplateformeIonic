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


@Component({
    selector: 'page-reservedJourneys',
    templateUrl: 'reservedJourneys.html'
  })

  
  export class ReservedJourneys {
    
    journeys: Journey[];

    constructor(public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth) {
        // recuperer la liste des journeys reservé et les afficher 
        let userRef = this.afs.collection<User>('users', u => u.where('uuID', '==', this.fire.auth.currentUser.uid));
        //userRef.valueChanges().subscribe(u=> this.journeys = u[0].listReservedJourneys);
      }
  }