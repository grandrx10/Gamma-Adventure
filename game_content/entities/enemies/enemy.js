import { Mob } from "../mob.js"


export class Enemy extends Mob{
    constructor(x, y, length, width, shape, color, room_num){
        super(x, y, length, width, shape, color, room_num)

        this.name = "default enemy"
        this.team = 'enemy'

        this.stats = {
            hp: 100,
            max_hp: 100,
            def: 0,
            speed: 4,
            track_range: 4
        }

        this.attack_pattern; // Make sure attack_duration is the same length as this one
        this.attack_durations; // Controls how long each attack phase lasts for
        this.attack_timer = 0;
        this.attack_index = 0;
        this.possible_attacks;
        
        this.tracking = {
            curr_enemy: null,
            curr_destination: null
        }

        this.set_attacks()
    }

    set_attacks () {
        this.attack_pattern = []
        this.attack_durations = []
        this.possible_attacks = {}
    }

    update(game_room) {
        if (super.update(game_room)) {
            return true
        }

        this.find_player(game_room.players)
        this.find_destination(game_room.rooms)
        this.travel_to_destination(game_room)

        if (new Date().getTime() - this.attack_timer > this.attack_durations[this.attack_index] && this.tracking.curr_enemy != null) {
            if (this.attack_index == this.attack_durations.length - 1) {
                this.attack_index = 0
            } else {
                this.attack_index += 1
            }
        }

        for (var i in this.possible_attacks[this.attack_pattern[this.attack_index]]) {
            var bullets = this.possible_attacks[this.attack_pattern[this.attack_index]][i].attack(this)
            game_room.add_bullets(bullets)
        }


    }

    travel_to_destination(game_room) {
        var x_move = 0;
        var y_move = 0;
        
        if (this.tracking.curr_destination != null) {
            var travel_dir = {x: this.tracking.curr_destination.x - this.x, y: this.tracking.curr_destination.y - this.y};

            x_move = this.stats.speed*travel_dir.x
            /Math.sqrt(Math.pow(travel_dir.x,2) + Math.pow(travel_dir.y,2));
            y_move = this.stats.speed*travel_dir.y
            /Math.sqrt(Math.pow(travel_dir.x,2) + Math.pow(travel_dir.y,2));
        }

        this.x += x_move

        var inside = false
        for (var i in game_room.rooms) {
            if (game_room.rooms[i].check_inside(this)) {
                inside = true
            }
        }

        if (!inside) {
            this.x -= x_move
        }

        this.y += y_move
        inside = false
        for (var i in game_room.rooms) {
            if (game_room.rooms[i].check_inside(this)) {
                inside = true
            }
        }

        if (!inside) {
            this.y -= y_move
        }
    }

    find_player (players) {
        var dist = 10000
        for (var key in players) {
            if (Math.abs(this.room_num - players[key].room_num) < this.stats.track_range 
            && this.distance(this.x, this.y, players[key].x, players[key].y) < dist) {
                dist = this.distance(this.x, this.y, players[key].x, players[key].y)
                this.tracking.curr_enemy = players[key]
            }
        }

        if (dist == 10000) {
            this.tracking.curr_enemy = null
            this.attack_timer = new Date().getTime()
        }
    }

    // NOTE: Tracking bug seems to send prey backwards when when you are 1 room ahead of them
    find_destination (rooms) {
        if (this.tracking.curr_enemy != null) {
            if (this.tracking.curr_enemy.room_num > this.room_num) {
                this.tracking.curr_destination = rooms[this.room_num].exit

                if (this.distance(this.tracking.curr_destination.x, this.tracking.curr_destination.y, this.x, this.y) < 50) {
                    this.room_num += 1
                    this.tracking.curr_destination = null
                }

            } else if (this.tracking.curr_enemy.room_num < this.room_num) {
                this.tracking.curr_destination = rooms[this.room_num].entrance


                if (this.distance(this.tracking.curr_destination.x, this.tracking.curr_destination.y, this.x, this.y) < 50) {
                    this.room_num -= 1
                    this.tracking.curr_destination = null
                }
            } else {
                this.tracking.curr_destination = {x: this.tracking.curr_enemy.x, y: this.tracking.curr_enemy.y}
            }

        }
    }
}