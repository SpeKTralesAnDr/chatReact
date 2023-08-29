const room = [{room:'EXAMPLE',users:{host:'EXAMPLE', clients:[{name:"EXAMPLE", status:'offline'}]},password:'EXAMPLE', settings:'EXAMPLE'}]
const jwt = require('jsonwebtoken');
const secretKey = 'H2fJt9Oq7Z';
const {codeParam, decode} = require("../jwt/jwtModule");
const { Socket } = require('socket.io');

const CreateRoom = (general, extra, socketID)=>{
    // console.log(general,extra)
    var isrepeat = 0
    for(var i = 0; i < room.length ; i++){
        
        // console.log(room[i].room, '', general.room)
       if(room[i].room == general.room ){
           isrepeat = 1
           console.log( 'команты повтораяются ',isrepeat)
           
           
    }
    }
    if(isrepeat == 0){
        const InviteToken = codeParam({room:general.room ,password:general.password })
        extra.push({
          id: 'InviteURL',
          label: 'Life span of Invite URL',
          description: "Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов",
          type: 'range',
          state: 5,
            min:5,
            max:60,
            URL: `http://26.83.203.240:3000/Link?invite=${InviteToken}`,
            additionalBlocks:[
                {
                id: 'ButtonToCopyURL',
                element:'button',
                 function: 'addtoclipboard',
                 HTMLvalue:'dsdsdds',

                 state:false,
                 
                }
            ]
                
            
        });
        
      
        room.push({
          room: general.room,
          users: {
            host: general.name,
            clients: [{ name: general.name, status: 'online',SocketID:socketID,
            avatar:{
                exist:false,
                sourse:''
              },
            }]
          },
          password: general.password,
          settings: extra
        });
      
        // const payload = {
        //   room: general.room,
        //   name: general.name,
        //   role: 'host'
        // };
      
       
        return {type:'answer',
                description:true,
                data:{
                    room: general.room,
                    name: general.name,
                    settings:extra,
                    role: 'host'
                }}
    }else{console.log('РУМЫ ПОВТОРЯЮТСЯ', isrepeat)
    return('error')
}


}
const getUsersOfRoom = (event)=>{
    for(let i = 0; i < room.length; i++){
        if(room[i].room == event.room){
            console.log('connect/create',room[i].users.clients)
            const users = room[i].users
            return (users)
        }
    }
}
const ConnectToTheroom = (event)=>{
    
    var doesroomexist = 0
    for(var i = 0; i < room.length; i++){
        if(room[i].room == event.room ){
            doesroomexist = 1
            // console.log(room[i].settings)
            for(var ind = 0;ind < room[i].settings.length; ind++){
                // console.log(room[i].settings[ind])
                if(room[i].settings[ind].id == 'Password'){
                    if(room[i].settings[ind].state == true){
                        if( room[i].password == event.password){
                            console.log('password is enabled and right')
                            room[i].users.clients.push({name:event.name, status:'online', SocketID:event.socketID, avatar:{
                                exist:false,
                                sourse:''
                              },})
                           
                            return ({type:'answer', description:true})

                        }else{
                            
                            return ({type:'error', description:'password is not correct'})
                        }
                       
                    }else{
                        
                        return({type:'answer', description:true})
                    }
                    
                }
            }
        }
    }
    if(doesroomexist == 0){
        return ({type:'error', description:'unknown room'})
    }

}

const getRoomData =(event)=>{
    let doesroomexist = false
    let IsPasswordPassed = false;
    // console.log(event)
    for( let i = 0; i< room.length; i++){
        if(room[i].room == event.room){
            doesroomexist = 1
            // console.log('333')
            for(let ind = 0; ind < room[i].settings.length ;ind++){
                if(room[i].settings[ind].id == 'Password'){
                    // console.log(room[i].settings[ind].id)
                    if(room[i].settings[ind].state == true){
                        // console.log('chaaaacha')
                        // console.log(room[i].password, event.password)
                        if(room[i].password == event.password){
                            IsPasswordPassed = true
                        }else {IsPasswordPassed =false}
                    }else{
                        // console.log('chaaaacha')
                        IsPasswordPassed = true
                    }
                    
                }
            }if(IsPasswordPassed == true){
                let IsNameFound = 0
                for(var index = 0; index < room[i].users.clients.length; index++){
                    
                    if(event.name == room[i].users.clients[index].name){
                        room[i].users.clients[index].status = 'online'
                        room[i].users.clients[index].SocketID = event.socketID
                        console.log(event.SocketID,'newpage',room[i].users.clients)
                        // console.log(room[i].users)
                        IsNameFound = 1
                        return({type:'answer', description:true, content:event.role === 'host' ?({...room[i], name:event.name,role:event.role}):({
                            room:room[i].room,
                            users:room[i].users,
                            name:event.name,
                            role:event.role
                        }) })

                    }else{
                        
                        
                    }
                }
            if(IsNameFound == 0){
                return ({type:'error', description:"Error:unknown name. Try connecting again. If it doesn't help, clear your browser cache."})
            }
                
                
            }
            // return room[i].settings
            // if(doesroomexist == true ){
            // }else{
            //     return ({type:'error', description:false})
            // }if(IsPasswordPassed == true){
                
            // }else{
                // }
            }
       
        }
        if(IsPasswordPassed == false || doesroomexist == false){
            return ({type:'error', description:"Error:unknown room. Try connecting again. If it doesn't help, clear your browser cache."})

    }
}








const GetUserSocketID = (name,roomofuser)=>{
    let SocketID 
    room.forEach((el,i,self)=>{
        console.log(el.room,roomofuser)
        if(el.room == roomofuser){
            el.users.clients.forEach((user)=>{
                console.log(user.name, name)
                if(user.name == name){
                    SocketID = user.SocketID
                }
            })
        }
    })

    return (SocketID)
}
const GetUserArraySocketID = (name,roomofuser)=>{
    let SocketID = []
    room.forEach((el,i,self)=>{
        console.log(el.room,roomofuser)
        if(el.room == roomofuser){
            el.users.clients.forEach((user)=>{
                console.log(user.name, name)
                if(user.name == name){
                    SocketID.push({name:user.name, SocketID:user.SocketID})
                }
            })
        }
    })

    return (SocketID)
}
// const SetStatusOnline = (e) =>{
//     console.log('fun set online',e)
//     for(var i = 0; i < room.length; i++ ){
//         if(room[i] == e.room){
//             for(var index = 0; i< room[i].users.clients.length; index++){
//                 if(e.name == room[i].users.clients[index]){
//                     room[i].users.clients[index].status = 'online'
//                 }
//             }
//         }
//     }
// }
const setStatus = (e)=>{
    

        // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
        for(var i = 0; i < room.length; i++){
            
            // console.log(room[i].room, '==' ,e.room)
            if(room[i].room == e.room){
                console.log('disconnect',room[i].users.clients)
                for(var index = 0; index < room[i].users.clients.length; index++){
                   
                    
                    if(room[i].users.clients[index].name == e.name){
                        if(room[i].users.clients[index].status == 'offline'){
                            room[i].users.clients[index].status = 'online'

                        }else{
                            room[i].users.clients[index].status = 'offline'
                            room[i].users.clients[index].SocketID = undefined
                        }
                       
                        return(room[i].users.clients[index])
                    }
                }
            }
        }
    
    }
const LeaveFromRoom = (token) =>{
    
    
    }
 
    module.exports = {CreateRoom, LeaveFromRoom,ConnectToTheroom, getRoomData,getUsersOfRoom,setStatus,GetUserSocketID,GetUserArraySocketID}