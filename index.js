const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messagesRoute');
const app = express();
require('dotenv').config();
const socket = require('socket.io');

app.use(cors());
app.use(express.json());
 
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on the Port ${process.env.PORT}`)
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DB Connection Sucessfull')
}).catch((err)=>{
    console.log(err.message);
});

app.get('/', (req, res)=>{
    res.json("server Start ")
})

const io = socket(
    server,{
        cors:{
            // origin:"http://localhost:3000",
            origin:"https://unrivaled-tapioca-902288.netlify.app",
            credentials: true,
            optionSucessStatus: 200
        },
    }
);

global.onlineUsers = new Map();

io.on('connection', (socket)=>{
    global.chatSocket = socket;
    socket.on('add-user', (userId)=>{
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data)=>{
        console.log('send msg', {data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});
