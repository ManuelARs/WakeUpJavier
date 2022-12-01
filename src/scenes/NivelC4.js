class NivelC4 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC4'
        });
    }

    init() {
        console.log('Escena NivelC4');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(250,0,1580, 630)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        
        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC4/NivelC4').setDepth(-2).setScale(.36,.32);
        
    }


    update(time, delta) {
    }

}

export default NivelC4;