import React, { useEffect, useRef, useState } from 'react';
const RtcRouter = ({data, socket}) => {
const videoRef = useRef(null);
const remotevideoRef = useRef(null);

var myStream 
const WRTCConnect = ()=>{
    if(data != 0){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true})
        .then(stream => {
            
            data.users.clients.map((e)=>{
                if(e.status !== 'offline'){
                    const pc = new RTCPeerConnection()
                    pc.ontrack = event => {
                        const stream = event.streams[0];
                        remotevideoRef.current.srcObject = stream
                        console.log('ONTRACK',event)// Получение потока из события
                        // Здесь вы можете использовать полученный поток (например, привязать его к <video> элементу)
                      };
                    stream.getTracks().forEach((track) => {
                        console.log('testtrack',stream)
                        pc.addTrack(track, stream);
                      });
                    if(data.name == e.name){
                        // videoRef.current.srcObject = stream

                        console.log('test')
                    }else{

                        pc.createOffer()
                        .then(offer =>{
                            pc.setLocalDescription(offer)
                            console.log(offer)
                            socket.on('PersonalAnswerOnSDP',(answer)=>{
                                console.log(answer)
                                const answerDescription = new RTCSessionDescription(JSON.parse(answer))
                                pc.setRemoteDescription(answerDescription)
                                .then(() => {
                                    socket.on('GetICE', (ice)=>{
                                        
                                        JSON.parse(ice).forEach(el =>{
                                            const newIceCandidate = new RTCIceCandidate(el);
                                            pc.addIceCandidate(newIceCandidate)
                                        })
                                        

                                        console.log('ice cands were added')
                                    })
                                    const ice = [];
                                    pc.onicecandidate = event => {
                                        if (event.candidate) {
                                            console.log('ice сгенерированны');
                                            console.log(event.candidate);
                                            ice.push(event.candidate);
                                            console.log(ice);
                                        }
                                        if (pc.iceGatheringState == 'complete') {
                                            socket.emit('SendICE', {ice:JSON.stringify(ice), name:e.name});
                                        }
                                    };
                                })
                                
                            })
                            socket.emit('SendOfferToEveryoneOfTheRoom',{offer:JSON.stringify(offer),name:e.name})
                        })
                        .catch(error => {
                            console.error('Ошибка при создании и отправке оффера:', error)  
                        })
                    }
                    
                }
                
                
                
            })
            socket.on('PersonalOfferSDP', offer => {
                const pc = new RTCPeerConnection();
            
                // Получение локальных потоков
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then(localStream => {
                        // Добавление локальных потоков к RTCPeerConnection
                        pc.ontrack = event => {
                            console.log('ontrack',event)
                            const remoteStream = event.streams[0];
                            remotevideoRef.current.srcObject = remoteStream
                            // Здесь вы можете использовать полученный поток (например, привязать его к <video> элементу)
                        };
                        localStream.getTracks().forEach(track => {
                            pc.addTrack(track, localStream);
                        });
            
            
                        const offerDescription = new RTCSessionDescription(JSON.parse(offer.sdp));
                        pc.setRemoteDescription(offerDescription)
                            .then(() => {
                                return pc.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
                            })
                            .then(answer => {
                                console.log('testtrack1', answer);
                                return pc.setLocalDescription(answer);
                            })
                            .then(() => {
                                socket.on('GetICE', ice => {
                                    JSON.parse(ice).forEach(el => {
                                        const newIceCandidate = new RTCIceCandidate(el);
                                        pc.addIceCandidate(newIceCandidate);
                                    });
                                    console.log('ice cands were added');
                                });
            
                                const ice = [];
                                pc.onicecandidate = event => {
                                    if (event.candidate) {
                                        console.log('ice сгенерированны pc2');
                                        console.log(event.candidate);
                                        ice.push(event.candidate);
                                        console.log(ice);
                                    }
                                    if (pc.iceGatheringState == 'complete') {
                                        socket.emit('SendICE', { ice: JSON.stringify(ice), name: offer.name });
                                    }
                                };
                            })
                            .then(() => {
                                socket.emit('SendAnswerSDP', { sdp: JSON.stringify(pc.localDescription), name: offer.name });
                            })
                            .catch(error => {
                                console.error('Ошибка при создании и отправке ответа:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Ошибка получения локальных потоков:', error);
                    });
            });
            
            
            
        })
        .catch(error => {
            console.error('Ошибка получения потока с аудио и видео:', error);
          }); 
        
        

    }
}
    useEffect(()=>{
        
       














        // socket.on('pm', (e)=>{
        //     console.log(e)
        // })
    },[data])
    // const test = ()=>{

    //     const input = prompt("Please enter your age:");
       
    //         socket.emit('pm', socket.id)
            
    // }
   
    return (
        <div>
            {/* <audio ref={videoRef} style={{ maxWidth: '100%', height: 'auto' }} muted={true} autoPlay /> */}
            <audio ref={remotevideoRef} style={{ maxWidth: '100%', height: 'auto' }} muted={false} autoPlay />
            <button onClick={WRTCConnect}>dddd</button>
            {/* <button onClick={test}></button> */}
            gfdgdfg
        </div>
    );
};

export default RtcRouter;