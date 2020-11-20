//13 physics
var config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: 512,
  height: 320,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    WinScene,
    UiScene,
    GameOverScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
};

var game = new Phaser.Game(config);
