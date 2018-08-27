
export interface IWeatherData{
    city: ICity;
    ctn: number;
    cod: string;
    list: Array<IWeatherInfo>;
    message: number;
  }
  export interface ICity{
    coord: JSON;
    country: string;
    name: string;
    population: number;
  }
  export  interface IWeatherInfo{
    clouds: Object;
    dt: number;
    dt_txt: string;
    main: IMain;
    rain: Object;
    sys: Object;
    weather: Array<Object>;
    wind: Object;
  }
  export  interface IMain{
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  }