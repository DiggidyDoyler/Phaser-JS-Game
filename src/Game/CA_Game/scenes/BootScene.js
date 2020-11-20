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
    // load images
 
  
    this.load.image("bullet", "../assets/bullet.png");
    this.load.image("heart", "../assets/heart.png");
    this.load.image("button1", "../assets/blue_button01.png");
    this.load.image("button2", "../assets/blue_button02.png");
  }
  
  loadTilemaps() {

    this.load.image("tiles", "../assets/tilemaps/tileset.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/space.json");
  }

  //13: loadBitmapText
  loadBitmapText() {
    this.load.bitmapFont('bmFont', '../assets/bitmapfonts/font.png', '../assets/bitmapfonts/font.fnt');
  }

  loadSpriteSheets() {
    this.load.spritesheet("player", "../assets/characterSprite.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

  this.load.spritesheet("enemy", "../assets/lizard.png", {
    frameWidth: 16,
    frameHeight: 28,
  });
}


  loadAudio() {
    // Adding Sounds
    this.load.audio("bgmusic", [
      "../assets/bgmusic.mp3",
      "../assets/bgmusic.ogg",
    ]);
  }

  create() {
    this.scene.start("Game");
  }
}
