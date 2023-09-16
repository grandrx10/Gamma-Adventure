import { Draw_Machine } from "./client_files/draw_machine.js";

var socket;
var draw_machine;
var client_room;

var screen_width = window.innerWidth/2;
var screen_height = window.innerWidth/2;

var cnv;
var inp;

function setup() {
    cnv = createCanvas(screen_width, screen_height);
    var x = (windowWidth - screen_width) / 2;
    var y = (windowHeight - screen_height) / 2;
    cnv.position(x, y);
    background(51)

    textAlign(CENTER, CENTER)
    textSize(12)
    rectMode(CENTER)
    imageMode(CENTER)
    frameRate(60)

    socket = io.connect('http://localhost:3000');
    socket.on('update', update)
    socket.on('established_connection', first_time_connect)

    socket.on('spawn_particle', spawn_particle)


    inp = createInput('Enter your name:');
    inp.position(x + 350, y + 250);
    inp.size(100);
    inp.input(myInputEvent);
    // inp.remove()
}

var name = ""
function myInputEvent() {
    name = this.value()
}

function keyPressed () {
    if (key == "Enter" && client_room != null && client_room.players[socket.id].name == "unnamed") {

        if (name.length > 20) {
            name = name.substring(0, 20)
        }

        socket.emit('name_player', name);
        inp.remove()
    }
}

function spawn_particle (spawn_info) {
    draw_machine.spawn_particle(spawn_info)
}

function first_time_connect () {
    draw_machine = new Draw_Machine(socket.id, screen_width, screen_height) 
}

function draw() {
    background(51);
    if (client_room != null && client_room.players[socket.id].name != "unnamed"){
        draw_machine.draw_game_room(client_room)
        draw_machine.draw_particles()
        draw_machine.update()

        // Inputs here
        if (keyIsDown(87)) {
            socket.emit('move', {room_num: client_room.room_number, move: 'up'})
        } else if (keyIsDown(83)) {
            socket.emit('move', {room_num: client_room.room_number, move: 'down'})
        } 
        
        if (keyIsDown(65)) {
            socket.emit('move', {room_num: client_room.room_number, move: 'left'})
        } else if (keyIsDown(68)) {
            socket.emit('move', {room_num: client_room.room_number, move: 'right'})
        }

        if (mouseIsPressed) {
            socket.emit('shoot', {room_num: client_room.room_number, shoot_pos: draw_machine.get_mouse_pos()})
        }
    }

}



function update(game_room) {
    client_room = game_room
}

// This will fix the module problem
window.setup = setup;
window.draw = draw;
// window.loadImage = loadImage;
// window.windowResized = windowResized
// window.mouseClicked = mouseClicked
window.keyPressed = keyPressed