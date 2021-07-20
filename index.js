//Express server
var express = require("express");
var app = express();
//Console log colors
var colors = require("colors");
//Set up public directory
app.use(express.static(__dirname + "/public"));
//HTTP server instance
const httpServer = require("http").createServer(app);
//Socket.io initialization
const io = require("socket.io")(httpServer);
//Root GET
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//Socket.io config
io.on("connection", (socket) => {
    //Log connections (BLUE)
    console.log("user has connected".blue, socket.id.toString().blue);
    //On message reception
    socket.on("reception", (data) => {
        //printing...
        console.log(socket.id, "@" + data.username, ":", data.message);
        //Broadcast message received
        //has...
        //id
        //message
        //username
        io.emit("broadcast", {
            id: socket.id,
            message: data.message,
            username: data.username ? data.username : socket.id,
        });
    });
    //Disconection log (RED)
    socket.on("disconnect", () => {
        console.log("user disconnected".red, socket.id.toString().red);
    });
});
//Port 3000 opened
httpServer.listen(3000);
