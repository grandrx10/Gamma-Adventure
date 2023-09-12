import { Particle } from "./particle.js"

export class Draw_Machine {
    constructor (socket_id, width, height) {
        this.particles = []
        this.x_offset = 0
        this.y_offset = 0

        // Screen length and width
        this.width = width
        this.height = height

        this.socket_id = socket_id

        this.load_images()
    }

    draw_game_room(game_room) {
        // console.log(this.socket_id)
        if (this.socket_id in game_room.players){
            var player = game_room.players[this.socket_id]

            this.x_offset = player.x - this.width / 2;
            this.y_offset = player.y - this.height / 2;
        }

        for (var i in game_room.rooms) {
            this.draw(game_room.rooms[i])
        }

        for (var i in game_room.bullets) {
            this.draw(game_room.bullets[i])
        }

        for (var i in game_room.entities) {
            this.draw(game_room.entities[i])
        }

        for (var key in game_room.players) {
            this.draw(game_room.players[key])
        }

        for (var i in this.particles) {
            this.draw_particles(this.particles[i])
        }

        this.draw_hud(game_room)

        // THIS IS FOR DEBUGGING ROOM EXITS AND ENTRANCES

        // for (var i in game_room.rooms) {

        //     if (game_room.rooms[i].entrance != null) {
        //         fill("green")
        //         ellipse(game_room.rooms[i].entrance.x - this.x_offset, game_room.rooms[i].entrance.y - this.y_offset, 30, 30)
        //         fill("black")
        //         text(i, game_room.rooms[i].entrance.x - this.x_offset, game_room.rooms[i].entrance.y - this.y_offset)
        //     }

        //     if (game_room.rooms[i].exit != null) {
        //         fill("red")
        //         ellipse(game_room.rooms[i].exit.x - this.x_offset - 20, game_room.rooms[i].exit.y - this.y_offset, 30, 30)
        //         fill("black")
        //         text(i, game_room.rooms[i].exit.x - this.x_offset - 20, game_room.rooms[i].exit.y - this.y_offset)
        //     }
        
        // }
    }

    draw_hud(game_room) {
        var player = game_room.players[this.socket_id]

        var name_x = 95
        var name_y = 30

        fill("grey")
        rect(name_x, name_y, 150, 20)
        fill("black")
        text(player.name, name_x, name_y)

        var bar_x = 95
        var bar_y = 60

        fill("black")
        rect(bar_x, bar_y, 150, 20)
        fill ("green")
        rect (bar_x, bar_y, player.stats.hp/player.stats.max_hp * 150, 20)

        fill("black")
        text(player.stats.hp + "/" + player.stats.max_hp, bar_x, bar_y)
    }

    update() {
        for (var i = this.particles.length- 1; i >= 0; i --) {
            if (this.particles[i].update() == 'delete') {
                this.particles.splice(i, 1)
            }
        }
    }

    spawn_particle(particle_info) {
        this.particles.push(new Particle(particle_info.x, particle_info.y, particle_info.bullet_stats.damage, "white"))
    }

    draw_particles() {
        for (var i in this.particles) {
            this.particles[i].draw(this.x_offset, this.y_offset)
        }
    }

    draw(entity) {
        fill(entity.color) 
        if (entity.shape == "circle") {
            ellipse(entity.x - this.x_offset, entity.y - this.y_offset, entity.length, entity.width)
        } else {
            rect(entity.x - this.x_offset, entity.y - this.y_offset, entity.length, entity.width)
        }

        fill("black")
        if (entity.name != null && (entity.player_id == null || entity.player_id != this.socket_id)) {
            text(entity.name, entity.x - this.x_offset, entity.y - entity.length / 2 - 20 - this.y_offset)
        }


        if (entity.image != null) {
            image(this.assets[entity.image], entity.x - this.x_offset, entity.y - this.y_offset)
        }

        if (entity.player_id != null && entity.player_id == this.socket_id){
        } else if (entity.stats != null) {
            // draw healthbar
            fill("black")
            rect(entity.x - this.x_offset, entity.y - entity.width / 2 - 10 - this.y_offset, entity.length, 10)

            rectMode(CORNER)
            fill("green")
            rect(entity.x - entity.length / 2 - this.x_offset, entity.y - entity.width / 2 - 15 - this.y_offset, 
            entity.length * (entity.stats.hp / entity.stats.max_hp) , 10)
            rectMode(CENTER)
        }
    }

    get_mouse_pos() {
        return {
            x: this.x_offset + mouseX,
            y: this.y_offset + mouseY
        }
    }


    load_images() {
        this.assets = {}

        this.assets["wolf"] = loadImage('client_files/assets/wolf.png');
    }
}