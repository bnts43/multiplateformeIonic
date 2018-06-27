import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AccountPage } from "./account/account";
import { HomePage } from "./home/home";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
    selector: 'header-nav',
    templateUrl: 'header.html'
  })
  export class HeaderNav {

    constructor(
            public navCtrl: NavController,
            private fireAuth:AngularFireAuth) {}

    AccountInfo() {
        this.navCtrl.push(AccountPage);
    }

    goToHomePage() {
        this.navCtrl.setRoot( HomePage );
        }

    userConnected() : boolean {
        if (this.fireAuth.auth.currentUser == null) {
            return false;
        } else {
            return true;
        }
    }
  }