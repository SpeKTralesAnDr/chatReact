import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import InputsForm from '../components/form/formJoin.jsx';
import styles from './main.module.css';
import FormCreate from '../components/form/FormCreate.jsx';
import SettingsModule from '../components/settings/setting.jsx'
 

const Main = ({socket}) => {
  const [currentModal, setCurrentModal] = useState(1);
  const navigate = useNavigate();
  const [warn, SetWarn] = useState('')
  
  


  //   console.log(data);
  // });




  // const SendToServerFromFormJoin = (event) => {
  //   console.log(event)
  // }
  const SendToServerFromFormCreate = (event) => {
    console.log(event, 'eee');
    




    socket.emit('CreateTheRoom', event);

    socket.on('DataAboutCreatingRoom', (data) =>{

      if(data == 'error'){
        SetWarn('A room with that name already exists')
        
      }else{
          console.log(data)
          localStorage.setItem('token', data);
          // navigate(`/Chat?room=${event.settingsGeneral.room}&name=${event.settingsGeneral.name}`);
          navigate(`/Chat`);
 
      }
    })
  };
  const sendToServerFromFormJoin = (event) => {
    console.log(event, 'eee');
    //   console.log(socket)
    socket.emit('JoinToTheRoom', event);
    socket.on('DataAboutJoin', (data) =>{
      if(data.type == 'error'){
          SetWarn(data.description)
        }else{
          localStorage.setItem('token', data.content);
          navigate(`/Chat`);

      }
    console.log(data)
  })
  //   socket.on('')
  //   navigate(`/Chat?room=${event.settingsGeneral.room}&name=${event.settingsGeneral.name}`);
  };

 
  const [settingsToModule, setSettingsBoxes] = useState([
    { id: 'System messages', label: 'System messages',description:"By keeping this parameter enabled, you will receive important system messages regarding updates, notifications, and relevant information", type: 'checkbox', state: false },
    { id: 'LimitOfUsers', label: 'Limit of Users',description:"Determine the maximum number of users who can connect to your room.", type: 'range', state: 10, min:2, max:120,},
    { id: 'Password', label: 'Password',description:"The option to add security to your room with a password", type: 'checkbox', state: true},
  
   
  ]);

  return (
    <div className={styles.main}>
      <div className={styles.forms}>
        {currentModal === 1 ? (
            
          <InputsForm inputs={sendToServerFromFormJoin} Changemodal = {setCurrentModal} getwarn = {warn}  />
          
        ) : (

          
          <div className={styles.modals} >
            <FormCreate Changemodal = {setCurrentModal} sendToServer = {SendToServerFromFormCreate} settings = {settingsToModule} getwarn = {warn} ></FormCreate>
            <div className={styles.settings}> <SettingsModule  settingsBoxes={settingsToModule} setSettingsForMain = {setSettingsBoxes}></SettingsModule></div>
            
          </div>
        )}

        

        
      </div>
    </div>
  );
};

export default Main;
