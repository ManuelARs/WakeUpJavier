class NivelC7 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC7'
        });
    }

    init() {
        console.log('Escena NivelC7');
    }
    
    create() {
        //BANDERAS CONTROL DE PANEO
        this.paneo = 0;

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.fadeIn(1500);
        this.cameras.main.setBounds(0, 0, 1580, 780);

        //BANDERAS
        this.movimiento = 1; 

        //BOUNDS DE ESCENA
        this.physics.world.setBounds(0,0,1580, 750);

        // this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
        //     this.cameras.main.pan(100, 702, 2000);
        //     this.cameras.main.setZoom(5);
        // });
        
        // this.cameras.main.on(Phaser.Cameras.Scene2D.Events.PAN_COMPLETE, () => {
        //     if(this.paneo == 0){
        //         setTimeout( () => {
        //             // PANEO A LA PUERTA(GONG)
        //             this.cameras.main.pan(this.puerta.x, this.puerta.y, 2000);
        //         }, 1000);
        //         setTimeout( () => {
        //             this.cameras.main.setZoom(1);
        //         }, 5000);
        //         this.paneo = 1;
        //     }
        // });

        // // CONTADOR VIDAS
        // this.contadorVidas=3;
        // //console.log(this.scene.manager.scenes)
        // //MANEJO DE SCENE
        // this.scene.moveAbove('SceneA','HUD');
        // //MÚSICA
        // this.musicaFondo = this.sound.add('musicaFondo',{loop:false});
        // this.musicaFondo.play();

        // // IMAGEN INSTRUCCIONES
        // this.instrucciones = this.add.image(750,25, 'instrucciones').setDepth(4).setScale(0.28);
        // //LAS INSTRUCCIONES DESAPARECEN DESPUÉS DE 19 SEGUNDOS
        // setTimeout(() => {
        //     this.instrucciones.setAlpha(0);
        // }, 19000);

        //FONDO Y SPRITE
        this.fondo = this.add.image(800, 358, 'NivelC7/NivelC7').setDepth(-2).setScale(.37,.34);

        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(60, 740, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.12);
        this.javier.body.setSize(300, 400);
        this.javier.body.setOffset(400,400);
        this.javier.body.setMass(1);
        this.javier.flipX=false;
        
        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiEscalar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiE', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 6 });

        // ESCALERA 
        this.escalera = this.add.image(300, 215, 'NivelC7/escalera').setScale(1.5);
        //CUERDA
        this.cuerda = this.add.image(495, 342, 'NivelC7/cuerda').setScale(0.746,0.3);
        // this.cuerda.body.setSize(300,10);
        //ESCALAR
        this.escalar = this.add.image(970, 335, 'NivelC7/escalar').setScale(1);
        //PICOS
        this.picos = this.physics.add.image(945, 740, 'NivelC7/picos').setScale(0.4,0.2);
        this.picos.setPushable(false);
        this.picos.body.setAllowGravity(false);

        //BARRA DIAGONAL
        this.barraDiagonal = this.add.image(1300, 390, 'NivelC7/barra').setScale(0.2,0.2);
        //BARRAS 
        this.barraTorre = this.physics.add.group();
        this.barraTorre.create(820, 555, 'NivelC7/barra').setDepth(-1).setScale(0.3).refreshBody();
        
        this.barraTiempo = this.physics.add.staticGroup();
        this.barraTiempo.create(990, 670, 'NivelC7/barra').setScale(.1,0.2).refreshBody();
        this.barraTiempo.create(1120, 620, 'NivelC7/barra').setScale(.3,0.2).refreshBody();
        this.barraTiempo.create(1260, 570, 'NivelC7/barra').setScale(.3,0.2).refreshBody();
        this.barraTiempo.create(1500, 520, 'NivelC7/barra').setScale(.3,0.2).refreshBody();

        this.barrasArriba = this.physics.add.staticGroup();
        this.barrasArriba.create(370,150, 'NivelC7/barra').setScale(0.4).refreshBody();
        this.barrasArriba.create(1460,190, 'NivelC7/barra').setScale(0.3).refreshBody();
        this.barrasArriba.create(1230,155, 'NivelC7/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barrasArriba.create(1060,155, 'NivelC7/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barrasArriba.create(890,155, 'NivelC7/barra').setScale(0.3).refreshBody().disableBody(true,true);

        var barrasHielo = this.physics.add.staticGroup();
        barrasHielo.create(650,155, 'NivelC7/barra').setScale(0.4).refreshBody();

        var barrasCuerda = this.physics.add.staticGroup();
        barrasCuerda.create(720,340, 'NivelC7/barra').setScale(0.4).refreshBody()
        barrasCuerda.create(260,340, 'NivelC7/barra').setScale(0.4).refreshBody()
        
        // TORRES
        var torres = this.physics.add.staticGroup();
        torres.create(150, 688, 'NivelC7/torre1').setScale(1,1.1).refreshBody();
        torres.create(300, 660, 'NivelC7/torre2').setScale(1,1.1).refreshBody();
        torres.create(450, 645, 'NivelC7/torre3').refreshBody();
        torres.create(600, 635, 'NivelC7/torre3').setScale(1,1.1).refreshBody();
        torres.create(750, 635, 'NivelC7/torre3').setScale(1,1.1).refreshBody();
        
        // PUERTA
        this.puerta = this.physics.add.image(1470, 145, 'NivelC7/puerta').setScale(0.15,0.2);
        this.puerta.body.setAllowGravity(false);
        this.puerta.body.setImmovable(true);  

        // COLECCIONABLE
        this.objeto = this.physics.add.image(650,100,'NivelC7/mascara').setScale(.5);
        this.objeto.body.setAllowGravity(false);
        this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);
        function collectObjeto (jugador, objeto)
        {
            objeto.disableBody(true, true);
            //console.log("aparecer barras");
            //console.log(this.barrasArriba);
            this.barrasArriba.getChildren()[2].enableBody(false,0,0,true,true);
            this.barrasArriba.getChildren()[3].enableBody(false,0,0,true,true);
            this.barrasArriba.getChildren()[4].enableBody(false,0,0,true,true);
            //this.registry.events.emit('getStar',1);
        }

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        // //this.physics.add.collider(this.javier, this.puerta, () => {this.scene.start('NivelC9');});
        
        //Colisiones con los limites del mundo
        this.javier.body.setCollideWorldBounds(true);
        this.barraTorre.children.iterate( (torreT) => {
            torreT.setCollideWorldBounds(true);
            torreT.body.setAllowGravity(false);
        } );  

        // //FÍSICAS Y COLISIONES
        this.physics.add.existing(this.escalar, true );
        this.physics.add.existing(this.escalera, true );
        this.physics.add.existing(this.cuerda, true );
        this.physics.add.existing(this.barraDiagonal, true );
        this.physics.add.existing(this.puerta, true );
        this.physics.add.collider(this.javier, torres);
        this.physics.add.collider(this.javier, this.barrasArriba);
        this.physics.add.collider(this.javier, barrasHielo, () => {});
        this.physics.add.collider(this.javier, this.barraPuerta);
        this.physics.add.collider(this.javier, barrasCuerda);
        this.physics.add.collider(this.javier, this.cuerda, () => {});

        this.physics.add.collider(this.javier, this.barraTiempo, () => {});
        this.physics.add.collider(this.javier, this.barraTorre, () => {});
        this.physics.add.collider(this.javier, this.barraDiagonal);
        this.physics.add.collider(this.javier, this.escalar, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });
        this.physics.add.collider(this.javier, this.escalera, () => {
            this.javier.setVelocityY(0);
            this.javier.setAccelerationY(0);
        });

        //COLISIÓN con picos
        //console.log(this.contadorVidas)
        this.physics.add.collider(this.javier, this.picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            //this.contadorVidas -= 1;
            //this.registry.events.emit('loseHeart',-1);
            this.javier.body.x=50;
            //console.log(this.contadorVidas)
            // if (this.contadorVidas==0){
            //     this.musicaFondo.stop();
            //     this.scene.start('GameOver');
            // }
        });

        //COLISIÓN CON PUERTA / FINAL DE NIVEL
        this.physics.add.collider(this.javier, this.puerta, () => {
            this.sound.pauseAll();
            this.scene.start('NivelC8', /*{ score: this.contadorVidas }*/);
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
        if(this.movimiento==0)
        {
            this.javier.anims.play('samuraiIdle');  
        }
        if ((this.cursors.up.isDown && this.javier.body.onFloor())||(this.cursors.up.isDown && this.barraTorre.getChildren()[0].body.touching.up))
        {
            this.javier.setVelocityY(-500);
        }
        if (this.cursors.up.isDown && this.escalar.body.touching.right && this.javier.body.touching.left)
        {
            this.javier.anims.play('samuraiEscalar',true); //Escalar
            this.javier.y -= 3;
        }
        if (this.cursors.up.isDown && this.escalera.body.touching.left && this.javier.body.touching.right)
        {
            this.javier.anims.play('samuraiEscalar',true); //Escalar
            this.javier.y -= 3;
        }

        if(this.barraTorre.getChildren()[0].y>769){
            this.barraTorre.getChildren()[0].disableBody(true, true);
        }


        // if (this.cursors.left.isDown)
        // {
        //     this.javier.setVelocityX(-160);

        //     this.javier.flipX=1;
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.javier.setVelocityX(160);

        //     this.javier.flipX=0;
        // }
        // else
        // {
        //     this.javier.setVelocityX(0);
        // }




    }
}

    export default NivelC7;