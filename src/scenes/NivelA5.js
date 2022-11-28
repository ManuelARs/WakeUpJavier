class NivelA5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA5'
        });
    }

    init() {
        console.log('Escena NivelA5');
    }

    preload() {
        this.load.path = './assets/';

    }
    

    create() {
        this.fondo = this.add.image(775, 360, 'NivelA5/nivelA5').setDepth(-2).setScale(.37,.35);
    }


    update(time, delta) {
        
    }


}

export default NivelA5;