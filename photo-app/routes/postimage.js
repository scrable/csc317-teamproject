var path = require('path');

exports.postimage = function (req, res){
    if (!req.files)
        res.redirect('/postImage.html');
    console.log(req.session.user);
    var date = new Date();
    var filePathTime =  "" + date.getMonth() + date.getFullYear() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + req.files.img.name;
    var imageInfo = {
        "title":req.body.title,
        "description":req.body.description,
        "fk_userid":req.session.user,
        "active":"1",
        "photopath": "images/" + filePathTime,
    };
    var file = req.files.img;

    console.log(__dirname);
    file.mv(path.resolve(__dirname, '..')+'/public/images/' + filePathTime);
    connection.query('INSERT INTO imageposts SET ?;', imageInfo, function (error) {
        if (error) {
            console.log("error ocurred",error);
        }
    });


    console.log("image sent");
    res.redirect('/homePage.html');
};

exports.postcomment = function (req, res) {
    var g = req.url;
    global["paths"] = g.substring(13, g.length);
    var t = parseInt(paths);


    connection.query('SELECT * FROM `csc317db`.`users` WHERE id=?;', req.session.user, function (error, result) {
        if (error) {
            console.log("error ocurred",error);
        }
        if(result.length > 0){
            console.log("alkflakfns: " + result[0].username);

            var commentInfo = {

                "comment": req.body.comment,
                "fk_userid": req.session.user,
                "fk_postid": t,
                "poster": result[0].username,
            };

            connection.query('INSERT INTO comments SET ?;', commentInfo, function (error) {
                if (error) {
                    console.log("error ocurred", error);
                }
            });
            console.log(commentInfo);
        }
    });








    console.log("comment sent");
    res.redirect('imageDetails' + t)
};