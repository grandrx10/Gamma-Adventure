import { Entity } from "./entity.js";

export class Bullet extends Entity{
    constructor(x, y, length, width, shape, color, target, shooter){
        super(x, y, length, width, shape, color)
        this.shooter = shooter
        this.travel_dir = {x: target.x - x, y: target.y - y};
        this.bullet_stats = {
            speed: 20,
            damage: 30,
            range: 300
        }

        this.shot_pos = {x: x, y: y}
    }

    update(game_room, io) {

        if (this.travel_dir.x != 0 || this.travel_dir.y != 0) {
            this.x = this.x + this.bullet_stats.speed*this.travel_dir.x
            /Math.sqrt(Math.pow(this.travel_dir.x,2) + Math.pow(this.travel_dir.y,2));
            this.y = this.y + this.bullet_stats.speed*this.travel_dir.y
            /Math.sqrt(Math.pow(this.travel_dir.x,2) + Math.pow(this.travel_dir.y,2));
        }

        var delete_this = true
        for (var i in game_room.rooms) {
            if (game_room.rooms[i].check_inside(this)) {
                delete_this = false
            }
        }

        delete_this = this.check_contact_with_list(game_room.entities, game_room, io) 
        || this.check_contact_with_list(game_room.players, game_room, io)

        if (this.distance(this.shot_pos.x, this.shot_pos.y, this.x, this.y) > this.bullet_stats.range) {
            delete_this = true
        }

        return delete_this

    }

    check_contact_with_list( entities, game_room, io) {
        for (var i in entities) {
            if (entities[i].check_collision(this) && (entities[i].team == null || this.shooter.team != entities[i].team)) {
                if (typeof entities[i].take_damage == "function") {
                    entities[i].take_damage(this.bullet_stats.damage);
                    for (var key in game_room.players) {
                        io.to(key).emit('spawn_particle', this)
                    }
                }
                return true
            }
        }
        return false
    }

}