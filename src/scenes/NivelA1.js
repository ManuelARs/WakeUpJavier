class NivelA1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelA1'
        });
    }

    init() {
        console.log('Escena NivelA1');
    }
    

    create() {
        // this.scene.moveAbove('Bootloader','HUD');
        //console.log(this.scene.manager.scenes);
        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 720)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(1000);
        //this.cameras.main.startFollow(this.dog, true);

        //BANDERA
        this.movimiento = 0;
        
        //MÚSICA
        this.musicaFondoA = this.sound.add('nivel1M',{loop:true});
        this.musicaFondoA.play();
        console.log(this.musicaFondoA)
        
        //FONDO 
        this.fondo = this.add.image(800, 395, 'NivelA1/NivelA1').setDepth(-2).setScale(.37,.35);

        //OBJETOS
        this.salida = this.physics.add.staticImage(1695, 690, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(150, 1100);
        this.banca = this.physics.add.staticImage(550, 650, 'NivelA1/banca').setScale(1.3);
        this.banca.setPushable(false);
        this.banca.body.setSize(180, 50);
        this.banca.setOffset(-20,65);

        //INSTRUCCIONES
        this.instrucciones = this.add.image(1300, 390, 'NivelA1/instrucciones2').setScale(0.4).setAlpha(0);

        //DIÁLOGOS
        this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        this.dogCara = this.add.image(125, 125, 'NivelA1/dogCara').setScale(1).setAlpha(0);
        this.gataCara = this.add.image(1500, 125, 'NivelA1/gataCara').setScale(1.2).setAlpha(0);
        this.dialogo1 = this.add.image(790, 125, 'NivelA1/dialogo1_1').setScale(0.8).setAlpha(0);
        this.dialogo2 = this.add.image(790, 125, 'NivelA1/dialogo1_2').setScale(0.7).setAlpha(0);

        //PERSONAJES
        //Perro Javier
        this.dog = this.physics.add.sprite(100, 610, 'Dog', 0).setScale(0.2);
        this.dog.body.setSize(480, 300);
        this.dog.body.setMass(1);
        // this.dog.body.setImmovable(true);
        //Gata Mia
        this.gata = this.physics.add.image(600, 600, 'NivelA1/Eliminar-gata', 0).setScale(1.8);
        this.gata.body.setSize(60, 50);
        this.gata.setPushable(false);
        //this.gata.body.setImmovable(true);

        //ANIMACIONES
        this.anims.create({ key: 'dogC', frames: this.anims.generateFrameNames('Dog', { prefix: 'dog', suffix: '.png', start: 1, end: 4 }), repeat: -1, frameRate: 8 });
        this.anims.create({ key: 'dogIdle', frames: this.anims.generateFrameNames('Dog', { prefix: 'dogIdle', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 2 });
    

        //DIÁLOGO DE JAVIER
        setTimeout(() => {
            this.dogCara.setAlpha(1);
            this.fondoDialogo.setAlpha(1);
            this.dialogo1.setAlpha(1);
            //console.log("Entra primer Timeout")
        }, 1500);
        setTimeout(() => {
            this.dogCara.setAlpha(0);
            this.fondoDialogo.setAlpha(0);
            this.dialogo1.setAlpha(0);
            this.instrucciones.setAlpha(1);
            this.movimiento = 1;
        }, 6000);

       
        //COLISIONES
        this.dog.body.setCollideWorldBounds(true);
        this.gata.body.setCollideWorldBounds(true);
        // this.banca.body.setCollideWorldBounds(true);
  
        this.physics.add.collider(this.dog, this.banca);
        this.physics.add.collider(this.gata, this.banca);

        //COLISIÓN DE JAVIER CON MIA
        this.physics.add.collider(this.dog, this.gata, () => {
            this.movimiento = 0;
            this.dog.x=496.6;
            this.dog.y=624.9;
            console.log(this.dog.x)
            console.log(this.dog.y)
            this.gataCara.setAlpha(1);
            this.fondoDialogo.setAlpha(1);
            this.dialogo2.setAlpha(1);
            //DIÁLOGO DE MIA
            setTimeout(() => {
                this.gataCara.setAlpha(0);
                this.fondoDialogo.setAlpha(0);
                this.dialogo2.setAlpha(0);
                this.instrucciones.setAlpha(0);
                this.gata.flipX=1;
            }, 4000);
            this.tweens = this.add.tween({
            targets: [this.gata],
            x: 1600,
            delay: 5000,
            duration: 4000,
            onComplete: () => {
                    console.log(this.gata.x);
                    this.gata.setAlpha(0);
                    this.gata.disableBody(true, true);
                    //console.log('Se completa el tween');
                    this.movimiento = 1;
                },
            });
        });

        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.dog, this.salida, () => {
            this.dog.setVelocityY(0);
            this.dog.setAccelerationY(0);
            this.scene.start('NivelA2', { score: this.musicaFondoA });
        });

        //TECLADO
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

export default NivelA1;