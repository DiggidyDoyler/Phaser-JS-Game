class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }

  create() {
  
    this.music = this.sound.add("introMusic");
    this.music.loop = true;
    this.music.play();

    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.spaceStation = this.add.sprite(1250,550,"station");
    this.spaceStation.setScale(3);


    this.titleText = this.add.bitmapText(this.scaleW / 2, 200, 'bmFont', 'Space Escape');
    this.titleText.setOrigin(0.5);
    this.titleText.setScale(2.5);
    this.titleText.setTint(0xffffff,0xffffff, 0xffffff, 0xffffff);
    // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH * 0.65, 'button1', 'button2', 'Start', this.startScene.bind(this, 'Game'));
  }

  startScene(targetScene) {
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
}
