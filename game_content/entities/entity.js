export class Entity {
    constructor (x, y, length, width, shape, color) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.shape = shape;
        this.color = color
    }

    check_collision(entity) {
        
        if (entity.shape == "circle" && this.shape == "circle") {
            return this.distance(this.x, this.y, entity.x, entity.y) <= this.length/2 + entity.length/2
        } else {
            
            var leftSide = entity.x - entity.length/2;
            var rightSide = entity.x + entity.length / 2;
            var topSide = entity.y - entity.width/2;
            var botSide = entity.y + entity.width / 2;
            if (this.x + this.length / 2 > leftSide && this.x - this.length / 2 < rightSide 
            && this.y + this.width / 2 > topSide && this.y - this.width / 2 < botSide){
                return true;
            } else {
                return false;
            }
        }
    }

    distance(x1, y1, x2, y2){
        return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
    }

    update(game_room) {
        return
    }
}