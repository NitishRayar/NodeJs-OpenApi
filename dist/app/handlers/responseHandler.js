"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (weatherData, countryData) => {
    const result = {
        location: {
            name: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.country,
            tz_id: weatherData.location.tz_id,
            localtime: weatherData.location.localtime
        },
        weatherInfo: {
            temp_c: weatherData.current.temp_c,
            temp_f: weatherData.current.temp_f,
            condition: weatherData.current.condition,
            humidity: weatherData.current.humidity
        },
        countryInfo: {
            name: countryData.name,
            capital: countryData.capital,
            subregion: countryData.subregion,
            region: countryData.region,
            population: countryData.population,
            currencies: countryData.currencies
        }
    };
    return result;
};
exports.responseHandler = responseHandler;
