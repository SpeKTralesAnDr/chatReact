import React, { useState } from 'react';
import styles from './settings.module.css'
const SettingsModule = () => {
  const [settingsBoxes, setSettingsBoxes] = useState([
    { id: 1, label: 'System messages',description:"РОМА ГЕЙ (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов", type: 'checkbox', state: false },
    { id: 2, label: 'Limit of Users',description:"Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов", type: 'range', state: 1 },
    { id: 3, label: 'Enable password',description:"Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов", type: 'checkbox', state: false },
    { id: 4, label: 'Checkbox 3',description:"Текст (от лат. textus «ткань; сплетение, связь, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов", type: 'checkbox', state: true },
  ]);



//----------------------------------------------------------------------------------------------------
  function handleCheckboxChange(event) {  
                                                                                                  //|
    const updatedSettingsBoxes = settingsBoxes.map((box) => {                                     //|
      if (box.id === event.id) {                                                                  //|
          return { ...box, state: !box.state }; // Изменяем состояние флажка | РАЗОБРАТЬ          //|
        }                                                                                         //|
        console.log(box)                                                                          //|
      return box;                                                                                 //|
    });                                                                                           //|
                                                                                                  //|
    setSettingsBoxes(updatedSettingsBoxes);                                                       //|
    console.log(`Checkbox ${event.id} changed`);                                                  //|
  }                                                                                               //|
//----------------------------------------------------------------------------------------------------
  return (
    <div className={styles.SettingBLock}>
      <div className={styles.textaboutsettings}>Settings</div>
      {settingsBoxes.map((event) => (
        <div key={event.id} className={styles.blockInputs}>
          <div className={styles.labelInput}>
          <label className= {styles.label}>{event.label}</label>
          <div className={styles.currentinput}>
            <input 
                  className={styles.inputsSettings}
                  min={'2'}
                  step={'1'}
                  max="10"
                  type={event.type}
                  id={event.id}
                  
                  checked={event.state}
                  onChange={() => handleCheckboxChange(event)}

                >
                  
                </input>
                
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
