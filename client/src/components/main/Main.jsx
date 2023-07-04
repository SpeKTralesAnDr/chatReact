import React, { useState } from 'react';
import io from 'socket.io-client'
import InputsForm from '../components/form/form.jsx';
import styles from './main.module.css'
const Main = () => {
    
    const socket = io.connect('http://localhost:5005')
    socket.on("test", ({ data }) => {console.log(data)})
    var value = '' 
    const parent = (event) =>{
        console.log(event,'eee')
        value = event
       
    }
    const test = ()=> {
        console.log(value)
    }
   
  

    return (
        
        <div className={styles.main}>
            <InputsForm  child={parent}>  
            </InputsForm>
            
            <button
                onClick={test}
                

            >
                
            </button>
            
        </div>
    );
};

export default Main;