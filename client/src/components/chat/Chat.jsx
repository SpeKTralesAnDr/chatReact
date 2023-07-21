import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsModule from '../components/settings/setting';

const Chat = ({socket}) => {
    const location = useLocation();
    const [settings, setSettings] = useState(0)

    // const searchParams = Object.fromEntries(new URLSearchParams(location.search));

    useEffect(() => {
    socket.on('NewPageConnectGetAnswer', (event) => {
      if(event.role == 'client'){
        
      }else if(event.role == 'host'){
        
        console.log(event.settings)
        setSettings(event.settings);

        
        // console.log('%c ' + 'поток от третьего получен', 'background: white; color: black', event)
      }
      console.log(`%cROLE: ${event.role}`, 'background: white; color: black; font-size: 24pt;');

      
  
    });
  }, []);
    
    
    
    useEffect(() => {
      socket.emit('NewPageConnect', localStorage.getItem('token'));
      console.log('ввв')
    }, []);
      

    





    return (
        <div>
           { settings != 0 ? (<div><SettingsModule settingsBoxes={settings} setSettingsForMain = {setSettings} > </SettingsModule></div>):<div></div> }
        </div>
    );
};

export default Chat;