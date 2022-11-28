class NivelB2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB2'
        });
    }

    init() {
        console.log('Escena NivelB2');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB2/NivelB2').setDepth(-2).setScale(.37,.35);
 
    }


    update(time, delta) {
       
    }


}

export default NivelB2;