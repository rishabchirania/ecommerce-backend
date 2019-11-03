const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use(cors());

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);

app.use('/api',productRoutes);

app.use('/api',braintreeRoutes);




mongoose.connect(  process.env.MONGO_URI,  {useNewUrlParser: true,useCreateindex: true}).then(() => console.log('DB Connected'));
 mongoose.connection.on('error', err => {  console.log(`DB connection error: ${err.message}`)});

const port = process.env.PORT || 8000;


app.listen(port,() =>{

    console.log('server is running ${port}');
});