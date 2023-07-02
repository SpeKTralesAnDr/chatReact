import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Chat from './chat/Chat.jsx'
import Main from './main/Main.jsx'



const AppRoutes = () => {
    return (
        
            <Routes>
                <Route path='/' element = {<Main/>}/>
                <Route path='/chat' element = {<Chat/>}/>
                

                
            </Routes>
       
    )
}

export default AppRoutes