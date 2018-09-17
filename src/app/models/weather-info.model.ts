import { Main } from "./main.model";

 export class WeatherInfo {
    clouds: Object;
    dt: number;
    dt_txt: string;
    main: Main;
    rain: Object;
    sys: Object;
    weather: Array<Object>;
    wind: Object;
}