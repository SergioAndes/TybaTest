const express = require('express')
const bodyParser = require('body-parser')
const app =express()
const mongoose = require('mongoose')
const authRoutes =require('./routes/auth')
const restaurantRoutes =require('./routes/restaurant')
const path = require('path')
require('dotenv').config();

const mongoConn = process.env.MONGO_CONN; //"foobar"
///const { v4: uuidv4 } = require('uuid');


//parseador de Json para toda la app
app.use(bodyParser.json())

//midellware para toda la app, para aceptar headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next();
});

//rutas
app.use('/user',authRoutes)
app.use('/restaurant',restaurantRoutes)

//custom error message para toda la app
app.use((error,req,res,next)=>{
    //console.log(error)
    const status = error.statusCode
    const message = error.message;
    const data = error.data
    res.status(status).json({
        message:message,
        data:data
    })
})

//conexion a la db e inicializaicion del server
mongoose.connect(mongoConn)
    .then(result =>{
    app.listen(3000)
    console.log("listening in 3000")
})
.catch(err=>
    {
        console.log(err)
    })

module.exports=app