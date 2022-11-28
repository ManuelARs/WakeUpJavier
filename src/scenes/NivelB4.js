class NivelB4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelB4'
        });
    }

    init() {
        console.log('Escena NivelB4');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelB4/NivelB4').setDepth(-2).setScale(.37,.35);
 
    }


    update(time, delta) {
       
    }


}

export default NivelB4;