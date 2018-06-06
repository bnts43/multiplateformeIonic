import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class FireStoreService {

    private db : any;

    constructor() {
        this.db = firebase.firestore();
    }

    getCollectionDocuments(collection: string) : Observable<any[]> {
        return this.db.collection(collection).valueChanges();
    }

    
}
