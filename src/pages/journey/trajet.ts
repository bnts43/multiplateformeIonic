import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

@Component({
  selector: 'page-trajet',
  templateUrl: 'trajet.html'
})
export class Trajet {
  private journeyDoc: AngularFirestoreDocument<Journey>;
  journey: Observable<Journey>;
  id: string = "9H59Q47QIFnwXVrnCyHN";
  constructor(private afs: AngularFirestore) {
          this.journeyDoc = afs.doc<Journey>('Journeys/'+this.id);
          this.journey = this.journeyDoc.valueChanges();
  }
  update(j: Journey) {
    this.journeyDoc.update(j);
  }

}
