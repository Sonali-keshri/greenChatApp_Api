import React,{useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
// import Messages from './Messages';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {format} from 'timeago.js';
// import moment from 'moment';

const ChatContainer = ({currentChat, currentUser, socket}) => {
    const [messages, setMessages] = useState([]);
    const [arrivalmsg , setArrivalMsg] = useState(null);

    const scrollRef = useRef();

    useEffect(()=>{
         async function fetchData(){
            if(currentChat){          
                const response = await axios.post(getAllMessagesRoute,{
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            }
    }
    fetchData();
     },[currentChat]);

    const handleSendMsg = async (msg) =>{
            await axios.post(sendMessageRoute,{
                from:currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            socket.current.emit('send-msg', {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,
            })
            const msgs = [...messages];
            msgs.push({fromSelf: true, message:msg});
                setMessages(msgs);
    };  
    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve',(msg)=>{
                console.log({msg});
                setArrivalMsg({fromSelf:false, message: msg});
            });
        }
    },[]);
    useEffect(()=>{
        arrivalmsg && setMessages((prev)=>[...prev, arrivalmsg]);
    },[arrivalmsg]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
    },[messages]);

  return (
    <>
    {currentChat &&(
    <Container>
      <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
            <img src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`} alt='avatar'  />
            </div>
            <div className="username">
                <h3>{currentChat.username}</h3>
            </div> 
        </div>
        <Logout />
      </div>
        <div className="chat-messages">
        {
            messages.map((message)=>{
                return(
                    <div ref={scrollRef} key={uuidv4}>
                            <div className={`message ${message.fromSelf ? 'sended':'recieved'}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                        {/* <span>{format(message.createdAt)}</span> */}
                                </div>
                            </div>
                    </div>
                )
            })
        };
        </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
    )
}
    </>
  )
}

const Container = styled.div`
    // padding-top: 1rem;
    display: grid;
    grid-template-rows: 12% 77% 11%;
    gap:.1rem;
    overflow: hidden;
    // @media screen and (max-width:640px){
    //     display:none;
    //   }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0 2rem;
        background-color:#1C675880;
        .user-details{
            display:flex;
            align-items:center;
            gap:1rem;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .username{
                h3{
                    color:white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
                // width: fit-content;
                max-width: 40%;
                display:flex;
                flex-direction:column;
                overflow-wrap: break-word;
                padding: .6rem;
                font-size: 1.1 rem;
                border-radius: .8rem;
                
                color: black;
                span{
                    font-style: sans-serif;
                    font-weight: 200px;
                    color: white;
                    margin-top: .2rem;
                    text-align: right;
                    font-size: .8rem;
                }
            }
        }
        .sended{
            justify-content:  flex-end;
            .content{
                // background-color: #4f04ff21;
                background-color: #FEFBF686;
                border-bottom-right-radius: 0;
            }
        }
        .recieved{
            justify-content: flex-start;
            .content{
                // background-color:#9900ff20;
                // background-color: #5F716190;
                background-color: #6D9886;
                border-top-left-radius: 0;
                color: white;
                span{
                    color: black;
                }
            }
        }
    }

`;

export default ChatContainer;
