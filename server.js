require('dotenv').config();
const express  = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/signup')
const rateLimit = require("express-rate-limit");
const morgan  = require('morgan');
const helmet = require('helmet');
const connectDB  =  require('./db')
const cors = require('cors')


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: { error: "Too many requests, please try again later." },
  headers: true, 
});





const app = express();


//middleware
app.use(cors())
app.use(helmet());
app.use(morgan('common'));
app.use(apiLimiter);
app.use(bodyParser.json());
app.use('/api',userRoute );

app.get('/',  (req,res) => {
  res.json({message : 'welcome to rohit server'});
})


const PORT = process.env.PORT ||  5000;

app.listen(PORT,  (req,res)=>{
        console.log('server is running at port no :', PORT);
})