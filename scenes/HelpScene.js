class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }


  init() {
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    // //Play Music
    // this.music = this.sound.add("introMusic");

    // if (!this.music.play()) {
    //   this.music.restart();
    //   this.music.play();
    //   this.music.loop = true;
    // }

    //Background
    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);
    //Spaceship sprite
    this.spaceStation = this.add.sprite(1250, 550, "station");
    this.spaceStation.setScale(3);

    //Movement Keys
    this.movementText = this.add.bitmapText(40, 410, 'bmFont', 'movement:');
    this.movementText.setScale(1.5);
    this.wKey = this.add.sprite(805, 370, "w");
    this.wKey.setScale(2);
    this.asdKey = this.add.sprite(800, 470, "asd");
    this.asdKey.setScale(2);

    //Shooting keys
    this.shootText = this.add.bitmapText(240, 710, 'bmFont', 'shoot:');
    this.shootText.setScale(1.5);
    this.iKey = this.add.sprite(805, 670, "i");
    this.iKey.setScale(2);
    this.jklKey = this.add.sprite(800, 770, "jkl");
    this.jklKey.setScale(2);

    //Map Keys
    this.mapText = this.add.bitmapText(1180, 410, 'bmFont', 'map:');
    this.mapText.setScale(1.5);
    this.mKey = this.add.sprite(1550, 475, "m");
    this.mKey.setScale(2);

    //Shooting keys
    this.sprintText = this.add.bitmapText(1040, 710, 'bmFont', 'sprint:');
    this.sprintText.setScale(1.5);
    this.spaceKey = this.add.sprite(1650, 770, "spacekey");
    this.spaceKey.setScale(2);





    //Back button
    this.backButton = new UiButton(this, this.scaleW / 2, 950, 'button1', 'button2', 'Back', this.startScene.bind(this, 'Title'));
  }

  startScene(targetScene) {
    // this.music.stop();
    this.scene.stop();
    this.scene.start(targetScene);
  }


}
