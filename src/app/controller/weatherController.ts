import { Request, Response, NextFunction } from "express";
import {getCurrentWeather} from '../service/weatherReportService';
import {getCountryInfo} from '../service/countryInfoService'
import {responseHandler} from '../handlers/responseHandler'
import { Error } from "../models/error";
import { validationResult } from "express-validator";
import logger from "../logger";

type QueryParams = { city: string };



export const getWeatherAndCountryInfo = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.query as QueryParams;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(errors.array()[0].msg)
    const err: Error = {
      status: 422,
      message: errors.array()[0].msg
    }
    return next(err);
  }
  
  try {
    const weatherResponse = await getCurrentWeather(params.city)
    if(weatherResponse){
      const countryResponse = await getCountryInfo(weatherResponse.location.country)
      if(countryResponse){
        const result = responseHandler(weatherResponse,countryResponse);
        
        logger.info(JSON.stringify(result));
        res.status(200).json(result);
      }
    }
  } catch (error:any) {
    console.log(error);
    logger.error(error)
     const err: Error ={
      status: error.response.status,
      message: 'Invalid City Name'
     } 
     return next(err)
  }
}

 
  
  
  
  