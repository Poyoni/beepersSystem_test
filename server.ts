import  express, { Application }  from "express";
import  authRoute from './routes/auth.js';

const PORT: number = 3000;

const app: Application = express();

app.use(express.json())

app.use('/',authRoute);

app.listen(PORT,() =>{console.log('server is on')})