import React from 'react';
import io from 'socket.io-client'
import InputsForm from '../components/form/form.jsx';
import styles from './main.module.css'
const Main = () => {
    
    const socket = io.connect('http://localhost:5005')
    socket.on("test", ({ data }) => {console.log(data)})


    return (
        <div className={styles.main}>
            <InputsForm>
            </InputsForm>
        </div>
    );
};

export default Main;