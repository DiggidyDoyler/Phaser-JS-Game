//13: Physics

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  

  init() {

    this.playerSpeed = 100;
    this.score = 0;

    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    
    this.createTilemap();
    
    this.createPlayer();
    this.hideAreas();
    this.createCamera();

   
    // this.createEnemies();
    this.createText();
  

  
    this.createBullets();
    this.createEnemy();
  
   
  }

  createTilemap() {
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
    //13: add  player sprite to physics engine
    this.player = this.physics.add.sprite(250, 150, "player");
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.8);
    this.player.body.offset.y = 12;
    this.isPlayerAlive = true;
    this.isPlayerWinning = false;
    this.player.Health = 3;
    this.player.score = 0;
    
   
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
  }

  hideAreas(){
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
  
  // for(i = 0; i < 7; i ++){
  //   this.physics.add.overlap(
  //     this.player,
  //     this.hallway[i],
  //     this.collHallway[i],
  //     null,
  //     this
  //   );
  // }
  
  //Hallways
  this.physics.add.overlap(
    this.player,
    this.hallway1,
    this.collHallway1,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway2,
    this.collHallway2,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway3,
    this.collHallway3,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway4,
    this.collHallway4,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway5,
    this.collHallway5,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway6,
    this.collHallway6,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.hallway7,
    this.collHallway7,
    null,
    this
  );


  //Rooms
  this.physics.add.overlap(
    this.player,
    this.roomMask1,
    this.roomMaskCol1,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.roomMask2,
    this.roomMaskCol2,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.roomMask3,
    this.roomMaskCol3,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.roomMask4,
    this.roomMaskCol4,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.roomMask5,
    this.roomMaskCol5,
    null,
    this
  );

  this.physics.add.overlap(
    this.player,
    this.roomMask6,
    this.roomMaskCol6,
    null,
    this
  );
  }


  createCamera() {
  
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player, true);
    // this.camera.setZoom(4)
  
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  zoomCamera(){
    let keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    if (keyM.isDown) {
      this.camera.setZoom(1);
    } else {
      this.camera.setZoom(4);
    }
  }

  createPlayerHealth(){
    this.playerHealth = this.add.group({
      key: "heart",
      repeat: this.player.Health - 1,
      setXY: {
        x: 370,
        y: 20,
        stepX: 25,
        stepY: 0,
      },
    });

  }

  createEnemy() {
    // this.enemy = this.physics.add.sprite(200, 200, "enemy");
    // this.enemy.body.setSize(this.enemy.width, this.enemy.height -10);
    // this.enemy.body.offset.y = 9;
    // this.enemy.setScale(2); 
    // this.enemyHealth = 3;
    // this.enemyAlive = true; 

    this.enemy = new Enemy(this, 200, 200); 
    this.enemy2 = new Enemy(this, 100, 200); 

;
        //Cause colllision with wall
        this.physics.add.collider(this.enemy, this.wallLayer);
        this.handlePlayerEnemyCollider = this.physics.add.collider(this.enemy, this.player);

        //Add collider between Bullets and enemies 
        this.physics.add.overlap(
          this.bullets,
          this.enemy,
          this.collBulletEnemy,
          null,
          this
        );

        //Add collider between Enemy and Player
        this.physics.add.overlap(
          this.player,
          this.enemy,
          this.collPlayerEnemy,
          null,
          this
        );
  }



  collPlayerEnemy(player, enemy) {
    console.log("Enemy hit player");
    this.player.Health = this.player.Health - 1;
    console.log("Player health: " + this.player.Health)
   
  }


  collBulletEnemy(bullet, enemy) {
    console.log("bullet hit enemy");
    console.log(bullet);
    console.log(enemy);
    this.player.score += 2;
    // this.enemy.disableBody(true,true);
    // this.stopAnimation();
    this.bullet.setActive(false);
    this.bullet.setVisible(false);
    this.bullet.destroy();
    this.enemy.health = this.enemy.health -1;
    console.log("enemy health" + this.enemy.health);
  }


  checkEnemyHealth(){
    if (this.enemy.health === 0) {
      this.enemy.Alive = false;
      console.log("Enemy is dead")
      this.enemy.destroy();

    }  else {
      console.log("Enemy is alive")
     }
    }
    
  createBullets() {
    //16 bullets array is a group inside arcade physics engine
    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 20,
        runChildUpdate: true
    });

    this.bullet; //stores the current bullet being shot
    this.lastFired = 0;
  }


  // createEnemies() {
  //   //13: add  enemy sprites to physics system
  //   this.enemies = this.physics.add.group({
  //     key: "enemy",
  //     repeat: Math.floor(Math.random() * 10),
  //     score: 5,
  //     setXY: {
  //       x: 110,
  //       y: 160,
  //       stepX: 150,
  //       stepY: 20,
  //     },
  //   });
    

  //   this.physics.add.collider(this.enemies, this.player);
  //   this.physics.add.collider(this.enemies, this.enemies);
  //   this.physics.add.collider(this.enemies, this.wallLayer);
  //   // scale enemies down
  //   Phaser.Actions.ScaleXY(this.enemies.getChildren(), 1, 1);

  //   // set random speeds for all children of enemies group
  //   Phaser.Actions.Call(
  //     this.enemies.getChildren(),
  //     function (enemy) {
  //       enemy.speed = Math.random() * 1 + 1;
  //     },
  //     this
  //   );

  //   //13: add a collider between player and enemies
  //   this.physics.add.overlap(
  //     this.player,
  //     this.enemies,
  //     this.collisionCheck,
  //     null,
  //     this
  //   ); 
  // }



