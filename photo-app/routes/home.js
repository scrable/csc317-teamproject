
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'csc317db'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
exports.list = function(req, res){


        connection.query('SELECT * FROM `csc317db`.`imageposts`;',function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('homePage',{page_title:"Test Table",data:rows});
        });

};