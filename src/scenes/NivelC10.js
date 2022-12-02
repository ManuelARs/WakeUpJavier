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
        this.physics.world.setBounds(0,0,1580, 730)
        
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
        this.javier.body.setMass(1);
        this.javier.flipX=false;

        /* ESCENARIO */
        //Grupo Barras A
        this.barraA = this.physics.add.staticGroup();
        this.barraA.create(50, 200, 'NivelC2/barra').setScale(0.3).refreshBody();//.disableBody(true,true);
        // this.barraA.create(650, 500, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        // this.barraA.create(300, 440, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);
        // this.barraA.create(50, 350, 'NivelC2/barra').setScale(0.3).refreshBody().disableBody(true,true);

        //Escalar
        this.escalar = this.physics.add.staticGroup();
        this.escalar.create(200, 290, 'NivelC10/escalar').setScale(0.3).refreshBody();

        //Picos
        var picos = this.physics.add.staticGroup();
        picos.create(90, 750, 'NivelC2/picos2').setScale(0.3).refreshBody()//.disableBody(true,true);

        //ANIMACIONES
        this.anims.create({ key: 'samuraiG', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiG', suffix: '.png', start: 1, end: 3 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiIdle', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiIdle', suffix: '.png', start: 1, end:1 }), repeat: -1, frameRate: 2 });
        this.anims.create({ key: 'samuraiCaminar', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiC', suffix: '.png', start: 1, end:6 }), repeat: -1, frameRate: 6 });
        this.anims.create({ key: 'samuraiE', frames: this.anims.generateFrameNames('Samurai', { prefix: 'samuraiE', suffix: '.png', start: 1, end:2 }), repeat: -1, frameRate: 6 });

        //COLISIONES
        this.javier.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.javier, this.barraA);
        this.physics.add.collider(this.javier, this.escalar);
        
        //Colision Picos
        this.physics.add.collider(this.javier, picos, () => {
            //EFECTO DE VIBRACIÓN EN CÁMARA
            this.cameras.main.shake(500,0.008);
            this.javier.body.x=60;
            this.javier.body.y=100;
            console.log("Colision");
        });

        //TECLADO
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

export default NivelC10;