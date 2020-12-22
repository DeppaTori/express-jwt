require('dotenv/config');
const express = require('express');
const app = express();
var passport = require('passport');
require('./config/passport');
const mongoose = require('mongoose');
const apiRouter = require('./routes/index');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/// model definition here
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true })
.then(()=>console.log("Connected to database"))
.catch(err=>console.log(err.message));

app.use(passport.initialize());

app.use((err,req,res,next)=>{
    if(err.name==='UnauthorizedErro'){
        res.status(401);
        res.json({
            message:`${err.name}: ${err.message}`
        });
    }
});

app.get('/',(req,res)=>{
    res.json({
        message:'Hello'
    });
});

app.use('/api',apiRouter);

app.listen(3000,()=>{
    console.log('App started on 3000');
});