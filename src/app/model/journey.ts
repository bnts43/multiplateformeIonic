import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import { User } from "./user";

export class Journey {
  Destination: string;
  Date: Timestamp;
  Depart: string;
  passengerNb: number;
  Status: string;
  passengerList: User[];
  prix: number;
  driver: any;
}

export const JOURNEY_PATH = 'Journeys';