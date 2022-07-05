import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import 'express-async-errors';
import { router } from './routes';
import { handleErrorMiddleware } from './utils/errors/Errors';


const app = express();
const PORT = 3000;

AppDataSource.initialize().then(() => {
    console.log("Initializing typeorm with postgres");
}).catch(console.error);

app.use(express.json());
app.use(router);

app.use(handleErrorMiddleware)

app.listen(PORT, () => {
    console.log('Server working on the port 3000 (http://localhost:3000)')
})