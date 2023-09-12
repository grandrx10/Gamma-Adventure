import express from 'express';
import { Server } from "socket.io"

import { Room_Holder } from './game_content/lobby/room_holder.js';

// SERVER SETUP
var app = express();
var server = app.listen(3000);

app.use(express.static('public'))

console.log("my socket server is running")

var io = new Server(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    socket.on("disconnect", () => {
        room_holder.remove_player(socket.id);
    });

    room_holder.add_player(socket.id)
    io.to(socket.id).emit('established_connection')
    
    socket.on('move', (info) => {
        room_holder.trigger_move(info, socket.id)
    })

    socket.on('shoot', (info) => {
        room_holder.trigger_shoot(info, socket.id)
    })

    socket.on('name_player', (info) => {
        room_holder.name_player(info, socket.id)
    })
}
// SERVER SETUP END -----

// Game Setup
var room_holder = new Room_Holder()

setInterval(update, 10);

function update() {
    room_holder.update_rooms(io)
}
