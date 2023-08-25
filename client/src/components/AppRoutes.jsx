import React, { useEffect } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Chat from './chat/Chat.jsx'
import ChatSecondTry from './test/Chat v2.jsx'
import Main from './main/Main.jsx'
import io from 'socket.io-client';

import SettingsModule from './components/settings/setting.jsx'
import InviteURL from './InviteLink/URLinvite.jsx';
import Error404 from './error/404/404.jsx'
import WrongConnect from './error/wrondConnect/WrongConnect.jsx';
import BlockNavigate from './test/navigate.jsx'
const socket = io.connect('http://26.83.203.240:5005');

console.log(socket)

const AppRoutes = () => {
    const location = useLocation();
    useEffect(()=>{
        
    },[])
    useEffect(()=>{
        
        
        console.log(`%c Pathname ${location.pathname}`, 'background: white; color: red; font-size: 24pt;');
        if(location.pathname != '/Chat'){
            socket.emit("leavefromroom",'meow')
        }
    },[location])
    return (
      
            <Routes>
                <Route path='/chatv2' element={<ChatSecondTry socket= {socket}></ChatSecondTry>}></Route>
                <Route path='/pred' element={<BlockNavigate socket= {socket}></BlockNavigate>}></Route>
                <Route path='/' element = {<Main socket={socket}/>}/>
                <Route path='/chat' element = {<Chat socket={socket}/> }/>
                <Route path='/settings' element = {<SettingsModule/>}/>
                <Route path='/Link' element = {<InviteURL socket={socket}/>}></Route>
                <Route path='/Error' element={<WrongConnect/>}></Route>
                <Route element={<Error404/>}></Route>        
                 
                

                
            </Routes>
       
    )
}

export default AppRoutes