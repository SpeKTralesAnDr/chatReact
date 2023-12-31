import React, { useEffect, useState } from 'react';
import styles from './chatMessages.module.css';
import SendIcon from '@mui/icons-material/Send';

const ChatMessages = ({ messages,SendMessage, name,  }) => {
  const [valueOfInput, setValueOfInput] = useState('')
 
  const checkkey = (event)=>{
    if(event.keyCode == 13 && valueOfInput.length > 0){
      console.log('send', valueOfInput)
      SendMessage(valueOfInput)
      setValueOfInput('')

    }
  }
  const send = (event)=>{
    
     
     if(valueOfInput.length > 0){
      SendMessage(valueOfInput)
      console.log(valueOfInput);
      setValueOfInput('')
      
     }

    }
  return (
    <div className={styles.ChatMessages}>
      <div className={styles.ChatContent}> 
        {
        messages.map((event) => (
          <div className={event.name != name ?(styles.message):(styles.Mymessage)} key={event.id}> 
            <div className={styles.avatar}>
                {event.avatar.exist === true ? (<div>
                  <img src={event.avatar.sourse} alt="is not avaiable" className={styles.avatarImage} />
                </div>):(<div className={styles.InsteadOfAvatar}>
                  {event.name[0]}
                </div>)}
              
            </div>
            <div className={styles.BackGroundOfMessage}>
              <div className={styles.HeaderOfMessage}>
                <div className={event.name != name ?(styles.name):(styles.Myname)}>{event.name}</div>
                <div className={styles.time}>{event.time}</div>

              </div>
              <div className={styles.messageContent}>
                {/* Используйте return для возврата элементов JSX внутри .map() */}
                {event.content.map((message, index) => (
                
                  <div key = {index}>{message}</div>  // ВАЖНО ИНДЕКС В КЛЮЧЕ НУЖНО БУДЕТ УБРАТЬ
                ))}
              </div>
            </div>
          </div>
        ))
        }

      </div>
        
      <button className={styles.button} onClick={send}>
        <SendIcon ></SendIcon>
      </button>
      <input placeholder={`Message to chat`}className={styles.inputMessage}  value={valueOfInput}onChange={(e)=>{setValueOfInput(e.target.value)}} onKeyDown={(event) => {checkkey(event)}}></input>
    </div>
  );
};

export default ChatMessages;