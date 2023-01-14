import React from 'react';
import styled from 'styled-components';
import Robot from '../assests/robot-cute.gif';
import Logout from './Logout';


const Welcome = ({currentUser}) => {
  return (
    <Container>
      
      <img src={Robot} alt='robot'/>
      <h1> Welcome, <span>{currentUser.username}</span></h1>
      <h3>Please select a chat to Start Messaging.</h3>
       <div className="logout">
        <Logout/>
      </div> 
    </Container>
  )
}
const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    @media screen and (max-width:640px){
      display:none;
    }
    .head{
      display:flex;
      align-item:top;
      justify-content: flex-end;
    }
    img{
        height: 12rem;
    }
    h1{
      margin-bottom: .4rem;
    }
    span{
        // color: #4e0eff;
        color: #6D9886;
        
       
    }
    .logout{
      margin-top:2rem;
    }
`;
export default Welcome
