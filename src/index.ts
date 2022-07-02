import express from 'express';
import { AppDataSource } from './data-source';
import { router } from './routes';

const app = express();
const PORT = 3000;

AppDataSource.initialize().then(() => {
    console.log("Initializing typeorm with postgres");
}).catch(console.error);

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log('Server working on the port 3000 (http://localhost:3000)')
})