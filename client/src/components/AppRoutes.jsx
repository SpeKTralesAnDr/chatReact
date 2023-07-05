import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Chat from './chat/Chat.jsx'
import Main from './main/Main.jsx'
import SettingsModule from './components/settings/setting.jsx'




const AppRoutes = () => {
    return (
        
            <Routes>
                <Route path='/' element = {<Main/>}/>
                <Route path='/chat' element = {<Chat/>}/>
                <Route path='/settings' element = {<SettingsModule/>}/>
                

                
            </Routes>
       
    )
}

export default AppRoutes