var express = require("express");
var app = express();
var colors = require("colors");
app.use(express.static(__dirname + "/public"));

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("user has connected".blue, socket.id.toString().blue);

    socket.on("reception", (data) => {
        console.log(socket.id, "@", data.username, ":", data.message);
        io.emit("broadcast", {
            id: socket.id,
            message: data.message,
            username: data.username ? data.username : socket.id,
        });
    });

    socket.on("disconnect", () => {
        console.log("user disconnected".red, socket.id.toString().red);
    });
});

httpServer.listen(3000);
