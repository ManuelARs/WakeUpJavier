class NivelA7 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA7'
        });
    }

    init(data) {
        console.log('Escena NivelA7');
        console.log('init', data);
        this.musicaFondoA = data.musica;
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
        //BANDERA MOVIMIENTO
        this.movimiento = 0;
        //DIÁLOGOS
        this.fondoDialogo = this.add.image(790, 135, 'NivelA7/fondoDialogo').setScale(0.4, 0.3).setAlpha(1);
        this.dogCara = this.add.image(125, 135, 'NivelA1/dogCara').setScale(1).setAlpha(0);
        this.gataCara = this.add.image(1500, 135, 'NivelA1/gataCara').setScale(1.2).setAlpha(1);
        this.dialogo1 = this.add.image(770, 155, 'NivelA7/dialogo7_1').setScale(0.45).setAlpha(1);
        this.dialogo2 = this.add.image(670, 135, 'NivelA7/dialogo7_2').setScale(0.45).setAlpha(0);
        this.dialogo3 = this.add.image(1000, 155, 'NivelA7/dialogo7_3').setScale(0.45).setAlpha(0);
        this.dialogo4 = this.add.image(1100, 155, 'NivelA7/dialogo7_4').setScale(0.45).setAlpha(0);
        this.dialogo5 = this.add.image(800, 140, 'NivelA7/dialogo7_5').setScale(0.45).setAlpha(0);

        //PERSONAJES
        //Perro Javier
        this.dog = this.physics.add.sprite(100, 650, 'Dog', 0).setScale(0.2).setDepth(3);
        this.dog.body.setSize(550, 300);
        this.dog.body.setMass(1);
        //Gata Mia
        this.gata = this.physics.add.image(500, 650, 'NivelA1/Eliminar-gata', 0).setScale(1.8).setDepth(3);
        this.gata.body.setSize(50, 50);
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
        
        //TIMEOUTS PARA DIÁLOGOS
        setTimeout(() => {
            this.dialogo1.setAlpha(0);
            this.gataCara.setAlpha(0);
            this.dogCara.setAlpha(1);
            this.dialogo2.setAlpha(1);
        }, 5000);
        setTimeout(() => {
            this.dialogo2.setAlpha(0);
            this.dogCara.setAlpha(0);
            this.gataCara.setAlpha(1);
            this.dialogo3.setAlpha(1);
        }, 8500);
        setTimeout(() => {
            this.dialogo3.setAlpha(0);
            this.dialogo4.setAlpha(1);
        }, 12500);
        setTimeout(() => {
            this.gataCara.setAlpha(0);
            this.dialogo4.setAlpha(0);
            this.dogCara.setAlpha(1);
            this.dialogo5.setAlpha(1);
        }, 16500);
        setTimeout(() => {
            this.dialogo5.setAlpha(0);
            this.gataCara.setAlpha(0);
            this.dogCara.setAlpha(0);
            this.dogCara.setAlpha(0);
            this.fondoDialogo.setAlpha(0);
            this.gata.flipX=1;
            this.tweens = this.add.tween({
                targets: [this.gata],
                x: 1600,
                duration: 3000,
                onComplete: () => {
                        //console.log(this.gata.x);
                        //this.gata.setAlpha(0);
                        this.gata.disableBody(true, true);
                        this.movimiento = 1;
                    },
            });
        }, 20500);
        
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        
        //COLISIÓN DE JAVIER CON ESPEJO
        this.physics.add.collider(this.dog, this.espejo, () => {
            this.movimiento = 0;
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.tweens = this.add.tween({
                targets: [this.espejo2],
                alpha: 1,
                duration: 1800,
                onComplete: () => {
                        //console.log('Se completa el tween');
                        this.musicaFondoA.stop();
                        this.scene.start('NivelB1');
                    },
                });
        });

        //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
        //MOVIMIENTOS
        if(this.movimiento==0)
        {
            this.dog.anims.play('dogIdle',true);
        }
        if(this.movimiento==1)
        {
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
        }
    }


}

export default NivelA7;