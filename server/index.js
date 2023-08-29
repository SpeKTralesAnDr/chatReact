const express = require('express')
const http = require('http')
const { Server } = require ('socket.io')
const cors = require('cors')
const app = express();
const route = require("./route");
const {CreateRoom, LeaveFromRoom,getUsersOfRoom,ConnectToTheroom, getRoomData,setStatus,GetUserSocketID,GetUserArraySocketID} = require("./Room/rooms")
const {codeParam, decode} = require("./jwt/jwtModule");
const e = require('express');
const { off } = require('process');
const { Socket } = require('dgram');
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
  var CurrentDataAboutUser = undefined
  const clientIpAddress = socket.handshake.address;
 
  // var info = undefined
  countOfConnects++
  console.log('пользователь подключился, текущее кол-во пользователей:',countOfConnects,  {clientIpAddress})
  


  
  socket.on('CreateTheRoom', ( event) => {

    info = CreateRoom(event.settingsGeneral, event.settingExtra,socket.id )
    if(info.type == 'answer'){
      CurrentDataAboutUser = info.data
      //   ДАТА ЗДЕСЬ С НАСТРОЙКАМИ
      socket.join(CurrentDataAboutUser.room)
      
      socket.emit('DataAboutCreatingRoom', codeParam({room:CurrentDataAboutUser.room, name: CurrentDataAboutUser.name,password:event.settingsGeneral.password, role:'host'} ))
    }else{
      socket.emit('DataAboutCreatingRoom','error')
    }
    
    
  })






  socket.on('JoinToTheRoom', (event)=>{
    event.socketID = socket.id
    var info = ConnectToTheroom(event)
    // console.log(info)
    if(info.description == true){
      CurrentDataAboutUser = {...event, role:'client' }
      // console.log(event)
    //  var decodeParam = {
    //     room:event.room,
    //     name: event.name,
    //     role:'client'
    //   }
      socket.join(event.room)
      console.log('count of users at room',io.sockets.adapter.rooms.get(event.room).size)
      socket.broadcast.to(event.room).emit('newUser',{user:{name:event.name, status:'online',
        avatar:{
          exist:false,
          sourse:'' },},
        message:{content:`${event.name} have joined to room `},
        time:Date.now(),})
      const content = codeParam(CurrentDataAboutUser)
      // delete content.iat, content.password // по идее можно удалить
      info = ({type:'answer', description:true, content:content})
      
    }else{

    }

    
   
    socket.emit('DataAboutJoin', info)
    
    
    



    
    
  })
  
  socket.on('ConnectFromInvite', (event,e)=>{
    const decoded = decode(event)
    
    if(decoded !='error'){
    decoded.name = e
    
    var info = ConnectToTheroom(decoded)
    if(info.description == true){
      socket.broadcast.to(decoded.room).emit('newUser',{user:decoded.name,message:{content:`${decoded.name} have joined to room (link)`},time:Date.now(),})
      info = codeParam(decoded)
      
     
    }else{
      
    }
    socket.emit('GetAnswerInvite', info)
    // console.log(info)
    }
    
  })
  socket.on('NewPageConnect', (event) => {
    console.log('data is sended')
    if(CurrentDataAboutUser != undefined){
      
      // if(CurrentDataAboutUser.role == 'host'){
        
        // }else{
        
         
         users = getUsersOfRoom(CurrentDataAboutUser)
         
        
          
          socket.emit('DataAboutUser', {...CurrentDataAboutUser, users}  )
          
        }else if(event != undefined){
          CurrentDataAboutUser = decode(event)
          // delete CurrentDataAboutUser.password    // НЕИЗВЕСТНО ЧТО БУДЕТ СО СКОРОСТЬЮ И ОПТИМИЗАЦИЕЙ!!!!!!!!
          delete CurrentDataAboutUser.iat       // НЕИЗВЕСТНО ЧТО БУДЕТ СО СКОРОСТЬЮ И ОПТИМИЗАЦИЕЙ!!!!!!!!
          CurrentDataAboutUser.socketID = socket.id
          // console.log('without password',CurrentDataAboutUser)
          
          if(CurrentDataAboutUser != 'error'){
             //я остановился здесь 
            
            const settingsOfTheRoom = getRoomData(CurrentDataAboutUser)
            
            // console.log(settingsOfTheRoom)
            if(settingsOfTheRoom.description == true){
              socket.join(settingsOfTheRoom.content.room)
              socket.broadcast.to(CurrentDataAboutUser.room).emit('userIsOFFON',CurrentDataAboutUser)
              
              // SetStatusOnline(CurrentDataAboutUser)
              socket.emit('DataAboutUser',settingsOfTheRoom.content)
            }else{
              socket.emit('DataAboutUser',settingsOfTheRoom)
              
            }
            
            
          // if(decodedToken){}

      }else{

      }
    }else{
      const infoToNewPage = {type:'error', description:'Unknown JWT token'}

    }
  })




  socket.on('sendmessagefromclient', (event) => {
    console.log('message is sended')
    if(CurrentDataAboutUser != undefined){
      if(CurrentDataAboutUser.role == 'host'){
        
      }else{

      }
      socket.broadcast.to(CurrentDataAboutUser.room).emit('sendmessagefromclient',{
        id:Date.now(),
        
        time: Date.now(),
        name:CurrentDataAboutUser.name,
        content:[
          event]
        })
    }else{
      const infoToNewPage = {type:'error', description:'Unknown JWT token'}
    }
  })
  

  socket.on('SendOfferToEveryoneOfTheRoom',(event)=>{

    const socketID = GetUserSocketID(event.name, CurrentDataAboutUser.room)
    if (socketID !== undefined){
      console.log('send to ', socketID) 
      io.to(socketID).emit('PersonalOfferSDP',{sdp:event.offer, name:CurrentDataAboutUser.name}) 
    }
  } )
  
  socket.on('SendAnswerSDP', (event)=>{
    const socketID = GetUserSocketID(event.name, CurrentDataAboutUser.room)
    if (socketID !== undefined){
      console.log('send to ', socketID) 
      io.to(socketID).emit('PersonalAnswerOnSDP',event.sdp) 
    }
  })
  
  socket.on('SendICE',(ice) => {
    const socketID = GetUserSocketID(ice.name, CurrentDataAboutUser.room)
    if (socketID !== undefined){
      console.log('send to ', socketID) 
      io.to(socketID).emit('GetICE',ice.ice) 
    }
  })
  
  
  








socket.on('testgetmes',(event)=>{
  console.log('тест')
  
} )
socket.on('pm', (e)=>{
  console.log(e)
  console.log('свое', socket.id)
  const message = 'Привет, это личное сообщение!';
  
  io.to(socket.id).emit('pm',message)
})


 

  socket.on('disconnect', () => {

    // console.log(decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tIjoiMjIyIiwicGFzc3dvcmQiOiIxMTEiLCJuYW1lIjoiMDAwIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY5MjQ2MjcyMX0.T6SoeMgqHSPahY5sEfhU5kAuc4_p05p_LMkkrshmui8'))
   if(CurrentDataAboutUser !== undefined){
      const aboutUser = setStatus(CurrentDataAboutUser)
      // console.log(aboutUser)
      socket.broadcast.to(CurrentDataAboutUser.room).emit('userIsOFFON',aboutUser)
   }
    countOfConnects-- 
    console.log('пользователь отключился, текущее кол-во пользователей ', countOfConnects)
  })
//   socket.broadcast.to(user.room).emit('sendofferFS',{
// })






})

server.listen(5005, ()=> {
})