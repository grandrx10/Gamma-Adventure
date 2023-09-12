import { Room } from "../room.js";

export class Circle_Room extends Room {
    constructor() {
        super(0, 0, 500, 500, "circle", "gray");
        this.exits = [
            {x: this.x - this.length/2 + 30, y: this.y, orientation: {x: -1, y: 0}},
            {x: this.x, y: this.y + this.width/2 - 30, orientation: {x: 0, y: 1}},
            {x: this.x + this.length/2 - 30, y: this.y, orientation: {x: 1, y: 0}},
            {x: this.x, y: this.y - this.width/2 + 30, orientation: {x: 0, y: -1}}
        ]
    }
}