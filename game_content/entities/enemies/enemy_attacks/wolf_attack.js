import { Bullet } from "../../bullet.js"
import { Attack } from "./attack.js"

export class Wolf_Attack extends Attack {
    constructor () {
        super(300)
    }



    get_bullets(host) {
        if (host.tracking.curr_enemy == null) {
            return []
        }
        if (host.distance(host.tracking.curr_enemy.x, host.tracking.curr_enemy.y, host.x, host.y) < 50) {
            // bullets magnitizing to 0
            return [new Bullet(host.tracking.curr_enemy.x, host.tracking.curr_enemy.y, 10, 10, "circle", "red", 
            host.tracking.curr_enemy, host)]
        }
        return []
    }
}