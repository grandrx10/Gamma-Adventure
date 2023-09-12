import { Enemy } from "../entities/enemies/enemy.js"
import { Wolf } from "../entities/enemies/wolf.js"
import { Player } from "../entities/player.js"
import { Room } from "../entities/rooms/room.js"
import { Room_Generator } from "../entities/rooms/room_generator.js"

export class Game_Room{
    constructor(room_number){
        this.players = {}
        this.entities = [new Wolf(0, -50, 0)]
        this.bullets = []
        this.rooms = []

        // [new Room(0, 0, 600, 300, "rectangle", "gray"), 
        //                 new Room(0, -300, 100, 300, "rectangle", "gray"),
        //                 new Room(0, -600, 800, 400, "rectangle", "gray")]

        this.old_time = 0
        this.room_number = room_number

        this.generate(new Room_Generator())
    }

    generate(room_generator) {
        var generated = room_generator.generate(15)
        this.rooms = generated.rooms
        this.entities = generated.entities
    }

    add_bullets(bullets) {
        this.bullets = this.bullets.concat(bullets)
    }

    add_player(player_id) {
        this.players[player_id] = new Player(player_id)
    }

    remove_player(player_id) {
        if (player_id in this.players) {
            delete this.players[player_id]
        }
    }

    update(io) {

        if (new Date().getTime() - this.old_time > 2) {
            this.old_time = new Date().getTime()
            
            for (var i = this.bullets.length - 1; i >= 0; i --) {
                if (this.bullets[i].update(this, io)) {
                    this.bullets.splice(i, 1)
                }
            }

            for (var key in this.players) {
                this.players[key].update(this)
                io.to(key).emit('update', this)
            }


            for (var i = this.entities.length - 1; i >= 0; i --) {
                if (this.entities[i].update(this)) {
                    this.entities.splice(i, 1)
                }
            }



        }
    }
    
    trigger_move(move_info, socket_id) {
        // Working now :D
        this.players[socket_id].move(move_info.move)
    }

    trigger_shoot(info, socket_id) {
        var bullets = this.players[socket_id].shoot(info.shoot_pos, this)
        this.bullets = this.bullets.concat(bullets)
    }
}