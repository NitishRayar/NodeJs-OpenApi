import {Current, Location} from './weatherModel'
import {Country} from './countryModel'
export interface ConsolidatedResponse{
    location: Location;
    weatherInfo: Current;
    countryInfo:Country;
}