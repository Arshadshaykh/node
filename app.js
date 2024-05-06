const http = require('http');

const bodyParser = require('body-parser')
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const DB = require('./config/db')
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });
DB();
const logger = require('./middleware/logger');
app.use(express.json());
app.use(logger);


app.use(process.env.BASE_URL, require("./routes/adminRoute"),errorHandler);
app.use(process.env.BASE_URL, require("./routes/user"),errorHandler);
// app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, '192.168.0.181', console.log(`Server running on PORT ${process.env.PORT}`));
