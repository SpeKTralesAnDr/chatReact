import React, { useEffect, useState } from 'react';
import styles from './settings.module.css'
const SettingsModule = ({SettingsBoxes}) => {
  const [settingsBoxes, setSettingsBoxes] = useState([
    { id: 1, label: 'System messages',description:"By keeping this parameter enabled, you will receive important system messages regarding updates, notifications, and relevant information", type: 'checkbox', state: false },
    { id: 2, label: 'Limit of Users:',description:"Determine the maximum number of users who can connect to your room.", type: 'range', state: 10, min:2, max:120,},
    { id: 3, label: 'Password',description:"The option to add security to your room with a password", type: 'checkbox', state: true},
    { id: 4, label: 'Checkbox 3',description:"Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов", type: 'checkbox', state: false },
  ]);

// useEffect((console.log(settingsBoxes)),[settingsBoxes])
useEffect(() => {
  console.log(settingsBoxes);
}, [settingsBoxes]);
//----------------------------------------------------------------------------------------------------
  const  handleCheckboxChange = (event,value)=> {   
        console.log(value,'dddddddddddasdasdada')                                                                     //|
    const updatedSettingsBoxes = settingsBoxes.map((box) => {                                     //|
      if (box.id === event.id) {  
          if(box.type === 'checkbox'){

            return { ...box, state: !box.state }; // Изменяем состояние флажка | РАЗОБРАТЬ          //|
          }else if(box.type === 'range'){
          
            console.log(event)
            return { ...box, state: value};
          }                                                        //|
        }                                                                                         //|
        console.log(box)                                                                          //|
      return box;                                                                                 //|
    });                                                                                           //|
    SettingsBoxes(updatedSettingsBoxes)    
    console.log(updatedSettingsBoxes)                                                                                        //|
    console.log('сработало обновление')                                                                                        //|
      setSettingsBoxes(updatedSettingsBoxes)



                                     //|
  }                                                                                               //|
//----------------------------------------------------------------------------------------------------
  return (
    <div className={styles.SettingBLock}>
      <div className={styles.textaboutsettings}>Settings</div>
      {settingsBoxes.map((event) => (
        <div key={event.id} className={styles.blockInputs}>
          <div className={styles.labelInput}>
          <label className= {styles.label}>
          <div className={styles.labeltext}>{event.label}</div>
          {event.type === 'range' ? ( <div className={styles.valueOflimit}>{event.state}</div>): (<div></div>)}
          </label>
          
          <div className={styles.currentinput}>
             {event.type === 'range' ? ( <div className={styles.count}>{event.min}</div>): (<div></div>)}
            <input 
                  className={styles.inputsSettings}
                  min={event.min}
                  step={'1'}
                  max={event.max}
                  type={event.type}
                  id={event.id}
                  value={event.state}
                  checked={event.state}
                  onChange={(changeevent) => handleCheckboxChange(event, changeevent.target.valueAsNumber)}

                >
                  
                </input>
              {event.type === 'range' ? ( <div className={styles.count}>{event.max}</div>): (<div></div>)}
                
          </div>
          </div>
          <div className={styles.description}>
              {event.description }
          </div>
              
         
        </div>
      ))}
      
      
    </div>
  );
};

export default SettingsModule;
