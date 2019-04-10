const express = require('express');
const mongoose=require('mongoose'); 
const app=express();
const path=require('path');
const server=require('http').Server(app);
const io=require('socket.io')( server);
const cors=require('cors');
app.use(cors());
mongoose.connect('mongodb+srv://test:test@cluster0-ajsvw.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser:true
}
);

io.on('connection',socket=>{
    socket.on('connectRoom',box=>{
        socket.join(box)
    })
});

app.use((req,res,next)=>{
    req.io=io;
    return next();
});
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use('/files',express.static(path.resolve(__dirname,'..','tmp')));
app.use(require('./routes'));



server.listen(3333);
