import { Rating } from "./rating";
import { Vehicle } from "./vehicle";

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import { DocumentReference } from "angularfire2/firestore";

export class User {
    name: string;
    listRatings: Rating[];
    listVehicles: Vehicle[];
    genre: string;
    date_naissance: Timestamp;
    email: string;
    uuID: string;
    ref: DocumentReference;
}