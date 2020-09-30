var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('.'));

app.get('/player', (req, res) =>{
  res.sendFile(__dirname + '/vsPlayer.html');
});
app.get('/find', (req, res)=>{
    res.send('kaise ho !')
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/gameMode.html');
})

// generate five digit unique id
var rooms = Math.floor(Math.random() * (99999))

app.use(express.static('.'));


io.on('connection', (socket) => {

    // Create a new game match room and notify the creator of game.
    socket.on('createGame', (data) => {
        socket.join(`user_id-${rooms}`);
        socket.emit('newGame', { name: data.name, room: `user_id-${rooms}` });
    });

    // Connect the Player 2 to the room he requested. Show error if room full.
    socket.on('joinGame', function (data) {
        console.log(data)
        var room = io.nsps['/'].adapter.rooms[data.room];
        if (room && room.length === 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
        } else {
            socket.emit('err', { message: 'Sorry, The room is full!' });
        }
    });

       // Handle the turn played by either player and notify the each other.
    
    socket.on('playTurn', (data) => {
        socket.broadcast.to(data.room).emit('turnPlayed', {
            tile: data.tile,
            room: data.room
        });
    });

    // notification to victory in game
    socket.on('gameEnded', (data) => {
        socket.broadcast.to(data.room).emit('gameEnd', data);
    });
});


server.listen(2080);
console.log('port is working !');
