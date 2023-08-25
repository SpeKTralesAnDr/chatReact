import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlockNavigate = () => {
    const navigate = useNavigate()
    const goto = ()=>{
        navigate('/chatv2')
    }
    return (
        <div>
            <button onClick={goto}>dasda</button>
        </div>
    );
};

export default BlockNavigate;