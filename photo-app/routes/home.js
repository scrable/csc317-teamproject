exports.list = function(req, res){
        connection.query('SELECT * FROM `csc317db`.`imageposts`;',function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('homePage',{page_title:"Test Table",data:rows});
        });

};