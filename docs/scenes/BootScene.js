class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("preloading");
    // load images
    this.loadImages();
    //13 load Bitmap text
    this.loadBitmapText();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    this.loadTilemaps();
  }

  loadImages() {
    //Load Images
    this.load.image("bullet", "/assets/bullet.png");
    this.load.image("ship", "/assets/ship.png");
    this.load.image("button1", "/assets/blue_button01.png");
    this.load.image("button2", "/assets/blue_button02.png");
    this.load.image("health", "/assets/health.png");

    //Room Masks
    this.load.image("hallway1", "/assets/roomMasks/hallway1.png");
    this.load.image("hallway2", "/assets/roomMasks/hallway2.png");
    this.load.image("hallway3", "/assets/roomMasks/hallway3.png");
    this.load.image("hallway4", "/assets/roomMasks/hallway4.png");
    this.load.image("hallway5", "/assets/roomMasks/hallway5.png");
    this.load.image("hallway6", "/assets/roomMasks/hallway6.png");
    this.load.image("hallway7", "/assets/roomMasks/hallway7.png");

    this.load.image("room1", "/assets/roomMasks/room1.png");
    this.load.image("room2", "/assets/roomMasks/room2.png");
    this.load.image("room3", "/assets/roomMasks/room3.png");
    this.load.image("room4", "/assets/roomMasks/room4.png");
    this.load.image("room5", "/assets/roomMasks/room5.png");
    this.load.image("room6", "/assets/roomMasks/room6.png");
  
  }
  
  loadTilemaps() {

    this.load.image("tiles", "/assets/tilemaps/tileset.png");
    // this.load.tilemapTiledJSON("map", "/assets/tilemaps/space.json");
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/space2.json");
  }

  //13: loadBitmapText
  loadBitmapText() {
    this.load.bitmapFont('bmFont', '/assets/bitmapfonts/font.png', '/assets/bitmapfonts/font.fnt');
  }

  loadSpriteSheets() {
    this.load.spritesheet("player", "/assets/characterSprite.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

  this.load.spritesheet("enemy", "/assets/lizard.png", {
    frameWidth: 16,
    frameHeight: 28,
  });

}


  loadAudio() {
    // // Adding Sounds
    // this.load.audio("bgmusic", [
    //   "/assets/bgmusic.mp3",
    //   "/assets/bgmusic.ogg",
    // ]);
  }

  create() {
    this.scene.start("Game");
  }
}
