const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//DB Connection
const Connection = async () => {
    try {   
        await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}
Connection();

//imported Routes
const newsRoute = require('./routes/news');
const authRoute = require('./routes/admin/auth');
const categoryRoute = require('./routes/category');
// const DefaultData = require('./default.js');

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api', newsRoute);
app.use('/api',authRoute);
app.use('/api',categoryRoute);

//starting a server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


