import { City } from "./city.model";
import { WeatherInfo } from "./weather-info.model";

export class WeatherData {
    city: City;
    ctn: number;
    cod: string;
    list: Array<WeatherInfo>;
    message: number;
}
