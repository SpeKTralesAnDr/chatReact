import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import SettingsModule from '../components/settings/setting';
import ChatMessages from '../components/chatMessages/chatMessages';
import styles from './chat.module.css'
import Panelchangewindow from '../panelchangewindow/panelchangewindow';
import io from 'socket.io-client';
import MemberList from '../components/Members/memberList';


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
    const [Users, SetUsers] = useState([])
    

    
      const SendMessage=(event)=>{
      console.log(event)
      
      socket.emit('sendmessagefromclient', event)
      event = {name:data.name,content:event, avatar:{exist:false, sourse:''}, id:Date.now(),time:(Date.now())}
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





const [Rightpanelwindow, setRightpanelwindow ] = useState('Chat')
useEffect(()=>{
    console.log(data)
},[data])







const handleMessageFromClient = (e) => {
  if (e.name !== data.user) {
      if ("Notification" in window) {
          Notification.requestPermission().then((permission) => {
              if (permission === "granted" && document.visibilityState === 'hidden') {
                  new Notification(e.name, {
                      body: e.content,
                      icon: "https://wp-s.ru/wallpapers/3/16/517133797886000/polosatyj-kot-ledit-na-svoej-lapke.jpg",
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

  if (e.name === messages[messages.length - 1]?.name) {
      console.log('Names are the same:', e.name, '==', messages[messages.length - 1]?.name);
      SetMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[messages.length - 1] = {
              ...updatedMessages[messages.length - 1],
              content: [...updatedMessages[messages.length - 1].content, e.content]
          };
          return updatedMessages;
      });
  } else {
      SetMessages(prevMessages => [
          ...prevMessages,
          {
              id: e.time,
              avatar: {
                  exist: false,
                  source: 'https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg'
              },
              time: `${new Date(e.time).getHours()}:${String(new Date(e.time).getMinutes()).padStart(2, '0')}`,
              name: e.name,
              content: [e.content]
          }
      ]);
      console.log('Names are not the same:', e.name, '==', messages[messages.length - 1]?.name);
  }
};

;//ПРОСТО БРЕД ПОЧЕМУ ЕСЛИ НЕ ОТПИСАТЬСЯ НАДО БУДЕТ ПОСМОТРЕТЬ----------------------------------------








useEffect(() => {
  socket.on('sendmessagefromclient', handleMessageFromClient);
  return () => {
    socket.off('sendmessagefromclient', handleMessageFromClient);
  };

}, [messages]);




const handleUserIsOffline = (offlineUserName) => {
  console.log(offlineUserName);
  setData((prevData) => ({
    ...prevData,
    users: {
      ...prevData.users,
      clients: prevData.users.clients.map((client) => {
        if (client.name === offlineUserName.name) {
          console.log('same');
          return { ...client, status: offlineUserName.status };
        }
        return client;
      }),
    },
  }));
};





useEffect(() => {
  console.log(data)
  socket.on('userIsOFFON', handleUserIsOffline);

  return () => {
    socket.off('userIsOFFON', handleUserIsOffline);
  };
}, [data]);





useEffect(() => {
  socket.emit('NewPageConnect', localStorage.getItem('token'));
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

   // console.log({...newUserData, avatar:{ exist: false, sourse: '' }}); // ПОТОМ НУЖНО БУДЕТ ДОБАВИТЬ АВУ
   setData(prevData => {
    return {
      ...prevData,
      users: {
        host: prevData.users.host,
        clients: [...prevData.users.clients, newUserData.user]
      }
    };
  });
  
  });
  // socket.on('sendmessagefromclient', (event)=>{
  //   handleMessageFromClient(event)
  //   console.log(event)
  //   console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
  // })
 








  socket.on('DataAboutUser', (event) => {
    console.log(event)
    if (event.type === 'error') {
        navigate(`/Error?error=${event.description}`);
      } else {
        console.log(`%c YOUR ROLE IS ${event.role}`, 'background: white; color: red; font-size: 24pt;');
        console.log(event)
       
      setData(event);
      
    
      }
    
     



      

    
  });




  
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
           {Rightpanelwindow === 'Settings' ? (
            
            <div className={styles.settings}>
              <SettingsModule
                className={styles.settings}
                settingsBoxes={data.settings}
                setSettingsForMain={newSettings => setData({ ...data, settings: newSettings })}
            >
            </SettingsModule>
            </div>
        ) : Rightpanelwindow === 'Chat' ? (
            <div  className= {styles.Chat}>
              <ChatMessages messages = {messages}  SendMessage= {SendMessage}  name = {data.user}></ChatMessages>
              </div>
        ) : Rightpanelwindow === 'Members' ? (
           <div className={styles.MemberList}>
              <MemberList Users = {data.users} role = {data.role} >
                
              </MemberList>
          </div>
        ):(
          <div>

          </div>
        )
}

            
          </div>
          {/* СНИЗУ КОД НУЖНО РАЗОБРАТЬ  */}
          {/* <button onClick={showNotification}>Показать уведомление</button> */}
        </div>
        </div>
    );
};

export default Chat;