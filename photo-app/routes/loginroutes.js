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

exports.registration = function(req,res){
    // console.log("req",req.body);
    var today = new Date();
    var users={
        "username":req.body.username,
        "email":req.body.email,
        "password":req.body.inputpsw,

    };
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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
};

// exports.login = function(req,res){
//     var username= req.body.username;
//     var password = req.body.password;
//     connection.query('SELECT password FROM `csc317db`.`users` WHERE username=?;',[username], function (error, results, fields) {
//         if (error) {
//             // console.log("error ocurred",error);
//             res.send({
//                 "code":400,
//                 "failed":"error ocurred"
//             })
//         }else{
//             // console.log('The solution is: ', results);
//             if(results.length >0){
//                 if(results[0].password == password){
//                     //good credentials
//                     res.cookie('access_token', {token: "123"});
//                     res.redirect("/")
//
//                 }
//                 else{
//                     //username != password
//                     res.redirect("/login")
//                 }
//             }
//             else{
//                 //user doesn't exist
//                 res.redirect("/login")
//             }
//         }
//
//          res.sendFile((__dirname + '/public/login.html'));
//         // res.render("login");
//     });
//
// };