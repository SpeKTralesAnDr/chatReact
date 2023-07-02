import React from 'react';
import io from 'socket.io-client'
const Main = () => {
    
    const socket = io.connect('http://localhost:5005')
    socket.on("test", ({ data }) => {console.log(data)})






    return (
        <div>
            
        </div>
    );
};

export default Main;