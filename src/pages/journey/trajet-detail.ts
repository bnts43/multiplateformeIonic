import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Toast } from 'ionic-angular';

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
  isBooked = false;
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
            .valueChanges().subscribe(u => {
              this.currentUser = u[0];
              this.currentUser.listReservedJourneys.forEach(j => {
                if (j == this.docRef) {
                  this.isBooked = true;
                }
              })
            });

  }
  reserve(){
    let toastSaving = this.createToast("sauvegarde en cours");
    let toastWait = this.createToast("veuillez patienter...");
    while (this.currentUser == null) {
      toastWait.present();
    };
    toastSaving.present();
    let toastSaved = this.createToast("sauvegarde réussie");
    
          let listJ = this.currentUser.listReservedJourneys;
          if (listJ != null) {
            if (listJ.findIndex(d => d == this.docRef) == -1) {
              console.log("ajout à la liste");
              listJ.push(this.docRef);
            } else {
              this.createToast("vous avez déjà réservé ce voyage").present();
            }
          } else {
            let newList : DocumentReference[] = [];
            newList.push(this.docRef);
            listJ = newList;
          }
          this.currentUser.listReservedJourneys = listJ;
          
          this.afs.doc<User>(this.currentUser.ref).update(this.currentUser).then(()=> {
            toastSaved.present();
          });


  }

  update() {
    let toastSaving = this.createToast("sauvegarde en cours");
    toastSaving.present();
    let toastSaved = this.createToast("sauvegarde réussie");
    this.journey.Date = Timestamp.fromDate(new Date(this.date));
    this.journeyDoc.update(this.journey).then(()=> {
      toastSaving.dismiss();
      toastSaved.present();
    });
  }

  delete() {
    this.navCtrl.push(HomePage).then(()=> this.journeyDoc.delete());
  }

  createToast(infoMessage: string) : Toast {
    let newtoast = this.toastCtrl.create({
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });
    newtoast.setMessage(infoMessage);
    return newtoast;
  }

  changeBookingStatus() {
    this.createToast("Non implémenté").present();
    this.isBooked != this.isBooked;
  }
}
