
var express    = require("express");
var login = require('./routes/loginroutes');
var postimage = require('./routes/postimage');
var home = require('./routes/home');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
var session = require('express-session');
var router = express.Router();
global["isLoggedIn"] = false;

mysql = require('mysql');
global["connection"] = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'csc317db'
});
global["connection"].connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
    home.list(req, res);
});

app.get('/login.html', checkLogin, function (req, res, next) {
    res.render('login', {isLoggedIn: isLoggedIn});
});

app.get('/registration.html', checkRegistration, function(req, res, next) {
    res.render('registration', {isLoggedIn: isLoggedIn});
});

app.get('/logout.html', checkLogout, function (req, res) {
    isLoggedIn = false;
    res.render('logout', {isLoggedIn: isLoggedIn});

});

app.get('/postImage.html', checkSignIn, function(req, res){
    res.render('postImage', {isLoggedIn: isLoggedIn});
});

app.get('/homePage.html', function(req, res) {
    if(req.session.user){
        isLoggedIn = true;
    }
    else isLoggedIn = false;
    connection.query('SELECT * FROM `csc317db`.`imageposts`;',function(err,rows){
        if(err)
            console.log("Error Selecting : %s ",err );
        res.render('homePage',{page_title:"Test Table",data:rows, isLoggedIn: isLoggedIn});
    });
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

//get all alternates without html to redirect to with

app.get('/homePage', function(req, res) {
    res.redirect('/homePage.html');
});

app.get('/login', function(req, res) {
    res.redirect('/login.html');
});

app.get('/logout', function(req, res) {
    res.redirect('/logout.html');
});

app.get('/registration', function(req, res) {
    res.redirect('/registration.html');
});

app.get('/postImage', function(req, res) {
    res.redirect('/postImage.html');
});

//get some posts
app.post('/login.html', login.login);//(req, res)  => {

app.post('/registration.html', login.registration, login.login);

app.post('/postImage.html', postimage.postimage);

app.use('/login.html', function(err, req, res, next){
    console.log(err);
    //redirect if logged in
    res.redirect('/homePage.html');
});

app.use('/registration.html', function(err, req, res, next){
    console.log(err);
    console.log("im here");
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