const io = require('./www')
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('login',msg=>{
        console.log(msg)
        socket.emit("gun","给爷爬");
    })
});