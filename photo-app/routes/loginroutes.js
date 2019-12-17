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
    if(req.session.user)
        res.redirect("/homePage.html");
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
            // res.send({
            //     "code":200,
            //     "success":"user registered sucessfully"
            // });
            // exports.login();
        }
    });
};

exports.login = function(req,res){
    console.log("login " + req.session.id);
    if(!req.session.user) {
        var username = req.body.username;
        var password = req.body.password;
        connection.query('SELECT password FROM `csc317db`.`users` WHERE username=?;', [username], function (error, results, fields) {
            if (error) {
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results.length > 0) {
                    if (results[0].password == password) {
                       // req.session.user = results[0];
                        connection.query('SELECT id FROM `csc317db`.`users` WHERE username=?;', [username], function(error, r, fields){

                            req.session.user = r[0].id;
                          //  req.session.user.id = r[0].id;
                            console.log(r[0].id);
                            console.log(req.session.user);

                        //good credentials

                        //req.session.user = results[0];
                        res.redirect("/homePage.html");
                        });
                    } else {
                        //username != password
                        res.redirect("/login.html")
                    }
                } else {
                    //user doesn't exist
                    res.redirect("/login.html")
                }
            }
        });
    }
    else res.redirect("/homePage.html")
};