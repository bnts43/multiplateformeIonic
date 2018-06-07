import { Journey } from "./journey";
import { User } from "firebase";

export class Rating {
  Journey: Journey;
  Author: User;
  Comment: String;
  Value: number;
}

export const JOURNEY_PATH = 'Journeys';
export const USERS_PATH = 'Users';