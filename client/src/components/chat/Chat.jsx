import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import SettingsModule from '../components/settings/setting';
import ChatMessages from '../components/chatMessages/chatMessages';
import styles from './chat.module.css'
import Panelchangewindow from '../panelchangewindow/panelchangewindow';



const Chat = ({socket}) => {
  const navigate = useNavigate();
    const [data, setData] = useState(0)
    const location = useLocation();
    const [settings, setSettings] = useState(0)
    const [messages, SetMessages] =
    useState([{
      id:Date.now(),
      avatar:{
        exist:false,
        sourse:'https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg'
      },
      time: (`${new Date(Date.now()).getHours()}:${String(new Date(Date.now()).getMinutes()).padStart(2, '0')}`),
      name:'Room notification',
      content:[
        "Keep rules of the community","Have fun."
      ]}])

    

    
      const SendMessage=(event)=>{
      console.log(event)
      
      socket.emit('sendmessagefromclient', event)
      event = {name:data.user,content:event, avatar:{exist:false, sourse:''}, id:Date.now(),time:(Date.now())}
      handleMessageFromClient(event)
      console.log(event)
      console.log(data)
    }
// -------------------------------------------------------------------------------------------------------------

const [switchers, setSwitchers] = useState([
    {id:'Chat', value:'Chat', State:true, },
    {id:'Members', value:'Members', State:false, },
    {id:'Settings', value:'Settings', State:false, }
])
const [rightpanelwindow, setRightpanelwindow ] = useState('Chat')
useEffect(()=>{
    console.log(switchers)
},[switchers])

const handleMessageFromClient = (e) => {
    if(e.name != data.user){
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted" && document.visibilityState =='hidden') {
                    
                new Notification(e.name, {
                    body: e.content,
                    icon: "https://wp-s.ru/wallpapers/3/16/517133797886000/polosatyj-kot-ledit-na-svoej-lapke.jpg",
                    // silent: true,
                    lang: "en",
                    vibrate: [200, 100, 200],
                    timestamp: Date.now(),
                    renotify: true,
                    tag: "notification-tag",
                    badge: "https://wp-s.ru/wallpapers/3/16/517133797886000/polosatyj-kot-ledit-na-svoej-lapke.jpg",
                    image: "https://wp-s.ru/wallpapers/3/16/517133797886000/polosatyj-kot-ledit-na-svoej-lapke.jpg",
                    data: {
                      customData: "Additional data for the notification",
                    }
                });
              }
            });
          }
    }
  // Проверяем, совпадает ли имя сообщения с именем последнего сообщения в массиве
  if (e.name === messages[messages.length - 1]?.name) {
    console.log('names are the same', e.name, '==', messages[messages.length - 1]?.name);
    // Если имена совпадают, обновляем контент последнего сообщения в массиве
    SetMessages(prevMessages => {
      // Создаем новый массив messages, чтобы не мутировать предыдущее состояние
      const updatedMessages = [...prevMessages];
    
      // Получаем элемент с нужным индексом (последний элемент) и обновляем его свойство content
      updatedMessages[messages.length - 1] = {
        ...updatedMessages[messages.length - 1],
        content: [...updatedMessages[messages.length - 1].content, e.content]
      };
    
      return updatedMessages; // Возвращаем новый массив с обновленным content
    });
  } else {
    // Если имена не совпадают, добавляем новое сообщение в массив
    SetMessages(prevMessages => [
      ...prevMessages,
      {
        id: e.time,
        avatar: {
          exist: false,
          sourse: 'https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg'
        },
        time: (`${new Date(e.time).getHours()}:${String(new Date(e.time).getMinutes()).padStart(2, '0')}`),
        name: e.name,
        content: [e.content]
      }
    ]);
    console.log('names are not the same', e.name, '==', messages[messages.length - 1]?.name);
  }
};

;//ПРОСТО БРЕД ПОЧЕМУ ЕСЛИ НЕ ОТПИСАТЬСЯ НАДО БУДЕТ ПОСМОТРЕТЬ----------------------------------------



useEffect(() => {
  socket.on('sendmessagefromclient', handleMessageFromClient);
  return () => {
    socket.off('sendmessagefromclient', handleMessageFromClient);
  };
}, [messages]);

useEffect(() => {
  socket.on('NewPageConnectGetAnswer', (event) => {
    if (event.type === 'error') {
      navigate(`/Error?error=${event.description}`);
    } else {
      if (event.role === 'client') {
        console.log(event);
        setData(event);
      } else if (event.role === 'host') {
        console.log(event);
        // setSettings(event.settings);
        setData(event);
        // console.log('%c ' + 'поток от третьего получен', 'background: white; color: black', event)
      }

      console.log(`%cROLE: ${event.role}`, 'background: white; color: black; font-size: 24pt;');

      socket.on("newUser", (newUserData) => {
        SetMessages(prevMessages => [
          ...prevMessages,
          {
            id: newUserData.time,
            avatar: { exist: false, sourse: '' },
            time: (`${new Date(newUserData.time).getHours()}:${String(new Date(newUserData.time).getMinutes()).padStart(2, '0')}`),
            name: 'Room notification',
            content: [newUserData.message.content]
          }
        ]);
        console.log(newUserData);
      });

      socket.on("online", (event) => {
        console.log(event);
      });

      // const currentDate = new Date(Date.now());
      // const hours = new Date(Date.now()).getHours();
      // const minutes = new Date(Date.now()).getMinutes();
      console.log(new Date(Date.now()).getHours(), ':', String(new Date(Date.now()).getMinutes()).padStart(2, '0'));
    }
  });
}, []);

useEffect(() => {
  socket.emit('NewPageConnect', localStorage.getItem('token'));
  console.log('ввв');
}, []);






    return (
        <div className={styles.background}>
            <div className={styles.header}>dsdd</div>
             <div className={styles.wChat}> 
            <div className={styles.video}>
                <div>

                </div>
                <div className={styles.SettingsOfCall}></div>
            </div>
           {/* { data.role == 'host' ? (<SettingsModule className={styles.settings}settingsBoxes={data.settings} setSettingsForMain={newSettings => setData({ ...data, settings: newSettings })}  > </SettingsModule>):<div></div> } */}
          <div className={styles.rightPanel}>
           <Panelchangewindow data = {data.role} Chagewindow={setRightpanelwindow} set></Panelchangewindow>
          <div  className= {styles.Chat}><ChatMessages messages = {messages}  SendMessage= {SendMessage}  name = {data.user}></ChatMessages></div>
          </div>
          {/* СНИЗУ КОД НУЖНО РАЗОБРАТЬ  */}
          {/* <button onClick={showNotification}>Показать уведомление</button> */}
        </div>
        </div>
    );
};

export default Chat;