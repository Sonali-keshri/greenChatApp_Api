import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assests/wechat.png";
import Logout from "./Logout";
import {FiChevronRight} from 'react-icons/fi';
import { BsWindowSidebar } from "react-icons/bs";
// import {BiSearchAlt} from 'react-icons/bi';


const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserSelected, setCurrentUserSelected] = useState(undefined);
  const [searchItem, setSearchItem] = useState("");
  const [windowWidth , setWindowWidth] = useState(window.innerWidth)

  // const navigate = useNavigate();
  useEffect(() => {
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);  
    }
    
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    changeChat(contact);
  };

  const detectSize =()=>{
    setWindowWidth(window.innerWidth)
  }

  useEffect(()=>{
    
  })
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="header">
            <div className="brand">
            <img src={logo} alt="logo" />
            <h3>ChatApp</h3>
            </div>
            <div className="right-side">
                  <input placeholder="Search contact" onChange={(e) => setSearchItem(e.target.value)} />
                  
                </div>
            </div>
          
          <div className="contacts">
            {
                contacts.filter((contact) => contact.username.toLowerCase().includes(searchItem)).map((contact, index) => {
                return(
                    <div className={`contact ${index === currentUserSelected ? 'selected':''}`} key={contact._id} onClick={()=>changeCurrentChat(index, contact)}>
                        <div className="avatar">
                        <img src={`data:image/svg+xml;base64, ${contact.avatarImage}`} alt='avatar' 
                         />
                        </div>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                        <div className="forward-icon">
                          <FiChevronRight/>
                        </div>
                    </div>
                );
            })};
            </div>
            <div className="current-user">
                        <div className="avatar">
                        <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt='avatar' 
                         />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                        <div className="logout">
                        <Logout />
                        </div>
            </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`

display: grid;
grid-template-rows: 14% 74% 12% ;
overflow: hidden;
background-color: #1C675880;
padding-top: 1rem;
@media screen and (max-width: 1007px){
  grid-template-rows: 12% 78% 10% ;
}
@media screen and (max-width: 640px){
  grid-template-rows: 12% 76% 12% ;
  height: 94vh;
  .contacts{
    margin: 1rem 0rem;
  }
}
.header{
  display: flex;
  align-items:center;
  flex-direction:column;
  
.brand {
  display: flex;
  align-items: center;
  // justify-content: flex-start;
  gap: .2rem;
  @media screen and (max-width:640px){
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
    margin-right: 1rem;  
  } 
  img {
    height: 2.5rem;
    @media screen and (max-width:640px){
      height: 3rem;
    }
  }
  h3 {
    color: white;
    text-transform: uppercase;
  }
}
.right-side{
    display:flex;
    align-items: center;
    justify-content: space-evelny;
    font-size: 1.8rem;
    gap: .2rem;
    width: 90%;
      input{
        margin: .5rem .2rem;
        padding: .4rem;
        font-size: 1rem;
        border-radius:6px;
        outline: none;
        border: none;
        width:100%;
        @media screen and (max-width:640px){
          width:100%;
        }
      }
    
    }

  }
}
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  margin-top: 1rem;
  &::-webkit-scrollbar{
    width: .2rem;
    @media screen and (max-width:640px){
    width: .4rem;
    }
    &-thumb{
        background-color: #ffffff39;
        width : .4rem;
        border-radius: 1rem;
    }
}
  .contact {
        background-color: #ffffff34;
        min-height:4rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: grid;
        grid-template-columns: 10% 65% 5%;
        align-items: center;
        gap:2rem;
        transition: 0.5s ease-in-out;
        .avatar{
          img{
            height:3rem;
            @media screen and (max-width:1007px){
              height:2.5rem;
            }
            @media screen and (max-width:640px){
              margin-left: .8rem;
            }
          }
        }
        .username{
            h3{
              color: white;
              @media screen and (max-width:1007px){
                font-size: 1rem;
              }
              @media screen and (max-width:640px){
                margin-left: 0rem;
                display: block;
              }
            }
          }
        .forward-icon{
          display: none;
          @media screen and (max-width:640px){
            display: flex;
            color: white;
            font-size: 1rem;
            justify-content: flex-end;
          }
          svg{
            display:flex;
            justify-content: flex-end;
          }
        }
       }
       .selected{
        // background-color: #9186f3;
        background-color: #94B49F;
       }
  }
  .current-user{
    background-color: #1C675880;
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar{
      img{
        height: 2.8rem;
        max-inline-size: 100%;
      }
    }
    .username{
      h2{
        color: white; 
      }
    }
    .logout{
      display:none;
    }
    @media screen and (max-width:1007px){
      gap: 0.5rem;
      .username{
         h2{
          font-size: 1rem;
         }
      }
    }
    @media screen and (max-width:640px){
      display: flex;
      padding-left: 1rem;
      // grid-template-columns: 10% 68% 12%;
      gap: 5%;
      margin-top:0px;
      .username{
         h2{
          font-size: 1.2rem;
         }
      }
      .logout{
          display: inline;  
      }
    }
    
    
  }
 


`;
export default Contact;
