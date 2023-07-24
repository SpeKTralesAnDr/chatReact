import React, { useEffect, useState } from 'react';
import styles from './settings.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
const SettingsModule = ({SettingsOfTheRoomFunction, settingsBoxes, setSettingsForMain}) => {

const handleChangeAdditionalBlock = (event)=>{
  console.log(event)
}
//----------------------------------------------------------------------------------------------------
const handleCheckboxChange = (event, value) => {
  console.log(value, 'dddddddddddasdasdada');

  const updatedSettingsBoxes = settingsBoxes.map((box) => {
    if (box.id === event.id) {
      if (box.type === 'checkbox') {
        return { ...box, state: !box.state };
      } else if (box.type === 'range') {
        console.log(event);
        return { ...box, state: value };
      }
    }
    
    if (box.additionalBlocks !== undefined) {
      const updatedAdditionalBlocks = box.additionalBlocks.map((additionalelem) => {
        console.log(additionalelem);
        console.log(event);
        if (additionalelem.id === event) {
          console.log('[ХУУУУУй');
          if (additionalelem.id === 'ButtonToCopyURL') {
            console.log('meeeow');
            return { ...additionalelem, state: true };
          }
        }
        return additionalelem;
      });

      return { ...box, additionalBlocks: updatedAdditionalBlocks };
    }

    return box;
  });

  console.log(updatedSettingsBoxes);
  console.log('сработало обновление');
  setSettingsForMain(updatedSettingsBoxes);
};
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
          
        
          </label>
          
          <div className={styles.currentinput}>
          {event.additionalBlocks !== undefined ? (
              <div>
                {event.additionalBlocks.map((block) =>
                  block.element === 'button' ? (// НУЖНО ДОБАВИТЬ УСЛОВИЕ ЕСЛИ ЭТО НЕ ИНВАЙТ КОПИ ЛИНК ТО ДРУГАЯ ШТУКОВИНА БУДЕТ
                    <div key = {block.id} >
                    
                      <CopyToClipboard
                        text={event.URL}
                        className={block.state == true ? (styles.ButtonURLClicked): (styles.ButtonURLnotclicked) }
                        onCopy={(blockEvent)=>{handleCheckboxChange( block.id)}}
                        id = {block.id}
                        >
                          <ContentCopyIcon></ContentCopyIcon>
                         {/* <div>  {block.id}</div> */}
                        
                     </CopyToClipboard>
                
                    </div>
                    
                  ) : (
                    <div></div>
                  )
                )}
              </div>
            ) : (
              <div></div>
              )}
             {event.type === 'range' ? ( <div className={styles.count}>{event.state}</div>): (<div></div>)}
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
