import { Game_Room } from "./game_room.js"

export class Room_Holder {
    constructor() {
        this.game_rooms = []
    }

    create_new_room() {
        this.game_rooms.push(new Game_Room(this.game_rooms.length))
    }

    add_player(player_id) {
        if (this.game_rooms.length == 0) {
            this.create_new_room()
        }

        this.game_rooms[0].add_player(player_id)
    }

    remove_player(socket_id) {
        for (var i in this.game_rooms) {
            this.game_rooms[i].remove_player(socket_id)
        }
    }

    name_player(name, socket_id) {
        for (var i in this.game_rooms) {
            if (socket_id in this.game_rooms[i].players) {
                this.game_rooms[i].players[socket_id].set_name(name)
            }
        }
    }

    update_rooms(io){
        for (var i in this.game_rooms) {
            this.game_rooms[i].update(io)
        }
    }

    trigger_move(move_info, socket_id) {
        this.game_rooms[move_info.room_num].trigger_move(move_info, socket_id)
    }

    trigger_shoot(info, socket_id) {
        this.game_rooms[info.room_num].trigger_shoot(info, socket_id)
    }
}