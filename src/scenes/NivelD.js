class NivelD extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelD'
        });
    }

    init() {
        console.log('Escena NivelD');
    }
    
    create() {
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(250,0,1580, 630)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.flash(3000);

        //MÚSICA
        this.musicaFondo = this.sound.add('nivelAM',{loop:true});
        
        
        //BANDERA MOVIMIENTO
        this.movimiento = 1;

        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelA/fondo_opc1').setDepth(-2).setScale(.36,.32);
        this.final = this.add.image(800,400, 'NivelD/fondoFinal').setScale(.37,.33).setDepth(6).setAlpha(0);
        
        //OBJETOS
        this.espejo = this.physics.add.image(1530, 380, 'NivelA/espejo').setScale(0.22);
        this.espejo.body.setAllowGravity(false);
        this.espejo.setPushable(false);
        this.espejo.body.setSize(400, 1000);
        this.espejo2 = this.physics.add.image(1530, 380, 'NivelA/espejo2').setScale(0.22).setDepth(5).setAlpha(0);
        this.espejo2.body.setAllowGravity(false);
        this.espejo2.setPushable(false);
        this.espejo2.body.setSize(100, 250);
        
        //SPRITE JAVIER
        this.javier = this.physics.add.sprite(350, 480, 'Javier', 0).setScale(0.4).setDepth(4);
        this.javier.body.setSize(230, 550);
        this.javier.body.setMass(1);
        this.anims.create({ key: 'JavierIdle', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierI', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'JavierD', frames: this.anims.generateFrameNames('Javier', { prefix: 'JavierD', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });  
        
        //DIÁLOGOS
        this.fondoDialogo = this.add.image(900, 400, 'NivelD/fondoDialogo').setScale(0.3,0.1).setAlpha(0);

        this.dialogo1 = this.add.image(900, 410, 'NivelD/dialogo1_1').setScale(0.5).setAlpha(0);
        this.dialogo2 = this.add.image(900, 410, 'NivelD/dialogo1_2').setScale(0.5).setAlpha(0);
        this.dialogo3 = this.add.image(900, 410, 'NivelD/dialogo1_3').setScale(0.5).setAlpha(0);
        this.dialogo4 = this.add.image(920, 410, 'NivelD/dialogo1_4').setScale(0.43).setAlpha(0);
        this.dialogo5 = this.add.image(900, 410, 'NivelD/dialogo1_5').setScale(0.5).setAlpha(0);
        
        //APARICIÓN DE DIÁLOGOS
        setTimeout(() => {
            this.fondoDialogo.setAlpha(1);
            this.dialogo1.setAlpha(1);
            this.musicaFondo.play();
        }, 4500);
        setTimeout(() => {
            this.dialogo1.setAlpha(0);
            this.dialogo2.setAlpha(1);
        }, 9000);
        setTimeout(() => {
            this.dialogo2.setAlpha(0);
            this.dialogo3.setAlpha(1);
        }, 13500);
        setTimeout(() => {
            this.dialogo3.setAlpha(0);
            this.dialogo4.setAlpha(1);
        }, 17500);
        setTimeout(() => {
            this.dialogo4.setAlpha(0);
            this.dialogo5.setAlpha(1);
        }, 22500);
        setTimeout(() => {
            this.fondoDialogo.setAlpha(0);
            this.dialogo5.setAlpha(0);
            this.cameras.main.startFollow(this.javier, true);
            this.cameras.main.setZoom(1.5);
            //TWEEN FINAL DE JAVIER
            this.tweens = this.add.tween({
                targets: [this.javier],
                x: 1400,
                duration: 4500,
                onStart: () => {
                    this.javier.anims.play('JavierD',true);
                },
                onComplete: () => {
                    this.javier.anims.play('JavierIdle',true);
                    this.tweens = this.add.tween({
                        targets: [this.espejo2],
                        alpha: 1,
                        duration: 2000,
                        onComplete: () => {
                            setTimeout(() => {
                                this.final.setAlpha(1);
                                this.cameras.main.setZoom(1);
                                this.cameras.main.fadeIn(1500);
                            }, 1000);
                            },
                        });
                    },
            });
        }, 27000);

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.javier.setCollideWorldBounds(true);
        this.espejo.body.setCollideWorldBounds(true);
        //this.javier.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 1580, 635));
        this.physics.add.existing(this.espejo, true);

        // });
        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
    }

}

export default NivelD;