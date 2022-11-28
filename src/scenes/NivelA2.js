class NivelA2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'NivelA2'
        });
    }

    init() {
        console.log('Escena NivelA2')
    }

    preload() {
    }

    create() {
        this.physics.world.setBounds(0,0,1580, 700);
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);

        //BANDERA movimiento
        this.movimiento = 0;

        //Imagen de Fondo
        this.fondo = this.add.image(775, 360, 'NivelA2/NivelA2').setDepth(-2).setScale(.4,.38);
        this.mesa = this.physics.add.staticImage(200, 630, 'NivelA2/mesa').setScale(2);
        this.mesa.body.setSize(180,15);
        this.mesa.setOffset(-0.20,-10);
        this.panal = this.add.image(1270,480, 'NivelA2/panal').setScale(2);

        //CONVERSACIONES
        this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        this.dogCara = this.add.image(125, 125, 'NivelA1/dogCara').setScale(1).setAlpha(0);
        this.gataCara = this.add.image(1500, 125, 'NivelA1/gataCara').setScale(1.2).setAlpha(0);
        this.dialogo1 = this.add.image(790, 125, 'NivelA1/dialogo1_1').setScale(0.8).setAlpha(0);
        this.dialogo2 = this.add.image(790, 125, 'NivelA1/dialogo1_2').setScale(0.7).setAlpha(0);

        //PERSONAJES
        //Javier perrito
        this.dog = this.physics.add.sprite(50, 610, 'Dog', 0).setScale(0.2).setAlpha(1);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
        //Gata Mia
        this.gata = this.physics.add.image(100, 600, 'NivelA1/Eliminar-gata', 0).setScale(1.8);
        //x250
        this.gata.body.setSize(60, 50);
        this.gata.setPushable(false);

        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });

        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        
        //Mejorar tween con timeline maybe?
        this.tweens = this.add.tween({
            targets: [this.gata],
            x: 250,
            y: 520,
            duration: 2000,
            onComplete: () => {
                this.tweens = this.add.tween({
                    targets: [this.dog],
                    x: 150,
                    y: 550,
                    duration: 2000,
                    onStart: () => {
                        this.dog.setAlpha(1);
                    },
                    onComplete: () => {
                        this.gataCara.setAlpha(1);
                        this.fondoDialogo.setAlpha(1);
                        // nuevo dialogo ej Esto te ayudara a relajarte
                        // this.dialogo2.setAlpha(1);
                        setTimeout(() => {
                            this.gataCara.setAlpha(0);
                            this.fondoDialogo.setAlpha(0);
                            // nuevo dialogo ej Esto te ayudara a relajarte
                            // this.dialogo2.setAlpha(0);
                            this.scene.start('NivelA3');
                        }, 3000);
                    },
                });
            },
        });
        
        //COLISIÓN Mesa CON PERRO 
        this.physics.add.collider(this.dog, this.mesa, () => {});
        this.physics.add.collider(this.gata, this.mesa, () => {});
        // this.physics.add.collider(this.dog, this.gata, () => {
        //     this.scene.start('NivelA3');
        // });

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

export default NivelA2;