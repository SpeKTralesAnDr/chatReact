import React from 'react';
// import React, { useEffect, useState } from 'react';
import styles from './form.module.css'

const FormCreate = () => {
    return (
        <div className={styles.box}>
            <div className={styles.text}>Create Room</div>
            <div className={styles.warn}></div>
            <input
                className={styles.input}
                placeholder='Your Name'
                
               
                
            >
            </input>
            <input
                className={styles.input}
                placeholder='Name of the room'
                
             
            >
            </input>
            <input
                className={styles.input}
                placeholder='Password'
                type="password"
                

            >
            </input>
            <input
                className={styles.input}
                placeholder='Password'
                type="password"
                
               
                

            >
            </input>
                <button
                className={styles.link}
                >Join room
                </button>
            <button
             className={styles.button}
            
             >
            Create

            </button>
        </div>
    );
};

export default FormCreate;