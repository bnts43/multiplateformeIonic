import { Rating } from "./rating";
import { Vehicle } from "./vehicle";

export class User {
    name: string;
    listRatings: Rating[];
    listVehicles: Vehicle[];
}