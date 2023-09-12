import { Bullet } from "../entities/bullet.js"

export class Weapon {
    constructor (fire_cooldown) {
        this.fire_cooldown = fire_cooldown
        this.last_fired = 0
    }

    fire (shoot_pos, user) {
        if (new Date().getTime() - this.last_fired > this.fire_cooldown) {
            this.last_fired = new Date().getTime()
            return this.get_bullets(shoot_pos, user)
        }

        return []
    }

    get_bullets (shoot_pos, user) {
        return [new Bullet(user.x, user.y, 10, 10, "circle", "blue", shoot_pos, user)]
    }
}