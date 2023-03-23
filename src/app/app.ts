import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import weatherRoute  from './routes/weatherRoutes';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from './swagger-config.json'
import { Error } from './models/error';

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(bodyParser.json())
app.use(weatherRoute);

app.use((error:Error, req: Request, res: Response, next :NextFunction) => {
    const status = error.status;
    const message = error.message;
    res.status(status).json({message:message});
   
})

app.listen(3000,()=>{
    console.log('server started');
})
export default app