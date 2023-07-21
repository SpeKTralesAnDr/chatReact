import React, { useEffect, useState } from 'react';
import styles from './settings.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const SettingsModule = ({SettingsOfTheRoomFunction, settingsBoxes, setSettingsForMain}) => {

const handleChangeAdditionalBlock = (event)=>{
  console.log(event)
}
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

    console.log(updatedSettingsBoxes)                                                                                        //|
    console.log('сработало обновление')                                                                                        //|
    setSettingsForMain(updatedSettingsBoxes)



                                     //|
  }                                                                                               //|
//----------------------------------------------------------------------------------------------------
  return (
    <div className={styles.SettingBLock}>
      <div className={styles.textaboutsettings}>Settings</div>



      {settingsBoxes.map((event) => (
        event.type === 'range' || event.type === 'input' || event.type === 'checkbox' ? (

        <div key={event.id}>
         
        <div className={styles.blockInputs}>
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
              {event.additionalBlocks !== undefined ? (
              <div>
                {event.additionalBlocks.map((block) =>
                  block.element === 'button' ? (
                    <button className={styles.buttonAdditional} onClick={(blockEvent)=>{handleChangeAdditionalBlock(blockEvent)}}>
                      <ContentCopyIcon></ContentCopyIcon>
                    </button>
                  ) : (
                    <div>не</div>
                  )
                )}
              </div>
            ) : (
              <div>не хуй</div>
              )}
                
          </div>
          </div>
          <div className={styles.description}>
              {event.description }
          </div>
              
         
        </div>
 
        
              
         
     
        </div>
        )
         :
        (<div>
          
        </div>)
      ))}



      
      
      
    </div>
  );
};

export default SettingsModule;
