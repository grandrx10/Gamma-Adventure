import { Wolf } from "../enemies/wolf.js"
import { Circle_Room } from "./room_types/circle_room.js"
import { Rect_Room } from "./room_types/rect_room.js"

export class Room_Generator {
    constructor () {
        this.start_x = 0
        this.start_y = 0
    }

    get_possible_rooms () {
        return [new Rect_Room(), new Circle_Room()]
    }

    get_possible_enemies() {
        return [new Wolf(0, 0)]
    }

    generate (room_count) {
        var rooms = []
        var count = 0
        var entities = []

        rooms[0] = new Rect_Room()
        // entities = entities.concat(rooms[0].spawn_entities())

        while (count < room_count) {
            count += 1
            var possible_rooms = this.get_possible_rooms()
            var new_rooms = rooms[rooms.length - 1].create_room(possible_rooms[this.randint(0, possible_rooms.length -1)], rooms)
            if (new_rooms == 'no_exit') {
                count -= 1
                rooms.pop()
            } else {
                rooms = rooms.concat(new_rooms)

                entities = entities.concat(this.generate_enemies(3, new_rooms[1], rooms.length - 1))
            }
        }

        return {rooms: rooms, entities: entities}
    }

    generate_enemies(enemy_amount, room, room_num) {
        var enemies = []
        for (var i = 0; i < enemy_amount; i ++) {
            var possible_enemies = this.get_possible_enemies()
            var enemy = possible_enemies[this.randint(0, possible_enemies.length - 1)]
            
            var valid = false
            while (!valid) {
                valid = true
                enemy.x = room.x + this.randint(- room.length / 2, room.length / 2)
                enemy.y = room.y + this.randint(- room.width / 2, room.width / 2)
                enemy.room_num = room_num

                if (room.shape == "circle" && this.distance(room.x, room.y, enemy.x, enemy.y) > room.length / 2) {
                    valid = false
                }
            }

            enemies.push(enemy)
        }

        return enemies
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }

    randint(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}