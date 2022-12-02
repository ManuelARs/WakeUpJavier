class NivelC2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'NivelC2'
        });
    }

    init() {
        console.log('Escena NivelC2');
    }

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
        this.javier = this.physics.add.sprite(50, 700, 'Samurai', 0).setAlpha(1).setDepth(3).setScale(0.15);
        this.javier.body.setSize(300, 400);
        this.javier.body.setOffset(400,400);
        this.javier.body.setMass(4);
        this.javier.flipX=false;

        // OBJETOS
        this.salida = this.physics.add.staticImage(1580, 210, 'NivelA/Eliminar-mirror').setScale(0.7).setAlpha(0);
        this.salida.body.setSize(60, 60);
        //Estrellas
        this.estrella = this.physics.add.staticImage(1000, 690, 'NivelC2/estrella').setAlpha(0).refreshBody();
        this.estrella2 = this.physics.add.staticImage(50, 260, 'NivelC2/estrella').setAlpha(0).refreshBody();

        // ESCENARIO ***
        //Techo
        this.techo = this.physics.add.staticImage(500, 580, 'NivelC2/techo').setScale(0.4).refreshBody()//.disableBody(true,true);
        this.techo2 = this.physics.add.image(1480, 580, 'NivelC2/techo2').setScale(0.4).refreshBody()//.disableBody(true,true);
        this.techo2.body.setAllowGravity(false);
        this.techo2.setPushable(false);
        //Grupo Barras A
        this.barraA = this.physics.add.staticGroup();
        this.barraA.create(1000, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(650, 500, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(300, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraA.create(50, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);

        //Grupo Barras A
        this.barraB = this.physics.add.staticGroup();
        this.barraB.create(350, 230, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(650, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(900, 200, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(1200, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        this.barraB.create(1493, 200, 'NivelC2/barra').setScale(0.5,0.4).refreshBody()//.disableBody(true,true);

        //Ventana
        this.ventana= this.add.image(1500, 140, 'NivelC2/ventana').setScale(0.4);

        //PICOS
        var picos = this.physics.add.staticGroup();
        picos.create(400, 570, 'NivelC2/picos').setScale(0.2).refreshBody().disableBody(true,true);
        picos.create(875, 570, 'NivelC2/picos2').setScale(0.2).refreshBody().disableBody(true,true);
        picos.create(1040, 570, 'NivelC2/picos2').setScale(0.2).refreshBody().disableBody(true,true);
        picos.create(1200, 570, 'NivelC2/picos2').setScale(0.2).refreshBody().disableBody(true,true);
        picos.create(1360, 570, 'NivelC2/picos2').setScale(0.2).refreshBody().disableBody(true,true);

         //ANIMACIONES
         this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
         this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
         this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.techo);
        this.physics.add.collider(this.javier, this.barraA);
        this.physics.add.collider(this.javier, this.barraB);
        this.physics.add.collider(this.javier, this.ventana);
        this.physics.add.collider(this.javier, this.techo2);

        //Colision estrella
        this.physics.add.overlap(this.javier, this.estrella, collectObjeto, null, this);
        function collectObjeto (jugador,estrella)
        {
            this.estrella.disableBody(true,true);
            picos.getChildren()[0].enableBody(false,0,0,true,true);
            picos.getChildren()[1].enableBody(false,0,0,true,true);
            picos.getChildren()[2].enableBody(false,0,0,true,true);
            this.barraA.getChildren()[0].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[1].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[2].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[3].enableBody(false,0,0,true,true); 
            this.javier.body.stop();
            this.cameras.main.startFollow(this.puerta, true);
            this.cameras.main.setZoom(4); 
            //TWEEN BARRA SE CAE
            this.add.tween({
                targets: [this.techo2],
                y:710,
                duration: 500,
                onComplete: () => {
                    this.cameras.main.setZoom(1); 
                    //console.log("Entro al complete");
                    this.physics.add.collider(this.javier, this.techo2);
                    this.techo2.y=710; 
                }
            });
        }

        //Colision estrella2
        this.physics.add.overlap(this.javier, this.estrella2, collectObjeto2, null, this);
        function collectObjeto2 (jugador,estrella2)
        {
            this.estrella2.disableBody(true,true);
            this.barraA.getChildren()[0].disableBody(true,true);
            this.barraA.getChildren()[1].disableBody(true,true); 
            this.barraA.getChildren()[2].disableBody(true,true); 
            this.barraB.getChildren()[0].enableBody(false,0,0,true,true); 
            this.barraB.getChildren()[1].enableBody(false,0,0,true,true); 
            this.barraB.getChildren()[2].enableBody(false,0,0,true,true); 
            this.barraB.getChildren()[3].enableBody(false,0,0,true,true); 
            picos.getChildren()[3].enableBody(false,0,0,true,true);
            picos.getChildren()[4].enableBody(false,0,0,true,true);
        }

        //Colision Picos
        this.physics.add.collider(this.javier, picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            this.javier.body.x=1510;
            //console.log("Colision");
            this.barraA.getChildren()[0].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[1].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[2].enableBody(false,0,0,true,true); 
            this.barraA.getChildren()[3].enableBody(false,0,0,true,true);
            this.barraB.getChildren()[0].disableBody(true,true); 
            this.barraB.getChildren()[1].disableBody(true,true); 
            this.barraB.getChildren()[2].disableBody(true,true); 
            this.barraB.getChildren()[3].disableBody(true,true);
            this.estrella2.enableBody(false,0,0,true,true); 
            picos.getChildren()[3].disableBody(true,true);
            picos.getChildren()[4].disableBody(true,true);
        });
         
        //COLISIÓN DE JAVIER CON LA SALIDA   
        this.physics.add.collider(this.javier, this.salida, () => {
        this.javier.setVelocityY(0);
        this.javier.setAccelerationY(0);
        this.scene.start('NivelC4');
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
    }


}

export default NivelC2;