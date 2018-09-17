import { PollutionData } from "./pollution-data.model";
import { Coordinates } from "./coordinates.model";

export class Pollution {
    data: PollutionData[];
    location: Coordinates;
    time: string;
}
