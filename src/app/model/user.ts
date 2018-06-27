import { Rating } from "./rating";
import { Vehicle } from "./vehicle";
import { Journey } from "./journey";

export class User {
    authid:string
    name: string;
    listRatings: Rating[];
    listVehicles: Vehicle[];
    listReservedJourneys : Journey[];
}