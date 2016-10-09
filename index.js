/**
 * Created by Serena on 10/8/16.
 */


var express = require("express");
var app = express();
var port = 3700;

/*This code informs Express where your template files are, and which template engine to use.
 It all specifies the function that will process the template's code. Once everything is setup,
 we can use the .render method of the response object, and simply send our Jade code to the user.*/

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

// app.get("/", function(req, res){
//     res.send("It works!");
// });

/*Because we will use an external JavaScript file that will hold the front-end logic,
we need to inform ExpressJS where to look for such resources.*/

// public folder is used to store static resource files, such as css, libraries, js, img...
app.use(express.static(__dirname + '/public'));

/*passed the ExpressJS server to Socket.io*/
var io = require('socket.io').listen(app.listen(port));
// app.listen(port);
console.log("Listening on port " + port);

// Socket.io connection handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to real-time chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
})

