import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
// import loader from '../assests/loader.gif';
import loader from '../assests/duckload.gif';
import {Buffer} from 'buffer';
const SetAvatar = () => {
  const navigate = useNavigate();
    const api = 'https://api.multiavatar.com/45678945';
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position:'bottom-right',
        autoClose:5000,
        pauseOnHover: true,
        draggable:true,
        theme:"sucess"
      }

      useEffect(()=>{
        async function fetchData(){
          if(!localStorage.getItem('chat-app-user'))
          navigate('/login') 
        }
        fetchData();
      },[])
      // useEffect(async () => {
      //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      //     navigate("/login");
      // }, []);

    const setProfilePicture = async () =>{
      if(selectedAvatar === undefined){
        toast.error("Please Select Profile Picture", toastOptions);
      }
      else{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        console.log(data);

      if (data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate("/");
      }else{
        toast.error('Error setting avatar. Please try again', toastOptions);
        }
      }
    };
    useEffect(()=>{
      async function fetchData(){
        const data = [];
        for(let i=0; i<4; i++){
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer(image.data); 
          data.push(buffer.toString('base64'));
        } 
        setAvatars(data);
        setIsLoading(false);
      }
      fetchData();

      }, [])
      

  return (
    <>
    {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 3rem;
        background-color: #131324;
        height:100vh;
        width: 100vw;
        .loader{
            height:20%;
            // max-inline-height: 100%;
        }
        .title-container{
            h1{
                color: white;
            }
        }
        .avatars{
            display: flex;
            gap:2rem;
            .avatar{
                border: 0.4rem solid transparent; 
                padding: 0.4rem;
                border-radius: 5rem;
                display:flex;
                justify-content: center;
                align-item:center;
                transition: 0.5s ease-in-out;
                cursor: pointer;
                img{
                    height: 6rem;
                }
            }
            .selected{
              border: 0.4rem solid #4e0eff;

            }
        }
.submit-btn{
  background-color: #997af0;
      color: white;
      // font-weight: bold;
      padding: 1rem 2rem;
      cursor: pointer;
      border: none;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color: #4e0eff;
}

`;

export default SetAvatar;

