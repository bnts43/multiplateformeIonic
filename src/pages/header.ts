import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AccountPage } from "./account/account";

@Component({
    selector: 'header-nav',
    templateUrl: 'header.html'
  })
  export class HeaderNav {

    constructor(public navCtrl: NavController) {
        
    }

    AccountInfo() {
        this.navCtrl.push(AccountPage);
    }

  }