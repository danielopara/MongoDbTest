const express= require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

//Routes
const userRoutes = require('./api/routes/user')


mongoose.connect('mongodb+srv://root:root@test-daniel.pzticlh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000, 
}).then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform database operations here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//techs
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//cors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    if(req.method === "OPTIONS"){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json({})
    }
})

app.use('/users', userRoutes);

app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;