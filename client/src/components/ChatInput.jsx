import React,{useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'


const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleShowHideEmojiPicker =()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiSelect =(event, emoji) =>{
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    setShowEmojiPicker(false);
    
  };

  const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg('');
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleShowHideEmojiPicker}/>
            {
              showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect}  />
            }
      
        </div>
        <div>
          +
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='Type Your Message Here!' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button className="submit" >
        <IoMdSend/>
        </button>
      </form>
    </Container>
  )
}
const Container = styled.div`
    // height: 10%;
    display: grid;
    grid-template-columns: 8% 92%;
    align-items : center;
    // background-color: #080420; 
    // background-color: #3D8361; 
    background-color: #1C675880; 
    padding: 0.4rem;
    padding-bottom: 0.3rem;
    @media screen and (max-width:1007px){
      grid-template-columns: 12% 88%;
     padding: 0 1rem;
     gap:1rem;

    }
    .button-container{
      display: flex;
      align-items: center;
      color: white;
      gap: 1rem;
      .emoji{
        position: relative;
        // padding-left: .2 rem;
        svg{
          font-size:1.5rem;
          color: #ffff00c8;
          cursor: pointer;
        }
        .emoji-picker-react{
          position: absolute;
          top: -350px;
        }
      }
    }
    .input-container{
      width:100%;
      // height: 80%; 
       border-radius: 2rem;
      display: flex;
      align-content: center;
      gap: 2rem;
      background-color: #ffffff90;
      color: white;
     
      input{
        width:90%;
        // height:40%;
        background-color: transparent;
        color: black;
        border: none;
        padding: .4rem 1rem;
        padding-top: .2rem;
        font-size: 1rem;
        &::selection{
          background-color :#9a86f3;
        }
        &:focus{
          outline: none; 
        }
      }
      button{
        padding: 0.2rem 1.6rem;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: #9a86f3;
        background-color: #fff;
        border: 2px solid #6D9886;
        @media screen and (max-width:1007px){
          padding: .3rem 1rem;
          svg{
            font-size: 1rem;
          }
        }
        
        svg{
          font-size: 1.6rem;
          color:#6D9886;
          cursor: pointer;
        }
      }
    }
`;

export default ChatInput;
