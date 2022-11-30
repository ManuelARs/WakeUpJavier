class NivelB5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB5'
        });
    }

    init() {
        console.log('Escena NivelB5');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB5/NivelB5_2').setDepth(-2).setScale(.37,.35);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
 
    }


    update(time, delta) {
       
    }


}

export default NivelB5;