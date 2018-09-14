import { ICity, IWeatherInfo } from "./weatherdata";

export class WeatherData {
  city: ICity;
  ctn: number;
  cod: string;
  list: Array<IWeatherInfo>;
  message: number;
}
