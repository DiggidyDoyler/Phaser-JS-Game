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
        this.playerPosition;
    }
    
    fire (x, y)
    {
        //inital position 20 px to the right.
        this.setPosition(x,  y);
        //make object active
        this.setActive(true);
        this.setVisible(true);
    }

    setDir(dir) {
        console.log("New dir: " , dir);
        this.direction = dir; 
    }

    setdestroyBullet(shootPosition){
        this.playerPosition = shootPosition;
    }

    update(time, delta)
    { 
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

        

        //check for bullet limit (500 px on X axis)
        if (this.x > 2300 || this.x < -5 || this.y > 1700 || this.y < -5)
        {
            //if outside view make inactive and invisible
            this.setActive(false);
            this.setVisible(false);
        }

                // //check for bullet limit (500 px on X axis)
                // if (this.x > (playerPosition  + 100) || this.x < (playerPosition - 100) || this.y > (playerPosition + 100) || this.y < (playerPosition -100))
                // {
                //     //if outside view make inactive and invisible
                //     this.setActive(false);
                //     this.setVisible(false);
                // }
    }

}