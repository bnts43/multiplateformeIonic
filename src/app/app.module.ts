import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { Signup } from '../pages/signup/signup';
import { TrajetDetail } from '../pages/journey/trajet-detail';
import { Login } from '../pages/login/login';
import { MomentModule } from 'angular2-moment';
import { ReservedJourneys } from '../pages/reservedJourneys/reservedJourneys';
import { AccountPage } from '../pages/account/account';
import { HeaderNav } from '../pages/header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrajetDetail,
    AccountPage,
    Login,
    ReservedJourneys,
    HeaderNav,
    Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['janvier', 'février', 'mars', 'avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre' ],
      monthShortNames: ['jan', 'fev', 'mar', 'avr','mai','jun','jul','aou','sep','oct','nov','dec' ],
      dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi','jeudi','vendredi','samedi' ],
      dayShortNames: ['dim', 'lun', 'mar', 'mer','jeu','ven','sam' ],
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrajetDetail,
    Login,
    ReservedJourneys,
    AccountPage,
    HeaderNav,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFirestore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
