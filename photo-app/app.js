



var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

var Users = [];

app.get('/registration', function(req, res){
    res.sendFile((__dirname + '/public/registration.html'));
});

app.post('/registration', function(req, res){
    if(!req.body.username || !req.body.inputpsw || !req.body.email){
        res.status("400");
        res.send("Invalid details!");
    } else {
        Users.filter(function(user){
            if(user.id === req.body.id){
                res.sendFile((__dirname + '/public/registration.html'), {
                    message: "User Already Exists! Login or choose another user id"});
            }
        });
        var newUser = {username: req.body.username, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;

        res.sendfile((__dirname + '/public/homePage.html'));
    }
});
function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    }
    else next();
    // else {
    //     var err = new Error("Not logged in!");
    //     console.log(req.session.user);
    //     next(err);  //Error, trying to access unauthorized page!
    // }
}
app.get('/homePage', checkSignIn, function(req, res){
    res.sendfile((__dirname + '/public/homePage.html'))
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res){
    console.log(Users);
    if(!req.body.username || !req.body.password){
        res.render('login', {message: "Please enter both id and password"});
    } else {
        Users.filter(function(user){
            if(user.username === req.body.username && user.password === req.body.password){
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {message: "Invalid credentials!"});
    }
});

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
    console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('/login');
});

// app.get('/', function (req, res) {
//     res.cookie('name', 'express').send('cookie set');
// });
//
// app.get('/login', function (req, res) {
//     res.sendFile((__dirname + '/public/login.html'));
// });
//
// app.get('/registration', function (req, res) {
//     res.sendFile((__dirname + '/public/registration.html'));
// });
//
// app.post('/login',login.login);
//
//
//
// app.post('/registration',login.registration);

// test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });
// router.get('/login', function(req, res){
//     res.json({ message: 'asdf' });
// });
//route to handle user registration
// router.post('/registration',login.register);

app.use('/login', router);
app.use('/registration', router);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.listen(5000);

module.exports = app;