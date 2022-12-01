class NivelC2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC2'
        });
    }

    init() {
        console.log('Escena NivelC2');
    }

    // preload() {
    // }
    
    create() {
        //BOUNDS DE LA ESCENA
        this.physics.world.setBounds(0,0,1580,740);

        //CAMARA INICIAL EFECTO FADE IN
        this.cameras.main.setBounds(0, 0, 1580, 780);
        this.cameras.main.fadeIn(2000);

        //IMAGENES DE FONDO
        this.fondo = this.add.image(775, 400, 'NivelC2/NivelC2').setDepth(-2).setScale(.37,.33);
        this.puerta = this.add.image(1525, 690, 'NivelC2/puerta').setScale(0.3);
        //BANDERA
        this.movimiento = 1;
        this.dialogoChoque = 0;

        //PERSONAJES
        //Javier Samurai
        this.javier = this.physics.add.sprite(50, 500, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.20);
        this.javier.body.setSize(300, 500);
        this.javier.body.setMass(4);
        this.javier.flipX=false;

        // OBJETOS
        this.salida = this.physics.add.staticImage(1580, 210, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(60, 60);
        //Estrella
        this.estrella = this.physics.add.staticImage(1000, 690, 'NivelC2/estrella').setAlpha(0).refreshBody();

        // ESCENARIO ***
        //Techo
        this.techo = this.physics.add.staticImage(500, 580, 'NivelC2/techo').setScale(0.4).refreshBody().disableBody(true,true);
        this.techo2 = this.physics.add.staticImage(1480, 580, 'NivelC2/techo2').setScale(0.4).refreshBody()//.disableBody(true,true);
        //Grupo Barras A
        this.barraA = this.physics.add.staticGroup();
        this.barraA.create(1350, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(1000, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(650, 500, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(300, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(50, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);

        //Grupo Barras A
        this.barraB = this.physics.add.staticGroup();
        this.barraB.create(400, 200, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(650, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(900, 200, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(1200, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(1500, 200, 'NivelC2/barra').setScale(0.4).refreshBody()//.disableBody(true,true);

        //Ventana
        this.ventana= this.add.image(1500, 140, 'NivelC2/ventana').setScale(0.4);

        //PICOS
        var picos = this.physics.add.staticGroup();
        picos.create(400, 570, 'NivelC2/picos').setScale(0.2,0.2).refreshBody().disableBody(true,true);
        //picos.create(1100, 570, 'NivelC2/picos').setScale(0.2).refreshBody().disableBody(true,true);

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });

        //DIÁLOGOS
        // this.fondoDialogo = this.add.image(790, 125, 'NivelA1/fondoDialogo').setScale(0.4, 0.3).setAlpha(0);
        // this.javierCara = this.add.image(125, 125, 'NivelC2/caraMonstruo').setScale(1.2).setAlpha(0);
        // this.monstruoCara = this.add.image(1470, 125, 'NivelC2/caraMonstruoCafe').setScale(1).setAlpha(0);
        // this.dialogo1 = this.add.image(790, 125, 'NivelC2/dialogo1_1').setScale(0.8).setAlpha(0);
        // this.dialogo2 = this.add.image(790, 125, 'NivelC2/dialogo1_2').setScale(0.7).setAlpha(0);
        // this.dialogo3 = this.add.image(790, 125, 'NivelC2/dialogo1_3').setScale(0.6).setAlpha(0);
        // this.dialogo4 = this.add.image(790, 125, 'NivelC2/dialogo1_4').setScale(0.7).setAlpha(0);
        // this.dialogo5 = this.add.image(750, 125, 'NivelC2/dialogo1_5').setScale(0.6).setAlpha(0);
        // this.dialogo6 = this.add.image(790, 125, 'NivelC2/dialogo1_6').setScale(0.7).setAlpha(0);
        // this.dialogo7 = this.add.image(790, 125, 'NivelC2/dialogo1_7').setScale(0.8).setAlpha(0);

        //COLISIONES
        //  this.physics.add.overlap(this.javier, this.objeto, collectObjeto, null, this);
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.techo1);
        this.physics.add.collider(this.javier, this.barraA);
        this.physics.add.collider(this.javier, this.barraB);
        this.physics.add.collider(this.javier, this.ventana);
        //this.physics.add.collider(this.javier, this.estrella);

        //Colision estrella
        this.physics.add.overlap(this.javier, this.estrella, collectObjeto, null, this);
        function collectObjeto (jugador,estrella)
        {
            picos.getChildren()[0].enableBody(false,0,0,true,true);
           // picos.getChildren()[1].enableBody(false,0,0,true,true);
            this.barraA.getChildren()[0].enableBody(false,0,0,true,true);
            this.barraA.getChildren()[1].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[2].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[3].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[4].enableBody(false,0,0,true,true); 
            this.techo.enableBody(false,0,0,true,true);
        }

        //Colision Picos
        this.physics.add.collider(this.javier, picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            //this.contadorVidas -= 1;
            //this.registry.events.emit('loseHeart',-1);
            this.javier.body.x=1510;
            console.log("Colision")
            // if (this.contadorVidas==0){
            //     this.musicaFondo.stop();
            //     this.scene.start('GameOver');
            // }
        });
         
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
        this.javier.setVelocityY(0);
        this.javier.setAccelerationY(0);
        this.scene.start('NivelC3');
        });

        
         //Teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update(time, delta) {
      //MOVIMIENTOS
      if(this.movimiento==0)
      {
          this.javier.anims.play('samuraiIdle');  
      }
     if(this.movimiento==1)
     {
         if(this.javier.body.onFloor()&&this.cursors.left.isUp&&this.cursors.right.isUp)
         {
             this.javier.anims.play('samuraiIdle',true);
         }
     if (this.cursors.left.isDown)
         {
             this.javier.setVelocityX(-200);
             this.javier.anims.play('samuraiIdle',true); //Caminar
             this.javier.flipX=1;
         }
     else if (this.cursors.right.isDown)
         {
             this.javier.setVelocityX(200);
             this.javier.anims.play('samuraiIdle',true); //Caminar
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
    }


}

export default NivelC2;