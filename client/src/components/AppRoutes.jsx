import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Chat from './chat/Chat.jsx'
import Main from './main/Main.jsx'



const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element = {<Main/>}/>
                <Route path='/chat' element = {<Chat/>}/>
                

                
            </Routes>
        </div>
    )
}

export default AppRoutes