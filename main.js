//13 physics
var config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: 1920,
  height: 1080,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    WinScene,
    HelpScene,
    OptionsScene,
    GameOverScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
};

var game = new Phaser.Game(config);
