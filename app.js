const http = require('http');

const bodyParser=require('body-parser')
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const DB=require('./config/db')

dotenv.config({path: './config/config.env'});
DB();
const logger = require('./middleware/logger');
app.use(logger);
app.use('/api/v1/Arshad',require("./routes/admin"));

const PORT=process.env.PORT ||5000;
app.listen(PORT,'192.168.0.134',console.log(`Server running on PORT ${process.env.PORT}`));
