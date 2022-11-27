class NivelA2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA2'
        });
    }

    init() {
        console.log('Escena NivelA2')
    }

    preload() {
    }

    create() {
        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA2/NivelA2').setDepth(-2).setScale(.4,.35);
    }

    update(time, delta) {
    }
}

export default NivelA2;