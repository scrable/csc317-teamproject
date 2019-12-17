var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'csc317db'
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.postimage = function (req, res, next){
   // console.log(res.body.description);
    console.log(req.session.user);
    var date = new Date();
    var imageInfo = {
        "title":req.body.title,
        "description":req.body.description,
        "fk_userid":req.session.user,
        "active":"1",
        "photopath": "/public/images/" + date.getMonth() + date.getFullYear() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + req.body.img,
    };
    connection.query('INSERT INTO imageposts SET ?;', imageInfo, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
        }else{
            console.log('The solution is: ', results);
        }
    });


    console.log("image sent");
    res.redirect('/homePage.html');
};