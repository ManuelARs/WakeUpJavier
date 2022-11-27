class NivelA7 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA7'
        });
    }

    init() {
        console.log('Escena NivelA7');
    }

    preload() {
        this.load.path = './assets/';

    }
    

    create() {
        this.fondo = this.add.image(775, 360, 'NivelA7/nivelA7').setDepth(-2).setScale(.37,.35);
    }


    update(time, delta) {
        
    }


}

export default NivelA7;