export interface Location {
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime: string;
}

export interface Condition {
    text: string;
}

export interface Current {
    temp_c: number;
    temp_f: number;
    condition: Condition;
    humidity: number;
}

export interface CurrentWeather {
    location: Location;
    current: Current;
}