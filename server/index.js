import express from 'express'
import router  from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import dotenv from 'dotenv'
const app = express();

const PORT = 'https://filepilot.onrender.com';
dotenv.config();
app.use(cors());
app.use('/',router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

DBConnection(USERNAME,PASSWORD);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
