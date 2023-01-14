import React,{useState,useEffect } from 'react';
import styled from 'styled-components';
import logo from '.././assests/wechat.png';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:'',
    password:'',
    
  }) 

  const toastOptions = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover: true,
    draggable:true,
    theme:"dark"
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[])

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation()){
      const {password, username} = values;
      const {data} = await axios.post(loginRoute, {
        username,
        password
    });
      console.log(data);
      if(data.status===false){
        toast.error(data.msg, toastOptions)
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
      }
      navigate('/');
    };
  };
  
  const handleValidation = async ()=>{
    const {password, username} = values;
    if(password===''){
      toast.error('Username and password is required.',toastOptions);
      return false;
    }     
    else if(username === ''){
      toast.error('Username and password is required.',toastOptions);
      return false;
    }
    return true; 
  }

  const handleChange = (event)=>{
    setValues({...values, [event.target.name]:event.target.value})
  };
  
  return (
    <>
    <FormContainer>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <div className="brand">
          <img src={logo} alt='logo'/>
          <h2>ChatApp</h2>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={(e)=>handleChange(e)} min='3'/>
        <input type="password" placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
        <button type='submit'>Login</button>
        <span> <Link to="/register">Don't have an account ? <span>SignUp</span></Link></span>
       
      </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction:column;
  gap:1rem;
  align-items:center;
  // background : #131324;
  background : #1C6758;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .2rem;
    img{
      height:2.5rem;
    }
    h2{
      font-size:1.4rem;
      color:white;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap:1.2rem;
    background-color: #00000076;
    padding: 1.8rem 3rem;
    border-radius:2rem;
    input{
      background-color: transparent;
      padding: .8rem .8rem;
      // border:0.1rem solid #4e0eff;
      border:0.1rem solid #1C6758;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: .8rem;
      &:focus{
          // border: 0.1rem solid #997af0;
          border: 0.1rem solid #3D8361;
          outline:none;
      } 
  } 
    button{
      // background-color: #997af0;
      background-color: #3D8361;
      color: white;
      font-weight: bold;
      padding: 1rem 2rem;
      cursor: pointer;
      border: none;
      border-radius: 0.4rem;
      font-size: .9rem;
      transition: 0.5s ease-in-out;
      &:hover{
        // background-color: #4e0eff;
        background-color: #1C6758;
    }
    }
    span{
      text-transform: uppercase;
      font-size:.7rem;
      margin-top: .8rem;
      a{
        color:white;
        text-decoration:none;
        font-weight:bold;
      }
      span{
        color:#4e0eff;
      }
      
    }
}
`;

export default Login;
