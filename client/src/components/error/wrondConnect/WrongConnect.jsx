import React from 'react';
import styles from './WrongConnect.module.css'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useLocation, useNavigate } from 'react-router-dom';
const WrongConnect = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const about = Object.fromEntries(new URLSearchParams(location.search))
    return (
        <div className={styles.background}>
            <div className={styles.block}>
            <DoNotDisturbAltIcon  style={{ fontSize: '200pt' }}/>
            <div className={styles.aboutERROR}>
                <div className={styles.error}>
                    {about.error}
                </div>
                <button className={styles.button}
                onClick={()=>{navigate('/')}}>To main page</button>

            </div>

            </div>

        </div>
    );
};

export default WrongConnect;