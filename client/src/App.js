import React from 'react'
import {Routes, Route} from "react-router-dom"
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Chat from './pages/Chat.jsx'
import SetAvatar from './pages/SetAvatar.jsx'


const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/setAvatar' element={<SetAvatar/>}/>
      <Route path='/' element={<Chat/>}/>
      

      
    </Routes>
  )
}

export default App
