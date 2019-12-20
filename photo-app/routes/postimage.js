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