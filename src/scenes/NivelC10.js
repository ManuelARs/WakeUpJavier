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
        this.physics.world.setBounds(0,0,1580, 760)
        
        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);
        //BANDERAS
        this.movimiento = 1; 
        //FONDO
        this.fondo = this.add.image(790, 385, 'NivelC10/NivelC10').setDepth(-2).setScale(.36,.32);

        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 100, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setOffset(400,400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;

        /* ESCENARIO */
        //Grupo Barras A
        this.barraA = this.physics.add.staticGroup();
        this.barraA.create(55, 200, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(1100, 700, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(1400, 620, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(1110, 500, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(1410, 400, 'NivelC2/barra').setScale(0.4,0.3).refreshBody();
        this.barraA.create(1090, 250, 'NivelC2/barra').setScale(0.6,0.3).refreshBody();
        this.barraA.create(1460, 150, 'NivelC2/barra').setScale(0.7,0.3).refreshBody();
        this.barraA.create(260, 710, 'NivelC2/barra').setScale(0.5,0.3).refreshBody();
        this.barraA.create(400, 600, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(580, 500, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(760, 400, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(465, 300, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(750, 170, 'NivelC2/barra').setScale(0.3).refreshBody();
        this.barraA.create(800, 710, 'NivelC2/barra').setScale(0.55,0.3).refreshBody().disableBody(true,true);;


        //Japones
        this.japones = this.physics.add.staticImage(1020, 200, 'NivelC10/japones').setScale(0.34).refreshBody();
        //Puerta
        this.puerta = this.physics.add.staticImage(865, 650, 'NivelC10/puerta').setScale(0.3,0.4).refreshBody();
        //Gong
        this.gong = this.physics.add.staticImage(1520, 80, 'NivelC10/gong').setScale(0.46).refreshBody();
        this.reflejo = this.add.image(1512, 95, 'NivelC10/reflejo').setScale(0.7).setAlpha(0);
        // Mascara
        this.mascara = this.physics.add.staticImage(760, 100, 'NivelC10/mascara').refreshBody();
        //Escalar
        this.escalar = this.physics.add.staticImage(220, 280, 'NivelC10/escalar').setScale(0.3).refreshBody();
        this.escalar2 = this.physics.add.staticImage(880, 280, 'NivelC10/escalar').setScale(0.3).refreshBody();

        //Picos
        var picos = this.physics.add.staticGroup();
        picos.create(40, 750, 'NivelC2/picos').setScale(0.3).refreshBody();
        picos.create(1210, 750, 'NivelC2/picos').setScale(0.3).refreshBody();

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiEscalar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiE', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 6 });

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.barraA);
        this.physics.add.collider(this.javier, this.puerta);
        this.physics.add.collider(this.javier, this.escalar2);
        this.physics.add.collider(this.javier, this.japones);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });

        //Colision con mascara
        this.physics.add.overlap(this.javier, this.mascara, collectObjeto, null, this);
        function collectObjeto (jugador,mascara)
        {
            this.mascara.disableBody(true,true);
            this.javier.body.stop();
            this.cameras.main.startFollow(this.puerta, true);
            this.cameras.main.setZoom(2); 
            //TWEEN Puerta se mueve
            this.add.tween({
                targets: [this.puerta],
                y:450,
                duration: 3000,
                onComplete: () => {
                    this.cameras.main.setZoom(1); 
                    console.log("Entro al complete");
                    //this.physics.add.collider(this.javier, this.techo2);
                    this.puerta.disableBody(true,true);
                    this.barraA.getChildren()[13].enableBody(false,0,0,true,true);
                }
            });
        }
        //Colisión gong
        this.physics.add.collider(this.javier, this.gong, () => {
            this.javier.body.stop();
            this.tweens = this.add.tween({
                targets: [this.reflejo],
                alpha: 1,
                duration: 1800,
                onComplete: () => {
                        //console.log('Se completa el tween');
                        this.scene.start('NivelD');
                    },
                });
        });
        //Colision Picos
        this.physics.add.collider(this.javier, picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            //this.barraA.getChildren()[13].disableBody(true,true);
            this.javier.body.x=60;
            this.javier.body.y=100;
            console.log("Colision");
        });

        //TECLADO
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }


    update(time, delta) {
        //MOVIMIENTOS
        if(this.movimiento==1)
        {
            if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
            {
               this.javier.anims.play('samuraiIdle',true);
            }
            if (this.cursors.left.isDown)
            {
               this.javier.setVelocityX(-200);
               this.javier.anims.play('samuraiCaminar',true); //Caminar
               this.javier.flipX=1;
            }
            else if (this.cursors.right.isDown)
            {
               this.javier.setVelocityX(200);
               this.javier.anims.play('samuraiCaminar',true); //Caminar
               this.javier.flipX=0;
            }
            else
            {
                this.javier.setVelocityX(0);
            }
 
            if ((this.cursors.up.isDown && this.javier.body.onFloor()))
            {
               this.javier.setVelocityY(-500);
            }
        }
        if (this.cursors.up.isDown && this.escalar.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.anims.play('samuraiEscalar',true); //Escalar
            this.javier.y -= 3;
        }
    }

}

export default NivelC10;