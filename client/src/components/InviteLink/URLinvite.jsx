import React, { useEffect, useState } from 'react';
import styles from './URLinveite.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
const InviteURL = ({socket}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    const [value, SetValue] = useState('')
    const [warn, setWarn] = useState('')
    const ConnectToRoom = ()=>{
        
        socket.on('GetAnswerInvite', (event)=>{
            console.log(event)
            if(event.type != 'error'){
                localStorage.setItem('token', event);
                navigate(`/Chat`);
            }else{
                setWarn(event.description)
            }
        })
        socket.emit('ConnectFromInvite',searchParams.invite, value);
    }
    useEffect(()=>{
        console.log(searchParams)
        
    },[])

    return (
        <div className={styles.background}>
            <div className={styles.block}>
            <label className={styles.label}>Type your name</label>
            <div className={styles.warn}>{warn}</div>
            <input
                className={styles.input}
                value={value}
                onChange={(event) =>{
                    SetValue(event.target.value)
                }}
            >
            </input>
            <button 
            className={styles.button}
            onClick={ConnectToRoom}
            >Connect</button>
            </div>
        </div>
    );
};

export default InviteURL;