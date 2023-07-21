import React, { useEffect, useState } from 'react';
import styles from './form.module.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const InputsForm = ({inputs, Changemodal, getwarn,}) => {
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
        inputs({room:valueRoom, password:valuePassword, name:valueName})
    }
    const  Change = ()=>{
        Changemodal(2)
    }
    const [Visibility, SetVisibility]= useState(true)
    const ChangeVisiblity = () =>{
        if(Visibility === false){
            SetVisibility('text')
            console.log(true)
        }
        else{
            
            SetVisibility(false)
            
        }
    }
    
    return (
        <div className={styles.boxJoin}>
            <div className={styles.text}>Connect to the room</div>
            <div className={styles.warn}>{getwarn}</div>
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
            <div className={styles.blockPassword}>
            <input
                className={styles.inputpassword}
                placeholder='Password'
                value={valuePassword}
                type={Visibility ? 'text' : 'password'}
                onChange={dynamicValuePassword}
                

            >
                
            </input>
            <button className={styles.ButtonPasswordVisibility} onClick={ChangeVisiblity}>
                {Visibility == false ? (<VisibilityOffOutlinedIcon className={styles.VisibilityOffOutlinedIcon}></VisibilityOffOutlinedIcon>): (<RemoveRedEyeOutlinedIcon className={styles.VisibilityOffOutlinedIcon}></RemoveRedEyeOutlinedIcon>
                    )}
            </button>
            </div>
                <button
                className={styles.link}
                onClick={Change}
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