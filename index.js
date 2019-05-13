const express = require("express");
const app = express();
const http = require("http").Server(app);
const socket = require("socket.io")(http);

const port = process.env.PORT || 5000;

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/client/index.html");
});

socket.on("connection", socket => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });



  socket.on('ship-move', (direction) => {
    console.log('ship move to: '+ direction);
    socket.broadcast.emit('ship-move', direction);
  });

  socket.on('ship-bullet', () => {
    console.log('ship shoot');
    socket.broadcast.emit('ship-bullet');
  })
});

http.listen(port, () => {
  console.log("Space invader game listening of port " + port);
});
