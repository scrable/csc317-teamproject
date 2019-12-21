exports.details = function(req, res){
    var g = req.url;
    global["paths"] = g.substring(13, g.length);
    var t = parseInt(paths);

    connection.query('SELECT * FROM `csc317db`.`imageposts` WHERE id=?;', t,function(err,rows) {
        connection.query('SELECT * FROM `csc317db`.`comments` WHERE fk_postid=?;', t, function (err, cms) {
            if (typeof rows == 'object' && !rows.length) {
                res.redirect('/homePage.html');
            } else {
                res.render('imageDetails', {data: rows, cmnts: cms});
            }
        });
    });

};