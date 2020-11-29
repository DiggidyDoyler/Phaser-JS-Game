//13: Physics

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }



  init() {

    this.playerSpeed = 100;
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    //Stops any sounds/music that may cross over from other scenes
    this.sound.stopAll();

    this.createAudio();
    this.createTilemap();
    this.createPlayer();
    this.createCamera();
    this.createBullets();
    this.createShip();
    this.healthPickups();
    this.createEnemy();
    this.handleCollisions();
    this.hideAreas();
    this.createText();
 


  }

  createAudio() {
    // Adding Sounds
    //Music
    this.music = this.sound.add("mainmusic");
    this.music.loop = true;
    this.music.play();

    //SFX
    this.laser = this.sound.add("laser");
    this.enemyHit = this.sound.add("enemyHit");
    this.healthUp = this.sound.add("healthUp");
    this.playerHit = this.sound.add("playerHit");
  }

  createTilemap() {
    //Creating Tile Map
    this.map = this.make.tilemap({ key: "map" });
    console.log("mapWidth: ", this.map.widthInPixels);
    console.log("mapHeight: ", this.map.heightInPixels);

    this.tileset = this.map.addTilesetImage("tileset", "tiles");

    //Walls
    this.wallLayer = this.map.createStaticLayer(
      "Walls",
      this.tileset,
      0,
      0
    );

    //Floor
    this.floorLayer = this.map.createStaticLayer(
      "Floor",
      this.tileset,
      0,
      0
    );

    //Doors
    this.doorsLayer = this.map.createStaticLayer(
      "Doors",
      this.tileset,
      0,
      0
    );

    //enable physics collison detection with tiles 
    this.wallLayer.setCollisionByExclusion(-1, true);
  }

  createPlayer() {
    //Creating player sprite
    this.player = this.physics.add.sprite(255, 150, "player");
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.8);
    this.player.body.offset.y = 12;
    this.player.isPlayerAlive = true;
    this.player.isPlayerWinning = false;
    this.player.Health = 100;
    this.player.score = 0;

    //Setting player collisions
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.wallLayer);


    // animation states
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 17, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "stand",
      frames: [{ key: "player", frame: 2 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers("playerDeath", { start: 1, end: 6 }),
      frameRate: 2.5,
    });



  }

  movePlayer() {
    //Input keys
    this.cursors = this.input.keyboard.createCursorKeys();

    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    // Move/Animate the player
    //If the player is alive
    if (this.player.isPlayerAlive) {
      // Left
      if (keyA.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
        this.player.anims.play("left", true);
        // Left & Down
      } else if ((keyA.isDown) & (keyS.isDown)) {
        this.player.setVelocityX(-this.playerSpeed);
        this.player.setVelocityY(this.playerSpeed);
        this.player.anims.play("left", true);
        // Left & Up
      } else if ((keyA.isDown) & (keyW.isDown)) {
        this.player.setVelocityX(-this.playerSpeed);
        this.player.setVelocityY(-this.playerSpeed);
        this.player.anims.play("left", true);
        //Right
      } else if (keyD.isDown) {
        this.player.setVelocityX(this.playerSpeed);
        this.player.anims.play("right", true);
        // Right & Down
      } else if ((keyD.isDown) & (keyS.isDown)) {
        this.player.setVelocityX(this.playerSpeed);
        this.player.setVelocityY(this.playerSpeed);
        this.player.anims.play("left", true);
        // Right & Up
      } else if ((keyD.isDown) & (keyW.isDown)) {
        this.player.setVelocityX(this.playerSpeed);
        this.player.setVelocityY(-this.playerSpeed);
        this.player.anims.play("left", true);
        //Down
      } else if (keyS.isDown) {
        this.player.setVelocityY(this.playerSpeed);
        this.player.anims.play("down", true);
        //Up
      } else if (keyW.isDown) {
        this.player.setVelocityY(-this.playerSpeed);
        this.player.anims.play("up", true);
        //Stand
      } else {
        this.player.anims.play("stand");
        this.player.setVelocity(0);
      }

      //Sprint
      if (this.cursors.space.isDown) {
        this.playerSpeed = 250;
      }
      else {
        this.playerSpeed = 100;
      }
    //Else, if the player is dead, they cannot move
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

    }
  }

  checkPlayerHealth() {
    //If the player's health is equal to or less then 0, they are dead
    if (this.player.Health <= 0) {
      this.player.isPlayerAlive = false;
    }
    // console.log("Is Player alive? :" + this.player.isPlayerAlive)
  }

  healthPickups() {
    //Creating multiple health pickups
    this.healthPickup1 = this.physics.add.sprite(1215, 110, "health");
    this.healthPickup2 = this.physics.add.sprite(2100, 900, "health");
    this.healthPickup3 = this.physics.add.sprite(560, 1075, "health");

    //For loop to set scale and immovable body to all health sprites
    let i;
    for (i = 1; i < 4; i++) {
      this['healthPickup' + i].setScale(.15);
      this['healthPickup' + i].body.immovable = true;
    }

  }

  createShip() {
    //Creating Ship Sprite
    this.ship = this.physics.add.sprite(1500, 1580, "ship");
    this.ship.body.immovable = true;
    this.ship.setScale(4);
    this.ship.body.setSize(this.ship.width, this.ship.height / 3 + 8);
    this.ship.body.offset.x = -0;
    this.ship.body.offset.y = 18;
  }

  hideAreas() {
    //Creating multiple masks for hallways and rooms
    this.hallway1 = this.physics.add.sprite(256, 400, "hallway1");
    this.hallway2 = this.physics.add.sprite(256, 900, "hallway2");
    this.hallway3 = this.physics.add.sprite(689, 640, "hallway3");
    this.hallway4 = this.physics.add.sprite(1216, 336, "hallway4");
    this.hallway5 = this.physics.add.sprite(1682, 513, "hallway5");
    this.hallway6 = this.physics.add.sprite(1458, 1058, "hallway6");
    this.hallway7 = this.physics.add.sprite(1500, 1250, "hallway7");

    this.roomMask1 = this.physics.add.sprite(256, 624, "room1");
    this.roomMask2 = this.physics.add.sprite(546, 1113, "room2");
    this.roomMask3 = this.physics.add.sprite(1185, 624, "room3");
    this.roomMask4 = this.physics.add.sprite(1216, 112, "room4");
    this.roomMask5 = this.physics.add.sprite(2095, 867, "room5");
    this.roomMask6 = this.physics.add.sprite(1505, 1521, "room6");


    //For loops to create multiple collisions instances between player and hallways/rooms
    //Hallways
    let i;
    for (i = 1; i < 8; i++) {
      this.physics.add.overlap(
        this.player,
        this['hallway' + i],
        this['collHallway' + i],
        null,
        this
      );
    }

    //Rooms
    for (i = 1; i < 7; i++) {
      this.physics.add.overlap(
        this.player,
        this['roomMask' + i],
        this['roomMaskCol' + i],
        null,
        this
      );
    }
  }

  createCamera() {
    //Creating Camera
    this.camera = this.cameras.main;
    //Follow the player
    this.camera.startFollow(this.player, true);
    //Camera restricted to world bounds
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  zoomCamera() {
    //Input
    let keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    //If 'm' is pressed zoom out, else zoom in
    if (keyM.isDown) {
      this.camera.setZoom(1);
    } else {
      this.camera.setZoom(4);
    }
  }

  createEnemy() {
    //Creating enemis with the enemy class
    //Area 1
    this.enemy1 = new Enemy(this, 100, 600);
    this.enemy2 = new Enemy(this, 360, 600);
    //Area 2
    this.enemy3 = new Enemy(this, 150, 1060);
    this.enemy4 = new Enemy(this, 520, 1060);
    this.enemy5 = new Enemy(this, 800, 1060);
    //Area 3
    this.enemy6 = new Enemy(this, 1000, 700);
    this.enemy7 = new Enemy(this, 1400, 700);
    this.enemy8 = new Enemy(this, 1200, 510);
    //Area 4
    this.enemy9 = new Enemy(this, 1218, 140);
    //Area 5
    this.enemy10 = new Enemy(this, 1930, 650);
    this.enemy11 = new Enemy(this, 2230, 650);
    this.enemy12 = new Enemy(this, 2100, 800);
    this.enemy13 = new Enemy(this, 1930, 950);
    this.enemy14 = new Enemy(this, 2200, 1100);
    //End hall
    this.enemy15 = new Enemy(this, 1500, 1050);
    this.enemy16 = new Enemy(this, 1500, 1440);

    //Putting enemies in array to easily collide with objects
    this.enemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6, this.enemy7, this.enemy8, this.enemy9, this.enemy10, this.enemy11, this.enemy12, this.enemy13, this.enemy14, this.enemy15, this.enemy16]
    this.physics.add.collider(this.enemies, this.wallLayer);

    //Looping enemy collider, so all of the enemies will collide with all other enemies
    let i;
    for (i = 1; i < 16; i++) {
      this.physics.add.collider(this.enemy1, this['enemy' + i]);
      this.physics.add.collider(this.enemy2, this['enemy' + i]);
      this.physics.add.collider(this.enemy3, this['enemy' + i]);
      this.physics.add.collider(this.enemy4, this['enemy' + i]);
      this.physics.add.collider(this.enemy5, this['enemy' + i]);
      this.physics.add.collider(this.enemy6, this['enemy' + i]);
      this.physics.add.collider(this.enemy7, this['enemy' + i]);
      this.physics.add.collider(this.enemy8, this['enemy' + i]);
      this.physics.add.collider(this.enemy9, this['enemy' + i]);
      this.physics.add.collider(this.enemy10, this['enemy' + i]);
      this.physics.add.collider(this.enemy11, this['enemy' + i]);
      this.physics.add.collider(this.enemy12, this['enemy' + i]);
      this.physics.add.collider(this.enemy13, this['enemy' + i]);
      this.physics.add.collider(this.enemy14, this['enemy' + i]);
      this.physics.add.collider(this.enemy15, this['enemy' + i]);
      this.physics.add.collider(this.enemy16, this['enemy' + i]);
    }
  }

 
  handleCollisions() {
    //For loops to create instances for bullets, the player, health pickups and the ship. Instances properties are handled at the bottom of the script.
    let i;
    for (i = 1; i < 17; i++) {
      //Add overlap between Bullets and enemies  
      this.physics.add.overlap(
        this.bullets,
        this['enemy' + i],
        this['collBulletEnemy' + i],
        null,
        this
      );
    }

    //Add Collider between player and enemy
    for (i = 1; i < 17; i++) {
      this.physics.add.collider(
        this.player,
        this['enemy' + i],
        this.collPlayerEnemy,
        null,
        this
      );
    }

    //Player collide with ship
    this.physics.add.collider(
      this.player,
      this.ship,
      this.collPlayerShip,
      null,
      this
    );
    //Health pickups
    for (i = 1; i < 4; i++) {
      this.physics.add.collider(
        this.player,
        this['healthPickup' + i],
        this['collPlayerHealthpick' + i],
        null,
        this
      );
    }

  }

  checkEnemyHealth() {
    //If the enemy's health is equal to 0, the enemy is dead and destroy the enemy
    if (this.enemy1.health === 0) {
      this.enemy1.Alive = false;
      // console.log("Enemy is dead")
      this.enemy1.destroy();
    }
    if (this.enemy2.health === 0) {
      this.enemy2.Alive = false;
      // console.log("Enemy is dead")
      this.enemy2.destroy();
    }
    if (this.enemy3.health === 0) {
      this.enemy3.Alive = false;
      // console.log("Enemy is dead")
      this.enemy3.destroy();
    }
    if (this.enemy4.health === 0) {
      this.enemy4.Alive = false;
      // console.log("Enemy is dead")
      this.enemy4.destroy();
    }
    if (this.enemy5.health === 0) {
      this.enemy5.Alive = false;
      // console.log("Enemy is dead")
      this.enemy5.destroy();
    }
    if (this.enemy6.health === 0) {
      this.enemy6.Alive = false;
      // console.log("Enemy is dead")
      this.enemy6.destroy();
    }
    if (this.enemy7.health === 0) {
      this.enemy7.Alive = false;
      // console.log("Enemy is dead")
      this.enemy7.destroy();
    }
    if (this.enemy8.health === 0) {
      this.enemy8.Alive = false;
      // console.log("Enemy is dead")
      this.enemy8.destroy();
    }
    if (this.enemy9.health === 0) {
      this.enemy9.Alive = false;
      // console.log("Enemy is dead")
      this.enemy9.destroy();
    }
    if (this.enemy10.health === 0) {
      this.enemy10.Alive = false;
      // console.log("Enemy is dead")
      this.enemy10.destroy();
    }
    if (this.enemy11.health === 0) {
      this.enemy11.Alive = false;
      // console.log("Enemy is dead")
      this.enemy11.destroy();
    }
    if (this.enemy12.health === 0) {
      this.enemy12.Alive = false;
      // console.log("Enemy is dead")
      this.enemy12.destroy();
    }
    if (this.enemy13.health === 0) {
      this.enemy13.Alive = false;
      // console.log("Enemy is dead")
      this.enemy13.destroy();
    }
    if (this.enemy14.health === 0) {
      this.enemy14.Alive = false;
      // console.log("Enemy is dead")
      this.enemy14.destroy();
    }
    if (this.enemy15.health === 0) {
      this.enemy15.Alive = false;
      // console.log("Enemy is dead")
      this.enemy15.destroy();
    }
    if (this.enemy16.health === 0) {
      this.enemy16.Alive = false;
      // console.log("Enemy is dead")
      this.enemy16.destroy();
    }
  }

  createBullets() {
    //Bullets Array
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 20,
      runChildUpdate: true
    });

    this.bullet; //stores the current bullet being shot
    this.lastFired = 0;
  }

  createText() {
    //Create bitmap Text for score and health
    this.scoreText = this.add.bitmapText(16, 16, 'bmFont', 'score: 0');
    this.scoreText.setScale(0.25);
    this.scoreText.setTint(0x006400, 0x006400, 0x006400, 0x006400);
    this.scoreText.setDepth();

    this.healthText = this.add.bitmapText(16, 16, 'bmFont', 'Health: 0');
    this.healthText.setScale(0.25);
    this.healthText.setTint(0x006400, 0x006400, 0x006400, 0x006400);
    this.healthText.setDepth();
  }

  updateText() {
    //Input key
    let keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    //Change the positioning of the text
    //If zoomed in
    if (keyM.isDown) {
      //Score
      this.scoreText.setText("score: " + this.player.score);
      this.scoreText.setScale(1);
      this.scoreText.x = this.player.x - 880;
      this.scoreText.y = this.player.y - 400;

      //Health
      this.healthText.setText("Health: " + this.player.Health);
      this.healthText.setScale(1);
      this.healthText.x = this.player.x - 880;
      this.healthText.y = this.player.y - 500;

      //If zoomed out
      //Score
    } else {
      this.scoreText.setText("score: " + this.player.score);
      this.scoreText.setScale(0.25);
      this.scoreText.x = this.player.x - 220;
      this.scoreText.y = this.player.y - 100;

      //Health
      this.healthText.setText("Health: " + this.player.Health);
      this.healthText.setScale(0.25);
      this.healthText.x = this.player.x - 220;
      this.healthText.y = this.player.y - 125;

    }
  }

  update(time, delta) {
    
    //Lose
    //If the player's health is less than zero
    if (this.player.Health <= 0) {
      this.isPlayerAlive = false;
      this.player.anims.play("death", true);
    }

    if (!this.player.isPlayerAlive) {
      this.music.stop();

      this.gameOver();
      return;
    }

    //Win
    if (this.player.isPlayerWinning === true) {
      this.music.stop();
      this.scene.start("Win", { score: this.player.score })
      return;
    }

    this.checkPlayerHealth();
    this.zoomCamera();
    this.movePlayer();
    this.checkEnemyHealth();
    this.updateText();

    //Ememy tracking the player
    //Tracking first area
    if (this.player.y > 470) {
      this.enemy1.trackPlayer(this.player.x, this.player.y);
      this.enemy2.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking second area
    if (this.player.y > 960 & this.player.x < 1060) {
      this.enemy3.trackPlayer(this.player.x, this.player.y);
      this.enemy4.trackPlayer(this.player.x, this.player.y);
      this.enemy5.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking third area 
    if (this.player.x > 940 & this.player.x < 1530 & this.player.y > 500 & this.player.y < 700) {
      this.enemy6.trackPlayer(this.player.x, this.player.y);
      this.enemy7.trackPlayer(this.player.x, this.player.y);
      this.enemy8.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking fourth area
    if (this.player.x > 940 & this.player.y < 300) {
      this.enemy9.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking fifth area
    if (this.player.x > 1920) {
      this.enemy10.trackPlayer(this.player.x, this.player.y);
      this.enemy11.trackPlayer(this.player.x, this.player.y);
      this.enemy12.trackPlayer(this.player.x, this.player.y);
      this.enemy13.trackPlayer(this.player.x, this.player.y);
      this.enemy14.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking hallway
    if (this.player.x < 1890 & this.player.x > 1200 & this.player.y > 980) {
      this.enemy15.trackPlayer(this.player.x, this.player.y);
    }
    //Tracking final area
    if (this.player.x > 1450 & this.player.x < 1700 & this.player.y > 1300) {
      this.enemy16.trackPlayer(this.player.x, this.player.y);
    }

    //Input keys for shooting
    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    let keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    let keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    //Shooting
    // Shoot Right
    if (keyL.isDown && time > this.lastFired) {
      console.log("fire")
      this.laser.play();
      this.bullet = this.bullets.get();

      if (this.bullet) {
        this.bullet.setDir("r");
        this.bullet.fire(this.player.x, this.player.y);
        this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
        this.lastFired = time + 500;
      }
    }
    //Shoot Up
    if (keyI.isDown && time > this.lastFired) {
      console.log("fire")
      this.laser.play();
      this.bullet = this.bullets.get();

      if (this.bullet) {
        this.bullet.setDir("u");
        this.bullet.fire(this.player.x, this.player.y);
        this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
        this.lastFired = time + 500;
      }
    }

    //Shoot Left
    if (keyJ.isDown && time > this.lastFired) {
      console.log("fire")
      this.laser.play();
      this.bullet = this.bullets.get();

      if (this.bullet) {
        this.bullet.setDir("l");
        this.bullet.fire(this.player.x, this.player.y);
        this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
        this.lastFired = time + 500;
      }
    }


    //Shoot Down
    if (keyK.isDown && time > this.lastFired) {
      console.log("fire")
      this.laser.play();
      this.bullet = this.bullets.get();

      if (this.bullet) {
        this.bullet.setDir("d");
        this.bullet.fire(this.player.x, this.player.y);
        this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
        this.lastFired = time + 500;
      }
    }
  }

  gameOver() {
    //Game over function
    console.log("hello from gameOver")
    //Delayed call to allow player death animaton to play 
    this.time.delayedCall(
      1900,
      function () {
        this.scene.stop('Game');
        this.scene.restart();
        this.scene.start("GameOver");
      },
      [],
      this
    );
  }

  //Collision Handlers *Collisions handlers could not be looped*
  //Collisions For Masks
  collHallway1() {
    this.hallway1.setVisible(false);
  }

  collHallway2() {
    this.hallway2.setVisible(false);
  }

  collHallway3() {
    this.hallway3.setVisible(false);
  }

  collHallway4() {
    this.hallway4.setVisible(false);
  }

  collHallway5() {
    this.hallway5.setVisible(false);
  }

  collHallway6() {
    this.hallway6.setVisible(false);
  }

  collHallway7() {
    this.hallway7.setVisible(false);
  }

  roomMaskCol1() {
    this.roomMask1.setVisible(false);
  }

  roomMaskCol2() {
    this.roomMask2.setVisible(false);
  }

  roomMaskCol3() {
    this.roomMask3.setVisible(false);
  }

  roomMaskCol4() {
    this.roomMask4.setVisible(false);
  }

  roomMaskCol5() {
    this.roomMask5.setVisible(false);
  }

  roomMaskCol6() {
    this.roomMask6.setVisible(false);
  }

  //Collisions for Player and Enemies
  collPlayerEnemy() {
    console.log("Enemy hit player");
    this.player.Health = this.player.Health - 1;
    console.log("Player health: " + this.player.Health)
    if (this.player.Health > 0) {
      this.playerHit.play();
    }

  }


  //Collisions for Enemies and Bullets
  collBulletEnemy1(bullet, enemy1) {
    console.log("bullet hit enemy1");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy1.health = this.enemy1.health - 1;
    console.log("enemy health1 " + this.enemy1.health);
    this.enemyHit.play();

  }

  collBulletEnemy2(bullet, enemy2) {
    console.log("bullet hit enemy2");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy2.health = this.enemy2.health - 1;
    console.log("enemy health2 " + this.enemy2.health);
    this.enemyHit.play();
  }

  collBulletEnemy3(bullet, enemy3) {
    console.log("bullet hit enemy3");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy3.health = this.enemy3.health - 1;
    console.log("enemy health3 " + this.enemy3.health);
    this.enemyHit.play();
  }

  collBulletEnemy4(bullet, enemy4) {
    console.log("bullet hit enemy1");
    console.log(bullet);
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy4.health = this.enemy4.health - 1;
    console.log("enemy health4 " + this.enemy4.health);
    this.enemyHit.play();
  }

  collBulletEnemy5(bullet, enemy5) {
    console.log("bullet hit enemy1");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy5.health = this.enemy5.health - 1;
    console.log("enemy health5 " + this.enemy5.health);
    this.enemyHit.play();
  }

  collBulletEnemy6(bullet, enemy6) {
    console.log("bullet hit enemy6");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy6.health = this.enemy6.health - 1;
    console.log("enemy health6 " + this.enemy6.health);
    this.enemyHit.play();
  }

  collBulletEnemy7(bullet, enemy7) {
    console.log("bullet hit enemy7");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy7.health = this.enemy7.health - 1;
    console.log("enemy health7 " + this.enemy7.health);
    this.enemyHit.play();
  }

  collBulletEnemy8(bullet, enemy8) {
    console.log("bullet hit enemy1");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy8.health = this.enemy8.health - 1;
    console.log("enemy health8 " + this.enemy8.health);
    this.enemyHit.play();
  }

  collBulletEnemy9(bullet, enemy9) {
    console.log("bullet hit enemy9");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy9.health = this.enemy9.health - 1;
    console.log("enemy health9 " + this.enemy9.health);
    this.enemyHit.play();
  }

  collBulletEnemy10(bullet, enemy10) {
    console.log("bullet hit enemy10");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy10.health = this.enemy10.health - 1;
    console.log("enemy health10 " + this.enemy10.health);
    this.enemyHit.play();
  }

  collBulletEnemy11(bullet, enemy11) {
    console.log("bullet hit enemy9");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy11.health = this.enemy11.health - 1;
    console.log("enemy health11 " + this.enemy11.health);
    this.enemyHit.play();
  }

  collBulletEnemy12(bullet, enemy12) {
    console.log("bullet hit enemy12");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy12.health = this.enemy12.health - 1;
    console.log("enemy health12 " + this.enemy12.health);
    this.enemyHit.play();
  }

  collBulletEnemy13(bullet, enemy13) {
    console.log("bullet hit enemy13");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy13.health = this.enemy13.health - 1;
    console.log("enemy health13 " + this.enemy13.health);
    this.enemyHit.play();
  }

  collBulletEnemy14(bullet, enemy14) {
    console.log("bullet hit enemy14");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy14.health = this.enemy14.health - 1;
    console.log("enemy health14 " + this.enemy14.health);
    this.enemyHit.play();
  }

  collBulletEnemy15(bullet, enemy15) {
    console.log("bullet hit enemy15");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy15.health = this.enemy15.health - 1;
    console.log("enemy health15 " + this.enemy15.health);
    this.enemyHit.play();
  }

  collBulletEnemy16(bullet, enemy16) {
    console.log("bullet hit enemy16");
    this.player.score += 10;
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy16.health = this.enemy16.health - 1;
    console.log("enemy health16 " + this.enemy16.health);
    this.enemyHit.play();
  }

  //Collision player and ship
  collPlayerShip() {
    this.cameras.main.fade(2500);
    this.time.delayedCall(
      2500,
      function () {
        this.player.isPlayerWinning = true;
        console.log("Is player winning: " + this.player.isPlayerWinning)
        this.music.stop();
        return;
      },
      [],
      this
    );

  }

  //Collision player and health
  collPlayerHealthpick1() {
    this.player.Health += 50;
    this.healthUp.play();
    this.healthPickup1.destroy();
  }

  collPlayerHealthpick2() {
    this.player.Health += 50;
    this.healthUp.play();
    this.healthPickup2.destroy();
  }

  collPlayerHealthpick3() {
    this.player.Health += 50;
    this.healthUp.play();
    this.healthPickup3.destroy();
  }

}
