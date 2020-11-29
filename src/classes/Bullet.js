console.log("Bullet class");

class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        console.log("Bullet instance");
        super(scene);
        this.scene = scene;
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(500, 1);
        this.setScale(.4);
        this.direction = "r";
        this.timer = 0;
    }

    fire(x, y) {
        //inital position 20 px to the right.
        this.setPosition(x, y);
        //make object active
        this.setActive(true);
        this.setVisible(true);
    }

    setDir(dir) {
        console.log("New dir: ", dir);
        this.direction = dir;
    }

    update(time, delta) {
        this.timer++
        //update of bullet movement
        //to the right in this case
        if (this.direction == "r") {
            this.x += this.speed * delta;
        } else if (this.direction == "l") {
            this.x -= this.speed * delta;
        } else if (this.direction == "u") {
            this.y -= this.speed * delta;
        } else if (this.direction == "d") {
            this.y += this.speed * delta;
        }

           //Delete after time
        if (this.timer % 45 === 0) {

            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }


    }
}