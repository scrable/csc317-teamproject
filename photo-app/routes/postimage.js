var mysql      = require('mysql');
var express    = require("express");
var app = express();
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
        console.log(err);

    }
});

exports.postimage = function (req, res, next){
    console.log(req.body.description);
    var imageInfo = {
        "title":req.body.title,
        "description":req.body.description,
    };
    connection.query('INSERT INTO imageposts SET ?', imageInfo, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    });


    console.log("image sent");
    res.redirect('../homePage');
};