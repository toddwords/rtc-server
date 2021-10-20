var express = require("express");
var app = express();
var server = app.listen(process.env.PORT || 8080);
app.use(express.static("public"));
console.log("server running");
var socket = require("socket.io");
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

// var io = socket(server);
var io = socket(server, {
  pingTimeout: 5000,
  pingInterval: 1500,
  perMessageDefalate: false,
  cors: {
    origin: "*",
  }
});


io.sockets.on("connection", newConnection);


function newConnection(socket) {
  RTCMultiConnectionServer.addSocket(socket);

  
  socket.on("broadcast-started", (data) => {
    socket.broadcast.emit("broadcast-started", data)
  })
  socket.on('disconnect', ()=>{
    onDisconnect(socket)
  })
  
}


function onDisconnect(socket){
  try {
    socket.removeAllListeners();
    socket = null;
  }
  catch(error){
    console.error(error)
  }
}

