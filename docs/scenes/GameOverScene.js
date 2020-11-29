class GameOverScene extends Phaser.Scene {
  constructor(s) {
    super('GameOver');

  }

  init() {
    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {

    //Stop music that may come over from other scenes
    this.sound.stopAll();
    
    this.music = this.sound.add("gameOver");
    this.music.loop = true;
    this.music.play();

    //Background
    this.background = this.add.sprite(0, 0, "background");
    this.background.setOrigin(0, 0);
    //SpaceShip
    this.spaceStation = this.add.sprite(1250, 550, "station");
    this.spaceStation.setScale(3);

    //Explosion function
    this.createExplosion();

    //Text
    this.gameOverText = this.add.bitmapText(this.scaleW / 2, 200, 'bmFont', 'Game Over');
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setScale(2.5);
    this.gameOverText.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);

    //Button
    
    this.retryButton = new UiButton(this, this.scaleW / 2, 800, 'button1', 'button2', 'Retry', this.startScene.bind(this, 'Game'));

    this.mainMenuButton = new UiButton(this, this.scaleW / 2, 900, 'button1', 'button2', 'Main menu', this.startScene.bind(this, 'Title'));
  }

  //Create explosion animations
  createExplosion() {
    //Explosion1
    this.explosion1 = this.add.sprite(600, 500, "explosion1");
    this.explosion4 = this.add.sprite(1300, 500, "explosion1");
    this.anims.create({
      key: "explode1",
      frames: this.anims.generateFrameNumbers("explosion1", { start: 0, end: 64 }),
      frameRate: 10,
      repeat: -1,
    });

    this.explosion1.anims.play("explode1", true);

    this.time.delayedCall(
      600,
      function () {
        this.explosion4.anims.play("explode1", true);

      },
      [],
      this
    );
    

    //Explosion2
    this.explosion2 = this.add.sprite(1100, 700, "explosion2");
    this.anims.create({
      key: "explode2",
      frames: this.anims.generateFrameNumbers("explosion2", { start: 0, end: 64 }),
      frameRate: 10,
      repeat: -1,
    });

    this.time.delayedCall(
      400,
      function () {
        this.explosion2.anims.play("explode2", true);

      },
      [],
      this
    );

    //Explosion3
    this.explosion3 = this.add.sprite(1500, 400, "explosion3");
    this.anims.create({
      key: "explode3",
      frames: this.anims.generateFrameNumbers("explosion3", { start: 0, end: 64 }),
      frameRate: 10,
      repeat: -1,
    });
    this.time.delayedCall(
      800,
      function () {
        this.explosion3.anims.play("explode3", true);

      },
      [],
      this
    );
  }

  //Function to return to main menu
  startScene(targetScene) {
    this.cameras.main.fade(2500);
    this.time.delayedCall(
      2500,
      function () {
        // this.scene.restart();
        this.music.stop();
        this.scene.start(targetScene);
        return;
      },
      [],
      this
    );

  }






}
