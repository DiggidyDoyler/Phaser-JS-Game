class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
   
  }

  create() {

    //Stop any sounds that may come over from other scenes
    this.sound.stopAll();
    //Add Music
    this.music = this.sound.add("introMusic");
    //If music is not playing, play and loop music
    if (!this.music.play()){
    this.music.restart();
    this.music.play();
    this.music.loop = true;
    }
  
    //Background Image
    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);

    //Space station sprite
    this.spaceStation = this.add.sprite(1250,550,"station");
    this.spaceStation.setScale(3);

    //Text
    this.titleText = this.add.bitmapText(this.scaleW / 2, 200, 'bmFont', 'Space Escape');
    this.titleText.setOrigin(0.5);
    this.titleText.setScale(2.5);
    this.titleText.setTint(0xffffff,0xffffff, 0xffffff, 0xffffff);
    
    //Buttons
    //Start 
    this.startGameButton = new UiButton(this, this.scaleW / 2, 700, 'button1', 'button2', 'Start', this.startGame.bind(this, 'Game'));
    
    //Help
    this.helpButton = new UiButton(this, this.scaleW / 2, 800, 'button1', 'button2', 'Help', this.startOptions.bind(this, 'Help',  { music: this.music }));

    //Options
    this.OptionsButton = new UiButton(this, this.scaleW / 2, 900, 'button1', 'button2', 'Options', this.startOptions.bind(this, 'Options',  { music: this.music }));  
  }

 
  //Start game buttons has delay 
  startGame(targetScene, x) {
    this.cameras.main.fade(2500);
    this.time.delayedCall(
      2500,
      function () {
        this.music.stop();
        this.scene.start(targetScene);
      },
      [],
      this
    );
  }

  //Start options/help
  startOptions(targetScene, x) {
        this.music.stop();
        this.scene.start(targetScene, { music: this.x });
  }
    

}
