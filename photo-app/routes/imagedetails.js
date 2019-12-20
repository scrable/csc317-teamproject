exports.details = function(req, res){
    var g = req.url;
    console.log(g);
    global["paths"] = g.substring(13, g.length);
    console.log("int: " + parseInt(paths));
    var t = parseInt(paths);

    connection.query('SELECT * FROM `csc317db`.`imageposts` WHERE id=?;', t,function(err,rows){
        if(typeof rows == 'object' && !rows.length) {
            res.redirect('/homePage.html');
        }
        else {
            res.render('imageDetails', {data: rows});
        }
    });


};