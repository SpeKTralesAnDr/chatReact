const express = require('express')
const http = require('http')
const { Server } = require ('socket.io')
const cors = require('cors')
const app = express();
const route = require("./route");
const {CreateRoom, LeaveFromRoom,NewPageConnect,ConnectToTheroom} = require("./Room/rooms")
const {codeParam, decode} = require("./jwt/jwtModule")
// const LeaveFromRoom = require("./room/rooms.js")

var countOfConnects = 0
app.use(cors( {origin: "*" }))
app.use(route);
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })
  console.log('server is running')








  io.on('connection', (socket) => {
  var CurrentData = undefined
  // var info = undefined
  countOfConnects++
  console.log('пользователь подключился, текущее кол-во пользователей ', countOfConnects)
  




  socket.on('JoinToTheRoom', (event)=>{
   
    var info = ConnectToTheroom(event)
    if(info.description == true){
      console.log(event)
     var decodeParam = {
        room:event.room,
        name: event.name,
        role:'client'
      }
    info = codeParam(decodeParam)
    
    }else{
      console.log(info)
    }
    
    socket.emit('DataAboutJoin', info)
    
    
    



    
    
  })
  socket.on('CreateTheRoom', ( event) => {

    const info = CreateRoom(event.settingsGeneral, event.settingExtra)
  
    socket.emit('DataAboutCreatingRoom', info)
    
    
  })
  
  
  socket.on('NewPageConnect', (event)=>{
    const decoded = decode(event)
    const info = NewPageConnect(decoded)
    console.log(info)
    console.log(info.type)
    console.log(info.description)
    socket.emit('NewPageConnectGetAnswer', info)
   
    if(info.description == true){
      socket.join(decoded.room)
      
    }
    socket.on('disconnect', () => {
      LeaveFromRoom(decoded)
    
  })

})









 

  socket.on('disconnect', () => {

    // console.log(CurrentData)
    countOfConnects-- 
    console.log('пользователь отключился, текущее кол-во пользователей ', countOfConnects)
  })
//   socket.broadcast.to(user.room).emit('sendofferFS',{
// })






})

server.listen(5005, ()=> {
})