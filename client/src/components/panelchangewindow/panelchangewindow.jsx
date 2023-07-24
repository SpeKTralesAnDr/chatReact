import React, { useState } from 'react';
import styles from './panelchangewindow.module.css'
const Panelchangewindow = ({data, Chagewindow}) => {
    
    const [switchers, setSwitchers] = useState([
        {id:'Chat', value:'Chat', State:true, },
        {id:'Members', value:'Members', State:false, },
        {id:'Settings', value:'Settings', State:false, }
    ])
    const handleChangeWindow = (event)=>{
        console.log(event)
        console.log('eee')
        const updatedSwitchers =  switchers.map((box)=>{
            if(box.id === event.id){
                Chagewindow(event.id)
                // console.log(Chagewindow)
                return{...box, State:true}
            }else{
                
                return{...box, State:false}
            }
            
    
    
        })
        console.log(updatedSwitchers)
        setSwitchers(updatedSwitchers)
    }
    return (
        <div className={styles.switchers}>
        {switchers.map((event)=>(
            event.id === 'Settings' ? (data === 'host' ? (<button className={event.State === true ? (styles.buttonSwitchOn):(styles.buttonSwitchOff) }  onClick={() => handleChangeWindow(event)}key = {event.id} id = {event.id}><div>{event.value}</div></button >)
            :(<div key = {event.id} id = {event.id}></div>)) 
            : (<button onClick={() => handleChangeWindow(event)} className={event.State === true ? (styles.buttonSwitchOn):(styles.buttonSwitchOff) } key = {event.id} id = {event.id}><div>{event.value}</div></button >)
        ))}  
        
    </div>
    );
};

export default Panelchangewindow;