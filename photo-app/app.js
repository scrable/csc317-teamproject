



var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

app.get('/', function (req, res) {
    res.send('hello world')
});

app.get('/login', function (req, res) {
    res.sendFile((__dirname + '/public/login.html'));
});

app.post('/login',login.login);

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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.listen(5000);

module.exports = app;