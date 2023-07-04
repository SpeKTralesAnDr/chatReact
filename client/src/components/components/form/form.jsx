import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

const InputsForm = ({child}) => {
    const [valueRoom, SetValueRoom] = useState('')
    const [valuePassword, SetValuePassword] = useState('')
    const [valueName, SetValueName] = useState('')

    const dynamicValueName = (event) => {
        const newValue = event.target.value; // странно, без const не робит
        console.log(newValue);
        SetValueName(newValue);
         
      };
    const dynamicValuePassword = (event) => {
        const newValue = event.target.value; // странно, без const не робит
        console.log(newValue);
        SetValuePassword(newValue);
         
      };
    const dynamicValueRoom = (event) => {
        const newValue = event.target.value; // странно, без const не робит
        console.log(newValue);
        SetValueRoom(newValue);
         
      };
    const send =()=>{
        child({room:valueRoom, password:valuePassword, name:valueName})
    }
    
    return (
        <div className={styles.box}>
            <div className={styles.text}>Connect to the room</div>
            <div className={styles.warn}></div>
            <input
                className={styles.input}
                placeholder='Your Name'
                onChange={dynamicValueName}
                value={valueName}
                
            >
            </input>
            <input
                className={styles.input}
                placeholder='Room'
                onChange={dynamicValueRoom}
                value={valueRoom}
                
            >
            </input>
            <input
                className={styles.input}
                placeholder='Password'
                value={valuePassword}
                onChange={dynamicValuePassword}

            >
            </input>
                <button
                className={styles.link}
                >Create room
                </button>
            <button
             className={styles.button}
            onClick= {send}
             >
            Connect

            </button>
        </div>
    );
};

export default InputsForm;