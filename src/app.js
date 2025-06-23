const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')

// express instance 
const app = express();

app.use(cookieParser())   // reading cookies
app.use(express.json())   // converting json to js

const allowedOrigins = [`${process.env.FRONTEND_URL}`]

// cross-origin resource sharing middleware for strict origin
app.use(cors({
    origin : function(origin,callback){
        if(!origin) return callback(null,true)     // postman doesn't have origin
        if(allowedOrigins.includes(origin)){
            return callback(null,true)
        }else{
            return callback(null,false)  // or callback(new Error("this origin has no access")) Throwing new-error
        }
    },
    credentials : true
}))

// for routes
app.get('/',(req,res)=>{
    res.json("Hello world")
})
app.use('/auth', authRoutes)


module.exports = app;