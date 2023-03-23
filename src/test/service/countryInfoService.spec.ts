import axios from 'axios';
import countryData from '../data/countryData.json'
import  {getCountryInfo} from '../../app/service/countryInfoService'
import * as dotenv from 'dotenv';
dotenv.config();
import endpoint from '../../app/config';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios call to get Country info',()=>{
    test('getCountryInfo', ()=>{
        const result ={
            data:[countryData]
        }
        mockedAxios.get.mockResolvedValue(result);
        getCountryInfo("India").then((data)=>{
            expect(data?.name).toEqual("India")
        });
        
    })
})