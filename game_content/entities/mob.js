import { Entity } from "./entity.js";

export class Mob extends Entity {
    constructor(x, y, length, width, shape, color, room_num){
        super(x, y, length, width, shape, color)

        this.room_num = room_num
    }

    update(game_room) {
        if (this.check_dead()) {
            this.trigger_death()
            return true
        }
    }

    trigger_death() {
        
    }

    take_damage(damage) {
        this.stats.hp -= damage
    }

    check_dead() {
        return this.stats.hp <= 0
    }
}