
export interface IWeatherData{
    city: ICity;
    ctn: number;
    cod: string;
    list: Array<IWeatherInfo>;
    message: number;
  }
  export interface ICity{
    coord: ICoord;
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
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  }

  export interface ICoord{
    lat: number;
    lon: number;
  }

  export interface IPollution{
    data: IPolutionData[];
    location: ICoord;
    time: string;

  }

  export interface IPolutionData{
    precision: number;
    pressure: number;
    value: number;
  }

  export interface ISingeCity{
    clouds: Object;
    coord: ICoordCity;
    dt: number;
    id: number;
    main: IMain;
    name: string;
    rain: Object;
    snow: Object;
    weather: Array<Object>;
    wind: Object;
  }

  export interface ICoordCity{
    Lat: number;
    Lon: number;
  }


