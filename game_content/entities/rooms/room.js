import { Entity } from "../entity.js";

export class Room extends Entity{
    constructor (x, y, length, width, shape, color) {
        super(x, y, length, width, shape, color)
        this.exits = []

        this.entrance = null
        this.exit = null
    }

    check_inside (entity) {

        if (this.shape == "rectangle") {
            if (entity.x >= this.x - this.length / 2 && entity.x <= this.x + this.length / 2
            && entity.y >= this.y - this.width / 2 && entity.y <= this.y + this.width / 2) {
                return true
            }
            
            return false
        } else {
            if (this.distance(entity.x, entity.y, this.x, this.y) >= this.length / 2) {
                return false
            }

            return true
        }
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }

    update_exits() {
        for (var i in this.exits) {
            this.exits[i].x += this.x
            this.exits[i].y += this.y
        }
    }

    create_room(room_to_add, rooms) {
        this.update_exits()


        var touching_other_rooms = true
        var rooms_to_create = []
        var hallway;
        while (touching_other_rooms) {
            touching_other_rooms = false

            // Get a random exit
            this.exit = this.exits.splice(this.randint(0, this.exits.length - 1), 1)[0]

            if (this.exit == null) {
                return 'no_exit'
            }

            // create hallway
            hallway = new Room(this.exit.x, this.exit.y, 100, 100, "rectangle", room_to_add.color)
            
            if (Math.abs(this.exit.orientation.x) > 0) {
                hallway.length = 300
            }
            if (Math.abs(this.exit.orientation.y) > 0) {
                hallway.width = 300
            }

            // position hallway
            hallway.x += hallway.length * this.exit.orientation.x / 2
            hallway.y += hallway.width * this.exit.orientation.y / 2
            // get correct entrance / exit with hallway
            hallway.entrance = Object.assign({}, this.exit)
            hallway.exit = Object.assign({}, this.exit)
            hallway.exit.x += hallway.length * this.exit.orientation.x
            hallway.exit.y += hallway.width * this.exit.orientation.y

            for (var i in room_to_add.exits) {
                if (room_to_add.exits[i].orientation.x == -1 * this.exit.orientation.x &&
                    room_to_add.exits[i].orientation.y == -1 * this.exit.orientation.y) {
                        room_to_add.x = hallway.exit.x - room_to_add.exits[i].x
                        room_to_add.y = hallway.exit.y - room_to_add.exits[i].y
                        

                        room_to_add.entrance = room_to_add.exits.splice(i, 1)[0]

                        // Fix the misplaced entrance spots, cannot use update_exits, running that multiple times will cause problems...
                        room_to_add.entrance.x += room_to_add.x
                        room_to_add.entrance.y += room_to_add.y
                        break;
                    }
            } 

            for (var i in rooms) {
                if (rooms[i].check_collision(room_to_add)) {
                    touching_other_rooms = true
                }
            }
        }
        rooms_to_create.push(hallway)
        rooms_to_create.push(room_to_add)  

        
        return rooms_to_create
    }

    randint(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    check_collision(room) {
        if (room.shape == "circle" && this.shape == "circle") {
            return this.distance(this.x, this.y, room.x, room.y) < this.length/2 + room.length/2
        } else {
            
            var leftSide = room.x - room.length/2;
            var rightSide = room.x + room.length / 2;
            var topSide = room.y - room.width/2;
            var botSide = room.y + room.width / 2;
            if (this.x + this.length / 2 > leftSide && this.x - this.length / 2 < rightSide 
            && this.y + this.width / 2 > topSide && this.y - this.width / 2 < botSide){
                return true;
            } else {
                return false;
            }
        }
    }
}