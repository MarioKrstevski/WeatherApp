import { Main } from "./main.model";

export class WeatherInfo {
    name: string;
    clouds: Object;
    dt: number;
    dt_txt: string;
    main: Main;
    rain: Object;
    sys: Object;
    weather: Array<Object>;
    wind: Object;
}
