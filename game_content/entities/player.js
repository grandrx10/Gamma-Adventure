import { Weapon } from "../weapons/weapon.js";
import { Bullet } from "./bullet.js";
import { Mob } from "./mob.js";

export class Player extends Mob{
    constructor(player_id){
        super(0, 0, 40, 40, "circle", "white", 0)
        this.player_id = player_id;
        this.name = "unnamed"
        this.team = 'players'

        this.stats = {
            hp: 100,
            max_hp: 100,
            def: 0,
            speed: 8
        }

        this.weapon = new Weapon(100)

        this.x_move = 0
        this.y_move = 0
    }

    move(dir) {

        if (dir == "up") {
            this.y_move = - this.stats.speed
        } else if (dir == "down") {
            this.y_move = this.stats.speed
        } else if (dir == "left") {
            this.x_move = -this.stats.speed
        }
        else if (dir == "right") {
            this.x_move = this.stats.speed
        }
    }

    update(game_room) {
        super.update(game_room)
        this.x += this.x_move

        var inside = false
        for (var i in game_room.rooms) {
            if (game_room.rooms[i].check_inside(this)) {
                inside = true
                this.room_num = i
            }
        }

        if (!inside) {
            this.x -= this.x_move
        }

        this.y += this.y_move
        inside = false
        for (var i in game_room.rooms) {
            if (game_room.rooms[i].check_inside(this)) {
                inside = true
                this.room_num = i
            }
        }

        if (!inside) {
            this.y -= this.y_move
        }

        this.x_move = 0
        this.y_move = 0
    }


    shoot (shoot_pos) {
        return this.weapon.fire(shoot_pos, this) // maximum stack call size exceeded
    }

    set_name(name) {
        this.name = name
    }
}