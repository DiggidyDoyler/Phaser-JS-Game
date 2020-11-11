class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("preloading");
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    //load tileMaps
    this.loadTilemaps();

   
  }

  loadImages() {
    // load images
  
  
    this.load.image("button1", "../assets/blue_button01.png");
    this.load.image("button2", "../assets/blue_button02.png");
    this.load.image("bullet", "../assets/images/bullet.png");

    

  }
  // Tilemaps
  loadTilemaps() {

    this.load.image("tiles", "../assets/tilemaps/tileset.png");
    this.load.tilemapTiledJSON("map", "../assets/tilemaps/space.json");
  }

  loadSpriteSheets() {
    this.load.spritesheet("player", "../assets/images/characterSprite.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("enemy", "../assets/images/lizard.png", {
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
