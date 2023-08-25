import React, { useEffect } from 'react';

const ChatSecondTry = ({socket}) => {
    useEffect(()=>{
        socket.on('test', (event)=>{
            console.log(event)
           
        })
        socket.on('testgetmes', (event)=>{
            console.log(event)
            // console.log('броуд')
        })
        socket.emit('test')
    },[])
    const testFun =()=>{
        socket.emit('testgetmes', 'meow')
    }
   
    return (
        <div>
            <button onClick={testFun} style={{ fontSize: '200pt' }}>fsdf</button>
        </div>
    );
};

export default ChatSecondTry;