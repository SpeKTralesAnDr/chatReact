import React, { useEffect, useState } from 'react';

import styles from './form.module.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const FormCreate = ({Changemodal,settings, sendToServer, getwarn}) => {

    const [Visibility, SetVisibility]= useState(true)
    const ChangeVisiblity = () => {
        if (Visibility === false) {
            SetVisibility(true);
            console.log('show');
        } else {
            SetVisibility(false);
        }
    };

    const [isenadblepassword, SetIsanablepassword] = useState(true)

    useEffect(()=> {

        console.log(settings, 'from create')
        if (settings === null || settings === undefined || settings === ''){//НУЖНО СПРОСИТЬ ПОЧЕМУ ПРИ РЕНДЕРЕ ЭЛЕМЕНТЫ ТРИГЕРИТСЯ USEEFFECT в MAIN и в настрой

        }else{
            settings.map((box)=>{
                if(box.id === 'Password'){
                    if(box.state == false){
                        console.log('пароль выключен')
                        SetIsanablepassword(false)
                    }else{
                        console.log('пароль включен')
                        SetIsanablepassword(true)
                        
                    }
                }
            })
            console.log(settings, 'ФОРМА СОЗДАНИЯ')
        }

    },[settings])
    


    const send =()=>{
        sendToServer({settingsGeneral:{room:valueRoom, password:valuePassword, name:valueName},settingExtra:settings})
        



    } 





    const [valuePassword, SetValuePassword] = useState('') 
    const [valueRoom, SetValueRoom] = useState('')
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
    const JoinToRoom = ()=>{
        Changemodal(1)
    }
    return (
        <div className={styles.box}>
            <div className={styles.text}>Create Room</div>
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
                placeholder='Name of the room'
                onChange={dynamicValueRoom}
                value={valueRoom}
             
            >
            </input>
           
           
            <div className={styles.blockPassword}>
            {isenadblepassword == true ? (<div>
                <input
                className={styles.inputpassword}
                placeholder='Password'
                value={valuePassword}
                type={Visibility ? 'text' : 'password'}
                onChange={dynamicValuePassword}
                

            >
                
            </input>
            <button className={styles.ButtonPasswordVisibility} onClick={ChangeVisiblity}>
                {Visibility == false ? (<VisibilityOffOutlinedIcon className={styles.VisibilityOffOutlinedIcon}></VisibilityOffOutlinedIcon>):
                 (<RemoveRedEyeOutlinedIcon className={styles.VisibilityOffOutlinedIcon}  ></RemoveRedEyeOutlinedIcon>)}
                 
            </button>
            </div>) : (<div></div>)}
            
            </div>
                <button
                onClick={JoinToRoom}
                className={styles.link}
                >Join room
                </button>
            <button
             className={styles.button}
                onClick={send}
             >
            Create

            </button>
            {/* <div className={styles.rede}>Important: If you exit the room, it will only last for an hour before being deleted unless you return.</div> */}
        </div>
    );
};

export default FormCreate;