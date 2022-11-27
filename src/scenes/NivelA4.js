class  NivelA4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA4'
        });
    }

    init() {
        console.log('Escena NivelA4')
    }

    preload() {
    }

    create() {
        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA4/NivelA4').setDepth(-2).setScale(.4,.35);

    }

    update(time, delta) {
    }
}

export default NivelA4;