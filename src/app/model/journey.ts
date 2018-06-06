import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class Journey {
  Destination: string;
  Date: Timestamp;
  Depart: string;
  passengerNb: number;
  Status: string;
  passengerList: any;
  prix: number;
  driver: any;
}

export const JOURNEY_PATH = 'Journeys';