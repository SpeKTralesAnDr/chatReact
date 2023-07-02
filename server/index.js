const express = require('express')
const http = require('http')
const { Server } = require ('socket.io')
const cors = require('cors')
const app = express();
const route = require("./route");


app.use(cors( {origin: "*" }))
app.use(route);
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })
io.on('connection', (socket) => {console.log('dddd')
console.log('server is running')
socket.join('testroom')
socket.emit('testroom', {
    data: 'testmessage'
  });
//   socket.broadcast.to(user.room).emit('sendofferFS',{
      
//     data: stream,
// })






})
server.listen(5005, ()=> {
})