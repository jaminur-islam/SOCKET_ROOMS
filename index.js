/* const app = require("express")();
const server = require("http").createServer(app);
const { Server } = new require("socket.io");
const io = new Server(server); */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.join("kitchen-room");
  let roomSize = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit("cookie", `Fried rice cooking ${roomSize}`);
  io.sockets.in("kitchen-room").emit("boiling", "Boiling water");

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I am going to sleep");
  io.sockets.in("bed-room").emit("rest", "I am taking rest");
});

server.listen(4000, () => {
  console.log("server running on http://localhost:3000");
});
