import React, { useState } from 'react';
import io from 'socket.io-client';
import InputsForm from '../components/form/formJoin.jsx';
import styles from './main.module.css';
import FormCreate from '../components/form/FormCreate.jsx';


const Main = () => {
  const [currentModal, setCurrentModal] = useState(1);
  const socket = io.connect('http://localhost:5005');

  socket.on("test", ({ data }) => {
    console.log(data);
  });

  let value = '';

  const parent = (event) => {
    console.log(event, 'eee');
    value = event;
    socket.emit('connectToTheRoom', event);
  };

  const test = (event) => {
    console.log(value);
    setCurrentModal(event);
    console.log(event)
  };

  return (
    <div className={styles.main}>
      <div className={styles.forms}>
        {currentModal === 1 ? (
            
          <InputsForm child={parent} Changemodal = {test} />
          
        ) : (

          
          <FormCreate></FormCreate>
        )}

        

        
      </div>
    </div>
  );
};

export default Main;
