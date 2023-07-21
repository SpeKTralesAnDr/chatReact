const room = [{room:'EXAMPLE',users:{host:'EXAMPLE', clients:[{name:"EXAMPLE", status:'offline'}]},password:'EXAMPLE', settings:'EXAMPLE'}]
const jwt = require('jsonwebtoken');
const secretKey = 'H2fJt9Oq7Z';
const {codeParam, decode} = require("../jwt/jwtModule")
// console.log(, 'тест хуй залупка')
const CreateRoom = (general, extra)=>{
    // console.log(general,extra)
    var isrepeat = 0
    for(var i = 0; i < room.length ; i++){
        
        console.log(room[i].room, '', general.room)
       if(room[i].room == general.room ){
           isrepeat = 1
           console.log( 'команты повтораяются ',isrepeat)
           
           
    }
    }
    if(isrepeat == 0){
        const InviteToken = codeParam({room:general.room ,password:general.password })
        extra.push({
          id: 'InviteURL',
          label: 'Life span of Invite URL:',
          description: "Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов",
          type: 'range',
          state: 5,
            min:5,
            max:60,
            URL: `http://localhost:3000/Link?${InviteToken}`,
            additionalBlocks:[
                {element:'button',
                 function: 'addtoclipboard',
                 HTMLvalue:'dsdsdds',
                 value:0
                }
            ]
                
            
        });
        console.log(extra);
      
        room.push({
          room: general.room,
          users: {
            host: general.name,
            clients: [{ name: general.name, status: 'offline' }]
          },
          password: general.password,
          settings: extra
        });
      
        const payload = {
          room: general.room,
          name: general.name,
          role: 'host'
        };
      
        const tokenLogin = jwt.sign(payload, secretKey);
        console.log(tokenLogin);
        return tokenLogin;
    }else{console.log('РУМЫ ПОВТОРЯЮТСЯ', isrepeat)
    return('error')
}


}
const ConnectToTheroom = (event)=>{
    console.log(event)
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
                            room[i].users.clients.push({name:event.name, status:'offline'})
                            console.log(room[i].users.clients)
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
const NewPageConnect = (event)=>{
    // console.log(event)
    // const decoded = jwt.verify(token, secretKey);
    // console.log(decoded)
    // console.log(room)
    var IsCorrectRoom = 0
    for(var i = 0; i < room.length; i++){
        console.log(event.room,room[i].room, '-- ',room.length)
        if(event.room == room[i].room){
            IsCorrectRoom = 1
            var DoesRersoneLoggedAtRoom = 0
            for(var ind = 0; ind < room[i].users.clients.length; ind++ ){
                console.log(event.name, '!=' ,room[i].users.clients[ind].name,'длина ', room[i].users.clients.length, 'индекс', ind)
                if(event.name == room[i].users.clients[ind].name ){
                    DoesRersoneLoggedAtRoom = 1
                        
                        room[i].users.clients[ind].status = 'online'
                        if(event.role == 'host'){
                            return({type:'answer', description:true, role:'host', settings:room[i].settings, users:room[i].users})
                            
                        }else{
                            return ({type:'answer', description:true, role:'client' ,users:room[i].users})

                        }
                    }
                    // else{
                    //     return({type:'error', description:'unknown name'})
                    // }
                    
                }if(IsCorrectRoom == 1){
                    if(DoesRersoneLoggedAtRoom == 0){
                        return({type:'error', description:'unknown name || uncorrect token'})
                    }
                    

                }else{
                    return({type:'error', description:'unknown room || uncorrect token'})
                }
            
                
                console.log(room[i].room,room[i].users,room[i].password)
            

            }
            
        }
        
           
        
      
}
const LeaveFromRoom = (token) =>{
    
    
    }
 
    module.exports = {CreateRoom, LeaveFromRoom,NewPageConnect,ConnectToTheroom}