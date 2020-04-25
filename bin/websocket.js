const io = require('./www')
console.log(io)
io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on('login',(msg)=>{
        console.log(msg);
        socket.emit('relogin',msg);
    })
})