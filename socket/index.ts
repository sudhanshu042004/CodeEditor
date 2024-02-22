const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket: any) => {
  console.log("A user connected");

  socket.on("code", (code: any) => {
    io.emit("code", code);
  });

  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");
  // });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
