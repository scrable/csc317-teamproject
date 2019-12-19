
var express    = require("express");
var login = require('./routes/loginroutes');
var postimage = require('./routes/postimage');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
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
app.use(fileUpload());

app.get('/', function (req, res) {
    res.sendFile((__dirname + '/public/homePage.html'));
});

app.get('/login.html', checkLogin, function (req, res, next) {
    res.sendFile((__dirname + '/public/login.html'));
});

app.get('/registration.html', checkRegistration, function(req, res) {
    res.sendFile((__dirname + '/public/registration.html'))
});

app.get('/logout.html', checkLogout, function (req, res) {
    res.sendFile((__dirname + '/public/logout.html'))
});

function checkLogin(req, res, next){
    if(!req.session.user){
        next();
    } else {
        var err = new Error("Already logged in");
        next(err);
    }
}

function checkSignIn(req, res, next){
    console.log("checksignin " + req.session.id);
    if(req.session.user){
        next();
    } else {
        var err = new Error("Not logged in");
        next(err);
    }
}

function checkRegistration(req, res, next){
    if(!req.session.user){
        next();
    } else {
        var err = new Error("Already registered user");
        next(err);
    }
}
function checkLogout(req, res, next){
    if(req.session.user){
        req.session.destroy();
        res.redirect('/homePage.html');
    } else {
        var err = new Error("Not logged in");
        next(err);
    }
}

app.get('/postImage.html', checkSignIn, function(req, res){
    res.sendFile((__dirname + '/public/postImage.html'), {id: req.session.user.id})
});

app.get('/homePage.html', function (req, res){
    res.sendFile(__dirname + '/public/homePage.html')
});

app.post('/login.html', login.login);//(req, res)  => {

app.post('/registration.html', login.registration);

app.post('/postImage.html', postimage.postimage);

app.use('/login.html', function(err, req, res, next){
    console.log(err);
    //redirect if logged in
    res.redirect('/homePage.html');
});

app.use('/registration.html', function(err, req, res, next){
    console.log(err);
    //redirect if logged in
    res.redirect('/login.html');
});

app.use('/postImage.html', function(err, req, res, next){
    console.log(err);
    //redirect if not logged in
    res.redirect('/login.html');
});

app.use('/logout.html', function(err, req, res, next){
   console.log(err);
   //redirect
    res.redirect('/homePage.html');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(5000);

module.exports = app;