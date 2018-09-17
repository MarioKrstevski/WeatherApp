import { CityCoordinates } from "./city-coordinates.model";
import { Main } from "./main.model";

export class SingleCity {
    clouds: Object;
    coord: CityCoordinates;
    dt: number;
    id: number;
    main: Main;
    name: string;
    rain: Object;
    snow: Object;
    weather: Array<Object>;
    wind: Object;
}
