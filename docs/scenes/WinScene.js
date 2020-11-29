class WinScene extends Phaser.Scene {
  constructor() {
    super('Win');

  }

  init() {

    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create(data) {

    //Add Music
    this.music = this.sound.add("winMusic");
    this.music.play();
    this.music.loop = true;
    

    //Add background image
    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);

    //Add Text
    this.titleText = this.add.bitmapText(this.scaleW / 2, 200, 'bmFont', 'You win');
    this.titleText.setOrigin(0.5);
    this.titleText.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);

    this.scoreText = this.add.bitmapText(this.scaleW / 2, 350, 'bmFont', 'Score:' + data.score);
    this.scoreText.setOrigin(0.5);
    this.scoreText.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);


    //Fire Animation
    this.createFire();
    //Ship Sprite
    this.ship = this.add.sprite(this.scaleW / 2, 680, "ship");
    this.ship.setScale(10);

    //Back to menu button
    this.backButton = new UiButton(this, this.scaleW / 2, 950, 'button1', 'button2', 'Exit', this.startScene.bind(this, 'Title'));
  }

  //Start Scene Function
  startScene(targetScene) {
    this.music.stop();
    // this.scene.stop('Win');
    this.scene.start(targetScene);
  }

  //Create fire animation function
  createFire() {
    this.fire = this.add.sprite(530, 615, "fire");
    this.fire.setScale(4);
    this.anims.create({
      key: "fireAnim",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.fire.anims.play("fireAnim", true);
  }
}
