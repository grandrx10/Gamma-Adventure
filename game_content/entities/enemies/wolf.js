import { Enemy } from "./enemy.js"
import { Wolf_Attack } from "./enemy_attacks/wolf_attack.js"


export class Wolf extends Enemy{
    constructor(x, y){
        super(x, y, 30, 30, "circle", "red", 0)

        this.name = "Wolf"

        // this.stats = {
        //     hp: 100,
        //     max_hp: 100,
        //     def: 0,
        //     speed: 3,
        //     track_range: 3
        // }

        this.attack_pattern = ["bite"]
        this.possible_attacks = {"bite" : [new Wolf_Attack()]}
        this.image = "wolf"
    }

    set_location (x, y, room_num) {
        this.x = x
        this.y = y
        this.room_num = room_num
    }

    set_attacks () {
        this.attack_pattern = ["bite"]
        this.attack_durations = [1000]
        this.possible_attacks = {"bite" : [new Wolf_Attack()]}
    }

}