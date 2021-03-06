const express = require('./node_modules/express');
const socketio = require('./node_modules/socket.io/lib');
const http = require('http');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const { addUser, removeUser, getUser, getUsersInRoom} = require('./users/users');
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const config = require('./config/config');
const io = socketio(server);


io.on('connection', (socket) => {
    socket.on('Login', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
        
        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room: ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name} has joined` });

        socket.join(user.room);
        callback();
   
    } );

    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text:message});
        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }
    });
});
// 1
app.set('llave', config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

server.listen(PORT, () => console.log(`Server has been started in port: ${PORT}`));