//   trackPlayer(){
//       if (this.enemy.health > 0){
//       if (this.player.x < this.enemy.x & this.player.y > this.enemy.y  ) {
//         this.enemy.setVelocityX(-50);
//         this.enemy.setVelocityY(50);
//         this.enemy.anims.play("rightE", true);
//         this.enemy.setScale(-2, 2);
//         this.enemy.setOffset(15,10)
//         //If the player is to the right and below
//       } else  if ((this.player.x > this.enemy.x & this.player.y > this.enemy.y  )) {
//         this.enemy.setVelocityX(50);
//         this.enemy.setVelocityY(50);
//         this.enemy.anims.play("rightE", true);
//         this.enemy.setScale(2, 2);
//         this.enemy.setOffset(0,10)
//         //If the player is above
//       } else  if (this.player.y > this.enemy.y  ) {
//         this.enemy.setVelocityY(50);
//         this.enemy.anims.play("rightE", true);
//         this.enemy.setScale(2, 2);
//         this.enemy.setOffset(-10,0)
//       }else  if (this.player.x < this.enemy.x) {
//         this.enemy.setVelocityX(-50);
//         this.enemy.anims.play("rightE", true);
//         this.enemy.setScale(-2, 2);
//         this.enemy.setOffset(15,10)
//         //If the player is below
//       }else  if (this.player.y < this.enemy.y) {
//           this.enemy.setVelocityY(-50);
//           this.enemy.anims.play("rightE", true);
//           this.enemy.setOffset(0,10)
//       } else  if ((this.player.x > this.enemy.x & this.player.y < this.enemy.y  )) {
//         this.enemy.setVelocityX(50);
//         this.enemy.setVelocityY(-50);
//         this.enemy.setOffset(15,10)
//         this.enemy.anims.play("rightE", true);
//       } else  if ((this.player.x < this.enemy.x & this.player.y < this.enemy.y  )) {
//         this.enemy.setVelocityX(50);
//         this.enemy.setVelocityY(-50);
//         this.enemy.anims.play("rightE", true);
//         this.enemy.setScale(-2, 2);
//         this.enemy.setOffset(0,10)
//       }else if (collBulletEnemy(bullet, enemy)){
//         this.enemy.setVelocityX(50);
//         this.enemy.setVelocityY(-50);
//       } 
//   }
// }


  createText() {
    

    /*this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#f00",
    });*/
    //13 bitmapFont
    this.scoreText = this.add.bitmapText(16, 16, 'bmFont', 'score: 0');
    this.scoreText.setScale(0.25);
    this.scoreText.setTint(0xff0000, 0xffffff, 0xff0000,0xffffff);
    this.scoreText.setDepth();

    this.infoTxt = this.add.bitmapText(16, 60, 'bmFont', 'stuff');
    this.infoTxt.setScale(0.25);
    this.infoTxt.setTint(0xff00ff, 0xffffff, 0xff00ff,0xffffff);
    this.infoTxt.setDepth();
  }


  //gameLoop
  update(time, delta) {

    this.zoomCamera();
    this.createPlayerHealth()
    // this.trackPlayer();
    this.checkEnemyHealth();
    this.enemy.trackPlayer(this.player.x, this.player.y);
    this.enemy2.trackPlayer(this.player.x, this.player.y);
  

     if (!this.isPlayerAlive || this.isPlayerWinning) {
      return;
      this.gameOver();
    } else {
      
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    let keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    let keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  

   

      // Move/Animate the player
      // Left
      if (keyA.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
        this.player.anims.play("left", true);
        //Right
      } else if (keyD.isDown) {
        this.player.setVelocityX(this.playerSpeed);
        this.player.anims.play("right", true);
        //Up
      } else if (keyS.isDown){
        this.player.setVelocityY(this.playerSpeed);
        this.player.anims.play("down", true);
        //Down
      } else if (keyW.isDown) {
        this.player.setVelocityY(-this.playerSpeed);
        this.player.anims.play("up", true);
        //Stand
      } else {
        this.player.anims.play("stand");
        this.player.setVelocity(0);
      }

       //Sprint
        if (this.cursors.space.isDown)
        {
        this.playerSpeed = 250;
        }
        else 
        {
          this.playerSpeed = 100;
        }
  

    //console.log(this.player.score);
    //11: add a score to the game
    this.scoreText.setText("score: " + this.player.score);
    

    //Shooting
    // Shoot Right
    if (keyL.isDown && time > this.lastFired) {
      console.log("fire")
      this.bullet = this.bullets.get();
        
      if (this.bullet)
      {
          this.bullet.setDir("r");
          this.bullet.fire(this.player.x, this.player.y);
          this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
          this.lastFired = time + 500;
      }
      
    }

    //Shooting
    //Shoot Up
    if (keyI.isDown && time > this.lastFired) {
      console.log("fire")
      this.bullet = this.bullets.get();
        
      if (this.bullet)
      {
          this.bullet.setDir("u");
          this.bullet.fire(this.player.x, this.player.y);
          this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
          this.lastFired = time + 500;
          
      }
      
    }

      //Shoot Left
      if (keyJ.isDown && time > this.lastFired) {
        console.log("fire")
        this.bullet = this.bullets.get();
          
        if (this.bullet)
        {
            this.bullet.setDir("l");
            this.bullet.fire(this.player.x, this.player.y);
            this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
            this.lastFired = time + 500;
        }
        
      }

      
      //Shoot Down
      if (keyK.isDown && time > this.lastFired) {
        console.log("fire")
        this.bullet = this.bullets.get();
          
        if (this.bullet)
        {
            this.bullet.setDir("d");
            this.bullet.fire(this.player.x, this.player.y);
            this.bullet.body.setSize(this.bullet.width * 1, this.bullet.height * 1);
            this.lastFired = time + 500;
        }
        
      }

    
    this.infoTxt.setText([
      'Used: ' + this.bullets.getTotalUsed(),
      'Free: ' + this.bullets.getTotalFree()
   ]);

  
    


  }

  // //12: new collision check
  // collisionCheck(player, enemy) {
  //   console.log("overlapping now");
  //   // this.isPlayerAlive = false;
  //   // player.disableBody(true, true);
  //   // this.gameOver();
  // }

 
  // //12: new collision check
  // collectTreasures(player, treasure) {
  //   console.log("treasure collected");
  //   this.player.treasures ++;
  //   this.player.score = 5  * this.player.treasures;
  //   treasure.disableBody(true, true);
  //   this.checkWinCondition(this.player.treasures);
  // }

  // //13: winConditionCheck
  // checkWinCondition(howManyChests) {
  //   console.log("checking Win")
  //   if (howManyChests == 3) {
  //     console.log("You won!");
  //     this.isPlayerWinning = true;
  //     this.scene.start("Win", {score: this.player.score});
  //   }
    
  // }

  gameOver() {
    console.log("hello from gameOver")
    this.scene.start("GameOver");
  }


  // Collisions For Masks
  collHallway1(){
    this.hallway1.setVisible(false);
  }

  collHallway2(){
    this.hallway2.setVisible(false);
  }

  collHallway3(){
    this.hallway3.setVisible(false);
  }

  collHallway4(){
    this.hallway4.setVisible(false);
  }

  collHallway5(){
    this.hallway5.setVisible(false);
  }

  collHallway6(){
    this.hallway6.setVisible(false);
  }

  collHallway7(){
    this.hallway7.setVisible(false);
  }

  roomMaskCol1(){
    this.roomMask1.setVisible(false);
  }

  roomMaskCol2(){
    this.roomMask2.setVisible(false);
  }

  roomMaskCol3(){
    this.roomMask3.setVisible(false);
  }

  roomMaskCol4(){
    this.roomMask4.setVisible(false);
  }

  roomMaskCol5(){
    this.roomMask5.setVisible(false);
  }

  roomMaskCol6(){
    this.roomMask6.setVisible(false);
  }


}
