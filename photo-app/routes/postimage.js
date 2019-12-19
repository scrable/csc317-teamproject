var mysql      = require('mysql');

var path = require('path');

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
    var filePathTime =  "" + date.getMonth() + date.getFullYear() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + req.files.img.name;
    var imageInfo = {
        "title":req.body.title,
        "description":req.body.description,
        "fk_userid":req.session.user,
        "active":"1",
        "photopath": "/public/images/" + filePathTime,
    };
    var file = req.files.img;

    console.log(__dirname);
    file.mv(path.resolve(__dirname, '..')+'/public/images/' + filePathTime);
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