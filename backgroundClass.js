export default class Background {
    constructor(img, sx, sy, sw, sh, x, y, width, height, speed) {
        // Preload the background image
        this.img = new Image();
        this.img.src = img;

        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed; // Speed of movement
    }

    draw(context) {
        // Draw the background image
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    }

    update() {
        // Update position based on speed
        this.x += this.speed;

        // Reset the position to create a looping effect
        if (this.speed > 0 && this.x >= 1024) {
            this.x = -this.width; // Reset to the left off-screen
        } else if (this.speed < 0 && this.x + this.width <= 0) {
            this.x = 1024; // Reset to the right off-screen
        }
    }
}
