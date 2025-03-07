var createError = require('http-errors');
var express = require('express');
var mongo = require('mongoose');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { name } = require('ejs');

var app = express();

var port = process.env.PORT || 7000;
var mongoUrl = process.env.MONGO_URL

mongo.connect(mongoUrl).then(()=>{
    console.log('Database is connected');
    app.listen(port, ()=>{
        console.log(`Server is running at ${port}`);
    });
}).catch((error)=> console.log(error));

const userSchema = new mongo.Schema({
    name: String,
    age:Number
});

const UserModel = mongo.model("users", userSchema)

app.get("/getUsers", async(req, res)=>{
    const userData = await UserModel.find()
    res.json(userData)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/app.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app.listen(port, () => {
//     console.log('Server is running on port ' + port);
// });
