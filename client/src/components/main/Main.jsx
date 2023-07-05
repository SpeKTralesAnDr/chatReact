import React, { useState } from 'react';
import io from 'socket.io-client';
import InputsForm from '../components/form/formJoin.jsx';
import styles from './main.module.css';
import FormCreate from '../components/form/FormCreate.jsx';
import SettingsModule from '../components/settings/setting.jsx'
 

const Main = () => {
  const [currentModal, setCurrentModal] = useState(1);
  const socket = io.connect('http://26.83.203.240:5005');

  socket.on("test", ({ data }) => {
    console.log(data);
  });

  let value = '';

  const parent = (event) => {
    console.log(event, 'eee');
    value = event;
    socket.emit('connectToTheRoom', event);
  };

  const changemodalwindow = (event) => {
    console.log(value);
    setCurrentModal(event);
    console.log(event)
   
  };

  return (
    <div className={styles.main}>
      <div className={styles.forms}>
        {currentModal === 1 ? (
            
          <InputsForm child={parent} Changemodal = {changemodalwindow} />
          
        ) : (

          
          <div className={styles.modals} >
            <FormCreate Changemodal = {changemodalwindow} ></FormCreate>
            <SettingsModule ></SettingsModule>
            
          </div>
        )}

        

        
      </div>
    </div>
  );
};

export default Main;
