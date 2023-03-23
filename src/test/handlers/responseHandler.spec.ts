import weatherData from '../data/weatherData.json'
import countryData from '../data/countryData.json'
import {responseHandler} from '../../app/handlers/responseHandler'



describe('Axios call to get Country info',()=>{
    test('getCountryInfo', ()=>{
        const result = responseHandler(weatherData,countryData);
        expect(result.location.country).toEqual("India")
        
    })
})