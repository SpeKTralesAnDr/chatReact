import React, { useEffect, useState, useMemo } from 'react';
import styles from './memberList.module.css'
const MemberList = ({ Users, role, IsOffline }) => {
    const [offlineUsers, setOfflineUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
  
    useEffect(() => {
      const updatedOfflineUsers = Users.clients.filter(user => user.status === 'offline');
      const updatedOnlineUsers = Users.clients.filter(user => user.status !== 'offline');
  
      setOfflineUsers(updatedOfflineUsers);
      setOnlineUsers(updatedOnlineUsers);
    }, [Users]);
  
  
    return (
        <div className={styles.UserList}>
            <div>
                <div className={styles.topic}>Online - {onlineUsers.length}</div>
                
                {onlineUsers.map(event => (
                    <div className={styles.block} key={event.name}>
                    <div className={styles.avatarBackground}>{event.avatar.exist === false ? (<div className={styles.avatar}> {event.name[0]}</div>):(<div className={styles.avatar}></div>)}</div>    
                        <div className={styles.name}>{event.name}</div>
                    </div>
                ))}
            </div>
            <div>
                <div className={styles.topic}>Offline - {offlineUsers.length}</div>
                {offlineUsers.map(event => (
                    <div className={styles.block} key={event.name}>
                     <div className={styles.avatarBackground}>{event.avatar.exist === false ? (<div className={styles.avatar}>{event.name[0]}</div>):(<div className={styles.avatar}></div>)}</div>           
                        <div className={styles.name}>{event.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberList;