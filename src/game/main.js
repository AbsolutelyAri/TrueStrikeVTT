import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [

    ]
};

const StartGame = (parent) => {
    return new Phaser.Game({...config, parent: parent});
}

export default StartGame;