class NivelB1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB1'
        });
    }

    init() {
        console.log('Escena NivelB1');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB1/NivelB1').setDepth(-2).setScale(.37,.35);
 
    }


    update(time, delta) {
       
    }


}

export default NivelB1;