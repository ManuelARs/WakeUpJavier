class NivelA7 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA7'
        });
    }

    init() {
        console.log('Escena NivelA7');
    }

    // preload() {
    // }
    
    create() {
        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 360, 'NivelA7/nivelA7').setDepth(-2).setScale(.37,.35);
        //BOUNDS PARA PERSONAJES
        this.physics.world.setBounds(0,0,1580, 680)
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        
        //DIÁLOGOS
        this.fondoDialogo = this.add.image(790, 135, 'NivelA7/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
        this.dogCara = this.add.image(125, 135, 'NivelA1/dogCara').setScale(1).setAlpha(1);
        this.gataCara = this.add.image(1500, 135, 'NivelA1/gataCara').setScale(1.2).setAlpha(1);
        this.dialogo1 = this.add.image(770, 155, 'NivelA7/dialogo7_1').setScale(0.45).setAlpha(0);
        this.dialogo2 = this.add.image(670, 135, 'NivelA7/dialogo7_2').setScale(0.45).setAlpha(0);
        this.dialogo3 = this.add.image(900, 155, 'NivelA7/dialogo7_3').setScale(0.45).setAlpha(0);
        this.dialogo4 = this.add.image(670, 135, 'NivelA7/dialogo7_4').setScale(0.45).setAlpha(1);

        //PERSONAJES
        //Perro Javier
        this.dog = this.physics.add.sprite(100, 650, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
        //Gata Mia
        this.gata = this.physics.add.image(300, 650, 'NivelA1/Eliminar-gata', 0).setScale(1.8);
        this.gata.body.setSize(60, 60);
        this.gata.setPushable(false);
        // this.gata.flipX = true

        //OBJETOS
        this.espejo = this.physics.add.image(1520, 600, 'NivelA7/espejoCallejon').setScale(0.3);
        this.espejo.body.setAllowGravity(false);
        this.espejo.setPushable(false);
        this.espejo.body.setSize(400, 700);
        this.espejo2 = this.physics.add.image(1520, 600, 'NivelA7/espejoCallejon2').setScale(0.3).setDepth(4).setAlpha(0);
        this.espejo2.body.setAllowGravity(false);
        this.espejo2.setPushable(false);
        this.espejo2.body.setSize(400, 700);

        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
        //MOVIMIENTOS
        if(this.dog.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
        {
            this.dog.anims.play('dogIdle',true);
        }
        if (this.cursors.left.isDown)
        {
            this.dog.setVelocityX(-200);
            this.dog.anims.play('dogC',true);
            this.dog.flipX=1;
        }
        else if (this.cursors.right.isDown)
        {
            this.dog.setVelocityX(200);
            this.dog.anims.play('dogC',true);
            this.dog.flipX=0;
        }
        else
        {
            this.dog.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.dog.body.onFloor()))
        {
            this.dog.setVelocityY(-500);
        }

        if(this.dog.x > 1300) {
            this.espejo2.setAlpha(1);
            // this.espejo2.setAlpha();
        }
    }


}

export default NivelA7;