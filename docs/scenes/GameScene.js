class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.playerSpeed = 1.5;
  

    this.score = 0;

    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    var shootTime = 0;
    this.createAudio();
    
    this.createTilemap();
    this.createCamera();
    this.createPlayer();
    this.createEnemy()
    // this.createBullet();
    this.createText();

  }

  

  createAudio() {
    //play background loopFull
    // Adding Sounds
    this.music = this.sound.add("bgmusic");
    this.music.play();
  }

 


  
  createCamera() {
   
    this.camera = this.cameras.main;
     
    this.camera.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
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
    this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "player");
    this.isPlayerAlive = true;
    this.player.score = 0;
    
    this.player.setCollideWorldBounds(true);

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

    // This will watch the player and groundLayer every frame to check for collisions
    this.physics.add.collider(this.player, this.wallLayer);
    

    this.camera.startFollow(this.player);

  }



  createEnemy() {
    
    this.enemy = this.physics.add.sprite(200, 200, "enemy");
    this.enemyAlive = true;
    this.enemy.setScale(2);
    this.enemyHealth = 3;
    console.log(this.enemyHealth);
    
    
    this.enemy.setCollideWorldBounds(true);

    // animation states
    this.anims.create({
      key: "rightE",
      frames: this.anims.generateFrameNumbers("enemy", { start: 1, end: 6 }), 
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "standE",
      frames: [{ key: "enemy", frame: 1 }],
      frameRate: 10,
    });

    //Cause collision with player
    this.physics.add.collider(this.enemy, this.player);
    //Cause colllision with wall
    this.physics.add.collider(this.enemy, this.wallLayer);
    


  }
  // createBullet(){
  

  //   this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet");
  //   this.bullet.setScale(0.2);
  //   this.player.setCollideWorldBounds(true);
  

 
  // }


	
// createBullet() {
  
//   var bullets;

//   bullets = game.add.group();
//   bullets.enableBody = true;
//   bullets.physicsBodytype = Phaser.Physics.Arcade;
//   bullets.createMultiple(5,'bullet');

//   bullets.setAll('anchor.x', 0.5);
//   bullets.setAll('anchor.y', 0.5);

//   bullets.setAll('scale.x', 0.2);
//   bullets.setAll('scale.y', 0.2);

//   bullets.setAll('outOfBoundsKill', true)
//   bullets.setAll('checkWorldBounds', true)

// }

// shootBullet() {
//       if(this.time.now > shootTime) {
//         bullet = bullets.getFirstExists (false);
//         if (bullet) {
//             bullet.reset(player.x, player.y)

//             bullet.body.velocity.y = -600;
//             shootTime = this.time.now + 900;
//         }
//       }
// }

// Second Attempt at shooting
// createBullet(){
//   this.bullets = this.physics.add.group({
//     defaultKey: 'bullet',
//     maxSize: 10
// });

// this.input.on('pointerdown', this.shoot, this);
// }

