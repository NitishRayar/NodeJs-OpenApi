import axios from 'axios';
import logger from '../logger';
import {CurrentWeather} from '../models/weatherModel';
import * as dotenv from 'dotenv';
dotenv.config();
import endpoint from '../config';


export const getCurrentWeather = async (city: string) => {
    const url = `${endpoint.WEATHER_API}?key=${endpoint.API_KEY}&q=${city}&aqi=no`;
    let result = await axios.get(url);
    console.log(result);
    let weatherData: CurrentWeather = result.data;
    console.log(weatherData);
    if (weatherData) {
        logger.info(JSON.stringify(weatherData));
        return weatherData;
    }
}
