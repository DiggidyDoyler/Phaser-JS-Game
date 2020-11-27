class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("preloading");
    // load images
    this.loadImages();
    // load Bitmap text
    this.loadBitmapText();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    this.loadTilemaps();
  }

  loadImages() {
    //Load Images
    //Title Screen
    this.load.image("background", "assets/stars.jpg");
    this.load.image("station", "assets/spaceStation.png");


    //Main Game
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("ship", "assets/ship.png");
    this.load.image("button1", "assets/blue_button01.png");
    this.load.image("button2", "assets/blue_button02.png");
    this.load.image("health", "assets/health.png");

    //Room Masks
    this.load.image("hallway1", "assets/roomMasks/hallway1.png");
    this.load.image("hallway2", "assets/roomMasks/hallway2.png");
    this.load.image("hallway3", "assets/roomMasks/hallway3.png");
    this.load.image("hallway4", "assets/roomMasks/hallway4.png");
    this.load.image("hallway5", "assets/roomMasks/hallway5.png");
    this.load.image("hallway6", "assets/roomMasks/hallway6.png");
    this.load.image("hallway7", "assets/roomMasks/hallway7.png");

    this.load.image("room1", "assets/roomMasks/room1.png");
    this.load.image("room2", "assets/roomMasks/room2.png");
    this.load.image("room3", "assets/roomMasks/room3.png");
    this.load.image("room4", "assets/roomMasks/room4.png");
    this.load.image("room5", "assets/roomMasks/room5.png");
    this.load.image("room6", "assets/roomMasks/room6.png");
  
  }
  
  loadTilemaps() {

    this.load.image("tiles", "assets/tilemaps/tileset.png");
    // this.load.tilemapTiledJSON("map", "assets/tilemaps/space.json");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/space2.json");
  }

  //LoadBitmapText
  loadBitmapText() {
    this.load.bitmapFont('bmFont', 'assets/bitmapfonts/font.png', 'assets/bitmapfonts/font.fnt');
  }

  //Loading Sprite Sheets
  //Player
  loadSpriteSheets() {
    this.load.spritesheet("player", "assets/characterSprite.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  //Enemy
  this.load.spritesheet("enemy", "assets/lizard.png", {
    frameWidth: 16,
    frameHeight: 28,
  });
  //Explosion1
  this.load.spritesheet("explosion1", "assets/explosion1.png", {
    frameWidth: 256,
    frameHeight: 256,
  });
   //Explosion2
   this.load.spritesheet("explosion2", "assets/explosion2.png", {
    frameWidth: 256,
    frameHeight: 256,
  });
   //Explosion1
   this.load.spritesheet("explosion3", "assets/explosion3.png", {
    frameWidth: 256,
    frameHeight: 256,
  });

}


loadAudio() {
  // Adding Sounds
  //Music
  this.load.audio("mainmusic", [
    "assets/sounds/mainMusic.mp3",
    "assets/sounds/mainMusic.ogg",
  ]);

  this.load.audio("introMusic", [
    "assets/sounds/introMusic.mp3",
    "assets/sounds/introMusic.ogg",
  ]);

  this.load.audio("gameOver", [
    "assets/sounds/gameOver.mp3",
    "assets/sounds/gameOver.ogg",
  ]);

  //Sound effects
  this.load.audio("laser", [
    "assets/sounds/laser.mp3",
    "assets/sounds/laser.ogg",
  ]);

  this.load.audio("enemyHit", [
    "assets/sounds/enemyHit.mp3",
    "assets/sounds/enemyHit.ogg",
  ]);

  this.load.audio("healthUp", [
    "assets/sounds/healthUp.mp3",
    "assets/sounds/healthUp.ogg",
  ]);

  this.load.audio("playerHit", [
    "assets/sounds/playerHit.mp3",
    "assets/sounds/playerHit.ogg",
  ]);

  this.load.audio("playerDeath", [
    "assets/sounds/playerDeath.mp3",
    "assets/sounds/playerDeath.ogg",
  ]);

}


  create() {
    this.scene.start("Title");
  }
}