//     shoot() {
//       var bullet = this.bullets.get(this.player.x, this.player.y);
//       if (bullet) {
//           bullet.setActive(true);
//           bullet.setVisible(true);
//           bullet.body.velocity.y = -200;
//           bullet.setCollideWorldBounds(true);
//           this.physics.add.collider(bullet, this.wallLayer);
//           this.physics.add.collider(bullet, this.enemy);
//           // if (bullet > 10){
//           //   bullet.setActive(false);
//           //   bullet.setVisible(false);
//           // }

          
//       }
//     }
    
    // // set random speeds for all children of enemies group
    // Phaser.Actions.Call(
    //   this.enemies.getChildren(),
    //   function (enemy) {
    //     enemy.speed = Math.random() * 1 + 1;
    //   },
    //   this
    // );

    // //11: add a collider between player and enemies
    // this.physics.add.overlap(
    //   this.player,
    //   this.enemies,
    //   this.collisionCheck,
    //   null,
    //   this
  //   // );
  // }




    //11: add a collider between player and treasures
    // this.physics.add.overlap(
    //   this.player,
    //   this.treasures,
    //   this.collectTreasures,
    //   null,
    //   this
    // );
  

  createText() {
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#f00",
    });
  }

  //gameLoop
  update(time, delta) {

   

    this.cursors = this.input.keyboard.createCursorKeys();
    
    //Input Keys for movement
    let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // Test key input
      //   if(keyA.isDown) {
  //     console.log('A key pressed')
  //  } else if(keyS.isDown) {
  //     console.log('S key pressed')
  //  } else if(keyD.isDown) {
  //     console.log('D key pressed')
  //  } else if(keyW.isDown) {
  //     console.log('W key pressed')
  //  }

  

    // if (controls.shoot.isDown) {
    //   this.shootBullet()
    // }

    // if(checkOverlap(bullet,enemy)){
    //   enemy.kill();
    // }

  

            
    // Move/Animate the player
      // Left
    if (keyA.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("left", true);
      //Right
    } else if (keyD.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("right", true);
      //Up
    } else if (keyS.isDown){
      this.player.setVelocityY(100);
      this.player.anims.play("down", true);
      //Down
    } else if (keyW.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play("up", true);
      //Stand
    } else {
      this.player.anims.play("stand");
      this.player.setVelocity(0);
    }

    //Enemy tracking player
    //If the player is to the left and below
    if (this.player.x < this.enemy.x & this.player.y > this.enemy.y  ) {
      this.enemy.setVelocityX(-50);
      this.enemy.setVelocityY(50);
      this.enemy.anims.play("rightE", true);
      this.enemy.setScale(-2, 2);
      this.enemy.setOffset(16,0)
      //If the player is to the right and below
    } else  if ((this.player.x > this.enemy.x & this.player.y > this.enemy.y  )) {
      this.enemy.setVelocityX(50);
      this.enemy.setVelocityY(50);
      this.enemy.anims.play("rightE", true);
      this.enemy.setScale(2, 2);
      this.enemy.setOffset(0,0)
      //If the player is above
    } else  if (this.player.y > this.enemy.y  ) {
      this.enemy.setVelocityY(50);
      this.enemy.anims.play("rightE", true);
      //If the player is below
    }else  if (this.player.y < this.enemy.y) {
        this.enemy.setVelocityY(-50);
        this.enemy.anims.play("rightE", true);

    } else  if ((this.player.x > this.enemy.x & this.player.y < this.enemy.y  )) {
      this.enemy.setVelocityX(50);
      this.enemy.setVelocityY(-50);
      this.enemy.anims.play("rightE", true);
    } else  if ((this.player.x > this.enemy.x & this.player.y < this.enemy.y  )) {
      this.enemy.setVelocityX(50);
      this.enemy.setVelocityY(-50);
      this.enemy.anims.play("rightE", true);
      this.enemy.setScale(2, 2);
      this.enemy.setOffset(0,0)
    }

    // as
   // Shooting
  
    if (this.cursors.right.isDown) {
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet");
      this.bullet.setVelocityX(200);
      this.bullet.setScale(0.2);
      this.bullet.setCollideWorldBounds(true);
      if (this.physics.add.collider(this.bullet, this.enemy)) {
        this.enemyHealth = this.enemyHealth -1;
      }
   
    } else if (this.cursors.up.isDown) {
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet");
      this.bullet.setVelocityY(-200);
      this.bullet.setScale(0.2);
      this.bullet.setCollideWorldBounds(true);
      if (this.physics.add.collider(this.bullet, this.enemy)) {
        this.enemyHealth = this.enemyHealth -1;
      }

    } else if (this.cursors.left.isDown) {
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet");
      this.bullet.setVelocityX(-200);
      this.bullet.setScale(0.2);
      this.bullet.setCollideWorldBounds(true);
      if (this.physics.add.collider(this.bullet, this.enemy)) {
        this.enemyHealth = this.enemyHealth -1;
      }
      
    } else if (this.cursors.down.isDown) {
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, "bullet");
      this.bullet.setVelocityY(200);
      this.bullet.setScale(0.2);
      this.bullet.setCollideWorldBounds(true);
      if (this.physics.add.collider(this.bullet, this.enemy)) {
        this.enemyHealth = this.enemyHealth -1;
      }
    
    }

     console.log(this.enemyHealth)
     
  //   this.bullets.children.each(function(b) {
  //     if (b.active) {
  //         if (b.y < 0) {
  //             b.setActive(false);
  //         }
  //     }
  // }.bind(this));
  
        
  
    
    
    
    

  
    //11: add a score to the game
    this.scoreText.setText("score: " + this.player.score);

    //08: check is player isPlayer dead -> exit the update loop
    if (!this.isPlayerAlive) {
      return;
    }
  

  

    
  }





  gameOver() {
    this.scene.start("GameOver");
  }
}
