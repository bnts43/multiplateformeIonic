import { Rating } from "./rating";
import { Vehicle } from "./vehicle";
import { Journey } from "./journey";

import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import { DocumentReference } from "angularfire2/firestore";

export class User {
    name: string;
    listRatings: Rating[];
    listVehicles: Vehicle[];
    listReservedJourneys : DocumentReference[];
    genre: string;
    date_naissance: Timestamp;
    email: string;
    uuID: string;
    ref: DocumentReference;
}