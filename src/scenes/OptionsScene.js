class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }


  init() {
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
   
    // //Play Music
    // this.music = this.sound.add("introMusic");

    // if (!this.music.play()){
  
    // this.data.music.play();
    // this.music.loop = true;
    // }
    
    //Background
    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);
    //Spaceship sprite
    this.spaceStation = this.add.sprite(1250, 550, "station");
    this.spaceStation.setScale(3);

    //Title Text
    this.titleText = this.add.bitmapText(this.scaleW / 2, 200, 'bmFont', 'Space Escape');
    this.titleText.setOrigin(0.5);
    this.titleText.setScale(2.5);
    this.titleText.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);

    //Mute text
    this.muteText = this.add.bitmapText(this.scaleW / 2 - 350, 700, 'bmFont', 'mute:');
    this.muteText.setScale(1.5);
    this.slashText = this.add.bitmapText(this.scaleW / 2 + 90, 700, 'bmFont', '/');
    this.slashText.setScale(1.5);

    //Creating On text, making interactive
    this.onText = this.add.bitmapText(this.scaleW / 2 - 50, 700, 'bmFont', 'on').setInteractive();
    this.onText.setScale(1.5);
    //If on text is pressed, mute the game
    this.onText.on('pointerdown', function (pointer) {

      game.sound.mute = true;

    });
     //Creating Off text, making interactive
    this.offText = this.add.bitmapText(this.scaleW / 2 + 150, 700, 'bmFont', 'Off').setInteractive();
    this.offText.setScale(1.5);
     //If off text is pressed, mute the game
    this.offText.on('pointerdown', function (pointer) {

      game.sound.mute = false;

    });

    //Back button
    this.backButton = new UiButton(this, this.scaleW / 2, 950, 'button1', 'button2', 'Back', this.startScene.bind(this, 'Title'));

  }

  startScene(targetScene) {
    this.scene.stop();
    this.scene.start(targetScene);
  
  }


}
