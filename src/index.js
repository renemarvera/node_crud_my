const express   = require('express');
const mysql     = require('mysql');
const myconn    = require('express-myconnection');
require('dotenv').config();

const app   = express();
const port  = process.env.APP_PORT || 9000;

const booksRoutes = require('./routes/book')

const dbOptions = 
{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}


// Middlewares
app.use(express.json()); // NO OLVIDAR
app.use(
    myconn(mysql,dbOptions,'single')
);

// Routes

app.use('/api',booksRoutes);
app.get(
    '/',
    (req,res) =>  res.send('Hello world!')
);

app.listen(
    port,
    () => console.log('server listening on port',port)
);