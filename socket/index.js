var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var cors = require("cors");
var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: {
        origin: "*",
    },
});
app.use(cors());
io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("code", function (code) {
        io.emit("code", code);
    });
    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });
});
var PORT = 3001;
server.listen(PORT, function () {
    console.log("listening on port ".concat(PORT));
});
