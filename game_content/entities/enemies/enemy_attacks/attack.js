import { Bullet } from "../../bullet.js"

export class Attack {
    constructor (cooldown) {
        this.last_attack = 0
        this.cooldown = cooldown
    }

    // This is a very basic attack
    attack(host) {
        var bullets = []
        if (new Date().getTime() - this.last_attack > this.cooldown) {
            this.last_attack = new Date().getTime()
            bullets = this.get_bullets(host)
            // bullets.push(new Bullet()) // CONTINUE HERE
        }

        return bullets
    }

    get_bullets(host){
        return []
    }
}