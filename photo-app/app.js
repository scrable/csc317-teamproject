
var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
var router = express.Router();

app.use(session({secret: 'greetings', saveUninitialized: false, resave: true,
    cookie:{maxAge: 60000000, httpOnly: true, secure: false}}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile((__dirname + '/public/homePage.html'));
});

app.get('/login', function (req, res, next) {
    if(!req.session.user) {
        res.sendFile((__dirname + '/public/login.html'));
    }
    else res.sendFile((__dirname + '/public/homePage.html'));
});

app.get('/registration', function (req, res) {
    res.sendFile((__dirname + '/public/registration.html'));
});

function checkSignIn(req, res, next){
    console.log("checksignin " + req.session.id);
    if(req.session.user){
        next();
    } else {
        var err = new Error("Not logged in");
        next(err);
    }
}

app.get('/postImage', checkSignIn, function(req, res){
    res.sendFile((__dirname + '/public/postImage.html'), {id: req.session.user.id})
});

app.get('/homePage', function (req, res){
    res.sendFile(__dirname + '/public/homePage.html')
});

app.post('/login', login.login);//(req, res)  => {

app.post('/registration',login.registration);

app.use('/registration', router);

app.use('/postImage', function(err, req, res, next){
    console.log(err);
    //redirect if not logged in
    res.redirect('/login');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use('/users', usersRouter);

app.listen(5000);

module.exports = app;