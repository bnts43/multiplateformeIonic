import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import { User } from "./user";
import { DocumentReference } from "angularfire2/firestore";

export class Journey {
  Destination: string;
  Date: Timestamp;
  Depart: string;
  passengerNb: number;
  Status: string;
  passengerList: User[];
  prix: number;
  driver: any;
  id: string;
  ref: DocumentReference;
}

export const JOURNEY_PATH = 'Journeys';