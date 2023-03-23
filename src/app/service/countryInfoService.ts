import axios from 'axios';
import logger from '../logger';
import * as dotenv from 'dotenv';
dotenv.config();
import endpoint from '../config';
import {Country} from '../models/countryModel';



export const getCountryInfo = async (countryName: string) => {
    const url = `${endpoint.COUNTRY_API}${countryName}?fullText=true`;
    let result = await axios.get(url)
    let countryData: Country[] = result.data;
    console.log(countryData);
    if (countryData) {
        logger.info(JSON.stringify(countryData[0]));
        return countryData[0];
    }
}