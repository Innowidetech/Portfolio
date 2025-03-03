const mongoose = require('mongoose');
const cors = require('cors')
var express = require('express');
var cookieParser = require('cookie-parser');
require('dotenv').config()


const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');


var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`Server is running at port ${port}`)
});

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log('Connected to database.')})
.catch((err)=>{console.log('Error', err)})


module.exports = app;
