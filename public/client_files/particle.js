export class Particle {
    constructor (x, y, text, color) {
        this.x = x
        this.y = y
        this.text = text
        this.color = color

        this.creation_time = new Date().getTime()
        this.duration = 300

        this.x_speed = this.randint(-3, 3)
        this.y_speed = this.randint(-3, 3)
    }

    draw(x_offset, y_offset) {
        fill(this.color)
        text(this.text, this.x - x_offset, this.y - y_offset)
    }

    update() {
        this.x += this.x_speed
        this.y += this.y_speed

        this.x_speed *= 0.7
        this.y_speed *= 0.7

        if (new Date().getTime() - this.creation_time > this.duration) {
            return 'delete'
        }
    }

    randint(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}