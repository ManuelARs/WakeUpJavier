class NivelB3 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB3'
        });
    }

    init() {
        console.log('Escena NivelB3');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB3/NivelB3').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
 
    }


    update(time, delta) {
       
    }


}

export default NivelB3;