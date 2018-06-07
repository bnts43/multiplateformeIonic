import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Journey } from '../../app/model/journey';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  journeys: Observable<Journey[]>;

  constructor(public navCtrl: NavController, afDB: AngularFirestore) {
    this.journeys = afDB.collection('Journeys').valueChanges()
                        .pipe((value : Observable<Journey[]>) => value);
    this.journeys.subscribe( (j : Journey[] ) => j.forEach((i : any) => console.log(i)));
  }

}
