class NivelC10 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC10'
        });
    }

    init() {
        console.log('Escena NivelC10');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(250,0,1580, 630)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        
        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC10/NivelC10').setDepth(-2).setScale(.36,.32);
        
    }


    update(time, delta) {
    }

}

export default NivelC10;