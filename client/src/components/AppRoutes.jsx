import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Chat from './chat/Chat.jsx'
import Main from './main/Main.jsx'
import io from 'socket.io-client';
import SettingsModule from './components/settings/setting.jsx'


const socket = io.connect('http://26.83.203.240:5005');
console.log(socket)
const AppRoutes = () => {
    return (
        
            <Routes>
                <Route path='/' element = {<Main socket={socket}/>}/>
                <Route path='/chat' element = {<Chat socket={socket}/> }/>
                <Route path='/settings' element = {<SettingsModule/>}/>
                

                
            </Routes>
       
    )
}

export default AppRoutes