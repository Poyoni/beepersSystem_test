import express from "express";
import authRoute from './routes/auth.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use('/', authRoute);
app.listen(PORT, () => { console.log('server is on'); });
